## Plano

1. **Abrir o formulário seguro de segredo**
   - Solicitar a nova chave da DateAHome em um campo seguro.
   - Salvar como `DATEAHOME_API_KEY`, substituindo a chave antiga.

2. **Testar a integração DateAHome**
   - Executar a função de diagnóstico já criada para enviar um lead de teste ao webhook.
   - Confirmar se o retorno mudou para `success: true` e se veio um `leadId`.

3. **Validar o fluxo real do app**
   - Enviar um teste pelo endpoint/função principal de CRM, usando o mesmo cabeçalho `X-API-Key`.
   - Verificar se o lead é aceito pela DateAHome e se não fica pendente para retry.

4. **Reportar o resultado**
   - Informar exatamente o status HTTP, mensagem retornada e, se houver, o `leadId` criado.
   - Se ainda falhar, identificar se o erro é de chave, webhook, formato do payload ou conta/workspace.