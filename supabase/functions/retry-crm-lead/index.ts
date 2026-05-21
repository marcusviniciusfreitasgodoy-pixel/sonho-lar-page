import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const CRM_URL = 'https://crm-b2b-interface-clone-9bbb1.shrd00.internal.goskip.dev/backend/v1/webhook-external'
const TIPO_FUNIL = 'GPR'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const ANON = Deno.env.get('SUPABASE_ANON_KEY')!
    const API_KEY = Deno.env.get('CRM_WEBHOOK_API_KEY')
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

    const { lead_id } = await req.json()
    if (!lead_id || typeof lead_id !== 'string') return j({ error: 'lead_id required' }, 400)

    const { data: lead, error: leadErr } = await db.from('leads').select('*').eq('id', lead_id).maybeSingle()
    if (leadErr || !lead) return j({ error: 'Lead not found' }, 404)

    const result = await sendToCrm(lead, API_KEY)

    await db.from('leads').update({
      crm_status: result.ok ? 'sent' : 'failed',
      crm_response: { status: result.status, body: result.body },
      crm_attempts: (lead.crm_attempts || 0) + 1,
      crm_last_attempt_at: new Date().toISOString(),
    }).eq('id', lead.id)

    return j({ success: result.ok, crm_status: result.ok ? 'sent' : 'failed', http: result.status, body: result.body }, 200)
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