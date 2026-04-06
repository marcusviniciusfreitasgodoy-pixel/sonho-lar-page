

## Adicionar imagem da Barra da Tijuca como background do Hero

Atualmente o hero usa um layout split: lado esquerdo com texto (fundo `--charcoal`) e lado direito com a imagem. A proposta é usar a imagem como background de toda a seção hero, removendo o split, e adicionar um overlay escuro para garantir legibilidade dos textos.

### Alterações

#### 1. `src/components/LandingPageV4.tsx`
- Remover a `div.hero-right` com a `<img>` separada
- Adicionar `style={{ backgroundImage: url(heroImage) }}` na `<section className="hero">` (ou via classe)
- Manter toda a estrutura de `.hero-left` com os textos

#### 2. `src/styles/landing-v4.css`
- `.hero`: remover `grid-template-columns: 55% 45%` e `display:grid`. Usar `position:relative; background-size:cover; background-position:center 30%`
- Adicionar pseudo-elemento `.hero::before` com overlay gradient escuro (ex: `linear-gradient(to right, rgba(22,20,18,0.92) 0%, rgba(22,20,18,0.7) 100%)`) para garantir contraste do texto
- `.hero-left`: largura máxima ~60%, padding generoso, `position:relative; z-index:1`
- Remover `.hero-right` e suas regras
- **Mobile** (`max-width:780px`): `.hero-left` ocupa 100%, overlay mais opaco (~0.85) para legibilidade, texto centralizado

