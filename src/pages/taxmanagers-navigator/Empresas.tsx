import { useParams, Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { normalizeSlug, validateSlugFormat, checkSlugAvailability, generateUniqueSlug } from "../../lib/taxmanagers/slug-utils";
import { Building, ExternalLink, Sparkles, ArrowLeft, CheckCircle, AlertCircle, Link as LinkIcon } from "lucide-react";

export default function Empresas() {
  const [location] = useLocation();
  const params = useParams();
  
  const pathParts = location.split("/").filter(Boolean);
  const routeParam = params.id || params.slug || pathParts[pathParts.length - 1];

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [slugInput, setSlugInput] = useState("");
  const [slugStatus, setSlugStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [savingSlug, setSavingSlug] = useState(false);

  useEffect(() => {
    if (!routeParam || routeParam === "novo") {
      setLoading(false);
      return;
    }

    setLoading(true);
    const isUuid = /^[0-9a-fA-F-]{36}$/.test(routeParam);

    let query = supabase.from("taxmanagers_companies").select("*");
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
        const companyName = record.nome_fantasia || record.razao_social || record.name || "empresa";
        const suggested = await generateUniqueSlug("taxmanagers_companies", companyName, record.id);
        setSlugInput(suggested);
      }
      setLoading(false);
    });
  }, [routeParam, location]);

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

    const { available, error: availError } = await checkSlugAvailability("taxmanagers_companies", cleanSlug, data.id);
    if (!available) {
      setSlugStatus({ message: availError || "Slug indisponível.", isError: true });
      setSavingSlug(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("taxmanagers_companies")
      .update({ slug: cleanSlug })
      .eq("id", data.id);

    if (updateError) {
      setSlugStatus({ message: `Erro ao salvar: ${updateError.message}`, isError: true });
    } else {
      setData({ ...data, slug: cleanSlug });
      setSlugStatus({ message: "URL Amigável da empresa atualizada com sucesso!", isError: false });
    }
    setSavingSlug(false);
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
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest block -mt-1 font-mono">Navigator • Perfil de Empresa</span>
            </div>
          </div>

          <Link href="/taxmanagers/app?tab=leads">
            <span className="px-4 py-2 rounded-lg bg-[#111116] border border-white/10 hover:bg-white/5 text-slate-300 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel
            </span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            <p className="text-slate-400 text-sm">Carregando dados da empresa...</p>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Header da Empresa */}
            <div className="bg-[#0b0b0f] border border-white/5 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg">
                    <Building className="w-7 h-7" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">{data.razao_social || data.name || "Empresa Sem Nome"}</h1>
                    <p className="text-sm text-cyan-400 font-medium mt-0.5">{data.nome_fantasia || "Nome fantasia não informado"}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      CNPJ: <span className="font-mono text-slate-300">{data.cnpj || "Não informado"}</span>
                    </p>
                  </div>
                </div>

                {data.slug && (
                  <div className="self-start md:self-center">
                    <a href={`/taxmanagers/company/${data.slug}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-semibold hover:bg-cyan-500/20 transition-all">
                      <span>/taxmanagers/company/{data.slug}</span>
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
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Ficha Cadastral da Empresa
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="bg-[#111116] p-3.5 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">ID Interno (UUID)</span>
                    <span className="font-mono text-slate-300 text-[11px] break-all">{data.id}</span>
                  </div>
                  <div className="bg-[#111116] p-3.5 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Setor / Mercado</span>
                    <span className="text-cyan-400 font-bold">{data.setor || "Não informado"}</span>
                  </div>
                </div>
              </div>

              {/* Card de Gestão de URL Amigável */}
              <div className="bg-[#0b0b0f] border border-white/5 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-cyan-400" /> URL Amigável
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Personalize o slug único para o link público da empresa.
                </p>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">Prefix da Rota</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500 bg-[#111116] px-3 py-2 rounded-lg border border-white/5">/taxmanagers/company/</span>
                      <input
                        type="text"
                        value={slugInput}
                        onChange={(e) => setSlugInput(e.target.value)}
                        placeholder="ex: tax-managers"
                        className="flex-1 bg-[#111116] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  {slugInput && (
                    <p className="text-[11px] text-slate-400">
                      Prévia: <span className="font-mono text-cyan-400">/taxmanagers/company/{normalizeSlug(slugInput)}</span>
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
          </div>
        ) : (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-6 rounded-2xl text-center space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto" />
            <h3 className="font-bold text-base">Empresa não encontrada</h3>
            <p className="text-xs text-slate-400">Não foi possível localizar nenhum registro com o identificador: <span className="font-mono text-white">{routeParam}</span></p>
          </div>
        )}
      </main>
    </div>
  );
}
