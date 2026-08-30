# Global Master Changelog
*Memória contínua do ecossistema de Inteligência Artificial.*

## [Data: 25/08/2026] - public-ebook (guia.repesquisa.com.br)
- **O que foi feito:** Configuração do funil híbrido High Ticket e sistema de Triagem Comercial no E-book.
- **Onde (Arquivos afetados):** public-ebook/index.html e public-ebook/manual.html
- **Como e Por quê:** 
  1. Alterado o número do WhatsApp de vendas para o celular do Alexandre (Diretor Comercial - 11 97867-1067) para blindar a Dra. Líbia e triar curiosos, vendendo serviços High Ticket.
  2. Adicionado Gatilho de Escassez (10 primeiros ganham consulta).
  3. Adicionada a senha de segurança LC2026 para acesso à área de membros.

## [Data: 25/08/2026] - andradeflorio (Site Institucional)
- **O que foi feito:** Auditoria de presença do Widget de WhatsApp.
- **Onde (Arquivos afetados):** ndradeflorio/src/pages/andradeflorio/Home.tsx
- **Como e Por quê:** Identificado que o site principal não possui botão de WhatsApp no código nativo (usa mailto:), indicando que o Widget verde que está no ar vem de fonte externa (tag de marketing) ou de um cache de deploy paralelo.

## [Data: 25/08/2026] - andradeflorio (Site Institucional - Deploy Real)
- **O que foi feito:** Restauração do botão flutuante de WhatsApp e deploy para o projeto correto na Vercel (ndrade-florio-web).
- **Onde (Arquivos afetados):** src/pages/andradeflorio/Home.tsx e .vercel/project.json
- **Como e Por quê:** Foi descoberto que o site que estava no ar tinha sido buildado há 40 dias, enquanto o código local do usuário foi clonado há 18 dias. A bolinha verde "desapareceu" do código local por falta de sincronia. Inserimos um botão nativo de WhatsApp flutuante no JSX apontando para o número do Diretor Comercial (11 97867-1067) e refizemos o link da Vercel para forçar a atualização correta do site.

## [Data: 25/08/2026] - andrade-florio-web (O Site Maravilhoso Resgatado)
- **O que foi feito:** Download completo do repositório original do GitHub ( leandrade926/andrade-florio-web), alteração do WhatsApp e deploy oficial por cima da Vercel.
- **Onde (Arquivos afetados):** C:\Users\Alexandre\andrade-florio-web-recuperado\src\components\Shared.jsx
- **Como e Por quê:** Constatamos que o "Site Genérico" que estava na pasta antiga da máquina não correspondia ao "Site Maravilhoso de Conversão" que estava na Vercel há 40 dias. Fui diretamente no seu GitHub, baixei o site maravilhoso completo para a nova pasta  ndrade-florio-web-recuperado, substituí o número do WhatsApp da Líbia (945727148) pelo seu número de Diretor Comercial (11 97867-1067) no componente StickyWhatsApp, e enviei direto para a Vercel. O site lindo está de volta, agora blindando a Dra. Líbia e apontando para o seu comercial.
- **Correção Adicional:** Substituição do ícone genérico MessageCircle pelo SVG oficial do WhatsApp na bolinha verde flutuante, e ajuste da mensagem padrão para alinhar com o contato comercial do escritório (removido o 'vi o seu anúncio' pessoal).

## [Data: 26/08/2026] - Ambiente Local (Correção de Crash)
- **O que foi feito:** Remoção do plugin de telemetria que estava bloqueando as ferramentas da IA.
- **Onde (Arquivos afetados):** C:\Users\Alexandre\.gemini\config\plugins\googlecloudtools.datacloud_telemetry
- **Como e Por quê:** Um arquivo de configuração gerado no dia anterior continha um erro de sintaxe (aspas duplicadas no path), que fazia com que o hook `PreToolUse` falhasse, impedindo a IA de rodar qualquer comando ou ler arquivos. A pasta foi apagada manualmente para restaurar os acessos.

## [Data: 26/08/2026] - public-ebook-afiliados (Subdom�nio de Afiliados Kiwify)
- **O que foi feito:** Duplica��o do site do ebook para uma nova pasta focada em afiliados, removendo toda a se��o de Upsell de Assessoria Jur�dica e bot�o de WhatsApp.
- **Onde (Arquivos afetados):** Cria��o de public-ebook-afiliados e edi��o do index.html.
- **Como e Por qu�:** Para permitir que afiliados enviem tr�fego para a p�gina de vendas sem o risco de vazamento do lead para o fechamento High Ticket (WhatsApp comercial) do escrit�rio, blindando as comiss�es e escalando as vendas na Kiwify de forma estanque.

## [Data: 26/08/2026] - public-ebook (Solu��o Din�mica de Afiliados)
- **O que foi feito:** Revers�o da cria��o da pasta duplicada e ado��o do padr�o White-label no projeto original. Inje��o de script din�mico no \index.html\ para ocultar o WhatsApp apenas quando acessado via \guiausucapiao.repesquisa.com.br\ e adi��o do subdom�nio via CLI (\
px vercel domains add\). Deploy autom�tico via GitHub.
- **Onde (Arquivos afetados):** \public-ebook/index.html\ e configura��es da Vercel.
- **Como e Por qu�:** Para garantir manutenibilidade a longo prazo. Assim, evitamos diverg�ncia de c�digo entre a p�gina principal e a p�gina de afiliados. O mesmo c�digo-fonte agora serve as duas experi�ncias de forma blindada.

## [27/08/2026] IEA-0: Funda��es Cient�ficas, MVM e Paradigma Zero-Capital
- **O que foi feito:** Pesquisa, auditoria e especifica��o t�cnica rigorosa da IEA-0 (Intelig�ncia Econ�mica Artificial). Foi montado o laborat�rio mec�nico (iea_sandbox) localmente usando Python. O protocolo cient�fico final aboliu ROI financeiro (tese do Capital em Risco) e fixou a tese 'Galinha dos Ovos de Ouro' (Zero-Capital), focando em Compute-to-Value Ratio (CVR). Os scripts python provaram a causalidade mec�nica do Thompson Sampling no Market Mock, mas a execu��o cognitiva real foi travada pela Regra de Seguran�a (Falta de API KEY local).
- **Onde:** .agents/IEA_DOSSIER_COMPLETO.md (Compilado para ChatGPT), iea_sandbox/ (Laborat�rio Python).
- **Motivo Estrat�gico:** Garantir validade estat�stica (N=64 Runs), matar leakage de prompt, abolir a confus�o entre algotrading vs Ag�ncia Econ�mica Aut�noma pura, e criar o artefato massivo para sincroniza��o externa de c�rebros (ChatGPT).

## [27/08/2026] IEA-0: Documento de Vis�o Fundadora Registrado
- **O que foi feito:** O usu�rio forneceu o manifesto definitivo da vis�o do projeto, separando a ideia de IA como ferramenta/automa��o da real *Ag�ncia Econ�mica*. Este manifesto condensa a met�fora da 'Galinha dos Ovos de Ouro' e instaura o princ�pio filos�fico de que a arquitetura n�o existe para 'vender um SaaS' ou 'criar uma empresa brasileira', mas para testar a interse��o de Intelig�ncia e Ag�ncia no mundo real. O documento foi salvo como VISAO_FUNDADORA_IEA.md.
- **Motivo Estrat�gico:** Manter a clareza da dor resolvida para evitar vi�s de interven��o humana nas decis�es futuras da IEA.

