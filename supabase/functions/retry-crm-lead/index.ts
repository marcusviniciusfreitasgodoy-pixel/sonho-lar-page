import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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
  if (meta.length) parts.push(meta.join(' | '))
  return parts.join('\n') || '(sem mensagem)'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const ANON = Deno.env.get('SUPABASE_ANON_KEY')!
    const API_KEY = Deno.env.get('CRM_WEBHOOK_API_KEY')
    const DATEAHOME_API_KEY = Deno.env.get('DATEAHOME_API_KEY')
    if (!API_KEY) return j({ error: 'CRM not configured' }, 500)

    // Verify caller is authenticated admin
    const authHeader = req.headers.get('Authorization') || ''
    const userClient = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: authHeader } } })
    const { data: userData } = await userClient.auth.getUser()
    if (!userData?.user) return j({ error: 'Unauthorized' }, 401)

    const db = createClient(SUPABASE_URL, SERVICE_ROLE)
    const { data: roleData } = await db
      .from('user_roles')
      .select('role')
      .eq('user_id', userData.user.id)
      .eq('role', 'admin')
      .maybeSingle()
    if (!roleData) return j({ error: 'Forbidden' }, 403)

    const reqBody = await req.json()
    const lead_id: string | undefined = reqBody?.lead_id
    const target: 'crm' | 'dateahome' | 'both' = reqBody?.target === 'dateahome' || reqBody?.target === 'both' ? reqBody.target : 'crm'
    if (!lead_id || typeof lead_id !== 'string') return j({ error: 'lead_id required' }, 400)

    const { data: lead, error: leadErr } = await db.from('leads').select('*').eq('id', lead_id).maybeSingle()
    if (leadErr || !lead) return j({ error: 'Lead not found' }, 404)

    const out: any = { success: true }
    const update: any = {}

    if (target === 'crm' || target === 'both') {
      const r = await sendToCrm(lead, API_KEY)
      update.crm_status = r.ok ? 'sent' : 'failed'
      update.crm_response = { status: r.status, body: r.body }
      update.crm_attempts = (lead.crm_attempts || 0) + 1
      update.crm_last_attempt_at = new Date().toISOString()
      out.crm = { ok: r.ok, status: r.status, body: r.body }
      if (!r.ok) out.success = false
    }

    if (target === 'dateahome' || target === 'both') {
      if (!DATEAHOME_API_KEY) {
        out.dateahome = { ok: false, error: 'DATEAHOME_API_KEY not configured' }
        out.success = false
      } else {
        const r = await sendToDateAHome(lead, DATEAHOME_API_KEY)
        update.dateahome_status = r.ok ? 'sent' : 'failed'
        update.dateahome_response = { status: r.status, body: r.body }
        update.dateahome_attempts = (lead.dateahome_attempts || 0) + 1
        update.dateahome_last_attempt_at = new Date().toISOString()
        out.dateahome = { ok: r.ok, status: r.status, body: r.body }
        if (!r.ok) out.success = false
      }
    }

    await db.from('leads').update(update).eq('id', lead.id)
    return j(out, 200)
  } catch (e) {
    console.error(e)
    return j({ error: 'Internal error', detail: String(e) }, 500)
  }

  function j(obj: unknown, status: number) {
    return new Response(JSON.stringify(obj), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})

async function sendToCrm(lead: any, apiKey: string) {
  const payload = {
    name: lead.nome,
    email: lead.email,
    phone: lead.whatsapp,
    tipo_funil: TIPO_FUNIL,
    message: lead.mensagem,
    orcamento: lead.orcamento,
    momento: lead.momento,
    servico: lead.servico,
    origem: lead.origem,
  }
  const res = await fetch(CRM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify(payload),
  })
  const text = await res.text()
  let body: unknown = text
  try { body = JSON.parse(text) } catch { /* keep raw */ }
  return { ok: res.ok, status: res.status, body }
}

async function sendToDateAHome(lead: any, apiKey: string) {
  const { ddd, phone } = splitPhone(lead.whatsapp || '')
  const payload = {
    leadOrigin: LEAD_ORIGIN,
    name: lead.nome,
    email: lead.email,
    ddd,
    phone,
    message: buildDateAHomeMessage(lead),
  }
  const res = await fetch(DATEAHOME_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify(payload),
  })
  const text = await res.text()
  let body: unknown = text
  try { body = JSON.parse(text) } catch { /* keep raw */ }
  return { ok: res.ok, status: res.status, body }
}