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
            Tax Intelligence para CFOs: <span className="text-amber-500">O Controle da Transição.</span>
          </h1>
          <h2 className="text-xl md:text-3xl font-medium text-slate-300 mb-8 max-w-4xl leading-relaxed">
            Blinde o caixa e a margem operacional da sua empresa contra os impactos sistêmicos da Reforma Tributária.
          </h2>
          
          <p className="text-lg text-slate-400 mb-10 max-w-3xl leading-relaxed">
            Uma metodologia de auditoria e diagnóstico acelerada por Inteligência Artificial. Estruture governança e traduza o caos fiscal em decisões de EBITDA, sem depender de "caixas pretas" de terceiros.
          </p>

          <Button 
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-6 text-lg h-auto rounded-md shadow-lg shadow-amber-900/20 transition-all group"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=5511978671067&text=Olá, quero agendar meu Diagnóstico de Ponto Cego sobre a Reforma Tributária.', '_blank')}
          >
            Agendar Diagnóstico de Ponto Cego
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
                  "Líderes focados em proteger margem e caixa durante a transição de CBS/IBS.",
                  "Executivos que desejam mapear oportunidades ocultas antes que virem passivos.",
                  "Diretores que exigem governança e querem auditar entregas de consultorias."
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
                  "Pequenos empresários ou operações que não possuem complexidade fiscal.",
                  "Quem busca 'fórmulas mágicas' ao invés de diagnósticos baseados em dados reais.",
                  "Empresas que delegam integralmente a estratégia sem intenção de criar governança interna."
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
              Como um Ex-Procurador Federal e Especialistas Fiscais desenham soluções de alto impacto, agora alavancados por IA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Diagnóstico de Ponto Cego",
                desc: "Análise expressa de cruzamentos focada em mapear ineficiências e riscos na sua estrutura tributária atual.",
                icon: <ShieldCheck className="w-6 h-6 text-amber-600" />
              },
              {
                title: "Projeção de Cenários",
                desc: "Clareza sobre o impacto do novo regime fiscal nas margens dos seus principais produtos e serviços.",
                icon: <Landmark className="w-6 h-6 text-amber-600" />
              },
              {
                title: "Auditoria Reversa",
                desc: "Frameworks para sabatinar a sua equipe fiscal e suas auditorias externas. Você no comando das perguntas.",
                icon: <LineChart className="w-6 h-6 text-amber-600" />
              },
              {
                title: "Comandos para CFOs",
                desc: "Biblioteca de prompts e processos concebidos com rigor jurídico e foco exclusivo no controle do C-Level.",
                icon: <BrainCircuit className="w-6 h-6 text-amber-600" />
              },
              {
                title: "Plano de Execução",
                desc: "Mapeamento das contingências passivas e oportunidades ativas, priorizadas por impacto direto no EBITDA.",
                icon: <CheckCircle2 className="w-6 h-6 text-amber-600" />
              },
              {
                title: "Comunidade C-Level",
                desc: "Acesso futuro a debates e networking qualificado com CFOs lidando com a mesma transição de mercado.",
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
              <h3 className="text-2xl font-bold mb-4 text-amber-500">O Primeiro Passo: Diagnóstico Consultivo</h3>
              <p className="text-slate-300 mb-6 max-w-3xl leading-relaxed">
                Nosso ponto de partida é prático e direto ao ponto. Através de um Diagnóstico de Ponto Cego (Sessão Estratégica de 15 minutos), mapeamos o cenário atual da sua empresa frente à Reforma e desenhamos um plano de ação claro, focado em <strong>preservação de margem e caixa</strong>.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-white">Os Próximos Passos</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-amber-400 mb-2">✦ Imersão Prática</h4>
                <p className="text-slate-400 text-sm">Caminho claro para evolução onde desenhamos a metodologia diretamente na rotina do seu negócio.</p>
              </div>
              <div>
                <h4 className="font-bold text-amber-400 mb-2">✦ Consultoria Premium</h4>
                <p className="text-slate-400 text-sm">Opção de delegar a execução de teses avançadas de recuperação e estruturação com nossos especialistas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Mapeie seus riscos antes do mercado.</h2>
          <p className="text-slate-600 mb-8 text-lg">
            A Reforma Tributária exige movimento antecipado. Agende seu diagnóstico rápido para avaliarmos a viabilidade de implementação do plano de inteligência no seu cenário.
          </p>
          <Button 
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-10 py-7 text-xl h-auto rounded-md shadow-xl shadow-amber-900/20 transition-all w-full md:w-auto uppercase tracking-wide"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=5511978671067&text=Olá, desejo agendar meu Diagnóstico de Ponto Cego inicial.', '_blank')}
          >
            Agendar Diagnóstico Inicial
          </Button>
          <p className="mt-6 text-sm text-slate-500">
            *Confidencialidade corporativa garantida. 
          </p>
        </section>
        
      </main>

      <footer className="bg-[#0a0a0a] text-slate-500 py-8 text-center text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} TaxManagers. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
