
Objetivo

- Centralizar horizontalmente o conteúdo principal da Hero no desktop e no tablet, porque hoje ele continua visualmente ancorado à esquerda.

Diagnóstico

- A home está renderizando `LandingPageV4` em `src/pages/Index.tsx`, então o preview não está usando um componente antigo paralelo.
- O problema está no CSS atual de `src/styles/landing-v4.css`:
  - no desktop/tablet, `.hero-left` continua sem centralização horizontal;
  - `.hero-text` mantém largura máxima, mas sem `text-align:center` nem `align-items:center`;
  - a centralização horizontal hoje só existe no mobile dentro de `@media(max-width:780px)`.
- Ou seja: as mudanças anteriores atacaram mais a centralização vertical (`justify-content`) do que a horizontal.

Plano de correção

1. Ajustar `src/styles/landing-v4.css` para a Hero ficar centralizada também fora do mobile:
   - `.hero-left`: manter o centro vertical e passar a centralizar os filhos horizontalmente.
   - `.hero-text`: aplicar alinhamento central real do conteúdo, não apenas limitar largura.
2. Centralizar os elementos internos do bloco principal no desktop/tablet:
   - `.hero-eyebrow`
   - `.hero-ctas`
   - `.hero-footnote`
3. Manter `.hero-credentials` separada do texto, mas alinhada ao centro da seção para não parecer desalinhada em relação ao bloco principal.
4. Preservar o comportamento mobile atual, revisando apenas os estilos de desktop/tablet para não quebrar o layout menor.
5. Validar no preview em desktop e tablet para confirmar que título, subtítulo, botões e apoio visual deixaram de ficar “margeados” à esquerda.

Detalhes técnicos

- Arquivo principal: `src/styles/landing-v4.css`
- Ajuste principal esperado: trocar a lógica de alinhamento horizontal de esquerda para centro usando `align-items`, `text-align` e `justify-content` nos seletores da Hero.
- `src/components/LandingPageV4.tsx` provavelmente não precisa de mudança estrutural, porque a separação entre texto e credenciais já existe.
