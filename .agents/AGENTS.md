# Regras do Projeto ToDeAcordo

## REGRA PADRÃO TODEACORDO
Qualquer bug fix aprovado está autorizado para commit e deploy direto na Vercel se a build passar, desde que a alteração não mexa em:
* Chaves de API ou variáveis de ambiente
* Banco de dados (Supabase/esquemas)
* Fluxos de pagamento (PIX/Stripe)
* Configurações de domínio
* Autenticação e acessos

Não há necessidade de pedir autorização a cada deploy que cumpra esses critérios.

## REGRA DE MEMÓRIA (INICIALIZAÇÃO OBRIGATÓRIA DO AGENTE)
Para garantir que o agente inicie o chat 100% inteirado de toda a história desde 25 de março de 2026:
1. **LEITURA OBRIGATÓRIA NO START:** Leia imediatamente o arquivo consolidado de inteligência:
   `C:\Users\Alexandre\masterkey-frontend\.agents\DOSSIE_HISTORICO_ECOSSISTEMA_2026.md`
   *(Contém a síntese executiva e técnica de todas as decisões, teses tributárias, repositórios e funis de Março a Setembro de 2026).*
2. **CONSULTA CIRÚRGICA DETALHADA:** Se precisar do registro segundo a segundo de algum mês específico, consulte a pasta:
   `C:\Users\Alexandre\masterkey-frontend\.agents\HISTORICO_MENSAL\`
3. **ARQUIVÃO BRUTO INTEGRAL (131 MB):** O log cru contendo todas as 59.006 interações e códigos de máquina está disponível em:
   `C:\Users\Alexandre\masterkey-frontend\.agents\ARQUIVAO_HISTORICO_COMPLETO.txt`
4. Sempre que concluir qualquer tarefa ou alteração relevante, registre o log no final de `GLOBAL_CHANGELOG.md` e sincronize o `STATUS_ATUAL.md`.

## REGRA DE SINCRONIZAÇÃO EM NUVEM (GOOGLE DRIVE / GEMINI BRIDGE)
Para manter a ponte de sincronização contínua com o Gemini na nuvem via Google Drive local (G:\Meu Drive\Antigravity_Sync), siga este protocolo operacional:

1. **Arquivos de Comunicação Obrigatórios em G:\Meu Drive\Antigravity_Sync\:**
   - STATUS_ATUAL.md: Contém o projeto ativo, última ação executada, status de build/deploy, erros/alertas pendentes e flag se está aguardando decisão humana.
   - GLOBAL_CHANGELOG.md: Cópia espelhada e sempre atualizada do histórico de alterações.
   - ORDENS_DO_GEMINI.md: Fila bidirecional de ordens e instruções vindas do Gemini na nuvem.

2. **Gatilhos Operacionais de Sincronização:**
   - **Início de Tarefa:** Registrar no STATUS_ATUAL.md o início da atividade e o projeto ativo.
   - **Término de Ciclo (Alteração/Build/Deploy/Teste):** Executar imediatamente a sincronização espelhando o changelog e atualizando o status atual através do script C:\Users\Alexandre\masterkey-frontend\.agents\scripts\sync_drive.ps1 ou comandos equivalentes.

3. **Ciclo de Vida de Execução de Ordens (Gemini -> Antigravity):**
   - Quando o Gemini gravar uma ordem em ORDENS_DO_GEMINI.md com status: pendente:
     1. O Antigravity altera o status no arquivo para status: em_execucao.
     2. Executa as modificações de código/tarefas solicitadas.
     3. Executa a validação e build (ite build ou testes locais).
     4. Altera o status em ORDENS_DO_GEMINI.md para status: concluido (ou status: erro com descrição do problema).
     5. Executa o sync_drive.ps1 para atualizar o STATUS_ATUAL.md e avisar o Gemini na nuvem que o ciclo foi finalizado.
## REGRA DE OUTBOUND & PROSPECÇÃO: CAPTURA DE VALOR (AS 3 PORTAS)
Sempre que estruturar abordagens no LinkedIn ou mensagens diretas a C-Levels (CFOs, CEOs, Fundadores, Conselheiros):

1. **Posicionamento Único:** Apresente o trabalho como **Captura de Valor Empresarial** (encontrar dinheiro e oportunidades que a empresa já tem ou pode criar).
2. **As 3 Portas Obrigatórias:**
   - **Pagar Menos:** Estrutura tributária, recuperação de margem e caixa.
   - **Valer Mais:** Valuation, M&A, due diligence e negociação em posição de força.
   - **Fazer Mais:** Novos negócios, parcerias, clientes e expansão para outros mercados.
3. **Proibições Inegociáveis no Primeiro Contato:**
   - **PROIBIDO:** Usar expressões institucionais como *"Na TaxManagers, atuamos..."* ou *"Nossa empresa oferece..."* (isso destrói a conversa estratégica e soa como vendedor de balcão).
   - **PROIBIDO:** Despejar siglas e detalhes de implementação interna (ICMS, DIFAL, SPED, etc.) logo na abertura.
   - **PROIBIDO:** Mensagens com mais de 600 caracteres no LinkedIn.
4. **Fechamento Padrão:** Sempre finalizar com a pergunta das 3 portas adaptada ao tom do decisor:
   *"Hoje, para a [Empresa], o maior potencial está em pagar menos, valer mais ou fazer mais negócios?"*
