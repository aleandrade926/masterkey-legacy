import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
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
    if (!leadForm.acceptedTerms) return alert("Você precisa aceitar os termos de confidencialidade.");
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

        // Retry automático: até 3 tentativas por chunk
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

        if (!success) throw new Error(`Falha ao enviar chunk ${i} após 3 tentativas`);

        setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));
      }

      setProcessingState("done");
    } catch (err) {
      console.error("Erro no upload:", err);
      alert("Erro na conexão com a VPS. O túnel ou servidor pode estar inativo. Modo simulação ativado.");
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
          <div className="flex items-center gap-3">
            <img src="/logo-icon.png" className="h-10 w-10 object-contain rounded-lg" alt="Tax Managers Logo" />
            <span className="text-xl font-bold tracking-tight text-slate-900">Tax Managers</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#solucoes" className="hover:text-amber-600 transition-colors">Soluções</a>
            <a href="#tecnologia" className="hover:text-amber-600 transition-colors">Tecnologia</a>
            <a href="#metodo" className="hover:text-amber-600 transition-colors">Método</a>
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
              Análise Inicial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#424242]">
        <div className="relative max-w-5xl mx-auto px-6 z-10 text-left">
          <div className="text-amber-500 text-xs md:text-sm font-bold uppercase tracking-widest mb-6">
            REVISÃO FISCAL <span className="mx-2 text-amber-500/50">•</span> RECUPERAÇÃO DE CRÉDITOS <span className="mx-2 text-amber-500/50">•</span> DOSSIÊ TÉCNICO
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
            Inteligência fiscal com IA para <br className="hidden md:block" /><span className="text-amber-500">empresas e consultorias tributárias.</span>
          </h1>
          
          <div className="w-20 h-1.5 bg-amber-500 mb-8 rounded-full"></div>
          
          <p className="text-base md:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl">
            A TaxManagers analisa arquivos fiscais, obrigações acessórias e documentos tributários para identificar créditos, inconsistências, riscos e oportunidades — com revisão de advogados tributaristas e opção de retaguarda técnica para consultorias parceiras.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start mb-10">
            <button onClick={() => {setShowUploadModal(true); setProcessingState("form");}} className="px-8 py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold transition-all shadow-xl flex items-center justify-center text-lg">
              Testar com arquivo real
            </button>
            <a href="#parceria" className="px-8 py-4 rounded-lg bg-transparent border-2 border-slate-400 hover:border-slate-300 text-white font-bold transition-all text-center flex items-center justify-center text-lg">
              Sou consultoria parceira
            </a>
          </div>
          
          <div className="flex flex-wrap items-center justify-start gap-6 text-xs md:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400"/> Segurança jurídica</div>
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
                
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">Análise de arquivos fiscais</h2>
                <p className="text-slate-600 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
                  Carregue o arquivo para cruzamento e geração de relatórios corporativos. A validação técnica e o mapeamento de oportunidades fiscais ocorrem em ambiente seguro e restrito.
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
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Confidencialidade Absoluta • Segurança de Dados</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-tight">
                    Acesso controlado e criptografado. Todas as informações fiscais enviadas são protegidas por sigilo profissional corporativo.
                  </p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">2026/2027: a janela de saneamento fiscal começou.</h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Com a transição para CBS e IBS, créditos legados, parametrizações fiscais, documentos eletrônicos e bases de cálculo precisam ser revisados antes que inconsistências virem perda de caixa, glosa ou retrabalho sistêmico.
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
                  O modelo de consultorias convencionais focadas apenas em olhar para o retrovisor ficou no passado. As regras de transição exigem governança e velocidade. A atuação da Tax Managers não é meramente preventiva, muito menos corretiva.
                </p>
                <p>
                  Adotamos o <strong>modelo preditivo</strong> com apoio de Inteligência Artificial para analisar padrões nos seus SPEDs e notas fiscais, antecipando inconsistências tributárias com a lógica pró-Fisco.
                </p>
                <p>
                  Processamos grandes volumes de dados para projetar o impacto de IBS/CBS na sua operação — além de outros tributos — para antecipar oportunidades de saneamento e geração de caixa, com impacto direto no EBITDA dos clientes.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "Complexidade na transição para CBS/IBS",
                  "Risco de glosa por crédito mal documentado",
                  "Perda de créditos por parametrização fiscal incorreta"
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
                    Relatório de Oportunidades 26/27
                  </h3>
                  <span className="text-xs font-mono text-slate-500">MOTOR.AUDITORIA.IA</span>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Análise de Malha Fiscal</span>
                      <span className="text-amber-600 font-mono">Processando</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-600 to-amber-600 w-3/4 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Cruzamento SPED/EFD</span>
                      <span className="text-yellow-600 font-mono">Concluído</span>
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
              Tax Analytics: nosso <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">motor interno de inteligência fiscal</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              O Tax Analytics é o motor interno da TaxManagers para leitura de arquivos fiscais, cruzamento de obrigações acessórias, identificação de inconsistências e geração de relatórios executivos. Ele não substitui a consultoria: acelera a análise para que advogados tributaristas validem os achados e transformem dados em decisão.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-amber-500/30 transition-all group">
              <div className="w-14 h-14 bg-yellow-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Motor In-Memory</h3>
              <p className="text-slate-600 leading-relaxed">
                Esqueça os softwares lentos do passado. Nossa tecnologia lê blocos complexos do SPED e cruza milhões de linhas diretamente na memória, entregando resultados em segundos.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-amber-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <ShieldCheck className="w-32 h-32 text-amber-600" />
              </div>
              <div className="w-14 h-14 bg-amber-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                <ShieldCheck className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">Segurança Cloud-Native</h3>
              <p className="text-slate-600 leading-relaxed relative z-10">
                Confidencialidade absoluta. Arquitetura blindada com isolamento total (Row Level Security), garantindo que os dados fiscais da sua empresa jamais se misturem.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-amber-500/30 transition-all group">
              <div className="w-14 h-14 bg-orange-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileSearch className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Dossiê via GenAI</h3>
              <p className="text-slate-600 leading-relaxed">
                Mais do que planilhas frias: nossa Inteligência Artificial interpreta os cruzamentos e redige automaticamente a fundamentação jurídica de cada oportunidade encontrada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solucoes" className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Linhas de atuação técnica</h2>
            <p className="text-slate-600">Análise fiscal com dados, dossiê técnico e conformidade legal.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Layers,
                title: "Créditos Legados PIS/Cofins",
                desc: "Saneamento e mapeamento de créditos não apropriados na sistemática não cumulativa.",
                color: "from-yellow-500 to-yellow-600"
              },
              {
                icon: ShieldCheck,
                title: "Governança de Créditos IBS/CBS",
                desc: "Governança fiscal e modelagem de cenários para a transição do novo regime tributário.",
                color: "from-amber-600 to-amber-500"
              },
              {
                icon: FileSearch,
                title: "Lei do Bem",
                desc: "Estruturação de dossiês técnicos para fruição de incentivos à inovação tecnológica.",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: Briefcase,
                title: "IRPJ/CSLL",
                desc: "Identificação de oportunidades e adequação na apuração do lucro real e bases de cálculo.",
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Método Tax Managers</h2>
            <p className="text-slate-600 max-w-xl">Fluxo estruturado para segurança jurídica, minimizando exposições e assegurando fundamentação em cada etapa.</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "01", name: "Mapeamento", desc: "Análise preliminar de viabilidade." },
              { step: "02", name: "Relatório", desc: "Mapeamento de oportunidades identificáveis." },
              { step: "03", name: "Validação", desc: "Aprovação corporativa da empresa." },
              { step: "04", name: "Implementação", desc: "Execução técnica dos aproveitamentos." },
              { step: "05", name: "Dossiê", desc: "Entrega documental e acompanhamento." },
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
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Experiência aplicada desde 2010.</h2>
          <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed">
            A Tax Managers é composta por uma <strong>equipe multidisciplinar sênior</strong> formada por advogados, administradores, engenheiros e profissionais da área de tecnologia. 
            <br/><br/>
            Atuamos em projetos de revisão fiscal, aproveitamento de créditos tributários, oportunidades de IRPJ/CSLL, PIS/Cofins e estruturação de dossiês técnicos para empresas de médio e grande porte.
          </p>
        </div>
      </section>

      {/* --- INÍCIO DOS NOVOS BLOCOS --- */}

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
                Entregue análises de conformidade, auditorias e relatórios fiscais sob a sua marca, sem desenvolver tecnologia própria.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Sua consultoria pode ampliar sua capacidade de entrega com uma esteira técnica de análise fiscal assistida por IA. A TaxManagers atua nos bastidores, processando arquivos, identificando achados e estruturando relatórios técnicos para que a consultoria parceira mantenha o relacionamento com o cliente final.
              </p>
              
              <p className="text-slate-900 font-bold text-xl mb-8">
                Você mantém o cliente. Nós entregamos a inteligência fiscal por trás.
              </p>
              
              <a href="#contato" className="inline-flex px-6 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-slate-900 font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                Quero uma retaguarda fiscal com IA
              </a>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Como funciona a parceria:</h3>
              <div className="space-y-6">
                {[
                  { step: "1", text: "A consultoria capta ou mantém o cliente." },
                  { step: "2", text: "A consultoria envia os arquivos fiscais, contábeis ou contratuais." },
                  { step: "3", text: "A TaxManagers processa os dados com IA e metodologia fiscal." },
                  { step: "4", text: "Os achados relevantes passam por revisão técnica." },
                  { step: "5", text: "O relatório é entregue para uso da consultoria parceira." },
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

      {/* Seção de Valor Estratégico */}
      <section className="py-24 bg-gradient-to-b from-[#050505] to-[#0d0d11] relative border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Segurança jurídica e otimização de caixa com inteligência fiscal aplicada
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Uma retaguarda técnica de alta precisão baseada em IA para que sua empresa ou consultoria foque nas tomadas de decisão estratégica e no relacionamento corporativo.
          </p>
          <div className="inline-flex items-center gap-3 bg-white border border-amber-500/30 rounded-full px-6 py-3 shadow-xl">
            <Briefcase className="w-5 h-5 text-amber-500" />
            <span className="text-slate-800 font-medium">Desenvolvido para diretores, gestores e advogados que buscam <strong>governança e eficiência tributária</strong> sem sobrecarga operacional.</span>
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
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Da análise fiscal ao plano de ação</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Não entregamos apenas um software. Entregamos a <strong>solução palpável e pronta</strong> para você auditar e vender projetos tributários de alto valor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-yellow-500/50 transition-all shadow-xl">
              <div className="text-yellow-600 font-mono text-xs mb-4 uppercase tracking-wider">Efeito Paliativo</div>
              <h3 className="text-slate-900 font-bold text-xl mb-4">Dashboard de Auditoria Automática</h3>
              <p className="text-slate-600 leading-relaxed mb-6">Corte o caminho manual e o inferno das planilhas. O Motor Tax.Analytics IA executa cruzamentos complexos de SPEDs e XMLs, entregando um relatório de conformidade visual e acionável em segundos.</p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 w-3/4"></div></div>
            </div>
            
            <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-emerald-500/50 transition-all shadow-xl">
              <div className="text-emerald-400 font-mono text-xs mb-4 uppercase tracking-wider">Pronto para Uso</div>
              <h3 className="text-slate-900 font-bold text-xl mb-4">Dossiês de Implementação Imediata</h3>
              <p className="text-slate-600 leading-relaxed mb-6">Relatórios técnicos prontos. A economia de tempo é real: entregue o trabalho documentado e com fundamentação jurídica para o seu cliente final — com a sua identidade e assinatura.</p>
              <div className="flex gap-2"><div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center"><FileText className="w-4 h-4 text-emerald-400"/></div></div>
            </div>
            
            <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-orange-500/50 transition-all shadow-xl relative overflow-hidden">
              <div className="absolute -top-4 -right-4 p-4 opacity-5"><Users className="w-32 h-32 text-orange-400"/></div>
              <div className="text-orange-400 font-mono text-xs mb-4 uppercase tracking-wider relative z-10">Garantia de Avanço</div>
              <h3 className="text-slate-900 font-bold text-xl mb-4 relative z-10">Sistema de Acompanhamento Ativo</h3>
              <p className="text-slate-600 leading-relaxed relative z-10">Suporte direto via WhatsApp. Garantia de que você nunca ficará travado na análise técnica ou na argumentação comercial para a venda dos relatórios ao longo da parceria.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos e Preços B2B (Empresas e Consultorias) */}
      <section id="precos" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <Activity className="w-3 h-3" />
              <span>Para Empresas e Consultorias</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Modelos comerciais flexíveis</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                <FileSearch className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Por demanda</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                Ideal para atuar com um cliente ou demanda específica. A análise é contratada por escopo de projeto, com entrega técnica definida.
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
                Para consultorias e empresas que precisam de uma esteira contínua de análise fiscal, saneamento de créditos, revisão de riscos e acompanhamento da transição tributária.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Parceria sob demanda</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                Para consultorias que desejam acionar a TaxManagers como retaguarda técnica em projetos selecionados, mantendo a relação comercial com o cliente final.
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
              Tudo o que sua consultoria precisa para rodar uma operação tributária de alto valor. Da auditoria técnica em segundos ao suporte de vendas, aceleração e acompanhamento.
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
                <li className="flex gap-3"><Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Dashboard de Auditoria Automática</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Auditoria retroativa total (últimos 5 anos)</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Dossiês de Implementação Imediata</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Organização e tabulação dos achados</span></li>
              </ul>
            </div>

            {/* Estratégico */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg">Estratégico</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3"><Check className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Análise Raio-X Individual</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Apoio direto na proposta comercial</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Planejamento para novos projetos</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Playbook da Reforma Tributária</span></li>
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
                <li className="flex gap-3"><Check className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Sessões de Q&A e Mentorias 1 a 1</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Bootcamp de Onboarding "Mão na Massa"</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Acompanhamento técnico executivo</span></li>
              </ul>
            </div>

            {/* Manutenção & Academy */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg">Manutenção</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Checkpoints Mensais Executivos</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Drive & Academy (Conteúdo Gravado)</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Comunidade B2B Exclusiva</span></li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm">Revisão contínua de processos</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Segurança Hardcore */}
      <section id="seguranca" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Segurança técnica, comercial e jurídica</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Arquivos fiscais, obrigações acessórias, XMLs, contratos, saldos credores, ECF, EFD, DCTF e PER/DCOMP revelam mais do que dados contábeis. Eles expõem fornecedores, margens, políticas comerciais, oportunidades tributárias, fragilidades operacionais, créditos acumulados, passivos e decisões estratégicas.
            </p>
            <p className="text-lg font-medium text-emerald-700 border-l-2 border-emerald-500 pl-4 text-left">
              Por isso, a TaxManagers trata cada arquivo recebido como informação estratégica confidencial, com uso restrito, acesso controlado e compromisso jurídico de não divulgação.
            </p>
            <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-left inline-block">
              <h4 className="text-slate-900 font-bold mb-4 text-lg">Nossa Faixa de Confiança:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">Não compartilhamos arquivos, relatórios ou achados com terceiros.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">Uso externo de informações apenas mediante autorização formal ou exigência legal aplicável.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: EyeOff, title: "Uso restrito ao mapeamento", desc: "Os documentos são usados exclusivamente para a análise. Não utilizamos arquivos para prospecção comercial ou treinamento de IAs públicas." },
              { icon: ShieldCheck, title: "Acesso limitado", desc: "Acesso restrito aos profissionais da validação técnica. A informação não circula internamente sem necessidade operacional." },
              { icon: Network, title: "Não compartilhamento", desc: "A TaxManagers não compartilha dados ou achados com concorrentes, parceiros ou terceiros estranhos ao escopo contratado." },
              { icon: Users, title: "Suporte a Parcerias", desc: "Fornecemos inteligência e insumos analíticos prontos para embasar a atuação estratégica de consultores e parceiros." },
              { icon: ShieldAlert, title: "Controle de Exposição Estratégica", desc: "Arquivos, achados e relatórios permanecem restritos ao escopo contratado. Qualquer uso externo depende de autorização formal ou de exigência legal aplicável." },
              { icon: HardDrive, title: "Retenção ou exclusão", desc: "Os arquivos podem ser excluídos após a conclusão ou mantidos em ambiente seguro para sustentação técnica da análise." },
              { icon: Lock, title: "Confidencialidade Contratual", desc: "A confidencialidade é formalizada via NDA, assegurando proteção absoluta de informações e estratégias corporativas." },
              { icon: Scale, title: "Advogados na Validação", desc: "A IA acelera a leitura, mas os achados passam por validação técnica de advogados tributaristas. Análise humana rigorosa." },
              { icon: FileText, title: "Compromisso de 5 anos", desc: "Nos projetos contratados, os advogados da TaxManagers podem sustentar tecnicamente, por até 5 anos, os critérios, premissas e recomendações emitidos no relatório, conforme o escopo contratado. Isso não significa promessa de resultado, mas compromisso de responsabilidade técnica sobre a análise entregue." }
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
                <span>Próximo Passo</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Evolua o patamar da sua consultoria.
              </h2>
              
              <p className="text-slate-600 mb-8 text-lg">
                Agende uma reunião com nossos especialistas em parcerias e descubra como plugar a nossa esteira de auditoria com IA na sua operação, no formato que melhor se adequa ao seu momento.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  "Alinhamento de modelo comercial",
                  "Demonstração da esteira técnica",
                  "Estruturação de fluxo de entrega"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Form de Contato Simples para Reunião */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 to-amber-600"></div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Falar com consultor de parcerias</h3>
              <p className="text-slate-600 text-sm mb-8">Nossa equipe entrará em contato para alinhar como seremos sua retaguarda fiscal.</p>
              
              {processingState === "done" ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-slate-900 font-semibold mb-2">Solicitação Enviada!</h4>
                  <p className="text-slate-600 text-sm">Entraremos em contato em breve.</p>
                  <button onClick={() => setProcessingState("idle")} className="mt-6 text-sm text-amber-600 hover:text-cyan-300">
                    Enviar nova solicitação
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

      {/* Modal de Formulário Longo / Upload */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowUploadModal(false)}></div>
          
          <div className="relative bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {processingState === "form" && (
              <>
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center z-10">
                  <h3 className="text-xl font-bold text-slate-900">Solicitar Análise Preliminar</h3>
                  <button onClick={() => setShowUploadModal(false)} className="text-slate-600 hover:text-slate-900">X</button>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-600 text-sm mb-6">A ideia é reduzir atrito. Envie um arquivo real e veja se há indícios relevantes para aprofundamento.</p>
                  
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
                          <option>EFD-Contribuições</option>
                          <option>XML de NF-e</option>
                          <option>Arquivo ZIP (Múltiplos)</option>
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
                        Seu arquivo fiscal revela estratégia. Por isso, ele será usado apenas para a análise solicitada, não será compartilhado com terceiros e não será apresentado a órgãos públicos sem autorização expressa.
                      </p>
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" checked={leadForm.acceptedTerms} onChange={(e)=>setLeadForm({...leadForm, acceptedTerms: e.target.checked})} className="mt-1" />
                        <span className="text-xs text-slate-600">
                          Declaro que tenho autorização para enviar estes arquivos e concordo com o uso restrito dos documentos para fins de pré-análise fiscal. Acordo firmado por <strong>João Gabriel Correa de Andrade e Florio</strong> (Tax Managers).
                        </span>
                      </label>
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="w-full py-4 rounded-lg bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 font-bold transition-all">
                        Enviar para análise preliminar
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
                  A prévia da análise preliminar será enviada para <strong>{leadForm.email}</strong> após a revisão técnica dos nossos advogados tributaristas.
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
            Utilizamos cookies para melhorar sua experiência. Seus dados fiscais estão protegidos por sigilo profissional.
          </p>
          <button onClick={handleAcceptLgpd} className="px-6 py-2 bg-slate-200 hover:bg-white/20 text-slate-900 rounded-lg text-sm transition-colors whitespace-nowrap">
            Concordo
          </button>
        </div>
      )}
    </div>
  );
}
