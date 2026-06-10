## Contexto

A URL e o payload que você enviou são do **DateAHome**, que **já está integrado** no projeto:

- Edge function `send-crm-lead` hoje dispara em paralelo para 2 webhooks: GoSkip (antigo) e DateAHome.
- A secret `DATEAHOME_API_KEY` já está cadastrada no backend.
- A tabela `leads` já tem colunas `dateahome_status`, `dateahome_response`, `dateahome_attempts`, `dateahome_last_attempt_at`.

Como você pediu "substituir o atual", o plano abaixo **desliga o CRM antigo** e mantém **apenas o DateAHome** em todos os fluxos.

## O que muda

### 1. `supabase/functions/send-crm-lead/index.ts`
- Remover variáveis e chamada do CRM antigo (`CRM_URL`, `TIPO_FUNIL`, `crmPayload`, header `x-api-key`, leitura de `CRM_WEBHOOK_API_KEY`).
- Remover o `Promise.allSettled` paralelo: deixar apenas o `fetch` para `DATEAHOME_URL`.
- Continuar persistindo o lead na tabela `leads` (fonte da verdade) antes do envio.
- Atualizar a `leads` apenas com `dateahome_status` / `dateahome_response` / `dateahome_attempts` / `dateahome_last_attempt_at`.
- Resposta JSON da função passa a retornar só `{ success, lead_id, dateahome: { ok, status } }`.

### 2. `supabase/functions/retry-crm-lead/index.ts` e `retry-crm-leads-cron/index.ts`
- Tirar a tentativa de reenvio para o CRM antigo.
- Manter apenas o retry do DateAHome (já existe a lógica usando `dateahome_attempts` e `dateahome_last_attempt_at`).
- Cron continua rodando a cada 15 min como hoje.

### 3. Painel admin `/admin/leads`
- Remover colunas/badges do CRM antigo (`crm_status`, `crm_response`) da UI; manter visível só o status DateAHome.
- Dados antigos permanecem no banco (sem migration destrutiva).

### 4. Secrets
- Manter `DATEAHOME_API_KEY` como está. Se quiser usar uma chave nova, depois eu peço a atualização pelo formulário seguro (`update_secret`) — confirme se é o caso.
- `CRM_WEBHOOK_API_KEY` (do CRM antigo) deixa de ser usada. Posso removê-la depois que validarmos o novo fluxo em produção, para não quebrar nada se precisarmos reverter.

## O que NÃO muda

- Formulário público (`LandingPageV4.tsx`) continua chamando `send-crm-lead` igual.
- Disparo de email (Resend) e WhatsApp (Z-API) ao Marcus seguem normais.
- Dedupe de 24h, captura de UTM/referrer, hash de IP e auditoria em `leads` continuam idênticos.

## Validação após implementação

1. `curl` na função `send-crm-lead` com um payload de teste e conferir resposta `{ dateahome: { ok: true } }`.
2. Verificar no `/admin/leads` que o registro aparece com `dateahome_status = sent`.
3. Submeter o formulário real na landing e validar a chegada no painel do DateAHome.

Confirma que posso seguir com a remoção do CRM antigo?
