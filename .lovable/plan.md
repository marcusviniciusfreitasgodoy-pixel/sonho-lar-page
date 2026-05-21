## Painel próprio de leads no Lovable Cloud

Criar uma fonte de verdade interna para os leads do site, independente do CRM e do Meta Pixel, com captura de UTMs e timestamp.

### O que será criado

**1. Tabela `leads` no banco (Lovable Cloud)**

Campos:
- `nome`, `email`, `whatsapp`
- `servico`, `orcamento`, `momento`, `mensagem`
- `origem` (ex.: `formulario_principal`)
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `referrer`, `landing_path`
- `user_agent`, `ip_hash` (hash para LGPD, não IP cru)
- `crm_status` (`pending` | `sent` | `failed`) e `crm_response`
- `created_at`

Acesso (RLS):
- Leitura: **nenhum acesso público** — só via painel autenticado (a ser feito num próximo passo) ou consulta direta no backend.
- Inserção: feita **apenas pela Edge Function** com service role; o site não escreve direto.

**2. Atualização da Edge Function `send-crm-lead`**

- Antes de chamar o webhook do CRM, gravar o lead na tabela `leads` (status `pending`).
- Após resposta do CRM, atualizar `crm_status` para `sent` ou `failed` e salvar a resposta.
- Assim, mesmo se o CRM cair, o lead nunca se perde.

**3. Captura de UTMs e contexto no `LandingPageV4.tsx`**

- Ler `window.location.search` (utm_*), `document.referrer` e `window.location.pathname` no submit.
- Incluir no payload enviado para `send-crm-lead`.

**4. Evento GA4 explícito**

Adicionar `gtag('event', 'generate_lead', { value: 10000, currency: 'BRL' })` no submit (hoje só existe `fbq` no submit e o `conversion` na `/confirmacao`), para fechar o ciclo de medição.

### Fora do escopo (próximos passos sugeridos)

- Painel `/admin/leads` com login para visualizar/exportar a base.
- Deduplicação por e-mail/WhatsApp em janela de tempo.
- Re-tentativa automática dos leads `failed` no CRM.

### Detalhes técnicos

- Migration cria a tabela com RLS habilitado, sem policies de SELECT/INSERT públicas (bloqueia por padrão).
- Edge Function usa `SUPABASE_SERVICE_ROLE_KEY` para inserir (já está nos secrets).
- `ip_hash` = SHA-256 do IP + salt fixo no servidor (LGPD-friendly).
- Nenhuma mudança visual no site.
