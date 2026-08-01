import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "../../lib/supabase";

type Profile = {
  id: string;
  full_name: string;
  affiliate_code: string;
};

export default function MarketAffiliate() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [balance, setBalance] = useState({ available: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    async function fetchAffiliateData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // Redirect to login if not authenticated (Mocking for MVP if needed)
          console.warn("Usuário não logado. Para o MVP, você precisa de um login real ou adaptar esta página.");
          // setLocation("/auth");
          setLoading(false);
          return;
        }

        const { data: profileData } = await supabase
          .from("market_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
          
          // Fetch balance from the view
          const { data: balanceData } = await supabase
            .from("market_affiliate_balances")
            .select("*")
            .eq("affiliate_id", user.id)
            .single();
            
          if (balanceData) {
            setBalance({
              available: Number(balanceData.available_balance || 0),
              pending: Number(balanceData.pending_balance || 0)
            });
          }
        } else {
          // Auto-create profile for testing MVP (normally done via trigger on auth.users)
          const newCode = "AFI-" + Math.random().toString(36).substring(2, 8).toUpperCase();
          const { data: newProfile, error } = await supabase
            .from("market_profiles")
            .insert({
              id: user.id,
              full_name: user.email?.split('@')[0] || "Afiliado",
              role: "affiliate",
              affiliate_code: newCode
            })
            .select()
            .single();
            
          if (newProfile && !error) {
            setProfile(newProfile);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do afiliado:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAffiliateData();
  }, [setLocation]);

  const copyToClipboard = () => {
    if (profile) {
      const link = `${window.location.origin}/market?ref=${profile.affiliate_code}`;
      navigator.clipboard.writeText(link);
      alert("Link copiado! " + link);
    }
  };

  if (loading) return <div className="p-10 text-center">Carregando painel do afiliado...</div>;

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Acesso Restrito</h2>
          <p className="text-slate-600 mb-6">Você precisa estar logado para acessar o painel de afiliados.</p>
          <a href="/auth" className="bg-primary text-white px-6 py-2 rounded font-medium hover:bg-primary/90">
            Fazer Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Painel do Afiliado</h1>
          <a href="/market" className="text-slate-500 hover:text-slate-900 underline">Voltar para o Market</a>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-semibold mb-2">Bem-vindo, {profile.full_name}</h2>
          <p className="text-slate-600 mb-6">Este é o seu painel de controle. Compartilhe seu link exclusivo e ganhe comissões.</p>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Seu Link de Afiliado (KSaaS)</p>
              <code className="text-primary font-mono text-lg">{window.location.origin}/market?ref={profile.affiliate_code}</code>
            </div>
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-slate-800 text-white rounded font-medium hover:bg-slate-700"
            >
              Copiar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Saldo Disponível</h3>
            <p className="text-4xl font-bold text-green-600">R$ {balance.available.toFixed(2).replace('.', ',')}</p>
            <p className="text-sm text-slate-500 mt-2">Pronto para saque</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Saldo Pendente</h3>
            <p className="text-4xl font-bold text-orange-500">R$ {balance.pending.toFixed(2).replace('.', ',')}</p>
            <p className="text-sm text-slate-500 mt-2">Aguardando liberação de garantia</p>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Dicas de Vendas</h3>
          <ul className="list-disc pl-5 text-slate-600 space-y-2">
            <li>Envie seu link para colegas de profissão que precisam de organização.</li>
            <li>Use o <strong>TaxManagers</strong> como porta de entrada para contadores.</li>
            <li>O <strong>ToDeAcordo</strong> é excelente para advogados e mediadores.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
