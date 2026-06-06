import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3.25.76'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const BodySchema = z.object({
  servico: z.string().max(100).default('WhatsApp'),
  origem: z.string().max(100).default('whatsapp_click'),
  utm_source: z.string().max(200).optional().default(''),
  utm_medium: z.string().max(200).optional().default(''),
  utm_campaign: z.string().max(200).optional().default(''),
  utm_content: z.string().max(200).optional().default(''),
  utm_term: z.string().max(200).optional().default(''),
  referrer: z.string().max(500).optional().default(''),
  landing_path: z.string().max(500).optional().default(''),
})

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const parsed = BodySchema.safeParse(await req.json().catch(() => ({})))
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const data = parsed.data

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const db = createClient(SUPABASE_URL, SERVICE_ROLE)

    const ipHeader = req.headers.get('x-forwarded-for') || ''
    const ip = ipHeader.split(',')[0].trim()
    const userAgent = req.headers.get('user-agent') || ''
    const ipHash = ip ? await sha256Hex(ip + '|godoyprime-salt-v1') : null

    // Dedupe: skip if same IP clicked same servico in last 30 minutes
    if (ipHash) {
      const since = new Date(Date.now() - 30 * 60 * 1000).toISOString()
      const { data: recent } = await db
        .from('leads')
        .select('id')
        .eq('ip_hash', ipHash)
        .eq('servico', data.servico)
        .eq('origem', data.origem)
        .gte('created_at', since)
        .limit(1)
      if (recent && recent.length > 0) {
        return new Response(JSON.stringify({ success: true, deduped: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    const { data: inserted, error } = await db
      .from('leads')
      .insert({
        nome: `Clique WhatsApp — ${data.servico}`,
        servico: data.servico,
        origem: data.origem,
        utm_source: data.utm_source || null,
        utm_medium: data.utm_medium || null,
        utm_campaign: data.utm_campaign || null,
        utm_content: data.utm_content || null,
        utm_term: data.utm_term || null,
        referrer: data.referrer || null,
        landing_path: data.landing_path || null,
        user_agent: userAgent || null,
        ip_hash: ipHash,
        crm_status: 'skipped',
      })
      .select('id')
      .single()

    if (error) {
      console.error('track-wa-click insert error:', error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, lead_id: inserted?.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('track-wa-click error:', e)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})