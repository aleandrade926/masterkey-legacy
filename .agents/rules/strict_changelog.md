# Strict Changelog Enforcement

## REGRA OBRIGATÓRIA PARA TODAS AS SESSÕES DA IA
Para evitar a perda de contexto histórico e a confusão de repositórios ("salada de repositórios"), você **DEVE** registrar o histórico de absolutamente todas as alterações de código, arquitetura ou estratégia que fizer.

Sempre que você modificar arquivos em qualquer um dos domínios do ecossistema (masterkey-frontend, andradeflorio, public-ebook, tailorspace, etc):

1. ANTES de encerrar o chat ou concluir a tarefa para o usuário, você deve atualizar o arquivo central de histórico localizado em:
   C:\Users\Alexandre\masterkey-frontend\.agents\GLOBAL_CHANGELOG.md

2. O formato de injeção de log DEVE ser rigorosamente este (adicione no TOPO do arquivo logo abaixo do título):
   
   ## [Data: DD/MM/AAAA] - [Nome do Projeto / Domínio]
   - **O que foi feito:** Resumo claro da alteração.
   - **Onde (Arquivos afetados):** Caminhos exatos.
   - **Como e Por quê:** Qual a estratégia de negócio ou raciocínio técnico por trás da mudança (Ex: "Adicionada barreira de pagamento para filtrar curiosos no WhatsApp").

3. Este arquivo atua como a memória contínua do projeto. NUNCA o apague, apenas adicione informações. Nunca encerre a interação sem registrar o log.
