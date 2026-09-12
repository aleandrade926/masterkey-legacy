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
  Smartphone,
  Gift,
  Feather
} from "lucide-react";

export default function BarbaraBrownLanding() {
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
    <div className="min-h-screen bg-[#fbf9f5] text-[#1a1715] font-sans selection:bg-[#d9a86c] selection:text-white">
      
      {/* 1. TOP CONFIDENTIAL BANNER (PROJETO MANHATTAN) */}
      <div className="bg-[#f5eedf] border-b border-[#e3d7c3] py-2.5 px-4 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[#7a5822] font-semibold flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#9c712b] animate-pulse"></span>
          Briefing Confidencial • Projeto Co-Creator BBB • Acesso Exclusivo para Criadoras de Autoridade
        </p>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#fbf9f5]/90 border-b border-[#e8e2d8] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-serif tracking-[0.2em] font-semibold text-[#141210]">
              BARBARA BROWN
            </span>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-[#a87a38]/40 text-[#8c6126] bg-[#f5ecdc] font-medium">
              BBB
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-[#5c554e] font-medium">
            <a href="#diferenciais" className="hover:text-[#141210] transition-colors">A Tecnologia</a>
            <a href="#engenharia" className="hover:text-[#141210] transition-colors">O Interior</a>
            <a href="#co-creator" className="text-[#a87a38] hover:text-[#78531e] transition-colors flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Programa Co-Creator
            </a>
          </nav>
          <a 
            href="#vip-access"
            className="text-xs uppercase tracking-widest bg-[#1a1715] hover:bg-[#332e29] text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md"
          >
            Acesso Exclusivo
          </a>
        </div>
      </header>

      {/* 3. HERO SECTION (PADRÃO LADEIRA - ATAQUE AO STATUS QUO) */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3ede1] border border-[#ded4c3] text-xs tracking-[0.2em] uppercase text-[#7d561d] mb-6 font-semibold shadow-sm">
              <Award className="w-3.5 h-3.5" /> Marroquinaria Inteligente D2C
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.15] text-[#141210] mb-6">
              A maioria das marcas vende bolsas caras que por dentro parecem um <span className="italic text-[#a86e30]">buraco negro</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-[#57514a] font-normal leading-relaxed mb-8">
              Nós criamos a primeira <strong className="text-[#141210] font-semibold">Tech Tote</strong> da América Latina: a sofisticação do <em>Quiet Luxury</em> por fora, com a engenharia invisível e resolução de dores da <strong className="text-[#141210] font-semibold">Insider</strong> por dentro.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#co-creator" 
                className="w-full sm:w-auto px-8 py-4 bg-[#1a1715] hover:bg-[#332e29] text-white text-sm uppercase tracking-widest font-semibold rounded-full shadow-xl shadow-black/15 transition-all flex items-center justify-center gap-2"
              >
                Co-Criar Minha Bolsa Assinada <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#diferenciais" 
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#f5efe6] border border-[#d8d0c2] text-[#2c2824] text-sm uppercase tracking-widest font-medium rounded-full shadow-sm transition-all"
              >
                Ver os 8 Diferenciais
              </a>
            </div>
          </div>

          {/* HERO IMAGE CONTAINER */}
          <div className="relative rounded-3xl overflow-hidden border border-[#e5ded0] shadow-2xl bg-white p-2 sm:p-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/10] max-h-[620px]">
              <img 
                src="/barbara-brown/bb_hero_cognac.jpg" 
                alt="The Barbara Brown Tech Tote em couro nobre Cognac"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#e8c55e] font-semibold">Peça Fundadora</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white">The Barbara Brown Tech Tote</h3>
                  <p className="text-sm text-white/80">Couro granulado nobre hidrorrepelente • Ferragens cataforéticas ouro fosco</p>
                </div>
                <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20">
                  <Shield className="w-5 h-5 text-[#e8c55e]" />
                  <span className="text-xs text-white/95 font-medium">Secret AirTag Vault Integrado</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. STORYTELLING VISCERAL DA DOR (MÉTODO LADEIRA) */}
      <section className="py-20 px-6 bg-[#f4efe6] border-y border-[#e5dfd2]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9c6a28] font-bold">O Cenário Real</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#141210] mt-2">
              Você já reparou na tortura diária que uma mulher de negócios enfrenta com suas bolsas?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#e4ded3] shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Coffee className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-[#141210] mb-2 font-semibold">O Pânico do Café na Mesa</h4>
              <p className="text-sm text-[#57514a] leading-relaxed">
                Um esbarrão involuntário na sala de reunião e um copo de café tomba. Em uma bolsa comum de couro cru, ela está manchada para sempre. R$ 2.500 no lixo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e4ded3] shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-[#141210] mb-2 font-semibold">O MacBook de R$ 15 mil Batendo no Chão</h4>
              <p className="text-sm text-[#57514a] leading-relaxed">
                Bolsas tradicionais de shopping não têm acolchoamento. Toda vez que a mulher apoia a bolsa no chão do tribunal ou restaurante, o notebook sofre o impacto seco.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e4ded3] shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-[#141210] mb-2 font-semibold">A Garrafa D'água que Vaza nos Contratos</h4>
              <p className="text-sm text-[#57514a] leading-relaxed">
                Sem uma divisória estanque vertical, a garrafa deforma, sua ou destampa, destruindo documentos jurídicos, processos, relatórios e maquiagem.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e4ded3] shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-[#141210] mb-2 font-semibold">A Humilhação das Duas Bolsas</h4>
              <p className="text-sm text-[#57514a] leading-relaxed">
                A mulher é obrigada a sair com a bolsa bonita de grife + uma sacola de pano ou ecobag feia para conseguir carregar a vida de trabalho. A Barbara Brown unifica as duas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIFESTYLE SECTION (A MULHER EXECUTIVA NA FARIA LIMA) */}
      <section className="py-20 px-6 bg-[#fbf9f5]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9c6a28] font-bold">Elegância Sem Esforço</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#141210] mt-3 mb-6 leading-tight">
              A autoridade visual que você projeta em cada reunião e audiência.
            </h2>
            <p className="text-base text-[#57514a] leading-relaxed mb-6">
              A cliente da Barbara Brown não compra tendências descartáveis de blogueiras adolescentes. Ela lidera departamentos, sustenta teses em tribunais, comanda clínicas e fecha contratos corporativos.
            </p>
            <div className="space-y-4 text-sm text-[#3b3631]">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8c5e23] shrink-0 mt-0.5" />
                <p><strong className="text-[#141210]">Estrutura que Nunca Tomba:</strong> Alma interna de EVA termomoldado que mantém a silhueta em pé firme na mesa da reunião.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8c5e23] shrink-0 mt-0.5" />
                <p><strong className="text-[#141210]">Alívio no Ombro:</strong> Pesa menos de 640g vazia — menos da metade de uma bolsa comum de couro cru pesado.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8c5e23] shrink-0 mt-0.5" />
                <p><strong className="text-[#141210]">Quiet Luxury:</strong> Monograma BB discreto em ouro fosco. Luxo que sussurra em vez de gritar.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-3xl overflow-hidden border border-[#e5ded0] shadow-2xl relative bg-white p-2">
              <img 
                src="/barbara-brown/bb_lifestyle_executive.jpg" 
                alt="Executiva elegante com a Barbara Brown Tech Tote na Faria Lima"
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#e5dfd2] text-xs text-[#2c2824] shadow-lg">
                <span className="text-[#8c5e23] font-bold block mb-0.5 tracking-wider uppercase">ESTILO CORPORATIVO ATEMPORAL</span>
                Projetada para acompanhar o ritmo dinâmico de quem não pode perder tempo.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. A ENGENHARIA INTERNA REVELADA (O RAIO-X DAS RODINHAS) */}
      <section id="engenharia" className="py-20 px-6 bg-[#f4efe6] border-y border-[#e5dfd2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9c6a28] font-bold">Engenharia Invisível</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#141210] mt-2 mb-4">
              O fim definitivo do "buraco negro".
            </h2>
            <p className="text-base text-[#57514a]">
              Olhe por dentro da The Tech Tote. Cada centímetro foi desenhado para resolver uma fricção real do seu dia a dia.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-[#e5ded0] shadow-2xl bg-white p-3 mb-12">
            <img 
              src="/barbara-brown/bb_interior_engineering.jpg" 
              alt="Engenharia interna da Barbara Brown Tech Tote com AirTag e laptop"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          {/* OS 8 DIFERENCIAIS CARDS */}
          <div id="diferenciais" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-5 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#f5ecdc] text-[#8c6126] flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-[#141210] mb-1.5 font-bold">1. Secret AirTag Vault</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Bolso secreto camuflado no forro estrutural para rastreamento em tempo real via Apple Find My / Samsung. Nunca mais esqueça a bolsa no Uber ou restaurante.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#f5ecdc] text-[#8c6126] flex items-center justify-center mb-3">
                <Coffee className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-[#141210] mb-1.5 font-bold">2. Escudo Hidrofóbico DWR</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Tratamento impermeável de última geração. Café, chuva e líquidos escorrem sem penetrar e sem manchar. Limpa em 3 segundos com um lenço úmido.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#f5ecdc] text-[#8c6126] flex items-center justify-center mb-3">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-[#141210] mb-1.5 font-bold">3. Laptop Sleeve Flutuante</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Compartimento suspenso com microespuma antichoque para notebook até 14". O computador nunca bate no chão quando você apoia a bolsa.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#f5ecdc] text-[#8c6126] flex items-center justify-center mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-[#141210] mb-1.5 font-bold">4. Bolso Térmico Estanque</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Divisória vertical impermeável para garrafa de água gelada ou sombrinha. Isola 100% da umidade longe dos documentos e eletrônicos.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#f5ecdc] text-[#8c6126] flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-[#141210] mb-1.5 font-bold">5. Forro com Íons de Prata</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Tecido acetinado champagne (alto contraste visual) tratado com nanotecnologia de prata permanente. Zero fungos, bactérias ou odores residuais.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#f5ecdc] text-[#8c6126] flex items-center justify-center mb-3">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-[#141210] mb-1.5 font-bold">6. Acesso Magnético N52</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Bolso lateral para smartphone com ímãs de neodímio embutidos. Abre com uma mão só em 1 segundo e se fecha sozinho com segurança.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#f5ecdc] text-[#8c6126] flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-[#141210] mb-1.5 font-bold">7. Cofre RFID Safe</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Blindagem eletromagnética que bloqueia sinais de aproximação, protegendo cartões de crédito e passaporte contra golpes no trânsito ou multidão.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#f5ecdc] text-[#8c6126] flex items-center justify-center mb-3">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif text-[#141210] mb-1.5 font-bold">8. Leveza Absoluta (&lt; 640g)</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Metade do peso de uma bolsa tradicional de couro pesado. Alivia a tensão na cervical e coluna durante jornadas intensas de trabalho.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. O PROGRAMA CO-CREATOR BBB (A OFERTA DIRETA PARA A INFLUENCIADORA) */}
      <section id="co-creator" className="py-24 px-6 bg-[#fbf9f5]">
        <div className="max-w-5xl mx-auto rounded-3xl p-8 md:p-14 bg-gradient-to-b from-[#fbf9f5] via-[#f7f2e8] to-[#f2ecde] border border-[#d9ccb6] shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8c5e23] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8c5e23]" /> Projeto Manhattan: Parceria & Co-Criação
            </span>
            
            <h2 className="text-3xl md:text-5xl font-serif text-[#141210] mt-3 mb-6">
              Você não vai ser apenas mais uma afiliada de cupom de 10%.
              <br />
              <span className="text-[#9c6a28]">Você vai ter a sua própria linha de bolsas assinadas com o seu nome.</span>
            </h2>

            <p className="text-base md:text-lg text-[#57514a] leading-relaxed mb-8">
              Ter a sua própria marca de luxo sempre pareceu impossível porque exigiria R$ 500 mil de capital, estoque parado, fábrica e dor de cabeça logística. A <strong className="text-[#141210]">Barbara Brown</strong> resolveu isso para você.
            </p>

            {/* AS 4 ENGRENAGENS DO PROGRAMA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              
              <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm">
                <div className="text-[#8c5e23] font-serif text-xl mb-2 font-bold">01. Co-Criação do Design por IA</div>
                <p className="text-sm text-[#57514a] leading-relaxed">
                  Você escolhe as cores, acabamentos e detalhes que a sua audiência ama (ex: Vinho Borgonha, Verde Floresta, couro croco). Geramos os conceitos visuais exclusivos com a nossa inteligência.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm">
                <div className="text-[#8c5e23] font-serif text-xl mb-2 font-bold">02. O Modelo Leva o Seu Nome</div>
                <p className="text-sm text-[#57514a] leading-relaxed">
                  A peça é batizada oficialmente na marca com a sua assinatura: <em>The Juliana Executive</em>, <em>The Duda Classic</em>, etc. É a realização do seu posicionamento de autoridade máxima.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm">
                <div className="text-[#8c5e23] font-serif text-xl mb-2 font-bold">03. Zero Risco, Zero Fábrica, Zero Caixa</div>
                <p className="text-sm text-[#57514a] leading-relaxed">
                  Nós cuidamos de 100% da manufatura fina no Vale dos Sinos (RS), embalagem magnética de presente, notas fiscais, SAC e entrega via Sedex. Você só coloca o link e brilha.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm">
                <div className="text-[#8c5e23] font-serif text-xl mb-2 font-bold">04. Comissão de 20% + 15% Cross-Sell</div>
                <p className="text-sm text-[#57514a] leading-relaxed">
                  Você recebe <strong>20% de comissão direta sobre cada bolsa vendida do seu modelo assinado</strong> e 15% sobre qualquer outro produto do catálogo da Barbara Brown adquirido pela sua comunidade.
                </p>
              </div>

            </div>

            {/* O BILHETE DOURADO BÔNUS */}
            <div className="p-6 rounded-2xl bg-[#f7edd9] border border-[#d9b875] flex flex-col md:flex-row items-center justify-between gap-6 mb-10 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#d9b875] text-[#2e2310] flex items-center justify-center shrink-0">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-serif text-[#2e2310] font-bold">O Sorteio do "Bilhete Dourado" para a sua Comunidade</h4>
                  <p className="text-xs text-[#574421]">
                    No lote de lançamento, suas seguidoras concorrem a Apple AirTags originais premiados dentro do bolso secreto de unboxing. Explosão de Stories orgânicos marcando seu perfil.
                  </p>
                </div>
              </div>
            </div>

            {/* FORMULÁRIO DE ATIVAÇÃO VIP */}
            <div id="vip-access" className="bg-white p-8 md:p-10 rounded-2xl border border-[#e2dacb] shadow-xl max-w-xl mx-auto">
              <h3 className="text-2xl font-serif text-[#141210] mb-2 text-center font-bold">Ativação do Kit Fundadora & Programa Co-Creator</h3>
              <p className="text-xs text-[#6b645b] text-center mb-6">
                Informe seus dados para receber o briefing completo com a Clara e selecionar a sua peça de presente.
              </p>

              {formSent ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-[#8c5e23] mx-auto mb-3" />
                  <h4 className="text-lg font-serif text-[#141210] mb-1 font-bold">Solicitação Enviada com Sucesso!</h4>
                  <p className="text-xs text-[#57514a]">A Clara já abriu o seu canal no WhatsApp para alinharmos os detalhes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#4a453f] mb-1 font-semibold">Seu Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Dra. Juliana Silveira"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#fcfbfa] border border-[#d6cec0] text-[#1a1715] placeholder-[#999] text-sm focus:outline-none focus:border-[#8c5e23] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#4a453f] mb-1 font-semibold">Seu @ do Instagram / YouTube</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: @julianasilveira"
                        value={formData.perfil}
                        onChange={(e) => setFormData({...formData, perfil: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-[#fcfbfa] border border-[#d6cec0] text-[#1a1715] placeholder-[#999] text-sm focus:outline-none focus:border-[#8c5e23] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#4a453f] mb-1 font-semibold">WhatsApp de Contato</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="(11) 99999-9999"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-[#fcfbfa] border border-[#d6cec0] text-[#1a1715] placeholder-[#999] text-sm focus:outline-none focus:border-[#8c5e23] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#4a453f] mb-1 font-semibold">Cor de Preferência para o seu Kit</label>
                    <select 
                      value={formData.corEscolhida}
                      onChange={(e) => setFormData({...formData, corEscolhida: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#fcfbfa] border border-[#d6cec0] text-[#1a1715] text-sm focus:outline-none focus:border-[#8c5e23] focus:bg-white transition-all"
                    >
                      <option value="Cognac Heritage">Cognac Heritage (Caramelo Nobre)</option>
                      <option value="Noir Carbon">Noir Carbon (Preto Fosco Nobre)</option>
                      <option value="Sand Taupe">Sand Taupe (Nude Contemporâneo)</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#1a1715] hover:bg-[#332e29] text-white font-semibold text-sm uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-black/15 flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    Confirmar Interesse & Falar com a Clara <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 8. FOOTER EDITORIAL LUXO */}
      <footer className="py-12 px-6 border-t border-[#262422] bg-[#141312] text-center text-white/60 text-xs tracking-widest">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-[0.2em] font-semibold text-white">BARBARA BROWN</span>
            <span className="text-[#cbb086]">• BBB</span>
          </div>
          <p>© 2026 Barbara Brown Bags. Design Atemporal. Engenharia Invisível. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6 text-white/50">
            <span>Vale dos Sinos (RS)</span>
            <span>São Paulo (SP)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
