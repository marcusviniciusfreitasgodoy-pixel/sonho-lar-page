

## Diagnóstico

A página atual tem estas seções (em ordem):

```text
1. Hero
2. Problemas (4 cards + callout)
3. Missão + Mercado Internacional (3 cards + Brazil box)
4. Objeção "Por que pagar?" (grid + tabela comparativa)
5. Na Prática (5 cenários detalhados com tabs)
6. Serviços (3 cards de produto)
7. Garantia (bloco extenso com 2 colunas)
8. Benefícios (4 items)
9. Marcus + Para quem é / não é
10. FAQ (5 perguntas)
11. Formulário de contato
12. Footer
```

Problemas principais:
- Seções 2, 3 e 4 repetem a mesma mensagem ("o modelo é ruim para o comprador") de formas diferentes
- Seção 5 tem 5 cenários longos com parágrafos inteiros -- no mobile fica interminável
- Seções 7 e 8 são redundantes (garantia e benefícios poderiam estar dentro de Serviços)
- Muito texto corrido; poucos "respiros" visuais

## Plano de Reestruturação

### 1. Fundir "Problemas" + "Objeção" em uma seção única
- Manter os 4 pain points como bullets curtos (uma linha cada), não cards com parágrafos
- A resposta "por que pagar" vira um callout de 2-3 linhas, não uma seção inteira com tabela

### 2. Condensar "Missão/Mercado Internacional"
- Remover os 3 market cards detalhados (EUA, Austrália, Espanha)
- Substituir por uma linha simples: "Modelo consolidado nos EUA, Austrália e Espanha. Agora no Rio."
- Remover o Brazil box (R$8bi) -- informação redundante

### 3. Reduzir cenários de 5 para 3 e encurtar cada um
- Manter apenas os 3 mais distintos (executivo com prazo, relocação, personalidade pública)
- Cada cenário: 1 parágrafo de situação + 3 resultados numéricos. Remover "pullquote", lista de steps e textos longos

### 4. Integrar Garantia dentro de Serviços
- Mover o compromisso "se não economizar, não paga" para dentro do card Prime Buyer Experience (já tem um preview lá)
- Eliminar a seção de Garantia separada

### 5. Remover seção "Benefícios" (4 mudanças concretas)
- Conteúdo já está implícito nas outras seções (problemas + serviços)

### 6. Encurtar bio do Marcus
- Manter apenas 1 parágrafo + credenciais em lista
- Remover a seção "Para quem é / Para quem não é" (mover como nota curta no FAQ ou remover)

### Resultado esperado

```text
ANTES: 12 seções, ~708 linhas de JSX
DEPOIS: 8 seções, ~400-450 linhas

1. Hero (mantido)
2. O Problema + Por que pagar (fundidos, texto reduzido ~60%)
3. O Modelo (missão condensada em 1 bloco curto)
4. Na Prática (3 cenários curtos em vez de 5 longos)
5. Serviços + Garantia (integrados)
6. Sobre Marcus (encurtado)
7. FAQ (mantido, 5 perguntas)
8. Formulário + Footer
```

### Arquivos alterados
- `src/components/LandingPageV4.tsx` -- reestruturação completa das seções
- `src/styles/landing-v4.css` -- remover estilos das seções eliminadas

