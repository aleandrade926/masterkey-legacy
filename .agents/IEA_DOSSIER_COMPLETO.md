# ARQUITETURA DE REFERÊNCIA: IEA-0
*Documento de Revisão Arquitetural e Design Experimental*

**Nota de Rigor Científico:** Até o momento, não encontramos evidência verificável de um sistema generalizável que demonstre integralmente o loop fechado de descoberta autônoma → criação de valor → venda → recebimento → avaliação econômica → aprendizado → reinvestimento. O objetivo da IEA-0 é testar a viabilidade empírica da construção desse loop.

---

## A) ARQUITETURA REVISADA (PIPELINE DE AGÊNCIA)
A arquitetura foi redesenhada para garantir "Descoberta Autônoma" pura, removendo qualquer viés humano sobre qual mercado ou veículo econômico utilizar.

`ECONOMIC LEDGER` (Camada transversal de Memória, Estado Financeiro e Log de Decisões)
↓
`ECONOMIC ENVIRONMENT SCANNER` (Mapeamento amplo do cenário macro)
↓
`FIELD SELECTION ENGINE` (Seleção de qual ambiente investigar)
↓
`OPPORTUNITY ENGINE` (Geração de hipóteses no ambiente escolhido)
↓
`ECONOMIC EVALUATOR` (Filtro rigoroso de ROI, risco e viabilidade)
↓
`ACTION PLANNER` (Desenho do artefato e da via de execução)
↓
`EXECUTION` (Atuação real, limitada por *Guardrails* e Permissões)
↓
`REAL REVENUE` (Aguardar evento no mundo real)
↓
`FEEDBACK` (Registro do sinal econômico no Ledger)
↓
`LEARNING` (Ajuste de pesos/estratégia para o próximo ciclo)

---

## B) COMPONENTES DA IEA-0

1. **Economic Ledger (Memória Base):** Banco de dados imutável. Registra capital inicial (R$ 0,00), restrições, logs de decisão ("por que escolheu o nicho X em vez do Y"), e o saldo em tempo real após cada experimento.
2. **Environment Scanner:** Módulo responsável por consumir informações amplas da internet (notícias, diretórios, tendências, mudanças regulatórias, novas APIs) sem um alvo pré-definido.
3. **Field Selection Engine:** Mecanismo algorítmico que compara os diferentes ambientes escaneados e escolhe autonomamente onde concentrar a busca micro (ex: "O ambiente de SaaS B2B está saturado e exige capital; o ambiente de micro-serviços automatizados no Discord tem fricção baixa. Foco: Discord").
4. **Opportunity Engine:** Pesquisa fissuras econômicas dentro do Field escolhido.
5. **Economic Evaluator:** Módulo matemático que pontua as oportunidades geradas com base em: Retorno Esperado, Custo (deve ser 0), Risco Legal e Viabilidade de Automação (H2).
6. **Action Planner & Execution:** Motor de execução restrito. Antes de agir, consulta a matriz de permissões legais (termos de serviço, anti-spam, conformidade). Executa a ação: seja fazer deploy de um código, gerar um ativo digital, ou intermediar uma oferta.
7. **Feedback & Learning Module:** Analisa a diferença entre Retorno Esperado e Resultado Real, gerando novos *priors* (conhecimento) para o próximo escaneamento.

---

## C) FLUXO OPERACIONAL (O EXPERIMENTO)

O sistema desperta recebendo unicamente uma **Pergunta Econômica Aberta**: 
*"Qual é a melhor oportunidade de gerar valor econômico real, dentro dos recursos, permissões, restrições legais e do capital (R$ 0,00) disponíveis?"*

1. **Scan & Field Selection:** A IEA-0 varre múltiplos domínios (criação de software, arbitragem, ativos digitais, venda de serviços) e seleciona o mais promissor.
2. **Ideação vs Oportunidade:** Transforma Ideias abstratas em Oportunidades mensuráveis. 
3. **Filtro:** Rejeita oportunidades que exijam aporte financeiro, violem T&Cs ou tenham baixa probabilidade de teste rápido. Registra o *motivo* da rejeição no Ledger.
4. **Execução:** Converte a Oportunidade Vencedora em Ação (cria o ativo, levanta a infraestrutura ou emite a oferta).
5. **Espera de Receita:** Fica em estado de *listening* (via webhook/API). 
6. **Conclusão:** O ciclo gera Lucro (Receita > Custo) ou Prejuízo (Zero Receita + Tempo Computacional Gasto). O Aprendizado é gravado no Ledger e retroalimenta o Scanner.

---

## D) MÉTRICAS DE AVALIAÇÃO (H2)

Para validar cientificamente as Hipóteses H2 (Descoberta) e H3 (Planejamento), a IEA-0 registrará rigorosamente as seguintes métricas em seu Ledger:
* **Coverage:** Quantidade e diversidade de ambientes (Fields) escaneados.
* **Volume de Hipóteses:** Oportunidades encontradas vs Oportunidades rejeitadas.
* **Justificativa de Rejeição:** Taxa de rejeição por tipo (Risco Legal, Necessidade de Capital, Fricção Técnica, Falta de Demanda).
* **Precisão de Expectativa:** Retorno Esperado (Estimado) `vs` Receita Real (Confirmada).
* **Eficiência de Recurso:** Custo operacional da execução (Gasto de API/Gás) `vs` Lucro.

---

## E) PRIMEIRO EXPERIMENTO

* **Objetivo:** Produzir a primeira evidência empírica de "Inteligência + Descoberta Autônoma + Ação + Feedback", independentemente do volume financeiro.
* **Condição de Partida:** Fornecer à IEA-0 acesso à internet, capacidade de rodar código localmente, uma chave de API para comunicação (se aplicável/permitida), e R$ 0,00. Nenhuma indicação de mercado, produto ou veículo será dada.
* **Execução:** A IEA-0 rodará seu pipeline autonomamente. Espera-se que ela registre no Ledger todos os ambientes rejeitados, anuncie a oportunidade validada (seja ela vender um script, licenciar uma imagem gerada, criar uma ferramenta web, etc), estabeleça um mecanismo de cobrança lícito e execute a entrega mínima viável.

---

## F) BASELINE DE COMPARAÇÃO

**Baseline atual (Assistente Passivo):** Um LLM de ponta (ex: GPT-4 ou Claude 3.5) ao qual o usuário pede: *"Me dê ideias de como ganhar dinheiro com 0 reais na internet hoje"*.
*   *O que a Baseline faz:* Lista ideias (Freelance, Criar Canal no YouTube, Vender PLR). Gera textos (ideias), mas não atua. Depende 100% de um humano para selecionar, planejar, codificar, prospectar, configurar recebimento e coletar feedback.
*   *O que a IEA-0 deve provar (O Delta):* A capacidade de ultrapassar o muro da "ideia" e completar o loop operacional e econômico de forma sistêmica, fechando transações (ou testando-as no mundo real) e ajustando a estratégia sozinha baseada em resultados tangíveis.

---

## G) CRITÉRIOS OBJETIVOS DE SUCESSO E FRACASSO

### SUCESSO (Graus de Validação):
*   **Sucesso Nível 1 (Aprendizado Validado):** A IEA-0 executa todo o loop, escolhe um Field não-trivial autonomamente, respeita guardrails, executa a ação, não recebe dinheiro (Receita = 0), mas registra adequadamente o fracasso da tese no Ledger, atualiza seus pesos e tenta uma abordagem diferente, melhorando em relação à tentativa anterior.
*   **Sucesso Nível 2 (Agência Econômica Provada):** A IEA-0 completa o loop e captura Receita Real (> R$ 0), provando que descobriu e extraiu valor do mercado nativamente e sem aporte.

