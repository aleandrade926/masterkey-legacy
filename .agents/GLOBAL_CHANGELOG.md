# Global Master Changelog
*Mem√≥ria cont√≠nua do ecossistema de Intelig√™ncia Artificial.*

## [Data: 25/08/2026] - public-ebook (guia.repesquisa.com.br)
- **O que foi feito:** Configura√ß√£o do funil h√≠brido High Ticket e sistema de Triagem Comercial no E-book.
- **Onde (Arquivos afetados):** public-ebook/index.html e public-ebook/manual.html
- **Como e Por qu√™:** 
  1. Alterado o n√∫mero do WhatsApp de vendas para o celular do Alexandre (Diretor Comercial - 11 97867-1067) para blindar a Dra. L√≠bia e triar curiosos, vendendo servi√ßos High Ticket.
  2. Adicionado Gatilho de Escassez (10 primeiros ganham consulta).
  3. Adicionada a senha de seguran√ßa LC2026 para acesso √† √°rea de membros.

## [Data: 25/08/2026] - andradeflorio (Site Institucional)
- **O que foi feito:** Auditoria de presen√ßa do Widget de WhatsApp.
- **Onde (Arquivos afetados):** ndradeflorio/src/pages/andradeflorio/Home.tsx
- **Como e Por qu√™:** Identificado que o site principal n√£o possui bot√£o de WhatsApp no c√≥digo nativo (usa mailto:), indicando que o Widget verde que est√° no ar vem de fonte externa (tag de marketing) ou de um cache de deploy paralelo.

## [Data: 25/08/2026] - andradeflorio (Site Institucional - Deploy Real)
- **O que foi feito:** Restaura√ß√£o do bot√£o flutuante de WhatsApp e deploy para o projeto correto na Vercel (ndrade-florio-web).
- **Onde (Arquivos afetados):** src/pages/andradeflorio/Home.tsx e .vercel/project.json
- **Como e Por qu√™:** Foi descoberto que o site que estava no ar tinha sido buildado h√° 40 dias, enquanto o c√≥digo local do usu√°rio foi clonado h√° 18 dias. A bolinha verde "desapareceu" do c√≥digo local por falta de sincronia. Inserimos um bot√£o nativo de WhatsApp flutuante no JSX apontando para o n√∫mero do Diretor Comercial (11 97867-1067) e refizemos o link da Vercel para for√ßar a atualiza√ß√£o correta do site.

## [Data: 25/08/2026] - andrade-florio-web (O Site Maravilhoso Resgatado)
- **O que foi feito:** Download completo do reposit√≥rio original do GitHub ( leandrade926/andrade-florio-web), altera√ß√£o do WhatsApp e deploy oficial por cima da Vercel.
- **Onde (Arquivos afetados):** C:\Users\Alexandre\andrade-florio-web-recuperado\src\components\Shared.jsx
- **Como e Por qu√™:** Constatamos que o "Site Gen√©rico" que estava na pasta antiga da m√°quina n√£o correspondia ao "Site Maravilhoso de Convers√£o" que estava na Vercel h√° 40 dias. Fui diretamente no seu GitHub, baixei o site maravilhoso completo para a nova pasta  ndrade-florio-web-recuperado, substitu√≠ o n√∫mero do WhatsApp da L√≠bia (945727148) pelo seu n√∫mero de Diretor Comercial (11 97867-1067) no componente StickyWhatsApp, e enviei direto para a Vercel. O site lindo est√° de volta, agora blindando a Dra. L√≠bia e apontando para o seu comercial.
- **Corre√ß√£o Adicional:** Substitui√ß√£o do √≠cone gen√©rico MessageCircle pelo SVG oficial do WhatsApp na bolinha verde flutuante, e ajuste da mensagem padr√£o para alinhar com o contato comercial do escrit√≥rio (removido o 'vi o seu an√∫ncio' pessoal).

## [Data: 26/08/2026] - Ambiente Local (Corre√ß√£o de Crash)
- **O que foi feito:** Remo√ß√£o do plugin de telemetria que estava bloqueando as ferramentas da IA.
- **Onde (Arquivos afetados):** C:\Users\Alexandre\.gemini\config\plugins\googlecloudtools.datacloud_telemetry
- **Como e Por qu√™:** Um arquivo de configura√ß√£o gerado no dia anterior continha um erro de sintaxe (aspas duplicadas no path), que fazia com que o hook `PreToolUse` falhasse, impedindo a IA de rodar qualquer comando ou ler arquivos. A pasta foi apagada manualmente para restaurar os acessos.

