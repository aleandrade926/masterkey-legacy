# Dossiê Histórico: Evolução do Projeto ToDeAcordo
**Documento de Referência Estratégica (Do "Absolute Zero" ao Estado Atual)**

## 1. Visão Geral
Este dossiê sintetiza o histórico bruto de 363 interações da fundação dos projetos, documentando a evolução desde a concepção inicial, o desacoplamento estratégico e os surtos focados de engenharia e marketing.

## 2. Gênese e Organização dos Projetos

### 2.1 TaxManagers (A Fundação Tecnológica)
- **Papel:** O ecossistema nasceu e validou sua infraestrutura inicial aqui. Tecnologias fundamentais como Vercel, Supabase e a integração com LLMs (Llama/Groq) foram estabilizadas neste projeto.
- **Legado:** Forneceu o esqueleto infraestrutural maduro que permitiu o lançamento extremamente ágil de projetos subsequentes, como o ToDeAcordo.

### 2.2 ToDeAcordo (O Spin-off Ágil e Foco Atual)
- **Gênese:** Iniciado como um produto independente (MVP 1), distanciando-se de um sistema interno para ser uma plataforma autônoma de mercado.
- **Filosofia do Produto:** Criar uma nova categoria ("Consensus Closing Platform"). Não é apenas um clone do Tactiq para transcrição, mas sim uma ferramenta focada em formalizar e "bater o martelo" em acordos de forma rápida ("a mala com rodinhas").
- **Motor de Crescimento (PLG):** Inspirado no Calendly. Cada uso do sistema distribui o produto nativamente ("Receiver-Led Growth"), pois quem valida o acordo entra no funil.

## 3. Linha do Tempo e Fases de Desenvolvimento (ToDeAcordo)

### Fase 1: Setup Inicial e Fundação (02/07/2026)
- **Início:** Projeto extraído para pasta dedicada (src/todeacordo).
- **Decisão Arquitetural:** Construir a base primeiro, sem IA pesada, aproveitando a stack do TaxManagers (Vercel + Supabase) para evitar reinvenção de roda.

### Fase 2 a 4: Captura de Dados, Storage e Auditoria (02/07/2026)
- **Google Meet Adapter:** Engenharia massiva para capturar legendas nativas do Meet.
- **Desafios Resolvidos:** Luta intensa contra a duplicação e fragmentação de falas, criando estratégias de "Rolling Segment / Upsert".
- **Persistência Local (IndexedDB):** Garantir que a transcrição, sessão e o ConsensusObject sobrevivam a interrupções ou ao recarregamento (F5) da aba do navegador.

### Fase 5: Integração de Backend e IA (02/07/2026 - 03/07/2026)
- **Pivô de Custos:** Abandono imediato do Gemini/OpenAI para geração de consenso no MVP a fim de não depender de cartão; adoção do ecossistema já controlado (Llama/Groq).
- **Combate às Alucinações:** O backend atua como autoridade. A IA sugere, mas o sistema cruza evidências e corta o que não estiver estritamente no transcript original.
- **Crise e Resolução de Roteamento:** Tentativas frustradas de usar arquitetura mista (ite-plugin-vercel e diretórios services). A resolução foi abandonar as "gambiarras", usar a pasta /api nativa da Vercel e criar um projeto Vercel novo e limpo.

### Fase 10: "Modo Canhão" - Sprints de Growth e Viralidade (03/07/2026 - 04/07/2026)
- **Explosão de Funcionalidades:** Uso massivo de tokens de IA em poucas horas para criar o "ToDeAcordo Growth OS".
- **Diferencial Competitivo:** Implementação de funcionalidades além da gravação, como copiar/colar conversas (WhatsApp), dashboards táticos ("Tactiq-like") adaptados e compartilhamento viral (/valida/:id).
- **Refinamento de UX/Copy:** Troca de termos jurídicos pesados ("assinar com peso jurídico") para termos de conversão sem fricção ("validar", "clareza", "confirmar"). 
- **Monetização Ajustada:** Decisão por adiar o Stripe em favor de um modelo Freemium puro para não assustar o usuário de primeira viagem e validar engajamento.

### Fase de Estabilização e Lançamento (05/07/2026 - 06/07/2026)
- **Chrome Web Store:** Ajustes cruciais de segurança e políticas (Página de Privacidade exigida pelo Google).
- **Fixes Finais:** Sincronização de estados de reunião (Lobby vs Active) e tratamento de falhas em chamadas ao backend.
- **DevOps:** Versionamento final limpo no GitHub, configuração de variáveis de ambiente na Vercel e consolidação da "Regra Padrão ToDeAcordo" para CI/CD (deploy automático desde que não mexa em áreas sensíveis).

## 4. Filosofia Arquitetural para IAs Subsequentes ("Ictu Oculi")
1. **Velocidade de Valor (TTV):** A IA não cria blocos operacionais pesados. Tudo se traduz em fechar um acordo em segundos.
2. **Infraestrutura Minimalista:** Vercel /api para rotas serverless, Supabase para dados, Groq/Llama para IA.
3. **Mecanismo de Propagação:** Sempre que criar algo, pense em "Open Doors Architecture". Como essa feature traz outro usuário para o ecossistema?
4. **Pragmatismo de Código:** Não quebre chaves de API, banco ou fluxos de pagamento. Se o código for estável, vá direto para Produção.
