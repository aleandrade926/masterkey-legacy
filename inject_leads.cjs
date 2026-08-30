const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Parse .env manually
const envFile = fs.readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let key = match[1].trim();
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.substring(1, val.length - 1);
    }
    envVars[key] = val;
  }
});

const supabaseUrl = envVars['VITE_SUPABASE_URL'];
const supabaseKey = envVars['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltando VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY no arquivo .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const linkedinLeads = [
  { nome: "Vinicius Moreira Dos Santos", cargo: "Head de Controladoria Financeria" },
  { nome: "Tulio Bomfim", cargo: "Controller | CFO | FP&A | Agronegócio & Indústria | Novos Negócios | Estratégia | M&A" },
  { nome: "Rodrigo Keppen", cargo: "CFO" },
  { nome: "Fabio Shigueo Muraki", cargo: "CFO @ Stage" },
  { nome: "Jose Eduardo Moreira", cargo: "CEO na Necta" },
  { nome: "Francisco Mingrone", cargo: "Diretor Suprimentos  Corporativo" },
  { nome: "Marcio Filomeno", cargo: "Head Financeiro | Controladoria | Interin Management | Conselheiro" },
  { nome: "Piero Basile", cargo: "CFO" },
  { nome: "Vanderson Brandão", cargo: "Head of Accounting - Inter" },
  { nome: "Renata Matos", cargo: "Finance & Strategy Executive | Head of Finance & FP&A | P&L Leadership | Governance, Performance & Capital Allocation" },
  { nome: "Gilberto Ribeiro", cargo: "Controller, Gerente de Planejamento, Gerente de Custos, Turnaround" },
  { nome: "Jussara Braga", cargo: "Controller | Gerente de Controladoria | Gerente Contábil | Gerente Financeiro | Contador" },
  { nome: "Rodrigo Margoni", cargo: "Sócio Diretor na Almaromi Alimento Ltda" },
  { nome: "Paulo Germano", cargo: "Controladoria | Controles Internos e Gestão de Riscos | Compliance | Auditoria" },
  { nome: "Cesar Augusto Rovella de Araujo", cargo: "Diretor Financeiro" },
  { nome: "Cássio Vidal dos Santos", cargo: "Gerente de Controladoria, TI e Custos | Dacolonia Alimentos Naturais" },
  { nome: "Pedro Lobo", cargo: "Especialista em Governança para Empresas Familiares | Conselheiro | Criador do Método Empresa Familiar em Ação | Mentoria de Sucessores e Herdeiros" },
  { nome: "Willian Takaki", cargo: "Head of Finance | Finance Director | CFO" },
  { nome: "Dercy Lima das Neves", cargo: "Diretor de Controladoria" },
  { nome: "Almir Cotias Filho", cargo: "CEO / VP Novos Negócios" },
  { nome: "Helio Strato", cargo: "CFO | Diretor Financeiro | Finanças Estratégicas | FP&A | Agronegócio" },
  { nome: "Luciana Matiazzo Martins", cargo: "CFO | Head of Finance | Finance Director | Gerente Financeiro Sênior | Estratégia Financeira | FP&A | Controladoria | Tesouraria | Governança | Brasil & LATAM" },
  { nome: "Julio Cesar Colepicolo", cargo: "Diretor Financeiro | Executivo de Finanças" },
  { nome: "Paulo Paz", cargo: "Controller" },
  { nome: "Aleksandro Paccola", cargo: "Gerente Financeiro | Controller | Business Controller | Gerente de FP&A | Finance | Business Partner | Cash Flow | ESG | CRC" },
  { nome: "Derli Halberstadt", cargo: "Controller | CFO | Head of Finance | Diretor Administrativo Financeiro | Gerente Contábil | Gerente de Controladoria | Gerente Financeiro | Agronegócio |" },
  { nome: "Dermeval Filho", cargo: "CFO - Chief Financial Officer Diretor Adm/Finaceiro" },
  { nome: "Alex Souza", cargo: "CFO | Diretor Financeiro | Head de Finanças | Planejamento Estratégico, Orçamento, KPIs Financeiros, Gestão de Custos & Compliance" },
  { nome: "Mariana André", cargo: "Head of Tax na Neon | MBA em Finanças" },
  { nome: "Juliana de Los Angeles", cargo: "Executiva Financeira | CFO | Controladoria Financeira | Gerente Executiva de Finanças | Diretora e Mentora W-CFO Brazil | Alumni Conselheira 101 | Associada IBEF-MG | Coautora do livro Woman Experience" }
];

async function run() {
  const { data: existingLeads, error } = await supabase
    .from('taxmanagers_leads')
    .select('nome')
    .in('nome', linkedinLeads.map(l => l.nome));
  
  if (error) {
    console.error("Erro ao buscar leads:", error.message);
    process.exit(1);
  }

  const existingNames = new Set(existingLeads.map(l => l.nome));
  console.log("Leads que já estão no banco:", Array.from(existingNames).join(', '));
  
  const newLeads = linkedinLeads.filter(l => !existingNames.has(l.nome));
  console.log(`Encontrados ${newLeads.length} leads novos.`);

  if (newLeads.length > 0) {
    const recordsToInsert = newLeads.map(l => ({
      nome: l.nome,
      cargo: l.cargo,
      import_status: 'quarantine',
      origem: 'LinkedIn'
    }));

    const { data, error: insertError } = await supabase
      .from('taxmanagers_leads')
      .insert(recordsToInsert);

    if (insertError) {
      console.error("Erro ao inserir:", insertError.message);
    } else {
      console.log("Leads inseridos com sucesso!");
    }
  }
}

run();
