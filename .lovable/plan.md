## Objetivo

Hoje, ao importar o HTML, perdemos informações (categoria, capa, blocos especiais) e o blog renderiza com um CSS diferente do arquivo. Vou ajustar **importador + sanitizador + CSS do blog** para que o artigo publicado fique visualmente igual ao arquivo de origem.

## Lacunas identificadas no fluxo atual

Comparando `Artigo_01_-_Personal_Shopper_Imobiliario.html` com o que hoje é importado e renderizado:

| Elemento no arquivo | Hoje | Após ajuste |
|---|---|---|
| `<h1>` do hero | ✅ vira título | mantém |
| `<meta description>` | ✅ vira resumo | mantém |
| `.hero-eyebrow` ("Educacional") | ❌ descartado | → preenche **Categoria** |
| `<header><img>` da capa | ❌ ignorado (URL relativa) | extrai `src`+`alt`; se relativa, mostra aviso pedindo upload manual |
| `<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>` | ✅ parcial (ol vira ul) | preserva `<ol>` com numeração |
| `<strong>`, `<em>`, `<a>` | ✅ | mantém |
| `<blockquote>` | ❌ removido pelo sanitizador | preservado |
| `.callout` / `.callout-label` | ❌ removido | preservado com classes |
| `.stat-row` / `.stat-cell` | ❌ removido | preservado |
| `.comparison-table` (table/thead/tbody) | ❌ removido | preservado |
| `<nav>`, `<footer>`, `.article-cta`, `.related-nav` | ✅ descartado | continua descartando |

## Mudanças

### 1. Importador — `src/pages/AdminArtigos.tsx` (`parseHtmlToArtigo`)
- Ler `<meta name="description">` para resumo (já feito, manter).
- Pegar `.hero-eyebrow` (texto) → retornar `categoria`.
- Pegar `header.article-hero img` → retornar `{capaUrl, capaAlt}`. Se for URL absoluta (`http(s)://`), preencher `form.imagem_capa`. Se relativa (`../assets/...`), mostrar toast: "Capa não importada automaticamente — envie a imagem manualmente".
- Para o corpo, em vez de reconstruir tag a tag, **clonar `.article-body`** (ou `<main>` se não houver), **remover** `.article-cta`, `.related-nav`, `script`, `style`, `nav`, `footer`, e devolver o `innerHTML` resultante (já sem inline styles após sanitização).
- Continuar normalizando travessões/em-dash em nós de texto.

### 2. Sanitizador — `src/lib/renderArticleContent.tsx`
- Ampliar whitelist de tags: adicionar `div, span, table, thead, tbody, tr, th, td, figure, figcaption`.
- Permitir atributo `class` apenas se valor estiver em allowlist: `article-lead`, `callout`, `callout-label`, `stat-row`, `stat-cell`, `stat-n`, `stat-l`, `comparison-table`.
- Remover todo `style=`, `id=`, `onclick=` etc. (já é o comportamento; apenas garantir).
- Manter renderização via `dangerouslySetInnerHTML` no wrapper `.article-html`.

### 3. CSS do blog público — `src/pages/Artigo.tsx` (ou folha associada)
Adicionar regras dentro de `.article-html` espelhando o arquivo original:
- `h2`: Cormorant Garamond 700, borda superior fina, margem 52px.
- `h3`: Montserrat 600, uppercase leve.
- `p.article-lead`: 19px, line-height 1.9.
- `ul li`: bullet dourado (#9E7B2A) com `::before` redondo.
- `ol`: counter `decimal-leading-zero` em dourado Cormorant.
- `blockquote`: borda esquerda dourada, itálico Cormorant.
- `.callout`: caixa creme com borda dourada e label monospace.
- `.stat-row`/`.stat-cell`/`.stat-n`/`.stat-l`: grid de estatísticas.
- `.comparison-table`: tabela com tipografia Montserrat no head.

A paleta já é Warm Luxury (#FAFAF8 / #161412 / #9E7B2A), então o resultado fica idêntico sem importar o `<style>` original.

### 4. Reprocessar artigo de teste
Após implementar, importar `Artigo_01...html` no admin para validar visualmente que o preview e a página pública `/blog/<slug>` ficam iguais ao arquivo.

## O que **não** muda
- Schema do banco (campos atuais bastam).
- Nenhuma exclusão de artigos existentes — eles já estão em HTML limpo e continuam funcionando.
- Não importamos `<style>` do arquivo (segurança); a paridade visual vem do CSS do blog.

## Limitação a comunicar ao usuário
A imagem de capa só é importada automaticamente quando o `src` for URL absoluta. Imagens com caminho relativo (`../assets/...`) precisam ser enviadas manualmente pelo campo "Imagem de capa".
