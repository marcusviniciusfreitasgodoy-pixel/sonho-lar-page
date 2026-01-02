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
} from "lucide-react";
import heroImage from "@/assets/barra-beach-luxury.jpg";
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
    script.innerHTML = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJLYXR5YV9Qcm9mZXNzaW9uYWxMb29rX3B1%0D%0AYmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzM0%0D%0AOGRkZjUwM2M2NTRiOWJiYmI4YmVhOWY5MjEwZWFkXzU1ODcwL3ByZXZpZXdfdGFyZ2V0LndlYnAi%0D%0ALCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6dHJ1ZSwia25vd2xlZGdlQmFzZUlkIjoiYWI2NmI1ZjNk%0D%0AYWRmNGQ1YmJkZTI3YmZiMDVhMzgwNjIiLCJ1c2VybmFtZSI6IjRiYjNhNThlMzlmNDQ4OTFiNzgy%0D%0ANWI3YzMyZWRhMDcxIn0%3D&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`\\n  #heygen-streaming-embed {\\n    z-index: 9999;\\n    position: fixed;\\n    left: 40px;\\n    bottom: 40px;\\n    width: 200px;\\n    height: 200px;\\n    border-radius: 50%;\\n    border: 2px solid #fff;\\n    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);\\n    transition: all linear 0.1s;\\n    overflow: hidden;\\n\\n    opacity: 0;\\n    visibility: hidden;\\n  }\\n  #heygen-streaming-embed.show {\\n    opacity: 1;\\n    visibility: visible;\\n  }\\n  #heygen-streaming-embed.expand {\\n    \${clientWidth<540?"height: 266px; width: 96%; left: 50%; transform: translateX(-50%);":"height: 366px; width: calc(366px * 16 / 9);"}\\n    border: 0;\\n    border-radius: 8px;\\n  }\\n  #heygen-streaming-container {\\n    width: 100%;\\n    height: 100%;\\n  }\\n  #heygen-streaming-container iframe {\\n    width: 100%;\\n    height: 100%;\\n    border: 0;\\n  }\\n  \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.body.appendChild(wrapDiv)}(globalThis);`;
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <img src={godoyLogo} alt="Godoy Prime Realty" className="h-9 w-9 md:h-12 md:w-12" />
              <span className="text-base md:text-xl font-bold text-luxury-navy">Godoy Prime Realty</span>
            </div>

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
                className="lg:hidden p-2 text-luxury-navy hover:text-luxury-gold transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border bg-white animate-fade-in">
              <nav className="flex flex-col space-y-3">
                <a
                  href="#como-funciona"
                  className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Como Funciona
                </a>
                <a
                  href="#economia"
                  className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Economia
                </a>
                <a
                  href="#precos"
                  className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Serviços
                </a>
                <a
                  href="#sobre"
                  className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre
                </a>
                <a
                  href="#faq"
                  className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </a>

                {/* Mobile Contact Info */}
                <div className="pt-4 border-t border-border space-y-3">
                  <a href="tel:+552140400067" className="flex items-center space-x-2 text-luxury-navy text-sm py-1">
                    <Phone className="h-4 w-4" />
                    <span>(21) 4040-0067</span>
                  </a>
                  <a
                    href="https://wa.me/5521964075124"
                    className="flex items-center space-x-2 text-luxury-navy text-sm py-1"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>(21) 96407-5124</span>
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
        className="relative min-h-[85svh] md:min-h-[90svh] flex items-center justify-center overflow-hidden pt-20 md:pt-24"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-85"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white py-6 md:py-8">
          <div className="animate-fade-in">
            <Badge
              variant="outline"
              className="mb-4 md:mb-6 border-luxury-gold text-luxury-gold bg-white/10 text-xs md:text-sm"
            >
              Personal Shopper Imobiliário
            </Badge>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight max-w-5xl mx-auto">
              Comprar imóvel de alto padrão sem representação exclusiva é o erro mais caro do mercado imobiliário.
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
              Eu represento <span className="text-luxury-gold font-semibold">compradores exigentes</span> na Barra da
              Tijuca e Recreio — usando dados reais, curadoria técnica e negociação profissional.
            </p>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/80 max-w-3xl mx-auto px-2">
              Sem conflito de interesses. Sem perda de tempo. Sem risco de prejuizos e surpresas futuras.
            </p>

            <Button
              variant="gold"
              className="mb-3 md:mb-4 h-12 px-6 text-sm font-semibold sm:h-12 sm:px-8 sm:text-base md:h-14 md:px-10 md:text-lg shadow-gold transition-all duration-300 hover:scale-105 group w-full sm:w-auto max-w-sm"
              asChild
            >
              <a
                href="https://wa.me/5521964075124?text=Quero%20agendar%20um%20Diagn%C3%B3stico%20Estrat%C3%A9gico"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hero")}
              >
                Agendar Diagnóstico (Gratuito)
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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

            <div className="bg-luxury-navy rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-6 md:mb-8">
                Economia Total do Cliente
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white/10 rounded-lg md:rounded-xl p-4 md:p-6 text-center border border-luxury-gold/30">
                  <p className="text-white/80 mb-1 md:mb-2 text-sm md:text-base">Imóvel R$ 2M</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-luxury-gold mb-1 md:mb-2">R$ 195-340k</p>
                  <p className="text-xs md:text-sm text-white/70">ROI: 2.5-3.8x</p>
                </div>
                <div className="bg-white/10 rounded-lg md:rounded-xl p-4 md:p-6 text-center border border-luxury-gold/30">
                  <p className="text-white/80 mb-1 md:mb-2 text-sm md:text-base">Imóvel R$ 3.5M</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-luxury-gold mb-1 md:mb-2">R$ 287-520k</p>
                  <p className="text-xs md:text-sm text-white/70">ROI: 2.9-4.4x</p>
                </div>
                <div className="bg-white/10 rounded-lg md:rounded-xl p-4 md:p-6 text-center border border-luxury-gold/30">
                  <p className="text-white/80 mb-1 md:mb-2 text-sm md:text-base">Imóvel R$ 6M</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-luxury-gold mb-1 md:mb-2">R$ 502-780k</p>
                  <p className="text-xs md:text-sm text-white/70">ROI: 3.7-5.2x</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concrete Example Section */}
      <section id="exemplo" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-navy leading-tight">
                Exemplo Concreto: Imóvel R$ 2.5M na Barra
              </h2>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl shadow-luxury border border-luxury-gold/20 overflow-hidden">
              {/* Values Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                <div className="p-4 md:p-6 text-center">
                  <p className="text-sm md:text-base text-muted-foreground mb-1 md:mb-2">Valor Anunciado (Baseline)</p>
                  <p className="text-xl md:text-2xl font-bold text-luxury-navy">R$ 2.500.000</p>
                </div>
                <div className="p-4 md:p-6 text-center">
                  <p className="text-sm md:text-base text-muted-foreground mb-1 md:mb-2">Compra Real (Após PSI)</p>
                  <p className="text-xl md:text-2xl font-bold text-luxury-navy">R$ 2.350.000</p>
                </div>
              </div>

              {/* Discount Highlight */}
              <div className="bg-luxury-gold p-4 md:p-6 text-center">
                <p className="text-luxury-navy font-medium mb-1 text-sm md:text-base">Desconto Comprovado</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-navy">R$ 150.000</p>
              </div>

              {/* Fee Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                <div className="p-4 md:p-6 text-center">
                  <p className="text-sm md:text-base text-muted-foreground mb-1 md:mb-2">Fee Fixo (Consultoria)</p>
                  <p className="text-lg md:text-xl font-bold text-luxury-navy">R$ 10.000</p>
                </div>
                <div className="p-4 md:p-6 text-center">
                  <p className="text-sm md:text-base text-muted-foreground mb-1 md:mb-2">Success Fee (30% Desconto)</p>
                  <p className="text-lg md:text-xl font-bold text-luxury-navy">R$ 45.000</p>
                </div>
              </div>

              {/* Total PSI */}
              <div className="bg-luxury-cream p-4 md:p-6 text-center border-t border-border">
                <p className="text-sm md:text-base text-muted-foreground mb-1">Você Paga Comigo</p>
                <p className="text-xl md:text-2xl font-bold text-luxury-navy">R$ 55.000</p>
              </div>

              {/* Final Savings */}
              <div className="bg-luxury-navy p-6 md:p-8 text-center">
                <p className="text-white/80 mb-1 md:mb-2 text-sm md:text-base">Você Economiza Líquido</p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-luxury-gold mb-1 md:mb-2">R$ 95.000</p>
                <p className="text-white/70 text-sm md:text-base">ROI: 1.73x em uma negociação</p>
              </div>
            </div>

            <p className="text-center text-muted-foreground mt-6 md:mt-8 italic text-sm md:text-base px-2">
              Este exemplo assume desconto de 6%. Descontos maiores geram economia ainda mais significativa para você.
            </p>
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
                Meu interesse está <strong className="text-luxury-navy">100% alinhado ao seu</strong>: quanto maior seu
                desconto, maior meu ganho. Nenhum incentivo para você pagar caro.
              </p>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl shadow-luxury border border-luxury-gold/20 overflow-hidden mb-6 md:mb-8">
              {/* Fee Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                <div className="p-5 md:p-8 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-3 md:mb-4">1. Fee de Consultoria</h3>
                  <div className="text-2xl md:text-4xl font-bold text-luxury-gold mb-3 md:mb-4">R$ 10.000</div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Cobre análise técnica profunda, curadoria de imóveis, pesquisa de mercado e toda estratégia de
                    negociação.
                  </p>
                </div>
                <div className="p-5 md:p-8 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-3 md:mb-4">2. Success Fee</h3>
                  <div className="text-2xl md:text-4xl font-bold text-luxury-gold mb-3 md:mb-4">30% do desconto</div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Você paga apenas sobre a diferença entre o valor anunciado e o valor que efetivamente negocia.
                  </p>
                </div>
              </div>

              {/* How It's Calculated */}
              <div className="bg-luxury-cream p-5 md:p-8 border-t border-border">
                <h3 className="text-lg md:text-xl font-bold text-luxury-navy mb-4 md:mb-6 text-center">
                  Como é Calculado
                </h3>
                <ul className="space-y-3 md:space-y-4 max-w-2xl mx-auto">
                  <li className="flex items-start gap-2 md:gap-3">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base text-luxury-navy">
                      <strong>Baseline (Valor Anunciado):</strong> Quanto está no anúncio público do imóvel.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base text-luxury-navy">
                      <strong>Compra Real (Valor Negociado):</strong> Quanto você efetivamente paga após minha
                      negociação.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base text-luxury-navy">
                      <strong>Delta:</strong> Baseline - Compra Real = seu desconto comprovado.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base text-luxury-navy">
                      <strong>Seu Ganho:</strong> Você fica com 70% do delta. Eu fico com 30% do delta.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Guarantee */}
              <div className="bg-luxury-navy p-4 md:p-6 text-center">
                <p className="text-white text-sm md:text-lg leading-relaxed">
                  <strong className="text-luxury-gold">
                    Se não houver desconto comprovado, você não paga success fee.
                  </strong>
                  <br />
                  Apenas os R$ 10.000 de consultoria.
                </p>
              </div>
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
                      { label: "Lealdade", text: "Equilibrada entre vendedor e comprador. Sem favor a ninguém." },
                      { label: "Autoridade", text: "Sem poderes de decisão. Apenas facilita comunicação." },
                      { label: "Incentivo Financeiro", text: "Comissão atrelada ao fechamento. Quanto mais caro você paga, mais o corretor ganha.", highlight: true },
                      { label: "Conflito de Interesse", text: "Estrutural. O corretor ganha mais se você pagar mais." },
                      { label: "Resultado Esperado", text: "Transação viabilizada. Preço: o que o mercado aceitar." },
                    ].map((item, index) => (
                      <div key={index} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                        <span className="block text-[10px] md:text-xs font-bold uppercase text-destructive mb-1 md:mb-2">{item.label}</span>
                        <p className={cn("text-xs md:text-sm text-muted-foreground leading-relaxed", item.highlight && "font-semibold text-foreground")}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="bg-muted p-4 border-t border-border">
                  <p className="text-xs md:text-sm text-foreground leading-relaxed">
                    <strong>Risco para você:</strong> Você está sozinho na negociação. 
                    O corretor quer fechar rápido (não negocia desconto).
                  </p>
                </div>
              </Card>

              {/* Representação */}
              <Card className="bg-white border-2 border-luxury-gold shadow-luxury hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="bg-luxury-gold/10 p-4 md:p-6 border-b-[3px] border-luxury-gold text-center">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">✅ Representação (Modelo PSI)</h3>
                  <p className="text-xs md:text-sm text-muted-foreground italic">Profissional como seu advogado</p>
                </div>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4 md:space-y-5">
                    {[
                      { label: "Lealdade", text: "Exclusiva ao comprador. Seu interesse é meu interesse.", highlight: true },
                      { label: "Autoridade", text: "Poderes definidos em contrato. Posso negociar, propor e decidir em seu nome." },
                      { label: "Incentivo Financeiro", text: "Taxa de sucesso atrelada ao desconto. Quanto mais você economiza, mais eu ganho.", highlight: true },
                      { label: "Conflito de Interesse", text: "Eliminado. Meu ganho depende da sua economia." },
                      { label: "Resultado Esperado", text: "Melhor preço possível + máxima segurança jurídica." },
                    ].map((item, index) => (
                      <div key={index} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                        <span className="block text-[10px] md:text-xs font-bold uppercase text-luxury-gold mb-1 md:mb-2">{item.label}</span>
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

            {/* Exemplo Prático */}
            <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border-2 border-destructive mb-8 md:mb-12">
              <h3 className="text-lg md:text-xl font-bold text-destructive mb-4 md:mb-6">Exemplo Prático: A Diferença em Ação</h3>
              
              <div className="bg-muted p-4 md:p-6 rounded-lg mb-4 md:mb-6">
                <h4 className="text-sm md:text-base font-bold text-foreground mb-1">Cenário: Imóvel anunciado por R$ 2.5M</h4>
                <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">Você está negociando com o vendedor</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Com Intermediação */}
                  <div className="bg-white p-4 md:p-5 rounded-md border-l-4 border-destructive">
                    <p className="text-xs font-bold uppercase text-foreground mb-3 md:mb-4">Com Intermediação</p>
                    <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Corretor recebe:</strong> 2% = R$ 50k</p>
                      <p><strong className="text-foreground">Incentivo do corretor:</strong> Fechar rápido. Quanto mais caro, melhor.</p>
                      <p><strong className="text-foreground">Resultado:</strong> Você paga R$ 2.5M (preço pedido).</p>
                      <p><strong className="text-foreground">Seu ganho:</strong> R$ 0</p>
                    </div>
                  </div>
                  
                  {/* Com Representação */}
                  <div className="bg-white p-4 md:p-5 rounded-md border-l-4 border-luxury-gold">
                    <p className="text-xs font-bold uppercase text-foreground mb-3 md:mb-4">Com Representação (PSI)</p>
                    <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Meu ganho:</strong> 30% do desconto = R$ 45k (se conseguir R$ 150k de desconto)</p>
                      <p><strong className="text-foreground">Meu incentivo:</strong> Negociar duro. Quanto maior o desconto, melhor.</p>
                      <p><strong className="text-foreground">Resultado:</strong> Você paga R$ 2.35M (após negociação).</p>
                      <p><strong className="text-foreground">Seu ganho:</strong> R$ 150k</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-luxury-gold/10 p-4 md:p-5 rounded-lg border-l-4 border-luxury-gold">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  <strong className="text-foreground">Com intermediação:</strong> Você paga preço cheio. Corretor ganha R$ 50k.
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">Com representação:</strong> Você economiza R$ 150k. Eu ganho R$ 45k. 
                  Você fica com R$ 105k de economia líquida.
                </p>
                <p className="text-sm md:text-base font-semibold text-luxury-navy">
                  Qual modelo você prefere?
                </p>
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
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <Badge variant="outline" className="mb-3 md:mb-4 border-luxury-gold text-luxury-gold text-xs md:text-sm">
                Serviços Exclusivos
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                Sua Jornada Imobiliária de <span className="text-luxury-gold">Alto Padrão</span>
              </h2>
              <p className="text-base md:text-xl text-white/80 max-w-3xl mx-auto px-2">
                Serviços desenhados para suas necessidades, garantindo segurança, exclusividade e retorno.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
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
                    "border-2 transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 bg-white/5 backdrop-blur-sm",
                    plan.popular ? "border-luxury-gold shadow-gold" : "border-white/20 hover:border-luxury-gold/50",
                  )}
                >
                  <CardContent className="p-5 md:p-8">
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
                      className="w-full text-sm md:text-base py-3"
                      asChild
                    >
                      <a
                        href="https://wa.me/5521964075124?text=Quero%20saber%20mais%20sobre%20o%20servi%C3%A7o"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick("precos")}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {[
                {
                  quote:
                    "Ele me convenceu ao me mostrar dados que provaram que o apartamento estava 15% acima do preço real de mercado. O Contratei e Economizei R$ 320 mil na negociação.",
                  author: "Roberto Silva",
                  role: "Empresário do Setor Financeiro",
                  savings: "R$ 320.000",
                },
                {
                  quote:
                    "Finalmente encontrei alguém que trabalha para mim, não para quem vende. O processo foi transparente do início ao fim.",
                  author: "Ana Carolina",
                  role: "Executiva de Multinacional",
                  savings: "R$ 450.000",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-luxury bg-white">
                  <CardContent className="p-5 md:p-8">
                    <div className="flex mb-3 md:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-luxury-gold text-luxury-gold" />
                      ))}
                    </div>

                    <blockquote className="text-sm md:text-lg text-foreground mb-4 md:mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground text-sm md:text-base">{testimonial.author}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
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
                Sobre <span className="text-luxury-gold">Marcus Godoy</span>
              </h2>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-12 shadow-luxury">
              <div className="prose prose-lg max-w-none text-luxury-navy">
                <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                  Minha experiência como Corretor revelou uma realidade frustrante: o modelo tradicional privilegia
                  vendedores e deixa compradores desprotegidos. A remuneração por comissão cria um{" "}
                  <strong>conflito de interesses estrutural</strong>.
                </p>

                <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                  Estudei modelos internacionais de representação exclusiva do comprador e desenvolvi um método próprio:{" "}
                  <strong>curadoria técnica + dados reais + negociação estratégica</strong>.
                </p>

                <div className="bg-luxury-navy text-white rounded-lg md:rounded-xl p-5 md:p-8 text-center">
                  <p className="text-base md:text-xl font-bold mb-3 md:mb-4">
                    Meu compromisso: ser o defensor exclusivo dos seus interesses, com lealdade total.
                  </p>
                  <Button variant="gold" className="mt-2 md:mt-4 w-full sm:w-auto" asChild>
                    <a
                      href="https://wa.me/5521964075124?text=Quero%20agendar%20um%20Diagn%C3%B3stico%20Estrat%C3%A9gico"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick("sobre")}
                    >
                      Agendar Diagnóstico Estratégico
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

              <Button asChild variant="gold" className="h-12 md:h-14 px-6 md:px-10 text-sm md:text-lg font-semibold w-full sm:w-auto">
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
                  href="https://wa.me/5521964075124?text=Quero%20agendar%20um%20Diagn%C3%B3stico%20Estrat%C3%A9gico"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("cta-final")}
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
      <footer className="bg-luxury-navy text-white py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Company Info */}
            <div className="sm:col-span-2">
              <div className="mb-4 md:mb-6">
                <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
                  <img src={godoyLogo} alt="Godoy Prime Realty" className="h-12 w-12 md:h-16 md:w-16" />
                  <span className="text-lg md:text-2xl font-bold text-white">Godoy Prime Realty</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-luxury-gold mb-2">Marcus Godoy</h3>
                <p className="text-white/80 mb-3 md:mb-4 text-sm md:text-base">Personal Shopper Imobiliário Exclusivo da Barra da Tijuca</p>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed">
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
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:space-x-6 text-xs md:text-sm text-white/60">
                <a href="/privacidade" className="hover:text-luxury-gold transition-colors">
                  Política de Privacidade
                </a>
                <a
                  href="https://docs.google.com/document/d/1JqColkt5uzQnajZDWVPTdy423kJlVDEpQepGRGlGFp8/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Termos de Uso
                </a>
                <a href="/lgpd" className="hover:text-luxury-gold transition-colors">
                  LGPD
                </a>
              </div>

              <p className="text-white/60 text-xs md:text-sm text-center md:text-right">
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
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        onClick={() => trackWhatsAppClick("floating-button")}
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};

export default LandingPage;
