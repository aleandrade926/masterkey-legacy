import { useParams, Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { normalizeSlug, validateSlugFormat, checkSlugAvailability, generateUniqueSlug } from "../../lib/taxmanagers/slug-utils";

export default function Pessoas() {
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

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Visão de Pessoa (Lead)</h1>
        {data?.slug && (
          <Link href={`/p/${data.slug}`}>
            <span className="text-xs font-mono bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full border border-blue-200 hover:underline cursor-pointer">
              /p/{data.slug}
            </span>
          </Link>
        )}
      </div>

      {loading ? (
        <p className="text-slate-500">Carregando dados da pessoa...</p>
      ) : routeParam === "novo" ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
          <p className="font-medium text-slate-700">Formulário de Nova Pessoa (Mock)</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition">
            Salvar Fictício
          </button>
        </div>
      ) : data ? (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-3">
            <p className="text-sm"><strong className="text-slate-600">ID Interno (UUID):</strong> <span className="font-mono text-slate-500">{data.id}</span></p>
            <p className="text-sm"><strong className="text-slate-600">Nome:</strong> {data.nome || "-"}</p>
            <p className="text-sm"><strong className="text-slate-600">Cargo:</strong> {data.cargo || "-"}</p>
            <p className="text-sm"><strong className="text-slate-600">Empresa Legacy:</strong> {data.empresa || "-"}</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <span>🔗</span> URL Amigável / Perfil Público
            </h2>
            <p className="text-xs text-slate-500">
              Personalize o link público da pessoa. O UUID interno permanecerá inalterado.
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">/p/</span>
              <input
                type="text"
                value={slugInput}
                onChange={(e) => setSlugInput(e.target.value)}
                placeholder="ex: alexandre-florio"
                className="flex-1 text-sm font-mono border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSaveSlug}
                disabled={savingSlug}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs px-4 py-2 rounded font-medium disabled:opacity-50 transition"
              >
                {savingSlug ? "Salvando..." : "Salvar Slug"}
              </button>
            </div>

            {slugInput && (
              <p className="text-xs text-slate-500">
                Prévia: <span className="font-mono text-blue-600">/p/{normalizeSlug(slugInput)}</span>
              </p>
            )}

            {slugStatus && (
              <div className={`p-3 rounded text-xs font-medium ${slugStatus.isError ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
                {slugStatus.message}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Link href={`/taxmanagers/negocios/novo?lead_id=${data.id}`}>
              <span className="inline-block bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded text-xs font-medium cursor-pointer transition">
                + Criar Negócio para esta Pessoa
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 text-red-700 p-4 rounded border border-red-200 text-sm">
          Pessoa/Lead não encontrado com o identificador: <strong>{routeParam}</strong>
        </div>
      )}
    </div>
  );
}
