## Aplicar Nova Copy Completa na Landing Page

Reescrita do conteúdo de `src/components/LandingPageV4.tsx` seguindo exatamente a copy fornecida. A estrutura visual (CSS, layout, animações) permanece a mesma. Apenas o conteúdo textual e alguns ajustes estruturais mudam.

### Alterações por seção

**1. HERO** — Novo headline, novo subtítulo (2 parágrafos), CTAs renomeados ("Agendar Diagnóstico Estratégico Gratuito" / "Entender o conceito"), nota de rodapé mantida. Credenciais expandidas com textos descritivos completos (3 itens com texto longo em vez de labels curtos).

**2. O PROBLEMA** — Substituir os 4 bullet-points por texto corrido (parágrafos narrativos sobre "Assimetria de Lealdade"). Manter o callout com novo texto. Adicionar CTA ao final.

**3. O MODELO** — Manter estrutura de comparação, atualizar textos das células. Adicionar linha "Quem assume o risco" à tabela (6 linhas em vez de 5). Atualizar subtítulos introdutórios. Ajustar label para "Personal Shopper — Godoy Prime".

**4. COMO TRABALHAMOS** — Expandir de 5 para 6 etapas com novos títulos e descrições: Perfil Decodificado, Rastreio On e Off-Market, Vistoria Técnica e Documental, Matemática Inversa, Análise Documental e Vistoria Final, Escritura Blindada. Atualizar headline e subtítulo.

**5. NA PRÁTICA** — Substituir cenários de "casos clientes" por 2 perfis anônimos (Perfil A e Perfil B) com texto corrido, sem avatares/nomes. Novo headline e nota de rodapé. Remover tabs de navegação, usar layout sequencial.

**6. SERVIÇOS** — Novo headline ("Três pontos de entrada. Uma única missão...") e subtítulo. Manter cards de serviços com conteúdo atual (conforme instrução "manter as informações atuais"). Adicionar nota de progressão (Parecer → Compra Blindada → Prime Buyer Experience).

**7. SOBRE (Marcus)** — Novo headline ("O defensor que o mercado não quer que você encontre"), nova bio completa (4 parágrafos), nova credencial, remover motto antigo e substituir pelo texto sobre alinhamento contratual.

**8. FAQ** — Substituir 5 perguntas por 6 novas perguntas com respostas longas e detalhadas conforme copy.

**9. FORMULÁRIO** — Novo headline, novo texto introdutório com 3 bullets, simplificar campos (Nome, Telefone, Faixa de valor, Mensagem — remover campos tipo/momento). Novo CTA.

**10. RODAPÉ** — Atualizar descrição e credenciais conforme copy.

### Detalhes técnicos

- Arquivo editado: `src/components/LandingPageV4.tsx`
- Possível ajuste em `src/styles/landing-v4.css` para acomodar seção "Na Prática" sem tabs (layout de 2 cards sequenciais) e credenciais do hero com texto mais longo.
- Grid de steps muda de 5 colunas para 6 (ou 3x2).
- Seção "Na Prática" muda de tabs interativos para 2 blocos estáticos com sub-headers.  
  
  
Melhorar a responsividade Mobileconsiderando trata-se de uma pagina First Mobile