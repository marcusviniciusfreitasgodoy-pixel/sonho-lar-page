

## Corrigir Responsividade Mobile (375px) — Seções Invisíveis e Hero Quebrado

### Problemas Identificados

1. **Seções intermediárias invisíveis**: Todas as seções entre Hero e Footer estão no DOM mas invisíveis. O `scroll-reveal` (opacity:0) aplicado em `<section>` inteiras nunca recebe a classe `revealed` porque o IntersectionObserver não dispara corretamente no mobile — provavelmente porque as seções com opacity:0 e transform ainda ocupam espaço mas o observer com threshold 0.12 não as detecta quando o scroll pula diretamente do hero para o footer.

2. **Hero sem breakpoint mobile**: O grid `55% 45%` permanece em 375px, cortando texto atrás da imagem.

3. **Footer com grid de 3 colunas** sem breakpoint mobile.

---

### Correções Planejadas

#### 1. `src/styles/landing-v4.css` — Adicionar media queries mobile

**Hero mobile** (max-width: 780px):
- Mudar grid para `1fr` (coluna única)
- Hero-left: padding ajustado, align-items center
- Hero-right: max-height 300px, order -1 (imagem em cima)
- Hero-credentials: flex-wrap, gap reduzido
- Hero-ctas: flex-direction column, width 100%

**Footer mobile** (max-width: 780px):
- Grid 1 coluna

#### 2. `src/components/LandingPageV4.tsx` — Corrigir scroll-reveal nas sections

O problema principal é que `scroll-reveal` está no `<section>` externo, tornando seções inteiras invisíveis. A correção:
- **Remover** `scroll-reveal` e `ref={reveal}` dos elementos `<section>` externos (linhas 233, 272, 336, 363, 395, 459, 491, 517)
- Manter `scroll-reveal` apenas nos elementos internos (headers, cards, steps) que já têm seus próprios `ref={reveal}`

Isso garante que as seções são sempre visíveis e apenas os elementos internos fazem a animação de reveal.

---

### Resumo

| Arquivo | Mudança |
|---------|---------|
| `LandingPageV4.tsx` | Remover `scroll-reveal`/`ref={reveal}` de 8 `<section>` wrappers |
| `landing-v4.css` | Adicionar `@media(max-width:780px)` para hero (grid 1col, imagem em cima) e footer (1col) |

