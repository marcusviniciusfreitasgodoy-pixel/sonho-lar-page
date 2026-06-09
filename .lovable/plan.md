## Objetivo

Permitir que você (e qualquer admin autorizado) recupere a senha por e-mail, sem precisar de senha temporária trafegando pelo chat. A conta `marcus@godoyprime.com.br` continua existindo e com role `admin` — só precisamos do caminho de reset.

## O que será feito

### 1. Link "Esqueci minha senha" em `/auth`
- Adicionar link abaixo do botão **Entrar** em `src/pages/Auth.tsx`.
- Ao clicar, abre uma aba "Recuperar senha" (ou um pequeno formulário inline) pedindo apenas o e-mail.
- Chama `supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/reset-password' })`.
- Mostra toast confirmando o envio (sem revelar se o e-mail existe ou não, por segurança).

### 2. Nova página pública `/reset-password`
- Criar `src/pages/ResetPassword.tsx` e registrar rota pública (sem `RequireAdmin`) em `src/App.tsx`.
- Detecta o token de recovery na URL (Supabase entrega via hash `#access_token=...&type=recovery`).
- Mostra formulário com **nova senha** + **confirmar senha** (mínimo 8 caracteres, validação de igualdade).
- Chama `supabase.auth.updateUser({ password })`.
- Em sucesso: toast + redireciona para `/auth`.
- Em erro (link expirado, etc.): mensagem clara com botão para pedir novo link.

### 3. E-mails de autenticação com a marca Godoy Prime (opcional, recomendado)
Hoje o reset usaria o template padrão da Lovable. Se você quiser, eu também:
- Verifico se já existe domínio de e-mail configurado para o projeto.
- Se sim, faço scaffold dos templates de auth (signup, recovery, magic link, etc.) já estilizados com a paleta Warm Luxury (cream #FAFAF8, charcoal #161412, gold #9E7B2A) e fonte Lato.
- Se não houver domínio, sigo só com o template padrão e te ofereço o setup de domínio depois.

## Detalhes técnicos

- `Auth.tsx`: nova função `handleForgotPassword`, controle de loading próprio.
- `ResetPassword.tsx`: usa `getBackendClient()` (mesmo padrão lazy do projeto). Lê `window.location.hash` no mount; se `type !== 'recovery'`, mostra estado vazio com link para `/auth`.
- `App.tsx`: adicionar `<Route path="/reset-password" element={<ResetPassword />} />` antes das rotas admin.
- Nenhuma alteração de banco, RLS ou edge function. Sua role `admin` continua intacta.

## O que NÃO será feito

- Não vou mexer em `user_roles` nem na sua conta (ela está OK no banco).
- Não vou criar senha temporária nem trocar sua senha pelo banco.
- Não vou tocar em `src/integrations/supabase/client.ts` (auto-gerado).

## Pergunta única antes de implementar

Quer que eu **também faça o scaffold dos templates de e-mail de auth** com a marca Godoy Prime (item 3), ou prefere usar o template padrão da Lovable por enquanto e cuidar disso depois?