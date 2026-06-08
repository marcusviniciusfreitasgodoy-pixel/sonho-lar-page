const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

import { z } from 'npm:zod@3.25.76'
import { createClient } from 'npm:@supabase/supabase-js@2'

const CRM_URL = 'https://crm-b2b-interface-clone-9bbb1.shrd00.internal.goskip.dev/backend/v1/webhook-external'
const TIPO_FUNIL = 'GPR'
const DATEAHOME_URL = 'https://api.dateahome.com/webhook/lead/b00e8651-dd31-41fc-a0f0-32a06044f3ee'
const LEAD_ORIGIN = 'Godoy Prime - Personal Shopper Imobiliário'

function splitPhone(raw: string): { ddd: string; phone: string } {
  let digits = (raw || '').replace(/\D/g, '')
  if (digits.startsWith('55') && digits.length > 11) digits = digits.slice(2)
  if (digits.length < 10) return { ddd: '', phone: digits }
  return { ddd: digits.slice(0, 2), phone: digits.slice(2) }
}

function buildDateAHomeMessage(lead: any): string {
  const parts: string[] = []
  if (lead.mensagem) parts.push(lead.mensagem)
  const meta: string[] = []
  if (lead.servico) meta.push(`Serviço: ${lead.servico}`)
  if (lead.orcamento) meta.push(`Orçamento: ${lead.orcamento}`)
  if (lead.momento) meta.push(`Momento: ${lead.momento}`)
  if (lead.origem) meta.push(`Origem: ${lead.origem}`)
  const utm: string[] = []
  if (lead.utm_source) utm.push(`source=${lead.utm_source}`)
  if (lead.utm_medium) utm.push(`medium=${lead.utm_medium}`)
  if (lead.utm_campaign) utm.push(`campaign=${lead.utm_campaign}`)
  if (meta.length) parts.push(meta.join(' | '))
  if (utm.length) parts.push(`UTM: ${utm.join(', ')}`)
  return parts.join('\n') || '(sem mensagem)'
}

const BodySchema = z.object({
  nome: z.string().min(1).max(200),
  whatsapp: z.string().max(40).optional().default(''),
  email: z.string().max(255).optional().default(''),
  orcamento: z.string().max(100).optional().default(''),
  momento: z.string().max(100).optional().default(''),
  mensagem: z.string().max(2000).optional().default(''),
  servico: z.string().max(100).optional().default('Diagnóstico Estratégico'),
  origem: z.string().max(100).optional().default('formulario_principal'),
  data: z.string().max(50).optional().default(''),
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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const API_KEY = Deno.env.get('CRM_WEBHOOK_API_KEY')
    const DATEAHOME_API_KEY = Deno.env.get('DATEAHOME_API_KEY')
    if (!API_KEY) {
      return new Response(JSON.stringify({ error: 'CRM not configured' }), {
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

    const lead = parsed.data

    // Persist lead in database (source of truth, independent of CRM)
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const db = createClient(SUPABASE_URL, SERVICE_ROLE)

    const ipHeader = req.headers.get('x-forwarded-for') || ''
    const ip = ipHeader.split(',')[0].trim()
    const userAgent = req.headers.get('user-agent') || ''
    const ipHash = ip ? await sha256Hex(ip + '|godoyprime-salt-v1') : null

    let leadId: string | null = null
    try {
      const { data: inserted, error: insertErr } = await db
        .from('leads')
        .insert({
          nome: lead.nome,
          email: lead.email || null,
          whatsapp: lead.whatsapp || null,
          servico: lead.servico || null,
          orcamento: lead.orcamento || null,
          momento: lead.momento || null,
          mensagem: lead.mensagem || null,
          origem: lead.origem || null,
          utm_source: lead.utm_source || null,
          utm_medium: lead.utm_medium || null,
          utm_campaign: lead.utm_campaign || null,
          utm_content: lead.utm_content || null,
          utm_term: lead.utm_term || null,
          referrer: lead.referrer || null,
          landing_path: lead.landing_path || null,
          user_agent: userAgent || null,
          ip_hash: ipHash,
          crm_status: 'pending',
        })
        .select('id')
        .single()
      if (insertErr) console.error('DB insert error:', insertErr)
      else leadId = inserted?.id ?? null
    } catch (e) {
      console.error('DB insert exception:', e)
    }

    // Map to CRM expected payload
    const crmPayload = {
      name: lead.nome,
      email: lead.email,
      phone: lead.whatsapp,
      tipo_funil: TIPO_FUNIL,
      message: lead.mensagem,
      orcamento: lead.orcamento,
      momento: lead.momento,
      servico: lead.servico,
      origem: lead.origem,
      data: lead.data,
    }

    // Build DateAHome payload
    const { ddd, phone } = splitPhone(lead.whatsapp || '')
    const dateAHomePayload = {
      leadOrigin: LEAD_ORIGIN,
      name: lead.nome,
      email: lead.email,
      ddd,
      phone,
      message: buildDateAHomeMessage(lead),
      timestamp: new Date().toISOString(),
      originLeadId: leadId || `gp-${Date.now()}`,
      originListingId: 'godoyprime-landing',
      clientListingId: lead.landing_path || 'godoyprime-landing',
    }

    // Fire both CRMs in parallel
    const [crmResult, dahResult] = await Promise.allSettled([
      fetch(CRM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify(crmPayload),
      }).then(async (r) => {
        const t = await r.text()
        let b: unknown = t; try { b = JSON.parse(t) } catch {}
        return { ok: r.ok, status: r.status, body: b }
      }),
      DATEAHOME_API_KEY
        ? fetch(DATEAHOME_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-API-Key': DATEAHOME_API_KEY },
            body: JSON.stringify(dateAHomePayload),
          }).then(async (r) => {
            const t = await r.text()
            let b: unknown = t; try { b = JSON.parse(t) } catch {}
            return { ok: r.ok, status: r.status, body: b }
          })
        : Promise.resolve({ ok: false, status: 0, body: 'DATEAHOME_API_KEY not configured' }),
    ])

    const crm = crmResult.status === 'fulfilled' ? crmResult.value : { ok: false, status: 0, body: String((crmResult as PromiseRejectedResult).reason) }
    const dah = dahResult.status === 'fulfilled' ? dahResult.value : { ok: false, status: 0, body: String((dahResult as PromiseRejectedResult).reason) }

    // Update lead row with both statuses
    if (leadId) {
      try {
        await db
          .from('leads')
          .update({
            crm_status: crm.ok ? 'sent' : 'failed',
            crm_response: { status: crm.status, body: crm.body },
            dateahome_status: dah.ok ? 'sent' : 'failed',
            dateahome_response: { status: dah.status, body: dah.body },
            dateahome_attempts: 1,
            dateahome_last_attempt_at: new Date().toISOString(),
          })
          .eq('id', leadId)
      } catch (e) {
        console.error('DB update error:', e)
      }
    }

    if (!crm.ok) console.error('CRM webhook error:', crm.status, crm.body)
    if (!dah.ok) console.error('DateAHome webhook error:', dah.status, dah.body)

    // We return 200 as long as the lead was persisted; partial CRM failures retried by cron.
    return new Response(JSON.stringify({
      success: true,
      lead_id: leadId,
      crm: { ok: crm.ok, status: crm.status },
      dateahome: { ok: dah.ok, status: dah.status },
      data: crm.body,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
