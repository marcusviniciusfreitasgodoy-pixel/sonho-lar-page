# Plano — Envio paralelo de leads para o CRM DateAHome

## Objetivo
Cada lead capturado passa a ser enviado **para os dois CRMs em paralelo**:
1. CRM atual (`goskip.dev/.../webhook-external`) — já funcionando, sem alteração.
2. **Novo CRM DateAHome** (`https://api.dateahome.com/webhook/lead/b00e8651-dd31-41fc-a0f0-32a06044f3ee`), autenticado pelo header `X-API-Key`.

Cada CRM tem status independente: se um falhar, o outro continua, e o retry automático (cron a cada 15 min) reprocessa só o que falhou.

## O que será feito

### 1. Secret novo
Solicitar via `add_secret` o nome **`DATEAHOME_API_KEY`** — você cola a chave em campo seguro, nunca aparece no chat/código.

### 2. Banco de dados (migration)
Adicionar à tabela `leads` colunas espelho do fluxo atual, agora também para o DateAHome:
- `dateahome_status` (`pending` | `sent` | `failed`), default `pending`
- `dateahome_attempts` (int, default 0)
- `dateahome_last_attempt_at` (timestamptz)
- `dateahome_response` (jsonb)

### 3. Edge function `send-crm-lead` (envio inicial)
- Após gravar o lead no banco, **disparar os dois webhooks em paralelo** (`Promise.allSettled`).
- Payload DateAHome (mapeado a partir do form):
  ```json
  {
    "leadOrigin": "Godoy Prime - Personal Shopper Imobiliário",
    "name": "<nome>",
    "email": "<email>",
    "ddd": "<2 primeiros dígitos do whatsapp normalizado>",
    "phone": "<restante do whatsapp normalizado>",
    "message": "<mensagem + serviço + orçamento + momento + UTM resumido>"
  }
  ```
  Normalização do telefone: remover tudo que não é dígito, remover prefixo `55` se presente, então `ddd` = 2 primeiros dígitos, `phone` = resto.
- Atualizar `crm_status` e `dateahome_status` independentes na mesma row.

### 4. Edge function `retry-crm-leads-cron` (retry a cada 15 min)
Estender o cron para reprocessar **dois canais**:
- Leads com `crm_status = 'failed'` e `crm_attempts < 5` → reenvia ao CRM antigo (igual hoje).
- Leads com `dateahome_status = 'failed'` e `dateahome_attempts < 5` → reenvia ao DateAHome.
- Mesma janela de espaçamento (10 min entre tentativas) e batch de 20.

### 5. Edge function `retry-crm-lead` (botão manual no painel admin)
Aceitar parâmetro opcional `target`:
- `target: "crm"` (default, comportamento atual)
- `target: "dateahome"` → reenviar só para o DateAHome
- `target: "both"` → reenviar para ambos

### 6. Painel `/admin/leads`
- Nova coluna **"DateAHome"** com badge de status (`pending` / `sent` / `failed`) ao lado da coluna CRM existente.
- Filtro adicional por status DateAHome.
- KPIs do topo ganham: "Enviados DateAHome" / "Falhas DateAHome".
- No drawer de detalhe do lead: bloco "DateAHome" com `status`, `attempts`, `last_attempt_at`, `response` (jsonb), e botão **"Reenviar DateAHome"**.
- Exportação CSV inclui as novas colunas.

## Detalhes técnicos

**Arquivos tocados**
- `supabase/functions/send-crm-lead/index.ts` — envio paralelo + persistência dos dois statuses.
- `supabase/functions/retry-crm-leads-cron/index.ts` — segunda passada para DateAHome.
- `supabase/functions/retry-crm-lead/index.ts` — suporte ao `target`.
- `src/pages/AdminLeads.tsx` — coluna, filtro, KPIs, drawer, CSV.
- Migration nova em `supabase/migrations/` (4 colunas em `leads`).

**Não alterado**
- CRM atual (`goskip.dev`) e seu secret `CRM_WEBHOOK_API_KEY` permanecem.
- `send-email` (Resend) e `send-whatsapp` (Z-API).
- Cron SQL no Postgres já configurado (15 min) — só a edge function muda.

**Segurança**
- Chave do DateAHome só como secret (`DATEAHOME_API_KEY`), nunca no front nem em código.
- Edge functions seguem com CORS e service-role já existentes.

## Sequência de execução
1. Criar a migration (4 colunas).
2. Pedir o secret `DATEAHOME_API_KEY` — você cola a chave.
3. Atualizar `send-crm-lead` (envio paralelo).
4. Atualizar `retry-crm-leads-cron` (retry do canal DateAHome).
5. Atualizar `retry-crm-lead` (reenvio manual com `target`).
6. Atualizar painel `/admin/leads` (coluna, filtro, KPIs, drawer, CSV).
7. Testar via formulário e verificar os dois statuses na tabela.

Posso seguir nessa ordem?
