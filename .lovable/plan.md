

## Melhorar visibilidade do texto na Hero Section

### Problema
No mobile (390px), o texto da hero compete com a imagem de fundo. O gradiente overlay não é escuro o suficiente e a fonte do headline poderia ser maior para mobile-first.

### Alterações

**`src/styles/landing-v4.css`**

1. **Escurecer o gradiente overlay** — aumentar opacidade do `.hero-gradient` de 0.92→0.95 na base e de 0.55→0.7 no meio, garantindo contraste forte sobre a imagem
2. **Adicionar um terceiro layer de escurecimento** no `.hero-gradient2` para mobile (opacidade mais alta à esquerda onde fica o texto)
3. **Aumentar fonte do headline no mobile** — ajustar o `clamp()` de `clamp(36px,5.5vw,62px)` para `clamp(40px,6vw,62px)` para que fique mais legível em telas pequenas
4. **Aumentar fonte do subtítulo** — de `15px` para `16px` e cor de `--txt-ink2` para `--txt-ink` (branco) para maior contraste
5. **Adicionar text-shadow sutil** no headline e subtítulo para destacar do fundo: `text-shadow: 0 2px 20px rgba(0,0,0,0.5)`
6. **Aumentar o espaçamento inferior do hero-content** no mobile via media query para dar mais respiro

### Resultado esperado
Texto do hero claramente legível sobre a imagem de fundo em qualquer dispositivo, com contraste forte e tipografia proporcionalmente maior no mobile.

