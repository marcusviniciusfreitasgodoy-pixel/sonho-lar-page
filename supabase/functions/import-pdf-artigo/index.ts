// Edge function: extrai texto de um PDF enviado em base64 e devolve um rascunho de artigo
// (titulo, resumo, conteudo em Markdown leve). Requer usuário autenticado com role 'admin'.

import { createClient } from 'npm:@supabase/supabase-js@2'
// unpdf é um parser PDF puro-JS que roda no Deno sem dependências nativas
import { extractText, getDocumentProxy } from 'npm:unpdf@0.12.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function base64ToUint8Array(b64: string): Uint8Array {
  const clean = b64.includes(',') ? b64.split(',')[1] : b64
  const bin = atob(clean)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

/**
 * Heurística para converter texto puro do PDF em Markdown leve:
 * - Quebra em parágrafos por linhas em branco.
 * - Linhas curtas (<=80 chars), sem pontuação final e seguidas de parágrafo viram `## Título`.
 * - Linhas começando com '•', '·' ou '-' viram itens de lista.
 * - Remove números de página soltos.
 */
function textToMarkdown(raw: string): string {
  // Normaliza quebras de linha e remove form-feeds entre páginas
  let txt = raw.replace(/\r\n/g, '\n').replace(/\f/g, '\n\n')

  // Remove hifenização de quebra de linha (palavra-\nfinal => palavrafinal)
  txt = txt.replace(/([a-záéíóúâêôãõç])-\n([a-záéíóúâêôãõç])/gi, '$1$2')

  // Junta linhas que parecem fazer parte do mesmo parágrafo (linha que não termina em pontuação)
  const lines = txt.split('\n').map((l) => l.trim())
  const merged: string[] = []
  for (const line of lines) {
    // Pula números de página
    if (/^\d{1,3}$/.test(line)) continue
    if (line === '') {
      merged.push('')
      continue
    }
    const prev = merged[merged.length - 1]
    if (prev && prev !== '' && !/[.!?:;)"']$/.test(prev) && prev.length > 40) {
      merged[merged.length - 1] = prev + ' ' + line
    } else {
      merged.push(line)
    }
  }

  // Agrupa em blocos separados por linha em branco
  const blocks: string[][] = [[]]
  for (const l of merged) {
    if (l === '') {
      if (blocks[blocks.length - 1].length > 0) blocks.push([])
    } else {
      blocks[blocks.length - 1].push(l)
    }
  }

  const out: string[] = []
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    if (block.length === 0) continue

    // Bloco de lista
    if (block.every((l) => /^[•·\-*]\s+/.test(l))) {
      out.push(block.map((l) => '- ' + l.replace(/^[•·\-*]\s+/, '')).join('\n'))
      continue
    }

    // Linha única curta sem pontuação final => provável título de seção
    if (
      block.length === 1 &&
      block[0].length <= 80 &&
      block[0].length >= 4 &&
      !/[.!?:;]$/.test(block[0]) &&
      i > 0 // não tratar a primeira linha (vira título principal)
    ) {
      out.push('## ' + block[0])
      continue
    }

    out.push(block.join('\n'))
  }

  return out.join('\n\n').trim()
}

function extractTituloResumo(markdown: string): { titulo: string; resumo: string; conteudo: string } {
  const blocks = markdown.split(/\n\n+/)
  let titulo = ''
  let resumo = ''
  let startIdx = 0

  // Primeiro bloco vira título (tira ## se houver, limita a 200 chars)
  if (blocks.length > 0) {
    titulo = blocks[0].replace(/^##\s+/, '').replace(/\n/g, ' ').trim().slice(0, 200)
    startIdx = 1
  }

  // Próximo bloco que não seja heading vira resumo
  for (let i = startIdx; i < blocks.length; i++) {
    const b = blocks[i].trim()
    if (!b || b.startsWith('##') || b.startsWith('- ')) continue
    resumo = b.replace(/\n/g, ' ').slice(0, 280)
    break
  }

  const conteudo = blocks.slice(startIdx).join('\n\n').trim()
  return { titulo, resumo, conteudo }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const authHeader = req.headers.get('Authorization') ?? ''

    // Cliente autenticado com o JWT do usuário, para checar role
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
    const { file_base64, filename } = body as { file_base64?: string; filename?: string }
    if (!file_base64) {
      return new Response(JSON.stringify({ error: 'file_base64 obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const bytes = base64ToUint8Array(file_base64)
    if (bytes.length > 12 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'PDF acima de 12 MB' }), {
        status: 413,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const pdf = await getDocumentProxy(bytes)
    const { text } = await extractText(pdf, { mergePages: true })
    const rawText = Array.isArray(text) ? text.join('\n\n') : String(text ?? '')

    if (!rawText.trim()) {
      return new Response(
        JSON.stringify({
          error:
            'Não foi possível extrair texto do PDF. Pode ser um PDF escaneado (imagem). Nesse caso será necessário OCR.',
        }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const markdown = textToMarkdown(rawText)
    const { titulo, resumo, conteudo } = extractTituloResumo(markdown)

    return new Response(
      JSON.stringify({
        ok: true,
        titulo: titulo || (filename ?? 'Novo artigo').replace(/\.pdf$/i, ''),
        resumo,
        conteudo,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('[import-pdf-artigo]', err)
    return new Response(
      JSON.stringify({ error: 'Falha ao processar PDF', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
