const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

import { z } from 'npm:zod@3.25.76'

const CRM_URL = 'https://crm-b2b-interface-clone-9bbb1.shrd00.internal.goskip.dev/backend/v1/webhook-external'
const TIPO_FUNIL = 'GPR'

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
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const API_KEY = Deno.env.get('CRM_WEBHOOK_API_KEY')
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

    const res = await fetch(CRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(crmPayload),
    })

    const text = await res.text()
    let data: unknown = text
    try { data = JSON.parse(text) } catch { /* keep raw */ }

    if (!res.ok) {
      console.error('CRM webhook error:', res.status, data)
      return new Response(JSON.stringify({ error: 'CRM send failed', status: res.status, details: data }), {
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
