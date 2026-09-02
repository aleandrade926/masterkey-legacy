import React from 'react';
import { CheckCircle2, ChevronRight, Check, X, ShieldCheck, Landmark, Briefcase, FileSearch, LineChart, AlertTriangle, BrainCircuit, ArrowRight, MonitorPlay, MessageSquare, Users, Sparkles, Scale, DollarSign } from "lucide-react";

export default function CfoTaxAi() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 group">
              <img src="/logo-green.jpg" className="h-10 w-10 object-contain rounded-lg shadow-sm border border-emerald-900/20" alt="Tax Managers Logo" />
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">Tax Managers</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/" className="hover:text-emerald-700 transition-colors font-medium">Voltar para a Página Inicial</a>
          </div>
        </div>
      </nav>

      {/* HEADER / HERO SECTION */}
      <header className="bg-[#1a1a1a] text-slate-50 pb-24 pt-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs md:text-sm font-semibold mb-8 border border-emerald-500/20 uppercase tracking-widest">
            <Landmark className="w-4 h-4" />
            <span>Programa Executivo de Aceleração Fiscal & IA</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 tracking-tight text-white">
            O papel do CFO não é dizer "não" ao crescimento. <br className="hidden md:block" />
            É entender as variáveis para fazer o <span className="text-emerald-400">"sim" parar de pé no caixa.</span>
          </h1>
          
          <h2 className="text-lg md:text-2xl font-normal text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            No Brasil, o tributário não entra depois da estratégia para calcular a conta. Ele entra <strong>antes</strong>, porque define onde operar, onde investir e quanto sobra no EBITDA. Conheça a jornada <strong>Reforma Tributár.IA</strong> para liderar decisões com clareza absoluta e apoio de IA.
          </h2>

          <button 
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-6 text-xl h-auto rounded-lg shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all group w-full md:w-auto"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=5511978671067&text=Olá!%20Sou%20CFO/Líder%20Financeiro%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20Programa%20Reforma%20Tributár.IA.', '_blank')}
          >
            Agendar conversa confidencial no WhatsApp
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-6 text-sm text-slate-400">
            Conversa individual direta de alinhamento com nossa diretoria executiva.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20">
        
        {/* O DILEMA DO CFO (EMPATIA PROFUNDA & DOR REAL) */}
        <section className="mb-24 bg-white rounded-3xl border border-slate-200 p-8 md:p-14 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
          
          <div className="max-w-3xl">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest block mb-2">O Dilema Real da Liderança Financeira</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Proteger a empresa sem apagar o brilho do empreendedor.
            </h2>
            
            <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed">
              <p>
                Nem sempre o papel do CFO é dizer o que o acionista quer ouvir. Mas existe um cuidado fundamental: <strong>não matar o sonho de crescimento do negócio</strong>. Grandes empresas só nasceram porque alguém acreditou em algo que, no início, parecia ousado demais.
              </p>
              <p>
                É isso que diferencia o <strong>CFO que apenas controla</strong> daquele que <strong>realmente participa da estratégia</strong>: não validar tudo cegamente, nem simplesmente dizer "não", mas encontrar o caminho tributário e financeiro para viabilizar a expansão com segurança.
              </p>
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                <p className="text-slate-900 italic">
                  "Com a Reforma Tributária, a complexidade aumentou 10 vezes. Quem tentar resolver tudo em planilhas ou delegar às cegas para consultorias externas ficará refém de jargões e perderá margem. A Reforma Tributár.IA dá ao CFO o comando das decisões com o apoio da Inteligência Artificial."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* O PROBLEMA NÃO É SÓ FISCAL */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">O impacto não é contábil: é no seu EBITDA.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                A Reforma Tributária mexe diretamente na formação de preços, nos contratos de fornecedores, na margem dos produtos e na gestão de caixa.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Você não precisa virar advogado tributarista nem especialista de código de SPED. Você precisa de clareza executiva para:
              </p>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl">
              <ul className="space-y-4">
                {[
                  "Fazer as perguntas certas antes que o contrato seja assinado.",
                  "Avaliar o impacto de IBS e CBS na cadeia de suprimentos.",
                  "Mapear créditos tributários legítimos para injetar caixa imediato.",
                  "Supervisionar consultores e times fiscais sem depender de jargões.",
                  "Apresentar cenários preditivos incontestáveis ao Conselho de Administração."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* O QUE É A REFORMA TRIBUTÁR.IA */}
        <section className="mb-24 bg-emerald-900 text-white rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">O que é o Programa Reforma Tributár.IA?</h2>
            <p className="text-lg text-slate-200 leading-relaxed mb-6">
              A <strong>Reforma Tributár.IA</strong> é uma mentoria executiva e jornada prática da Tax Managers desenhada especificamente para CFOs e Diretores Financeiros. Unimos nossa expertise tributária corporativa de mais de 15 anos com ferramentas proprietárias de IA.
            </p>
            <p className="text-lg text-slate-200 leading-relaxed">
              Você aprende a utilizar agentes de IA para estruturar análises, comparar cenários fiscais complexos, auditar dados em segundos e municiar a mesa de decisão com inteligência preditiva.
            </p>
          </div>
        </section>

        {/* PARA QUEM É / NÃO É */}
        <section className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-emerald-600 shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900">
              <ShieldCheck className="text-emerald-600 w-8 h-8" />
              Para quem é
            </h3>
            <ul className="space-y-4">
              {[
                "CFOs, VPs Financeiros e Diretores de Médias e Grandes Empresas.",
                "Líderes que querem antecipar o impacto da Reforma Tributária no caixa.",
                "Executivos que buscam acelerar decisões usando IA aplicada a dados fiscais reais.",
                "Empresas que desejam capacitar o CFO sozinho ou o CFO com seu braço direito fiscal."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-slate-400 shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900">
              <X className="text-slate-400 w-8 h-8" />
              Para quem NÃO é
            </h3>
            <ul className="space-y-4">
              {[
                "Quem procura apenas aulas teóricas ou cursos acadêmicos genéricos.",
                "Profissionais que buscam soluções mágicas sem validação jurídica séria.",
                "Empresas que não estão dispostas a trabalhar com dados reais no diagnóstico.",
                "Quem acredita que a Reforma Tributária é apenas uma mudança de alíquotas."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* OS 5 PILARES DA JORNADA (FORMULA HIGH TICKET) */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest block mb-2">Estrutura de Entrega</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">A Jornada em 5 Etapas Práticas</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Estruturada para conduzir o CFO da clareza analítica até a implementação prática e recorrente com apoio de IA.
            </p>
          </div>

          <div className="space-y-8">
            {/* 1. Diagnóstico */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <FileSearch className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">1. Diagnóstico Executivo com IA</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Sessão individual preparatória para mapear o cenário da empresa, dúvidas críticas, riscos fiscais ocultos e oportunidades de caixa imediato.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <p className="text-sm text-slate-700"><strong>Entregável:</strong> Raio-X Executivo com prioridades de caixa, mapa de riscos e plano de ação formalizado.</p>
                </div>
              </div>
            </div>

            {/* 2. Plano de Ação */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <LineChart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">2. Plano Estratégico de Cenários</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Organização das prioridades por impacto no EBITDA. A IA é utilizada para modelar cenários comparativos e estruturar as perguntas certas para reuniões com conselhos e tributaristas.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <p className="text-sm text-slate-700"><strong>Entregável:</strong> Matriz de Cenários e Plano Executivo customizado para a empresa.</p>
                </div>
              </div>
            </div>

            {/* 3. Implementação */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MonitorPlay className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">3. Implementação Orientada (Mão na Massa)</h3>
                <p className="text-slate-600 leading-relaxed">
                  Sessões práticas baseadas em um desafio real da empresa. Combinamos método executivo, exemplos reais, exercícios assistidos e auditoria de aplicação.
                </p>
              </div>
            </div>

            {/* 4. Kit de Implementação */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">4. Kit Exclusivo de Ferramentas & Prompts</h3>
                <p className="text-slate-600 mb-4">Materiais para incorporar a IA definitivamente na rotina do seu departamento financeiro:</p>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-emerald-600" /> Modelos de Prompts Fiscais Executivos</li>
                  <li className="flex items-center gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-emerald-600" /> Checklists de Validação Técnica e Riscos</li>
                  <li className="flex items-center gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-emerald-600" /> Matriz de Priorização (Caixa vs. Risco)</li>
                  <li className="flex items-center gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-emerald-600" /> Roteiros de Sabatina para Reuniões Tributárias</li>
                </ul>
              </div>
            </div>

            {/* 5. Acompanhamento */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">5. Acompanhamento & Plantão Consultivo</h3>
                <p className="text-slate-600 leading-relaxed">
                  Canal reservado para destravar dúvidas na execução, revisar relatórios gerados por IA e ajustar os próximos passos com tributaristas seniores.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* MODALIDADES */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Modalidades do Programa</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A jornada se adapta ao nível de envolvimento que você deseja ter com sua equipe na execução.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Modalidade 1: CFO 1:1 */}
            <div className="bg-white border-2 border-emerald-100 rounded-3xl p-10 shadow-lg relative flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Formato Individual • CFO 1:1</h3>
                <p className="text-slate-600 mb-8 min-h-[70px]">
                  Para o CFO que deseja conduzir pessoalmente a análise e dominar a inteligência artificial para liderar a tomada de decisão com máxima confidencialidade.
                </p>
                <div className="space-y-4 mb-8">
                  <p className="font-bold text-slate-900 text-sm uppercase tracking-wider">Inclui:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Diagnóstico executivo individual</li>
                    <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Raio-X Executivo de Riscos & Créditos</li>
                    <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Sessões individuais de mentoria e IA</li>
                    <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Kit Completo de Ferramentas & Prompts</li>
                    <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Acompanhamento individual reservado</li>
                  </ul>
                </div>
              </div>
              <button 
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5511978671067&text=Olá,%20tenho%20interesse%20no%20formato%20Individual%20CFO%201:1%20da%20Reforma%20Tributár.IA.', '_blank')}
                className="w-full py-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-center transition-colors"
              >
                Candidatar-se ao Formato 1:1
              </button>
            </div>

            {/* Modalidade 2: Equipe */}
            <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-10 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-white">Formato Executivo + Time</h3>
                  <Users className="text-emerald-400 w-6 h-6" />
                </div>
                <p className="text-slate-300 mb-8 min-h-[70px]">
                  Para o CFO que deseja capacitar também seus gerentes fiscais, contábeis ou de controladoria na preparação de dados e execução do plano.
                </p>
                <div className="space-y-4 mb-8">
                  <p className="font-bold text-emerald-400 text-sm uppercase tracking-wider">Diferencial:</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    O CFO comanda as diretrizes estratégicas enquanto a equipe participa das oficinas práticas de automação e cruzamento de dados fiscais com IA.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5511978671067&text=Olá,%20tenho%20interesse%20no%20formato%20Executivo%20+%20Equipe%20da%20Reforma%20Tributár.IA.', '_blank')}
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-center transition-colors relative z-10"
              >
                Solicitar Proposta para Time
              </button>
            </div>
          </div>
        </section>

        {/* INVESTIMENTO & GARANTIA */}
        <section className="bg-slate-900 rounded-3xl p-10 md:p-16 mb-24 text-center border border-slate-800 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Investimento</h2>
            <p className="text-slate-300 mb-12 max-w-2xl mx-auto">
              Um programa desenhado para gerar múltiplos retornos sobre o investimento logo na identificação preliminar de oportunidades tributárias.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl text-left backdrop-blur-sm">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-emerald-400">
                  <Briefcase className="w-5 h-5" />
                  Formato Individual (CFO)
                </h4>
                <p className="text-slate-300 text-sm">Investimento: R$ 7.500,00 (Em até 12x no cartão ou à vista via PIX).</p>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl text-left backdrop-blur-sm">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-emerald-400">
                  <Users className="w-5 h-5" />
                  Formato Executivo + Time
                </h4>
                <p className="text-slate-300 text-sm">Proposta personalizada com base no número de participantes da equipe.</p>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 max-w-3xl mx-auto text-left flex gap-6 items-start backdrop-blur-md">
              <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-2">Garantia e Rigor Técnico</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Toda a metodologia é fundamentada em mais de 15 anos de prática tributária corporativa e liderança em projetos de recuperação de créditos e auditoria fiscal de grandes companhias.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Pronto para liderar a decisão fiscal com IA?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Agende uma conversa confidencial para entendermos os desafios específicos da sua empresa.
          </p>
          <button 
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-5 text-xl rounded-xl shadow-xl transition-all"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=5511978671067&text=Olá!%20Gostaria%20de%20agendar%20uma%20conversa%20sobre%20a%20Reforma%20Tributár.IA.', '_blank')}
          >
            Falar com a Diretoria no WhatsApp
          </button>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#111827] text-slate-400 py-12 border-t border-slate-800 text-sm text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Tax Managers. Todos os direitos reservados.</p>
          <p>Inteligência Fiscal e Decisão Estratégica para Líderes Financeiros.</p>
        </div>
      </footer>

    </div>
  );
}
