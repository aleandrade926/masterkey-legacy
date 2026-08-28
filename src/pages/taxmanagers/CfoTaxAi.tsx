import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, BrainCircuit, LineChart, Users, AlertCircle, ShieldCheck, Landmark } from "lucide-react";

export default function CfoTaxAi() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3">
              <img src="/logo-icon.png" className="h-10 w-10 object-contain rounded-lg" alt="Tax Managers Logo" />
              <span className="text-xl font-bold tracking-tight text-slate-900">Tax Managers</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/" className="hover:text-amber-600 transition-colors">Voltar para o Início</a>
          </div>
        </div>
      </nav>

      {/* HEADER / HERO SECTION */}
      <header className="bg-[#1a1a1a] text-slate-50 pb-20 pt-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm font-semibold mb-6 border border-amber-500/20 uppercase tracking-widest">
            <Landmark className="w-4 h-4" />
            <span>Tributar.ia para C-Levels</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight text-white">
            Tax Intelligence para CFOs: <span className="text-amber-500">Ameaça Invisível no CPF.</span>
          </h1>
          <h2 className="text-xl md:text-3xl font-medium text-slate-300 mb-8 max-w-4xl leading-relaxed">
            Blinde o caixa da empresa e a sua responsabilidade solidária contra o "Regime Duplo" de ERPs durante a transição da Reforma Tributária.
          </h2>
          
          <p className="text-lg text-slate-400 mb-10 max-w-3xl leading-relaxed">
            Assuma o controle. Uma metodologia de auditoria acelerada por Inteligência Artificial para CFOs que não podem confiar cegamente em terceiros ou arriscar o próprio patrimônio frente à voracidade do Fisco.
          </p>

          <Button 
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-6 text-lg h-auto rounded-md shadow-lg shadow-amber-900/20 transition-all group"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=5511978671067&text=Olá, quero aplicar para a Mesa Redonda de CFOs sobre o risco da Reforma Tributária.', '_blank')}
          >
            Aplicar para a Turma-Piloto (CFOs)
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        
        {/* PARA QUEM É / NÃO É */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="border-t-4 border-t-amber-500 shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                <ShieldCheck className="text-amber-600" />
                Para quem é este projeto
              </h3>
              <ul className="space-y-4">
                {[
                  "CFOs e C-Levels de empresas Mid-Market e Instituições Financeiras.",
                  "Líderes que compreendem o risco da Responsabilidade Solidária no próprio CPF.",
                  "Executivos preocupados com o 'Regime Duplo' nos ERPs durante a transição de CBS/IBS.",
                  "Diretores que exigem governança e querem auditar entregas de grandes consultorias."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-red-700 shadow-md bg-slate-50">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                <AlertCircle className="text-red-700" />
                Para quem não é
              </h3>
              <ul className="space-y-4">
                {[
                  "Pequenos empresários ou profissionais em início de carreira.",
                  "Quem delega totalmente a estratégia fiscal e não assume a responsabilidade pela governança.",
                  "Quem busca 'fórmulas mágicas' ao invés de estruturação de inteligência corporativa."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* O QUE VOCÊ VAI RECEBER */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">A Estrutura de Inteligência Aplicada</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Como um Ex-Procurador Federal audita e estrutura defesas fiscais — agora modelado em Inteligência Artificial para o seu controle direto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Diagnóstico de Ponto Cego",
                desc: "Análise expressa de cruzamentos ECD/ECF focada em identificar o Risco Solidário imediato da diretoria.",
                icon: <ShieldCheck className="w-6 h-6 text-amber-600" />
              },
              {
                title: "O 'Regime Duplo'",
                desc: "Estruturas de IA prontas para projetar margens em ambientes de transição entre o velho e o novo sistema.",
                icon: <Landmark className="w-6 h-6 text-amber-600" />
              },
              {
                title: "Auditoria Reversa",
                desc: "Frameworks para sabatinar a sua equipe fiscal e suas auditorias externas. Você no comando das perguntas.",
                icon: <LineChart className="w-6 h-6 text-amber-600" />
              },
              {
                title: "Comandos para CFOs",
                desc: "Biblioteca fechada de prompts testados, concebidos com rigor jurídico e foco exclusivo no C-Level.",
                icon: <BrainCircuit className="w-6 h-6 text-amber-600" />
              },
              {
                title: "Blindagem de Caixa",
                desc: "Matriz executiva para classificar contingências passivas e oportunidades ativas de EBITDA.",
                icon: <CheckCircle2 className="w-6 h-6 text-amber-600" />
              },
              {
                title: "Networking Restrito",
                desc: "Troca confidencial de experiências em um grupo seleto de CFOs (Mesa Redonda via Zoom).",
                icon: <Users className="w-6 h-6 text-amber-600" />
              }
            ].map((item, i) => (
              <Card key={i} className="bg-white hover:border-amber-500/50 transition-colors border-slate-200">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* BÔNUS & FORMATO */}
        <section className="bg-[#111111] text-white rounded-2xl p-8 md:p-12 mb-20 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-900/30 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="border-b border-white/10 pb-8 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-amber-500">A Turma-Piloto: Mesa Redonda C-Level</h3>
              <p className="text-slate-300 mb-6 max-w-3xl leading-relaxed">
                Este é um projeto prático e confidencial de <strong>6 semanas</strong>. Trabalharemos em um "War Room" online com <strong>3 a 5 CFOs</strong>, garantindo o mais alto nível de debate estratégico sobre a transição tributária e o papel da Inteligência Artificial na preservação do caixa.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-amber-500 text-sm font-semibold mb-1 uppercase tracking-wider">Duração</p>
                  <p className="font-bold text-lg">6 Semanas</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-amber-500 text-sm font-semibold mb-1 uppercase tracking-wider">Encontros</p>
                  <p className="font-bold text-lg">4 Sessões Fechadas</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-amber-500 text-sm font-semibold mb-1 uppercase tracking-wider">Comitê</p>
                  <p className="font-bold text-lg">Máx. 5 CFOs</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-white">Vantagens Exclusivas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-amber-400 mb-2">✦ Comunidade VIP WhatsApp</h4>
                <p className="text-slate-400 text-sm">Acesso direto a um grupo restrito de diretores financeiros e ao Ex-Procurador Federal responsável pela metodologia.</p>
              </div>
              <div>
                <h4 className="font-bold text-amber-400 mb-2">✦ Passe Duplo (CFO + Controller)</h4>
                <p className="text-slate-400 text-sm">Sua aplicação garante o acesso gratuito para o líder operacional da sua confiança (Controller ou Head Fiscal) para garantir a execução.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Aja antes do risco bater na porta.</h2>
          <p className="text-slate-600 mb-8 text-lg">
            A Reforma Tributária não perdoa inércia. Clique abaixo para pleitear a sua vaga. Faremos um diagnóstico expresso de viabilidade antes de aprovar a sua participação no comitê.
          </p>
          <Button 
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-10 py-7 text-xl h-auto rounded-md shadow-xl shadow-amber-900/20 transition-all w-full md:w-auto uppercase tracking-wide"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=5511978671067&text=Olá, desejo submeter minha aplicação para a Mesa Redonda Tax Intelligence.', '_blank')}
          >
            Submeter Aplicação C-Level
          </Button>
          <p className="mt-6 text-sm text-slate-500">
            *Sujeito a aprovação de perfil. Confidencialidade corporativa (NDA) garantida na primeira sessão.
          </p>
        </section>
        
      </main>

      <footer className="bg-[#0a0a0a] text-slate-500 py-8 text-center text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} TaxManagers. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
