import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { normalizeSlug, validateSlugFormat, checkSlugAvailability, generateUniqueSlug } from "../../lib/taxmanagers/slug-utils";
import { User, Building, ExternalLink, Sparkles, ArrowLeft, CheckCircle, AlertCircle, Link as LinkIcon, Activity, FileText, Phone, MessageCircle, Mail, Calendar, Clock, Clipboard } from "lucide-react";

export default function Pessoas() {
  const [, setLocation] = useLocation();
  
  const pathParts = location.split("/").filter(Boolean);
  const routeParam = pathParts[pathParts.length - 1];

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [interactionsLoading, setInteractionsLoading] = useState(false);
  const [interactionsError, setInteractionsError] = useState(false);
  const [slugInput, setSlugInput] = useState("");
  const [slugStatus, setSlugStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [savingSlug, setSavingSlug] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!routeParam || routeParam === "novo") {
      setLoading(false);
      return;
    }

    setLoading(true);
    const isUuid = /^[0-9a-fA-F-]{36}$/.test(routeParam);

    let query = supabase.from("taxmanagers_leads").select("*");
    if (isUuid) {
      query = query.eq("id", routeParam);
    } else {
      query = query.eq("slug", routeParam);
    }

    query.single().then(async ({ data: record, error }) => {
      if (error || !record) {
        setData(null);
        setLoading(false);
        return;
      }

      setData(record);
      if (record.slug) {
        setSlugInput(record.slug);
      } else {
        const suggested = await generateUniqueSlug("taxmanagers_leads", record.nome || "pessoa", record.id);
        setSlugInput(suggested);
      }
      setLoading(false);

      // Buscar Timeline (apenas leitura)
      if (record.id) {
        setInteractionsLoading(true);
        setInteractionsError(false);
        try {
          const { data: ints, error: intsError } = await supabase
            .from("taxmanagers_interactions")
            .select("id, lead_id, type, content, created_at")
            .eq("lead_id", record.id)
            .order("created_at", { ascending: false });
            
          if (intsError) throw intsError;
          if (ints) setInteractions(ints);
        } catch (err) {
          console.error("Erro ao buscar histórico:", err);
          setInteractionsError(true);
        } finally {
          setInteractionsLoading(false);
        }

        // Buscar lista de empresas para dropdown
        supabase.from("taxmanagers_companies").select("id, display_name, slug").order("display_name").then(({data: comps}) => {
          if (comps) setCompanies(comps);
        });
      }
    });
  }, [routeParam]);

  const handleSaveSlug = async () => {
    if (!data?.id) return;
    setSavingSlug(true);
    setSlugStatus(null);

    const cleanSlug = normalizeSlug(slugInput);
    const validation = validateSlugFormat(cleanSlug);
    if (!validation.valid) {
      setSlugStatus({ message: validation.error || "Slug inválido.", isError: true });
      setSavingSlug(false);
      return;
    }

    const { available, error: availError } = await checkSlugAvailability("taxmanagers_leads", cleanSlug, data.id);
    if (!available) {
      setSlugStatus({ message: availError || "Slug indisponível.", isError: true });
      setSavingSlug(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("taxmanagers_leads")
      .update({ slug: cleanSlug })
      .eq("id", data.id);

    if (updateError) {
      setSlugStatus({ message: `Erro ao salvar: ${updateError.message}`, isError: true });
    } else {
      setData({ ...data, slug: cleanSlug });
      setSlugStatus({ message: "URL Amigável atualizada com sucesso!", isError: false });
    }
    setSavingSlug(false);
  };

  const handleLinkCompany = async (companyId: string, companyName: string) => {
    setIsEditingCompany(false);
    if (!companyId || !data?.id) return;
    const { error } = await supabase.from("taxmanagers_leads").update({ company_id: companyId, empresa: companyName }).eq("id", data.id);
    if (!error) {
      setData({ ...data, company_id: companyId, empresa: companyName });
    }
  };

  const handleDelete = async () => {
    if (!data?.id) return;
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta pessoa? Esta ação não pode ser desfeita.");
    if (!confirmDelete) return;
    
    setDeleting(true);
    await supabase.from("taxmanagers_leads").delete().eq("id", data.id);
    setLocation("/taxmanagers/app?tab=leads");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Header Tax Managers */}
      <header className="border-b border-white/5 bg-[#0b0b0f]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-icon.png" alt="Tax Managers Logo" className="w-9 h-9 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <div>
              <span className="text-lg font-bold text-white tracking-tight block">Tax Managers</span>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest block -mt-1 font-mono">Navigator • Perfil de Pessoa</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {data && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {deleting ? "Excluindo..." : "Excluir"}
              </button>
            )}
            <Link href="/taxmanagers/app?tab=leads">
              <span className="px-4 py-2 rounded-lg bg-[#111116] border border-white/10 hover:bg-white/5 text-slate-300 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            <p className="text-slate-400 text-sm">Carregando dados da pessoa...</p>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Header da Pessoa */}
            <div className="bg-[#0b0b0f] border border-white/5 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg">
                    <User className="w-7 h-7" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">{data.nome || "Lead Sem Nome"}</h1>
                    <p className="text-sm text-cyan-400 font-medium mt-0.5">{data.cargo || "Cargo atual não identificado"}</p>
                    <div className="mt-1 flex items-center gap-1.5 relative">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      {isEditingCompany ? (
                        <select
                          className="bg-[#111116] border border-white/10 rounded px-2 py-1 text-xs text-slate-300 outline-none w-64"
                          onChange={(e) => {
                            if (!e.target.value) return;
                            const opt = e.target.options[e.target.selectedIndex];
                            handleLinkCompany(e.target.value, opt.text);
                          }}
                          onBlur={() => setIsEditingCompany(false)}
                          defaultValue=""
                          autoFocus
                        >
                          <option value="" disabled>Selecione uma empresa...</option>
                          {companies.map(c => (
                            <option key={c.id} value={c.id}>{c.display_name}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-slate-400 cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => setIsEditingCompany(true)}>
                          {data.empresa && data.empresa !== "N/A" ? data.empresa : "Empresa atual não identificada"}
                          {data.company_id ? (
                            <span className="text-[10px] text-emerald-500 ml-2 font-semibold">✓ Vinculada</span>
                          ) : (
                            <span className="text-[10px] text-slate-500 ml-2 underline decoration-dashed">(clique para vincular)</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {data.slug && (
                  <div className="self-start md:self-center">
                    <a href={`/taxmanagers/in/${data.slug}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-semibold hover:bg-cyan-500/20 transition-all">
                      <span>/taxmanagers/in/{data.slug}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Grid de Informações & URL Amigável */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card de Dados Detalhados */}
              <div className="md:col-span-2 bg-[#0b0b0f] border border-white/5 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Ficha Cadastral (Lead)
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="bg-[#111116] p-3.5 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">ID Interno (UUID)</span>
                    <span className="font-mono text-slate-300 text-[11px] break-all">{data.id}</span>
                  </div>
                  <div className="bg-[#111116] p-3.5 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Status no Funil</span>
                    <span className="text-cyan-400 font-bold">{data.status || "Pendente"}</span>
                  </div>
                  <div className="bg-[#111116] p-3.5 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">E-mail</span>
                    <span className="text-slate-300 font-mono">{data.email || "Não informado"}</span>
                  </div>
                  <div className="bg-[#111116] p-3.5 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Telefone</span>
                    <span className="text-slate-300 font-mono">{data.telefone || "Não informado"}</span>
                  </div>
                  <div className="bg-[#111116] p-3.5 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">LinkedIn</span>
                    <span className="text-slate-300 font-mono break-all">{data.url || "Não informado"}</span>
                  </div>
                </div>
              </div>

              {/* Card de Gestão de URL Amigável */}
              <div className="bg-[#0b0b0f] border border-white/5 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-cyan-400" /> URL Amigável
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Personalize o slug único para o link público da pessoa.
                </p>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">Prefix da Rota</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500 bg-[#111116] px-3 py-2 rounded-lg border border-white/5">/taxmanagers/in/</span>
                      <input
                        type="text"
                        value={slugInput}
                        onChange={(e) => setSlugInput(e.target.value)}
                        placeholder="ex: mauricio-aballo"
                        className="flex-1 bg-[#111116] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  {slugInput && (
                    <p className="text-[11px] text-slate-400">
                      Prévia: <span className="font-mono text-cyan-400">/taxmanagers/in/{normalizeSlug(slugInput)}</span>
                    </p>
                  )}

                  <button
                    onClick={handleSaveSlug}
                    disabled={savingSlug}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-600/10 disabled:opacity-50"
                  >
                    {savingSlug ? "Salvando..." : "Salvar URL Amigável"}
                  </button>

                  {slugStatus && (
                    <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${slugStatus.isError ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}>
                      {slugStatus.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
                      <span>{slugStatus.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Abordagem IA (Somente Leitura) */}
            <div className="bg-[#0b0b0f] border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Abordagem IA
              </h3>
              
              <div className="space-y-4">
                {/* Passo 1 */}
                <div className="bg-[#111116] border border-white/5 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">Passo 1 (Conexão LinkedIn)</span>
                    {data.passo1_mensagem && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(data.passo1_mensagem);
                            if (data.url) window.open(data.url, "_blank");
                          }}
                          className="px-3 py-1 rounded bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all text-xs font-semibold flex items-center gap-1"
                        >
                          <Clipboard className="w-3.5 h-3.5" /> Copiar e Abrir Perfil
                        </button>
                      </div>
                    )}
                  </div>
                  <textarea 
                    readOnly 
                    className="w-full bg-[#0a0a0e] border border-white/5 rounded-lg p-3 text-slate-300 text-sm h-24 font-sans focus:outline-none resize-none"
                    value={data.passo1_mensagem || "Mensagem ainda não gerada."}
                  ></textarea>
                </div>

                {/* Passo 2 */}
                <div className="bg-[#111116] border border-white/5 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">Passo 2 (Newsletter/InMail)</span>
                    {data.passo2_mensagem && (
                      <button 
                        onClick={() => navigator.clipboard.writeText(data.passo2_mensagem)}
                        className="px-3 py-1 rounded bg-[#111117] border border-white/10 hover:bg-white/5 text-slate-300 transition-all text-xs font-semibold flex items-center gap-1"
                      >
                        <Clipboard className="w-3.5 h-3.5" /> Copiar Texto
                      </button>
                    )}
                  </div>
                  <textarea 
                    readOnly 
                    className="w-full bg-[#0a0a0e] border border-white/5 rounded-lg p-3 text-slate-300 text-sm h-32 font-sans focus:outline-none resize-none"
                    value={data.passo2_mensagem || "Mensagem ainda não gerada."}
                  ></textarea>
                </div>

                {/* Passo 3 */}
                <div className="bg-[#111116] border border-white/5 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">Passo 3 (Diagnóstico Inicial)</span>
                    {data.passo3_mensagem && (
                      <button 
                        onClick={() => navigator.clipboard.writeText(data.passo3_mensagem)}
                        className="px-3 py-1 rounded bg-[#111117] border border-white/10 hover:bg-white/5 text-slate-300 transition-all text-xs font-semibold flex items-center gap-1"
                      >
                        <Clipboard className="w-3.5 h-3.5" /> Copiar Texto
                      </button>
                    )}
                  </div>
                  <textarea 
                    readOnly 
                    className="w-full bg-[#0a0a0e] border border-white/5 rounded-lg p-3 text-slate-300 text-sm h-28 font-sans focus:outline-none resize-none"
                    value={data.passo3_mensagem || "Mensagem ainda não gerada."}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Histórico de Atividades (Timeline) */}
            <div className="bg-[#0b0b0f] border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" /> Histórico de Atividades
              </h3>
              
              {interactionsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400 mx-auto"></div>
                  <p className="text-xs text-slate-500 mt-2">Carregando histórico...</p>
                </div>
              ) : interactionsError ? (
                <div className="text-center py-8 text-rose-400 text-xs italic bg-rose-500/10 rounded-xl border border-rose-500/20">
                  Não foi possível carregar o histórico
                </div>
              ) : interactions.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs italic">
                  Nenhuma atividade registrada
                </div>
              ) : (
                <div className="relative border-l-2 border-white/5 pl-4 ml-2 space-y-6 mt-4">
                  {interactions.map(evt => {
                    let title = "Atividade";
                    let iconColor = "text-slate-400 bg-slate-500/10 border border-slate-500/20";
                    let IconComponent = Activity;
                    
                    if (evt.type === "import") {
                      title = "Importação";
                      iconColor = "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20";
                      IconComponent = FileText;
                    } else if (evt.type === "linkedin") {
                      title = "LinkedIn Outreach";
                      iconColor = "text-blue-400 bg-blue-500/10 border border-blue-500/20";
                      IconComponent = LinkIcon;
                    } else if (evt.type === "phone") {
                      title = "Ligação Telefônica";
                      iconColor = "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20";
                      IconComponent = Phone;
                    } else if (evt.type === "whatsapp") {
                      title = "WhatsApp Outreach";
                      iconColor = "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20";
                      IconComponent = MessageCircle;
                    } else if (evt.type === "email") {
                      title = "E-mail";
                      iconColor = "text-amber-400 bg-amber-500/10 border border-amber-500/20";
                      IconComponent = Mail;
                    } else if (evt.type === "status_change") {
                      title = "Alteração de Status";
                      iconColor = "text-rose-400 bg-rose-500/10 border border-rose-500/20";
                      IconComponent = Activity;
                    } else if (evt.type === "ai_suggestion") {
                      title = "Sugestão da IA";
                      iconColor = "text-purple-400 bg-purple-500/10 border border-purple-500/20";
                      IconComponent = Sparkles;
                    } else if (evt.type === "note") {
                      title = "Anotação Interna";
                      iconColor = "text-slate-300 bg-slate-500/10 border border-white/10";
                      IconComponent = FileText;
                    } else if (evt.type === "task_completed") {
                      title = "Tarefa Concluída";
                      iconColor = "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20";
                      IconComponent = CheckCircle;
                    }

                    return (
                      <div key={evt.id} className="relative">
                        <div className={`absolute -left-[25px] w-6 h-6 rounded-full flex items-center justify-center ${iconColor} z-10 ring-4 ring-[#0b0b0f]`}>
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <div className="bg-[#111116] border border-white/5 rounded-xl p-4 ml-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${iconColor.split(' ')[0]}`}>{title}</span>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                              <Calendar className="w-3 h-3" />
                              {new Date(evt.created_at).toLocaleDateString('pt-BR')} 
                              <Clock className="w-3 h-3 ml-1" />
                              {new Date(evt.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                          
                          {evt.content && (
                            <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans mt-1">
                              {evt.content}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-6 rounded-2xl text-center space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto" />
            <h3 className="font-bold text-base">Pessoa/Lead não encontrado</h3>
            <p className="text-xs text-slate-400">Não foi possível localizar nenhum registro com o identificador: <span className="font-mono text-white">{routeParam}</span></p>
          </div>
        )}
      </main>
    </div>
  );
}
