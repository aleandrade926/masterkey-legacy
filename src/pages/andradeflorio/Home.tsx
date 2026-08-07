import React, { useEffect, useState } from 'react';

const AndradeFlorioHome = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans antialiased bg-[#111315] text-white min-h-screen selection:bg-[#c4a661] selection:text-[#111315]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-[#111315]/90 backdrop-blur-md' : 'bg-[rgba(26,29,32,0.7)] backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-serif font-semibold tracking-wide text-[#c4a661]">
            A&F
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
            <a href="#como-pensamos" className="hover:text-[#c4a661] transition-colors">Como Pensamos</a>
            <a href="#areas" className="hover:text-[#c4a661] transition-colors">Atuação</a>
            <a href="#lideranca" className="hover:text-[#c4a661] transition-colors">Liderança</a>
          </div>
          <a href="#contato" className="px-5 py-2.5 bg-[#c4a661] text-[#111315] text-sm font-semibold rounded hover:bg-[#b09455] transition-colors">
            Agendar Reunião
          </a>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-[#c4a661]/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-[#c4a661]/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center">
          <div className="md:w-3/4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight mb-8 animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0" style={{animationDelay: '0ms', animationFillMode: 'forwards', transform: 'translateY(20px)'}}>
              As decisões mais importantes de uma empresa não podem ser analisadas por apenas uma área do Direito.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-2xl animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0" style={{animationDelay: '100ms', animationFillMode: 'forwards', transform: 'translateY(20px)'}}>
              A Andrade & Florio integra Direito Empresarial, Patrimônio, Imóveis e Tributação para estruturar decisões complexas com precisão e visão de longo prazo.
            </p>
            <div className="animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0" style={{animationDelay: '200ms', animationFillMode: 'forwards', transform: 'translateY(20px)'}}>
              <a href="#contato" className="inline-flex items-center px-8 py-4 bg-[#c4a661] text-[#111315] font-semibold rounded hover:bg-[#b09455] transition-colors group">
                Agendar uma conversa inicial
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DNA & COMO PENSAMOS */}
      <section id="como-pensamos" className="py-24 bg-[#1a1d20]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[rgba(26,29,32,0.7)] backdrop-blur-md border border-white/5 p-8 md:p-12 border-l-4 border-l-[#c4a661] mb-24 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-serif text-[#c4a661] mb-4 leading-snug">
              "Toda decisão importante precisa ser blindada juridicamente. Poucas exigem apenas uma área do Direito."
            </h3>
            <p className="text-gray-400 text-lg">
              Por isso integramos Direito Empresarial, Patrimônio, Imóveis e Tributação para estruturar decisões complexas com visão de longo prazo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-semibold tracking-widest text-[#c4a661] uppercase mb-3">Filosofia</h2>
              <h3 className="text-3xl md:text-4xl font-serif mb-6">Como pensamos</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Antes de analisar uma decisão, ampliamos a pergunta. Em vez de avaliar apenas o aspecto contratual, tributário ou imobiliário, examinamos como cada escolha repercute sobre a empresa, o patrimônio e seus objetivos de longo prazo. 
              </p>
              <p className="text-gray-400 leading-relaxed text-lg mt-4">
                Essa forma integrada de atuação orienta todas as soluções desenvolvidas pela Andrade & Florio, protegendo valor em operações que não têm margem para erro.
              </p>
            </div>
            <div className="bg-[rgba(26,29,32,0.7)] backdrop-blur-md border border-white/5 p-8 rounded-lg">
              <h2 className="text-sm font-semibold tracking-widest text-[#c4a661] uppercase mb-3">Nosso Foco</h2>
              <ul className="space-y-4 text-gray-300">
                {['Reestruturação societária e preparação para sucessão.',
                  'Elaboração de contratos para negócios e parcerias de alto risco.',
                  'Planejamento e adaptação empresarial à Reforma Tributária.',
                  'Estruturação de operações imobiliárias e incorporações.',
                  'Proteção patrimonial para CEOs, diretores, sócios e famílias empresárias.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#c4a661] mr-3 mt-1">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REFORMA TRIBUTÁRIA */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-sm font-semibold tracking-widest text-[#c4a661] uppercase mb-3">Contexto Atual</h2>
            <h3 className="text-3xl md:text-4xl font-serif mb-6">A Reforma Tributária e seus Impactos Estruturais</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              A Reforma Tributária muda a forma como empresas contratam, investem, estruturam imóveis e organizam seu patrimônio. Nosso papel vai além de adaptar a operação aos novos impostos: reestruturamos as bases do seu negócio e dos seus ativos para preservar a viabilidade das suas operações diante da nova realidade econômica.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ÁREAS DE ATUAÇÃO */}
      <section id="areas" className="py-24 bg-[#1a1d20] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm font-semibold tracking-widest text-[#c4a661] uppercase mb-16 text-center">Integração de Áreas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[rgba(26,29,32,0.7)] backdrop-blur-md border border-white/5 p-8 rounded-lg hover:border-[#c4a661]/50 transition-colors group">
              <h3 className="text-xl font-serif mb-4 text-white group-hover:text-[#c4a661] transition-colors">Direito Tributário</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Planejamento e eficiência fiscal aplicados à estruturação de novos negócios, readequação de operações e gestão de obrigações complexas.
              </p>
            </div>
            
            <div className="bg-[rgba(26,29,32,0.7)] backdrop-blur-md border border-white/5 p-8 rounded-lg hover:border-[#c4a661]/50 transition-colors group">
              <h3 className="text-xl font-serif mb-4 text-white group-hover:text-[#c4a661] transition-colors">Societário e Governança</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Estruturação de acordos, reestruturações empresariais, M&A e proteção para tomadores de decisão.
              </p>
            </div>

            <div className="bg-[rgba(26,29,32,0.7)] backdrop-blur-md border border-white/5 p-8 rounded-lg hover:border-[#c4a661]/50 transition-colors group">
              <h3 className="text-xl font-serif mb-4 text-white group-hover:text-[#c4a661] transition-colors">Direito Imobiliário</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Auditoria e estruturação em operações de compra, venda, locações e suporte completo na viabilidade de incorporações imobiliárias.
              </p>
            </div>

            <div className="bg-[rgba(26,29,32,0.7)] backdrop-blur-md border border-white/5 p-8 rounded-lg hover:border-[#c4a661]/50 transition-colors group">
              <h3 className="text-xl font-serif mb-4 text-white group-hover:text-[#c4a661] transition-colors">Patrimônio e Sucessão</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Estratégias dedicadas à proteção, eficiência e perpetuidade dos ativos de investidores e famílias empresárias.
              </p>
            </div>

            <div className="bg-[rgba(26,29,32,0.7)] backdrop-blur-md border border-white/5 p-8 rounded-lg hover:border-[#c4a661]/50 transition-colors group lg:col-span-2">
              <h3 className="text-xl font-serif mb-4 text-white group-hover:text-[#c4a661] transition-colors">Contratos Estratégicos</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Elaboração e revisão de instrumentos desenhados sob medida para reger parcerias de longo prazo, mitigar riscos e garantir a previsibilidade das operações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FORMA DE ATUAÇÃO E LIDERANÇA */}
      <section id="lideranca" className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm font-semibold tracking-widest text-[#c4a661] uppercase mb-3">Atuação Direta</h2>
            <h3 className="text-3xl font-serif mb-6">Foco e Integração</h3>
            <p className="text-gray-400 leading-relaxed text-lg mb-6">
              Nosso escritório não opera em volume. Priorizamos uma atuação direta e focada na personalização. 
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              Ao conectar as áreas de contratos, patrimônio, tributário e imobiliário em um mesmo projeto, asseguramos que as decisões do conselho e da diretoria sejam amparadas por uma análise completa, antecipando riscos e protegendo a operação.
            </p>
          </div>

          <div className="bg-[rgba(26,29,32,0.7)] backdrop-blur-md border border-white/5 p-10 border-l-4 border-l-[#c4a661]">
            <h2 className="text-sm font-semibold tracking-widest text-[#c4a661] uppercase mb-3">Liderança Técnica</h2>
            <h3 className="text-2xl font-serif mb-4">Dra. Líbia Florio</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Sob a liderança técnica da Dra. Líbia Florio, a Andrade & Florio atua por meio de uma equipe integrada de profissionais dedicados à estruturação de soluções jurídicas para empresas, patrimônio e operações de maior complexidade.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Com sólida experiência nas áreas tributária e corporativa, sua liderança assegura que cada solução entregue possua rigor, precisão e alinhamento aos objetivos de negócios do cliente.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section id="contato" className="py-32 bg-[#1a1d20] border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-[#c4a661]/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            Grandes decisões moldam o futuro do seu patrimônio e da sua empresa.
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
            Antecipe cenários e garanta uma estruturação integrada e precisa antes da implementação dos seus principais projetos.
          </p>
          <a href="mailto:contato@andradeflorio.com.br" className="inline-flex items-center px-10 py-5 bg-[#c4a661] text-[#111315] text-lg font-semibold rounded hover:bg-[#b09455] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(196,166,97,0.2)]">
            Conversar com nossa equipe
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2026 Andrade & Florio. Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Termos</a>
          </div>
        </div>
      </footer>
      
      {/* Tailwind specific animations for React */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
    </div>
  );
};

export default AndradeFlorioHome;