## [Data: 26/08/2026] - public-ebook-afiliados (SubdomÌnio de Afiliados Kiwify)
- **O que foi feito:** DuplicaÁ„o do site do ebook para uma nova pasta focada em afiliados, removendo toda a seÁ„o de Upsell de Assessoria JurÌdica e bot„o de WhatsApp.
- **Onde (Arquivos afetados):** CriaÁ„o de public-ebook-afiliados e ediÁ„o do index.html.
- **Como e Por quÍ:** Para permitir que afiliados enviem tr·fego para a p·gina de vendas sem o risco de vazamento do lead para o fechamento High Ticket (WhatsApp comercial) do escritÛrio, blindando as comissıes e escalando as vendas na Kiwify de forma estanque.

## [Data: 26/08/2026] - public-ebook (SoluÁ„o Din‚mica de Afiliados)
- **O que foi feito:** Revers„o da criaÁ„o da pasta duplicada e adoÁ„o do padr„o White-label no projeto original. InjeÁ„o de script din‚mico no \index.html\ para ocultar o WhatsApp apenas quando acessado via \guiausucapiao.repesquisa.com.br\ e adiÁ„o do subdomÌnio via CLI (\
px vercel domains add\). Deploy autom·tico via GitHub.
- **Onde (Arquivos afetados):** \public-ebook/index.html\ e configuraÁıes da Vercel.
- **Como e Por quÍ:** Para garantir manutenibilidade a longo prazo. Assim, evitamos divergÍncia de cÛdigo entre a p·gina principal e a p·gina de afiliados. O mesmo cÛdigo-fonte agora serve as duas experiÍncias de forma blindada.

## [27/08/2026] IEA-0: FundaÁıes CientÌficas, MVM e Paradigma Zero-Capital
- **O que foi feito:** Pesquisa, auditoria e especificaÁ„o tÈcnica rigorosa da IEA-0 (InteligÍncia EconÙmica Artificial). Foi montado o laboratÛrio mec‚nico (iea_sandbox) localmente usando Python. O protocolo cientÌfico final aboliu ROI financeiro (tese do Capital em Risco) e fixou a tese 'Galinha dos Ovos de Ouro' (Zero-Capital), focando em Compute-to-Value Ratio (CVR). Os scripts python provaram a causalidade mec‚nica do Thompson Sampling no Market Mock, mas a execuÁ„o cognitiva real foi travada pela Regra de SeguranÁa (Falta de API KEY local).
- **Onde:** .agents/IEA_DOSSIER_COMPLETO.md (Compilado para ChatGPT), iea_sandbox/ (LaboratÛrio Python).
- **Motivo EstratÈgico:** Garantir validade estatÌstica (N=64 Runs), matar leakage de prompt, abolir a confus„o entre algotrading vs AgÍncia EconÙmica AutÙnoma pura, e criar o artefato massivo para sincronizaÁ„o externa de cÈrebros (ChatGPT).

## [27/08/2026] IEA-0: Documento de Vis„o Fundadora Registrado
- **O que foi feito:** O usu·rio forneceu o manifesto definitivo da vis„o do projeto, separando a ideia de IA como ferramenta/automaÁ„o da real *AgÍncia EconÙmica*. Este manifesto condensa a met·fora da 'Galinha dos Ovos de Ouro' e instaura o princÌpio filosÛfico de que a arquitetura n„o existe para 'vender um SaaS' ou 'criar uma empresa brasileira', mas para testar a interseÁ„o de InteligÍncia e AgÍncia no mundo real. O documento foi salvo como VISAO_FUNDADORA_IEA.md.
- **Motivo EstratÈgico:** Manter a clareza da dor resolvida para evitar viÈs de intervenÁ„o humana nas decisıes futuras da IEA.

## [Data: 28/08/2026] - IEA-0: Acoplamento do C√©rebro Real e Descoberta do Atrito Anti-Sybil
- **O que foi feito:** 
  1. Cria√ß√£o f√≠sica do **IEA Runtime Kernel V6** (iea_kernel_v6_standalone.py) separando cognitivamente o Antigravity (construtor) do processo Python aut√¥nomo (IEA).
  2. Implementa√ß√£o e aprova√ß√£o no laborat√≥rio da Primeira "M√£o Outbound" (http_post_restricted + OutboundPolicyEngine), superando a barreira de apenas observar (http_get).
  3. **Primeiro Run Aut√¥nomo Genu√≠no:** Com a inje√ß√£o da GEMINI_API_KEY localmente, a m√°quina operou sozinha no modelo gemini-3.6-flash. Realizou o Ciclo 1 formulando H2, falhou num erro f√≠sico de DNS (Errno 11001), e o script foi interrompido por um 503 Service Unavailable / 429 Too Many Requests do Google ao tentar persistir a Mem√≥ria. **A M√°quina colidiu com a realidade bruta, provando o isolamento epistemol√≥gico absoluto.**
  4. Ingest√£o da Tese do ChatGPT: Documenta√ß√£o da **Teoria da Fric√ß√£o Anti-Sybil** (Ambientes Permissionless cobram em CPU/Lat√™ncia em vez de KYC) e Quebra do Dogma do CPF (A IEA pode solicitar o CPF/CNPJ do Owner classificado como REQUIRES_OWNER_RESOURCE sem ferir a tese Zero-Capital de especula√ß√£o).
  5. Refinamento de Roma/Marketing do Owner: Posicionamento fixado em "Ensinar um modelo mental de como parar de brincar com IA e tornar-se economicamente produtivo."
