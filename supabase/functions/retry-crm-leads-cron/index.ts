import { createClient } from 'npm:@supabase/supabase-js@2'

// redeploy: pick up CRON_SECRET env
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const MAX_ATTEMPTS = 5
const BATCH = 20
const MIN_GAP_MIN = 10
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
  if (meta.length) parts.push(meta.join(' | '))
  return parts.join('\n') || '(sem mensagem)'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const DATEAHOME_API_KEY = (Deno.env.get('DATEAHOME_API_KEY') ?? '').trim()
  if (!DATEAHOME_API_KEY) return new Response(JSON.stringify({ error: 'CRM not configured' }), { status: 500 })

  // Require shared secret — only callable by scheduled cron or admin tooling
  const CRON_SECRET = Deno.env.get('CRON_SECRET')
  const SERVICE_ROLE_FOR_AUTH = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const authHeader = req.headers.get('Authorization') || ''
  const token = authHeader.replace(/^Bearer\s+/i, '').trim()
  const allowed =
    (CRON_SECRET && token && token === CRON_SECRET) ||
    (token && token === SERVICE_ROLE_FOR_AUTH)
  if (!allowed) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
  const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const db = createClient(SUPABASE_URL, SERVICE_ROLE)

  const cutoff = new Date(Date.now() - MIN_GAP_MIN * 60 * 1000).toISOString()

  let dahOk = 0
  let dahFail = 0
  {
    const { data: dahLeads, error: dahErr } = await db
      .from('leads')
      .select('*')
      .eq('dateahome_status', 'failed')
      .lt('dateahome_attempts', MAX_ATTEMPTS)
      .or(`dateahome_last_attempt_at.is.null,dateahome_last_attempt_at.lt.${cutoff}`)
      .order('created_at', { ascending: true })
      .limit(BATCH)
    if (dahErr) console.error('dateahome cron query error', dahErr)
    for (const lead of dahLeads || []) {
      try {
        const { ddd, phone } = splitPhone(lead.whatsapp || '')
        const res = await fetch(DATEAHOME_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-API-Key': DATEAHOME_API_KEY },
          body: JSON.stringify({
            leadOrigin: LEAD_ORIGIN,
            name: lead.nome,
            email: lead.email,
            ddd,
            phone,
            message: buildDateAHomeMessage(lead),
            timestamp: new Date().toISOString(),
            originLeadId: lead.id,
            originListingId: 'godoyprime-landing',
            clientListingId: lead.landing_path || 'godoyprime-landing',
          }),
        })
        const text = await res.text()
        let body: unknown = text
        try { body = JSON.parse(text) } catch {}
        await db.from('leads').update({
          dateahome_status: res.ok ? 'sent' : 'failed',
          dateahome_response: { status: res.status, body },
          dateahome_attempts: (lead.dateahome_attempts || 0) + 1,
          dateahome_last_attempt_at: new Date().toISOString(),
        }).eq('id', lead.id)
        if (res.ok) dahOk++; else dahFail++
      } catch (e) {
        console.error('dateahome retry error', lead.id, e)
        dahFail++
      }
    }
  }

  return new Response(JSON.stringify({
    dateahome: { processed: dahOk + dahFail, ok: dahOk, failed: dahFail },
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})