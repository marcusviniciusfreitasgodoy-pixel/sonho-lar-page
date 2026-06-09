## Objetivo

Após qualquer import de PDF no admin de artigos, o campo "Conteúdo completo" deve aparecer já preenchido e formatado pela IA, sem precisar clicar em mais nada.

## Mudanças

Apenas em `src/pages/AdminArtigos.tsx`:

1. Extrair o núcleo da chamada da IA da função `handleGenerateAi` em uma função interna `runAiOnText(texto, { titulo, categoria })` que devolve `{ resumo, conteudo }` ou lança erro.
2. Em `handleImportPdf`, após preencher o formulário com o texto bruto extraído do PDF:
   - Manter o `setForm` atual (texto bruto já entra no campo, garantindo que nunca fique vazio).
   - Se o texto extraído tiver pelo menos 80 caracteres, chamar `runAiOnText` em sequência e, em caso de sucesso, atualizar `resumo` e `conteudo` no formulário com a versão limpa pela IA.
   - Mostrar **um único toast** ao final: "PDF importado e formatado com IA. Revise antes de ativar."
3. Tratamento de erro da IA dentro do import:
   - Se a IA falhar (créditos 402, rate limit 429, falha de rede ou resposta inválida), manter o texto bruto já no campo e mostrar um toast de aviso: "Formatação automática indisponível — usando o texto bruto do PDF. Você pode clicar em 'Gerar com IA' depois."
   - Se o texto extraído vier vazio ou menor que 80 caracteres (PDF escaneado), pular a IA e manter a mensagem atual.
4. Estado de loading: enquanto a IA roda durante o import, exibir indicação no botão de import ("Importando e formatando…") usando o `importing` existente, sem adicionar novos estados visíveis.

O botão "Gerar com IA" continua existindo como reprocessamento manual quando você editar o texto à mão.

## Fora de escopo

- Sem mudanças no banco.
- Sem mudanças nas edge functions `import-pdf-artigo` e `gerar-artigo-ia`.
- Sem alteração no layout do formulário.
