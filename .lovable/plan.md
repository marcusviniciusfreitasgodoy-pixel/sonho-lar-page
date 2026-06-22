Ajustar a visualização da frase principal da hero section no desktop seguindo a direção "Cinematic editorial serif" escolhida.

## Contexto

A hero atual exibe a frase "Comprar imóvel de alto padrão sem representação exclusiva é o erro mais caro do mercado" em uma única linha longa, com título em ~58px e bloco de texto limitado a 560px. No desktop, isso deixa o headline menos impactante e mais difícil de escanear.

## Mudanças propostas

### 1. Tipografia do título
- Aumentar o título de ~58px para até 72px no desktop (`clamp(40px, 5.5vw, 72px)`).
- Manter Cormorant Garamond e line-height próximo de 1.1.
- Aumentar a largura máxima do bloco de texto para ~1000px para acomodar quebras naturais de leitura.
- Adicionar quebras de linha controladas apenas no desktop (`.hero-br`), mantendo o texto fluído no mobile.

### 2. Destaque em "erro mais caro"
- Manter o itálico dourado.
- Adicionar um sublinhado SVG sutil em forma de onda abaixo da expressão, usando a cor dourada do projeto (`var(--gold2)`).

### 3. Eyebrow
- Adicionar duas linhas horizontais douradas aos lados do texto "PERSONAL SHOPPER IMOBILIÁRIO", criando simetria visual e hierarquia.

### 4. Subtítulo
- Aumentar max-width para ~640px.
- Destacar "Eu mudo esse jogo" com peso maior e cor clara, separando visualmente das duas frases anteriores.

### 5. Contraste e espaçamento
- Ajustar o gradiente escuro sobre a imagem para priorizar a legibilidade do texto.
- Aumentar ligeiramente o padding superior da hero para compensar a altura da navegação.

## Arquivos afetados

- `src/components/LandingPageV4.tsx` — ajustar estrutura do hero (eyebrow, quebras, SVG, subtítulo).
- `src/styles/landing-v4.css` — ajustar estilos tipográficos e espaciais do hero no desktop e manter o mobile intacto.

## Validação

- Rodar `bun run build` para garantir que não há erros de compilação.
- Capturar screenshot em 1440x900 para confirmar que o headline está mais legível e impactante.
- Verificar screenshot mobile para garantir que não houve regressão.