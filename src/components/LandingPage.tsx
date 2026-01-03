import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  Shield,
  Clock,
  Key,
  CircleCheck as CheckCircle,
  Calculator,
  Search,
  Target,
  Users,
  TrendingUp,
  Award,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Menu,
  X,
  MapPin,
  MessageCircle,
  Scale,
  Gavel,
} from "lucide-react";
import heroImage from "@/assets/barra-hero-new.jpg";
import marcusProfile from "@/assets/marcus-profile.jpg";
import godoyLogo from "@/assets/godoy-logo.png";

const LandingPage = () => {
  const [highlightedCards, setHighlightedCards] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleCardHighlight = (cardIndex: number) => {
    setHighlightedCards((prev) =>
      prev.includes(cardIndex) ? prev.filter((index) => index !== cardIndex) : [...prev, cardIndex],
    );
  };

  // Meta Pixel tracking functions
  const trackCalendlyClick = (buttonLocation: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Consultoria Exclusiva",
        button_location: buttonLocation,
      });
    }
  };

  const trackWhatsAppClick = (buttonLocation: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Contact", {
        content_name: "WhatsApp",
        button_location: buttonLocation,
      });
    }
  };

  // Add HeyGen script to document
  useEffect(() => {
    const script = document.createElement("script");
    const clientWidth = document.body.clientWidth;
    const isMobile = clientWidth < 640;
    script.innerHTML = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJLYXR5YV9Qcm9mZXNzaW9uYWxMb29rX3B1%0D%0AYmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzM0%0D%0AOGRkZjUwM2M2NTRiOWJiYmI4YmVhOWY5MjEwZWFkXzU1ODcwL3ByZXZpZXdfdGFyZ2V0LndlYnAi%0D%0ALCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6dHJ1ZSwia25vd2xlZGdlQmFzZUlkIjoiYWI2NmI1ZjNk%0D%0AYWRmNGQ1YmJkZTI3YmZiMDVhMzgwNjIiLCJ1c2VybmFtZSI6IjRiYjNhNThlMzlmNDQ4OTFiNzgy%0D%0ANWI3YzMyZWRhMDcxIn0%3D&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`
  #heygen-streaming-embed {
    z-index: 9998;
    position: fixed;
    left: ${isMobile ? '16px' : '24px'};
    bottom: ${isMobile ? '80px' : '24px'};
    width: ${isMobile ? '70px' : '90px'};
    height: ${isMobile ? '70px' : '90px'};
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
    transition: all linear 0.1s;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
  }
  #heygen-streaming-embed.show {
    opacity: 1;
    visibility: visible;
  }
  #heygen-streaming-embed.expand {
    \${clientWidth<540?"height: 60vh; max-height: 380px; width: 92%; left: 50%; transform: translateX(-50%); bottom: 80px;":"height: 366px; width: calc(366px * 16 / 9); bottom: 24px;"}
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

  return (
    <div className="min-h-screen bg-background">
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
              <a
                href="#como-funciona"
                className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium text-sm xl:text-base"
              >
                Como Funciona
              </a>
              <a
                href="#economia"
                className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium text-sm xl:text-base"
              >
                Economia
              </a>
              <a
                href="#precos"
                className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium text-sm xl:text-base"
              >
                Serviços
              </a>
              <a
                href="#sobre"
                className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium text-sm xl:text-base"
              >
                Sobre
              </a>
              <a
                href="#faq"
                className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium text-sm xl:text-base"
              >
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
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-3 -mr-2 text-luxury-navy hover:text-luxury-gold transition-colors touch-manipulation"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-2 border-t border-border bg-white animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
              <nav className="flex flex-col">
                <a
                  href="#como-funciona"
                  className="text-luxury-navy hover:text-luxury-gold hover:bg-muted/50 transition-colors font-medium py-4 px-2 border-b border-border/50 touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Como Funciona
                </a>
                <a
                  href="#economia"
                  className="text-luxury-navy hover:text-luxury-gold hover:bg-muted/50 transition-colors font-medium py-4 px-2 border-b border-border/50 touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Economia
                </a>
                <a
                  href="#precos"
                  className="text-luxury-navy hover:text-luxury-gold hover:bg-muted/50 transition-colors font-medium py-4 px-2 border-b border-border/50 touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Serviços
                </a>
                <a
                  href="#sobre"
                  className="text-luxury-navy hover:text-luxury-gold hover:bg-muted/50 transition-colors font-medium py-4 px-2 border-b border-border/50 touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre
                </a>
                <a
                  href="#faq"
                  className="text-luxury-navy hover:text-luxury-gold hover:bg-muted/50 transition-colors font-medium py-4 px-2 border-b border-border/50 touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </a>

                {/* Mobile Contact Info */}
                <div className="pt-4 px-2 space-y-1">
                  <a href="tel:+552140400067" className="flex items-center space-x-3 text-luxury-navy py-3 touch-manipulation">
                    <Phone className="h-5 w-5 text-luxury-gold" />
                    <span className="text-base">(21) 4040-0067</span>
                  </a>
                  <a
                    href="https://wa.me/5521964075124"
                    className="flex items-center space-x-3 text-luxury-navy py-3 touch-manipulation"
                  >
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    <span className="text-base">(21) 96407-5124</span>
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-[100svh] sm:min-h-[85svh] md:min-h-[90svh] flex items-center justify-center overflow-hidden pt-14 sm:pt-16 md:pt-20"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/80 via-luxury-navy/70 to-luxury-navy/85"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-5 md:px-6 text-center text-white py-8 sm:py-6 md:py-8">
          <div className="animate-fade-in">
            <Badge
              variant="outline"
              className="mb-4 md:mb-6 border-luxury-gold text-luxury-gold bg-white/10 text-xs sm:text-sm px-3 py-1"
            >
              Personal Shopper Imobiliário
            </Badge>

            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-[1.2] max-w-5xl mx-auto">
              Comprar imóvel de alto padrão sem representação exclusiva é o erro mais caro do mercado imobiliário.
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 md:mb-6 text-white/90 max-w-4xl mx-auto leading-relaxed">
              Eu represento <span className="text-luxury-gold font-semibold">compradores exigentes</span> na Barra da
              Tijuca e Recreio — usando dados reais, curadoria técnica e negociação profissional.
            </p>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 md:mb-8 text-white/80 max-w-3xl mx-auto">
              Sem conflito de interesses. Sem perda de tempo. Sem risco de prejuízos e surpresas futuras.
            </p>

            <Button
              variant="gold"
              className="mb-3 md:mb-4 h-14 px-6 text-base font-semibold sm:h-12 sm:px-8 sm:text-base md:h-14 md:px-10 md:text-lg shadow-gold transition-all duration-300 hover:scale-105 group w-full sm:w-auto max-w-sm touch-manipulation"
              asChild
            >
              <a
                href="https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCalendlyClick("hero")}
              >
                Agendar Diagnóstico (Gratuito)
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <p className="text-xs sm:text-sm text-white/70">Conversa direta. Sem compromisso. Sem venda de imóveis.</p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-12 md:py-20 bg-luxury-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-luxury-navy leading-tight">
              A verdade sobre o mercado e como o{" "}
              <span className="text-luxury-gold">Personal Shopper Imobiliário te ajuda</span>
            </h2>
            <p className="text-base md:text-xl text-luxury-text-muted mb-6 md:mb-12 px-2">
              Descubra como posso ajudar você a fazer a melhor compra da sua vida
            </p>

            <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-luxury border-2 md:border-4 border-luxury-gold/20">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/AQY1LYo-neA"
                title="Serviços do Personal Shopper Imobiliário"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Market Problem Section */}
      <section id="mercado" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-luxury-navy leading-tight">
                O Mercado Imobiliário Não Foi Feito Para Proteger o Comprador
              </h2>
              <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
                Corretores são pagos para vender. Imobiliárias trabalham com estoque. E quem compra sozinho acredita que
                está no controle — <strong className="text-foreground">até errar caro</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              <Card className="bg-card border border-border shadow-luxury hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">⚠️</div>
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-2 md:mb-3">
                    Conflito de Interesse Estrutural
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Quanto mais caro você paga, mais o corretor ganha. Nenhum incentivo para negociar menor.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-luxury hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">💸</div>
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-2 md:mb-3">
                    Preços Inflados Sem Critério
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Você não tem acesso a transações reais. Paga baseado em "feeling" e informação assimétrica.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-luxury hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">⏱️</div>
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-2 md:mb-3">Tempo Desperdiçado</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Visita 30-40 imóveis errados em 2-3 meses. 80-120 horas perdidas (R$ 40-60k se você ganha R$ 500/h).
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-luxury hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">🚨</div>
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-2 md:mb-3">
                    Risco de Erro Invisível
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Problemas estruturais, condomínio em litígio, documentação irregular. Descobertos tarde demais.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-luxury-navy rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed">
                <strong className="text-luxury-gold">No alto padrão, um erro custa R$ 100k a R$ 500k.</strong>
                <br />E você só descobre depois de assinar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="py-12 md:py-20 bg-luxury-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-luxury-navy leading-tight">
                A Solução: Personal Shopper Imobiliário
              </h2>
              <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
                Eu <strong className="text-luxury-navy">não vendo imóveis</strong>. Eu{" "}
                <strong className="text-luxury-navy">represento compradores</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-luxury border border-luxury-gold/20 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-luxury-gold text-luxury-navy flex items-center justify-center text-lg md:text-xl font-bold flex-shrink-0">
                    1
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy">Identifico o Imóvel EXATO</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Você não vê "opções do mercado". Você define seu critério (localização, tamanho, acabamento,
                  orçamento), e EU identifico qual imóvel realmente atende isso.
                </p>
              </div>

              <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-luxury border border-luxury-gold/20 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-luxury-gold text-luxury-navy flex items-center justify-center text-lg md:text-xl font-bold flex-shrink-0">
                    2
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy">Você Visita Apenas os Certos</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  EU visito dezenas de imóveis, faço due diligence completa (estrutura, documentação, condomínio), e
                  apresento apenas aqueles que atendem 100% seu critério. Você visita 5-8, não 30-40.
                </p>
              </div>

              <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-luxury border border-luxury-gold/20 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-luxury-gold text-luxury-navy flex items-center justify-center text-lg md:text-xl font-bold flex-shrink-0">
                    3
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy">Due Diligence Profissional</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Antes de você pisar no imóvel, eu já analisei estrutura, fachada, acabamento, saúde do condomínio,
                  regularidade de documentação, e comparei preço com transações reais.{" "}
                  <strong className="text-luxury-navy">Zero surpresas pós-compra.</strong>
                </p>
              </div>

              <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-luxury border border-luxury-gold/20 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-luxury-gold text-luxury-navy flex items-center justify-center text-lg md:text-xl font-bold flex-shrink-0">
                    4
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy">Negociação Baseada em Dados</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Estratégia profissional, múltiplas rodadas de contra-proposta, baseada em análise real de mercado. Meu
                  incentivo é o desconto.
                  <strong className="text-luxury-navy"> Seu incentivo também.</strong>
                </p>
              </div>
            </div>

            <div className="bg-luxury-navy rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed">
                A tecnologia analisa. <strong className="text-luxury-gold">Eu decido.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Marcus Section - Repositioned */}
      <section id="sobre-marcus" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10 items-center">
              {/* Photo */}
              <div className="lg:col-span-2 flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-luxury border-4 border-luxury-gold/30">
                    <img 
                      src={marcusProfile} 
                      alt="Marcus Godoy - Personal Shopper Imobiliário" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Credential badges */}
                  <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 flex flex-col gap-2">
                    <div className="bg-luxury-navy text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-lg flex items-center gap-2">
                      <Scale className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold" />
                      <span className="text-xs md:text-sm font-bold">Perito Avaliador</span>
                    </div>
                    <div className="bg-luxury-gold text-luxury-navy px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-lg flex items-center gap-2">
                      <Scale className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="text-xs md:text-sm font-bold">Corretor</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3 text-center lg:text-left">
                <Badge variant="outline" className="mb-3 md:mb-4 border-luxury-gold text-luxury-gold text-xs md:text-sm">
                  Quem Vai Te Representar
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-luxury-navy leading-tight">
                  Marcus Godoy
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                  <strong className="text-luxury-navy">Perito Avaliador Judicial</strong>, credenciado pelo Tribunal de Justiça do Rio de Janeiro e <strong className="text-luxury-navy">Corretor</strong> — uma combinação rara que garante avaliação justa, baseada em metodologia, fatos e dados. Proteção jurídica e negociação profissional do seu lado.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
                  <div className="bg-luxury-cream rounded-lg p-4 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-luxury-gold" />
                      <span className="font-semibold text-luxury-navy text-sm md:text-base">Segurança Jurídica</span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">Contratos blindados e due diligence completa</p>
                  </div>
                  <div className="bg-luxury-cream rounded-lg p-4 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-luxury-gold" />
                      <span className="font-semibold text-luxury-navy text-sm md:text-base">Foco Exclusivo</span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">Barra da Tijuca e Recreio, imóveis +R$1.5M</p>
                  </div>
                </div>
                <div className="bg-luxury-navy rounded-xl p-4 md:p-6 text-center">
                  <p className="text-white text-sm md:text-base">
                    <strong className="text-luxury-gold">Meu compromisso:</strong> Ser o defensor exclusivo dos seus interesses, com lealdade total.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Como Funciona */}
      <section id="como-funciona" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge variant="outline" className="mb-3 md:mb-4 border-luxury-gold text-luxury-gold text-xs md:text-sm">
                Método Exclusivo
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-navy leading-tight">
                Como Funciona: 4 Passos Simples
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="relative bg-card rounded-xl md:rounded-2xl p-5 md:p-6 shadow-luxury border border-border hover:border-luxury-gold/50 transition-all duration-300">
                <div className="absolute -top-3 md:-top-4 left-5 md:left-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-luxury-gold text-luxury-navy flex items-center justify-center text-base md:text-lg font-bold shadow-md">
                  1
                </div>
                <div className="pt-3 md:pt-4">
                  <h3 className="text-base md:text-lg font-bold text-luxury-navy mb-2 md:mb-3">
                    Diagnóstico Estratégico
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    Você define seu perfil: localização, tamanho, acabamento, orçamento, critérios especiais. Eu entendo
                    exatamente o que você quer.
                  </p>
                </div>
              </div>

              <div className="relative bg-card rounded-xl md:rounded-2xl p-5 md:p-6 shadow-luxury border border-border hover:border-luxury-gold/50 transition-all duration-300">
                <div className="absolute -top-3 md:-top-4 left-5 md:left-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-luxury-gold text-luxury-navy flex items-center justify-center text-base md:text-lg font-bold shadow-md">
                  2
                </div>
                <div className="pt-3 md:pt-4">
                  <h3 className="text-base md:text-lg font-bold text-luxury-navy mb-2 md:mb-3">
                    Curadoria Profissional
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    EU visito dezenas de imóveis, faço análise técnica completa, e filtro apenas aqueles que atendem
                    100% seu critério.
                    <em className="text-luxury-gold"> (Você não vê essa parte)</em>
                  </p>
                </div>
              </div>

              <div className="relative bg-card rounded-xl md:rounded-2xl p-5 md:p-6 shadow-luxury border border-border hover:border-luxury-gold/50 transition-all duration-300">
                <div className="absolute -top-3 md:-top-4 left-5 md:left-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-luxury-gold text-luxury-navy flex items-center justify-center text-base md:text-lg font-bold shadow-md">
                  3
                </div>
                <div className="pt-3 md:pt-4">
                  <h3 className="text-base md:text-lg font-bold text-luxury-navy mb-2 md:mb-3">Decisão Clara</h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    Você visita apenas 5-8 imóveis PRÉ-SELECIONADOS. Análise técnica já está pronta. Sua decisão é 100%
                    baseada em fatos.
                  </p>
                </div>
              </div>

              <div className="relative bg-card rounded-xl md:rounded-2xl p-5 md:p-6 shadow-luxury border border-border hover:border-luxury-gold/50 transition-all duration-300">
                <div className="absolute -top-3 md:-top-4 left-5 md:left-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-luxury-gold text-luxury-navy flex items-center justify-center text-base md:text-lg font-bold shadow-md">
                  4
                </div>
                <div className="pt-3 md:pt-4">
                  <h3 className="text-base md:text-lg font-bold text-luxury-navy mb-2 md:mb-3">
                    Negociação Profissional
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    Estratégia de negociação baseada em dados reais. Múltiplas rodadas de contra-proposta até conseguir
                    o melhor preço possível.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Section */}
      <section id="economia" className="py-12 md:py-20 bg-luxury-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-navy leading-tight">
                Sua Economia Real: Tempo + Risco + Desconto
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              <Card className="bg-white border border-luxury-gold/20 shadow-luxury hover:shadow-xl transition-shadow duration-300 text-center">
                <CardContent className="p-5 md:p-8">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">⏱️</div>
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-1 md:mb-2">Economia de Tempo</h3>
                  <div className="text-2xl md:text-3xl font-bold text-luxury-gold mb-3 md:mb-4">80-120h</div>
                  <p className="text-sm md:text-base text-muted-foreground mb-2 md:mb-3 leading-relaxed">
                    Você não visita 30-40 imóveis errados. Visita apenas 5-8 certos.
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-luxury-navy bg-luxury-cream rounded-lg py-2 px-3 md:px-4">
                    R$ 40-60k (se você ganha R$ 500/h)
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-luxury-gold/20 shadow-luxury hover:shadow-xl transition-shadow duration-300 text-center">
                <CardContent className="p-5 md:p-8">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">🛡️</div>
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-1 md:mb-2">Risco Evitado</h3>
                  <div className="text-2xl md:text-3xl font-bold text-luxury-gold mb-3 md:mb-4">R$ 75-300k</div>
                  <p className="text-sm md:text-base text-muted-foreground mb-2 md:mb-3 leading-relaxed">
                    Evita erros caros: estrutura, litígio, documentação irregular, preço acima do mercado.
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-luxury-navy bg-luxury-cream rounded-lg py-2 px-3 md:px-4">
                    Due diligence completa
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-luxury-gold/20 shadow-luxury hover:shadow-xl transition-shadow duration-300 text-center">
                <CardContent className="p-5 md:p-8">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">💰</div>
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-1 md:mb-2">Desconto Negociado</h3>
                  <div className="text-2xl md:text-3xl font-bold text-luxury-gold mb-3 md:mb-4">R$ 90-360k</div>
                  <p className="text-sm md:text-base text-muted-foreground mb-2 md:mb-3 leading-relaxed">
                    Negociação profissional consegue 4-8% acima do que você consegue sozinho.
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-luxury-navy bg-luxury-cream rounded-lg py-2 px-3 md:px-4">
                    Você fica com 70%
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Model Section */}
      <section id="remuneracao" className="py-12 md:py-20 bg-luxury-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-navy mb-4 md:mb-6 leading-tight">
                Modelo de Remuneração: 100% Transparente
              </h2>
              <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
                Antes de qualquer investimento, <strong className="text-luxury-navy">vamos conversar</strong>. 
                O primeiro passo é uma consulta gratuita para entender se este modelo faz sentido para você.
              </p>
            </div>

            {/* DESTAQUE PRINCIPAL: Diagnóstico Gratuito */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-luxury border-2 border-luxury-gold overflow-hidden mb-6 md:mb-8">
              <div className="bg-gradient-to-r from-luxury-gold/20 to-luxury-gold/10 p-6 md:p-10 text-center">
                <div className="inline-flex items-center gap-2 bg-luxury-gold/20 text-luxury-navy font-semibold text-xs md:text-sm px-4 py-2 rounded-full mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-luxury-gold"></span>
                  </span>
                  PRIMEIRO PASSO
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-luxury-navy mb-3 md:mb-4">
                  Diagnóstico Estratégico Gratuito
                </h3>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
                  Uma conversa sem compromisso onde analisamos juntos sua situação, seus objetivos e determinamos 
                  se o PSI é a melhor solução para você. <strong className="text-luxury-navy">Sem custo. Sem pressão.</strong>
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8 max-w-3xl mx-auto">
                  <div className="bg-white/70 rounded-lg p-4">
                    <div className="text-2xl mb-2">📋</div>
                    <p className="text-sm text-luxury-navy font-medium">Análise do seu momento</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-4">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-sm text-luxury-navy font-medium">Alinhamento de expectativas</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-4">
                    <div className="text-2xl mb-2">✅</div>
                    <p className="text-sm text-luxury-navy font-medium">Decisão sem pressão</p>
                  </div>
                </div>

                <Button 
                  size="xl" 
                  variant="luxury"
                  className="group"
                  onClick={() => {
                    trackCalendlyClick("pricing_section");
                    window.open("https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario", "_blank");
                  }}
                >
                  Agendar Minha Conversa Gratuita
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-xs md:text-sm text-muted-foreground mt-4">
                  30 minutos · Online · Você decide depois
                </p>
              </div>
            </div>

            {/* INFORMAÇÃO TRANSPARENTE: Estrutura de Preços */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-luxury border border-luxury-gold/20 overflow-hidden mb-6 md:mb-8">
              <div className="bg-muted p-4 md:p-6 border-b border-border text-center">
                <p className="text-sm md:text-base text-muted-foreground">
                  <strong className="text-luxury-navy">Após o diagnóstico</strong>, se fizer sentido para ambos, 
                  este é o modelo de remuneração:
                </p>
              </div>
              
              {/* Fee Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                <div className="p-5 md:p-8 text-center">
                  <h3 className="text-base md:text-lg font-bold text-luxury-navy mb-2 md:mb-3">Fee de Consultoria</h3>
                  <div className="text-xl md:text-2xl font-bold text-luxury-gold mb-2 md:mb-3">R$ 10.000</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cobre análise técnica, curadoria e estratégia de negociação.
                  </p>
                </div>
                <div className="p-5 md:p-8 text-center">
                  <h3 className="text-base md:text-lg font-bold text-luxury-navy mb-2 md:mb-3">Success Fee</h3>
                  <div className="text-xl md:text-2xl font-bold text-luxury-gold mb-2 md:mb-3">30% do desconto</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Só paga se houver economia comprovada. Você fica com 70%.
                  </p>
                </div>
              </div>

              {/* Como Funciona - Resumido */}
              <div className="bg-luxury-cream p-4 md:p-6 border-t border-border">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-luxury-navy">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-luxury-gold" />
                    <strong>Baseline:</strong> Preço anunciado
                  </span>
                  <span className="hidden sm:block text-luxury-gold">→</span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-luxury-gold" />
                    <strong>Negociado:</strong> Preço final
                  </span>
                  <span className="hidden sm:block text-luxury-gold">→</span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-luxury-gold" />
                    <strong>Delta:</strong> Seu desconto
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Consultivo */}
            <div className="bg-luxury-navy/5 rounded-xl md:rounded-2xl p-6 md:p-8 text-center border border-luxury-navy/10">
              <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-3">
                Tem dúvidas sobre o modelo?
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-5 max-w-xl mx-auto">
                Entendo que é um investimento importante. Por isso, estou disponível para explicar cada detalhe 
                antes de qualquer compromisso.
              </p>
              <Button 
                variant="luxury-outline"
                size="lg"
                onClick={() => {
                  trackWhatsAppClick("pricing_model_inquiry");
                  window.open("https://wa.me/5521999461868?text=Olá! Gostaria de entender melhor o modelo de remuneração do PSI antes de agendar o diagnóstico.", "_blank");
                }}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Entenda se este modelo serve para você
              </Button>
              <p className="text-xs text-muted-foreground mt-4 italic">
                Você decide só após entender exatamente o que está contratando.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Representação vs Intermediação Section */}
      <section id="representacao" className="py-12 md:py-20 bg-gradient-to-br from-muted to-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-luxury-navy leading-tight max-w-5xl mx-auto">
                Existe uma diferença legal entre intermediação e representação que a maioria não conhece.
              </h2>
              <p className="text-luxury-gold font-semibold italic text-base md:text-lg mb-4 leading-relaxed max-w-3xl mx-auto">
                Com intermediação, quanto mais você paga, mais o corretor ganha. 
                Com representação, quanto mais você economiza, mais eu ganho. 
                Ela muda tudo.
              </p>
              <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
                    {[
                      { label: "Lealdade", text: "Equilibrada. Sem favor a ninguém." },
                      { label: "Autoridade", text: "Apenas facilita comunicação." },
                      { label: "Incentivo", text: "Quanto mais você paga, mais ganha.", highlight: true },
                      { label: "Conflito", text: "Estrutural. Ganha mais se você pagar mais." },
                      { label: "Resultado", text: "Preço: o que o mercado aceitar." },
                    ].map((item, index) => (
                      <div key={index} className="pb-3 border-b border-border last:border-b-0 last:pb-0">
                        <span className="block text-[10px] md:text-xs font-bold uppercase text-destructive mb-1">{item.label}</span>
                        <p className={cn("text-xs md:text-sm text-muted-foreground leading-relaxed", item.highlight && "font-semibold text-foreground")}>{item.text}</p>
                      </div>
                    ))}
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
                    {[
                      { label: "Lealdade", text: "100% exclusiva ao comprador.", highlight: true },
                      { label: "Autoridade", text: "Negocio por você, com sua autorização." },
                      { label: "Incentivo", text: "Quanto mais você economiza, mais ganho.", highlight: true },
                      { label: "Conflito", text: "Eliminado. Interesses alinhados." },
                      { label: "Resultado", text: "Melhor preço + segurança jurídica." },
                    ].map((item, index) => (
                      <div key={index} className="pb-3 border-b border-border last:border-b-0 last:pb-0">
                        <span className="block text-[10px] md:text-xs font-bold uppercase text-luxury-gold mb-1">{item.label}</span>
                        <p className={cn("text-xs md:text-sm text-muted-foreground leading-relaxed", item.highlight && "font-semibold text-foreground")}>{item.text}</p>
                      </div>
                    ))}
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
            <div className="bg-luxury-gold/10 p-5 md:p-8 rounded-xl md:rounded-2xl border-l-4 border-luxury-gold mb-8 md:mb-12">
              <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-4 md:mb-6">A Diferença-Chave</h3>
              <div className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-[200px_30px_1fr] gap-2 md:gap-5 items-center pb-4 border-b border-luxury-gold/20">
                  <div className="text-sm md:text-base font-semibold text-foreground">Intermediação</div>
                  <div className="hidden md:block text-center text-luxury-gold font-bold">→</div>
                  <div className="text-sm md:text-base text-muted-foreground">Você paga mais, corretor ganha mais. Conflito estrutural.</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[200px_30px_1fr] gap-2 md:gap-5 items-center">
                  <div className="text-sm md:text-base font-semibold text-foreground">Representação (PSI)</div>
                  <div className="hidden md:block text-center text-luxury-gold font-bold">→</div>
                  <div className="text-sm md:text-base text-muted-foreground">Você economiza mais, eu ganho mais. Incentivos alinhados.</div>
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
                {[
                  { num: "1", title: "Dever Fiduciário", text: "Obrigação legal de lealdade, diligência e confidencialidade. Você é minha prioridade absoluta." },
                  { num: "2", title: "Contrato Blindado", text: "Tudo por escrito. Escopo, poderes, remuneração, prazos. Sem ambiguidades." },
                  { num: "3", title: "Exclusividade", text: "Você é meu único cliente neste negócio. Nenhum conflito com outras partes." },
                  { num: "4", title: "Responsabilidade", text: "Se eu errar, você tem recourse legal. Minha responsabilidade é clara e definida." },
                ].map((item) => (
                  <div key={item.num} className="p-4 md:p-6 bg-muted rounded-lg border-l-4 border-luxury-gold">
                    <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-luxury-navy text-white rounded-full font-bold text-sm md:text-lg mb-3 md:mb-4">{item.num}</div>
                    <h4 className="text-sm md:text-base font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>


            {/* CTA */}
            <div className="text-center bg-gradient-to-br from-luxury-gold/10 to-background p-6 md:p-10 rounded-xl md:rounded-2xl">
              <p className="text-base md:text-lg text-foreground mb-4 md:mb-6 leading-relaxed">
                Representação não é apenas um modelo comercial.
                <br />
                <strong className="text-luxury-navy">É proteção jurídica + alinhamento de interesses.</strong>
              </p>
              <Button
                variant="gold"
                size="xl"
                className="shadow-gold transition-all duration-300 hover:scale-105 group"
                asChild
              >
                <a
                  href="https://wa.me/5521964075124?text=Quero%20entender%20melhor%20a%20representacao%20exclusiva%20do%20PSI"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("representacao")}
                >
                  Entender Melhor a Representação Exclusiva
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section id="diferenciacao" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-navy leading-tight">
                Por Que PSI é Diferente
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Traditional Realtor */}
              <Card className="bg-white border-2 border-red-200 shadow-luxury">
                <CardContent className="p-5 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-4 md:mb-6 flex items-center gap-2">
                    <span className="text-2xl md:text-3xl">❌</span> Corretor Tradicional
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    <li className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        Ganha % do preço final (quanto mais caro, mais ganha)
                      </span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Trabalha para o vendedor (quem paga a comissão)</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Incentivo: vender imóvel CARO</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Mostra estoque (não filtra)</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Você visita 30-40 imóveis</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Risco de erro estrutural</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* PSI */}
              <Card className="bg-white border-2 border-luxury-gold shadow-luxury">
                <CardContent className="p-5 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-luxury-navy mb-4 md:mb-6 flex items-center gap-2">
                    <span className="text-2xl md:text-3xl">✅</span> Personal Shopper Imobiliário
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        Ganha % do DESCONTO (quanto maior economia, mais ganha)
                      </span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Trabalha PARA VOCÊ (você paga, não vendedor)</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        Incentivo: conseguir imóvel com preço JUSTO e com mais descontos que o modelo TRADICIONAL
                      </span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        Melhor filtro e curadoria dos imóveis (você vê apenas certos)
                      </span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Você visita 5-8 imóveis certos</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Due diligence completa protege você</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* For Who Section */}
      <section id="para-quem" className="py-12 md:py-20 bg-luxury-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-navy leading-tight">
                Para Quem É / Para Quem Não É
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* For Who It Is */}
              <Card className="bg-white border-2 border-luxury-gold shadow-luxury">
                <CardContent className="p-5 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-luxury-navy mb-4 md:mb-6 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-luxury-gold" /> Para Quem É
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        Compradores exigentes que valorizam dados e segurança
                      </span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Executivos que não têm tempo para visitar 30 imóveis</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Quem entende que errar custa caro</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Quem quer representação exclusiva do seu lado</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        Investidores que buscam melhor preço + análise profunda
                      </span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-luxury-navy">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Imóveis a partir de R$ 1.5M na Barra ou Recreio</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* For Who It Is Not */}
              <Card className="bg-white border-2 border-red-200 shadow-luxury">
                <CardContent className="p-5 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-4 md:mb-6 flex items-center gap-2">
                    <X className="h-6 w-6 md:h-7 md:w-7 text-red-500" /> Para Quem Não É
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    <li className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Quem quer apenas "ver opções" sem compromisso</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Quem busca corretor gratuito (do lado do vendedor)</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Quem não está pronto para decidir em 90 dias</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Quem acha que tempo e segurança não importam</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 text-muted-foreground">
                      <X className="h-4 w-4 md:h-5 md:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Imóveis abaixo de R$ 1.5M</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - 3 Packages */}
      <section id="precos" className="py-12 md:py-20 bg-luxury-navy text-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <Badge variant="outline" className="mb-3 md:mb-4 border-luxury-gold text-luxury-gold text-xs md:text-sm">
                Serviços Exclusivos
              </Badge>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                Sua Jornada Imobiliária de <span className="text-luxury-gold">Alto Padrão</span>
              </h2>
              <p className="text-sm sm:text-base md:text-xl text-white/80 max-w-3xl mx-auto">
                Serviços desenhados para suas necessidades, garantindo segurança, exclusividade e retorno.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[
                {
                  name: "Parecer Godoy Prime",
                  subtitle: "Atestado de Valor",
                  price: "À partir de R$ 5.000,00",
                  description:
                    "Para quem já tem um imóvel em vista e precisa de validação independente sobre seu valor, potencial e histórico de vendas.",
                  features: [
                    "Consulta de alinhamento estratégico",
                    "Inspeção e Vistoria Técnica local detalhada",
                    "Relatório comparativo com análise de mercado e parecer de preço justo",
                    "Pack de Conhecimento exclusivo",
                  ],
                  cta: "Quero Meu Parecer",
                  popular: false,
                },
                {
                  name: "Compra Blindada",
                  subtitle: "Validação & Negociação",
                  price: "À partir de R$ 10.000,00",
                  description:
                    "Para quem já tem um imóvel em vista e quer garantir a melhor negociação e proteção total na transação.",
                  features: [
                    "Tudo do Parecer Godoy Prime",
                    "Estratégia de negociação personalizada",
                    "Representação exclusiva na mesa de negociação",
                    "Coordenação de Due Diligence completa",
                    "Acompanhamento até a assinatura",
                  ],
                  cta: "Quero Blindar Minha Compra",
                  popular: false,
                },
                {
                  name: "Prime Buyer Experience",
                  subtitle: "Busca Completa",
                  price: "Sob consulta",
                  description:
                    "Para quem ainda está buscando o imóvel ideal e quer um serviço completo de representação exclusiva.",
                  features: [
                    "Tudo do Compra Blindada",
                    "Mapeamento completo do seu perfil",
                    "Curadoria exclusiva de imóveis (on e off-market)",
                    "Visitas técnicas prévias (você visita apenas os certos)",
                    "Análise de valor real de cada opção",
                    "Acompanhamento pós-aquisição",
                  ],
                  cta: "Quero a Experiência Completa",
                  popular: true,
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className={cn(
                    "border-2 transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] bg-white/5 backdrop-blur-sm",
                    plan.popular ? "border-luxury-gold shadow-gold" : "border-white/20 hover:border-luxury-gold/50",
                  )}
                >
                  <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8">
                    {plan.popular && (
                      <Badge className="mb-3 md:mb-4 bg-luxury-gold text-luxury-navy text-xs md:text-sm">
                        Mais Completo
                      </Badge>
                    )}

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-luxury-gold mb-3 md:mb-4 text-sm md:text-base">{plan.subtitle}</p>

                    <div className="mb-3 md:mb-4">
                      <span className="text-lg md:text-xl font-bold text-white">{plan.price}</span>
                    </div>

                    <p className="text-white/80 mb-4 md:mb-6 text-xs md:text-sm leading-relaxed">{plan.description}</p>

                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2 md:gap-3 text-white/90 text-xs md:text-sm">
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-luxury-gold mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={plan.popular ? "gold" : "luxury-outline"}
                      className="w-full text-sm md:text-base py-3 h-12 touch-manipulation"
                      asChild
                    >
                      <a
                        href="https://wa.me/5521964075124?text=Quero%20saber%20mais%20sobre%20o%20servi%C3%A7o"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick("precos")}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section id="autoridade" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-luxury-navy rounded-xl md:rounded-2xl p-6 md:p-12 shadow-luxury">
              <h3 className="text-xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">Experiência Profissional</h3>

              <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                <p className="text-white/90 text-sm md:text-lg leading-relaxed flex items-start gap-2 md:gap-3">
                  <Award className="h-5 w-5 md:h-6 md:w-6 text-luxury-gold mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-luxury-gold">Atuação focada</strong> em imóveis de alto padrão na Barra da
                    Tijuca e Recreio dos Bandeirantes
                  </span>
                </p>
                <p className="text-white/90 text-sm md:text-lg leading-relaxed flex items-start gap-2 md:gap-3">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-luxury-gold mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-luxury-gold">Representação exclusiva</strong> do comprador em transações
                    acima de R$ 1.5 milhão
                  </span>
                </p>
                <p className="text-white/90 text-sm md:text-lg leading-relaxed flex items-start gap-2 md:gap-3">
                  <Target className="h-5 w-5 md:h-6 md:w-6 text-luxury-gold mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-luxury-gold">Método proprietário</strong> baseado em dados reais, curadoria
                    técnica e negociação estratégica
                  </span>
                </p>
              </div>

              <div className="bg-luxury-gold/20 rounded-lg md:rounded-xl p-4 md:p-6 border border-luxury-gold/30">
                <p className="text-base md:text-2xl text-white text-center font-medium">
                  Meu compromisso: <span className="text-luxury-gold">seu patrimônio está protegido</span>. Sua economia
                  é real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="depoimentos" className="py-12 md:py-20 bg-luxury-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-foreground leading-tight">
                Ouça Quem Já <span className="text-luxury-gold">Protegeu Seu Patrimônio</span>
              </h2>
              <p className="text-base md:text-xl text-muted-foreground">O que diz quem já contratou?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  quote:
                    "Ele me mostrou dados que provaram que o apartamento estava 15% acima do mercado. Economizei R$ 320 mil na negociação.",
                  author: "Roberto S.",
                  role: "Empresário",
                  savings: "R$ 320.000",
                  isWhatsApp: true,
                },
                {
                  quote:
                    "Finalmente alguém que trabalha para mim, não para quem vende. Processo transparente do início ao fim.",
                  author: "Ana Carolina M.",
                  role: "Executiva",
                  savings: "R$ 450.000",
                  isWhatsApp: true,
                },
                {
                  quote:
                    "Visitei apenas 6 imóveis em vez de 40. Cada um pré-aprovado tecnicamente. Fechei em 3 semanas.",
                  author: "Pedro H.",
                  role: "Médico",
                  savings: "R$ 280.000",
                  isWhatsApp: false,
                },
              ].map((testimonial, index) => (
                <Card key={index} className={cn(
                  "border-0 shadow-luxury bg-white relative overflow-hidden",
                  testimonial.isWhatsApp && "border-l-4 border-green-500"
                )}>
                  {testimonial.isWhatsApp && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-green-500 text-white px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        Via WhatsApp
                      </div>
                    </div>
                  )}
                  <CardContent className="p-5 md:p-6">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                      ))}
                    </div>

                    <blockquote className="text-sm md:text-base text-foreground mb-4 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="flex flex-col gap-2">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                      <Badge variant="outline" className="border-luxury-gold text-luxury-gold bg-luxury-gold/5 text-xs w-fit">
                        Economizou {testimonial.savings}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story Section - Resumida */}
      <section id="sobre" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-luxury-navy leading-tight">
                Por Que Criei o <span className="text-luxury-gold">PSI</span>
              </h2>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-12 shadow-luxury">
              <div className="prose prose-lg max-w-none text-luxury-navy">
                <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                  Como Corretor, vi uma realidade frustrante: o modelo tradicional privilegia
                  vendedores e deixa compradores desprotegidos. A comissão cria{" "}
                  <strong>conflito de interesses estrutural</strong>.
                </p>

                <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                  Estudei modelos internacionais e desenvolvi um método próprio:{" "}
                  <strong>curadoria técnica + dados reais + negociação estratégica</strong>.
                </p>

                <div className="bg-luxury-navy text-white rounded-lg md:rounded-xl p-5 md:p-8 text-center">
                  <p className="text-base md:text-xl font-bold mb-3 md:mb-4">
                    Quer entender se o PSI faz sentido para você?
                  </p>
                  <p className="text-white/80 text-sm md:text-base mb-4">
                    Agende um diagnóstico gratuito — sem compromisso financeiro.
                  </p>
                  <Button variant="gold" className="mt-2 md:mt-4 w-full sm:w-auto" asChild>
                    <a
                      href="https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCalendlyClick("sobre")}
                    >
                      Agendar Diagnóstico Gratuito
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section id="garantias" className="py-12 md:py-20 bg-luxury-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-3 md:mb-4 border-luxury-gold text-luxury-gold text-xs md:text-sm">
              Garantias
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-luxury-navy leading-tight">
              Sua Segurança é <span className="text-luxury-gold">Prioridade</span>
            </h2>

            <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-12 shadow-luxury">
              <ul className="text-left space-y-4 md:space-y-6 mb-6 md:mb-8">
                <li className="flex items-start space-x-2 md:space-x-3">
                  <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                  <div className="text-sm md:text-base">
                    <strong className="text-luxury-navy">Lealdade Exclusiva:</strong>
                    <span className="text-luxury-navy"> Defendo apenas seus interesses, sem conflitos.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2 md:space-x-3">
                  <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                  <div className="text-sm md:text-base">
                    <strong className="text-luxury-navy">Confidencialidade Total:</strong>
                    <span className="text-luxury-navy"> Suas informações e estratégias são protegidas.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2 md:space-x-3">
                  <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                  <div className="text-sm md:text-base">
                    <strong className="text-luxury-navy">Remuneração por Performance:</strong>
                    <span className="text-luxury-navy"> Se não houver economia, você não paga success fee.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2 md:space-x-3">
                  <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                  <div className="text-sm md:text-base">
                    <strong className="text-luxury-navy">Contrato Formalizado:</strong>
                    <span className="text-luxury-navy">
                      {" "}
                      Todos os compromissos de ética e defesa dos seus interesses estão assegurados em contrato.
                    </span>
                  </div>
                </li>
              </ul>

              <Button variant="gold" className="h-12 md:h-14 px-6 md:px-10 text-sm md:text-lg font-semibold w-full sm:w-auto" asChild>
                <a
                  href="https://wa.me/5521964075124?text=Quero%20agendar%20um%20Diagn%C3%B3stico%20Estrat%C3%A9gico"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("garantias")}
                >
                  Garantir Minha Vaga Agora
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <Badge variant="outline" className="mb-3 md:mb-4 border-luxury-gold text-luxury-gold text-xs md:text-sm">
                Perguntas Frequentes
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-foreground leading-tight">
                <span className="text-luxury-gold">Respostas Diretas</span> para Suas Dúvidas
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
              {[
                { q: "O que é um Personal Shopper Imobiliário?", a: "Um profissional que atua <strong>exclusivamente em nome do comprador</strong>, defendendo seus interesses em todas as etapas da aquisição. Diferente do corretor tradicional que trabalha para o vendedor, o PSI busca o melhor negócio para você." },
                { q: "Qual a diferença para um corretor tradicional?", a: "O corretor tradicional ganha comissão sobre o valor da venda (quanto mais caro, mais ganha). Eu ganho sobre o <strong>desconto que consigo para você</strong> (quanto mais economia, mais ganho). Nossos interesses estão 100% alinhados." },
                { q: "Como funciona a remuneração?", a: "<strong>Fee de Consultoria:</strong> R$ 10.000 (cobre análise, curadoria e estratégia).<br /><strong>Success Fee:</strong> 30% do desconto comprovado. Se não houver desconto, você não paga success fee." },
                { q: "Para quais imóveis o serviço é indicado?", a: "Imóveis de alto padrão <strong>a partir de R$ 1.5 milhão</strong> na Barra da Tijuca e Recreio dos Bandeirantes. O modelo de economia faz mais sentido em transações de maior valor." },
                { q: "Como garantir que você está do meu lado?", a: "Minha remuneração é baseada na <strong>economia que gero para você</strong>. Quanto maior o desconto, mais eu ganho. Além disso, todos os compromissos de ética e lealdade estão formalizados em contrato." },
                { q: "Como iniciar?", a: "Agende um <strong>Diagnóstico Estratégico gratuito</strong>. Nesta conversa, entendemos suas necessidades e explicamos como podemos ajudar. Sem compromisso." },
              ].map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className="border border-border rounded-lg bg-white shadow-sm hover:shadow-luxury transition-all duration-300"
                >
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
                      <p className="text-xs md:text-base text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.a }} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta-final" className="py-12 md:py-20 bg-luxury-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-luxury-navy rounded-xl md:rounded-2xl p-6 md:p-16 text-center shadow-luxury">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">Pronto Para Encontrar o Imóvel Certo?</h2>

              <p className="text-base md:text-2xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                O maior risco não é pagar por estratégia.
                <br />
                <strong className="text-luxury-gold">É comprar mal achando que está seguro.</strong>
              </p>

              <Button
                variant="gold"
                className="mb-4 md:mb-6 h-12 md:h-14 px-6 md:px-10 text-sm md:text-lg font-semibold shadow-gold transition-all duration-300 hover:scale-105 group w-full sm:w-auto"
                asChild
              >
                <a
                  href="https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCalendlyClick("cta-final")}
                >
                  Agendar Diagnóstico Estratégico (Gratuito)
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>

              <p className="text-white/70 text-sm md:text-base">Conversa direta. Sem compromisso. Sem venda de imóveis.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-luxury-navy text-white py-8 sm:py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Company Info */}
            <div className="col-span-2">
              <div className="mb-4 md:mb-6">
                <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
                  <img src={godoyLogo} alt="Godoy Prime Realty" className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16" />
                  <span className="text-base sm:text-lg md:text-2xl font-bold text-white">Godoy Prime Realty</span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-luxury-gold mb-2">Marcus Godoy</h3>
                <p className="text-white/80 mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Personal Shopper Imobiliário Exclusivo da Barra da Tijuca</p>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed hidden sm:block">
                  Representação exclusiva do comprador em imóveis de alto padrão. Economia garantida e transparência
                  total.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Contato</h4>
              <div className="space-y-2 md:space-y-3">
                <a href="tel:+552140400067" className="flex items-center space-x-2 md:space-x-3 hover:text-luxury-gold transition-colors">
                  <Phone className="h-4 w-4 text-luxury-gold flex-shrink-0" />
                  <div>
                    <p className="text-white text-xs md:text-sm">(21) 4040-0067</p>
                  </div>
                </a>
                <a href="https://wa.me/5521964075124" className="flex items-center space-x-2 md:space-x-3 hover:text-luxury-gold transition-colors">
                  <MessageCircle className="h-4 w-4 text-luxury-gold flex-shrink-0" />
                  <div>
                    <p className="text-white text-xs md:text-sm">(21) 96407-5124</p>
                  </div>
                </a>
                <a href="mailto:marcus@godoyprime.com.br" className="flex items-center space-x-2 md:space-x-3 hover:text-luxury-gold transition-colors">
                  <Mail className="h-4 w-4 text-luxury-gold flex-shrink-0" />
                  <div>
                    <p className="text-white text-xs md:text-sm">marcus@godoyprime.com.br</p>
                  </div>
                </a>
                <div className="flex items-start space-x-2 md:space-x-3">
                  <MapPin className="h-4 w-4 text-luxury-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-xs md:text-sm">Barra da Tijuca, RJ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Links Úteis</h4>
              <div className="space-y-2">
                <a href="#como-funciona" className="block text-white/80 hover:text-luxury-gold transition-colors text-xs md:text-sm">
                  Como Funciona
                </a>
                <a href="#economia" className="block text-white/80 hover:text-luxury-gold transition-colors text-xs md:text-sm">
                  Economia
                </a>
                <a href="#precos" className="block text-white/80 hover:text-luxury-gold transition-colors text-xs md:text-sm">
                  Serviços
                </a>
                <a href="#sobre" className="block text-white/80 hover:text-luxury-gold transition-colors text-xs md:text-sm">
                  Sobre Marcus
                </a>
                <a href="#depoimentos" className="block text-white/80 hover:text-luxury-gold transition-colors text-xs md:text-sm">
                  Depoimentos
                </a>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-t border-white/20 pt-6 md:pt-8 mb-6 md:mb-8">
            <div className="grid grid-cols-2 gap-4 md:gap-6 text-center max-w-2xl mx-auto">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-luxury-gold mb-1">100%</p>
                <p className="text-white/70 text-xs md:text-sm">Representação do Comprador</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-luxury-gold mb-1">Zero</p>
                <p className="text-white/70 text-xs md:text-sm">Conflito de Interesses</p>
              </div>
            </div>
          </div>

          {/* Legal Links & Copyright */}
          <div className="border-t border-white/20 pt-6 md:pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 md:gap-6 text-xs md:text-sm text-white/60">
                <a href="/privacidade" className="hover:text-luxury-gold transition-colors py-1 touch-manipulation">
                  Política de Privacidade
                </a>
                <a
                  href="https://docs.google.com/document/d/1JqColkt5uzQnajZDWVPTdy423kJlVDEpQepGRGlGFp8/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-luxury-gold transition-colors py-1 touch-manipulation"
                >
                  Termos de Uso
                </a>
                <a href="/lgpd" className="hover:text-luxury-gold transition-colors py-1 touch-manipulation">
                  LGPD
                </a>
              </div>

              <p className="text-white/60 text-[10px] sm:text-xs md:text-sm text-center md:text-right">
                © 2025 Godoy Prime Realty. Todos os direitos reservados.
                <br />
                CRECI/RJ: 11841 PJ RJ e 80199 PF RJ
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5521964075124?text=Quero%20saber%20mais%20sobre%20o%20Personal%20Shopper%20Imobili%C3%A1rio"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 touch-manipulation"
        onClick={() => trackWhatsAppClick("floating-button")}
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
};

export default LandingPage;
