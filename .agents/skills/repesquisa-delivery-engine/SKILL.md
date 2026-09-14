---
name: repesquisa-delivery-engine
description: Motor de execução e entrega do serviço RePesquisa Outbound (Sourcing de 500 decisores, cadência de 4 passos e envio controlado).
---

# RePesquisa Delivery Engine (Procedimento de Entrega)

Quando um cliente contrata o Plano Piloto (R$ 197) para fornecedores tradicionais:

1. **Etapa 1 - Sourcing de 500 Decisores (ICP Compras/Suprimentos):**
   - Extrair via base pública/API 500 empresas do público-alvo (indústrias, comércios, galpões).
   - Mapear decisores: Gerente de Compras, Diretor de Suprimentos, Comprador Pleno/Sênior.
   - Validar e-mails corporativos para garantir taxa de bounce < 2%.

2. **Etapa 2 - Setup da Cadência de 4 Passos:**
   - Passo 1: Apresentação e solicitação de canal de cotação.
   - Passo 2 (D+3): Follow-up com tabela de diferenciais técnicos/logísticos.
   - Passo 3 (D+7): Direcionamento para o comprador específico da categoria.
   - Passo 4 (D+12): Break-up elegante com contato de plantão.

3. **Etapa 3 - Disparo e Cadência:**
   - Conectar conta de envio (SMTP/Google/Outlook) ou secundária aquecida.
   - Disparo diário limitado (40 a 60 envios/dia) com intervalos aleatórios entre 90s e 180s.
   - Stop on reply: Desativação imediata da régua ao receber resposta do lead.

4. **Etapa 4 - Entrega do Valor:**
   - Respostas encaminhadas em tempo real para o WhatsApp/E-mail do cliente comercial.
   - Relatório de desempenho semanal (Aberturas, Respostas e Cotações Solicitadas).