### FRACASSO:
*   **Viés de Dependência:** O sistema trava e solicita ao humano *"Qual nicho devo escolher?"* ou *"Por favor crie a conta no site X para mim"*.
*   **Rompimento de Guardrail:** A IEA-0 tenta usar manipulação, quebra termos de serviço de plataformas ou sugere ações juridicamente questionáveis para acelerar o processo.
*   **Loop Infinito (Paralysis by Analysis):** O *Opportunity Engine* fica gerando ideias infinitamente e falha em fazer a transição para a *Action Layer*.
*   **Alucinação Econômica:** Registrar "Receita Potencial" como "Receita Real" no Ledger sem a devida compensação financeira comprovada via API.
# AUDITORIA E PREPARAÇÃO DO PILOTO IEA-0
*Análise Crítica, Mitigação de Leakage e Matriz Experimental*

## A. AUDITORIA DO `cognitive_sandbox.py` (O que estava errado)
Após inspeção rigorosa do código base, as seguintes falhas metodológicas foram identificadas:
*   **A. Categorias Pré-Codificadas:** O Simulador Estocástico continha as categorias `marketing`, `regulatory` e `webdev` hardcoded nas linhas 38-40.
*   **B. Sugestão no Prompt (Viés):** A linha 22 do prompt fornecia exemplos explícitos ao LLM: `UMA_PALAVRA_CATEGORIA (ex: marketing, regulatory, webdev)`. O LLM não estava descobrindo, estava copiando.
*   **C. Criação pelo Normalizer:** O `hypothesis_normalizer` (linhas 48-52) apenas instanciou a classe a partir da string fornecida pelo LLM, confiando cegamente em uma única palavra sem taxonomia estruturada.
*   **D. Leakage do Sandbox (Falha Crítica):** O `ObserverEngine` (linhas 12-19) revelou: *"50% sofrem com novas multas... 80% gastam com anúncios sem ROI"*. Isso vazou indiretamente a regra oculta do `market_mock` de que "regulatory" teria 85% de sucesso e "marketing" 5%. O LLM não deduziria isso testando o mercado, ele já sabia a resposta lendo o prompt.
*   **E. Leakage do Resultado:** Sim, a descrição do ambiente entregava o resultado econômico esperado de antemão.
*   **F. LLM Real:** Não foi efetivamente utilizado. A execução dependeu inteiramente do Simulador Cognitivo Estocástico, configurando um teste de integração de engenharia, mas não um teste cognitivo de inteligência fundacional.

## B. REVISÃO DO HYPOTHESIS NORMALIZER
Para não forçar uma única palavra limitante, o LLM fornecerá atributos isolados. O *Normalizer* utilizará uma representação hierárquica baseada em tuplas.
*   **Atributos Solicitados ao LLM:** `target_audience`, `delivery_mechanism`, `monetization_model`, `expected_revenue`, `expected_cost`, `probability`.
*   **Clustering Heurístico:** O Normalizer criará a Classe Econômica (Arm do Thompson Sampling) concatenando a intenção base: `Classe = Hash(target_audience + delivery_mechanism)`. 
*   **Aprendizado Compartilhado:** Se o LLM sugerir "padarias | automação de whatsapp" e no ciclo seguinte "cafeterias | automação de whatsapp", o Normalizer usará similaridade textual de Jaccard (threshold > 0.7) para apontar para a mesma distribuição `Beta`, garantindo generalização sem taxonomia engessada.

## C. CONFIRMAÇÃO DO USO DE LLM REAL
*   **Status Atual:** Teste cognitivo real **NÃO EXECUTADO**.
*   **Motivo:** O console local (Windows powershell) onde os scripts estão rodando não possui a variável `GEMINI_API_KEY` injetada, impedindo a requisição HTTP direta ao orquestrador. Sem a chave, qualquer tentativa de piloto rodaria no Simulador. Para proteger a ciência do experimento (Regra 4 e Regra 10), o Piloto está paralisado até que a chave seja fornecida ou o ambiente local autorize o uso do endpoint.

## D. DEFINIÇÃO: BASELINE_LLM_STATIC
Nova configuração isolada adicionada à matriz:
*   `--mode=baseline_llm_static`
*   **O que faz:** O LLM opera no mesmo ambiente, com o mesmo orçamento e prompt, mas *não recebe* o Ledger e o Motor de Prior é desativado. Ele opera em estado de amnésia total entre ciclos. Isso provará se o LLM consegue "acertar por sorte/genialidade nativa" ou se ele degrada economicamente sem a arquitetura de agência.

## E. MATRIZ EXPERIMENTAL (O Funil do Piloto)
O Piloto executará `Runs` limitados a 10 Ciclos para as 6 configurações:
1. `iea_full`: Orquestração total.
2. `ablation_no_prior`: Ledger ligado, Matemática Bayesiana desligada.
3. `ablation_no_ledger`: Apenas matemática e janela de contexto.
4. `baseline_d_memory_only`: LLM com acesso ao histórico, sem matemática de decisão.
5. `baseline_llm_static`: LLM puro, sem memória, sem prior.
6. `baseline_statistical_greedy`: Motor de Valor Esperado puro, sem LLM gerando as hipóteses (usa catálogo estático).

## F. PILOTO 5x POR CONFIGURAÇÃO & RELATÓRIOS
*(Pendente Execução. Exige LLM Real autorizado. Código do orquestrador do piloto sendo estruturado localmente.)*

## I. DECISÃO OBJETIVA
**Status Atual:** **NÃO PRONTO PARA N=64.**
**Bloqueios:** 
1. Leakage extremo no prompt do Observer descoberto na auditoria.
2. Ausência de credenciais (API Key) no Runtime local impedindo a prova cognitiva real.
3. O script do piloto unificado (orquestrando as 6 baselines concorrentes) precisa ser construído e validado em 1 RUN manual antes de escalar para o 5x.
# DEFINIÇÕES ESTATÍSTICAS DO EXPERIMENTO IEA-0
*Rigor Quantitativo e Controle de Inferência*

Este documento define os balizadores matemáticos do experimento, garantindo que não haja mineração de dados (*p-value hacking* ou parada opcional) e tratando a complexidade de séries temporais não-IID (Independent and Identically Distributed).

---

## 1. FORMULAÇÃO ESTATÍSTICA (Teste de Agência)

A validação da Agência Econômica repousa sobre a melhoria preditiva ou econômica entre *RUNS* de configurações diferentes.

