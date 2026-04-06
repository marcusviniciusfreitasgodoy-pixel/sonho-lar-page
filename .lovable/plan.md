

## Adaptar a Landing Page ao Design e Copy do index_v6.html

O arquivo `index_v6.html` traz um redesign significativo: layout split no hero, nova seção "Statement Strip", nova seção "Dados" (substituindo "Na Prática"), paleta de cores diferente, tipografia Lato em vez de DM Sans, e copy atualizada em diversas seções. Abaixo, as alterações necessárias organizadas por arquivo.

---

### Resumo das diferenças principais

1. **Hero**: Layout split (55%/45% com imagem ao lado), em vez de full-screen com overlay. Credenciais voltam (3 itens com valores numéricos). Sub-headline simplificada.
2. **Nova seção "Statement Strip"**: Citação de Marcus entre Hero e Problema. Fundo cream.
3. **Problema**: Adiciona 3 cards numerados (Assimetria de informação, Pressão para decidir rápido, Portfólio limitado). Copy ajustada.
4. **Modelo**: Tabela comparativa com 8 linhas (vs 6 atuais), com rodapé contendo citação e CTA. Seção "Modelo consolidado em" (países) no final.
5. **Processo**: Step 4 muda de "Matemática Inversa" para "Due Diligence" e Step 5 de "Due Diligence" para "Matemática Inversa" (ordem invertida). Copy de cada step ajustada.
6. **Nova seção "Dados"**: Substitui "Na Prática" (perfis A/B) por 3 cards com dados numéricos (ex: "+R$1,5M", "100%", "TJRJ") e nota informativa.
7. **Serviços**: Cards com descrição expandida incluindo texto em itálico introdutório, bloco de ROI/garantia, links WhatsApp diretos. Box "Capacidade limitada" ao final.
8. **Sobre**: Copy muito similar, sem grandes mudanças.
9. **FAQ**: 7 perguntas (vs 6 atuais). Adiciona "Minha busca e negociação são confidenciais?", "Já tenho um corretor...", "Qual é o custo total da operação?".
10. **Formulário**: Fundo escuro (vs vellum2 atual). Remove campo "Tipo de imóvel". Adiciona checkbox de consentimento LGPD. Copy do lado esquerdo ajustada. Adiciona "Momento da compra" dropdown com opções ligeiramente diferentes.
11. **Footer**: Adiciona coluna "Serviços" com links. Adiciona links Privacidade/Termos/Cookies. CNPJ adicionado.
12. **Paleta/Tipografia**: O v6 usa Lato como sans-serif (vs DM Sans). Cores levemente diferentes. O v6 tem um visual mais "warm cream" nas seções claras.

---

### Arquivos a editar

#### 1. `src/styles/landing-v4.css` — Revisão completa do CSS

- **Hero**: Reescrever para layout split (`grid-template-columns: 55% 45%`) em desktop, coluna única em mobile. Adicionar classes para `.hero-left`, `.hero-right`, `.hero-eyebrow`, `.hero-h1`, `.hero-credentials`, `.hero-cred`, `.hero-cred-val`, `.hero-cred-label`.
- **Statement Strip**: Nova seção `.statement` com fundo cream, texto em serif itálico centralizado.
- **Problema**: Adicionar grid `.prob-cards` com 3 colunas e cards numerados. Ajustar `.prob-body` para layout 2 colunas (texto + callout sidebar).
- **Modelo**: Refazer tabela comparativa com 3 colunas (`200px 1fr 1fr`): critério + tradicional + Godoy Prime. 8 linhas. Rodapé com citação e CTA. Seção `.intl` (países).
- **Serviços**: Cards com tags coloridas, descrição em itálico, bloco de ROI/nota, garantia, botões WhatsApp. Box "Capacidade limitada".
- **FAQ**: Ajustar para 7 itens.
- **Formulário**: Fundo escuro, layout 2 colunas, checkbox consentimento.
- **Footer**: 3 colunas (marca, contato, serviços). Links legais no rodapé.
- **Paleta**: Ajustar variáveis CSS para corresponder ao v6 (cores cream/charcoal levemente diferentes).
- **Responsividade mobile**: Manter mobile-first. Hero colapsa para 1 coluna, tabela comparativa esconde coluna de critérios, steps 1 coluna, etc.

#### 2. `src/components/LandingPageV4.tsx` — Reescrita de JSX e copy

- **Hero**: Layout split com `hero-left` (texto) e `hero-right` (imagem). Adicionar eyebrow "Personal Shopper Imobiliário · Barra da Tijuca e Recreio". Credenciais: 3 itens (+R$1,5M / 100% / TJRJ). Sub-headline: "Você é o único na negociação sem ninguém *realmente* do seu lado. Eu mudo essa equação." CTAs: "Agendar Diagnóstico Gratuito" e "Ver como funciona".
- **Statement Strip**: Nova seção com citação de Marcus.
- **Problema**: Manter copy existente + adicionar 3 cards (Assimetria de informação, Pressão para decidir rápido, Portfólio limitado). Layout body em 2 colunas.
- **Modelo**: Tabela com 8 linhas (Vínculo contratual, A quem representa, Remuneração, Acesso ao mercado, Análise técnica, Conflito de interesse, Negociação, Acompanhamento). Rodapé com citação e CTA. Seção de países.
- **Processo**: Inverter steps 4 e 5. Ajustar copy de cada step conforme v6.
- **Nova seção "Dados"**: 3 cards com dados numéricos + nota informativa (substituindo perfis A/B).
- **Serviços**: Expandir cards com descrição em itálico, bloco ROI, CTAs WhatsApp. Box "Capacidade limitada".
- **FAQ**: 7 perguntas conforme v6.
- **Formulário**: Remover "Tipo de imóvel". Adicionar checkbox consentimento LGPD. Ajustar opções do dropdown "Faixa de investimento" (R$1,5M–R$2,5M / R$2,5M–R$4M / R$4M–R$6M / Acima de R$6M). Ajustar copy do lado esquerdo.
- **Footer**: 3 colunas. Links para privacidade/termos/cookies. CNPJ.

#### 3. `index.html` — Meta tags e SEO

- Atualizar `<title>`, `<meta description>`, Open Graph, Twitter Cards conforme v6.
- Adicionar Schema.org JSON-LD conforme v6.
- Adicionar preconnect para Google Fonts (Lato, se adotada).

---

### Detalhes Tecnicas

- A paleta do v6 usa tons mais quentes (`#FAFAF8`, `#F3EBE0`, `#161412`, `#9E7B2A`). As variáveis CSS serão atualizadas para corresponder.
- O font body do v6 é Lato (300/400/700) em vez de DM Sans. Isto pode ser mantido como DM Sans se preferido, ou migrado.
- O hero split usa `<img>` real em vez de `background-image`. Como temos o asset `heroImage`, podemos usar `<img>` com `object-fit: cover`.
- A tabela comparativa do v6 usa inline styles extensivos — serão convertidos para classes CSS reutilizáveis.
- Links WhatsApp nos serviços usam mensagens pré-formatadas diferentes para cada serviço.
- O formulário no v6 envia via Resend API — manteremos o edge function existente.

