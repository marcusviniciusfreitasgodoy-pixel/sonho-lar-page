

## Plan: Enviar mensagens de teste via Z-API

Vou invocar a Edge Function `send-whatsapp` para enviar as duas mensagens configuradas no sistema para o número **21964075124**:

1. **Mensagem de boas-vindas ao lead** — a mesma que um lead receberia ao preencher o formulário
2. **Mensagem de notificação ao consultor** — com dados fictícios de um lead de teste

### Execução técnica

- Usar `supabase--curl_edge_functions` para chamar `send-whatsapp` duas vezes com o número `21964075124`
- Mensagem 1: template de boas-vindas com nome "Teste Plataforma"
- Mensagem 2: template de notificação com dados fictícios de lead

Nenhum arquivo será alterado — apenas chamadas à função já existente.