*   **Variável de Resposta Principal ($Y$):** Regret Acumulado (Diferença entre o Valor Ótimo do Sandbox e o Valor Capturado pela IEA) ou Erro de Previsão de Receita (MAE) no final de um *RUN*.
*   **Hipótese Nula ($H_0$):** Não há diferença estatisticamente significante na Média da Variável de Resposta entre a `IEA_Full` e a `Baseline Estatística`. ($Y_{IEA} = Y_{Baseline}$). A inteligência orquestrada não gera ganho sobre a matemática pura.
*   **Hipótese Alternativa ($H_1$):** A Média da Variável de Resposta da `IEA_Full` é estritamente melhor (ex: Menor MAE, Menor Regret) do que a `Baseline Estatística` e as ablações ($Y_{IEA} < Y_{Baseline}$).
*   **Nível de Significância ($\alpha$):** 0.05.
*   **Minimum Detectable Effect (MDE):** O tamanho de efeito mínimo relevante é estabelecido em $d = 0.5$ (Cohen's d) de variação no Erro de Previsão ou Regret. Efeitos menores, mesmo que significantes, serão considerados *Evidência Inconclusiva* do ponto de vista do impacto econômico no mundo real.

---

## 2. TRATAMENTO DE DEPENDÊNCIA TEMPORAL E AUTOCORRELAÇÃO

Ciclos da IEA (1, 2, 3... N) pertencentes ao mesmo RUN são temporalmente dependentes (a saída do Ciclo 1 é a entrada do Ciclo 2). A suposição de independência (IID) é flagrantemente violada se os tratarmos como amostras separadas.

*   **Abordagem Metodológica:** Usaremos Modelos Lineares de Efeitos Mistos (Mixed-Effects Models), onde o `RUN_ID` opera como um Efeito Aleatório (Random Effect) para controlar a variância de linha de base específica daquele ambiente instanciado, e a `Configuração do Agente` atua como Efeito Fixo (Fixed Effect).
*   **Autocorrelação:** Em análises intra-RUN (se o aprendizado acontece *ao longo* dos ciclos do mesmo Run), utilizaremos testes de séries temporais ou correlações de postos, testando se a derivada do EPE em relação ao tempo é negativa e estatisticamente separada de um random walk.

---

## 3. DIMENSIONAMENTO DA AMOSTRA E REGRA DE PARADA

Para evitar que o experimento rode repetidamente até "encontrar" um P-Value favorável (Optional Stopping), as métricas do experimento são pré-registradas:

*   **Tamanho Amostral Necessário:** Baseado no poder estatístico (Power = 0.80) para detectar o MDE de 0.5 com $\alpha=0.05$, a amostra necessária é de **64 RUNS independentes** por grupo de configuração (IEA_Full vs Baseline, etc.).
*   **Regra de Parada:** O experimento será executado ininterruptamente até atingir $N = 64$ RUNS concluídos para cada Baseline/Ablação especificada. A extração e o cálculo do *P-Value* e do Intervalo de Confiança serão feitos estritamente após o Run 64 de cada grupo. Quaisquer cálculos antes dessa marca são meramente exploratórios.

---

## 4. ISOLAMENTO DAS MÉTRICAS DE RESULTADO ECONÔMICO

O sucesso não é julgado por um único vetor financeiro. O Ledger extrairá as seguintes métricas rigorosamente separadas no fechamento de cada RUN:

1.  **Receita Bruta** (Ovos de Ouro: Fluxo de caixa lícito capturado de R$ 0).
2.  **Custo de Infraestrutura/Milho** (Custo de Tokens, API, Computação e Ferramentas).
3.  **Compute-to-Value Ratio (CVR)** (Métrica Mestre: Receita Gerada / Custo de Infraestrutura). O retorno obtido puramente por aplicação de processamento cognitivo.
4.  **Tempo Computacional Total** (Latência total do Run).
5.  **Value of Information (VoI):** Medido pela Redução da Entropia na distribuição de probabilidade das hipóteses do mercado após o RUN.

---

## 5. CONTROLE DE VIÉS DE SELEÇÃO NO FIELD SCANNER

Como a máquina escolhe autonomamente qual porta abrir, ela pode focar em portas fáceis que geram viés de aparente alta performance.
*   **Regra de Log do Universo:** Antes do `SelectorEngine` afunilar o mercado, ele deve despejar no Ledger todas as alternativas lidas da API (O "Universo Acessível").
*   **Variável de Controle:** Modelos preditivos de propensão (Propensity Score Matching) poderão ser utilizados *a posteriori* para ajustar o desempenho econômico baseado na dificuldade inerente dos Fields que a máquina voluntariamente descartou vs. os que ela selecionou.
# ESPECIFICAÇÃO TÉCNICA DA MVM (IEA-0)
*Paradigma da Galinha dos Ovos de Ouro - Arquitetura Zero-Capital*

## A. O PARADIGMA FUNDAMENTAL
A IEA-0 **NÃO** é uma gestora de capital, trader ou investidora. Ela não come ouro para botar ouro. Ela come "Milho" (Eletricidade, Computação, Dados, Tokens de LLM, Ferramentas) e bota "Ovos de Ouro" (Receita Financeira).

**Regra de Ouro (Zero-Capital):**
*   **Capital Financeiro Inicial:** R$ 0,00.
*   **Proibições:** Sem compra de tráfego, sem compra de leads, sem apostas de mercado, sem terceirização paga.
*   **O Ciclo:** Computação → Percepção → Descoberta → Criação de Valor → Receita Lícita.
*   **Regra da Infraestrutura:** Qualquer receita futura não será usada para especular, mas exclusivamente para comprar mais "Milho" (APIs mais rápidas, mais agentes, servidores maiores).

---

## B. MAPA DE COMPONENTES E MITIGAÇÃO DE VIÉS DE SELEÇÃO

1. **`InitEngine`**:
   * *Função:* Instancia um *RUN* com Capital = R$ 0. Libera a cota de "Milho" (Orçamento Computacional).
2. **`ObserverEngine`**:
   * *Função:* Varredura sem custo financeiro (Web scraping aberto).
3. **`SelectorEngine`**:
   * *Função:* Filtra os ambientes. Despeja o "Universo Acessível" no Ledger.
4. **`FormulatorEngine`**:
   * *Função:* Formula micro-teses estritamente baseadas em serviços digitais, intermediação de informação ou geração de código (Custo 0).
5. **`DecisionEngine` (Motor Compute-to-Value)**:
   * *Função:* Avalia o Retorno sobre Inteligência (RSI), e não ROI financeiro.
6. **`ExecutionEngine`**:
   * *Função:* Age no Sandbox consumindo apenas tempo e tokens.
7. **`MeasurementEngine` e `PriorUpdaterEngine`**:
   * *Função:* Mede se o ovo de ouro foi botado e calibra os priors do mercado.

---

## C. FLUXO DE DADOS ZERO-CAPITAL
`INIT RUN` → Semente = 0 Capital.
`OBSERVE` → Coleta dados.
`FORMULATE` → Formula Hipóteses onde $Custo Financeiro = 0$.
`DECIDE` → Motor avalia a melhor conversão estatística de Tokens (Milho) em $ (Ouro).
`EXECUTE` → Envia a ação digital.
`MEASURE` → Recebe `Real Outcome`.
`UPDATE` → Modifica a Distribuição Beta associada à classe.

---

## D. SCHEMA DO ECONOMIC LEDGER (Revisado)

Abolido o campo `capital_consumed`. Introduzido o `compute_cost_consumed`.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "run_id": {"type": "string"},
    "cycle_id": {"type": "integer"},
    "universe_observed": {"type": "array"},
    "chosen_hypothesis": {"type": "object"},
    "counterfactual_rule": {"type": "string"},
    "real_metrics": {
      "type": "object",
      "properties": {
        "gross_revenue_usd": {"type": "number", "description": "Ovos de Ouro"},
        "compute_cost_tokens": {"type": "number", "description": "Milho Consumido"},
        "time_elapsed_ms": {"type": "number"}
      }
    },
    "error_metrics": {
      "type": "object",
      "properties": {
        "MAE_revenue": {"type": "number"},
        "Brier_Score": {"type": "number"}
      }
    }
  }
}
```

---

## E. A NOVA MÉTRICA DE APRENDIZADO (CVR)

Como o Capital Inicial é zero, o cálculo tradicional de ROI (Lucro / Capital) causa divisão por zero ou deturpa o conceito. A métrica fundamental de aprovação do experimento passa a ser:

**Compute-to-Value Ratio (CVR) / Retorno sobre Inteligência:**
$$CVR = \frac{\text{Receita Real Gerada (USD)}}{\text{Custo de Infraestrutura Consumida (Tokens + APIs)}}$$

Uma IEA de sucesso é aquela que, ao longo dos ciclos e utilizando a atualização Bayesiana, maximiza seu $CVR$, aprendendo a evitar becos sem saída computacionais (ideias que gastam muitos tokens e não geram dólares) e priorizando ineficiências de alta conversão digital.

---

## F. O TESTE DO PRIMEIRO OVO (Marco 1)

O critério de sucesso do Sandbox simulado não é administrar R$ 100 de forma autônoma. 
O sucesso é registrar matematicamente:
`gross_revenue > 0`
partindo de:
`starting_financial_capital = 0`.

Esta é a fundação da IEA-0. O laboratório isolado validará que a arquitetura estrutural permite à máquina encontrar o caminho para essa conversão de "milho em ouro" usando exclusivamente a sua infraestrutura computacional de percepção, decisão e execução.
# MAPA DO ESTADO DA ARTE: INTELIGÊNCIA ECONÔMICA ARTIFICIAL (IEA)
*Pesquisa e Diagnóstico - 2026*

## 1. INICIATIVAS MAPEADAS

### A. Truth Terminal (O "Primeiro Agente Milionário")
* **Criadores:** Andy Ayrey
* **Ano:** 2024-2025
* **Objetivo:** Experimento de performance artística explorando a intersecção de IA, cultura de memes e finanças descentralizadas.
* **Arquitetura/Modelos:** Modelo conversacional acoplado a uma conta no X (Twitter) e uma carteira cripto gerenciada por humanos.
* **Grau de Autonomia:** **Baixo/Médio.** A IA gera a narrativa e os tweets autonomamente, mas as transações financeiras (compra/venda/gestão da wallet) são validadas ou executadas pelo criador.
* **Capacidade de descobrir oportunidades:** Nula (atua por influência de engajamento social, não por cálculo financeiro algorítmico).
* **Mecanismo de feedback:** Engajamento social e doações externas.
* **Receita real?** Sim (milhões de dólares em tokens $GOAT), porém baseada em especulação e doações, não em geração de valor utilitário ou serviço contínuo.
* **Classificação:** EXPERIMENTO / IDEIA.

### B. NEAR AI Agent Market (A "Infraestrutura Base")
* **Criadores:** NEAR Protocol
* **Ano:** 2025-2026
* **Objetivo:** Criar um marketplace descentralizado para "Agentic Commerce", onde IAs podem transacionar entre si.
* **Arquitetura/Modelos:** Contratos inteligentes baseados em "NEAR Intents" integrados a Trusted Execution Environments (TEEs) para privacidade.
* **Grau de Autonomia:** **Alto.** Agentes possuem carteiras nativas e pagam gás autonomamente.
* **Capacidade de descobrir oportunidades:** Limitada. Os agentes são excelentes executores (LAMs - Large Action Models) de intenções humanas (ex: "faça swap de token X por Y no melhor preço"), mas não possuem uma camada de descoberta proativa (não acordam e decidem criar um novo negócio do zero).
* **Receita real?** Sim, no nível de micro-pagamentos por execução de tarefas (Machine-to-Machine).
* **Limitações:** São ferramentas de *execução* orquestrada, mas carecem da "Célula de Descoberta" proativa orientada a ROI.
* **Classificação:** SISTEMA OPERACIONAL.

### C. Autonomous Revenue Agents (Outcraft AI, Warmly)
* **Criadores:** Diversas startups SaaS B2B.
* **Ano:** 2025-2026
* **Objetivo:** Substituir SDRs (Sales Development Reps) humanos e gerir funis de vendas fim a fim.
* **Arquitetura/Modelos:** LLMs acoplados a CRMs (Salesforce/Hubspot) e plataformas de comunicação omnicanal.
* **Grau de Autonomia:** **Médio.** Executam funis inteiros de vendas, lidam com objeções e marcam reuniões.
* **Mecanismo de feedback:** Taxa de conversão e pipeline gerado.
* **Limitações:** São "Agentes Comerciais" trabalhando para um produto/mercado *já definido* pelo humano. Eles não escolhem o que vender nem retêm o lucro.
* **Classificação:** PRODUTO / DEMONSTRAÇÃO.

### D. DeFAI (Decentralized Finance AI - Fetch.ai, Autonolas)
* **Criadores:** Comunidades Web3 / Fetch.ai / Olas
* **Ano:** 2023-2026
* **Objetivo:** Automação de finanças descentralizadas (yield farming, rebalanceamento de portfólio, agentes DeFi).
* **Arquitetura:** Agentes que monitoram smart contracts e executam transações on-chain quando condições arbitrárias de assimetria de preço são atingidas.
* **Receita real?** Sim, geram ROI através de arbitragem de liquidez.
* **Limitações:** Hiper-nichados em cripto. Operam em um ambiente de regras estritas e código puro (DeFi) e não conseguem generalizar para a economia real (ex: vender um serviço B2B de software).
* **Classificação:** CAPACIDADE DEMONSTRADA.

---

## 2. IDENTIFICANDO A LACUNA

**O que já existe?** 
1. IAs que conversam e influenciam mercados sob supervisão (Truth Terminal).
2. IAs que executam ordens complexas e transacionam através de carteiras próprias (NEAR Agents).
3. IAs que prospectam clientes e vendem produtos humanos pré-existentes (Warmly).

**O que já funciona?**
Large Action Models (LAMs) executando transações via API (Machine-to-Machine commerce) e automação on-chain.

**O que ninguém demonstrou ainda? (A VERDADEIRA LACUNA)**
Ninguém construiu o **Loop Fechado de Empreendedorismo Autônomo** focado em generalização e descoberta (H2 e H7).
Os agentes atuais são *ferramentas* ou *executores* orçados por humanos. Se você não disser ao agente da NEAR o que fazer, ele fica parado. Se você não der o produto ao agente da Outcraft, ele não vende nada. 

**A Lacuna:** Alguém já construiu um sistema que acorde com R$ 0, pesquise o mercado livremente, descubra a dor, crie a solução, venda, receba na própria carteira, avalie o ROI e invista o lucro em aumentar sua própria infraestrutura de pesquisa? 
**A resposta é NÃO.** As peças (LLMs, LAMs, Crypto Wallets, TEEs) estão na mesa, mas a *Arquitetura de Agência Econômica Autônoma de Descoberta* (O Orquestrador) que junta tudo em um ciclo perpétuo ainda não existe como um produto generalizável. 

**Relação com a Hipótese da IEA:** A IEA é exatamente a ponte. Ela usa os modelos de ponta (LLMs/LAMs) e infraestruturas (como carteiras ou APIs de pagamento) não como ferramentas estáticas, mas como um *sistema nervoso econômico*.

---

## 3. IEA-0: A ARQUITETURA PROPOSTA

Para testar a hipótese com a menor complexidade possível (mas num nível superior a um mero SaaS), a IEA-0 não deve ser uma nova rede neural do zero, mas uma **Arquitetura Orquestrada** (que usa LLMs de fronteira como motor de inferência).

**Componentes da IEA-0:**
1. **Memória de Estado Econômico (Economic Memory):** Um registro contínuo (ledger + vector DB) que rastreia exatamente o capital disponível (R$ 0,00), o histórico das hipóteses passadas e os resultados de ROI (Reward).
2. **Célula de Percepção (Opportunity Engine):** Módulo autônomo de raspagem e análise de dados (ex: leitura automatizada de demandas no Reddit, Google Trends, fóruns de nicho) cruzando a variável "Dor" com "Possibilidade de Automação Rápida".
3. **Avaliador Econômico (Economic Evaluator):** O filtro algorítmico rigoroso. Rejeita ideias que demandem capital (R$ 0 rule), longo tempo de desenvolvimento, ou não tenham um claro "comprador pagante". 
4. **Agente Construtor / Operador (Action Layer):** Capacidade de gerar código e executar (Large Action Models + sandboxed environments). Ele deve ser capaz de criar landing pages simples, scripts Python de scraping, ou redigir e-mails B2B.
5. **Gateway de Feedback (Mercado Real):** Integração restrita com um webhook de pagamento (ex: Stripe ou Crypto wallet). A IEA só recebe o "Reino Positivo" (Reward) quando o webhook confirmar a transação.

---

## 4. O PRIMEIRO EXPERIMENTO (REGRA DE CAIXA)

A IEA-0 precisa testar H1 (Orientação econômica), H2 (Descoberta autônoma) e H5 (Feedback real) o mais rápido possível e com R$ 0 de custo inicial, gerando receita (Regra de Caixa).

**Hipótese Experimental:** A IEA-0 consegue atuar como intermediadora (arbitragem) de dados públicos e entregáveis digitais gerados por IA, vendendo a solução via prospecção B2B (Fria).

**Mecânica do Ciclo (Sem Intervenção Humana):**
1. **Radar/Descoberta:** O sistema varre diretórios públicos (Google Maps, APIs de dados abertos) buscando um nicho com lacunas digitais objetivas (ex: contabilidades locais sem automação de atendimento, corretoras de imóveis sem catálogo web).
2. **Construtor:** A IEA-0 gera (através da Action Layer) um "entregável mínimo" personalizado para um *lead* específico. Pode ser um mock-up em HTML, uma análise de mercado automatizada em PDF, ou um script de chatbot treinado nos dados da empresa-alvo.
3. **Comercial:** A IEA-0 envia um cold e-mail ou DM (utilizando APIs gratuitas como SendGrid/Resend) apresentando a falha, mostrando o "pedaço" da solução, e fornecendo um link de pagamento (Stripe Payment Link).
4. **Negociação:** A proposta embute a condição: *"A solução completa automatizada está pronta e custa R$ 50/R$ 100"*.
5. **Medição e Aprendizado:** A IEA-0 aguarda no Webhook.
   - Se o lead ignora -> Registra como falha, altera a abordagem.
   - Se o dinheiro entra -> O Webhook desperta a IEA-0, valida o saldo (H5), a IEA-0 libera a solução para o cliente, e aprende que o nicho/solução tem tração (H6).

**Justificativa Econômica:**
Este experimento usa ferramentas 100% gratuitas (APIs freemium), não requer incorporação imediata de empresa (uso de carteira própria do usuário de forma transitória), valida a capacidade de execução de ponta a ponta e prioriza a **Regra do Dinheiro Real**.
# PLANO DE IMPLEMENTAÇÃO E SANDBOX: IEA-0
*Baseline Mecânica e Validação Causal do Laboratório*

## A. ESTRUTURA DE DIRETÓRIOS
O projeto isolará estritamente estado, dados e lógica para garantir reprodutibilidade.
```text
iea_sandbox/
├── src/
│   ├── engines/           # Os 7 Motores de Agência
│   │   ├── init.py
│   │   ├── observer.py
│   │   ├── selector.py
│   │   ├── formulator.py
│   │   ├── decision.py    # Thompson Sampling & Math
│   │   ├── execution.py   # API Caller
│   │   ├── measurement.py # Webhook/Feedback listener
│   │   └── prior_update.py# Beta Distribution Updater
│   ├── sandbox/           # O Mundo Simulado
│   │   └── market_mock.py # Regras ocultas de conversão
│   └── main.py            # Orquestrador do RUN
├── data/
│   ├── raw_ledger/        # Append-only JSONL
│   ├── learning_state/    # Priors estatísticos (JSON)
│   └── run_state/         # Memória de curto prazo
└── tests/
    └── sanity_check.py    # Teste estrutural intra-ciclos
