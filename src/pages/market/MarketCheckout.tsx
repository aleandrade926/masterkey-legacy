import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { supabase } from "../../lib/supabase";

export default function MarketCheckout() {
  const { id: productId } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  
  useEffect(() => {
    // Busca os dados do produto no banco mock ou real
    async function fetchProduct() {
      const { data } = await supabase.from('market_products').select('*').eq('id', productId).single();
      if (data) {
        setProduct(data);
      } else {
        // Fallback para testar sem banco preenchido
        const mockProducts = [
          {
            id: "prod-1",
            name: "ToDeAcordo",
            price: 97.00,
            commission_rate: 30.00,
            access_link: "#"
          },
          {
            id: "prod-2",
            name: "TaxManagers",
            price: 497.00,
            commission_rate: 20.00,
            access_link: "#"
          },
          {
            id: "prod-5",
            name: "TáMarcado",
            price: 49.00,
            commission_rate: 40.00,
            access_link: "/market/tamarcado"
          }
        ];
        const mockProduct = mockProducts.find(p => p.id === productId);
        setProduct(mockProduct || {
          id: productId,
          name: "SaaS Premium",
          price: 97.00,
          commission_rate: 30.00,
          access_link: "#"
        });
      }
    }
    if (productId) fetchProduct();
  }, [productId]);

  const handleSimulateSale = async () => {
    setLoading(true);
    try {
      const refCode = localStorage.getItem('market_ref');
      let affiliateId = null;
      
      // Se tiver refCode, descobre quem é o afiliado
      if (refCode) {
        const { data: afData } = await supabase
          .from('market_profiles')
          .select('id')
          .eq('affiliate_code', refCode)
          .single();
          
        if (afData) {
          affiliateId = afData.id;
        }
      }

      // Calcula a comissão
      const commissionAmount = (product.price * (product.commission_rate / 100)).toFixed(2);

      // Registra a venda (Simulando um webhook de pagamento aprovado)
      const { error } = await supabase.from('market_sales').insert({
        product_id: product.id,
        affiliate_id: affiliateId,
        amount: product.price,
        commission_amount: commissionAmount,
        status: 'approved'
      });
      
      if (error) {
        console.error("Erro ao registrar venda no supabase:", error);
      }

      alert("Venda Simulada com Sucesso! " + (affiliateId ? `Comissão gerada para o afiliado.` : "Nenhum afiliado atribuído."));
      if (product.access_link && product.access_link !== "#") {
        setLocation(product.access_link);
      } else {
        setLocation("/market");
      }

    } catch (err) {
      console.error(err);
      alert("Erro ao simular venda.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="p-10 text-center">Carregando Checkout...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-slate-800 p-6 text-center text-white">
          <h2 className="text-2xl font-bold">Checkout Simulado</h2>
          <p className="text-slate-300">Ambiente de MVP</p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
              <p className="text-sm text-slate-500">Assinatura Mensal</p>
            </div>
            <div className="text-xl font-bold text-green-600">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </div>
          </div>
          
          <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-lg mb-6">
            <p><strong>Aviso:</strong> Este é apenas um teste de fluxo. Ao clicar em comprar, o sistema registrará uma venda fictícia e calculará a comissão ({product.commission_rate}%) automaticamente caso você tenha vindo por um link de afiliado.</p>
          </div>

          <button 
            onClick={handleSimulateSale}
            disabled={loading}
            className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition shadow-sm disabled:opacity-50"
          >
            {loading ? "Processando..." : "Simular Pagamento Aprovado"}
          </button>
          
          <div className="mt-4 text-center">
            <button onClick={() => setLocation("/market")} className="text-slate-500 hover:text-slate-700 underline text-sm">
              Cancelar e Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
