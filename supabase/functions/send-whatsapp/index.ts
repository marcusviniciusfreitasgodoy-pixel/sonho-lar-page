const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
import { z } from 'npm:zod@3.25.76'

const BodySchema = z.object({
  phone: z.string().min(10).max(20),
  message: z.string().min(1).max(2000),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const INSTANCE_ID = Deno.env.get('ZAPI_INSTANCE_ID')
    const TOKEN = Deno.env.get('ZAPI_TOKEN')
    const CLIENT_TOKEN = Deno.env.get('ZAPI_CLIENT_TOKEN')

    if (!INSTANCE_ID || !TOKEN || !CLIENT_TOKEN) {
      return new Response(JSON.stringify({ error: 'Z-API credentials not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { phone, message } = parsed.data

    // Normalize phone: remove non-digits, ensure country code
    let normalizedPhone = phone.replace(/\D/g, '')
    if (normalizedPhone.startsWith('0')) normalizedPhone = '55' + normalizedPhone.slice(1)
    if (!normalizedPhone.startsWith('55')) normalizedPhone = '55' + normalizedPhone

    const zapiUrl = `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/send-text`

    const res = await fetch(zapiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': CLIENT_TOKEN,
      },
      body: JSON.stringify({
        phone: normalizedPhone,
        message,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Z-API error:', data)
      return new Response(JSON.stringify({ error: 'Z-API send failed', details: data }), {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