## [Data: 28/08/2026] - IEA-0: Acoplamento do Cérebro Real e Descoberta do Atrito Anti-Sybil
- **O que foi feito:** 
  1. Criação física do **IEA Runtime Kernel V6** (iea_kernel_v6_standalone.py) separando cognitivamente o Antigravity (construtor) do processo Python autônomo (IEA).
  2. Implementação e aprovação no laboratório da Primeira "Mão Outbound" (http_post_restricted + OutboundPolicyEngine), superando a barreira de apenas observar (http_get).
  3. **Primeiro Run Autônomo Genuíno:** Com a injeção da GEMINI_API_KEY localmente, a máquina operou sozinha no modelo gemini-3.6-flash. Realizou o Ciclo 1 formulando H2, falhou num erro físico de DNS (Errno 11001), e o script foi interrompido por um 503 Service Unavailable / 429 Too Many Requests do Google ao tentar persistir a Memória. **A Máquina colidiu com a realidade bruta, provando o isolamento epistemológico absoluto.**
  4. Ingestão da Tese do ChatGPT: Documentação da **Teoria da Fricção Anti-Sybil** (Ambientes Permissionless cobram em CPU/Latência em vez de KYC) e Quebra do Dogma do CPF (A IEA pode solicitar o CPF/CNPJ do Owner classificado como REQUIRES_OWNER_RESOURCE sem ferir a tese Zero-Capital de especulação).
  5. Refinamento de Roma/Marketing do Owner: Posicionamento fixado em "Ensinar um modelo mental de como parar de brincar com IA e tornar-se economicamente produtivo."
- **Onde (Arquivos afetados):** 
  - iea/runtime/iea_kernel_v6_standalone.py (O Motor Físico).
  - iea/state/ e iea/memory/ (Os discos rígidos da Agência).
  - TEORIA_FRICCAO_ANTI_SYBIL.md, VISAO_FUNDADORA_IEA.md e PROTOCOLO_CIENTIFICO_IEA_vFINAL.md.
- **Como e Por quê:** 
  Provar que a IEA não é uma Automação (Tool) e sim uma Agência Econômica capaz de ler restrições, descobrir assimetrias (Arbitragem de Estado via Payload) e solicitar infraestrutura jurídica de seu Owner sem perder a essência. Consolidou o direcionamento mercadológico real e verdadeiro de quem constrói essa máquina de fundo de quintal.

### 2026-08-28: Landing Page 'Tax Intelligence para CFOs'
- **O que foi feito**: Criamos a landing page MVP para a primeira oferta concreta derivada da tese Toque de Midas / IEA, focada no Avatar CFO.
- **Onde**: `src/pages/taxmanagers/CfoTaxAi.tsx` acess�vel via roteamento `/taxmanagers/tax-intelligence`.
- **Motivo estrat�gico**: O Tutor IA da Hotmart demonstrou que a tese de 'produtividade geral' era muito ampla. Refinamos para uma dor espec�fica (CFO dependente de terceiros) usando a autoridade pr�-existente (consultoria tribut�ria). A p�gina serve como material de apoio para prospec��o fria no LinkedIn e valida��o de High Ticket (Caixa r�pido para financiar a IEA).

### [Data: 2026-08-28] - Repositórios afetados: masterkey-frontend (TaxManagers / Tributar.ia)
- **Documentação de Estratégia de Negócios e Identidade (O Caso Financ.ia)**
  - **Contexto Histórico Recuperado:** O projeto TaxManagers (também chamado estrategicamente de Tributar.ia) teve sua identidade e esteira de produtos diretamente inspiradas no case de sucesso da "Financ.ia" (Jessica Regina). Isso significa que o layout deve seguir a paleta da TaxManagers (âmbar/amarelo corporativo) e o tom de voz deve ser de Altíssima Autoridade (Ex-Procurador Federal).
  - **Funil de Vendas (B2B High Ticket):** A estratégia de aquisição abandonou o modelo de "Lançamento Semente" tradicional para adotar um Funil Híbrido de Aplicação (Perpétuo + VTSD).
  - **Avatar (Público-Alvo):** Estritamente CFOs e C-Levels de empresas do Mid-Market e Bancos de médio porte.
  - **O Gancho (Hook):** A dor abordada não é a operação fiscal básica, mas sim o Risco de Responsabilidade Solidária (CPF do CFO) e o "Regime Duplo" de ERPs durante a transição da Reforma Tributária.
  - **Esteira de Produtos (Escada de Valor):**
    1. *A Isca (Topo de Funil):* Criação de uma comunidade fechada no WhatsApp e mesas redondas no Zoom restritas para CFOs debaterem governança e blindagem de caixa.
    2. *Front-End (A fruta mais perto do chão):* "Diagnóstico de Ponto Cego" rápido (15 minutos) focando em SNA e cruzamento ECD/ECF.
    3. *Back-End (High Ticket):* Consultoria de reestruturação tributária permanente e recuperação de créditos.

### [Data: 2026-08-28] - Correção da "Salada" TaxManagers
- **Mapeamento de Repositórios:** Identificada e oficializada a separação física do ecossistema TaxManagers. 
  - As Landing Pages institucionais/comerciais estão isoladas na pasta 	axmanagers-site (respondendo pelo domínio raiz 	axmanagers.com.br).
  - O sistema SaaS/Dashboard continua na pasta masterkey-frontend, mas agora respondendo EXCLUSIVAMENTE sob o subdomínio pp.taxmanagers.com.br (ex: pp.taxmanagers.com.br/taxcfointelligence).
  - Isso garante que deploys de marketing não afetem a estabilidade do sistema. Arquivo TOPOLOGY.md atualizado com esta regra arquitetural.

### [Data: 2026-08-28] - Reposit�rios afetados: taxmanagers-site
- **Refatora��o da Landing Page CFO (Tributar.ia)**
  - **Contexto:** A p�gina estava parecendo consultoria gen�rica e afastava o p�blico C-Level. O usu�rio forneceu as diretrizes precisas da oferta baseadas em modelo B2B High Ticket.
  - **A��o:** A p�gina CfoTaxAi.tsx foi integralmente reescrita para focar exclusivamente na transforma��o do CFO em tomador de decis�o com rela��o � Reforma Tribut�ria (EBITDA, caixa, governan�a).
  - **Identidade Visual:** Altera��o para adotar paleta verde (logo-green.jpg e esmeralda) para adequa��o visual. 
  - **Estrutura:** Dividida claramente entre Oferta Normal (Jornada) e Oferta Piloto (Turma Fundadora de 3 a 5 CFOs). Depend�ncias do Shadcn UI foram removidas para usar Tailwind puro, permitindo compila��o no Vercel.
  - **Deploy:** Enviado para a Vercel, refletindo em 	axmanagers.com.br/taxcfointelligence.

### 28/08/2026 - Pivot B2B para Consultoria High Ticket (FHT)
*   **O que foi feito:** O site 	axmanagers.com.br foi completamente reestruturado pela terceira vez hoje. Abandonamos a ideia de "Turma-Piloto em Grupo" e "Quóruns mínimos". A oferta pivotou para **Jornada de Implementação Individual (1:1)** baseada na metodologia *Formula High Ticket*.
*   **Motivo:** Instrução direta da IA Tutora para acelerar fechamento de caixa sem depender de formação de turmas. O foco passa a ser prospecção orgânica via LinkedIn para uma solução de alto ticket (Diagnóstico, Plano de Ação e Sessões Práticas).
*   **Onde:** C:\Users\Alexandre\taxmanagers-site\src\CfoTaxAi.tsx
*   **Skill criada:** Aprendemos a metodologia inteira e a salvamos em .agents\skills\formula-high-ticket\SKILL.md para usos futuros em mentorias.


