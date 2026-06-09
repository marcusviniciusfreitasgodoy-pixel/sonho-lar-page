## Problema

Ao importar o PDF "artigos Personal Shopper Imobiliário.pdf", a toast exibida foi *"PDF importado. Revise o texto…"* — ramo executado quando `rawConteudo.trim().length < 80`. Ou seja, a edge function `import-pdf-artigo` retornou conteúdo (não vazio, por isso não deu erro 422), mas curto demais para alimentar o campo **Conteúdo completo** e disparar o encadeamento automático da IA.

Causa raiz: a função usa apenas o `unpdf` (parser puro JS). Em PDFs majoritariamente escaneados/com imagens/colunas complexas, o `unpdf` devolve pouquíssimo texto, mas não vazio — então a validação atual (`if (!rawText.trim())`) não dispara, e o frontend recebe um conteúdo insuficiente.

## Solução

Implementar extração em cascata na edge function `import-pdf-artigo`:

1. **Tentativa nativa** com `unpdf` (já existente).
2. **Avaliação de qualidade**: considerar ruim se `rawText.length < 500` **ou** menos de 100 caracteres alfabéticos (regex `/[a-zA-Zà-úÀ-Ú]/g`).
3. **Fallback OCR via Lovable AI Gateway** (`google/gemini-2.5-flash`) — envia o PDF inteiro como `inline_data` (`application/pdf`) com instrução: *"Extraia todo o texto deste documento PDF, preservando títulos, parágrafos e listas. Devolva apenas o texto extraído, em português."*. Usa `LOVABLE_API_KEY` (já cadastrada).
4. **Limites/guardas**:
   - Se PDF > 8 MB no fallback, recusar e instruir comprimir.
   - Tratar `429` (rate limit) e `402` (créditos) devolvendo mensagem clara para a toast do frontend.
5. **Pós-processamento**: rodar `textToMarkdown` + `extractTituloResumo` no texto final (nativo OU OCR), de forma que o retorno (`titulo`, `resumo`, `conteudo`) permaneça igual ao formato atual — sem mudanças no frontend.
6. **Logs**: `console.info("[import-pdf-artigo] extraction=", strategy, "chars=", n)` para diagnosticar futuras importações nos logs da função.

Resultado esperado: para o mesmo PDF, `conteudo` virá > 80 chars, o `setForm` preenche o campo, e o encadeamento automático para `gerar-artigo-ia` é executado, formatando o artigo sem ação manual.

## Detalhes técnicos

- Arquivo único alterado: `supabase/functions/import-pdf-artigo/index.ts`.
- Sem mudanças de schema, RLS, secrets ou frontend.
- Endpoint do gateway: `POST https://ai.gateway.lovable.dev/v1/chat/completions` com mensagens multimodais (`type: "file"`, `mime_type: "application/pdf"`, `data: base64`). Caso o modelo `gemini-2.5-flash` rejeite PDF direto, alternativa: usar `google/gemini-2.5-flash` com `image_url` apontando para data-URL `data:application/pdf;base64,...` (formato suportado pelo gateway Lovable).
- Função `extractTextWithAi(bytes, filename)` isolada para fácil manutenção/teste.

## Validação

1. Reimportar o mesmo PDF pelo dialog `Novo artigo → Importar PDF`.
2. Confirmar que o campo **Conteúdo completo** é preenchido (> 80 chars) e que a toast final é *"PDF importado e formatado com IA."*.
3. Conferir nos logs da edge function a linha `extraction= ocr-ai chars= …`.