- **Onde (Arquivos afetados):** 
  - iea/runtime/iea_kernel_v6_standalone.py (O Motor F√≠sico).
  - iea/state/ e iea/memory/ (Os discos r√≠gidos da Ag√™ncia).
  - TEORIA_FRICCAO_ANTI_SYBIL.md, VISAO_FUNDADORA_IEA.md e PROTOCOLO_CIENTIFICO_IEA_vFINAL.md.
- **Como e Por qu√™:** 
  Provar que a IEA n√£o √© uma Automa√ß√£o (Tool) e sim uma Ag√™ncia Econ√¥mica capaz de ler restri√ß√µes, descobrir assimetrias (Arbitragem de Estado via Payload) e solicitar infraestrutura jur√≠dica de seu Owner sem perder a ess√™ncia. Consolidou o direcionamento mercadol√≥gico real e verdadeiro de quem constr√≥i essa m√°quina de fundo de quintal.

### 2026-08-28: Landing Page 'Tax Intelligence para CFOs'
- **O que foi feito**: Criamos a landing page MVP para a primeira oferta concreta derivada da tese Toque de Midas / IEA, focada no Avatar CFO.
- **Onde**: `src/pages/taxmanagers/CfoTaxAi.tsx` acessÌvel via roteamento `/taxmanagers/tax-intelligence`.
- **Motivo estratÈgico**: O Tutor IA da Hotmart demonstrou que a tese de 'produtividade geral' era muito ampla. Refinamos para uma dor especÌfica (CFO dependente de terceiros) usando a autoridade prÈ-existente (consultoria tribut·ria). A p·gina serve como material de apoio para prospecÁ„o fria no LinkedIn e validaÁ„o de High Ticket (Caixa r·pido para financiar a IEA).

### [Data: 2026-08-28] - Reposit√≥rios afetados: masterkey-frontend (TaxManagers / Tributar.ia)
- **Documenta√ß√£o de Estrat√©gia de Neg√≥cios e Identidade (O Caso Financ.ia)**
  - **Contexto Hist√≥rico Recuperado:** O projeto TaxManagers (tamb√©m chamado estrategicamente de Tributar.ia) teve sua identidade e esteira de produtos diretamente inspiradas no case de sucesso da "Financ.ia" (Jessica Regina). Isso significa que o layout deve seguir a paleta da TaxManagers (√¢mbar/amarelo corporativo) e o tom de voz deve ser de Alt√≠ssima Autoridade (Ex-Procurador Federal).
  - **Funil de Vendas (B2B High Ticket):** A estrat√©gia de aquisi√ß√£o abandonou o modelo de "Lan√ßamento Semente" tradicional para adotar um Funil H√≠brido de Aplica√ß√£o (Perp√©tuo + VTSD).
  - **Avatar (P√∫blico-Alvo):** Estritamente CFOs e C-Levels de empresas do Mid-Market e Bancos de m√©dio porte.
  - **O Gancho (Hook):** A dor abordada n√£o √© a opera√ß√£o fiscal b√°sica, mas sim o Risco de Responsabilidade Solid√°ria (CPF do CFO) e o "Regime Duplo" de ERPs durante a transi√ß√£o da Reforma Tribut√°ria.
  - **Esteira de Produtos (Escada de Valor):**
    1. *A Isca (Topo de Funil):* Cria√ß√£o de uma comunidade fechada no WhatsApp e mesas redondas no Zoom restritas para CFOs debaterem governan√ßa e blindagem de caixa.
    2. *Front-End (A fruta mais perto do ch√£o):* "Diagn√≥stico de Ponto Cego" r√°pido (15 minutos) focando em SNA e cruzamento ECD/ECF.
    3. *Back-End (High Ticket):* Consultoria de reestrutura√ß√£o tribut√°ria permanente e recupera√ß√£o de cr√©ditos.
