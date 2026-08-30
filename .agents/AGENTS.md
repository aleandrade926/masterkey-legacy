# Regras do Projeto ToDeAcordo

## REGRA PADRÃO TODEACORDO
Qualquer bug fix aprovado está autorizado para commit e deploy direto na Vercel se a build passar, desde que a alteração não mexa em:
* Chaves de API ou variáveis de ambiente
* Banco de dados (Supabase/esquemas)
* Fluxos de pagamento (PIX/Stripe)
* Configurações de domínio
* Autenticação e acessos

Não há necessidade de pedir autorização a cada deploy que cumpra esses critérios.

## REGRA DE MEMÓRIA (GLOBAL CHANGELOG)
Para evitar a perda de contexto histórico ("salada de repositórios"), você **DEVE** ler e registrar o histórico no arquivo C:\Users\Alexandre\masterkey-frontend\.agents\GLOBAL_CHANGELOG.md. 
Sempre que iniciar um chat para alterar algo estrutural, LEIA este arquivo primeiro. 
Sempre que concluir uma alteração, ADICIONE um log no final do arquivo explicando o que foi feito, onde, e o motivo estratégico.

## TOPOLOGIA DO ECOSSISTEMA
Sempre que precisar entender qual pasta local corresponde a qual site na Vercel (TaxManagers, AndradeFlorio, ToDeAcordo, etc), OBRIGATORIAMENTE leia o arquivo: C:\Users\Alexandre\masterkey-frontend\.agents\TOPOLOGY.md.

## ARQUIVÃO CRONOLÓGICO (LEDGER DE GAMBIARRAS E REPOSITÓRIOS)
O histórico recente está em GLOBAL_CHANGELOG.md. 
O histórico **ANTIGO COMPLETO** (o livro-caixa de 362 interações desde o dia 1, com todas as gambiarras, arquivos tocados e mudanças de repositórios) está localizado em:
C:\Users\Alexandre\masterkey-frontend\.agents\GLOBAL_CHANGELOG_ANCIENT.md
Se precisar entender de onde veio um código ou por que um projeto mudou de pasta, consulte este Arquivão.
