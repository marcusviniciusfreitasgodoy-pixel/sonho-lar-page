import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const CRM_URL = 'https://crm-b2b-interface-clone-9bbb1.shrd00.internal.goskip.dev/backend/v1/webhook-external'
const TIPO_FUNIL = 'GPR'
const MAX_ATTEMPTS = 5
const BATCH = 20
const MIN_GAP_MIN = 10

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const API_KEY = Deno.env.get('CRM_WEBHOOK_API_KEY')
  if (!API_KEY) return new Response(JSON.stringify({ error: 'CRM not configured' }), { status: 500 })

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
  const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const db = createClient(SUPABASE_URL, SERVICE_ROLE)

  const cutoff = new Date(Date.now() - MIN_GAP_MIN * 60 * 1000).toISOString()

  const { data: leads, error } = await db
    .from('leads')
    .select('*')
    .eq('crm_status', 'failed')
    .lt('crm_attempts', MAX_ATTEMPTS)
    .or(`crm_last_attempt_at.is.null,crm_last_attempt_at.lt.${cutoff}`)
    .order('created_at', { ascending: true })
    .limit(BATCH)

  if (error) {
    console.error('cron query error', error)
    return new Response(JSON.stringify({ error }), { status: 500 })
  }

  const results: any[] = []
  for (const lead of leads || []) {
    try {
      const res = await fetch(CRM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({
          name: lead.nome, email: lead.email, phone: lead.whatsapp,
          tipo_funil: TIPO_FUNIL, message: lead.mensagem,
          orcamento: lead.orcamento, momento: lead.momento,
          servico: lead.servico, origem: lead.origem,
        }),
      })
      const text = await res.text()
      let body: unknown = text
      try { body = JSON.parse(text) } catch { /* keep raw */ }

      await db.from('leads').update({
        crm_status: res.ok ? 'sent' : 'failed',
        crm_response: { status: res.status, body },
        crm_attempts: (lead.crm_attempts || 0) + 1,
        crm_last_attempt_at: new Date().toISOString(),
      }).eq('id', lead.id)

      results.push({ id: lead.id, ok: res.ok, status: res.status })
    } catch (e) {
      console.error('retry error', lead.id, e)
      results.push({ id: lead.id, ok: false, error: String(e) })
    }
  }

  return new Response(JSON.stringify({ processed: results.length, results }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})