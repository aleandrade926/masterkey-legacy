import { useParams, Link, useSearch } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Oportunidades() {
  const { id } = useParams();
  const search = useSearch();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id && id !== 'novo') {
      supabase.from('taxmanagers_oportunidades').select('*').eq('id', id).single().then(({data}) => setData(data));
    }
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Visão de Oportunidade</h1>
      {id === 'novo' ? (
         <div className="bg-white p-4 rounded shadow space-y-2">
           <p>Formulário de nova oportunidade. Params: {search}</p>
           <button className="bg-blue-500 text-white px-4 py-2 rounded">Salvar Fictício</button>
         </div>
      ) : data ? (
        <div className="bg-white p-4 rounded shadow space-y-2">
          <p><strong>Classificação:</strong> {data.classificacao}</p>
          <p><strong>Mecanismo:</strong> {data.mecanismo}</p>
        </div>
      ) : <p>Carregando...</p>}
      <div className="mt-4 flex gap-4">
        <Link href={`/taxmanagers/entregas/novo?oportunidade_id=${id}`}>
          <span className="text-blue-500 hover:underline cursor-pointer">+ Adicionar Entrega/Dossiê</span>
        </Link>
      </div>
    </div>
  );
}
