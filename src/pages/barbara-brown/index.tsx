import React, { useState } from "react";
import { 
  Shield, 
  Laptop, 
  Droplets, 
  Sparkles, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  Coffee, 
  Lock, 
  Award, 
  HeartHandshake, 
  Smartphone,
  Gift,
  Feather,
  Zap,
  EyeOff
} from "lucide-react";

export default function BarbaraBrownLanding() {
  const [selectedColor, setSelectedColor] = useState<"cognac" | "noir" | "taupe">("cognac");
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    perfil: "",
    whatsapp: "",
    corEscolhida: "Cognac Heritage"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    const msg = encodeURIComponent(
      `Olá, Clara! Sou a ${formData.nome} (${formData.perfil}). Recebi o convite exclusivo da Barbara Brown e gostaria de confirmar meu Kit Fundadora na cor ${formData.corEscolhida} e conhecer os detalhes do Programa Co-Creator.`
    );
    window.open(`https://wa.me/5511978671067?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-[#f4f2ed] font-sans selection:bg-[#c88a4b] selection:text-white">
      
      {/* 1. TOP CONFIDENTIAL BANNER (PROJETO MANHATTAN) */}
      <div className="bg-gradient-to-r from-[#1c1a17] via-[#2a241c] to-[#1c1a17] border-b border-[#3d3326] py-2.5 px-4 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
          Briefing Confidencial • Projeto Co-Creator BBB • Acesso Exclusivo para Criadoras de Autoridade
        </p>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0d0d0f]/90 border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-serif tracking-[0.2em] font-semibold text-white">
              BARBARA BROWN
            </span>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-[#d4af37]/40 text-[#d4af37] bg-[#d4af37]/10">
              BBB
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-white/70">
            <a href="#diferenciais" className="hover:text-white transition-colors">A Tecnologia</a>
            <a href="#engenharia" className="hover:text-white transition-colors">O Interior</a>
            <a href="#co-creator" className="text-[#d4af37] hover:text-[#e8c55e] transition-colors flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Programa Co-Creator
            </a>
          </nav>
          <a 
            href="#vip-access"
            className="text-xs uppercase tracking-widest bg-[#c88a4b] hover:bg-[#d89856] text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-[#c88a4b]/20"
          >
            Acesso Exclusivo
          </a>
        </div>
      </header>

      {/* 3. HERO SECTION (PADRÃO LADEIRA - ATAQUE AO STATUS QUO) */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c88a4b]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-[0.2em] uppercase text-[#d4af37] mb-6">
              <Award className="w-3.5 h-3.5" /> Marroquinaria Inteligente D2C
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.15] text-white mb-6">
              A maioria das marcas vende bolsas caras que por dentro parecem um <span className="italic text-[#c88a4b]">buraco negro</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8">
              Nós criamos a primeira <strong className="text-white font-medium">Tech Tote</strong> da América Latina: a sofisticação do <em>Quiet Luxury</em> por fora, com a engenharia invisível e resolução de dores da <strong className="text-white font-medium">Insider</strong> por dentro.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#co-creator" 
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#c88a4b] to-[#b3773b] hover:from-[#d89856] hover:to-[#c88a4b] text-white text-sm uppercase tracking-widest font-semibold rounded-full shadow-xl shadow-[#c88a4b]/25 transition-all flex items-center justify-center gap-2"
              >
                Co-Criar Minha Bolsa Assinada <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#diferenciais" 
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 text-sm uppercase tracking-widest font-medium rounded-full transition-all"
              >
                Ver os 8 Diferenciais
              </a>
            </div>
          </div>

          {/* HERO IMAGE CONTAINER */}
          <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-gradient-to-b from-white/5 to-transparent p-2 sm:p-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/10] max-h-[620px]">
              <img 
                src="/barbara-brown/bb_hero_cognac.jpg" 
                alt="The Barbara Brown Tech Tote em couro nobre Cognac"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">Peça Fundadora</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white">The Barbara Brown Tech Tote</h3>
                  <p className="text-sm text-white/70">Couro granulado nobre hidrorrepelente • Ferragens cataforéticas ouro fosco</p>
                </div>
                <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                  <Shield className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-xs text-white/90 font-medium">Secret AirTag Vault Integrado</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. STORYTELLING VISCERAL DA DOR (MÉTODO LADEIRA) */}
      <section className="py-20 px-6 bg-[#131316] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c88a4b] font-semibold">O Cenário Real</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-2">
              Você já reparou na tortura diária que uma mulher de negócios enfrenta com suas bolsas?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <Coffee className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-white mb-2">O Pânico do Café na Mesa</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Um esbarrão involuntário na sala de reunião e um copo de café tomba. Em uma bolsa comum de couro cru, ela está manchada para sempre. R$ 2.500 no lixo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-white mb-2">O MacBook de R$ 15 mil Batendo no Chão</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Bolsas tradicionais de shopping não têm acolchoamento. Toda vez que a mulher apoia a bolsa no chão do tribunal ou restaurante, o notebook sofre o impacto seco.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-white mb-2">A Garrafa D'água que Vaza nos Contratos</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Sem uma divisória estanque vertical, a garrafa deforma, sua ou destampa, destruindo documentos jurídicos, processos, relatórios e maquiagem.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-white mb-2">A Humilhação das Duas Bolsas</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                A mulher é obrigada a sair com a bolsa bonita de grife + uma sacola de pano ou ecobag feia para conseguir carregar a vida de trabalho. A Barbara Brown unifica as duas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIFESTYLE SECTION (A MULHER EXECUTIVA NA FARIA LIMA) */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">Elegância Sem Esforço</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-3 mb-6 leading-tight">
              A autoridade visual que você projeta em cada reunião e audiência.
            </h2>
            <p className="text-base text-white/70 leading-relaxed mb-6">
              A cliente da Barbara Brown não compra tendências descartáveis de blogueiras adolescentes. Ela lidera departamentos, sustenta teses em tribunais, comanda clínicas e fecha contratos corporativos.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <p className="text-sm text-white/80"><strong className="text-white">Estrutura que Nunca Tomba:</strong> Alma interna de EVA termomoldado que mantém a silhueta em pé firme na mesa da reunião.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <p className="text-sm text-white/80"><strong className="text-white">Alívio no Ombro:</strong> Pesa menos de 640g vazia — menos da metade de uma bolsa comum de couro cru pesado.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <p className="text-sm text-white/80"><strong className="text-white">Quiet Luxury:</strong> Monograma BB discreto em ouro fosco. Luxo que sussurra em vez de gritar.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img 
                src="/barbara-brown/bb_lifestyle_executive.jpg" 
                alt="Executiva elegante com a Barbara Brown Tech Tote na Faria Lima"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs text-white/80">
                <span className="text-[#d4af37] font-semibold block mb-0.5">ESTILO CORPORATIVO ATEMPORAL</span>
                Projetada para acompanhar o ritmo dinâmico de quem não pode perder tempo.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. A ENGENHARIA INTERNA REVELADA (O RAIO-X DAS RODINHAS) */}
      <section id="engenharia" className="py-20 px-6 bg-[#131316] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">Engenharia Invisível</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 mb-4">
              O fim definitivo do "buraco negro".
            </h2>
            <p className="text-base text-white/70">
              Olhe por dentro da The Tech Tote. Cada centímetro foi desenhado para resolver uma fricção real do seu dia a dia.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/40 p-3 mb-12">
            <img 
              src="/barbara-brown/bb_interior_engineering.jpg" 
              alt="Engenharia interna da Barbara Brown Tech Tote com AirTag e laptop"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          {/* OS 8 DIFERENCIAIS CARDS */}
          <div id="diferenciais" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-white mb-1.5">1. Secret AirTag Vault</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Bolso secreto camuflado no forro estrutural para rastreamento em tempo real via Apple Find My / Samsung. Nunca mais esqueça a bolsa no Uber ou restaurante.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center mb-3">
                <Coffee className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-white mb-1.5">2. Escudo Hidrofóbico DWR</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Tratamento impermeável de última geração. Café, chuva e líquidos escorrem sem penetrar e sem manchar. Limpa em 3 segundos com um lenço úmido.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center mb-3">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-white mb-1.5">3. Laptop Sleeve Flutuante</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Compartimento suspenso com microespuma antichoque para notebook até 14". O computador nunca bate no chão quando você apoia a bolsa.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-white mb-1.5">4. Bolso Térmico Estanque</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Divisória vertical impermeável para garrafa de água gelada ou sombrinha. Isola 100% da umidade longe dos documentos e eletrônicos.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-white mb-1.5">5. Forro com Íons de Prata</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Tecido acetinado champagne (alto contraste visual) tratado com nanotecnologia de prata permanente. Zero fungos, bactérias ou odores residuais.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center mb-3">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-white mb-1.5">6. Acesso Magnético N52</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Bolso lateral para smartphone com ímãs de neodímio embutidos. Abre com uma mão só em 1 segundo e se fecha sozinho com segurança.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-white mb-1.5">7. Cofre RFID Safe</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Blindagem eletromagnética que bloqueia sinais de aproximação, protegendo cartões de crédito e passaporte contra golpes no trânsito ou multidão.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center mb-3">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-white mb-1.5">8. Leveza Absoluta (&lt; 640g)</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Metade do peso de uma bolsa tradicional de couro pesado. Alivia a tensão na cervical e coluna durante jornadas intensas de trabalho.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. O PROGRAMA CO-CREATOR BBB (A OFERTA DIRETA PARA A INFLUENCIADORA) */}
      <section id="co-creator" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto rounded-3xl p-8 md:p-14 bg-gradient-to-b from-[#1a1714] via-[#14120f] to-[#0d0d0f] border border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" /> Projeto Manhattan: Parceria & Co-Criação
            </span>
            
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-3 mb-6">
              Você não vai ser apenas mais uma afiliada de cupom de 10%.
              <br />
              <span className="text-[#d4af37]">Você vai ter a sua própria linha de bolsas assinadas com o seu nome.</span>
            </h2>

            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              Ter a sua própria marca de luxo sempre pareceu impossível porque exigiria R$ 500 mil de capital, estoque parado, fábrica e dor de cabeça logística. A <strong className="text-white">Barbara Brown</strong> resolveu isso para você.
            </p>

            {/* AS 4 ENGRENAGENS DO PROGRAMA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-[#d4af37] font-serif text-xl mb-2 font-bold">01. Co-Criação do Design por IA</div>
                <p className="text-sm text-white/60 leading-relaxed">
                  Você escolhe as cores, acabamentos e detalhes que a sua audiência ama (ex: Vinho Borgonha, Verde Floresta, couro croco). Geramos os conceitos visuais exclusivos com a nossa inteligência.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-[#d4af37] font-serif text-xl mb-2 font-bold">02. O Modelo Leva o Seu Nome</div>
                <p className="text-sm text-white/60 leading-relaxed">
                  A peça é batizada oficialmente na marca com a sua assinatura: <em>The Juliana Executive</em>, <em>The Duda Classic</em>, etc. É a realização do seu posicionamento de autoridade máxima.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-[#d4af37] font-serif text-xl mb-2 font-bold">03. Zero Risco, Zero Fábrica, Zero Caixa</div>
                <p className="text-sm text-white/60 leading-relaxed">
                  Nós cuidamos de 100% da manufatura fina no Vale dos Sinos (RS), embalagem magnética de presente, notas fiscais, SAC e entrega via Sedex. Você só coloca o link e brilha.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-[#d4af37] font-serif text-xl mb-2 font-bold">04. Comissão de 20% + 15% Cross-Sell</div>
                <p className="text-sm text-white/60 leading-relaxed">
                  Você recebe <strong>20% de comissão direta sobre cada bolsa vendida do seu modelo assinado</strong> e 15% sobre qualquer outro produto do catálogo da Barbara Brown adquirido pela sua comunidade.
                </p>
              </div>

            </div>

            {/* O BILHETE DOURADO BÔNUS */}
            <div className="p-6 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/40 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#d4af37] text-black flex items-center justify-center shrink-0">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-serif text-white font-bold">O Sorteio do "Bilhete Dourado" para a sua Comunidade</h4>
                  <p className="text-xs text-white/70">
                    No lote de lançamento, suas seguidoras concorrem a Apple AirTags originais premiados dentro do bolso secreto de unboxing. Explosão de Stories orgânicos marcando seu perfil.
                  </p>
                </div>
              </div>
            </div>

            {/* FORMULÁRIO DE ATIVAÇÃO VIP */}
            <div id="vip-access" className="bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-white/15">
              <h3 className="text-2xl font-serif text-white mb-2 text-center">Ativação do Kit Fundadora & Programa Co-Creator</h3>
              <p className="text-xs text-white/60 text-center mb-6">
                Informe seus dados para receber o briefing completo com a Clara e selecionar a sua peça de presente.
              </p>

              {formSent ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-[#d4af37] mx-auto mb-3" />
                  <h4 className="text-lg font-serif text-white mb-1">Solicitação Enviada com Sucesso!</h4>
                  <p className="text-xs text-white/60">A Clara já abriu o seu canal no WhatsApp para alinharmos os detalhes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-1">Seu Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Dra. Juliana Silveira"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/70 mb-1">Seu @ do Instagram / YouTube</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: @julianasilveira"
                        value={formData.perfil}
                        onChange={(e) => setFormData({...formData, perfil: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/70 mb-1">WhatsApp de Contato</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="(11) 99999-9999"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-1">Cor de Preferência para o seu Kit</label>
                    <select 
                      value={formData.corEscolhida}
                      onChange={(e) => setFormData({...formData, corEscolhida: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1714] border border-white/15 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Cognac Heritage">Cognac Heritage (Caramelo Nobre)</option>
                      <option value="Noir Carbon">Noir Carbon (Preto Fosco Nobre)</option>
                      <option value="Sand Taupe">Sand Taupe (Nude Contemporâneo)</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#c88a4b] hover:from-[#e0be48] hover:to-[#d89856] text-black font-semibold text-sm uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2 mt-4"
                  >
                    Confirmar Interesse & Falar com a Clara <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 8. FOOTER DE LUXO */}
      <footer className="py-12 px-6 border-t border-white/10 bg-[#09090b] text-center text-white/50 text-xs tracking-widest">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-[0.2em] font-semibold text-white">BARBARA BROWN</span>
            <span>• BBB</span>
          </div>
          <p>© 2026 Barbara Brown Bags. Design Atemporal. Engenharia Invisível. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Vale dos Sinos (RS)</span>
            <span>São Paulo (SP)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
