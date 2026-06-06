## Problema

Após o login, `/admin/leads` redireciona para `/` mesmo com o usuário tendo papel `admin` no banco (confirmado em `user_roles`). Causa: o hook `useUserRole` seta `isAdmin = false` quando `userId` está indefinido no primeiro render. Quando o `useAuth` finalmente entrega o usuário, o estado fica `false` durante a refetch e o `RequireAdmin` interpreta como "não-admin" e redireciona.

## Correção

### 1. `src/hooks/useUserRole.ts`
- Resetar `isAdmin` para `null` (estado "desconhecido / carregando") sempre que `userId` mudar e iniciar a verificação.
- Não setar `false` quando `userId` é `undefined`; manter `null` enquanto o auth ainda está resolvendo.
- Só setar `false` definitivo quando: (a) `userId` é `null` explicitamente após auth resolver, ou (b) a query retornar sem registro.

### 2. `src/components/RequireAdmin.tsx`
- Endurecer o gate: tratar `isAdmin === null` como estado de carregamento independente de `user`, evitando flash de redirecionamento.
- Só redirecionar para `/` quando `isAdmin === false` (booleano explícito).

### 3. Publicação
Após a correção do código, será necessário **republicar** para que o domínio `personalshopperimobiliario.godoyprime.com.br` receba o novo bundle (o build publicado atual ainda contém o erro `supabaseUrl is required` da versão antiga).

## Resultado esperado
- Login em `/auth` → redirect para `/admin/leads`.
- `RequireAdmin` mostra "Carregando…" até `useAuth` + `useUserRole` resolverem.
- Painel de leads abre normalmente para o usuário `marcus@godoyprime.com.br`.

Sem mudanças no banco, RLS, edge functions ou na landing page.