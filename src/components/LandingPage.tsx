import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Shield, Clock, Key, CircleCheck as CheckCircle, Calculator, Search, Target, Users, TrendingUp, Award, Star, ArrowRight, Phone, Mail, Menu, X, MapPin, MessageCircle, Scale, Gavel } from "lucide-react";
import heroImage from "@/assets/barra-hero-new.jpg";
import marcusProfile from "@/assets/marcus-profile.jpg";
import godoyLogo from "@/assets/godoy-logo.png";

const LandingPage = () => {
  const [highlightedCards, setHighlightedCards] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '', whatsapp: '', faixa: '', tipo: '', momento: '' });
  const toggleCardHighlight = (cardIndex: number) => {
    setHighlightedCards(prev => prev.includes(cardIndex) ? prev.filter(index => index !== cardIndex) : [...prev, cardIndex]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nome = encodeURIComponent(formData.nome.trim().slice(0, 100));
    const faixa = encodeURIComponent(formData.faixa);
    const tipo = encodeURIComponent(formData.tipo);
    const momento = encodeURIComponent(formData.momento);
    const text = `Olá Marcus. Tenho interesse no PSI. Nome: ${nome} Faixa: ${faixa} Tipo: ${tipo} Momento: ${momento}`;
    window.open(`https://wa.me/5521964075124?text=${text}`, '_blank');
    trackWhatsAppClick("cta-final-form");
  };

  // Meta Pixel tracking functions
  const trackCalendlyClick = (buttonLocation: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Consultoria Exclusiva",
        button_location: buttonLocation
      });
    }
  };
  const trackWhatsAppClick = (buttonLocation: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Contact", {
        content_name: "WhatsApp",
        button_location: buttonLocation
      });
    }
  };

  // Add HeyGen script to document
  useEffect(() => {
    const script = document.createElement("script");
    const clientWidth = document.body.clientWidth;
    const isMobile = clientWidth < 640;
    script.innerHTML = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJLYXR5YV9Qcm9mZXNzaW9uYWxMb29rX3B1%0D%0AYmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzM0%0D%0AOGRkZjUwM2M2NTRiOWJiYmI4YmVhOWY5MjEwZWFkXzU1ODcwL3ByZXZpZXdfdGFyZ2V0LndlYnAi%0D%0ALCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6dHJ1ZSwia25vd2xlZGdlQmFzZUlkIjoiYWI2NmI1ZjNk%0D%0AYWRmNGQ1YmJkZTI3YmZiMDVhMzgwNjIiLCJ1c2VybmFtZSI6IjRiYjNhNThlMzlmNDQ4OTFiNzgy%0D%0ANWI3YzMyZWRhMDcxIn0%3D&inIFrame=1",clientWidth=document.body.clientWidth,isMobile=clientWidth<640,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`
  #heygen-streaming-embed {
    z-index: 9997;
    position: fixed;
    left: \${isMobile ? '12px' : '24px'};
    bottom: \${isMobile ? '70px' : '24px'};
    width: \${isMobile ? '70px' : '90px'};
    height: \${isMobile ? '70px' : '90px'};
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
    transition: all linear 0.15s;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
  }
  #heygen-streaming-embed.show {
    opacity: 1;
    visibility: visible;
  }
  #heygen-streaming-embed.expand {
    \${clientWidth<540?"height: 55vh; max-height: 350px; width: 90%; left: 50%; transform: translateX(-50%); bottom: 70px;":"height: 366px; width: calc(366px * 16 / 9); bottom: 24px; left: 24px; transform: none;"}
    border: 0;
    border-radius: 12px;
    z-index: 9999;
  }
  #heygen-streaming-container {
    width: 100%;
    height: 100%;
  }
  #heygen-streaming-container iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
  \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.body.appendChild(wrapDiv)}(globalThis);`;
    document.body.appendChild(script);
    return () => {
      const heygenEmbed = document.getElementById("heygen-streaming-embed");
      if (heygenEmbed) {
        heygenEmbed.remove();
      }
    };
  }, []);

  // Fade-in on scroll with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const elements = document.querySelectorAll('.fade-up, .eyebrow-animated');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm safe-area-inset">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center space-x-2 md:space-x-3 min-w-0">
              <img src={godoyLogo} alt="Godoy Prime Realty" className="h-8 w-8 sm:h-9 sm:w-9 md:h-12 md:w-12 flex-shrink-0" />
              <span className="text-sm sm:text-base md:text-xl font-bold text-luxury-navy truncate">Godoy Prime Realty</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="#conceito" className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium text-sm xl:text-base">
                Conceito
              </a>
              <a href="#como-funciona" className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium text-sm xl:text-base">
                Como Funciona
              </a>
              <a href="#precos" className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium text-sm xl:text-base">
                Serviços
              </a>
              <a href="#autoridade-final" className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium text-sm xl:text-base">
                Sobre
              </a>
              <a href="#faq" className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium text-sm xl:text-base">
                FAQ
              </a>
            </nav>

            {/* Contact Info & Mobile Menu */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="hidden xl:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 text-luxury-navy">
                  <Phone className="h-4 w-4" />
                  <span>(21) 4040-0067</span>
                </div>
                <div className="flex items-center space-x-2 text-luxury-navy">
                  <MessageCircle className="h-4 w-4" />
                  <span>(21) 96407-5124</span>
                </div>
              </div>

              {/* Mobile menu button */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-3 -mr-2 text-luxury-navy hover:text-luxury-gold transition-colors touch-manipulation" aria-label="Toggle menu">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && <div className="lg:hidden py-2 border-t border-border bg-white animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
              <nav className="flex flex-col">
                <a href="#conceito" className="text-luxury-navy hover:text-luxury-gold hover:bg-muted/50 transition-colors font-medium py-4 px-2 border-b border-border/50 touch-manipulation" onClick={() => setMobileMenuOpen(false)}>
                  Conceito
                </a>
                <a href="#como-funciona" className="text-luxury-navy hover:text-luxury-gold hover:bg-muted/50 transition-colors font-medium py-4 px-2 border-b border-border/50 touch-manipulation" onClick={() => setMobileMenuOpen(false)}>
                  Como Funciona
                </a>
                <a href="#precos" className="text-luxury-navy hover:text-luxury-gold hover:bg-muted/50 transition-colors font-medium py-4 px-2 border-b border-border/50 touch-manipulation" onClick={() => setMobileMenuOpen(false)}>
                  Serviços
                </a>
                <a href="#autoridade-final" className="text-luxury-navy hover:text-luxury-gold hover:bg-muted/50 transition-colors font-medium py-4 px-2 border-b border-border/50 touch-manipulation" onClick={() => setMobileMenuOpen(false)}>
                  Sobre
                </a>
                <a href="#faq" className="text-luxury-navy hover:text-luxury-gold hover:bg-muted/50 transition-colors font-medium py-4 px-2 border-b border-border/50 touch-manipulation" onClick={() => setMobileMenuOpen(false)}>
                  FAQ
                </a>

                {/* Mobile Contact Info */}
                <div className="pt-4 px-2 space-y-1">
                  <a href="tel:+552140400067" className="flex items-center space-x-3 text-luxury-navy py-3 touch-manipulation">
                    <Phone className="h-5 w-5 text-luxury-gold" />
                    <span className="text-base">(21) 4040-0067</span>
                  </a>
                  <a href="https://wa.me/5521964075124" className="flex items-center space-x-3 text-luxury-navy py-3 touch-manipulation">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    <span className="text-base">(21) 96407-5124</span>
                  </a>
                </div>
              </nav>
            </div>}
        </div>
      </header>

      {/* 1. Hero Section — UNCHANGED */}
      <section id="hero" className="relative min-h-[85svh] sm:min-h-[75svh] md:min-h-[85svh] flex items-center justify-center overflow-hidden pt-14 sm:pt-16 md:pt-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/80 via-luxury-navy/70 to-luxury-navy/85"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-5 md:px-6 text-left text-white py-4 sm:py-5 md:py-8">
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-4 md:mb-6 border-luxury-gold text-luxury-gold bg-white/10 text-xs sm:text-sm px-3 py-1">
              Personal Shopper Imobiliário
            </Badge>

            <div className="w-12 h-px bg-luxury-gold mb-4 md:mb-6"></div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.2] max-w-5xl">
              Comprar imóvel de alto padrão sem representação exclusiva é o erro mais caro do mercado imobiliário.
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 text-white/90 max-w-4xl leading-relaxed">
              Eu represento <span className="text-luxury-gold font-semibold">compradores exigentes</span> na Barra da
              Tijuca e Recreio — usando dados reais, curadoria técnica e negociação profissional.
            </p>

            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/80 max-w-3xl">
              Sem conflito de interesses. Sem perda de tempo. Sem risco de prejuízos e surpresas futuras.
            </p>

            <a href="https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario" target="_blank" rel="noopener noreferrer" onClick={() => trackCalendlyClick("hero")} className="inline-flex items-center gap-2 mb-3 md:mb-4 py-3 px-5 md:py-4 md:px-10 border border-luxury-gold text-luxury-gold bg-transparent uppercase tracking-[0.18em] text-[10px] md:text-[11px] font-medium transition-all duration-300 hover:bg-luxury-gold hover:text-luxury-navy rounded-md group touch-manipulation">
              <span>Agendar conversa gratuita</span>
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
            </a>

            <p className="text-sm md:text-base text-white/70">Conversa direta. Sem compromisso. Sem venda de imóveis.</p>
          </div>
        </div>
      </section>

      {/* 2. Mercado — #F7F6F3 */}
      <section id="mercado" className="py-16 md:py-24 bg-luxury-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-left mb-14">
              <h2 className="fade-up font-['Cormorant_Garamond',serif] font-light tracking-[-0.02em] leading-[1.1] text-luxury-navy mb-5" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
                O mercado imobiliário não foi desenhado<br />para o comprador.
              </h2>
              <p className="fade-up font-['DM_Sans',sans-serif] font-light leading-[1.85] text-[#8A8A8A] max-w-[560px]">
                A maioria das recomendações vem de quem está vendendo — não de quem está protegendo sua decisão. E é exatamente aí que começam os erros caros.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              <Card className="bg-card border border-border shadow-luxury hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 md:p-12">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">⚠️</div>
                  <h3 className="text-xl md:text-2xl font-medium text-luxury-navy mb-2 md:mb-3">
                    Conflito de Interesse Estrutural
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Quanto mais caro você paga, mais o corretor ganha. Nenhum incentivo para negociar menor.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-luxury hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 md:p-12">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">💸</div>
                  <h3 className="text-xl md:text-2xl font-medium text-luxury-navy mb-2 md:mb-3">
                    Preços Inflados Sem Critério
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Você não tem acesso a transações reais. Paga baseado em "feeling" e informação assimétrica.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-luxury hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 md:p-12">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">⏱️</div>
                  <h3 className="text-xl md:text-2xl font-medium text-luxury-navy mb-2 md:mb-3">Tempo Desperdiçado</h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Visita 30-40 imóveis errados em 2-3 meses. 80-120 horas perdidas (R$ 40-60k se você ganha R$ 500/h).
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-luxury hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 md:p-12">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">🚨</div>
                  <h3 className="text-xl md:text-2xl font-medium text-luxury-navy mb-2 md:mb-3">
                    Risco de Erro Invisível
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Problemas estruturais, condomínio em litígio, documentação irregular. Descobertos tarde demais.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-luxury-navy rounded-xl md:rounded-2xl p-8 md:p-12 text-center">
              <p className="text-xl md:text-2xl text-white leading-relaxed">
                <strong className="text-luxury-gold">No alto padrão, um erro custa R$ 100k a R$ 500k.</strong>
                <br />E você só descobre depois de assinar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Conceito — Fusão de solucao + representacao */}
      <section id="conceito" className="bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">

            {/* — Bloco Solução — */}
            <div className="py-16 md:py-24">
              {/* Bloco 1 — Declaração */}
              <h2 className="fade-up font-['Cormorant_Garamond',serif] font-light leading-[1.1] tracking-[-0.02em] text-luxury-navy text-left border-l-2 border-luxury-gold pl-6 mb-12" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                Aqui, o interesse é um só: o seu.
              </h2>

              {/* Bloco 2 — Parágrafos */}
              <div className="max-w-[600px] text-left mb-16 space-y-6">
                <p className="font-['DM_Sans',sans-serif] font-light text-[15px] leading-[1.85] text-[#8A8A8A]">
                  Atuamos ao seu lado durante toda a jornada de compra, sem conflito, sem pressão e sem viés comercial. Nosso papel é estruturar a melhor decisão possível, com base em leitura de mercado, análise técnica e curadoria estratégica.
                </p>
                <p className="font-['DM_Sans',sans-serif] font-light text-[15px] leading-[1.85] text-[#8A8A8A]">
                  Este modelo existe há décadas em mercados maduros: o Buyer's Agent na Austrália e nos EUA, o Personal Shopper Inmobiliario na Espanha. No Rio de Janeiro, chegou agora.
                </p>
              </div>

              {/* Bloco 3 — Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                <div className="bg-luxury-cream rounded-xl md:rounded-2xl p-8 md:p-12 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-6 h-px bg-luxury-gold mb-6"></div>
                  <h3 className="text-xl md:text-2xl font-bold text-luxury-navy mb-3 md:mb-4">Identifico o Imóvel EXATO</h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Você não vê "opções do mercado". Você define seu critério (localização, tamanho, acabamento, orçamento), e EU identifico qual imóvel realmente atende isso.
                  </p>
                </div>

                <div className="bg-luxury-cream rounded-xl md:rounded-2xl p-8 md:p-12 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-6 h-px bg-luxury-gold mb-6"></div>
                  <h3 className="text-xl md:text-2xl font-bold text-luxury-navy mb-3 md:mb-4">Você Visita Apenas os Certos</h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    EU visito dezenas de imóveis, faço due diligence completa (estrutura, documentação, condomínio), e apresento apenas aqueles que atendem 100% seu critério. Você visita 5-8, não 30-40.
                  </p>
                </div>

                <div className="bg-luxury-cream rounded-xl md:rounded-2xl p-8 md:p-12 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-6 h-px bg-luxury-gold mb-6"></div>
                  <h3 className="text-xl md:text-2xl font-bold text-luxury-navy mb-3 md:mb-4">Due Diligence Profissional</h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Antes de você pisar no imóvel, eu já analisei estrutura, fachada, acabamento, saúde do condomínio, regularidade de documentação, e comparei preço com transações reais.{" "}
                    <strong className="text-luxury-navy">Zero surpresas pós-compra.</strong>
                  </p>
                </div>

                <div className="bg-luxury-cream rounded-xl md:rounded-2xl p-8 md:p-12 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-6 h-px bg-luxury-gold mb-6"></div>
                  <h3 className="text-xl md:text-2xl font-bold text-luxury-navy mb-3 md:mb-4">Negociação Baseada em Dados</h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Estratégia profissional, múltiplas rodadas de contra-proposta, baseada em análise real de mercado. Meu incentivo é o desconto.
                    <strong className="text-luxury-navy"> Seu incentivo também.</strong>
                  </p>
                </div>
              </div>

              <div className="bg-luxury-navy rounded-xl md:rounded-2xl p-8 md:p-12 text-center">
                <p className="text-xl md:text-2xl text-white leading-relaxed">
                  A tecnologia analisa. <strong className="text-luxury-gold">Eu decido.</strong>
                </p>
              </div>
            </div>

          {/* — Conteúdo ex-representacao — dark sub-section */}
          <div className="bg-luxury-navy rounded-none -mx-4 md:-mx-6 px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4 md:mb-6 text-white leading-tight max-w-5xl mx-auto">
                Existe uma diferença legal entre intermediação e representação que a maioria não conhece.
              </h2>
              <p className="text-luxury-gold font-semibold italic text-base md:text-lg mb-4 leading-relaxed max-w-3xl mx-auto">
                Com intermediação, quanto mais você paga, mais o corretor ganha. 
                Com representação, quanto mais você economiza, mais eu ganho. 
                Ela muda tudo.
              </p>
              <p className="text-sm md:text-base text-white/60 max-w-3xl mx-auto leading-relaxed">
                Não é semântica. É estrutural. E muda completamente como você é protegido.
              </p>
            </div>

            {/* Comparação Legal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
              {/* Intermediação */}
              <Card className="bg-white border-2 border-destructive/30 shadow-luxury hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="bg-destructive/10 p-4 md:p-6 border-b-[3px] border-destructive text-center">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">❌ Intermediação (Modelo Tradicional)</h3>
                  <p className="text-xs md:text-sm text-muted-foreground italic">Corretor como mediador neutro</p>
                </div>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4 md:space-y-5">
                    {[{
                    label: "Lealdade",
                    text: "Equilibrada. Sem favor a ninguém."
                  }, {
                    label: "Autoridade",
                    text: "Apenas facilita comunicação."
                  }, {
                    label: "Incentivo",
                    text: "Quanto mais você paga, mais ganha.",
                    highlight: true
                  }, {
                    label: "Conflito",
                    text: "Estrutural. Ganha mais se você pagar mais."
                  }, {
                    label: "Resultado",
                    text: "Preço: o que o mercado aceitar."
                  }].map((item, index) => <div key={index} className="pb-3 border-b border-border last:border-b-0 last:pb-0">
                        <span className="block text-[10px] md:text-xs font-bold uppercase text-destructive mb-1">{item.label}</span>
                        <p className={cn("text-xs md:text-sm text-muted-foreground leading-relaxed", item.highlight && "font-semibold text-foreground")}>{item.text}</p>
                      </div>)}
                  </div>
                </CardContent>
                <div className="bg-muted p-3 md:p-4 border-t border-border">
                  <p className="text-xs md:text-sm text-foreground leading-relaxed">
                    <strong>Risco:</strong> Você negocia sozinho. Corretor quer fechar rápido.
                  </p>
                </div>
              </Card>

              {/* Representação */}
              <Card className="bg-white border-2 border-luxury-gold shadow-luxury hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="bg-luxury-gold/10 p-4 md:p-6 border-b-[3px] border-luxury-gold text-center">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">✅ Representação (PSI)</h3>
                  <p className="text-xs md:text-sm text-muted-foreground italic">Advogado do seu lado</p>
                </div>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {[{
                    label: "Lealdade",
                    text: "100% exclusiva ao comprador.",
                    highlight: true
                  }, {
                    label: "Autoridade",
                    text: "Negocio por você, com sua autorização."
                  }, {
                    label: "Incentivo",
                    text: "Quanto mais você economiza, mais ganho.",
                    highlight: true
                  }, {
                    label: "Conflito",
                    text: "Eliminado. Interesses alinhados."
                  }, {
                    label: "Resultado",
                    text: "Melhor preço + segurança jurídica."
                  }].map((item, index) => <div key={index} className="pb-3 border-b border-border last:border-b-0 last:pb-0">
                        <span className="block text-[10px] md:text-xs font-bold uppercase text-luxury-gold mb-1">{item.label}</span>
                        <p className={cn("text-xs md:text-sm text-muted-foreground leading-relaxed", item.highlight && "font-semibold text-foreground")}>{item.text}</p>
                      </div>)}
                  </div>
                </CardContent>
                <div className="bg-muted p-4 border-t border-border">
                  <p className="text-xs md:text-sm text-foreground leading-relaxed">
                    <strong>Proteção para você:</strong> Você tem um advogado negociando. 
                    Meu ganho depende de conseguir desconto real.
                  </p>
                </div>
              </Card>
            </div>

            {/* Diferença Chave */}
            <div className="bg-white/5 p-5 md:p-8 rounded-xl md:rounded-2xl border-l-4 border-luxury-gold mb-8 md:mb-12">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">A Diferença-Chave</h3>
              <div className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-[200px_30px_1fr] gap-2 md:gap-5 items-center pb-4 border-b border-luxury-gold/20">
                  <div className="text-sm md:text-base font-semibold text-white">Intermediação</div>
                  <div className="hidden md:block text-center text-luxury-gold font-bold">→</div>
                  <div className="text-sm md:text-base text-white/70">Você paga mais, corretor ganha mais. Conflito estrutural.</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[200px_30px_1fr] gap-2 md:gap-5 items-center">
                  <div className="text-sm md:text-base font-semibold text-white">Representação (PSI)</div>
                  <div className="hidden md:block text-center text-luxury-gold font-bold">→</div>
                  <div className="text-sm md:text-base text-white/70">Você economiza mais, eu ganho mais. Incentivos alinhados.</div>
                </div>
              </div>
            </div>

            {/* Proteção Jurídica */}
            <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border-2 border-luxury-gold mb-8 md:mb-12">
              <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-3 md:mb-4">Proteção Jurídica</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                A representação não é apenas um modelo comercial. 
                É um <strong className="text-foreground">vínculo jurídico</strong> que te protege.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[{
                num: "1",
                title: "Dever Fiduciário",
                text: "Obrigação legal de lealdade, diligência e confidencialidade. Você é minha prioridade absoluta."
              }, {
                num: "2",
                title: "Contrato Blindado",
                text: "Tudo por escrito. Escopo, poderes, remuneração, prazos. Sem ambiguidades."
              }, {
                num: "3",
                title: "Exclusividade",
                text: "Você é meu único cliente neste negócio. Nenhum conflito com outras partes."
              }, {
                num: "4",
                title: "Responsabilidade",
                text: "Se eu errar, você tem recourse legal. Minha responsabilidade é clara e definida."
              }].map(item => <div key={item.num} className="p-4 md:p-6 bg-muted rounded-lg border-l-4 border-luxury-gold">
                    <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-luxury-navy text-white rounded-full font-bold text-sm md:text-lg mb-3 md:mb-4">{item.num}</div>
                    <h4 className="text-sm md:text-base font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>)}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-white/5 p-6 md:p-10 rounded-xl md:rounded-2xl">
              <p className="text-base md:text-lg text-white mb-4 md:mb-6 leading-relaxed">
                Representação não é apenas um modelo comercial.
                <br />
                <span className="text-white font-medium">É proteção jurídica + alinhamento de interesses.</span>
              </p>
              <Button variant="gold" size="lg" className="shadow-gold transition-all duration-300 hover:scale-105 group w-full sm:w-auto h-auto py-3 px-5 md:py-4 md:px-10 text-sm md:text-lg touch-manipulation" asChild>
                <a href="https://wa.me/5521964075124?text=Quero%20entender%20melhor%20a%20representacao%20exclusiva%20do%20PSI" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("representacao")} className="flex items-center justify-center gap-2 text-center">
                  <span>Entender a Representação Exclusiva</span>
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </a>
              </Button>
            </div>

            </div>
          </div>

          </div>
        </div>
      </section>

      {/* 4. Como Funciona — #1A1E2A */}
      <section id="como-funciona" className="py-16 md:py-24 bg-luxury-charcoal">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-[640px] mx-auto">
            <p className="eyebrow-animated font-['DM_Sans',sans-serif] uppercase tracking-[0.2em] font-light text-[11px] text-luxury-gold mb-14">
              Como trabalhamos
            </p>

            <div className="space-y-0">
              {[
                { num: '01', title: 'Entendimento do seu momento', desc: 'Mapeamos seu perfil, orçamento, prioridades e prazo antes de qualquer busca.' },
                { num: '02', title: 'Leitura de mercado', desc: 'Analisamos transações reais registradas no ITBI — não anúncios — para identificar o valor justo.' },
                { num: '03', title: 'Curadoria estratégica', desc: 'Visitamos e filtramos os imóveis. Você vê apenas os que realmente fazem sentido.' },
                { num: '04', title: 'Análise comparativa', desc: 'Cada opção avaliada com metodologia técnica: estrutura, documentação, valor por m².' },
                { num: '05', title: 'Acompanhamento até a decisão', desc: 'Conduzimos a negociação em seu nome até a assinatura. Sem surpresas.' },
              ].map((item, i, arr) => (
                <div key={i}>
                  <div className="fade-up py-7" style={{ transitionDelay: `${i * 100}ms` }}>
                    <span className="font-['Cormorant_Garamond',serif] text-[13px] text-luxury-gold block mb-3">{item.num}</span>
                    <h3 className="font-['DM_Sans',sans-serif] text-[18px] font-normal text-white mb-2">{item.title}</h3>
                    <p className="font-['DM_Sans',sans-serif] text-[13px] font-light leading-[1.8] text-white/45">{item.desc}</p>
                  </div>
                  {i < arr.length - 1 && <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)', borderWidth: '0.5px' }}></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Preços — #0F1118 */}
      <section id="precos" className="py-16 md:py-24 bg-luxury-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="fade-up font-['Cormorant_Garamond',serif] font-light leading-[1.1] tracking-[-0.02em] text-white text-left mb-16" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              Três formas de atuar ao seu lado
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
              {[
                {
                  name: 'Parecer Godoy Prime',
                  category: 'Atestado de Valor',
                  desc: 'Análise técnica e estratégica para validar o valor real de um imóvel que você já identificou. Com dados reais de cartório, não de anúncio.',
                  price: 'A partir de R$ 4.900',
                  cta: 'Solicitar Parecer',
                },
                {
                  name: 'Compra Blindada',
                  category: 'Validação e Negociação',
                  desc: 'Para quem já tem um imóvel em vista e quer negociação profissional com representação exclusiva. Da análise até a assinatura.',
                  price: 'A partir de R$ 10.000',
                  cta: 'Blindar Minha Compra',
                },
                {
                  name: 'Prime Buyer Experience',
                  category: 'Busca Completa',
                  desc: 'Assessoria integral para quem ainda está buscando. Curadoria ativa, visitas técnicas prévias e gestão completa até as chaves.',
                  price: 'Sob consulta',
                  cta: 'Solicitar Proposta',
                },
              ].map((plan, i) => (
                <div key={i} className="fade-up p-9 rounded-sm" style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', transitionDelay: `${i * 100}ms` }}>
                  <div className="w-8 h-px bg-luxury-gold mb-5"></div>
                  <h3 className="font-['Cormorant_Garamond',serif] text-[24px] text-white mb-2">{plan.name}</h3>
                  <p className="font-['DM_Sans',sans-serif] uppercase text-[9px] tracking-[0.15em] text-luxury-gold mb-4">{plan.category}</p>
                  <p className="font-['DM_Sans',sans-serif] text-[13px] font-light leading-[1.8] text-white/45 mb-6">{plan.desc}</p>
                  <p className="font-['DM_Sans',sans-serif] text-[13px] text-white/40 mb-6">{plan.price}</p>
                  <a
                    href="https://wa.me/5521964075124?text=Quero%20saber%20mais%20sobre%20o%20servi%C3%A7o"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("precos")}
                    className="inline-block uppercase tracking-[0.15em] text-[10px] text-luxury-gold px-5 py-2.5 rounded-sm bg-transparent transition-all duration-300 hover:bg-luxury-gold hover:text-luxury-navy"
                    style={{ border: '0.5px solid rgba(201,168,76,0.4)' }}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>

            <div className="text-center pt-6" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
              <p className="font-['DM_Sans',sans-serif] text-[11px] text-white/25 leading-[1.7] max-w-2xl mx-auto">
                O valor pago no Parecer é integralmente abatido na Compra Blindada. O valor da Compra Blindada é abatido no Prime Buyer Experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Diferenciação — #F7F6F3 */}
      <section id="diferenciacao" className="py-16 md:py-24 bg-luxury-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Abertura */}
            <div className="text-left mb-0">
              <h2 className="fade-up font-['Cormorant_Garamond',serif] font-light italic leading-[1.1] tracking-[-0.02em] text-luxury-navy" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
                A maioria compra baseado em percepção.
              </h2>
              <p className="fade-up font-['DM_Sans',sans-serif] font-light text-[15px] leading-[1.85] text-[#8A8A8A] max-w-[520px] mt-5">
                Nós trabalhamos com leitura real de mercado, dados e contexto. Isso reduz risco e melhora o resultado da decisão.
              </p>
            </div>

            {/* Separador */}
            <div className="my-14" style={{ borderTop: '0.5px solid rgba(0,0,0,0.08)' }}></div>

            {/* Tabela comparativa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-16 sm:pb-0">
              {/* Traditional Realtor */}
              <Card className="bg-white shadow-none" style={{ border: '0.5px solid rgba(0,0,0,0.08)' }}>
                <CardContent className="p-4 sm:p-5 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-luxury-navy mb-3 sm:mb-4 md:mb-6 flex items-center gap-2">
                    <X className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#8A8A8A] flex-shrink-0" /> Corretor Tradicional
                  </h3>
                  <ul className="space-y-2.5 sm:space-y-3 md:space-y-4">
                    {['Ganha % do preço final (quanto mais caro, mais ganha)', 'Trabalha para o vendedor (quem paga a comissão)', 'Incentivo: vender imóvel CARO', 'Mostra estoque (não filtra)', 'Você visita 30-40 imóveis', 'Risco de erro estrutural'].map((text, i) => (
                      <li key={i} className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                        <X className="h-4 w-4 md:h-5 md:w-5 text-[#8A8A8A] mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* PSI */}
              <Card className="bg-white shadow-none" style={{ border: '0.5px solid rgba(0,0,0,0.08)' }}>
                <CardContent className="p-4 sm:p-5 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-luxury-navy mb-3 sm:mb-4 md:mb-6 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-luxury-gold flex-shrink-0" /> Personal Shopper Imobiliário
                  </h3>
                  <ul className="space-y-2.5 sm:space-y-3 md:space-y-4">
                    {['Ganha % do DESCONTO (quanto maior economia, mais ganha)', 'Trabalha PARA VOCÊ (você paga, não vendedor)', 'Incentivo: conseguir imóvel com preço JUSTO e com mais descontos', 'Melhor filtro e curadoria dos imóveis', 'Você visita 5-8 imóveis certos', 'Due diligence completa protege você'].map((text, i) => (
                      <li key={i} className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Economia — #0F1118 */}
      <section id="economia" className="py-16 md:py-24 bg-luxury-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-[640px]">
            <h2 className="fade-up font-['Cormorant_Garamond',serif] font-light leading-[1.1] tracking-[-0.02em] text-white text-left max-w-[560px] mb-16" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>
              O que muda quando há alguém exclusivamente do seu lado
            </h2>

            <div className="space-y-10">
              {[
                { num: '01', title: 'Menos conflito de interesse', desc: 'Trabalhamos exclusivamente para você. Sem comissão atrelada ao preço do imóvel.' },
                { num: '02', title: 'Mais clareza na decisão', desc: 'Cada imóvel avaliado com dados reais de mercado. Você decide com informação, não com pressão.' },
                { num: '03', title: 'Proteção de capital', desc: 'Identificamos riscos antes da compra — documentação, estrutura, histórico de preços.' },
                { num: '04', title: 'Acesso qualificado ao mercado', desc: 'Imóveis on e off-market. Você acessa oportunidades que não aparecem nos portais.' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="mb-5" style={{ borderTop: '0.5px solid #C9A84C' }}></div>
                  <h3 className="font-['DM_Sans',sans-serif] text-[17px] font-normal text-white mb-2">{item.title}</h3>
                  <p className="font-['DM_Sans',sans-serif] text-[13px] font-light leading-[1.85] text-white/[0.42]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Autoridade Final — #1A1E2A */}
      <section id="autoridade-final" className="py-16 md:py-24 bg-luxury-charcoal">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
              {/* Foto */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-[300px] h-[380px] md:w-[380px] md:h-[480px] overflow-hidden">
                  <img src={marcusProfile} alt="Marcus Godoy - Personal Shopper Imobiliário" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Texto */}
              <div className="text-left">
                <p className="eyebrow-animated font-['DM_Sans',sans-serif] uppercase tracking-[0.2em] font-light text-[9px] text-luxury-gold mb-6">
                  Marcus Godoy — Personal Shopper Imobiliário
                </p>

                <p className="fade-up font-['Cormorant_Garamond',serif] font-light text-white leading-[1.4] mb-9" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
                  Atuação focada em clientes que valorizam precisão, discrição e consistência. Leitura aprofundada do mercado e relacionamento com os players relevantes.
                </p>

                <div className="space-y-4 mb-9">
                  {['CRECI 80.199 PF | 11.841 PJ', 'Perito Avaliador credenciado pelo TJRJ', 'Avaliações baseadas em dados reais de ITBI'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 flex-shrink-0" style={{ borderTop: '0.5px solid #C9A84C' }}></div>
                      <span className="font-['DM_Sans',sans-serif] text-[13px] text-white/50">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="font-['DM_Sans',sans-serif] text-[12px] font-light leading-[1.8] text-white/30">
                  Formação em Administração, Marketing e MBA em Inteligência Empresarial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Antivenda — #F7F6F3 */}
      <section id="antivenda" className="py-16 md:py-24 bg-luxury-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">

            {/* Bloco 1 — Declaração */}
            <div className="fade-up text-left mb-[72px]">
              <span className="font-['Cormorant_Garamond',serif] font-light italic text-luxury-navy block" style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}>Nosso trabalho não é vender imóveis.</span>
              <span className="font-['Cormorant_Garamond',serif] font-light italic text-luxury-navy block" style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}>É garantir que você tome a decisão certa.</span>
              <span className="font-['Cormorant_Garamond',serif] font-light italic text-[#8A8A8A] block" style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}>Se não fizer sentido, você não compra.</span>
              <span className="font-['Cormorant_Garamond',serif] font-light not-italic text-luxury-gold block" style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}>Simples assim.</span>
            </div>

            {/* Blocos 2 e 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {/* Bloco 2 */}
              <div>
                <p className="font-['DM_Sans',sans-serif] uppercase tracking-[0.18em] font-light text-[10px] text-[#8A8A8A] mb-6">Para quem faz sentido</p>
                <div className="space-y-4">
                  {['Compradores de imóveis acima de R$ 1,5M', 'Quem valoriza dados e análise técnica', 'Executivos sem tempo para 30 visitas', 'Quem entende representação como investimento'].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-luxury-gold text-[13px]">—</span>
                      <span className="font-['DM_Sans',sans-serif] text-[13px] font-light leading-[1.85] text-[#8A8A8A]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bloco 3 */}
              <div>
                <p className="font-['DM_Sans',sans-serif] uppercase tracking-[0.18em] font-light text-[10px] text-[#8A8A8A] mb-6">O que está garantido em contrato</p>
                <div className="space-y-4">
                  {['Lealdade exclusiva — apenas para você', 'Confidencialidade total sobre sua estratégia', 'Success fee apenas se houver economia', 'Tudo formalizado antes de qualquer ação'].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-luxury-gold text-[13px]">—</span>
                      <span className="font-['DM_Sans',sans-serif] text-[13px] font-light leading-[1.85] text-[#8A8A8A]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10a. FAQ — #FFFFFF */}
      <section id="faq" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <Badge variant="outline" className="mb-3 md:mb-4 border-luxury-gold text-luxury-gold text-xs md:text-sm">
                Perguntas Frequentes
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-foreground leading-tight">
                <span className="text-luxury-gold">Respostas Diretas</span> para Suas Dúvidas
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
              {[{
              q: "O que é um Personal Shopper Imobiliário?",
              answer: <>Um profissional que atua <strong>exclusivamente em nome do comprador</strong>, defendendo seus interesses em todas as etapas da aquisição. Diferente do corretor tradicional que trabalha para o vendedor, o PSI busca o melhor negócio para você.</>
            }, {
              q: "Qual a diferença para um corretor tradicional?",
              answer: <>O corretor tradicional ganha comissão sobre o valor da venda (quanto mais caro, mais ganha). Eu ganho sobre o <strong>desconto que consigo para você</strong> (quanto mais economia, mais ganho). Nossos interesses estão 100% alinhados.</>
            }, {
              q: "Como funciona a remuneração?",
              answer: <><strong>Fee de Consultoria:</strong> R$ 10.000 (cobre análise, curadoria e estratégia).<br /><strong>Success Fee:</strong> 30% do desconto comprovado. Se não houver desconto, você não paga success fee.</>
            }, {
              q: "Para quais imóveis o serviço é indicado?",
              answer: <>Imóveis de alto padrão <strong>a partir de R$ 1.5 milhão</strong> na Barra da Tijuca e Recreio dos Bandeirantes. O modelo de economia faz mais sentido em transações de maior valor.</>
            }, {
              q: "Como garantir que você está do meu lado?",
              answer: <>Minha remuneração é baseada na <strong>economia que gero para você</strong>. Quanto maior o desconto, mais eu ganho. Além disso, todos os compromissos de ética e lealdade estão formalizados em contrato.</>
            }, {
              q: "Como iniciar?",
              answer: <>Agende um <strong>Diagnóstico Estratégico gratuito</strong>. Nesta conversa, entendemos suas necessidades e explicamos como podemos ajudar. Sem compromisso.</>
            }].map((item, index) => <AccordionItem key={index} value={`item-${index + 1}`} className="border border-border rounded-lg bg-white shadow-sm hover:shadow-luxury transition-all duration-300">
                  <AccordionTrigger className="px-4 md:px-6 py-3 md:py-4 text-left hover:no-underline">
                    <div className="flex items-center gap-3 md:gap-4 text-left">
                      <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-luxury-gold text-luxury-navy text-xs md:text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <h3 className="text-sm md:text-lg font-semibold text-luxury-navy pr-2">{item.q}</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 md:px-6 pb-3 md:pb-4">
                    <div className="pl-10 md:pl-12">
                      <p className="text-xs md:text-base text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 10b. CTA Final — #0F1118 */}
      <section id="cta-final" className="py-16 md:py-24 bg-luxury-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Coluna esquerda — Texto */}
              <div>
                <span className="font-['Cormorant_Garamond',serif] font-light text-white block" style={{ fontSize: 'clamp(22px, 3vw, 38px)' }}>Se você está avaliando uma compra relevante,</span>
                <span className="font-['Cormorant_Garamond',serif] font-light italic text-white/55 block" style={{ fontSize: 'clamp(22px, 3vw, 38px)' }}>o próximo passo não é visitar imóveis.</span>
                <span className="font-['Cormorant_Garamond',serif] font-light text-luxury-gold block mt-2" style={{ fontSize: 'clamp(22px, 3vw, 38px)' }}>É entender o cenário.</span>

                <div className="w-12 mt-9 mb-9" style={{ borderTop: '0.5px solid #C9A84C' }}></div>

                <p className="font-['DM_Sans',sans-serif] text-[13px] font-light leading-[1.85] text-white/35">
                  Preencha ao lado. Entraremos em contato com uma análise inicial sobre seu momento.
                </p>
              </div>

              {/* Coluna direita — Formulário */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Nome completo"
                  value={formData.nome}
                  onChange={e => setFormData(p => ({ ...p, nome: e.target.value }))}
                  className="w-full font-['DM_Sans',sans-serif] text-[13px] text-white rounded-sm px-4 py-3.5 outline-none transition-colors placeholder:text-white/25 focus:border-luxury-gold"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)' }}
                />
                <input
                  type="tel"
                  required
                  maxLength={20}
                  placeholder="WhatsApp"
                  value={formData.whatsapp}
                  onChange={e => setFormData(p => ({ ...p, whatsapp: e.target.value }))}
                  className="w-full font-['DM_Sans',sans-serif] text-[13px] text-white rounded-sm px-4 py-3.5 outline-none transition-colors placeholder:text-white/25 focus:border-luxury-gold"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)' }}
                />
                <select
                  required
                  value={formData.faixa}
                  onChange={e => setFormData(p => ({ ...p, faixa: e.target.value }))}
                  className="w-full font-['DM_Sans',sans-serif] text-[13px] text-white rounded-sm px-4 py-3.5 outline-none transition-colors appearance-none focus:border-luxury-gold"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', color: formData.faixa ? '#FFFFFF' : 'rgba(255,255,255,0.25)' }}
                >
                  <option value="" disabled className="bg-luxury-navy text-white/25">Faixa de investimento</option>
                  <option value="R$ 1,5M a R$ 2,5M" className="bg-luxury-navy text-white">R$ 1,5M a R$ 2,5M</option>
                  <option value="R$ 2,5M a R$ 5M" className="bg-luxury-navy text-white">R$ 2,5M a R$ 5M</option>
                  <option value="Acima de R$ 5M" className="bg-luxury-navy text-white">Acima de R$ 5M</option>
                </select>
                <select
                  required
                  value={formData.tipo}
                  onChange={e => setFormData(p => ({ ...p, tipo: e.target.value }))}
                  className="w-full font-['DM_Sans',sans-serif] text-[13px] text-white rounded-sm px-4 py-3.5 outline-none transition-colors appearance-none focus:border-luxury-gold"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', color: formData.tipo ? '#FFFFFF' : 'rgba(255,255,255,0.25)' }}
                >
                  <option value="" disabled className="bg-luxury-navy text-white/25">Tipo de imóvel</option>
                  <option value="Apartamento" className="bg-luxury-navy text-white">Apartamento</option>
                  <option value="Casa / Mansão" className="bg-luxury-navy text-white">Casa / Mansão</option>
                  <option value="Cobertura" className="bg-luxury-navy text-white">Cobertura</option>
                  <option value="Ainda indefinido" className="bg-luxury-navy text-white">Ainda indefinido</option>
                </select>
                <select
                  required
                  value={formData.momento}
                  onChange={e => setFormData(p => ({ ...p, momento: e.target.value }))}
                  className="w-full font-['DM_Sans',sans-serif] text-[13px] text-white rounded-sm px-4 py-3.5 outline-none transition-colors appearance-none focus:border-luxury-gold"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', color: formData.momento ? '#FFFFFF' : 'rgba(255,255,255,0.25)' }}
                >
                  <option value="" disabled className="bg-luxury-navy text-white/25">Momento da compra</option>
                  <option value="Pronto para comprar" className="bg-luxury-navy text-white">Pronto para comprar</option>
                  <option value="Nos próximos 3 meses" className="bg-luxury-navy text-white">Nos próximos 3 meses</option>
                  <option value="Nos próximos 6 meses" className="bg-luxury-navy text-white">Nos próximos 6 meses</option>
                  <option value="Ainda pesquisando" className="bg-luxury-navy text-white">Ainda pesquisando</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-luxury-gold text-luxury-navy font-['DM_Sans',sans-serif] uppercase tracking-[0.18em] text-[10px] font-medium py-3.5 rounded-sm transition-colors hover:bg-luxury-gold/85"
                >
                  Solicitar análise estratégica
                </button>
                <p className="font-['DM_Sans',sans-serif] text-[10px] text-white/20 text-center">Retorno em até 24 horas.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-navy text-white">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            
            {/* Brand Section */}
            <div className="md:col-span-5">
              <div className="flex items-center space-x-3 mb-4">
                <img src={godoyLogo} alt="Godoy Prime Realty" className="h-12 w-12 md:h-14 md:w-14" />
                <div>
                  <span className="text-xl md:text-2xl font-bold text-white block">Godoy Prime Realty</span>
                  <span className="text-luxury-gold text-sm md:text-base font-medium">Marcus Godoy</span>
                </div>
              </div>
              <p className="text-white/80 text-sm md:text-base mb-4 max-w-md leading-relaxed">
                Personal Shopper Imobiliário — Representação exclusiva do comprador em imóveis de alto padrão na Barra da Tijuca e Recreio.
              </p>
              
              {/* Credentials */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 flex items-center gap-2">
                  <Scale className="h-4 w-4 text-luxury-gold" />
                  <span className="text-xs md:text-sm font-medium">Perito Avaliador</span>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 flex items-center gap-2">
                  <Award className="h-4 w-4 text-luxury-gold" />
                  <span className="text-xs md:text-sm font-medium">CRECI 80199</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-luxury-gold rounded-full"></div>
                Navegação
              </h4>
              <nav className="grid grid-cols-2 md:grid-cols-1 gap-2">
                <a href="#conceito" className="text-white/70 hover:text-luxury-gold transition-colors text-sm py-1">
                  Conceito
                </a>
                <a href="#como-funciona" className="text-white/70 hover:text-luxury-gold transition-colors text-sm py-1">
                  Como Funciona
                </a>
                <a href="#economia" className="text-white/70 hover:text-luxury-gold transition-colors text-sm py-1">
                  Economia
                </a>
                <a href="#precos" className="text-white/70 hover:text-luxury-gold transition-colors text-sm py-1">
                  Serviços
                </a>
                <a href="#autoridade-final" className="text-white/70 hover:text-luxury-gold transition-colors text-sm py-1">
                  Sobre
                </a>
                <a href="#faq" className="text-white/70 hover:text-luxury-gold transition-colors text-sm py-1">
                  FAQ
                </a>
              </nav>
            </div>

            {/* Contact Section */}
            <div className="md:col-span-4">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-luxury-gold rounded-full"></div>
                Contato
              </h4>
              <div className="space-y-3">
                <a href="tel:+552140400067" className="flex items-center gap-3 text-white/70 hover:text-luxury-gold transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                    <Phone className="h-4 w-4 text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Telefone</p>
                    <p className="text-sm font-medium text-white">(21) 4040-0067</p>
                  </div>
                </a>
                <a href="https://wa.me/5521964075124" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-luxury-gold transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <MessageCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">WhatsApp</p>
                    <p className="text-sm font-medium text-white">(21) 96407-5124</p>
                  </div>
                </a>
                <a href="mailto:marcus@godoyprime.com.br" className="flex items-center gap-3 text-white/70 hover:text-luxury-gold transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                    <Mail className="h-4 w-4 text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">E-mail</p>
                    <p className="text-sm font-medium text-white">marcus@godoyprime.com.br</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Localização</p>
                    <p className="text-sm font-medium text-white">Barra da Tijuca, Rio de Janeiro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-luxury-gold/10 border-y border-luxury-gold/20">
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-luxury-gold">100%</p>
                <p className="text-white/70 text-xs md:text-sm">Representação Exclusiva</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-luxury-gold">Zero</p>
                <p className="text-white/70 text-xs md:text-sm">Conflito de Interesses</p>
              </div>
              <div className="hidden md:block">
                <p className="text-2xl md:text-3xl font-bold text-luxury-gold">R$ 1.5M+</p>
                <p className="text-white/70 text-xs md:text-sm">Imóveis de Alto Padrão</p>
              </div>
              <div className="hidden md:block">
                <p className="text-2xl md:text-3xl font-bold text-luxury-gold">5-8</p>
                <p className="text-white/70 text-xs md:text-sm">Visitas Necessárias</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-xs md:text-sm">
              <a href="/privacidade" className="text-white/60 hover:text-luxury-gold transition-colors">
                Privacidade
              </a>
              <a href="https://docs.google.com/document/d/1JqColkt5uzQnajZDWVPTdy423kJlVDEpQepGRGlGFp8/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-luxury-gold transition-colors">
                Termos
              </a>
              <a href="/lgpd" className="text-white/60 hover:text-luxury-gold transition-colors">
                LGPD
              </a>
            </div>

            {/* Copyright */}
            <p className="text-white/50 text-xs md:text-sm text-center md:text-right">
              © {new Date().getFullYear()} Godoy Prime Realty · CRECI/RJ: 11841 PJ | 80199 PF
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/5521964075124?text=Quero%20saber%20mais%20sobre%20o%20Personal%20Shopper%20Imobili%C3%A1rio" target="_blank" rel="noopener noreferrer" className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 z-[9998] bg-green-500 hover:bg-green-600 text-white p-2.5 sm:p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 touch-manipulation" onClick={() => trackWhatsAppClick("floating-button")} aria-label="Contato via WhatsApp">
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
      </a>
    </div>;
};
export default LandingPage;
