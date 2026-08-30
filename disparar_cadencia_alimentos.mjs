import { createClient } from '@supabase/supabase-js';

// Inicialize com as suas credenciais reais de produção do CRM/Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function runCampaign() {
  console.log("🚀 Iniciando Motor de Automação de Cadência B2B...");
  console.log("📍 Tese: Engenharia Tributária / Logística CDs (Extrema/ES)");
  console.log("🎯 Setores: Alimentos, Bebidas, Varejo, Distribuição, Logística");

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // 1. EXECUÇÃO DA QUERY (Extração da Volumetria e Lista Qualificada)
  // Utilizamos a tabela taxmanagers_leads e mapeamos os campos em português
  console.log("\nBuscando leads em quarentena no nível de decisão...");
  
  const { data: leads, error: leadsError } = await supabase
    .from('taxmanagers_leads')
    .select('id, nome, empresa, cargo, email, telefone, url, status, chat_history, import_status'); // Busca tudo sem travar no status inicial

  if (leadsError) {
    console.error("Erro ao buscar leads (taxmanagers_leads):", leadsError.message);
    return;
  }

  // 2. Filtra diretamente pelo texto que veio do LinkedIn (Empresa e Cargo)
  const targetKeywords = ['alimento', 'bebida', 'varejo', 'distribui', 'logíst', 'supply'];
  const targetTitles = ['cfo', 'diretor', 'director', 'head', 'controller', 'gerente', 'socio', 'sócio', 'c-level', 'ceo'];

  let qualifiedLeads = (leads || []).filter(lead => {
      const companyName = (lead.empresa || '').toLowerCase();
      const jobTitle = (lead.cargo || '').toLowerCase();
      
      // Checa se a palavra "alimentos" (ou similares) está no nome da empresa ou no cargo
      const hasRightCompany = targetKeywords.some(k => companyName.includes(k) || jobTitle.includes(k));
      
      // Checa se é um cargo de decisão
      const hasRightTitle = targetTitles.some(t => jobTitle.includes(t));
      
      return hasRightCompany && hasRightTitle;
  });

  // Remover leads contatados recentemente (últimos 30 dias)
  const { data: recentInteractions, error: interError } = await supabase
    .from('taxmanagers_interactions')
    .select('lead_id')
    .gte('created_at', thirtyDaysAgo.toISOString());

  if (!interError && recentInteractions) {
    const recentlyContactedIds = new Set(recentInteractions.map(i => i.lead_id));
    qualifiedLeads = qualifiedLeads.filter(lead => !recentlyContactedIds.has(lead.id));
  } else if (interError) {
    console.log("Aviso: Tabela 'taxmanagers_interactions' não encontrada ou erro de permissão. Prosseguindo sem filtro de interações recentes.");
  }

  console.log(`📊 Volumetria Final Extraída: ${qualifiedLeads.length} leads altamente qualificados.`);

  if (qualifiedLeads.length === 0) {
    console.log("Nenhum lead atende aos critérios no momento. Encerrando automação.");
    return;
  }

  // 2. APLICAÇÃO DA CADÊNCIA E 3. REGISTRO AUTOMÁTICO
  for (const lead of qualifiedLeads) {
    console.log(`\n⚙️ Disparando para: ${lead.nome} (${lead.cargo} @ ${lead.empresa})`);
    
    const touchpointMessage = `Olá ${lead.nome}, considerando o atual cenário do seu setor, preparamos um material focado na otimização tributária de rota de CDs (foco em Extrema/ES) e proteção de margem para o fluxo de caixa da ${lead.empresa}. Podemos agendar 10 minutos para falar sobre isso?`;
    
    const timestamp = new Date().toISOString();

    // Inserção na tabela de interações (Timeline)
    const { error: insertInterError } = await supabase.from('taxmanagers_interactions').insert({
      lead_id: lead.id,
      tipo: 'Outbound', // ou interaction_type dependendo do schema exato
      mensagem: touchpointMessage,
      created_at: timestamp
    });

    if (insertInterError) {
      console.log(`Aviso ao inserir interação para ${lead.id}: ${insertInterError.message}`);
    }

    // Atualização do chat_history e do status no próprio lead
    const historyEntry = `[${timestamp}] Outbound - Cadência CD Logística: ${touchpointMessage}\n`;
    const newChatHistory = (lead.chat_history || '') + historyEntry;

    await supabase.from('taxmanagers_leads').update({
      import_status: 'active',
      status: 'Passo 1',
      chat_history: newChatHistory
    }).eq('id', lead.id);

    // Geração da próxima tarefa de follow-up para 3 dias úteis na Fila de Atividades
    const followUpDate = new Date();
    let addDays = 3;
    // Pula fim de semana para contar dias úteis
    while(addDays > 0) {
        followUpDate.setDate(followUpDate.getDate() + 1);
        if(followUpDate.getDay() !== 0 && followUpDate.getDay() !== 6) {
            addDays--;
        }
    }
    
    const { error: taskError } = await supabase.from('taxmanagers_tasks').insert({
      lead_id: lead.id,
      tipo_tarefa: 'Follow-up Cadência', 
      descricao: 'Verificar resposta sobre tese de engenharia tributária (CDs).',
      data_vencimento: followUpDate.toISOString(),
      status: 'Pendente'
    });

    if (taskError) {
      console.log(`Aviso ao criar tarefa para ${lead.id}: ${taskError.message}`);
    }

    console.log(`✅ Touchpoint aplicado e follow-up (3 dias úteis) gerado para o lead ${lead.nome}.`);
  }
  
  console.log("\n✅ Operação de cadência em lote concluída com sucesso!");
}

runCampaign();