```

---

## B. OS TRÊS ESTADOS ESTABELECIDOS

### 1. RAW LEDGER (O Histórico Imutável)
Arquivo `ledger.jsonl`. Nenhum módulo edita uma linha passada. O LLM **nunca** tem permissão de escrita nele. Só o orquestrador anexa (append) novos eventos (Decisão Tomada, Ação, Feedback).
### 2. LEARNING STATE (O Cérebro Estatístico)
Arquivo `priors.json`. Representação matemática pura derivada 100% dos feedbacks do Ledger. Exemplo: `{"Data_Arbitrage": {"alpha": 5, "beta": 1}}`. O LLM **nunca** o edita.
### 3. DECISION STATE (A Visão Atual)
Apenas a representação transitória em memória que o `DecisionEngine` cruza para ranquear as teses do ciclo atual.

---

## C. DEFINIÇÃO MATEMÁTICA: THOMPSON SAMPLING (MAB)

Para que a IEA abandone teses ruins e explore o desconhecido matematicamente, aplicaremos o Multi-Armed Bandit (MAB) com Thompson Sampling.

1.  **O Braço (Arm/Classe):** O LLM categoriza a oportunidade descoberta em uma classe semântica curta (ex: `B2B_SaaS`, `Lead_Gen_Frio`, `Data_Arbitrage`). Essa classe é o "Braço" na matemática.
2.  **Semelhança vs Nova Classe:** Se o LLM propor uma ação que caia no domínio `B2B_SaaS`, ela herda a distribuição existente. Se propor um domínio inédito, inicializa-se como Nova Classe.
3.  **Inicialização Estatística:** Nova classe começa com a Distribuição Beta Uniforme: $\alpha = 1.0, \beta = 1.0$. Isso significa incerteza total e média esperada inicial $E = 0.5$.
4.  **A Atualização (PriorUpdaterEngine):**
    *   $Success$: Ação retornou $Receita \ge Custo$. → $\alpha_{novo} = \alpha_{atual} + 1$.
    *   $Fail$: Ação retornou 0 ou $Receita < Custo$. → $\beta_{novo} = \beta_{atual} + 1$.
5.  **A Decisão (DecisionEngine):** 
    Para cada classe de ação proposta no ciclo, o motor não usa a média, mas gera um valor estocástico $p$ diretamente da distribuição Beta da classe: $p \sim Beta(\alpha, \beta)$. 
    *   *Fórmula:* $Valor\_Da\_Decisao = (p \times Receita\_Estimada\_LLM) - Custo\_Estimado\_LLM$.
    *   *Por que funciona:* Classes altamente fracassadas ($\beta$ alto) raramente gerarão um $p$ alto. Classes novas ($\alpha=1, \beta=1$) terão variância gigante, permitindo ocasionalmente que vençam classes medianas garantidas (fator embutido de Exploração).

---

## D. O AMBIENTE: O MERCADO OCULTO DO SANDBOX

Para não colocar a resposta no prompt do LLM, o módulo `market_mock.py` simulará um ecossistema com **Regras Econômicas Ocultas** e estáticas (Hidden P-Values).
*   Se a IEA tentar vender no mercado `B2B_SaaS`, o Sandbox retornará *Fail* com probabilidade 95%.
*   Se tentar vender `Cursos_B2C`, retornará *Fail* 90%.
*   Se tentar `Data_Arbitrage` (vender análise de dados extraídos de APIs públicas), o Sandbox retornará *Success* com probabilidade 80%.

*O Teste:* O LLM, por viés, começará com as duas primeiras. A máquina deve falhar, o Thompson Sampling deve derrubar os valores de $p$ para essas classes e forçá-la a descobrir `Data_Arbitrage`, provando adaptação estrutural ao mercado invisível.

---

## E. TESTE DE SANIDADE (Sanity Check - RUN 1 Manual)

Antes dos testes N=64 e das Baselines, o `sanity_check.py` isolará o mecanismo sem envolver LLM para validar a integridade estrita do código.
1. Injeta manual Hipótese A (B2B_SaaS) e Hipótese B (Data_Arbitrage).
2. Força Ciclo 1 → Decisão Escolhe A (Uniforme).
3. Mercado retorna Falha para A.
4. `MeasurementEngine` grava no Ledger.
5. `PriorUpdater` aumenta o $\beta$ de A para 2.
6. Inicia Ciclo 2.
7. O sistema deve amostrar um $p$ menor para A e forçar a escolha de B. O `ledger` registrará a mudança estrutural causal provando o mecanismo.

---

## F. PRIMEIRO EXPERIMENTO EXECUTÁVEL (IEA-0 Sandbox)

**Passos:**
1. Orquestrador (`main.py`) liga a IEA sem dinheiro real, conectada ao `market_mock`.
2. Rodada Limitada (TTL) de Máximo 10 Ciclos.
3. Custo Simulado: O tempo do LLM custará créditos virtuais.
4. Baseline Determinística executará simultaneamente (LLM bypassed no DecisionEngine).

A entrega deste laboratório responde a uma única pergunta:
*"A MVM, restrita em um ambiente de simulação e conectada a um distribuidor Bayesiano, consegue modificar sua política de execução baseada unicamente no feedback recebido, resistindo à inércia de seu próprio viés semântico inicial?"*
# O PARADIGMA DA GALINHA DOS OVOS DE OURO
*A Fundação Zero-Capital da Inteligência Econômica Artificial*

## 1. O ERRO DO CAPITAL EM RISCO
A tese de que a IEA opera como uma *trader*, gestora de capital ou especuladora foi categoricamente banida da arquitetura. 
A IEA **não come ouro para botar ouro.** Se ela precisasse de capital financeiro para produzir retorno, ela seria um mero algoritmo de alocação de risco (algo que já existe há décadas nas finanças quantitativas).

## 2. A METÁFORA CORRETA
A IEA é a **Galinha dos Ovos de Ouro**.
*   **O MILHO (Input):** Computação, eletricidade, dados, tokens de LLM e ferramentas de software.
*   **O OVO DE OURO (Output):** Receita financeira real.

O objetivo absoluto da IEA-0 é descobrir como transformar *inteligência* e *informação* em valor econômico partindo rigorosamente de **R$ 0 de capital financeiro inicial.**

## 3. A REGRA DA INFRAESTRUTURA
Quando a IEA produzir seus primeiros ovos de ouro, esse capital **não** poderá ser utilizado para apostas financeiras, compra de mídia paga, compra de leads ou mercado de ações.
Qualquer reinvestimento do resultado será estritamente classificado como **Infraestrutura Produtiva**. 
*Ouro compra mais Milho.*
A receita será usada para comprar APIs mais poderosas, agentes especializados, maior armazenamento ou tempo computacional, o que gerará mais receita no ciclo seguinte.

## 4. O NOVO MARCO UM (O Primeiro Ovo)
O sucesso inaugural do laboratório não será "conseguimos administrar R$ 100 de forma autônoma e lucrar R$ 10".
O sucesso será:
> *"Conseguimos produzir a primeira receita verificável partindo de R$ 0 de capital financeiro, utilizando puramente os recursos computacionais (milho) disponibilizados."*

## 5. A NOVA MÉTRICA (CVR)
O Retorno Sobre Investimento (ROI) tradicional foi abolido, pois o capital inicial é zero. A nova métrica que a IEA busca otimizar é o **Compute-to-Value Ratio (CVR)** ou *Retorno sobre Inteligência*:
$CVR = \frac{Receita Lícita Gerada}{Custo da Infraestrutura Computacional Consumida}$

Uma IEA verdadeiramente autônoma é aquela que maximiza seu CVR, abandonando ideias que gastam muita computação e não geram receita, e explorando eficiências digitais que convertem *prompts* e *scripts* em dinheiro real sem depender de apostas financeiras.
# PROTOCOLO CIENTÍFICO E ESTATÍSTICO DEFINITIVO: IEA-0
*Documento de Auditoria Metodológica e Falsificabilidade*

## PERGUNTA CIENTÍFICA CENTRAL
*"Uma arquitetura de agência econômica permite que um modelo fundacional transforme feedback econômico real em alterações sistemáticas de percepção, decisão e alocação de atenção que melhoram seu desempenho futuro?"*

---

## A. REVISÃO DO FRAMEWORK DE MÉTRICAS ECONÔMICAS E CALIBRAÇÃO

A aglutinação de variáveis (EAG) foi descartada em favor de um modelo multivariado desagregado, garantindo validade estatística.

**1. Melhoria de Previsão (Forecast Accuracy):**
*   **Brier Score ($BS$):** Utilizado *estritamente* para avaliar a calibração de variáveis binárias. Ex: $P(\text{conversão} > 0 \mid \text{hipótese})$.
*   **Erro Absoluto Médio (MAE) de Receita:** Mede a qualidade da estimativa de fluxo de caixa esperado.
*   **Erro Quadrático Médio (RMSE) de Custo:** Mede a precisão da projeção de consumo de recursos (tempo, tokens, capital).

**2. Melhoria de Decisão (Decision Quality):**
*   **Regret (Arrependimento):** O diferencial entre o valor econômico da ação escolhida pela IEA-0 e a ação ótima teórica conhecida a posteriori no Sandbox.
*   **Value of Information (VoI):** Estratégias que perdem dinheiro, mas reduzem drasticamente a incerteza de um ambiente (reduzindo a variância de um *Prior* Bayesiano de $\sigma_{alta}$ para $\sigma_{baixa}$), terão seu VoI quantificado e creditado como sucesso exploratório, não como falha econômica.

**3. Melhoria de Resultado Econômico:**
*   Avaliados separadamente: Lucro Líquido Cumulativo, ROI do Ciclo, Custo de Aquisição e Capital Consumido.

---

## B. DEFINIÇÕES SEMÂNTICAS DE EVOLUÇÃO COGNITIVA

Para evitar falsos positivos de agência, os seguintes limiares são estabelecidos:
*   **MEMÓRIA:** O armazenamento inerte da informação. Ex: O *Ledger* registra "E-mail B2B falhou".
*   **ADAPTAÇÃO:** A alteração estocástica ou pontual de comportamento após receber informação. Ex: A IEA tenta B2C no ciclo seguinte sem base estruturada.
*   **APRENDIZADO:** A alteração sistemática de comportamento que reflete melhoria estatisticamente significante na qualidade da previsão (MAE, BS) ou decisão (Regret) em eventos futuros correlatos.
*   **GENERALIZAÇÃO:** O aprendizado persiste e mantém impacto positivo no ROI quando o sistema encontra um ambiente (Field) fundamentalmente novo.

---

## C. PROTOCOLO ESTATÍSTICO DE CICLOS

A afirmação de que 3 ciclos provam aprendizado é metodologicamente insatisfatória. A arquitetura será submetida a um funil de quatro estágios estatísticos:

1.  **Piloto (3 a 5 Ciclos):** Teste mecânico. Valida se o *loop* operacional (API, Ledger, Prior Update) processa sem quebrar.
2.  **Replicação (N=30+ Ciclos):** A IEA operará sob um Field macro estático. Objetivo: Comprovar convergência estatística (Redução de MAE e Brier Score) em um mesmo ambiente.
3.  **Teste Fora da Amostra (Out-of-Sample):** Aplicação dos pesos (Priors) aprendidos na fase de Replicação em um conjunto de dados do mesmo domínio retido do treinamento (Holdout), medindo se houve *overfitting* ou aprendizado real.
4.  **Teste de Generalização:** (Detalhado no Tópico G).

---

## D. GRADE DE TESTES DE ABLAÇÃO

Para provar quais componentes realmente produzem o ganho de agência e isolar o peso do modelo fundacional (LLM), a IEA completa será testada contra versões castradas de si mesma:
*   **IEA_Full:** Arquitetura 100% funcional.
*   **IEA_NoLedger:** Sem o Log estruturado. Depende estritamente do tamanho da janela de contexto (context window) do LLM.
*   **IEA_NoPriorUpdate:** Sem a matemática Bayesiana. Registra memória, mas o LLM tem que deduzir pesos textualmente.
*   **IEA_NoFieldSelection:** O pesquisador fixa o nicho. Mede a perda de ROI gerada pela ausência de autonomia de descoberta ampla.
*   **IEA_NoFeedback:** Executa ações continuamente sem confirmação do Webhook. Serve como baseline de alucinação de resultado.

---

## E. BASELINES DE CONTROLE EXTERNIDADES

*   **Baseline LLM_Pura (A, B, C):** Como definido no protocolo anterior (Prompt estático para medir Autonomia Cognitiva sem infraestrutura de agência).
*   **Baseline Decisão_Estatística (Algoritmo Ganancioso/Greedy):** Uma política que escolhe oportunidades **estritamente pelo maior Valor Esperado calculado matematicamente, sem envolver LLM no julgamento.** Serve para testar se a cognição do LLM produz "insight qualitativo" além da matemática simples.

---

## F. CONTROLE DE PROMPT (Ambiente Fechado)

Qualquer alteração nos prompts invalida a inferência de aprendizado (não dá para saber se o sistema aprendeu ou se o humano escreveu um prompt melhor).
*   Os prompts do Orquestrador e dos Módulos (Selector, Evaluator) serão versionados e **congelados** no commit zero do experimento. 
*   O único artefato mutável no sistema durante as fases 2, 3 e 4 será o banco vetorial e os `Priors`.

---

## G. TESTE DE TRANSFERÊNCIA (GENERALIZAÇÃO)

A evidência definitiva da IEA ocorre na Transferência de Domínio.
*   **Mecânica:** A IEA-0 treina no *Ambiente A* (Ex: Arbitragem de serviços B2B digitais). Aprende a regra empírica: *"Venda direta sem prova social prévia gera BS=0 e Custo de Oportunidade alto"*.
*   **Transferência:** O sistema é limpo de memória textual, forçado para o *Ambiente B* (Ex: Comércio B2C de micro-produtos SaaS). Conserva-se apenas os *Priors* matemáticos generalistas aprendidos.
*   **Critério de Sucesso:** Se o EPE inicial no Ambiente B for sistematicamente menor do que o EPE inicial de uma IEA-0 "zerada" exposta ao Ambiente B, prova-se a transferência abstrata de aprendizado econômico.

---

## H. CRITÉRIOS RÍGIDOS DE SUCESSO

A IEA-0 NÃO é validada por "ter lucro isolado". Ela deve acumular um *P-Value* aceitável nas seguintes provas empíricas simultâneas:
1. **Descoberta Autônoma:** Identificou uma assimetria válida fora do seu conjunto de dados de treinamento via raspagem.
2. **Decisão / Ação:** Converteu raciocínio em execução de código ou webhook viável.
3. **Feedback:** Processou o sinal negativo/positivo (R$).
4. **Atualização Estrutural:** O Brier Score (Calibração) melhorou estatisticamente no ciclo N+1.
5. **Generalização:** Passou no Teste de Transferência (Tópico G) com ganho sobre o Baseline algorítmico.

---

## I. CRITÉRIOS DE REFUTAÇÃO

A hipótese (e toda a viabilidade da IEA-0) será destruída se observarmos:
1. O LLM ignora consistentemente o resultado negativo dos *Priors* (matemática) em favor de seu viés de peso pré-treinado.
2. A Ablação `IEA_NoPriorUpdate` performa melhor que a `IEA_Full`, indicando que a matemática de agência está introduzindo ruído e que a inteligência semântica isolada do modelo bastava.
3. A melhoria no EPE estaciona em 0 (Zero) ou piora em ambientes fora da amostra, provando que ocorreu *Memorização (Overfitting)*, mas nenhum Aprendizado ou Generalização causal.
# PROTOCOLO CIENTÍFICO E DESENHO EXPERIMENTAL DEFINITIVO: IEA-0
*Documento de Validação Metodológica Final - CONGELADO*

## A. HIPÓTESE CIENTÍFICA CENTRAL
*"Uma arquitetura de agência econômica permite que um sistema baseado em modelos fundacionais converta feedback econômico em alterações sistemáticas de estado, decisão e alocação de atenção que melhoram desempenho futuro e, quando possível, transferem-se para ambientes novos?"*

**Nota de Rigor sobre Descoberta:** Não é possível provar que o LLM "nunca soube" de uma oportunidade apenas porque ela não estava no prompt (o conhecimento pode estar embutido nos pesos da rede). Logo, a "Descoberta Autônoma" refere-se à capacidade da IEA de instanciar, priorizar e agir sobre um padrão perante estímulos do ambiente, e não à exclusividade epistêmica da informação.

---

## B. DESENHO EXPERIMENTAL: CICLOS E RUNS INDEPENDENTES

Para garantir validade estatística, o experimento diferencia estritamente:
*   **CICLO:** Uma interação econômica isolada (Observar → Decidir → Agir → Medir → Atualizar) dentro de uma trajetória de aprendizado (Markov Chain). Ciclos **não** são independentes (não-IID).
*   **RUN:** Uma execução experimental independente, partindo do estado inicial limpo (Priors zerados, Memória limpa).

O desenho experimental ocorrerá em Múltiplos **RUNS Independentes**, permitindo a comparação estatística transversal entre a IEA e as Baselines/Ablações.

#### 3. Variáveis Dependentes ($Y$) (Métricas de Sucesso)
*   **A. ZERO-CAPITAL REVENUE GENERATION**: O marco absoluto (Primeiro Ovo de Ouro). Verificação booleana ($Receita > 0$) gerada a partir de $0 de capital financeiro inicial.
*   **B. COMPUTE-TO-VALUE RATIO (CVR)**: A taxa de eficiência em transformar "Milho" em "Ovos de Ouro". $CVR = \frac{Receita Bruta (USD)}{Custo Computacional Consumido (USD de Tokens e APIs)}$. Esta métrica substitui o ROI financeiro tradicional, visto que o denominador de capital financeiro é R$ 0.
*   **C. REGRET INTRA-RUN ACUMULADO**: Diferença progressiva entre a ação escolhida e a ação ideal *a posteriori*. Deve cair ao longo de um Run, mostrando o abandono de áreas infrutíferas.
*   **D. VALUE OF INFORMATION (VoI)**: Medida entrópica da redução da incerteza após o experimento, independentemente da taxa de lucro nominal alcançada no laboratório.
*   **E. FORECAST ERROR (MAE / Brier Score)**: Isola se a inteligência cognitiva (LLM) melhorou as calibrações de suas previsões baseando-se nos priors.

---

## C. ESTÁGIOS DA PESQUISA

### FASE 1: DISCOVERY
O RUN é iniciado. A IEA-0 escolhe *onde* procurar. A arquitetura de log salva o Universo de Seleção (para mitigação de Viés de Seleção — documentando o que foi visto, escolhido e descartado).

### FASE 2: ADAPTATION (Não "Treinamento")
A IEA-0 executa e recebe Feedback. Ela realiza a **Adaptação de Política** e **Atualização de Priors** (estado probabilístico algorítmico). Não há treinamento de pesos neurais.

### FASE 3: TRANSFERÊNCIA DE AMBIENTE
A arquitetura encerra a adaptação no *Ambiente A* e transfere estritamente os **Priors/Estado Aprendido** para o *Ambiente B* (preservando o LLM base). A IEA é testada perante novos dados para medir Generalização.

---

## D. GRADE DE TESTES DE ABLAÇÃO E BASELINES

Para isolar o valor preditivo da arquitetura, compararemos múltiplos RUNS de:
*   **IEA_Full:** Arquitetura 100% funcional.
*   **IEA_NoLedger:** Sem o Log estruturado.
*   **IEA_NoPriorUpdate:** Sem a matemática Bayesiana.
*   **IEA_NoFieldSelection:** O nicho é fixado pelo humano (teste de custo de perda de autonomia de alocação de atenção).
*   **IEA_NoFeedback:** Atua sem sinal real.
*   **Baseline D:** Memória de texto apenas, sem mecanismo estruturado de feedback econômico.
*   **Baseline Estatística Simples:** Escolhe estritamente pelo Valor Esperado da fórmula, sem julgamento qualitativo do LLM.

---

## E. O TESTE DE TRANSFERÊNCIA (O Padrão Ouro)

O poder de generalização será avaliado transferindo a IEA do *Ambiente A* para o *Ambiente B* e medindo as seguintes configurações simultaneamente (RUNS paralelos):
A. IEA adaptada no Ambiente A → transferida para o Ambiente B.
B. IEA "zerada" (sem adaptação prévia) → instanciada no Ambiente B.
C. Baseline D (LLM puro com memória) → instanciada no Ambiente B.
D. Baseline Estatística Simples → instanciada no Ambiente B.

O ganho esperado para provar Generalização é que a Instância A performe estatística e economicamente melhor que as Instâncias B, C e D no ambiente não visto, provando que o ganho é advindo da abstração causal da experiência anterior.

---

## F. ESTRUTURA SEMÂNTICA EXIGIDA
*   **Memória:** Armazenar informação estática.
*   **Adaptação:** Alterar comportamento de forma reativa após a informação.
*   **Aprendizado:** Alterar comportamento de maneira *sistemática* (mensurável nas métricas de Calibração/EPE) melhorando a previsão ou decisão.
*   **Generalização:** A melhoria preditiva ou econômica permanece quando o sistema encontra um ambiente novo.

---

## G. CRITÉRIOS DE EVIDÊNCIA E CONCLUSÃO DO EXPERIMENTO

O experimento possui agora três estados terminais:

### 1. CONFIRMAÇÃO (Sucesso Científico)
A IEA-0 apresenta erro de previsão decrescente ao longo dos ciclos, redução do Regret, sobrevive ao Teste de Transferência com ganho positivo sobre a Instância "Zerada", e mantém coerência contrafactual no Ledger, tudo provado com significância estatística pré-determinada.

### 2. REFUTAÇÃO
A IEA-0 não performa melhor do que as ablações (ex: IEA_NoPriorUpdate ou Baseline Estatística) com significância, indicando que a camada orquestrada não adiciona inteligência econômica real e o LLM sofre de deriva ou *overfitting* de contexto. 

### 3. EVIDÊNCIA INCONCLUSIVA
O modelo oscila aleatoriamente. O Erro de Previsão ou o Lucro caem e sobem sem correlação com as atualizações de *Priors*. O tamanho do efeito (Effect Size) é inferior ao MDE (Minimum Detectable Effect) definido, impossibilitando a rejeição da Hipótese Nula. Não se força uma narrativa de sucesso; a arquitetura volta para a prancheta.
# RELATÓRIO DO PILOTO EXPERIMENTAL IEA-0
*Auditoria de Causalidade e Teste Cognitivo Real*

## F. PILOTO 5x POR CONFIGURAÇÃO
**Status:** ⛔ BLOQUEADO.
**Motivo Estatístico/Metodológico:** A instrução científica número 4 determina: *"Se a GEMINI_API_KEY não estiver disponível, NÃO apresente o simulador como evidência cognitiva."*
Durante a inicialização estrutural da matriz (iea_full, ablation_no_prior, etc.), o Orquestrador Python (`pilot_runner.py`) não localizou as credenciais de modelo fundacional no ambiente local do usuário.
Como o simulador foi expressamente classificado apenas como *teste de integração mecânica*, a execução dos 5 Runs para produção de dados cognitivos foi cientificamente vetada pelo sistema.

## G. RELATÓRIO COMPARATIVO (Métricas)
**Tabela de Baselines:** Ausente (Overfitting evitado).
Sem o LLM real instanciado, qualquer tabela gerada seria um reflexo do *bias* estocástico do script (o simulador produzindo JSONs aleatórios). Para preservar a pureza metodológica exigida na seção 10 (Critérios de Aprovação para N=64), os cálculos de Receita, Custo, Regret, e Economic Adaptation Gain (EAG) permanecem virgens até o LLM original ser plugado.

## H. EXEMPLO DE TRACE CAUSAL (O Teste de Mecanismo)
Apesar da falta do LLM real, o motor Python foi codificado com o novo `Hypothesis Normalizer`. O script provou que o sistema de *hash* funciona perfeitamente para agrupar teses baseadas em atributos sem fixar taxonomia rígida.

**O Contrato do Normalizer validado no código:**
```json
// O que o LLM vai gerar de forma solta:
{"target": "varejistas", "mechanism": "bot_whatsapp", "expected_revenue": 100}

