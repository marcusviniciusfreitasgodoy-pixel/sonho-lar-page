const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
import { z } from 'npm:zod@3.25.76'
import { createClient } from 'npm:@supabase/supabase-js@2'

const BodySchema = z.object({
  phone: z.string().min(10).max(20).regex(/^[+\d\s()-]+$/),
  message: z.string().min(1).max(1500),
})

// Per-IP best-effort rate limit
const RATE_LIMIT_MAX = 8
const RATE_LIMIT_WINDOW_MS = 60_000
const ipHits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  hits.push(now)
  ipHits.set(ip, hits)
  return hits.length > RATE_LIMIT_MAX
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const INSTANCE_ID = Deno.env.get('ZAPI_INSTANCE_ID')
    const TOKEN = Deno.env.get('ZAPI_TOKEN')
    const CLIENT_TOKEN = Deno.env.get('ZAPI_CLIENT_TOKEN')

    if (!INSTANCE_ID || !TOKEN || !CLIENT_TOKEN) {
      return new Response(JSON.stringify({ error: 'WhatsApp service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Require authentication: only logged-in users or internal server-to-server
    // calls bearing INTERNAL_FUNCTION_SECRET can invoke this function.
    const internalSecret = Deno.env.get('INTERNAL_FUNCTION_SECRET')
    const internalHeader = req.headers.get('x-internal-secret')
    const isInternal = !!internalSecret && internalHeader === internalSecret
    if (!isInternal) {
      const authHeader = req.headers.get('Authorization') ?? ''
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!
      const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
      const supabase = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      })
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    if (rateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
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

    // Allowlist: must be Marcus's number or a valid Brazilian mobile (55 + 2-digit DDD + 9XXXXXXXX)
    const MARCUS_WA = '5521964075124'
    const isBrazilianMobile = /^55\d{2}9\d{8}$/.test(normalizedPhone)
    if (normalizedPhone !== MARCUS_WA && !isBrazilianMobile) {
      return new Response(JSON.stringify({ error: 'Destination not allowed' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

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
