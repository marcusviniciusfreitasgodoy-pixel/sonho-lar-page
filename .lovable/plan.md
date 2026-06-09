## Objetivo

Tornar a publicação de artigos fluida no painel `/admin/artigos`:
1. Upload de imagem de capa direto (arrastar/soltar), mantendo "colar URL" como alternativa.
2. Botão **Pré-visualizar** que mostra o artigo exatamente como aparece em `/artigos/slug`.
3. Fluxo claro para transformar PDFs prontos em posts do blog.

O formato do conteúdo continua sendo **texto com Markdown leve** (`##`, `**`, `-`) — é o que o `renderArticleContent.tsx` já entende, é seguro (sem XSS), responsivo e bom para SEO. **HTML colado e PDF embutido não serão aceitos** pelos motivos explicados no chat.

---

## 1. Upload de imagem de capa

**Storage:** criar um bucket público `artigos` no Lovable Cloud com policies:
- Leitura pública (qualquer um vê as imagens nos posts).
- Insert/Update/Delete restritos a `has_role(auth.uid(), 'admin')`.

**UI no painel (`AdminArtigos.tsx`):** o campo "Link da imagem de capa" vira um componente com duas opções:
- **Enviar arquivo** — drag-and-drop ou clique para escolher (aceita JPG/PNG/WebP, até 5 MB). Mostra preview, faz upload para `artigos/{uuid}.{ext}` e preenche `imagem_capa` com a URL pública.
- **Colar URL** — campo de texto como hoje, para imagens externas (Unsplash etc.).

Validações: tipo MIME, tamanho máx 5 MB, dimensão recomendada exibida como dica (1600×900).

## 2. Botão Pré-visualizar

No diálogo de edição, adicionar uma aba/botão **Pré-visualizar** ao lado de "Cancelar/Salvar". Abre um modal grande renderizando o artigo com o mesmo CSS de `Artigo.tsx` (capa, título, data, conteúdo via `renderArticleContent`). Sem salvar no banco — usa o estado do formulário.

Vantagem: você revisa antes de publicar, sem precisar salvar como Inativo e abrir em outra aba.

## 3. Fluxo para PDFs prontos

Como você já tem PDFs, vou adicionar um **botão "Importar de PDF"** no topo do painel. Ele:

1. Aceita um PDF (até 10 MB).
2. Faz upload temporário para uma Edge Function `import-pdf-artigo`.
3. A função extrai o texto do PDF (usando `pdf-parse` no Deno) e devolve um rascunho estruturado:
   - **Título** = primeira linha grande / primeiro heading.
   - **Resumo** = primeiro parágrafo (limitado a ~280 caracteres).
   - **Conteúdo** = texto convertido para Markdown leve (parágrafos separados por linha em branco; tentativas heurísticas de marcar `##` em linhas curtas e em caixa alta).
4. Abre o diálogo "Novo artigo" já preenchido com esse rascunho, marcado como **Inativo**. Você revisa, ajusta a formatação, sobe a capa e ativa.

**Limites honestos do conversor de PDF:**
- PDFs com layout complexo (colunas, caixas, tabelas) saem com formatação imperfeita — vai precisar de retoque manual.
- Imagens dentro do PDF **não** são importadas (você sobe a capa separadamente).
- PDFs escaneados (imagem pura) não funcionam sem OCR — se algum for assim, me avise e adicionamos OCR depois.

---

## Detalhes técnicos

**Banco:** sem mudanças de schema. `artigos.imagem_capa` continua sendo `text` (URL). Só ganha um bucket de storage novo.

**Migration:**
- `storage_create_bucket('artigos', public=true)` via tool dedicado.
- Migration adicionando policies em `storage.objects` para o bucket `artigos`: SELECT público, INSERT/UPDATE/DELETE só para admin.

**Arquivos a editar/criar:**
- `src/pages/AdminArtigos.tsx` — novo componente de upload de capa, botão Preview, botão Importar PDF.
- `src/components/admin/CoverImageInput.tsx` (novo) — drag-drop + URL.
- `src/components/admin/ArtigoPreview.tsx` (novo) — modal de preview reutilizando estilo de `Artigo.tsx`.
- `supabase/functions/import-pdf-artigo/index.ts` (novo) — extração de texto e heurística de Markdown.
- `supabase/config.toml` — registrar a nova função (verify_jwt = true; só admin chama).

**Segurança:**
- Upload de imagem: validação de MIME e tamanho no cliente + RLS no storage garantindo que só admin escreve.
- Edge Function de import-pdf: valida `has_role(admin)` antes de processar.

---

## O que NÃO entra neste plano

- Editor WYSIWYG (rich text). Markdown leve continua sendo a fonte.
- Aceitar HTML colado (risco de XSS sem sanitizador dedicado).
- OCR de PDFs escaneados (faremos depois se precisar).
- Conversor "Colar do Word" (você disse que não precisa).

---

## Como vai ficar seu fluxo do dia a dia

**Artigo novo do zero:**
1. `/admin/artigos` → **Novo artigo**.
2. Arrasta a imagem de capa.
3. Escreve título, resumo e conteúdo (usando `##`, `**`, `-`).
4. Clica **Pré-visualizar** → ajusta se precisar.
5. Salva como Ativo.

**Artigo a partir de PDF:**
1. `/admin/artigos` → **Importar de PDF** → seleciona o arquivo.
2. Diálogo abre com rascunho preenchido (Inativo).
3. Você revisa o texto, sobe a capa, clica **Pré-visualizar**.
4. Ativa quando estiver bom.

Posso seguir com essa implementação?