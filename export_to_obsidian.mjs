import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://mqncmwtgpoflbbscrelp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbmNtd3RncG9mbGJic2NyZWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2Mjk3ODUsImV4cCI6MjA5MDIwNTc4NX0.veEeqzcSk2FTx8sYI1i9MKRbuzXhpfgk9XG-zJzXA7g';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const outputDir = 'C:\\Users\\Alexandre\\OneDrive\\Documentos\\Obsidian Vault\\TaxManagers_NotebookLM';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function escapeCsv(str) {
  if (str === null || str === undefined) return '""';
  const val = String(str).replace(/"/g, '""').replace(/\r?\n/g, ' ');
  return `"${val}"`;
}

async function runExport() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (email && password) {
    console.log(`🔑 Efetuando login no Supabase como ${email}...`);
    const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({ email, password });
    if (authErr) {
      console.error('❌ Erro na autenticação:', authErr.message);
      return;
    }
    console.log('✅ Autenticado com sucesso!');
  } else {
    console.log('⚠️ Nenhum login fornecido. Executando como anônimo (caso o RLS permita)...');
  }

  console.log('🔄 Iniciando exportação de dados do Supabase para o Obsidian...');

  // 1. Buscar Leads Ativos (Não quarentena)
  console.log('📦 Buscando Leads Ativos...');
  const { data: activeLeads, error: activeErr } = await supabase
    .from('taxmanagers_leads')
    .select('*')
    .neq('import_status', 'quarantine');

  if (activeErr) console.error('Erro ao buscar leads ativos:', activeErr.message);
  console.log(`✅ Leads ativos encontrados: ${activeLeads?.length || 0}`);

  // 2. Buscar Interações (Timeline)
  console.log('💬 Buscando Histórico de Interações/Timeline...');
  const { data: interactions, error: interErr } = await supabase
    .from('taxmanagers_interactions')
    .select('*')
    .order('created_at', { ascending: false });

  if (interErr) console.error('Erro ao buscar interações:', interErr.message);
  console.log(`✅ Interações encontradas: ${interactions?.length || 0}`);

  // 3. Buscar Tarefas
  console.log('📋 Buscando Fila de Tarefas...');
  const { data: tasks, error: taskErr } = await supabase
    .from('taxmanagers_tasks')
    .select('*')
    .order('due_at', { ascending: true });

  if (taskErr) console.error('Erro ao buscar tarefas:', taskErr.message);
  console.log(`✅ Tarefas encontradas: ${tasks?.length || 0}`);

  // Mapear interações por lead
  const interactionsByLead = {};
  if (interactions) {
    interactions.forEach(i => {
      if (!interactionsByLead[i.lead_id]) interactionsByLead[i.lead_id] = [];
      interactionsByLead[i.lead_id].push(i);
    });
  }

  // Gerar CSV 1: Leads Ativos e Interações
  const activeCsvRows = [
    ['ID', 'Nome', 'Cargo', 'Empresa', 'Email', 'Telefone', 'Status', 'Qtd_Interacoes', 'Ultima_Interacao', 'Historico_Timeline'].map(escapeCsv).join(',')
  ];

  if (activeLeads) {
    activeLeads.forEach(l => {
      const leadInteractions = interactionsByLead[l.id] || [];
      const qtdInteractions = leadInteractions.length;
      const lastInteraction = qtdInteractions > 0 ? leadInteractions[0].created_at : '';
      const timelineText = leadInteractions.map(i => `[${new Date(i.created_at).toLocaleDateString('pt-BR')} ${i.type}]: ${i.content}`).join(' | ');

      activeCsvRows.push([
        l.id,
        l.nome || '',
        l.cargo || '',
        l.empresa || '',
        l.email || '',
        l.telefone || '',
        l.import_status || 'active',
        qtdInteractions,
        lastInteraction,
        timelineText
      ].map(escapeCsv).join(','));
    });
  }

  const file1Path = path.join(outputDir, '01_Leads_Ativos_E_Interacoes.csv');
  fs.writeFileSync(file1Path, activeCsvRows.join('\n'), 'utf-8');
  console.log(`📄 Salvo: ${file1Path}`);

  // Gerar CSV 3: Todas as Tarefas
  const tasksCsvRows = [
    ['ID', 'Titulo', 'Descricao', 'Tipo', 'Canal', 'Lead_ID', 'Data_Vencimento', 'Status', 'Data_Conclusao'].map(escapeCsv).join(',')
  ];

  if (tasks) {
    tasks.forEach(t => {
      tasksCsvRows.push([
        t.id,
        t.title || '',
        t.description || '',
        t.type || '',
        t.channel || '',
        t.lead_id || '',
        t.due_at || '',
        t.status || '',
        t.completed_at || ''
      ].map(escapeCsv).join(','));
    });
  }

  const file3Path = path.join(outputDir, '03_Todas_As_Tarefas.csv');
  fs.writeFileSync(file3Path, tasksCsvRows.join('\n'), 'utf-8');
  console.log(`📄 Salvo: ${file3Path}`);

  // 4. Buscar Leads de Quarentena em lotes de 1000
  console.log('📦 Buscando Leads em Quarentena (lotes)...');
  let quarantineLeads = [];
  let page = 0;
  const pageSize = 1000;
  let hasMore = true;

  while (hasMore && page < 20) {
    const { data: pageLeads, error: qErr } = await supabase
      .from('taxmanagers_leads')
      .select('id, nome, cargo, empresa, email, telefone, import_status')
      .eq('import_status', 'quarantine')
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (qErr) {
      console.error('Erro na paginação de quarentena:', qErr.message);
      break;
    }

    if (pageLeads && pageLeads.length > 0) {
      quarantineLeads = quarantineLeads.concat(pageLeads);
      console.log(`   Carregados ${quarantineLeads.length} leads de quarentena...`);
      page++;
      if (pageLeads.length < pageSize) hasMore = false;
    } else {
      hasMore = false;
    }
  }

  const quarantineCsvRows = [
    ['ID', 'Nome', 'Cargo', 'Empresa', 'Email', 'Telefone', 'Status'].map(escapeCsv).join(',')
  ];

  quarantineLeads.forEach(l => {
    quarantineCsvRows.push([
      l.id,
      l.nome || '',
      l.cargo || '',
      l.empresa || '',
      l.email || '',
      l.telefone || '',
      l.import_status || 'quarantine'
    ].map(escapeCsv).join(','));
  });

  const file2Path = path.join(outputDir, '02_Base_Geral_Quarentena.csv');
  fs.writeFileSync(file2Path, quarantineCsvRows.join('\n'), 'utf-8');
  console.log(`📄 Salvo: ${file2Path}`);

  // 5. Gerar Dicionário e Manual de Regras em Markdown
  const docMd = `# Manual de Inteligência e Regras de Negócio — Tax Managers CRM

## Visão Geral do Sistema
O **Tax Managers** é uma plataforma de inteligência preditiva e outreach tributário focada em abordar decisores de alto nível (como CFOs, Diretores Financeiros e Gerentes Fiscais).

### Princípios da Estratégia de Vendas:
1. **Cadência de Touchpoints**: Cada lead necessita de **7 a 13 touchpoints** estruturados para atingir uma resposta/conversão qualificada.
2. **Proposta Quantificada para CFO**: Não utilizamos gatilhos mentais vazios ou quebras de objeção genéricas. A abordagem é baseada em **99% de certeza e resultados quantificados** de recuperação/otimização tributária para o CFO.
3. **Divisão de Base (Ativos vs. Quarentena)**:
   - **Ativos**: Leads em processo de outreach ativo, com tarefas agendadas e histórico na timeline.
   - **Quarentena**: Base fria de volumetria (cerca de 18.000 leads) que são aquecidos e engajados progressivamente.

## Estrutura dos Arquivos da Base de Dados (para NotebookLM)

### 1. \`01_Leads_Ativos_E_Interacoes.csv\`
Contém todos os leads que estão fora da quarentena, acompanhados de:
- Informações de perfil (Nome, Cargo, Empresa, Contatos).
- Quantidade total de interações.
- Histórico completo de mensagens e notas registradas na timeline.

### 2. \`02_Base_Geral_Quarentena.csv\`
Contém a base completa de prospecção fria (~18.000 registros), utilizada para pesquisas de mercado, cruzamento por segmento de empresa ou localização.

### 3. \`03_Todas_As_Tarefas.csv\`
Lista de todas as tarefas de follow-up, ligações, e-mails e reuniões agendadas ou concluídas no pipeline da Operação Hoje (V1 e V2).

---
*Gerado automaticamente em ${new Date().toLocaleString('pt-BR')} pelo sistema Tax Managers.*
`;

  const file4Path = path.join(outputDir, '04_Dicionario_E_Regras_Negocio.md');
  fs.writeFileSync(file4Path, docMd, 'utf-8');
  console.log(`📄 Salvo: ${file4Path}`);

  console.log('\n🎉 EXPORTAÇÃO CONCLUÍDA COM SUCESSO!');
  console.log(`📁 Os arquivos estão salvos na pasta do Obsidian:\n${outputDir}`);
}

runExport().catch(console.error);
