import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, 
  ArrowRight, 
  CheckCircle
} from "lucide-react";

interface CinemaCrossfadeMediaProps {
  videoSrc: string;
  imageSrc: string;
  alt: string;
  id: string;
  aspectClass?: string;
  showMuteButton?: boolean;
  badgeText?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

function CinemaCrossfadeMedia({
  videoSrc,
  imageSrc,
  alt,
  id,
  aspectClass = "aspect-[16/10] md:aspect-[16/9] max-h-[660px]",
  showMuteButton = true,
  badgeText = "Secret AirTag Vault Integrado",
  title = "",
  subtitle = "",
  description = ""
}: CinemaCrossfadeMediaProps) {
  const [showImage, setShowImage] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timer: NodeJS.Timeout;

    const handleEnded = () => {
      setShowImage(true);
      timer = setTimeout(() => {
        setShowImage(false);
        setTimeout(() => {
          if (video) {
            video.currentTime = 0;
            video.play().catch(() => {});
          }
        }, 800);
      }, 3500);
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
      clearTimeout(timer);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden ${aspectClass} w-full bg-[#141210]`}>
      {/* Moving Cinematic Video */}
      <video
        ref={videoRef}
        id={id}
        autoPlay
        muted={isMuted}
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          showImage ? "opacity-0" : "opacity-100"
        }`}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Crisp Editorial Photograph */}
      <img
        src={imageSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out pointer-events-none ${
          showImage ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Luxury Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

      {/* Overlay Information */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          {subtitle && (
            <span className="text-xs uppercase tracking-[0.22em] text-[#e8c55e] font-semibold">
              {subtitle}
            </span>
          )}
          {title && (
            <h3 className="text-2xl md:text-4xl font-serif text-white mt-1 font-semibold">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs md:text-sm text-white/85 mt-2 max-w-2xl leading-relaxed font-normal">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {showMuteButton && (
            <button
              onClick={toggleMute}
              className="px-4 py-2 bg-black/60 hover:bg-black/85 backdrop-blur-md rounded-xl border border-white/20 text-xs text-white/95 font-medium transition-all cursor-pointer"
            >
              {isMuted ? "Ativar Áudio" : "Mutar Áudio"}
            </button>
          )}
          {badgeText && (
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shrink-0">
              <span className="text-xs uppercase tracking-widest text-white/95 font-semibold">
                {badgeText}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BarbaraBrownLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    perfil: "",
    whatsapp: "",
    corEscolhida: "Cognac Heritage — Caramelo Nobre"
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      
      {/* 1. TOP CONFIDENTIAL BANNER */}
      <div className="bg-[#f5eedf] border-b border-[#e3d7c3] py-2.5 px-4 text-center">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#7a5822] font-semibold flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9c712b] animate-pulse"></span>
          Briefing Confidencial • Projeto Co-Creator BBB • Acesso Exclusivo para Criadoras de Autoridade
        </p>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className={`sticky top-0 z-50 backdrop-blur-md bg-[#fbf9f5]/95 border-b border-[#e8e2d8] px-6 md:px-12 lg:px-16 transition-all duration-300 ease-in-out ${
        scrolled ? 'py-2.5 shadow-sm' : 'py-5 md:py-6'
      }`}>
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              poster="/barbara-brown/bb_logo_official.jpg" 
              className={`w-auto object-contain rounded-xl shadow-sm border border-[#e5ded0]/80 hover:opacity-95 transition-all duration-300 ease-in-out ${
                scrolled ? 'h-10 md:h-12' : 'h-20 md:h-24'
              }`} 
            >
              <source src="/barbara-brown/bb_monogram_glint_video.mp4" type="video/mp4" />
              <img src="/barbara-brown/bb_logo_official.jpg" alt="Barbara Brown" className="h-full w-auto object-contain rounded-xl" />
            </video>
          </a>
          <nav className="hidden md:flex items-center gap-10 lg:gap-14 text-sm md:text-[15px] tracking-[0.14em] uppercase text-[#1a1715] font-semibold">
            <a href="#diferenciais" className="hover:text-[#8c5e23] transition-colors py-1">A Tecnologia</a>
            <a href="#engenharia" className="hover:text-[#8c5e23] transition-colors py-1">O Interior</a>
            <a href="#co-creator" className="text-[#8c5e23] hover:text-[#5c3e14] transition-colors py-1 font-bold">
              Programa Co-Creator
            </a>
          </nav>
          <a 
            href="#vip-access"
            className="text-xs md:text-sm uppercase tracking-widest bg-[#1a1715] hover:bg-[#332e29] text-white px-7 py-3.5 rounded-full font-semibold transition-all shadow-md"
          >
            Acesso Exclusivo
          </a>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-12 pb-24 px-6 md:px-12 lg:px-16 overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="text-center max-w-6xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f3ede1] border border-[#ded4c3] text-[11px] md:text-xs tracking-[0.22em] uppercase text-[#7d561d] mb-8 font-semibold shadow-sm">
              Marroquinaria Inteligente D2C
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.14] text-[#141210] mb-8 max-w-5xl mx-auto">
              Por fora, uma bolsa que impõe presença. <span className="italic text-[#8c5e23] block md:inline">Por dentro, uma bolsa que resolve a sua vida.</span>
            </h1>
            
            <div className="space-y-4 text-base md:text-xl text-[#332e29] font-normal leading-relaxed mb-12 max-w-4xl mx-auto">
              <p className="leading-relaxed">
                A maioria das bolsas premium foi desenhada para ser bonita. A <strong className="text-[#141210] font-semibold">Barbara Brown Tech Tote</strong> foi desenhada para fazer mais.
              </p>
              <p className="text-sm md:text-lg text-[#47413a] leading-relaxed">
                Couro nobre, estética de <em>Quiet Luxury</em> e uma arquitetura interna pensada para a mulher que passa o dia entre reuniões, aeroportos, restaurantes, escritórios, tribunais e compromissos que não cabem em uma bolsa convencional.
              </p>
              <p className="text-[#141210] font-medium pt-2 text-base md:text-lg">
                Sofisticação por fora. Engenharia invisível por dentro.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#co-creator" 
                className="w-full sm:w-auto px-9 py-4 bg-[#1a1715] hover:bg-[#332e29] text-white text-xs md:text-sm uppercase tracking-[0.18em] font-semibold rounded-full shadow-xl shadow-black/15 transition-all flex items-center justify-center gap-2"
              >
                Co-Criar Minha Bolsa Assinada <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#diferenciais" 
                className="w-full sm:w-auto px-9 py-4 bg-white hover:bg-[#f5efe6] border border-[#d8d0c2] text-[#2c2824] text-xs md:text-sm uppercase tracking-[0.18em] font-medium rounded-full shadow-sm transition-all"
              >
                Conhecer os 8 Diferenciais
              </a>
            </div>
          </div>

          {/* HERO VIDEO CONTAINER MAJESTOSO COM TRANSIÇÃO PARA FOTO DE ALTA RESOLUÇÃO */}
          <div className="relative rounded-3xl overflow-hidden border border-[#e5ded0] shadow-2xl bg-white p-2.5 sm:p-4 max-w-6xl mx-auto">
            <CinemaCrossfadeMedia
              videoSrc="/barbara-brown/bb_hero_marble_video.mp4"
              imageSrc="/barbara-brown/bb_hero_cognac.jpg"
              alt="Barbara Brown Tech Tote no Mármore - Visão Externa e Detalhes de Alta Resolução"
              id="hero-video-react"
              subtitle="Peça Fundadora • Edição 001"
              title="The Barbara Brown Tech Tote"
              description="Couro nobre granulado com acabamento hidrorrepelente invisível, ferragens em ouro fosco acetinado e arquitetura interna com compartimento secreto para rastreador."
              badgeText="Secret AirTag Vault Integrado"
            />
          </div>

        </div>
      </section>

      {/* 4. A VIDA REAL NÃO CABE EM UMA BOLSA COMUM */}
      <section className="py-20 px-6 bg-[#f4efe6] border-y border-[#e5dfd2]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8c5e23] font-bold">A Vida Real Não Cabe em uma Bolsa Comum</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#141210] mt-3">
              Você conhece essas situações.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl bg-white border border-[#e4ded3] shadow-sm hover:shadow-md transition-all">
              <h4 className="text-lg font-serif text-[#141210] mb-2.5 font-semibold">O café na mesa de reunião</h4>
              <p className="text-sm text-[#57514a] leading-relaxed">
                Um pequeno acidente pode transformar uma bolsa bonita em um problema caro. A proteção externa foi pensada para enfrentar a rotina real — inclusive respingos e pequenos acidentes do dia a dia.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-[#e4ded3] shadow-sm hover:shadow-md transition-all">
              <h4 className="text-lg font-serif text-[#141210] mb-2.5 font-semibold">O notebook que não deveria bater no chão</h4>
              <p className="text-sm text-[#57514a] leading-relaxed">
                Seu computador vale milhares de reais. Por que carregá-lo em um compartimento sem estrutura? A Tech Tote incorpora um espaço próprio para notebook, com proteção e posicionamento pensados para reduzir impactos.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-[#e4ded3] shadow-sm hover:shadow-md transition-all">
              <h4 className="text-lg font-serif text-[#141210] mb-2.5 font-semibold">A garrafa que não pode vazar</h4>
              <p className="text-sm text-[#57514a] leading-relaxed">
                Água, documentos, eletrônicos e maquiagem não deveriam dividir o mesmo espaço. Por isso, a bolsa possui uma área dedicada para líquidos, separando a garrafa do restante dos seus objetos.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-[#e4ded3] shadow-sm hover:shadow-md transition-all">
              <h4 className="text-lg font-serif text-[#141210] mb-2.5 font-semibold">E a segunda bolsa?</h4>
              <p className="text-sm text-[#57514a] leading-relaxed mb-3">
                Notebook. Agenda. Documentos. Carregadores. Maquiagem. Garrafa. Óculos. Celular. Quando a bolsa bonita não comporta sua rotina, aparece a ecobag.
              </p>
              <p className="text-xs uppercase tracking-wider text-[#8c5e23] font-bold">
                A Barbara Brown foi criada para eliminar essa escolha.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ELEGÂNCIA SEM ESFORÇO */}
      <section className="py-20 px-6 bg-[#fbf9f5]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8c5e23] font-bold">Elegância Sem Esforço</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#141210] mt-3 mb-6 leading-tight">
              A autoridade visual começa nos detalhes.
            </h2>
            <div className="space-y-4 text-base text-[#57514a] leading-relaxed mb-8">
              <p>
                A mulher Barbara Brown não precisa anunciar quem é. Ela entra na sala e a peça fala por ela.
              </p>
              <p>
                A estética é deliberadamente discreta: linhas limpas, proporções elegantes, materiais nobres e um monograma que não precisa chamar atenção para ser reconhecido.
              </p>
            </div>
            
            <div className="space-y-4 text-sm text-[#3b3631]">
              <div className="flex items-start gap-3">
                <span className="text-[#8c5e23] font-bold text-base mt-0.5">•</span>
                <p><strong className="text-[#141210]">Estrutura que permanece impecável:</strong> Uma construção interna estruturada mantém a silhueta da bolsa mesmo quando ela está sobre a mesa.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#8c5e23] font-bold text-base mt-0.5">•</span>
                <p><strong className="text-[#141210]">Leveza inteligente:</strong> A proposta é reduzir o peso desnecessário sem abrir mão da presença e da estrutura de uma bolsa premium.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#8c5e23] font-bold text-base mt-0.5">•</span>
                <p><strong className="text-[#141210]">Quiet Luxury:</strong> Nada de logotipo gigante. Nada de excesso. <span className="text-[#8c5e23] font-semibold">Luxo que se percebe de perto.</span></p>
              </div>
            </div>

            {/* MONOGRAMA EM OURO GLINT SHOWCASE */}
            <div className="mt-8 p-4 rounded-2xl bg-[#f5efe4] border border-[#d9cdba] flex items-center gap-4 shadow-sm">
              <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-[#d4c5ad] shadow-inner bg-white">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="/barbara-brown/bb_monogram_glint_video.mp4" type="video/mp4" />
                </video>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8c5e23] font-bold block mb-0.5">Assinatura Chanfrada em Ouro Acetinado</span>
                <p className="text-xs text-[#2a2622] leading-relaxed font-medium">O monograma BB foi esculpido para refletir a luz com sobriedade. Não para gritar uma marca, mas para assinar uma obra de arte funcional.</p>
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
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#e5dfd2] text-xs text-[#2c2824] shadow-lg">
                <span className="text-[#8c5e23] font-bold block mb-1 tracking-wider uppercase">ESTILO CORPORATIVO ATEMPORAL</span>
                Uma peça criada para acompanhar uma mulher que não organiza a vida em torno da bolsa — e sim a bolsa em torno da vida.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ENGENHARIA INVISÍVEL */}
      <section id="engenharia" className="py-20 px-6 bg-[#f4efe6] border-y border-[#e5dfd2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8c5e23] font-bold">Engenharia Invisível</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#141210] mt-3 mb-4">
              Finalmente, uma bolsa em que cada espaço tem uma função.
            </h2>
            <p className="text-base text-[#57514a]">
              Por fora, você vê couro. Por dentro, existe uma arquitetura.
            </p>
          </div>

          {/* ENGENHARIA INVISÍVEL: VÍDEO EXCLUSIVO COM TRANSIÇÃO PARA FOTO DE ALTA DEFINIÇÃO */}
          <div className="rounded-3xl overflow-hidden border border-[#e5ded0] shadow-2xl bg-white p-2.5 sm:p-4 mb-14 max-w-5xl mx-auto">
            <CinemaCrossfadeMedia
              videoSrc="/barbara-brown/bb_interior_video.mp4"
              imageSrc="/barbara-brown/bb_interior_engineering.jpg"
              alt="Arquitetura interna da Barbara Brown Tech Tote - Divisórias, MacBook e Secret AirTag Vault"
              id="interior-video-react"
              aspectClass="aspect-[16/10] md:aspect-[16/9] max-h-[600px]"
              subtitle="Arquitetura de Precisão"
              title="Cada Objeto com seu Espaço Exclusivo"
              badgeText="MacBook 14&quot; • Forro Champagne • AirTag"
            />
          </div>

          {/* OS 8 DIFERENCIAIS CARDS */}
          <div id="diferenciais" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <span className="text-xs font-mono text-[#8c5e23] font-bold tracking-widest block mb-1">01</span>
              <h4 className="text-base font-serif text-[#141210] mb-2 font-bold">SECRET AIRTAG VAULT</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Um compartimento discreto integrado à estrutura interna para acomodar seu rastreador. A bolsa pode ser localizada pelo sistema de rastreamento compatível com o dispositivo instalado.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <span className="text-xs font-mono text-[#8c5e23] font-bold tracking-widest block mb-1">02</span>
              <h4 className="text-base font-serif text-[#141210] mb-2 font-bold">PROTEÇÃO HIDRORREPELENTE</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Uma camada de proteção ajuda a repelir líquidos e facilita a limpeza de pequenos acidentes do cotidiano. Café, chuva e respingos deixam de ser uma emergência.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <span className="text-xs font-mono text-[#8c5e23] font-bold tracking-widest block mb-1">03</span>
              <h4 className="text-base font-serif text-[#141210] mb-2 font-bold">LAPTOP SLEEVE</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Compartimento dedicado para notebook de até 14", com proteção interna para reduzir o impacto durante o transporte.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <span className="text-xs font-mono text-[#8c5e23] font-bold tracking-widest block mb-1">04</span>
              <h4 className="text-base font-serif text-[#141210] mb-2 font-bold">COMPARTIMENTO PARA LÍQUIDOS</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Uma área separada para garrafa de água ou guarda-chuva ajuda a manter líquidos afastados de documentos, eletrônicos e objetos pessoais.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <span className="text-xs font-mono text-[#8c5e23] font-bold tracking-widest block mb-1">05</span>
              <h4 className="text-base font-serif text-[#141210] mb-2 font-bold">FORRO PREMIUM</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Um interior pensado para combinar estética, facilidade de manutenção e sensação de acabamento premium. Porque abrir a bolsa também faz parte da experiência.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <span className="text-xs font-mono text-[#8c5e23] font-bold tracking-widest block mb-1">06</span>
              <h4 className="text-base font-serif text-[#141210] mb-2 font-bold">ACESSO RÁPIDO AO SMARTPHONE</h4>
              <p className="text-xs text-[#57514a] leading-relaxed mb-1">
                Um compartimento externo de acesso rápido permite retirar e guardar o celular sem precisar abrir toda a bolsa.
              </p>
              <span className="text-[11px] text-[#8c5e23] font-semibold">Uma mão. Um movimento.</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <span className="text-xs font-mono text-[#8c5e23] font-bold tracking-widest block mb-1">07</span>
              <h4 className="text-base font-serif text-[#141210] mb-2 font-bold">RFID SAFE</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Compartimento desenvolvido para acomodar cartões e documentos que utilizam tecnologia RFID, adicionando uma camada de proteção contra leituras por aproximação.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5ded0] shadow-sm hover:shadow-md hover:border-[#a87a38]/60 transition-all">
              <span className="text-xs font-mono text-[#8c5e23] font-bold tracking-widest block mb-1">08</span>
              <h4 className="text-base font-serif text-[#141210] mb-2 font-bold">LEVEZA</h4>
              <p className="text-xs text-[#57514a] leading-relaxed">
                Uma bolsa de trabalho não deveria parecer um equipamento de trabalho. A construção busca equilibrar estrutura, capacidade e leveza para acompanhar jornadas longas com mais conforto.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. PROJETO MANHATTAN (CO-CREATOR) */}
      <section id="co-creator" className="py-24 px-6 bg-[#fbf9f5]">
        <div className="max-w-5xl mx-auto rounded-3xl p-8 md:p-14 bg-gradient-to-b from-[#fbf9f5] via-[#f7f2e8] to-[#f2ecde] border border-[#d9ccb6] shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8c5e23] font-bold block mb-2">
              Programa Co-Creator • Parceria de Prestígio
            </span>
            
            <h2 className="text-3xl md:text-5xl font-serif text-[#141210] leading-tight mb-6">
              Exclusivo para Influencers de Autoridade.<br />
              <span className="text-[#8c5e23]">Muito além de um publi: co-crie e assine sua própria bolsa de luxo.</span>
            </h2>

            <div className="space-y-4 text-base md:text-lg text-[#57514a] leading-relaxed mb-10">
              <p>
                Como influencer, sua audiência confia na sua curadoria e no seu padrão estético. Imagine sua comunidade reconhecendo na hora: <strong className="text-[#141210]">“Essa é a bolsa oficial assinada pela [seu nome].”</strong>
              </p>
              <p>
                Não se trata de divulgar cupons ou ações passageiras.<br />
                Trata-se de uma <strong className="text-[#141210]">peça de alta grife assinada por você</strong>, desenhada em parceria com a marroquinaria inteligente da Barbara Brown para materializar a sua visão.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-7 rounded-2xl bg-white border border-[#e5ded0] shadow-sm">
                <div className="text-[#8c5e23] font-serif text-lg mb-2 font-bold">01. CO-CRIAÇÃO COM IA</div>
                <p className="text-sm text-[#57514a] leading-relaxed mb-2">
                  Você participa das decisões de design: Cores. Acabamentos. Materiais. Detalhes.
                </p>
                <p className="text-sm text-[#57514a] leading-relaxed mb-2">
                  A inteligência artificial acelera a criação dos conceitos para transformar sua visão em possibilidades concretas de produto. Você não precisa imaginar sozinha.
                </p>
                <p className="text-xs uppercase tracking-wider text-[#8c5e23] font-bold">
                  Você vê. Escolhe. Ajusta. Cria.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-white border border-[#e5ded0] shadow-sm">
                <div className="text-[#8c5e23] font-serif text-lg mb-2 font-bold">02. O MODELO LEVA O SEU NOME</div>
                <p className="text-sm text-[#57514a] leading-relaxed mb-2">
                  Sua peça pode ganhar uma identidade própria dentro da coleção: <em>The Juliana Executive</em>, <em>The Duda Classic</em>, <em>The [Seu Nome] Signature</em>.
                </p>
                <p className="text-sm text-[#57514a] leading-relaxed mb-2">
                  Sua autoridade deixa de estar apenas no conteúdo.
                </p>
                <p className="text-xs uppercase tracking-wider text-[#8c5e23] font-bold">
                  Ela passa a existir também em um produto.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-white border border-[#e5ded0] shadow-sm">
                <div className="text-[#8c5e23] font-serif text-lg mb-2 font-bold">03. SEM FÁBRICA. SEM ESTOQUE. SEM OPERAÇÃO.</div>
                <p className="text-sm text-[#57514a] leading-relaxed mb-2">
                  Criar uma marca de bolsas tradicional exige capital, estoque, fornecedores, logística, atendimento e uma operação inteira. No Co-Creator, a Barbara Brown cuida da infraestrutura: Desenvolvimento. Produção. Embalagem. Faturamento. Atendimento. Logística.
                </p>
                <p className="text-xs uppercase tracking-wider text-[#8c5e23] font-bold">
                  Você concentra sua energia naquilo que já sabe fazer: influência, comunidade e autoridade.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-white border border-[#e5ded0] shadow-sm">
                <div className="text-[#8c5e23] font-serif text-lg mb-2 font-bold">04. PARTICIPAÇÃO NAS VENDAS</div>
                <p className="text-sm text-[#57514a] leading-relaxed mb-2">
                  Você recebe <strong className="text-[#141210]">20% de comissão</strong> sobre as vendas da sua peça assinada. E ainda <strong className="text-[#141210]">15% de comissão</strong> sobre outros produtos Barbara Brown adquiridos pela sua comunidade.
                </p>
                <p className="text-xs uppercase tracking-wider text-[#8c5e23] font-bold">
                  Quanto mais sua comunidade se identifica com a peça, maior o potencial da sua participação.
                </p>
              </div>
            </div>

            {/* O BILHETE DOURADO */}
            <div className="p-7 rounded-2xl bg-[#f7edd9] border border-[#d9b875] mb-12 shadow-sm">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8c5e23] font-bold block mb-1">O Bilhete Dourado</span>
              <h4 className="text-xl font-serif text-[#2e2310] font-bold mb-2">Uma experiência para transformar compradoras em protagonistas.</h4>
              <p className="text-sm text-[#574421] leading-relaxed mb-2">
                No lote de lançamento, parte das unidades poderá participar da ação Bilhete Dourado. AirTags originais serão utilizados como elemento-surpresa da experiência de unboxing, criando um motivo natural para Stories, compartilhamentos e marcações.
              </p>
              <p className="text-xs uppercase tracking-wider text-[#8c5e23] font-bold">
                Não é apenas abrir uma caixa. É descobrir o que existe dentro dela.
              </p>
            </div>

            {/* AGORA, A PARTE MAIS EXCLUSIVA */}
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8c5e23] font-bold block mb-2">Agora, a parte mais exclusiva.</span>
              <h3 className="text-2xl md:text-3xl font-serif text-[#141210] font-bold mb-4">O Programa Co-Creator BBB</h3>
              <p className="text-sm md:text-base text-[#57514a] leading-relaxed mb-6">
                Estamos selecionando um grupo limitado de criadoras para participar da primeira fase do projeto. Não buscamos simplesmente audiência. Buscamos <strong className="text-[#141210]">autoridade</strong>: mulheres cuja comunidade confia em suas escolhas, que influenciam comportamento e que poderiam transformar uma peça em um objeto de desejo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto text-xs md:text-sm text-[#3b3631] bg-white p-6 rounded-2xl border border-[#e5ded0] shadow-sm">
                <p>✓ Briefing confidencial do projeto</p>
                <p>✓ Participação na definição da sua peça</p>
                <p>✓ Kit Fundadora</p>
                <p>✓ Possibilidade de ter uma bolsa com sua assinatura</p>
                <p>✓ Comissão sobre as vendas</p>
                <p>✓ Participação na primeira coleção Co-Creator</p>
              </div>
            </div>

            {/* FORMULÁRIO VIP */}
            <div id="vip-access" className="bg-white p-8 md:p-10 rounded-2xl border border-[#e2dacb] shadow-xl max-w-xl mx-auto">
              <h3 className="text-2xl font-serif text-[#141210] mb-1.5 text-center font-bold">Sua audiência já confia em você.</h3>
              <p className="text-sm font-serif text-[#8c5e23] text-center mb-2">Agora, imagine ela usando algo que nasceu da sua assinatura.</p>
              <p className="text-xs text-[#6b645b] text-center mb-8 leading-relaxed">
                Ative seu acesso ao Programa Co-Creator BBB. Informe seus dados para receber o briefing completo e conversar com a <strong>Clara</strong>, responsável pela ativação das primeiras criadoras.
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
                      <option value="Cognac Heritage — Caramelo Nobre">Cognac Heritage — Caramelo Nobre</option>
                      <option value="Noir Carbon — Preto Fosco">Noir Carbon — Preto Fosco</option>
                      <option value="Sand Taupe — Nude Contemporâneo">Sand Taupe — Nude Contemporâneo</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-[#1a1715] hover:bg-[#332e29] text-white font-semibold text-xs uppercase tracking-[0.18em] rounded-xl transition-all shadow-xl shadow-black/15 flex items-center justify-center gap-2 mt-5 cursor-pointer"
                  >
                    Confirmar Interesse & Falar com a Clara <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 8. FOOTER EDITORIAL LUXO */}
      <footer className="py-14 px-6 border-t border-[#262422] bg-[#141312] text-center text-white/60 text-xs tracking-widest">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2 text-left">
            <img 
              src="/barbara-brown/bb_logo_official.jpg" 
              alt="Barbara Brown" 
              className="h-12 md:h-14 w-auto object-contain rounded-xl border border-white/15 shadow-md"
            />
            <p className="text-white/40 text-[11px] tracking-normal">Design atemporal. Engenharia invisível.</p>
          </div>
          <p>© 2026 Barbara Brown Bags. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6 text-white/50 text-[11px]">
            <span>Vale dos Sinos • RS</span>
            <span>São Paulo • SP</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
