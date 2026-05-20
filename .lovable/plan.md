## Integração com CRM via Webhook

Conectar o formulário da landing page ao seu CRM, enviando cada lead capturado para o endpoint informado, **sem perder** os envios atuais (e-mail via Resend e WhatsApp via Z-API).

### Por que via Edge Function (e não direto do navegador)

A API key `sk_...` é uma chave **secreta** — se colocarmos no código do frontend, qualquer visitante consegue lê-la no navegador e abusar do seu CRM. A forma segura é guardá-la nos secrets do backend e criar uma Edge Function que recebe o lead do site e repassa ao CRM com a chave no servidor.

### Passos

1. **Guardar a API key como secret** (`CRM_WEBHOOK_API_KEY`) — passo manual, vou solicitar o valor.
2. **Criar Edge Function `send-crm-lead`** (`supabase/functions/send-crm-lead/index.ts`):
   - Recebe `{ nome, whatsapp, email, orcamento, momento, mensagem, servico, origem, data }` do site
   - Valida com Zod (limites de tamanho, e-mail/telefone básicos)
   - Rate limit por IP (mesmo padrão das outras funções: 8/min)
   - Faz `POST` para `https://crm-b2b-interface-clone-9bbb1.shrd00.internal.goskip.dev/backend/v1/webhook_external` com header `Authorization: Bearer ${CRM_WEBHOOK_API_KEY}` (ajustável caso o CRM use outro header — ver pergunta abaixo)
   - Inclui CORS, retorna sucesso/erro para o frontend
3. **Chamar a função no `LandingPageV4.tsx`**:
   - Adicionar `sendCrmLead(dados)` análoga a `sendEmail` / `sendWhatsApp`
   - Disparar em paralelo dentro de `handleFormSubmit` — falha no CRM **não bloqueia** envio de e-mail/WhatsApp nem a tela de confirmação

### Dúvidas antes de implementar

1. **Formato do header de autenticação** do seu CRM. As opções comuns são:
   - `Authorization: Bearer sk_...`
   - `X-API-Key: sk_...`
   - `api_key` no corpo JSON
   Vou assumir `Authorization: Bearer` (padrão) — confirma se for outro.

2. **Campos esperados pelo CRM.** Vou enviar o payload abaixo. Se o seu CRM exige nomes/estrutura específicos (ex.: `first_name`, `phone`, `custom_fields`), me passe um exemplo:
   ```json
   {
     "nome": "...", "email": "...", "whatsapp": "...",
     "orcamento": "...", "momento": "...", "mensagem": "...",
     "servico": "Diagnóstico Estratégico",
     "origem": "formulario_principal",
     "data": "20/05/2026 14:30"
   }
   ```

Se estiver tudo ok com os defaults acima, é só aprovar o plano que eu já implemento e peço o secret na sequência.