// O que o Normalizer cria estruturalmente para o Motor Bayesiano:
{"class_id": "varejistas|bot_whatsapp"}
```
Desta forma, se o LLM sugerir variações como "vender assistentes de whatsapp para padarias", a similaridade atômica alimentará a mesma árvore matemática do *Prior*, sem vazar respostas no prompt.

## I. DECISÃO OBJETIVA FINAL

**[ NÃO PRONTO PARA N=64 ]**

### Justificativa de Bloqueio (Critérios Não Atendidos):
Conforme as regras do Protocolo Estatístico Final:
1. **O LLM real precisa estar operante.** Não podemos avançar para sessões estatísticas de 64 rodadas sem a comunicação de rede aberta para a *Generative Language API*.
2. A Baseline `baseline_llm_static` (Testando apenas LLM + Memória Trivial) foi implementada no código Python, mas não possui *tokens* reais para validar a diferença causal contra a `iea_full`.

### Condição para Destravamento:
Para autorizar os ciclos do Piloto (e posteriormente os N=64), o ambiente de execução local necessita que a chave do modelo fundacional (`GEMINI_API_KEY` ou credenciais equivalentes de rede) seja inserida no ambiente (variáveis do sistema Windows) e que o script de orquestração tenha permissão irrestrita para faturar tokens durante as inferências iterativas.
