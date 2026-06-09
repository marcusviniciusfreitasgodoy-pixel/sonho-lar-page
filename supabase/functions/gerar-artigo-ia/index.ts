// Edge function: usa Lovable AI Gateway para gerar um resumo curto e o
// conteúdo completo (em Markdown leve) de um artigo a partir do texto bruto
// importado (por exemplo, do PDF). Requer usuário autenticado com role 'admin'.

import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const SYSTEM_PROMPT = `Você é editor sênior de um blog brasileiro de alto padrão sobre mercado imobiliário de luxo (Personal Shopper Imobiliário em Barra da Tijuca, Portugal e Flórida).

Sua tarefa: a partir do texto bruto fornecido, produzir DOIS campos para um artigo:

1. "resumo": resumo curto de 1 a 2 frases (máx. 280 caracteres), em português do Brasil, tom sofisticado e direto, sem clichês, sem emojis, sem aspas.
2. "conteudo": artigo completo bem editado em Markdown leve. Use APENAS estas marcações:
   - "## " para subtítulos de seção
   - "### " para subtítulos menores (se necessário)
   - "- " para itens de lista
   - "**texto**" para negrito pontual
   - Parágrafos separados por uma linha em branco
   NÃO use HTML, NÃO use tabelas, NÃO use links Markdown, NÃO inclua o título principal do artigo (ele vai num campo separado), NÃO inclua nada do tipo "Resumo:" ou "Conteúdo:".

Preserve fatos, números e nomes. Corrija ortografia/pontuação, reorganize parágrafos para fluidez, remova ruídos de OCR/PDF (números de página, cabeçalhos repetidos), e estruture com subtítulos quando fizer sentido.

Responda EXCLUSIVAMENTE com JSON válido no formato {"resumo": "...", "conteudo": "..."}. Sem texto antes ou depois, sem cercas de código.`

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const lovableKey = Deno.env.get('LOVABLE_API_KEY')
    if (!lovableKey) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY ausente' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const authHeader = req.headers.get('Authorization') ?? ''
    const supabase = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    })

    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user
    if (!user) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const { data: isAdmin, error: roleErr } = await supabase.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin',
    })
    if (roleErr || !isAdmin) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const body = await req.json().catch(() => ({}))
    const { titulo, texto, categoria } = body as {
      titulo?: string
      texto?: string
      categoria?: string
    }
    const raw = (texto ?? '').trim()
    if (!raw) {
      return new Response(JSON.stringify({ error: 'Campo "texto" obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Limita o input para evitar custos absurdos (~ primeiras 12 mil palavras)
    const limited = raw.slice(0, 60000)

    const userPrompt = [
      titulo ? `Título do artigo: ${titulo}` : null,
      categoria ? `Categoria: ${categoria}` : null,
      '',
      'Texto bruto a ser editado:',
      '"""',
      limited,
      '"""',
    ]
      .filter((l) => l !== null)
      .join('\n')

    const aiResp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Lovable-API-Key': lovableKey,
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
      }),
    })

    if (!aiResp.ok) {
      const detail = await aiResp.text().catch(() => '')
      if (aiResp.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Limite de uso atingido. Tente novamente em instantes.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Créditos de IA esgotados. Recarregue em Configurações da Workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      return new Response(
        JSON.stringify({ error: 'Falha no provedor de IA', detail }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const aiJson = await aiResp.json()
    const content: string = aiJson?.choices?.[0]?.message?.content ?? ''
    let parsed: { resumo?: string; conteudo?: string } = {}
    try {
      parsed = JSON.parse(content)
    } catch {
      // tenta extrair JSON entre primeiras chaves
      const m = content.match(/\{[\s\S]*\}/)
      if (m) {
        try {
          parsed = JSON.parse(m[0])
        } catch {
          /* noop */
        }
      }
    }

    const resumo = (parsed.resumo ?? '').toString().trim().slice(0, 320)
    const conteudo = (parsed.conteudo ?? '').toString().trim()

    if (!resumo || !conteudo) {
      return new Response(
        JSON.stringify({ error: 'Resposta da IA em formato inesperado', raw: content }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(JSON.stringify({ ok: true, resumo, conteudo }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('[gerar-artigo-ia]', err)
    return new Response(
      JSON.stringify({ error: 'Erro inesperado', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})