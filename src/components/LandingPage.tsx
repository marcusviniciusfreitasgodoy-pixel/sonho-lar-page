import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Shield, Clock, Key, CheckCircle, Calculator, Search, Target, Users, TrendingUp, Award, Star, ArrowRight, Phone, Mail, Menu, X, MapPin, MessageCircle } from "lucide-react";
import heroImage from "@/assets/barra-beach-luxury.jpg";
import marcusProfile from "@/assets/721A9271.jpg";

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
    script.innerHTML = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJLYXR5YV9Qcm9mZXNzaW9uYWxMb29rMl9w%0D%0AdWJsaWMiLCJwcmV2aWV3SW1nIjoiaHR0cHM6Ly9maWxlczIuaGV5Z2VuLmFpL2F2YXRhci92My9k%0D%0ANTJmZmExYjQ0N2Q0ZjJmOGViMTY5MTdlN2VjMjIyYV81NTg3MC9wcmV2aWV3X3RhbGtfMS53ZWJw%0D%0AIiwibmVlZFJlbW92ZUJhY2tncm91bmQiOnRydWUsImtub3dsZWRnZUJhc2VJZCI6ImYxZWQzMGYy%0D%0AZGQ4ZjRkYzI5YzdkMzUwYzg0NWU1NTMwIiwidXNlcm5hbWUiOiI0YmIzYTU4ZTM5ZjQ0ODkxYjc4%0D%0AMjViN2MzMmVkYTA3MSJ9&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`\\n  #heygen-streaming-embed {\\n    z-index: 9999;\\n    position: fixed;\\n    left: 40px;\\n    bottom: 40px;\\n    width: 200px;\\n    height: 200px;\\n    border-radius: 50%;\\n    border: 2px solid #fff;\\n    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);\\n    transition: all linear 0.1s;\\n    overflow: hidden;\\n\\n    opacity: 0;\\n    visibility: hidden;\\n  }\\n  #heygen-streaming-embed.show {\\n    opacity: 1;\\n    visibility: visible;\\n  }\\n  #heygen-streaming-embed.expand {\\n    \${clientWidth<540?"height: 266px; width: 96%; left: 50%; transform: translateX(-50%);":"height: 366px; width: calc(366px * 16 / 9);"}\\n    border: 0;\\n    border-radius: 8px;\\n  }\\n  #heygen-streaming-container {\\n    width: 100%;\\n    height: 100%;\\n  }\\n  #heygen-streaming-container iframe {\\n    width: 100%;\\n    height: 100%;\\n    border: 0;\\n  }\\n  \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.body.appendChild(wrapDiv)}(globalThis);`;
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
              className="mb-4 h-10 px-6 text-sm font-semibold md:h-14 md:px-10 md:text-lg shadow-gold transition-all duration-300 hover:scale-105"
            >
              Desbloquear minha Consultoria Exclusiva
              <ArrowRight className="ml-2 h-4 w-4" />
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
                Você sabe o que o Corretor faz quando ele não tem o imóvel que você quer?
              </p>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                <strong>Verdades Inconvenientes que ninguém te fala</strong> 
              </p>
              
              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                A Imobiliária que te mostra o imóvel <strong>não trabalha para você</strong>. 
                Ela foi contratada pelo Vendedor para fazer a intermediação do negócio e <strong>vender pelo preço mais caro possível.
                  
                </strong> Elas ganham mais dinheiro quando você paga mais caro.<strong> Simples Assim!</strong>     
                
              </p>

              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                Na Barra da Tijuca, onde apartamentos custam entre <strong>R$ 2 a 8 milhões</strong>, essa diferença pode representar uma economia de <strong>R$ 200 mil a R$ 500 mil</strong> para você. É exatamente por isso que criei o serviço de Personal Shopper Imobiliário.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  Você sabe o que o Corretor faz quando ele não tem o imóvel que você quer?
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  A Imobiliária que te mostra o imóvel não trabalha para você. Ela foi contratada pelo Vendedor para fazer a intermediação do negócio e vender pelo preço mais caro possível.
                </p>
              </div>
              
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
                  Ter alguém que trabalhe exclusivamente para você. Que ganhe apenas quando você economizar dinheiro, não quando gastar mais. Para isso o Marcus Godoy criou o primeiro serviço de Personal Shopper Imobiliário real do Brasil.
                </p>
                
                <div className="space-y-4 mb-8">
                  {["Tenha acesso aos dados reais de vendas que nunca aparecem nos portais", "Conheça os segredos do mercado local", "Representação Exclusiva do Comprador, Sem Conflito de Interesses"].map((item, index) => <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <p className="text-luxury-navy">{item}</p>
                    </div>)}
                </div>
                
                <div className="bg-white/60 rounded-xl p-6 border border-luxury-gold/30">
                  <p className="text-lg font-semibold text-luxury-navy italic">
                    "Saber exatamente quanto vale o imóvel que você quer antes mesmo de fazer a oferta. Ter acesso a propriedades exclusivas que só circulam entre especialistas. Saber a valorização real daquela região antes de investir. É como jogar pôquer vendo as cartas dos outros jogadores."
                  </p>
                </div>
              </div>
              
              <div className="animate-float">
                <img 
                  src={marcusProfile} 
                  alt="Marcus Godoy - Personal Shopper Imobiliário" 
                  className="w-full max-w-md mx-auto rounded-2xl shadow-luxury"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
              Como Funciona o <span className="text-luxury-gold">Personal Shopper Imobiliário</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Um processo estruturado para garantir que você faça a melhor negociação possível
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Search,
                title: "Análise de Mercado",
                description: "Levantamento completo de dados de vendas, análise de preços praticados e tendências da região."
              },
              {
                icon: Target,
                title: "Busca Estratégica", 
                description: "Acesso exclusivo a imóveis off-market e oportunidades que não chegam aos portais tradicionais."
              },
              {
                icon: Calculator,
                title: "Negociação Inteligente",
                description: "Representação 100% sua com estratégias baseadas em dados reais de mercado."
              }
            ].map((service, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-luxury transition-all duration-300 hover:scale-105 border-luxury-gold/20">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <service.icon className="h-8 w-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Marcus Section */}
      <section id="sobre" className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-luxury-navy">
                  Sobre <span className="text-luxury-gold">Marcus Godoy</span>
                </h2>
                
                <div className="space-y-6 text-lg text-luxury-navy">
                  <p>
                    Especialista em mercado imobiliário da Barra da Tijuca com mais de 15 anos de experiência. 
                    Marcus desenvolveu uma metodologia única para representar exclusivamente compradores de imóveis de alto padrão.
                  </p>
                  
                  <p>
                    Criador do primeiro serviço de Personal Shopper Imobiliário do Brasil, com foco em transparência total 
                    e representação sem conflito de interesses.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 py-6">
                    {[
                      { number: "500+", label: "Imóveis Analisados" },
                      { number: "R$ 50M+", label: "Em Negociações" },
                      { number: "15+", label: "Anos de Experiência" },
                      { number: "98%", label: "Satisfação dos Clientes" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-luxury-gold">{stat.number}</div>
                        <div className="text-sm text-luxury-text-muted">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="animate-float">
                <img 
                  src={marcusProfile} 
                  alt="Marcus Godoy - Personal Shopper Imobiliário" 
                  className="w-full max-w-md mx-auto rounded-2xl shadow-luxury"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="metodo" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
              O Método <span className="text-luxury-gold">Godoy Prime</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Uma abordagem científica e sistemática para compra de imóveis de alto padrão
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Análise de Perfil e Necessidades",
                  description: "Entendimento profundo dos seus objetivos, orçamento e critérios específicos para o imóvel ideal."
                },
                {
                  step: "02", 
                  title: "Inteligência de Mercado",
                  description: "Coleta e análise de dados exclusivos de transações, precificação e tendências da Barra da Tijuca."
                },
                {
                  step: "03",
                  title: "Busca Estratégica",
                  description: "Acesso a oportunidades off-market e prospecção ativa junto a investidores e proprietários."
                },
                {
                  step: "04",
                  title: "Due Diligence Completa",
                  description: "Análise jurídica, técnica e de valorização para garantir segurança total na aquisição."
                },
                {
                  step: "05",
                  title: "Negociação Baseada em Dados",
                  description: "Estratégias de negociação fundamentadas em informações reais de mercado para maximizar sua economia."
                }
              ].map((item, index) => (
                <Card key={index} className="p-8 border-luxury-gold/20 hover:shadow-luxury transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-luxury-navy">{item.step}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground text-lg">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section id="garantias" className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-luxury-navy">
              Nossas <span className="text-luxury-gold">Garantias</span>
            </h2>
            <p className="text-xl text-luxury-text-muted max-w-3xl mx-auto">
              Compromissos que assumimos com cada cliente para garantir resultados excepcionais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Representação Exclusiva",
                description: "100% dedicado aos seus interesses, sem conflitos com vendedores ou construtoras."
              },
              {
                icon: Clock,
                title: "Transparência Total",
                description: "Acesso completo a todos os dados, análises e estratégias utilizadas no processo."
              },
              {
                icon: Key,
                title: "Economia Garantida",
                description: "Se não economizar pelo menos o valor investido na consultoria, devolvemos 100% do valor pago."
              },
              {
                icon: Users,
                title: "Suporte Especializado",
                description: "Acompanhamento completo desde a busca até a escrituração do imóvel."
              },
              {
                icon: TrendingUp,
                title: "Análise de Valorização",
                description: "Estudo detalhado do potencial de valorização a médio e longo prazo."
              },
              {
                icon: Award,
                title: "Satisfação Garantida",
                description: "Compromisso com a excelência e satisfação total do cliente em cada etapa."
              }
            ].map((guarantee, index) => (
              <Card 
                key={index} 
                className={cn(
                  "text-center p-8 hover:shadow-luxury transition-all duration-300 cursor-pointer border-2",
                  highlightedCards.includes(index) 
                    ? "border-luxury-gold bg-white scale-105" 
                    : "border-luxury-gold/20 hover:border-luxury-gold/40"
                )}
                onClick={() => toggleCardHighlight(index)}
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <guarantee.icon className="h-8 w-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-luxury-navy">{guarantee.title}</h3>
                  <p className="text-luxury-text-muted">{guarantee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
              Perguntas <span className="text-luxury-gold">Frequentes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Esclarecemos as principais dúvidas sobre o serviço de Personal Shopper Imobiliário
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Como funciona o pagamento do Personal Shopper Imobiliário?",
                  answer: "O pagamento é feito apenas quando você economizar dinheiro na negociação. Nossa remuneração representa uma porcentagem da economia gerada, garantindo total alinhamento de interesses."
                },
                {
                  question: "Qual é a diferença entre Personal Shopper e Corretor tradicional?",
                  answer: "O corretor tradicional trabalha para o vendedor e ganha mais quando você paga mais caro. O Personal Shopper trabalha exclusivamente para você e só ganha quando você economiza dinheiro."
                },
                {
                  question: "Vocês têm acesso a imóveis que não estão nos portais?",
                  answer: "Sim, através da nossa rede de relacionamentos temos acesso a oportunidades off-market, imóveis em pré-lançamento e negociações diretas com investidores."
                },
                {
                  question: "Quanto posso economizar utilizando este serviço?",
                  answer: "Na Barra da Tijuca, nossos clientes economizam em média entre R$ 200 mil e R$ 500 mil em imóveis de alto padrão, através de negociações mais eficientes e acesso a melhores oportunidades."
                },
                {
                  question: "O serviço é adequado para qualquer faixa de preço?",
                  answer: "Nosso foco são imóveis de alto padrão na Barra da Tijuca, geralmente acima de R$ 2 milhões, onde nossa experiência e network proporcionam maior valor agregado."
                },
                {
                  question: "Quanto tempo demora o processo de busca?",
                  answer: "O tempo varia conforme a especificidade dos critérios, mas geralmente apresentamos as primeiras oportunidades em 15 dias e fechamos negociações em 60-90 dias."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-luxury-gold/20 rounded-lg px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-luxury-gold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-4 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-luxury-navy text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Pronto Para <span className="text-luxury-gold">Economizar Centenas de Milhares</span>?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Agende uma consultoria exclusiva e descubra como comprar o imóvel dos seus sonhos pelo preço justo
            </p>
            
            <Button 
              variant="gold" 
              className="h-10 px-6 text-sm font-semibold md:h-14 md:px-10 md:text-lg shadow-gold transition-all duration-300 hover:scale-105 mb-8"
            >
              Garantir Minha Vaga Agora
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/10 border-luxury-gold/30 text-center p-6">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-luxury-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Telefone</h3>
                <p className="text-white/80">(21) 4040-0067</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-luxury-gold/30 text-center p-6">
              <CardContent className="pt-6">
                <MessageCircle className="h-8 w-8 text-luxury-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-white/80">(21) 99725-0515</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-luxury-gold/30 text-center p-6">
              <CardContent className="pt-6">
                <MapPin className="h-8 w-8 text-luxury-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Localização</h3>
                <p className="text-white/80">Barra da Tijuca, RJ</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-luxury-navy-light text-white/60 text-center">
        <div className="container mx-auto px-6">
          <p>&copy; 2024 Marcus Godoy - Personal Shopper Imobiliário. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;