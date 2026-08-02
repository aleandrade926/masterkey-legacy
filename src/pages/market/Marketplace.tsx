import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { supabase } from "../../lib/supabase";

type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  benefits: string[];
  price: number;
  commission_rate: number;
  access_link: string;
  is_active: boolean;
};

// Fallback products (Mock data in case DB is not set up yet)
const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "ToDeAcordo",
    description: "Plataforma de Acordos e Resolução de Conflitos Online.",
    image_url: "https://via.placeholder.com/150",
    benefits: ["Acordos com validade jurídica", "Economia de tempo", "Sem necessidade de ir ao fórum"],
    price: 97.00,
    commission_rate: 30.00,
    access_link: "#",
    is_active: true,
  },
  {
    id: "prod-2",
    name: "TaxManagers",
    description: "CRM Inteligente e Agentes IA para Tributaristas e Contadores.",
    image_url: "https://via.placeholder.com/150",
    benefits: ["Prospecção Automática", "Teses Tributárias Atualizadas", "Integração PJe"],
    price: 497.00,
    commission_rate: 20.00,
    access_link: "#",
    is_active: true,
  },
  {
    id: "prod-3",
    name: "Mestre das Teclas",
    description: "Curso de Digitação Acelerada e Produtividade.",
    image_url: "https://via.placeholder.com/150",
    benefits: ["Aumente sua produtividade em 3x", "Aprenda a digitar sem olhar para o teclado", "Exercícios práticos e gamificados"],
    price: 47.00,
    commission_rate: 50.00,
    access_link: "#",
    is_active: false,
  },
  {
    id: "prod-4",
    name: "Fake Door Chargeback",
    description: "Sistema inteligente de prevenção de Chargebacks.",
    image_url: "https://via.placeholder.com/150",
    benefits: ["Redução de disputas", "Análise de fraude IA", "Relatórios gerenciais"],
    price: 197.00,
    commission_rate: 25.00,
    access_link: "#",
    is_active: false,
  },
  {
    id: "prod-5",
    name: "TáMarcado",
    description: "Sistema inteligente de agendamento de reuniões sincronizado com sua agenda.",
    image_url: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?auto=format&fit=crop&q=80&w=300&h=200",
    benefits: ["Página pública de agendamento", "Fuso horário automático", "Design responsivo premium"],
    price: 49.00,
    commission_rate: 40.00,
    access_link: "/market/tamarcado",
    is_active: true,
  }
];

export default function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [location] = useLocation();

  useEffect(() => {
    // Check for ?ref= URL param
    const searchParams = new URLSearchParams(window.location.search);
    const refCode = searchParams.get('ref');
    
    if (refCode) {
      // Store in localStorage so when the user clicks 'buy', we know who referred them
      localStorage.setItem('market_ref', refCode);
      console.log("Rastreamento afiliado salvo:", refCode);
    }

    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('market_products')
          .select('*')
          .eq('is_active', true);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Garante que o TáMarcado sempre apareça mesmo se não estiver no DB ainda
          const hasTamarcado = data.some(p => p.id === 'prod-5' || p.name === 'TáMarcado');
          if (!hasTamarcado) {
            const tamarcado = MOCK_PRODUCTS.find(p => p.name === 'TáMarcado');
            if (tamarcado) data.push(tamarcado);
          }
          setProducts(data);
        } else {
          setProducts(MOCK_PRODUCTS.filter(p => p.is_active));
        }
      } catch (err) {
        console.warn("Usando produtos mockados:", err);
        setProducts(MOCK_PRODUCTS.filter(p => p.is_active));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            KSaaS - Casa do SaaS
          </h1>
          <p className="mt-4 text-xl text-slate-500">
            Descubra as melhores soluções digitais e impulsione seus negócios.
          </p>
          <div className="mt-6 flex justify-center gap-4">
             <Link href="/market/afiliado">
               <button className="px-6 py-2 bg-slate-800 text-white rounded-md font-medium hover:bg-slate-700 transition">
                 Área do Afiliado
               </button>
             </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-slate-500">Carregando produtos...</div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                <div className="h-48 bg-slate-200 w-full flex items-center justify-center relative overflow-hidden">
                   {product.image_url ? (
                     <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                   ) : (
                     <span className="text-slate-400 font-medium">Sem Imagem</span>
                   )}
                   <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm backdrop-blur-sm">
                     R$ {product.price.toFixed(2).replace('.', ',')}/mês
                   </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Benefícios</h4>
                    <ul className="space-y-1">
                      {(typeof product.benefits === 'string' ? JSON.parse(product.benefits) : product.benefits)?.map((benefit: string, i: number) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    <Link href={`/market/checkout/${product.id}`}>
                      <button className="w-full py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition shadow-sm">
                        Assinar Agora
                      </button>
                    </Link>
                    <Link href="/market/afiliado">
                      <button className="w-full py-2.5 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-slate-100 transition">
                        Quero Ser Afiliado ({product.commission_rate}% comissão)
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
