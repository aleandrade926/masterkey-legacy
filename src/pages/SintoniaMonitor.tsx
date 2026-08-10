import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  BarChart3,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Building2,
  TrendingUp,
  FileText,
  Bell,
  Users,
  Zap,
  Lock,
  Clock,
  ChevronDown,
  ChevronUp,
  Star,
  Target,
  Eye,
} from "lucide-react";

/* ────────────────────────────────────────────────────────── */
/*  Sintonia A+ Monitor — Landing Page para Escritórios     */
/* ────────────────────────────────────────────────────────── */

function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById(`counter-${end}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span id={`counter-${end}`} className="tabular-nums">
      {prefix}{count.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-white text-base md:text-lg pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-emerald-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-400 leading-relaxed animate-[fadeIn_0.2s_ease-out]">
          {a}
        </div>
      )}
    </div>
  );
}

export default function SintoniaMonitor() {
  const whatsappNumber = "5511999999999"; // Substituir pelo número real
  const whatsappMessage = encodeURIComponent(
    "Olá! Sou de um escritório contábil e quero saber mais sobre o Sintonia A+ Monitor para monitorar a carteira dos meus clientes no Receita Sintonia."
  );
  const ctaUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#060810] text-slate-300 font-sans selection:bg-emerald-900 selection:text-emerald-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .font-inter { font-family: 'Inter', system-ui, sans-serif; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.15); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.3); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="fixed w-full z-50 bg-[#060810]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white font-inter">
              Sintonia A<span className="text-emerald-400">+</span> Monitor
            </span>
          </div>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600 hover:text-white transition-all text-sm md:text-base font-semibold"
          >
            Quero ser parceiro
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/30 via-[#060810] to-[#060810]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-teal-800/20 via-transparent to-transparent"></div>
        
        {/* Grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/50 border border-red-800/40 text-red-400 text-xs font-semibold uppercase tracking-wider mb-6 md:mb-8">
              <AlertTriangle className="w-3 h-3" />
              <span>3,1 milhões de empresas na faixa D — Jul/2026</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 md:mb-8 font-inter">
              Descubra quantos clientes da sua carteira estão{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 gradient-animate">
                em risco no Receita Sintonia.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 md:mb-10 max-w-3xl">
              Receba um diagnóstico completo da carteira do seu escritório, um plano de monitoramento trimestral e eleve a qualidade da sua entrega.{" "}
              <span className="text-white font-semibold">Atendimento exclusivo para escritórios contábeis.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all group animate-pulse-glow text-base md:text-lg"
              >
                Diagnosticar minha carteira
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all font-semibold text-base md:text-lg"
              >
                Como funciona
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="py-12 md:py-16 border-y border-white/5 bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { value: 10892593, label: "Empresas classificadas", suffix: "", icon: Building2 },
              { value: 3135869, label: "Empresas na faixa D", suffix: "", icon: AlertTriangle },
              { value: 29, label: "% na pior classificação", suffix: "%", icon: TrendingUp },
              { value: 4, label: "Ciclos/ano de atualização", suffix: "x", icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 md:p-6">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mx-auto mb-2 md:mb-3" />
                <div className="text-2xl md:text-4xl font-extrabold text-white mb-1 font-inter">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-600 mt-6 md:mt-8">
            Fonte: Receita Federal do Brasil — Classificação trimestral do Programa Receita Sintonia, julho/2026
          </p>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="py-16 md:py-24 bg-[#060810]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-inter">
              Seu escritório sabe a classificação de cada cliente?
            </h2>
            <p className="text-base md:text-xl text-slate-400 leading-relaxed">
              A Receita Federal classifica trimestralmente todas as PJs do Brasil nos pilares de{" "}
              <span className="text-emerald-400 font-semibold">cadastro</span>,{" "}
              <span className="text-emerald-400 font-semibold">declarações</span>,{" "}
              <span className="text-emerald-400 font-semibold">consistência</span> e{" "}
              <span className="text-emerald-400 font-semibold">regularidade tributária</span>.
              Empresas com boa classificação recebem prioridade em restituições, ressarcimentos e atendimento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* SEM o Monitor */}
            <div className="glass-card rounded-2xl p-6 md:p-8 border-red-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-red-400">Sem monitoramento</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Classificação descoberta só quando o cliente reclama",
                  "Restituições e ressarcimentos lentos sem explicação",
                  "Pendências ocultas que viram autuações",
                  "Risco reputacional para o escritório",
                  "Perda de clientes para concorrentes mais atentos",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-slate-400">
                    <span className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* COM o Monitor */}
            <div className="glass-card rounded-2xl p-6 md:p-8 border-emerald-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-emerald-400">Com Sintonia A+ Monitor</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Dashboard com classificação atualizada de cada CNPJ",
                  "Alertas automáticos quando um cliente muda de faixa",
                  "Plano de correção priorizado por impacto",
                  "Relatório executivo para apresentar ao cliente",
                  "Escritório posicionado como referência em compliance",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section id="como-funciona" className="py-16 md:py-24 bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-inter">
              O que o seu escritório entrega ao cliente
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
              Um serviço completo sob a sua marca. Você se posiciona como referência em compliance tributário.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Eye,
                title: "Diagnóstico Inicial",
                desc: "Mapeamento da classificação atual de cada CNPJ da carteira, com identificação dos fatores de risco e gaps de conformidade.",
                badge: "Única",
              },
              {
                icon: Target,
                title: "Plano de Correção",
                desc: "Documento executivo com ações necessárias para elevar a classificação, priorizadas por impacto e urgência.",
                badge: "Após diagnóstico",
              },
              {
                icon: BarChart3,
                title: "Monitoramento Trimestral",
                desc: "Verificação automática da nova classificação a cada ciclo da RFB, com comparativo de evolução.",
                badge: "A cada ciclo",
              },
              {
                icon: FileText,
                title: "Relatório Executivo",
                desc: "PDF profissional com dashboard visual: classificação, evolução, alertas e recomendações para o cliente.",
                badge: "Trimestral",
              },
              {
                icon: Bell,
                title: "Alertas de Risco",
                desc: "Notificação imediata de pendências cadastrais, declarações em atraso ou inconsistências detectadas.",
                badge: "Contínuo",
              },
              {
                icon: ShieldCheck,
                title: "Suporte Tributário",
                desc: "Orientação técnica para resolução de pontos críticos identificados no monitoramento da carteira.",
                badge: "Sob demanda",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 md:p-8 hover:border-emerald-500/20 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <item.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-emerald-400/70 bg-emerald-400/5 px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODELO WHITE LABEL ── */}
      <section className="py-16 md:py-24 bg-[#060810]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-800/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 md:mb-6">
              <Users className="w-3 h-3" />
              <span>Modelo para escritórios contábeis</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-inter">
              Receita nova com margem de 90%+
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
              Você paga uma mensalidade fixa. Repassa o serviço ao cliente final sob sua marca com a margem que escolher.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-12 md:mb-16">
            {[
              {
                name: "Essencial",
                cnpjs: "Até 50 CNPJs",
                price: "997",
                features: [
                  "Plataforma white label",
                  "Relatórios trimestrais",
                  "Alertas automáticos",
                  "Suporte por email",
                ],
                highlight: false,
              },
              {
                name: "Profissional",
                cnpjs: "51 a 200 CNPJs",
                price: "1.997",
                features: [
                  "Tudo do Essencial",
                  "Gerente de conta dedicado",
                  "Relatórios customizados",
                  "Suporte prioritário",
                ],
                highlight: true,
              },
              {
                name: "Enterprise",
                cnpjs: "201+ CNPJs",
                price: "2.997",
                features: [
                  "Tudo do Profissional",
                  "API de integração",
                  "Marca 100% customizada",
                  "SLA garantido",
                ],
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-b from-emerald-600/10 to-emerald-900/5 border-2 border-emerald-500/30"
                    : "glass-card"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 w-full flex justify-center">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white bg-emerald-600 px-4 py-1 rounded-b-lg">
                      Mais popular
                    </span>
                  </div>
                )}
                <div className={plan.highlight ? "pt-6" : ""}>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs md:text-sm text-slate-500 mb-4 md:mb-6">{plan.cnpjs}</p>
                  <div className="mb-6 md:mb-8">
                    <span className="text-xs text-slate-500">R$</span>
                    <span className="text-4xl md:text-5xl font-extrabold text-white font-inter ml-1">{plan.price}</span>
                    <span className="text-sm text-slate-500">/mês</span>
                  </div>
                  <ul className="space-y-3 mb-6 md:mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm md:text-base text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 md:py-3.5 rounded-xl font-semibold transition-all text-sm md:text-base ${
                      plan.highlight
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                        : "bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20"
                    }`}
                  >
                    Quero este plano
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Economia card */}
          <div className="glass-card rounded-2xl p-6 md:p-8 max-w-3xl mx-auto text-center border-emerald-500/10">
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="text-base md:text-lg font-bold text-white">Exemplo de Economia Real</span>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Um escritório com <span className="text-white font-semibold">100 clientes</span>, cobrando{" "}
              <span className="text-white font-semibold">R$ 297/mês</span> por empresa, gera{" "}
              <span className="text-emerald-400 font-bold text-lg md:text-xl">R$ 29.700/mês</span> de receita nova
              pagando apenas <span className="text-white font-semibold">R$ 1.997/mês</span> pela plataforma.
            </p>
            <div className="mt-4 md:mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold text-base md:text-lg">Margem bruta: 93%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── URGÊNCIA ── */}
      <section className="py-16 md:py-24 bg-[#080c14] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 font-inter">
              A próxima classificação sai em <span className="text-emerald-400">outubro/2026</span>
            </h2>
            <p className="text-base md:text-xl text-slate-400 leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto">
              Escritórios que monitoram proativamente a carteira se posicionam como parceiros estratégicos — não apenas processadores de guias.
              A janela para diagnosticar e corrigir antes do próximo ciclo está aberta.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {[
                { icon: Star, title: "First-mover", desc: "Nenhum concorrente dominante neste nicho" },
                { icon: Lock, title: "Recorrência natural", desc: "Classificação atualizada a cada trimestre" },
                { icon: Users, title: "Efeito de rede", desc: "1 escritório = dezenas de CNPJs atendidos" },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-2xl p-5 md:p-6 animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                  <item.icon className="w-7 h-7 md:w-8 md:h-8 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRANSPARÊNCIA ── */}
      <section className="py-16 md:py-20 bg-[#060810]">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="glass-card rounded-2xl p-6 md:p-8 border-amber-500/10">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <Lock className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
              <h3 className="text-lg md:text-xl font-bold text-white">Transparência total</h3>
            </div>
            <div className="space-y-3">
              {[
                "NÃO garantimos classificação A+ ou qualquer faixa específica",
                "NÃO temos acesso privilegiado aos sistemas da Receita Federal",
                "NÃO realizamos atos de representação junto à RFB",
                "NÃO substituímos assessoria jurídico-tributária especializada",
                "NÃO executamos correções operacionais — identificamos e orientamos",
              ].map((item, i) => (
                <p key={i} className="flex items-start gap-2 text-sm md:text-base text-slate-400">
                  <span className="text-amber-400 font-bold shrink-0">→</span>
                  {item}
                </p>
              ))}
            </div>
            <p className="mt-4 md:mt-6 text-xs md:text-sm text-slate-500 border-t border-white/5 pt-4 md:pt-6">
              O serviço consiste em monitoramento, interpretação da classificação pública e elaboração de plano de conformidade.
              A execução das ações corretivas é responsabilidade do escritório contábil e/ou do contribuinte.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 bg-[#080c14]">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 text-center font-inter">
            Perguntas frequentes
          </h2>
          <div className="space-y-3">
            <FAQItem
              q="Preciso de sistema ou equipe técnica?"
              a="Não. A plataforma é 100% web, white label, pronta para uso. Você recebe os acessos em até 24h após o pagamento."
            />
            <FAQItem
              q="Meus clientes vão saber que é um serviço terceirizado?"
              a="Não, se optar pela modalidade white label. A marca, relatórios e comunicação são todos personalizados com a identidade do seu escritório."
            />
            <FAQItem
              q="E se meu cliente já estiver em A+?"
              a="Ótimo! O monitoramento garante que ele mantenha a classificação e seja alertado imediatamente sobre qualquer risco de rebaixamento."
            />
            <FAQItem
              q="Qual o diferencial em relação a consultar direto no e-CAC?"
              a="O e-CAC mostra a nota. Nós interpretamos os fatores, geramos relatórios executivos profissionais, criamos plano de ação priorizado e monitoramos automaticamente a cada trimestre — para toda a carteira de uma vez."
            />
            <FAQItem
              q="Vocês garantem a classificação A+?"
              a="Não. Garantimos o monitoramento contínuo, a interpretação especializada e o plano de ação. A classificação final depende da conformidade do contribuinte."
            />
            <FAQItem
              q="Qual o prazo do contrato?"
              a="Contrato mínimo de 3 meses, com cancelamento sem multa após esse período mediante aviso de 30 dias. Pagamento antecipado do primeiro mês."
            />
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-16 md:py-24 bg-[#060810] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#060810] to-[#060810]"></div>
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-800/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6 md:mb-8">
            <Zap className="w-3 h-3" />
            <span>Oferta de lançamento — Primeiros 10 escritórios</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6 font-inter">
            Setup gratuito + 30 dias de teste com carteira real
          </h2>
          <p className="text-base md:text-xl text-slate-400 mb-3 md:mb-4 max-w-2xl mx-auto">
            Não é uma reunião. É o diagnóstico real da sua carteira.
          </p>
          <p className="text-sm md:text-base text-slate-500 mb-8 md:mb-10">
            Condição: pagamento antecipado do primeiro mês + envio da carteira de CNPJs para diagnóstico.
          </p>

          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg md:text-xl transition-all group animate-pulse-glow"
          >
            Quero ser um dos 10 parceiros
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="mt-6 md:mt-8 text-xs text-slate-600">
            Ao clicar, você será direcionado ao WhatsApp para falar com a equipe comercial.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 md:py-12 bg-[#040608] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-white">
                Sintonia A<span className="text-emerald-400">+</span> Monitor
              </span>
            </div>
            <p className="text-xs text-slate-600 text-center">
              © 2026 · Monitoramento tributário para escritórios contábeis · Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
