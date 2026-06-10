## Objetivo

A URL do webhook é única e a chave foi gerada no mesmo workspace, mas o DateAHome continua respondendo `404 "Account not found"`. Isso aponta para um problema **no valor da chave armazenada** (espaço/quebra de linha invisível colada no formulário, ou a chave salva não é a que você acha que é). Vamos provar isso e blindar.

## Passo 1 — Função de diagnóstico `debug-dateahome`

Nova edge function (pública, sem JWT) que:

1. Lê `DATEAHOME_API_KEY` do ambiente.
2. Retorna metadados **seguros** (sem expor a chave):
   - `length` da chave bruta
   - `length` da chave após `.trim()`
   - `hasWhitespace` (true se houver espaço/`\n`/`\r`/`\t`)
   - `prefix` (primeiros 4 chars) e `suffix` (últimos 4 chars)
3. Faz um POST de teste para o webhook do DateAHome usando a chave **trimada** e devolve `status` + `body` da resposta.

Você chama essa função uma vez e a gente vê na hora se:
- A chave salva está com whitespace → confirma erro de cópia.
- A chave tem o tamanho esperado → confirma que o secret está correto.
- O DateAHome aceita a versão trimada → resolve o 404.

## Passo 2 — Blindar `send-crm-lead` e `retry-crm-lead`

Em ambas as funções, aplicar `.trim()` no valor de `DATEAHOME_API_KEY` antes de montar o header `X-API-Key`. Custo zero e elimina de vez qualquer espaço/newline invisível vindo do secret.

## Passo 3 — Teste de validação

Após o deploy:
1. Chamo `debug-dateahome` e te mostro o JSON (sem expor a chave).
2. Se o POST de teste retornar 200, reenvio um lead real via `send-crm-lead` para confirmar ponta-a-ponta.
3. Se continuar 404 mesmo com a chave trimada e com tamanho coerente, aí sim o problema é no DateAHome (chave revogada / webhook órfão) e você abre chamado no suporte deles com o `prefix`/`suffix` em mãos.

## Detalhes técnicos

- Nova função: `supabase/functions/debug-dateahome/index.ts` com CORS aberto, sem JWT.
- Edit em `supabase/functions/send-crm-lead/index.ts` linha ~66: `const DATEAHOME_API_KEY = (Deno.env.get('DATEAHOME_API_KEY') ?? '').trim()`.
- Mesma alteração em `supabase/functions/retry-crm-lead/index.ts` e `supabase/functions/retry-crm-leads-cron/index.ts` se aplicável.
- Nada muda no frontend nem no fluxo do usuário final.