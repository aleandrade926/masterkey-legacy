import { useParams, Link } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Pessoas() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id && id !== 'novo') {
      supabase.from('taxmanagers_leads').select('*').eq('id', id).single().then(({data}) => setData(data));
    }
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Visão de Pessoa (Lead)</h1>
      {id === 'novo' ? (
         <div className="bg-white p-4 rounded shadow space-y-2">
           <p>Formulário de nova pessoa (Mock)</p>
           <button className="bg-blue-500 text-white px-4 py-2 rounded">Salvar Fictício</button>
         </div>
      ) : data ? (
        <div className="bg-white p-4 rounded shadow space-y-2">
          <p><strong>Nome:</strong> {data.nome}</p>
          <p><strong>Cargo:</strong> {data.cargo}</p>
          <p><strong>Empresa Legacy:</strong> {data.empresa}</p>
        </div>
      ) : <p>Carregando...</p>}
      <div className="mt-4 flex gap-4">
        <Link href={`/taxmanagers/negocios/novo?lead_id=${id}`}>
          <span className="text-blue-500 hover:underline cursor-pointer">+ Criar Negócio</span>
        </Link>
      </div>
    </div>
  );
}
