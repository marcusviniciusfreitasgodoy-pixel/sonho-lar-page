import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Shield, Clock, Key, CircleCheck as CheckCircle, Calculator, Search, Target, Users, TrendingUp, Award, Star, ArrowRight, Phone, Mail, Menu, X, MapPin, MessageCircle } from "lucide-react";
import heroImage from "@/assets/barra-beach-luxury.jpg";
import marcusProfile from "@/assets/marcus-profile-new.jpg";

const LandingPage = () => {
  const [highlightedCards, setHighlightedCards] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleCardHighlight = (cardIndex: number) => {
    setHighlightedCards(prev => 
      prev.includes(cardIndex) 
        ? prev.filter(index => index !== cardIndex)
        : [...prev, cardIndex]
    );
  };

  // Add HeyGen script to document
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJLYXR5YV9Qcm9mZXNzaW9uYWxMb29rX3B1%0D%0AYmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzM0%0D%0AOGRkZjUwM2M2NTRiOWJiYmI4YmVhOWY5MjEwZWFkXzU1ODcwL3ByZXZpZXdfdGFyZ2V0LndlYnAi%0D%0ALCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6dHJ1ZSwia25vd2xlZGdlQmFzZUlkIjoiYWI2NmI1ZjNk%0D%0AYWRmNGQ1YmJkZTI3YmZiMDVhMzgwNjIiLCJ1c2VybmFtZSI6IjRiYjNhNThlMzlmNDQ4OTFiNzgy%0D%0ANWI3YzMyZWRhMDcxIn0%3D&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`\\n  #heygen-streaming-embed {\\n    z-index: 9999;\\n    position: fixed;\\n    left: 40px;\\n    bottom: 40px;\\n    width: 200px;\\n    height: 200px;\\n    border-radius: 50%;\\n    border: 2px solid #fff;\\n    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);\\n    transition: all linear 0.1s;\\n    overflow: hidden;\\n\\n    opacity: 0;\\n    visibility: hidden;\\n  }\\n  #heygen-streaming-embed.show {\\n    opacity: 1;\\n    visibility: visible;\\n  }\\n  #heygen-streaming-embed.expand {\\n    \${clientWidth<540?"height: 266px; width: 96%; left: 50%; transform: translateX(-50%);":"height: 366px; width: calc(366px * 16 / 9);"}\\n    border: 0;\\n    border-radius: 8px;\\n  }\\n  #heygen-streaming-container {\\n    width: 100%;\\n    height: 100%;\\n  }\\n  #heygen-streaming-container iframe {\\n    width: 100%;\\n    height: 100%;\\n    border: 0;\\n  }\\n  \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.body.appendChild(wrapDiv)}(globalThis);`;
    document.body.appendChild(script);
    
    return () => {
      // Cleanup function to remove script when component unmounts
      const heygenEmbed = document.getElementById('heygen-streaming-embed');
      if (heygenEmbed) {
        heygenEmbed.remove();
      }
    };
  }, []);

  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/Logotipo Principal.png" 
                alt="Godoy Prime Realty" 
                className="h-12 w-auto"
              />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#servicos" className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium">
                Serviços
              </a>
              <a href="#sobre" className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium">
                Sobre Marcus
              </a>
              <a href="#metodo" className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium">
                Método
              </a>
              <a href="#garantias" className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium">
                Garantias
              </a>
              <a href="#contato" className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium">
                Contato
              </a>
            </nav>
            
            {/* Contact Info & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-luxury-navy">
                  <Phone className="h-4 w-4" />
                  <span>(21) 4040-0067</span>
                </div>
                <div className="flex items-center space-x-2 text-luxury-navy">
                  <MessageCircle className="h-4 w-4" />
                  <span>(21) 99725-0515</span>
                </div>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-luxury-navy hover:text-luxury-gold transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border bg-white">
              <nav className="flex flex-col space-y-4">
                <a 
                  href="#servicos" 
                  className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Serviços
                </a>
                <a 
                  href="#sobre" 
                  className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre Marcus
                </a>
                <a 
                  href="#metodo" 
                  className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Método
                </a>
                <a 
                  href="#garantias" 
                  className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Garantias
                </a>
                <a 
                  href="#contato" 
                  className="text-luxury-navy hover:text-luxury-gold transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </a>
                
                {/* Mobile Contact Info */}
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center space-x-2 text-luxury-navy text-sm">
                    <Phone className="h-4 w-4" />
                    <span>(21) 4040-0067</span>
                  </div>
                  <div className="flex items-center space-x-2 text-luxury-navy text-sm">
                    <MessageCircle className="h-4 w-4" />
                    <span>(21) 99725-0515</span>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Duplicated Header Content with Less Spacing */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/Logotipo Principal.png" 
                alt="Marcus Godoy Logo" 
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold text-luxury-navy">
                Marcus Godoy
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#servicos" className="text-sm text-gray-600 hover:text-luxury-gold transition-colors">
                Serviços
              </a>
              <a href="#como-funciona" className="text-sm text-gray-600 hover:text-luxury-gold transition-colors">
                Como Funciona
              </a>
              <a href="#contato" className="text-sm text-gray-600 hover:text-luxury-gold transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-6 border-luxury-gold text-luxury-gold bg-white/10">
              Personal Shopper Imobiliário
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Descubra O Segredo dos Compradores Inteligentes
            </h1>
            <h2 className="text-3xl md:text-5xl font-semibold mb-8 leading-tight text-luxury-gold">
              Compre o Imóvel Que Você Quer e Pelo Preço Justo
            </h2>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-4xl mx-auto">
              O Personal Shopper Imobiliário representa apenas você na compra, defende somente os seus interesses e ele só ganha se você economizar.
            </p>
            
            <Button 
              variant="gold" 
              className="mb-4 h-10 px-6 text-sm font-semibold md:h-14 md:px-10 md:text-lg shadow-gold transition-all duration-300 hover:scale-105 group"
              asChild
            >
              <a
                href="https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario"
                target="_blank"
                rel="noopener noreferrer"
              >
                Desbloquear minha Consultoria Exclusiva
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            
            <p className="text-sm text-white/80">
              <strong>Economia e Compromisso Garantidos.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
              Por Que Muitos Compradores Pagam <span className="text-luxury-gold">Milhares de Reais</span> a Mais e só Descobrem Depois?
            </h2>
            
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-luxury">
              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
              
              </p>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                <strong>Verdades Inconvenientes que ninguém te fala,</strong> e tem muito mais...
              </p>
              
              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                A Imobiliária que te mostra o imóvel <strong>não trabalha para você</strong>. 
                Ela foi contratada pelo Vendedor para fazer a intermediação do negócio e <strong>vender pelo preço mais caro possível.
                  
                </strong> Elas ganham mais dinheiro quando você paga mais caro.<strong> Simples Assim!</strong>     
                
              </p> 
              
              <div className="bg-luxury-cream border border-luxury-gold/20 rounded-xl p-6 mb-8">
                <p className="text-lg font-semibold text-luxury-navy">
                  Na Barra da Tijuca, em negociações com imóveis de Alto Padrão, essa diferença pode ser de <span className="text-luxury-gold">R$ 200 mil, 
                  R$ 300 mil ou até R$ 500 mil</span> que saem direto do seu bolso.
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground">
                Você negocia no escuro, sem saber o preço real que outros pagaram pelos mesmos imóveis. 
                Sem acesso aos dados de transações fechadas, sem inteligência de mercado e sem conhecer os segredos da região. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-luxury-navy">
                Personal Shopper Imobiliário <span className="text-luxury-gold">Representação 100% Sua</span>
              </h2>
              <p className="text-xl text-luxury-text-muted max-w-3xl mx-auto">
                Só existe apenas uma maneira de ter a certeza que está fazendo a melhor negociação possível. Fuja da Intermediação e busque a Representação.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-luxury-navy mb-6 leading-relaxed">
                  Sou Marcus Godoy, criador do primeiro Personal Shopper Imobiliário real do Brasil.
                  Ajudo compradores exigentes a encontrar, avaliar e negociar imóveis de alto padrão com total independência do mercado tradicional.
                  
                </p>
                
                <div className="space-y-4 mb-8">
                  {["Tenha acesso aos dados reais de vendas que nunca aparecem nos portais", "Conheça os segredos do mercado local", "Representação Exclusiva do Comprador, Sem Conflito de Interesses"].map((item, index) => <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <p className="text-luxury-navy">{item}</p>
                    </div>)}
                </div>
                
                <div className="bg-white/60 rounded-xl p-6 border border-luxury-gold/30">
                  <p className="text-lg font-semibold text-luxury-navy italic">
                    É como jogar pôquer vendo as cartas dos outros jogadores. Eu não vendo imóveis: eu compro BEM para você.