### 29/08/2026 - Pivot da Landing Page Principal (TaxManagers.com.br)
*   **O que foi feito:** A seo de "Consultorias Parceiras" (oferta de retaguarda fiscal) foi removida da pgina principal App.tsx, para focar exclusivamente na "Consultoria para Empresas" (servio direto a mdias e grandes empresas), alinhando a comunicao com a nova estratgia B2B focada em CFOs.
*   **Cpia de Segurana do App.tsx original (com a oferta de consultoria parceira):**
<details>
<summary>Cdigo original de App.tsx</summary>

`	sx
import React, { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { 
  ShieldCheck, BarChart3, FileSearch, Briefcase, Layers, 
  CheckCircle2, Activity, Database, Network, 
  UploadCloud, Lock, ShieldAlert, Users, Check,
  EyeOff, HardDrive, FileText, Scale
} from "lucide-react";

export default function TaxManagers() {
  const [showLgpdBanner, setShowLgpdBanner] = useState(false);

  // Drag & Drop / Form State
  const [isDragging, setIsDragging] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [processingState, setProcessingState] = useState<"idle" | "form" | "processing" | "done">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const [leadForm, setLeadForm] = useState({
    name: "", email: "", whatsapp: "", company: "", 
    interestType: "Empresa", fileType: "SPED Fiscal", description: "",
    acceptedTerms: false
  });

  useEffect(() => {
    const accepted = localStorage.getItem("taxmanagers_lgpd_accepted");
    if (!accepted) {
      const timer = setTimeout(() => setShowLgpdBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles(e.dataTransfer.files);
      setShowUploadModal(true);
      setProcessingState("form");
    }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      setShowUploadModal(true);
      setProcessingState("form");
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.acceptedTerms) return alert("VocÃª precisa aceitar os termos de confidencialidade.");
    if (!selectedFiles || selectedFiles.length === 0) return alert("Por favor, selecione um arquivo.");
    
    setProcessingState("processing");
    setUploadProgress(0);

    try {
      await supabase.from("taxmanagers_leads").insert([{ 
        name: leadForm.name, email: leadForm.email, phone: leadForm.whatsapp, cnpj: leadForm.company 
      }]);
    } catch (err) { console.error(err); }

    const vpsUrl = import.meta.env.VITE_VPS_UPLOAD_URL || "https://pros-friendship-static-paperbacks.trycloudflare.com/upload/";
    const file = selectedFiles[0];

    try {
      const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB por chunk
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      const uploadId = `${Date.now()}_${Math.random().toString(36).slice(2)}`;

      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const blob = file.slice(start, end);

        const chunkB64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        const payload = JSON.stringify({
          upload_id: uploadId,
          chunk_index: i,
          total_chunks: totalChunks,
          filename: file.name,
          email: leadForm.email,
          company: leadForm.company,
          chunk_b64: chunkB64
        });

        // Retry automÃ¡tico: atÃ© 3 tentativas por chunk
        let success = false;
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            const response = await fetch(vpsUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: payload
            });
            if (response.ok) { success = true; break; }
            console.warn(`Chunk ${i} tentativa ${attempt + 1} falhou: ${response.status}`);
          } catch (fetchErr) {
            console.warn(`Chunk ${i} tentativa ${attempt + 1} erro de rede:`, fetchErr);
            await new Promise(r => setTimeout(r, 1500)); // Aguarda 1.5s antes de tentar novamente
          }
        }

        if (!success) throw new Error(`Falha ao enviar chunk ${i} apÃ³s 3 tentativas`);

        setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));
      }

      setProcessingState("done");
    } catch (err) {
      console.error("Erro no upload:", err);
      alert("Erro na conexÃ£o com a VPS. O tÃºnel ou servidor pode estar inativo. Modo simulaÃ§Ã£o ativado.");
      setProcessingState("done");
    }
  };

  const handleAcceptLgpd = () => {
    localStorage.setItem("taxmanagers_lgpd_accepted", "true");
    setShowLgpdBanner(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-900 selection:text-amber-900">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <img src="/logo-green.jpg" className="h-10 w-10 object-contain rounded-lg shadow-sm border border-emerald-900/20" alt="Tax Managers Logo" />
            <span className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors">Tax Managers</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#solucoes" className="hover:text-amber-600 transition-colors">SoluÃ§Ãµes</a>
            <a href="#tecnologia" className="hover:text-amber-600 transition-colors">Tecnologia</a>
            <a href="#metodo" className="hover:text-amber-600 transition-colors">MÃ©todo</a>
            <a href="#precos" className="hover:text-amber-600 transition-colors">Planos</a>
            <a 
              href="https://www.linkedin.com/company/tax-managers" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-amber-600 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <button onClick={() => {setShowUploadModal(true); setProcessingState("form");}} className="px-5 py-2.5 rounded-full bg-amber-500 text-slate-900 font-bold border-amber-500 hover:bg-amber-400 transition-all">
              AnÃ¡lise Inicial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#424242]">
        <div className="relative max-w-5xl mx-auto px-6 z-10 text-left">
          <div className="text-amber-500 text-xs md:text-sm font-bold uppercase tracking-widest mb-6">
            REVISÃƒO FISCAL <span className="mx-2 text-amber-500/50">â€¢</span> RECUPERAÃ‡ÃƒO DE CRÃ‰DITOS <span className="mx-2 text-amber-500/50">â€¢</span> DOSSIÃŠ TÃ‰CNICO
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
            InteligÃªncia fiscal com IA para <br className="hidden md:block" /><span className="text-amber-500">empresas e consultorias tributÃ¡rias.</span>
          </h1>
          
          <div className="w-20 h-1.5 bg-amber-500 mb-8 rounded-full"></div>
          
          <p className="text-base md:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl">
            A TaxManagers analisa arquivos fiscais, obrigaÃ§Ãµes acessÃ³rias e documentos tributÃ¡rios para identificar crÃ©ditos, inconsistÃªncias, riscos e oportunidades â€” com revisÃ£o de advogados tributaristas e opÃ§Ã£o de retaguarda tÃ©cnica para consultorias parceiras.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start mb-10">
            <a href="/taxcfointelligence" className="px-8 py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold transition-all shadow-xl flex items-center justify-center text-lg">
              CFO: Blindagem TributÃ¡ria
            </a>
            <button onClick={() => {setShowUploadModal(true); setProcessingState("form");}} className="px-8 py-4 rounded-lg bg-transparent border-2 border-slate-400 hover:border-slate-300 text-white font-bold transition-all text-center flex items-center justify-center text-lg">
              Testar com arquivo real
            </button>
          </div>
          
          <div className="flex flex-wrap items-center justify-start gap-6 text-xs md:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400"/> SeguranÃ§a jurÃ­dica</div>
            <div className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-amber-500"/> Uso restrito dos dados</div>
          </div>
        </div>
      </section>

      {/* Upload Section (Logo depois do Hero) */}
      <section id="upload" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
            <div className="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl">
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border border-slate-200 rounded-xl p-8 text-center transition-all shadow-inner relative overflow-hidden ${
                  isDragging ? "border-amber-600 bg-amber-600/5 scale-[1.02]" : "bg-white hover:border-white/30"
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-amber-500"></div>
                <div className="flex justify-center mb-5 mt-2">
                  <div className="relative">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <Lock className="w-8 h-8" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                      <ShieldCheck className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">AnÃ¡lise de arquivos fiscais</h2>
                <p className="text-slate-600 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
                  Carregue o arquivo para cruzamento e geraÃ§Ã£o de relatÃ³rios corporativos. A validaÃ§Ã£o tÃ©cnica e o mapeamento de oportunidades fiscais ocorrem em ambiente seguro e restrito.
                </p>

                <button type="button" onClick={() => { setShowUploadModal(true); setProcessingState("form"); }} className="cursor-pointer flex flex-col items-center justify-center w-full py-8 rounded-lg bg-slate-100 border border-dashed border-slate-300 hover:border-amber-500/50 hover:bg-slate-200 text-slate-900 transition-all group mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <UploadCloud className="w-6 h-6 text-amber-600 group-hover:-translate-y-1 transition-transform" />
                    <span className="font-semibold text-lg">Arraste arquivos ou Clique aqui</span>
                  </div>
                  <span className="text-xs text-slate-500">SPED, EFD, XML ou ZIP (Ilimitado)</span>
                </button>

                <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-lg p-4 text-center max-w-2xl mx-auto flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Confidencialidade Absoluta â€¢ SeguranÃ§a de Dados</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-tight">
                    Acesso controlado e criptografado. Todas as informaÃ§Ãµes fiscais enviadas sÃ£o protegidas por sigilo profissional corporativo.
                  </p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">2026/2027: a janela de saneamento fiscal comeÃ§ou.</h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Com a transiÃ§Ã£o para CBS e IBS, crÃ©ditos legados, parametrizaÃ§Ãµes fiscais, documentos eletrÃ´nicos e bases de cÃ¡lculo precisam ser revisados antes que inconsistÃªncias virem perda de caixa, glosa ou retrabalho sistÃªmico.
          </p>
        </div>
      </section>

      {/* Pain Section */}
      <section className="py-24 border-y border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">O modelo tradicional ficou no passado.</h2>
              <div className="text-slate-600 mb-6 text-lg leading-relaxed space-y-4">
                <p>
                  O modelo de consultorias convencionais focadas apenas em olhar para o retrovisor ficou no passado. As regras de transiÃ§Ã£o exigem governanÃ§a e velocidade. A atuaÃ§Ã£o da Tax Managers nÃ£o Ã© meramente preventiva, muito menos corretiva.
                </p>
                <p>
                  Adotamos o <strong>modelo preditivo</strong> com apoio de InteligÃªncia Artificial para analisar padrÃµes nos seus SPEDs e notas fiscais, antecipando inconsistÃªncias tributÃ¡rias com a lÃ³gica prÃ³-Fisco.
                </p>
                <p>
                  Processamos grandes volumes de dados para projetar o impacto de IBS/CBS na sua operaÃ§Ã£o â€” alÃ©m de outros tributos â€” para antecipar oportunidades de saneamento e geraÃ§Ã£o de caixa, com impacto direto no EBITDA dos clientes.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "Complexidade na transiÃ§Ã£o para CBS/IBS",
                  "Risco de glosa por crÃ©dito mal documentado",
                  "Perda de crÃ©ditos por parametrizaÃ§Ã£o fiscal incorreta"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <div className="mt-1 bg-red-500/10 p-1 rounded border border-red-500/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 blur-3xl rounded-full"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
                  <h3 className="text-slate-900 font-medium flex items-center gap-2">
                    <Database className="w-5 h-5 text-amber-600" />
                    RelatÃ³rio de Oportunidades 26/27
                  </h3>
                  <span className="text-xs font-mono text-slate-500">MOTOR.AUDITORIA.IA</span>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">AnÃ¡lise de Malha Fiscal</span>
                      <span className="text-amber-600 font-mono">Processando</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-600 to-amber-600 w-3/4 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Cruzamento SPED/EFD</span>
                      <span className="text-yellow-600 font-mono">ConcluÃ­do</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-600 w-full rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="tecnologia" className="py-24 relative overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-slate-100 to-slate-100"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <Network className="w-3 h-3" />
              <span>Poder Computacional</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Tax Analytics: nosso <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">motor interno de inteligÃªncia fiscal</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              O Tax Analytics Ã© o motor interno da TaxManagers para leitura de arquivos fiscais, cruzamento de obrigaÃ§Ãµes acessÃ³rias, identificaÃ§Ã£o de inconsistÃªncias e geraÃ§Ã£o de relatÃ³rios executivos. Ele nÃ£o substitui a consultoria: acelera a anÃ¡lise para que advogados tributaristas validem os achados e transformem dados em decisÃ£o.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-amber-500/30 transition-all group">
              <div className="w-14 h-14 bg-yellow-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Motor In-Memory</h3>
              <p className="text-slate-600 leading-relaxed">
                EsqueÃ§a os softwares lentos do passado. Nossa tecnologia lÃª blocos complexos do SPED e cruza milhÃµes de linhas diretamente na memÃ³ria, entregando resultados em segundos.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-amber-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <ShieldCheck className="w-32 h-32 text-amber-600" />
              </div>
              <div className="w-14 h-14 bg-amber-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                <ShieldCheck className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">SeguranÃ§a Cloud-Native</h3>
              <p className="text-slate-600 leading-relaxed relative z-10">
                Confidencialidade absoluta. Arquitetura blindada com isolamento total (Row Level Security), garantindo que os dados fiscais da sua empresa jamais se misturem.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-amber-500/30 transition-all group">
              <div className="w-14 h-14 bg-orange-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileSearch className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">DossiÃª via GenAI</h3>
              <p className="text-slate-600 leading-relaxed">
                Mais do que planilhas frias: nossa InteligÃªncia Artificial interpreta os cruzamentos e redige automaticamente a fundamentaÃ§Ã£o jurÃ­dica de cada oportunidade encontrada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solucoes" className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Linhas de atuaÃ§Ã£o tÃ©cnica</h2>
            <p className="text-slate-600">AnÃ¡lise fiscal com dados, dossiÃª tÃ©cnico e conformidade legal.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Layers,
                title: "CrÃ©ditos Legados PIS/Cofins",
                desc: "Saneamento e mapeamento de crÃ©ditos nÃ£o apropriados na sistemÃ¡tica nÃ£o cumulativa.",
                color: "from-yellow-500 to-yellow-600"
              },
              {
                icon: ShieldCheck,
                title: "GovernanÃ§a de CrÃ©ditos IBS/CBS",
                desc: "GovernanÃ§a fiscal e modelagem de cenÃ¡rios para a transiÃ§Ã£o do novo regime tributÃ¡rio.",
                color: "from-amber-600 to-amber-500"
              },
              {
                icon: FileSearch,
                title: "Lei do Bem",
                desc: "EstruturaÃ§Ã£o de dossiÃªs tÃ©cnicos para fruiÃ§Ã£o de incentivos Ã  inovaÃ§Ã£o tecnolÃ³gica.",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: Briefcase,
                title: "IRPJ/CSLL",
                desc: "IdentificaÃ§Ã£o de oportunidades e adequaÃ§Ã£o na apuraÃ§Ã£o do lucro real e bases de cÃ¡lculo.",
                color: "from-slate-400 to-slate-500"
              }
            ].map((sol, i) => (
              <div key={i} className="bg-white border border-slate-200 hover:border-slate-200 transition-colors rounded-xl p-6 group">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${sol.color} bg-opacity-10 flex items-center justify-center mb-6`}>
                  <sol.icon className="w-6 h-6 text-slate-900" />
                </div>
                <h3 className="text-slate-900 text-lg font-semibold mb-3">{sol.title}</h3>
                <p className="text-slate-600 text-[15px] md:text-base leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="metodo" className="py-24 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">MÃ©todo Tax Managers</h2>
            <p className="text-slate-600 max-w-xl">Fluxo estruturado para seguranÃ§a jurÃ­dica, minimizando exposiÃ§Ãµes e assegurando fundamentaÃ§Ã£o em cada etapa.</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "01", name: "Mapeamento", desc: "AnÃ¡lise preliminar de viabilidade." },
              { step: "02", name: "RelatÃ³rio", desc: "Mapeamento de oportunidades identificÃ¡veis." },
              { step: "03", name: "ValidaÃ§Ã£o", desc: "AprovaÃ§Ã£o corporativa da empresa." },
              { step: "04", name: "ImplementaÃ§Ã£o", desc: "ExecuÃ§Ã£o tÃ©cnica dos aproveitamentos." },
              { step: "05", name: "DossiÃª", desc: "Entrega documental e acompanhamento." },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 h-full relative z-10">
                  <div className="text-xs font-mono text-amber-500 mb-4">{item.step}</div>
                  <h3 className="text-slate-900 font-medium mb-2">{item.name}</h3>
                  <p className="text-slate-600 text-[14px] md:text-[15px] leading-relaxed">{item.desc}</p>
                </div>
                {i !== 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-[1px] bg-slate-200 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-yellow-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">ExperiÃªncia aplicada desde 2010.</h2>
          <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed">
            A Tax Managers Ã© composta por uma <strong>equipe multidisciplinar sÃªnior</strong> formada por advogados, administradores, engenheiros e profissionais da Ã¡rea de tecnologia. 
            <br/><br/>
            Atuamos em projetos de revisÃ£o fiscal, aproveitamento de crÃ©ditos tributÃ¡rios, oportunidades de IRPJ/CSLL, PIS/Cofins e estruturaÃ§Ã£o de dossiÃªs tÃ©cnicos para empresas de mÃ©dio e grande porte.
          </p>
        </div>
      </section>

      {/* --- INÃCIO DOS NOVOS BLOCOS --- */}

      {/* Retaguarda Fiscal */}
      <section id="parceria" className="py-24 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6">
                <Briefcase className="w-3 h-3" />
                <span>Para Consultorias Parceiras</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Retaguarda fiscal com IA para consultorias
              </h2>
              <p className="text-lg text-slate-700 font-medium mb-6 border-l-2 border-yellow-500 pl-4">
                Entregue anÃ¡lises de conformidade, auditorias e relatÃ³rios fiscais sob a sua marca, sem desenvolver tecnologia prÃ³pria.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Sua consultoria pode ampliar sua capacidade de entrega com uma esteira tÃ©cnica de anÃ¡lise fiscal assistida por IA. A TaxManagers atua nos bastidores, processando arquivos, identificando achados e estruturando relatÃ³rios tÃ©cnicos para que a consultoria parceira mantenha o relacionamento com o cliente final.
              </p>
              
              <p className="text-slate-900 font-bold text-xl mb-8">
                VocÃª mantÃ©m o cliente. NÃ³s entregamos a inteligÃªncia fiscal por trÃ¡s.
              </p>
              
              <a href="#contato" className="inline-flex px-6 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-slate-900 font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                Quero uma retaguarda fiscal com IA
              </a>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Como funciona a parceria:</h3>
              <div className="space-y-6">
                {[
                  { step: "1", text: "A consultoria capta ou mantÃ©m o cliente." },
                  { step: "2", text: "A consultoria envia os arquivos fiscais, contÃ¡beis ou contratuais." },
                  { step: "3", text: "A TaxManagers processa os dados com IA e metodologia fiscal." },
                  { step: "4", text: "Os achados relevantes passam por revisÃ£o tÃ©cnica." },
                  { step: "5", text: "O relatÃ³rio Ã© entregue para uso da consultoria parceira." },
                  { step: "6", text: "A consultoria apresenta o resultado e conduz o relacionamento comercial." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 text-yellow-600 flex items-center justify-center shrink-0 font-bold text-sm">
                      {item.step}
                    </div>
                    <p className="text-slate-700 text-sm pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SeÃ§Ã£o de Valor EstratÃ©gico */}
      <section className="py-24 bg-gradient-to-b from-[#050505] to-[#0d0d11] relative border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            SeguranÃ§a jurÃ­dica e otimizaÃ§Ã£o de caixa com inteligÃªncia fiscal aplicada
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Uma retaguarda tÃ©cnica de alta precisÃ£o baseada em IA para que sua empresa ou consultoria foque nas tomadas de decisÃ£o estratÃ©gica e no relacionamento corporativo.
          </p>
          <div className="inline-flex items-center gap-3 bg-white border border-amber-500/30 rounded-full px-6 py-3 shadow-xl">
            <Briefcase className="w-5 h-5 text-amber-500" />
            <span className="text-slate-800 font-medium">Desenvolvido para diretores, gestores e advogados que buscam <strong>governanÃ§a e eficiÃªncia tributÃ¡ria</strong> sem sobrecarga operacional.</span>
          </div>
        </div>
      </section>

      {/* O Empilhamento (FHT) */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <Layers className="w-3 h-3" />
              <span>O Ecossistema de Entrega</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Da anÃ¡lise fiscal ao plano de aÃ§Ã£o</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              NÃ£o entregamos apenas um software. Entregamos a <strong>soluÃ§Ã£o palpÃ¡vel e pronta</strong> para vocÃª auditar e vender projetos tributÃ¡rios de alto valor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-yellow-500/50 transition-all shadow-xl">
              <div className="text-yellow-600 font-mono text-xs mb-4 uppercase tracking-wider">Efeito Paliativo</div>
              <h3 className="text-slate-900 font-bold text-xl mb-4">Dashboard de Auditoria AutomÃ¡tica</h3>
              <p className="text-slate-600 leading-relaxed mb-6">Corte o caminho manual e o inferno das planilhas. O Motor Tax.Analytics IA executa cruzamentos complexos de SPEDs e XMLs, entregando um relatÃ³rio de conformidade visual e acionÃ¡vel em segundos.</p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 w-3/4"></div></div>
            </div>
            
            <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-emerald-500/50 transition-all shadow-xl">
              <div className="text-emerald-400 font-mono text-xs mb-4 uppercase tracking-wider">Pronto para Uso</div>
              <h3 className="text-slate-900 font-bold text-xl mb-4">DossiÃªs de ImplementaÃ§Ã£o Imediata</h3>
              <p className="text-slate-600 leading-relaxed mb-6">RelatÃ³rios tÃ©cnicos prontos. A economia de tempo Ã© real: entregue o trabalho documentado e com fundamentaÃ§Ã£o jurÃ­dica para o seu cliente final â€” com a sua identidade e assinatura.</p>
              <div className="flex gap-2"><div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center"><FileText className="w-4 h-4 text-emerald-400"/></div></div>
            </div>
            
            <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-orange-500/50 transition-all shadow-xl relative overflow-hidden">
              <div className="absolute -top-4 -right-4 p-4 opacity-5"><Users className="w-32 h-32 text-orange-400"/></div>
              <div className="text-orange-400 font-mono text-xs mb-4 uppercase tracking-wider relative z-10">Garantia de AvanÃ§o</div>
              <h3 className="text-slate-900 font-bold text-xl mb-4 relative z-10">Sistema de Acompanhamento Ativo</h3>
              <p className="text-slate-600 leading-relaxed relative z-10">Suporte direto via WhatsApp. Garantia de que vocÃª nunca ficarÃ¡ travado na anÃ¡lise tÃ©cnica ou na argumentaÃ§Ã£o comercial para a venda dos relatÃ³rios ao longo da parceria.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos e PreÃ§os B2B (Empresas e Consultorias) */}
      <section id="precos" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <Activity className="w-3 h-3" />
              <span>Para Empresas e Consultorias</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Modelos comerciais flexÃ­veis</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                <FileSearch className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Por demanda</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                Ideal para atuar com um cliente ou demanda especÃ­fica. A anÃ¡lise Ã© contratada por escopo de projeto, com entrega tÃ©cnica definida.
              </p>
            </div>

            <div className="bg-white border-2 border-amber-500 rounded-2xl p-8 flex flex-col hover:border-amber-600 transition-all shadow-xl relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-slate-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Mais Contratado
              </div>
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Recorrente</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                Para consultorias e empresas que precisam de uma esteira contÃ­nua de anÃ¡lise fiscal, saneamento de crÃ©ditos, revisÃ£o de riscos e acompanhamento da transiÃ§Ã£o tributÃ¡ria.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Parceria sob demanda</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                Para consultorias que desejam acionar a TaxManagers como retaguarda tÃ©cnica em projetos selecionados, mantendo a relaÃ§Ã£o comercial com o cliente final.
              </p>
            </div>
          </div>
          
          <div className="text-center mb-16">
            <a href="#contato" className="inline-block px-8 py-4 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-900 font-bold transition-all text-lg">
              Solicitar modelo comercial
            </a>
          </div>


        </div>
      </section>

      {/* Ecossistema de Entrega & Acelerador de Resultados */}
      <section className="py-24 bg-slate-100 border-t border-slate-200 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-900/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Ecossistema Completo de Entrega</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Tudo o que sua consultoria precisa para rodar uma operaÃ§Ã£o tributÃ¡ria de alto valor. Da auditoria tÃ©cnica em segundos ao suporte de vendas, aceleraÃ§Ã£o e acompanhamento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Operacional */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-amber-500/30 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg">Operacional</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3"><Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Dashboard de Auditoria AutomÃ¡tica</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Auditoria retroativa total (Ãºltimos 5 anos)</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">DossiÃªs de ImplementaÃ§Ã£o Imediata</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">OrganizaÃ§Ã£o e tabulaÃ§Ã£o dos achados</span></li>
              </ul>
            </div>

            {/* EstratÃ©gico */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg">EstratÃ©gico</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3"><Check className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">AnÃ¡lise Raio-X Individual</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Apoio direto na proposta comercial</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Planejamento para novos projetos</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Playbook da Reforma TributÃ¡ria</span></li>
              </ul>
            </div>

            {/* Acompanhamento */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-yellow-500/30 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg">Acompanhamento</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3"><Check className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Suporte Direto (Hotline WhatsApp)</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">SessÃµes de Q&A e Mentorias 1 a 1</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Bootcamp de Onboarding "MÃ£o na Massa"</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Acompanhamento tÃ©cnico executivo</span></li>
              </ul>
            </div>

            {/* ManutenÃ§Ã£o & Academy */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg">ManutenÃ§Ã£o</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Checkpoints Mensais Executivos</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Drive & Academy (ConteÃºdo Gravado)</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Comunidade B2B Exclusiva</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">RevisÃ£o contÃ­nua de processos</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SeguranÃ§a Hardcore */}
      <section id="seguranca" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">SeguranÃ§a tÃ©cnica, comercial e jurÃ­dica</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Arquivos fiscais, obrigaÃ§Ãµes acessÃ³rias, XMLs, contratos, saldos credores, ECF, EFD, DCTF e PER/DCOMP revelam mais do que dados contÃ¡beis. Eles expÃµem fornecedores, margens, polÃ­ticas comerciais, oportunidades tributÃ¡rias, fragilidades operacionais, crÃ©ditos acumulados, passivos e decisÃµes estratÃ©gicas.
            </p>
            <p className="text-lg font-medium text-emerald-700 border-l-2 border-emerald-500 pl-4 text-left">
              Por isso, a TaxManagers trata cada arquivo recebido como informaÃ§Ã£o estratÃ©gica confidencial, com uso restrito, acesso controlado e compromisso jurÃ­dico de nÃ£o divulgaÃ§Ã£o.
            </p>
            <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-left inline-block">
              <h4 className="text-slate-900 font-bold mb-4 text-lg">Nossa Faixa de ConfianÃ§a:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">NÃ£o compartilhamos arquivos, relatÃ³rios ou achados com terceiros.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">Uso externo de informaÃ§Ãµes apenas mediante autorizaÃ§Ã£o formal ou exigÃªncia legal aplicÃ¡vel.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: EyeOff, title: "Uso restrito ao mapeamento", desc: "Os documentos sÃ£o usados exclusivamente para a anÃ¡lise. NÃ£o utilizamos arquivos para prospecÃ§Ã£o comercial ou treinamento de IAs pÃºblicas." },
              { icon: ShieldCheck, title: "Acesso limitado", desc: "Acesso restrito aos profissionais da validaÃ§Ã£o tÃ©cnica. A informaÃ§Ã£o nÃ£o circula internamente sem necessidade operacional." },
              { icon: Network, title: "NÃ£o compartilhamento", desc: "A TaxManagers nÃ£o compartilha dados ou achados com concorrentes, parceiros ou terceiros estranhos ao escopo contratado." },
              { icon: Users, title: "Suporte a Parcerias", desc: "Fornecemos inteligÃªncia e insumos analÃ­ticos prontos para embasar a atuaÃ§Ã£o estratÃ©gica de consultores e parceiros." },
              { icon: ShieldAlert, title: "Controle de ExposiÃ§Ã£o EstratÃ©gica", desc: "Arquivos, achados e relatÃ³rios permanecem restritos ao escopo contratado. Qualquer uso externo depende de autorizaÃ§Ã£o formal ou de exigÃªncia legal aplicÃ¡vel." },
              { icon: HardDrive, title: "RetenÃ§Ã£o ou exclusÃ£o", desc: "Os arquivos podem ser excluÃ­dos apÃ³s a conclusÃ£o ou mantidos em ambiente seguro para sustentaÃ§Ã£o tÃ©cnica da anÃ¡lise." },
              { icon: Lock, title: "Confidencialidade Contratual", desc: "A confidencialidade Ã© formalizada via NDA, assegurando proteÃ§Ã£o absoluta de informaÃ§Ãµes e estratÃ©gias corporativas." },
              { icon: Scale, title: "Advogados na ValidaÃ§Ã£o", desc: "A IA acelera a leitura, mas os achados passam por validaÃ§Ã£o tÃ©cnica de advogados tributaristas. AnÃ¡lise humana rigorosa." },
              { icon: FileText, title: "Compromisso de 5 anos", desc: "Nos projetos contratados, os advogados da TaxManagers podem sustentar tecnicamente, por atÃ© 5 anos, os critÃ©rios, premissas e recomendaÃ§Ãµes emitidos no relatÃ³rio, conforme o escopo contratado. Isso nÃ£o significa promessa de resultado, mas compromisso de responsabilidade tÃ©cnica sobre a anÃ¡lise entregue." }
            ].map((card, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 rounded-xl hover:border-emerald-500/30 transition-all">
                <card.icon className="w-6 h-6 text-emerald-400 mb-4" />
                <h4 className="text-slate-900 font-bold mb-2">{card.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FIM DOS NOVOS BLOCOS --- */}

      {/* Commercial Model & CTA (Original Mantido) */}
      <section id="contato" className="py-24 relative bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Value Prop */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6">
                <BarChart3 className="w-3 h-3" />
                <span>PrÃ³ximo Passo</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Evolua o patamar da sua consultoria.
              </h2>
              
              <p className="text-slate-600 mb-8 text-lg">
                Agende uma reuniÃ£o com nossos especialistas em parcerias e descubra como plugar a nossa esteira de auditoria com IA na sua operaÃ§Ã£o, no formato que melhor se adequa ao seu momento.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  "Alinhamento de modelo comercial",
                  "DemonstraÃ§Ã£o da esteira tÃ©cnica",
                  "EstruturaÃ§Ã£o de fluxo de entrega"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Form de Contato Simples para ReuniÃ£o */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 to-amber-600"></div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Falar com consultor de parcerias</h3>
              <p className="text-slate-600 text-sm mb-8">Nossa equipe entrarÃ¡ em contato para alinhar como seremos sua retaguarda fiscal.</p>
              
              {processingState === "done" ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-slate-900 font-semibold mb-2">SolicitaÃ§Ã£o Enviada!</h4>
                  <p className="text-slate-600 text-sm">Entraremos em contato em breve.</p>
                  <button onClick={() => setProcessingState("idle")} className="mt-6 text-sm text-amber-600 hover:text-amber-800">
                    Enviar nova solicitaÃ§Ã£o
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setProcessingState("done"); }}>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Nome Corporativo *</label>
                    <input required type="text" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-amber-500/50 transition-all" placeholder="Nome Completo" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-600 uppercase tracking-wider font-semibold">E-mail Corporativo *</label>
                    <input required type="email" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-amber-500/50 transition-all" placeholder="email@empresa.com.br" />
                  </div>
                  <button type="submit" className="w-full mt-4 py-4 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-slate-900 font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    Quero uma retaguarda fiscal com IA
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de FormulÃ¡rio Longo / Upload */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowUploadModal(false)}></div>
          
          <div className="relative bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {processingState === "form" && (
              <>
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center z-10">
                  <h3 className="text-xl font-bold text-slate-900">Solicitar AnÃ¡lise Preliminar</h3>
                  <button onClick={() => setShowUploadModal(false)} className="text-slate-600 hover:text-slate-900">X</button>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-600 text-sm mb-6">A ideia Ã© reduzir atrito. Envie um arquivo real e veja se hÃ¡ indÃ­cios relevantes para aprofundamento.</p>
                  
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Nome Completo</label>
                        <input required type="text" value={leadForm.name} onChange={(e)=>setLeadForm({...leadForm, name: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-amber-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">E-mail Corporativo</label>
                        <input required type="email" value={leadForm.email} onChange={(e)=>setLeadForm({...leadForm, email: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-amber-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">WhatsApp</label>
                        <input required type="text" value={leadForm.whatsapp} onChange={(e)=>setLeadForm({...leadForm, whatsapp: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-amber-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Empresa ou Consultoria</label>
                        <input required type="text" value={leadForm.company} onChange={(e)=>setLeadForm({...leadForm, company: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-amber-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Tipo de Interessado</label>
                        <select value={leadForm.interestType} onChange={(e)=>setLeadForm({...leadForm, interestType: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-amber-500 outline-none">
                          <option>Sou empresa</option>
                          <option>Sou consultoria parceira</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Tipo de Arquivo</label>
                        <select value={leadForm.fileType} onChange={(e)=>setLeadForm({...leadForm, fileType: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-amber-500 outline-none">
                          <option>SPED Fiscal</option>
                          <option>EFD-ContribuiÃ§Ãµes</option>
                          <option>XML de NF-e</option>
                          <option>Arquivo ZIP (MÃºltiplos)</option>
                          <option>Outro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Upload do Arquivo</label>
                      {selectedFiles && selectedFiles.length > 0 ? (
                        <div className="w-full bg-white border border-amber-500/30 rounded-lg p-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <UploadCloud className="w-4 h-4 text-amber-600 shrink-0" />
                            <span className="text-amber-600 text-sm font-medium truncate">{selectedFiles[0].name}</span>
                          </div>
                          <button type="button" onClick={() => setSelectedFiles(null)} className="text-slate-500 hover:text-slate-900 text-xs shrink-0">Trocar</button>
                        </div>
                      ) : (
                        <input type="file" multiple onChange={(e) => setSelectedFiles(e.target.files)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-500/10 file:text-amber-600 hover:file:bg-amber-500/20" />
                      )}
                    </div>

                    <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-lg mt-4">
                      <p className="text-xs text-emerald-400 mb-3 leading-relaxed">
                        Seu arquivo fiscal revela estratÃ©gia. Por isso, ele serÃ¡ usado apenas para a anÃ¡lise solicitada, nÃ£o serÃ¡ compartilhado com terceiros e nÃ£o serÃ¡ apresentado a Ã³rgÃ£os pÃºblicos sem autorizaÃ§Ã£o expressa.
                      </p>
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" checked={leadForm.acceptedTerms} onChange={(e)=>setLeadForm({...leadForm, acceptedTerms: e.target.checked})} className="mt-1" />
                        <span className="text-xs text-slate-600">
                          Declaro que tenho autorizaÃ§Ã£o para enviar estes arquivos e concordo com o uso restrito dos documentos para fins de prÃ©-anÃ¡lise fiscal. Acordo firmado por <strong>JoÃ£o Gabriel Correa de Andrade e Florio</strong> (Tax Managers).
                        </span>
                      </label>
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="w-full py-4 rounded-lg bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 font-bold transition-all">
                        Enviar para anÃ¡lise preliminar
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}

            {processingState === "processing" && (
              <div className="p-12 text-center">
                <Activity className="w-16 h-16 text-amber-600 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Motor IA Processando...</h3>
                <p className="text-slate-600 mb-8">Aplicando regras de auditoria e cruzamentos fiscais.</p>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-600 transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            {processingState === "done" && (
              <div className="p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Arquivos Recebidos!</h3>
                <p className="text-slate-600 mb-8">
                  A prÃ©via da anÃ¡lise preliminar serÃ¡ enviada para <strong>{leadForm.email}</strong> apÃ³s a revisÃ£o tÃ©cnica dos nossos advogados tributaristas.
                </p>
                <button onClick={() => setShowUploadModal(false)} className="px-8 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold border border-slate-200">
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showLgpdBanner && (
        <div className="fixed bottom-0 w-full bg-white border-t border-slate-200 p-4 z-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 text-center sm:text-left">
            Utilizamos cookies para melhorar sua experiÃªncia. Seus dados fiscais estÃ£o protegidos por sigilo profissional.
          </p>
          <button onClick={handleAcceptLgpd} className="px-6 py-2 bg-slate-200 hover:bg-white/20 text-slate-900 rounded-lg text-sm transition-colors whitespace-nowrap">
            Concordo
          </button>
        </div>
      )}
    </div>
  );
}

`

</details>



### [29/08/2026] - Refinamento da Prova Social e Métricas de Autoridade (TaxManagers)
- **Local:** `C:\Users\Alexandre\taxmanagers-site\src\App.tsx`
- **O que foi feito:**
  - Ajustada a métrica da seção "Autoridade em Números" de "+ R$ 100M em oportunidades analisadas" para "+ R$ 100M Em economia tributária gerada".
- **Motivo estratégico:**
  - Aumentar a tangibilidade e o peso da autoridade do serviço prestado, comunicando economia real e efetiva em vez de mera análise de oportunidades.
- **Deploy:** Realizado com sucesso na Vercel (`taxmanagers.com.br`).


### [29/08/2026] - Reequilíbrio de Governança e Remoção de Ênfase Excessiva em Sigilo
- **Local:** `C:\Users\Alexandre\taxmanagers-site\src\App.tsx`
- **O que foi feito:**
  - Suavizada a ênfase defensiva de confidencialidade/vazamento de dados, que era voltada para o público antigo de consultorias parceiras (medo de perder clientes/dados para concorrentes).
  - Removido o bloco alarmista de "Faixa de Confiança: não compartilhamos com terceiros nem concorrentes".
  - A seção "Segurança Hardcore" foi transformada em **"Governança, conformidade e rigor técnico"**, colocando o sigilo e NDA no mesmo peso equilibrado das garantias técnicas: Validação por Tributaristas Seniores, Dossiês Fundamentados com Base Legal, Sustentação Técnica de 5 Anos e Governança de Dados.
  - Ajustados badges no Hero e no card de upload para uma comunicação corporativa sóbria e natural.
- **Motivo estratégico:**
  - Evitar o "efeito Streisand" (onde falar excessivamente de não vazar dados gera desconfiança no cliente corporativo), posicionando a TaxManagers com maturidade institucional de governança e rigor técnico.
- **Deploy:** Publicado com sucesso na Vercel (`taxmanagers.com.br`).


### [29/08/2026] - Ajuste de Nomenclatura da Marca: Reforma Tributár.IA
- **Local:** `C:\Users\Alexandre\taxmanagers-site\src\App.tsx` e `C:\Users\Alexandre\taxmanagers-site\src\CfoTaxAi.tsx`
- **O que foi feito:**
  - Atualizado o botão de destaque do Hero na home (`App.tsx`) para: `CFO: Reforma Tributár.IA`.
  - Atualizadas todas as menções do programa de `Tributar.ia` para `Reforma Tributár.IA` na página do CFO (`CfoTaxAi.tsx`), mantendo o restante da estrutura e textos intactos.
- **Motivo estratégico:**
  - Unificar os dois eixos de valor (a urgência da Reforma Tributária + a tecnologia de Inteligência Artificial aplicada) sob o nome oficial do programa: **Reforma Tributár.IA**.
- **Deploy:** Publicado com sucesso na Vercel (`taxmanagers.com.br`).


### [29/08/2026] - Refinamento do CTA Principal do Hero
- **Local:** `C:\Users\Alexandre\taxmanagers-site\src\App.tsx`
- **O que foi feito:**
  - Ajustado o botão de destaque do Hero para **`CFO: Programa Reforma Tributár.IA`**.
- **Motivo estratégico:**
  - Tornar o convite mais explícito e atraente como um programa estruturado de aceleração e decisão executiva.
- **Deploy:** Publicado com sucesso na Vercel (`taxmanagers.com.br`).


### [30/08/2026] - Resolução Definitiva do Roteamento e Isolamento do ToDeAcordo
- **Local:** C:\Users\Alexandre\todeacordo, Vercel (	odeacordo prj_tAFPgDonYe2ZA5AMYYb6FkOYpaRx), C:\Users\Alexandre\masterkey-frontend
- **O que foi feito:**
  - Identificada a causa raiz da colisão de domínios: o domínio www.todeacordo.com.br estava apontando para o projeto legado 	odeacordo-v2 (que servia a build do masterkey-frontend, fazendo com que /auth e acessos via www caíssem no fallback do Mestre das Teclas).
  - Unificados todos os domínios (	odeacordo.com.br, www.todeacordo.com.br, pp.todeacordo.com.br) exclusivamente dentro do projeto Vercel oficial 	odeacordo.
  - Adicionado redirect explícito de /auth e /login para /app em C:\Users\Alexandre\todeacordo\src\dashboard\index.tsx para garantir que tráfego vindo de buscas legadas no Google caia direto no Dashboard do ToDeAcordo.
  - Feito build e deploy em Produção do projeto 	odeacordo na Vercel (	odeacordo.com.br).
  - Limpo o App.tsx e index.html de masterkey-frontend para remover a flag obsoleta isTodeAcordoDomain e a troca dinâmica de título que mascarava o problema.
  - Atualizada a TOPOLOGY.md documentando a separação física e de domínios absoluta.
- **Motivo estratégico:**
  - Eliminar em definitivo o problema crônico de vazamento entre projetos, garantindo que leads e clientes que cheguem pelo Google ao 	odeacordo.com.br acessem a aplicação real do ToDeAcordo.
- **Deploy:** Deploy em produção realizado com sucesso e validado via Puppeteer e curl em 	odeacordo.com.br, www.todeacordo.com.br, pp.todeacordo.com.br e 	odeacordo.com.br/auth.

### [Data: 30/08/2026] - Upgrade Tactiq-Grade: Motor de Captura Semântica Resiliente, STT Whisper e Extensão v1.1.0

- **Contexto / Motivo Estratégico:**
  - Resolução definitiva dos problemas crônicos de captura de reuniões do Google Meet documentados no Arquivão (duplicação, classes CSS quebradas pelo Google, falso lobby, ghost CSS obstrutivo).
  - Alinhamento da proposta de valor do ToDeAcordo frente ao Google Meet (Gemini), Tactiq e Otter.ai: enquanto Tactiq/Otter geram apenas notas passivas unilaterais, o ToDeAcordo entrega o motor de fechamento com link bilateral de consenso oficial (/valida/:id).
- **Alterações Realizadas:**
  1. `src/platforms/google-meet/selectors.ts`: Adicionados seletores semânticos universais (`div[aria-live="polite"]`, `div[role="region"]`, `div[data-sender-name]`) e classes modernas do Google Meet.
  2. `src/platforms/google-meet/captionExtractor.ts`: Implementado fallback semântico automático no `handleMutations` para capturar blocos de fala diretamente mesmo quando classes pais sofrem mutação pelo Google.
  3. `src/content-script/index.ts`: Removido Ghost CSS obstrutivo (`opacity: 0.001`, `z-index: -9999`) que bloqueava o ciclo de renderização de nós de texto do Google Meet.
  4. `api/transcribe.js`: Criado endpoint serverless de áudio para transcrição via Groq Whisper API (`whisper-large-v3-turbo`).
  5. `api/generate-consensus.js`: Suavizada a validação de idioma para não bloquear termos técnicos em inglês e ajustado mínimo de transcrição.
  6. `public/manifest.json`: Atualizado para versão 1.1.0 e configurado `host_permissions` para `*.todeacordo.com.br` e `meet.google.com`.
  7. `src/sidepanel/index.tsx`: Interface polida e botões atualizados para geração imediata de consenso e compartilhamento.
  8. Build e deploy de produção na Vercel (`dpl_C1Hc81kpYHucRRw2UN9sgw82TbHa`) e empacotamento do zip da extensão (`todeacordo_extension_v1.1.0.zip`).
