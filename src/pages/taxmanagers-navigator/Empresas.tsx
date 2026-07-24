import { useParams, Link } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Empresas() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      supabase.from('taxmanagers_companies').select('*').eq('id', id).single().then(({data}) => setData(data));
    }
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Visão de Empresa</h1>
      {data ? (
        <div className="bg-white p-4 rounded shadow space-y-2">
          <p><strong>Razão Social:</strong> {data.razao_social}</p>
          <p><strong>Nome Fantasia:</strong> {data.nome_fantasia}</p>
          <p><strong>CNPJ:</strong> {data.cnpj}</p>
        </div>
      ) : <p>Carregando...</p>}
      <div className="mt-4 flex gap-4">
        <Link href="/taxmanagers/pessoas/novo">
          <span className="text-blue-500 hover:underline cursor-pointer">+ Adicionar Pessoa/Lead</span>
        </Link>
        <Link href={`/taxmanagers/negocios/novo?company_id=${id}`}>
          <span className="text-blue-500 hover:underline cursor-pointer">+ Criar Negócio</span>
        </Link>
      </div>
    </div>
  );
}
