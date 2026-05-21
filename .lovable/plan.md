## Painel /admin/leads + dedup + retry CRM

### 1. Autenticação (Email/senha + Google)

- Habilitar auth no Lovable Cloud, sem auto-confirm de e-mail.
- Tabela `profiles` (id, user_id, display_name, created_at) com trigger de criação automática no signup.
- Sistema de papéis seguro:
  - Enum `app_role` (`admin`, `viewer`)
  - Tabela `user_roles` (user_id, role) com RLS
  - Função `has_role(user_id, role)` `SECURITY DEFINER`
- **Cadastro não fica aberto:** página `/auth` só permite **login**. Novos convidados são adicionados manualmente pelo Marcus inserindo o e-mail na tabela `user_roles` (depois eles fazem signup que só funciona se já tiverem role atribuída — via trigger de bloqueio).
  - Alternativa simples adotada: Marcus cria o usuário pelo painel Cloud → Users e atribui role `admin`. Página `/auth` só tem formulário de login + botão Google.
- Marcus recebe role `admin` no primeiro login (seed inicial pelo banco com o e-mail dele).

### 2. Painel `/admin/leads`

Rota protegida — redireciona para `/auth` se não logado, e para `/` se logado sem role válida.

Funcionalidades:
- **Tabela** com paginação (50/pág): data, nome, e-mail, WhatsApp, orçamento, momento, status CRM (badge colorido), UTM source/campaign, flag duplicado.
- **Filtros**: período (hoje, 7d, 30d, custom), status CRM (sent/failed/pending), origem, busca por nome/e-mail.
- **KPIs no topo**: total no período, taxa de sucesso CRM, % duplicados, leads por UTM source.
- **Detalhe do lead** (drawer): payload completo, resposta do CRM, tentativas de retry.
- **Ações por lead**: "Reenviar ao CRM" (manual), copiar dados, abrir WhatsApp.
- **Export CSV** do filtro atual.
- Layout fiel ao tema Warm Luxury (cream/charcoal/gold, Lato).

### 3. Deduplicação

- Migration adiciona colunas: `is_duplicate boolean default false`, `duplicate_of uuid references leads(id)`, `dedupe_key text` (gerado: `lower(email) || '|' || regexp_replace(whatsapp,'\D','','g')`).
- Trigger `BEFORE INSERT`: se existir lead com mesmo `dedupe_key` nas últimas 24h, marca `is_duplicate=true` e aponta `duplicate_of` para o lead original. CRM continua recebendo (escolha do usuário).
- Painel mostra badge "duplicado" e link para o lead original.

### 4. Retry do CRM (manual + automático)

- Nova Edge Function `retry-crm-lead` (requer auth, role `admin`):
  - Recebe `lead_id`, busca o lead, reenvia para o CRM com o mesmo mapeamento.
  - Incrementa `crm_attempts` e atualiza `crm_status` + `crm_response` + `crm_last_attempt_at`.
- Nova Edge Function `retry-crm-leads-cron` (sem auth, chamada por pg_cron):
  - Busca leads `crm_status='failed'` com `crm_attempts < 5` e `crm_last_attempt_at` há mais de 10min.
  - Limite de 20 por execução para evitar burst.
  - Backoff exponencial implícito (espera 10min entre tentativas).
- Migration adiciona colunas: `crm_attempts int default 0`, `crm_last_attempt_at timestamptz`.
- Cron via `pg_cron` + `pg_net` a cada 15min (rodado via insert tool, não migration, porque contém URL+key do projeto).
- Botão "Reenviar" no painel chama `retry-crm-lead`.

### 5. RLS atualizada

- Tabela `leads`: adicionar policy de SELECT/UPDATE só para `has_role(auth.uid(),'admin')`. Insert continua bloqueado para clients (Edge Function usa service role).
- Tabela `profiles`: usuário lê/edita próprio profile.
- Tabela `user_roles`: só admins leem/escrevem; usuário lê próprias roles.

### Arquivos novos

- `src/pages/Auth.tsx` (login email + Google)
- `src/pages/AdminLeads.tsx` (painel)
- `src/components/admin/LeadsTable.tsx`, `LeadDetailDrawer.tsx`, `LeadFilters.tsx`, `LeadKPIs.tsx`
- `src/hooks/useAuth.ts`, `src/hooks/useUserRole.ts`
- `src/components/RequireAdmin.tsx` (route guard)
- `supabase/functions/retry-crm-lead/index.ts`
- `supabase/functions/retry-crm-leads-cron/index.ts`
- Rotas em `App.tsx`: `/auth`, `/admin/leads`

### Pergunta operacional

Para fazer o seed inicial da role admin do Marcus: confirma que o e-mail é **marcus@godoyprime.com.br**? Se for outro, me diga antes que eu rode a migration final.