Você terá o controle total, transformando sua compra em uma estratégia blindada.
                  </p>
                </div>
              </div>
              
              <div className="animate-float">
                <img src={marcusProfile} alt="Marcus Godoy - Personal Shopper Imobiliário" className="rounded-2xl shadow-luxury w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section id="publico" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                É Para Quem?
              </h2>
              <p className="text-xl text-muted-foreground">
                 Minha missão é simples: proteger seus interesses, seu tempo e seu investimento enquanto você conquista o imóvel que você busca e não o que querem te                     vender. Criado especialmente para compradores exigentes de alto padrão, que buscam Segurança e Tranquilidade na sua compra.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[{
              icon: Users,
              title: "Executivos e Empresários",
              description: "Profissionais bem-sucedidos que valorizam tempo e querem investir com inteligência em imóveis de Alto Padrão na região da Barra da Tijuca."
            }, {
              icon: TrendingUp,
              title: "Investidores Experientes",
              description: "Pessoas que entendem que pagar por expertise especializada gera economia real e proteção patrimonial significativa."
            }, {
              icon: Award,
              title: "Famílias em Busca de Conforto e Segurança",
              description: "Que priorizam bem-estar, tranquilidade, conforto e segurança total para sua família."
            }, {
              icon: Award,
              title: "Celebridades e Influenciadores",
              description: "Quem busca exclusividade, discrição e acesso a oportunidades diferenciadas que não chegam ao mercado tradicional."
            }].map((persona, index) =>
                <Card key={index} className="border-0 shadow-luxury hover:shadow-gold transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                      <persona.icon className="h-8 w-8 text-luxury-navy" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-foreground">{persona.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{persona.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="servicos" className="py-20 bg-luxury-navy text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Por Que o Personal Shopper Imobiliário É 
                <span className="text-luxury-gold"> Sua Melhor Escolha</span> na Barra?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{
              icon: Calculator,
              title: "Economia Real Garantida",
              description: "Você paga o preço justo, não o preço de vitrine. Economia entre R$ 100 mil e R$ 500 mil por transação.",
              highlight: "R$ 100-500k economizados"
            }, {
              icon: Clock,
              title: "Tempo Precioso Protegido",
              description: "Suas visitas são apenas aos imóveis que realmente fazem sentido para você. Nada de perder horas com visitas improdutivas.",
              highlight: "40+ horas poupadas"
            }, {
              icon: Key,
              title: "Acesso aos Melhores Negócios",
              description: "Os imóveis mais interessantes raramente chegam aos portais. Acesso às oportunidades off-market exclusivas e também à 100% das opçoes disponíveis na região e sem precisar falar com dezenas de Imobiliárias e Corretores.",
              highlight: "Ofertas exclusivas e Economia de tempo"
            }, {
              icon: Shield,
              title: "Representação 100% Sua",
              description: "Marcus ganha apenas quando você economiza dinheiro. É o único profissional da Barra que trabalha exclusivamente para o comprador.",
              highlight: "Zero conflito"
            }].map((benefit, index) => <Card 
                key={index} 
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => toggleCardHighlight(index)}
              >
                  <CardContent className="p-6 text-center">
                    <div className="bg-luxury-gold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-luxury-navy" />
                    </div>
                    <Badge variant="outline" className="border-luxury-gold text-luxury-gold mb-3">
                      {benefit.highlight}
                    </Badge>
                    <h3 className={cn(
                      "text-lg font-bold mb-3 transition-colors duration-300",
                      highlightedCards.includes(index) ? 'text-luxury-gold' : 'text-white'
                    )}>
                      {benefit.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </section>

      {/* Por Que o Personal Shopper Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-luxury-navy">
              Aprenda com os erros dos outros Compradores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tentar encontrar o seu imóvel perfeito da maneira tradicional e antiga, frequentemente, 
              resulta em perda de tempo, dinheiro e frustração.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="bg-luxury-cream p-8 rounded-xl border-l-4 border-luxury-gold">
                <h3 className="text-2xl font-bold mb-4 text-luxury-navy">
                  "Não preciso desse serviços, eu posso fazer isso sozinho."
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Sim é claro que pode, mas por que fazer se tem outra opção melhor, com menos risco, 
                  mais segura e mais barata? Nosso serviço economiza seu tempo e elimina o estresse, 
                  permitindo que você se concentre em suas prioridades.
                </p>
              </div>

              <div className="bg-luxury-cream p-8 rounded-xl border-l-4 border-luxury-gold">
                <h3 className="text-2xl font-bold mb-4 text-luxury-navy">
                  "Corretores tradicionais são suficientes?"
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Oferecemos uma consultoria personalizada e exclusiva, focada em suas necessidades 
                  específicas e com a missão de defender somente os seus objetivos, algo que corretores 
                  tradicionais não conseguem proporcionar, sem um conflito de interesses. 
                  <span className="font-semibold text-luxury-navy">
                     Lembre-se que ele ganha no valor da venda. O que isso te diz?
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-luxury-cream p-8 rounded-xl border-l-4 border-luxury-gold">
                <h3 className="text-2xl font-bold mb-4 text-luxury-navy">
                  "Por que pagar se o Corretor não me cobra?"
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Garantimos que o valor investido em nosso serviço é recuperado através da economia 
                  de tempo, dinheiro e na garantia de uma compra acertada e segura. 
                  Se não for assim você não pagará nada. 
                  <span className="font-semibold text-luxury-gold">
                     Quanto maior o desconto mais ganhamos.
                  </span>
                </p>
              </div>

              <div className="bg-gradient-luxury p-8 rounded-xl text-white text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Agora você tem opção e a decisão é somente sua
                </h3>
                <div className="w-16 h-1 bg-luxury-gold mx-auto mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="depoimentos" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Ouça Quem Já <span className="text-luxury-gold">Protegeu Seu Patrimônio</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                O que diz quem já contratou?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[{
              quote: "Ele me convenceu ao me mostrar dados que provaram que o apartamento estava 15% acima do preço real de mercado. O Contratei e Economizei R$ 320 mil na negociação.",
              author: "Roberto Silva",
              role: "Empresário do Setor Financeiro",
              savings: "R$ 320.000"
            }, {
              quote: "Finalmente encontrei alguém que trabalha para mim, não para quem vende. O processo foi transparente do início ao fim.",
              author: "Ana Carolina",
              role: "Executiva de Multinacional",
              savings: "R$ 450.000"
            }].map((testimonial, index) => <Card key={index} className="border-0 shadow-luxury">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-luxury-gold text-luxury-gold" />)}
                    </div>
                    
                    <blockquote className="text-lg text-foreground mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                      <Badge variant="outline" className="border-luxury-gold text-luxury-gold">
                        Economizou {testimonial.savings}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </section>
    </div>;
};

export default LandingPage;