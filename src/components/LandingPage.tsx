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
              Personal Shopper Imobiliário Exclusivo na Barra da Tijuca
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Descubra O Segredo dos Compradores Inteligentes
              <span className="text-luxury-gold text-4xl md:text-5xl">
                Compre o Imóvel Que Você Quer e
              </span>
              <span className="text-white text-4xl md:text-5xl">
                Pelo Preço Justo</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-4xl mx-auto">
              O Personal Shopper Imobiliário representa apenas você na compra, defende somente os seus interesses e ele só ganha se você economizar.
            </p>
            
            <Button variant="gold" size="xl" className="mb-4">
              Desbloquear minha Consultoria Exclusiva
              <ArrowRight className="ml-2" />
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
              Por Que muitos Compradores Pagaram <span className="text-luxury-gold">Milhares de Reais</span> a Mais Sem Saber?
            </h2>
            
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-luxury">
              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                <strong>Verdades Inconvenientes</strong> Reflita sobre uma realidade que ninguém comenta no mercado imobiliário, mas que agora você tem opção.
              </p>
              
              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                A Imobiliária que te mostra o imóvel <strong>não trabalha para você</strong>. 
                Ela foi contratada pelo Vendedor para fazer a intermediação do negócio e <strong>vender pelo preço mais caro possível.</strong> Elas ganham mais dinheiro quando você paga mais caro. 
                Podem até dizer que estão lutando por você, mas o objetivo real é vender pelo maior preço possível. <strong>Simples Assim!</strong> É como você contratar o Advogado da outra parte para te defender e acreditar que ele vai ganhar a causa pra você. Será?
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
                Personal Shopper Imobiliário: <span className="text-luxury-gold">Representação 100% Sua</span>
              </h2>
              <p className="text-xl text-luxury-text-muted max-w-3xl mx-auto">
                Existe apenas uma maneira de ter a certeza que está fazendo a melhor negociação possível. Fuja da Intermediação e busque a Representação.
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
                Para Quem É
              </h2>
              <p className="text-xl text-muted-foreground">
                Criado especialmente para compradores exigentes de alto padrão, que buscam Segurança e Tranquilidade na sua compra.
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
              <span className="text-luxury-gold">Não cometa os mesmos erros de outros de outros compradores</span>
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
                  de tempo, dinheiro e na garantia de uma compra acertada e segura. Se não for assim 
                  você não pagará nada. 
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
                Veja Como Outros Compradores <span className="text-luxury-gold">Protegeram Seu Patrimônio</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Não confie apenas em nossas palavras. Veja o que quem já comprou diz:
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
                      <Badge variant="outline" className="border-luxury-gold text-luxury-gold bg-luxury-gold/5">
                        Economizou {testimonial.savings}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section id="sobre" className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-luxury-navy">
                O Momento da Virada <span className="text-luxury-gold">Descobri Um Novo Caminho</span> na Compra de Imóveis de Alto Padrão
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-luxury">
              <div className="prose prose-lg max-w-none text-luxury-navy">
                <p className="text-lg leading-relaxed mb-6">
                  Minha jornada começou com experiências pessoais e profissionais frustrantes. Senti na pele, tanto como comprador quanto como Corretor, as dores e ineficiências do processo tradicional de Compra e Venda de Imóveis de Alto Padrão.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Minha experiência no mercado imobiliário revelou uma realidade frustrante: limitações de estrutura e remuneração impediam o apoio ideal ao cliente. Percebi a sobrecarga de informações, a falta de transparência e a baixa prioridade aos interesses do comprador.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Com minha bagagem profissional em Telecomunicações e Internet, sabia que uma abordagem mais sofisticada era possível. Esse inconformismo me levou a estudar modelos internacionais, vislumbrando um mercado imobiliário brasileiro com transações mais justas e equilibradas para você.
                </p>
                
                <div className="bg-luxury-gold/10 border-l-4 border-luxury-gold p-6 my-8">
                  <p className="text-lg font-semibold text-luxury-navy italic">
                    Percebi que a realidade era de sobrecarga de informações, falta de transparência e a sensação de que os interesses do comprador nem sempre eram prioridade
                  </p>
                </div>
                
               <p className="text-lg leading-relaxed mb-6">
                  Foi assim que nasceu o conceito de Personal Shopper Imobiliário™ (Bússola Dourada) e a Godoy Prime Realty.
               </p>
                <div className="bg-luxury-navy text-white rounded-xl p-8 text-center">
                  <p className="text-2xl font-bold mb-2">Meu compromisso é ser o guardião exclusivo dos seus interesses e com lealdade total, buscar o equilibrio, transparência e segurança do Comprador.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="metodo" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-luxury-gold text-luxury-gold">
                Método Exclusivo
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Como Funciona o <span className="text-luxury-gold">Método Bússola Dourada™</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Nossa metodologia exclusiva em 5 passos para sua compra blindada
              </p>
            </div>

            <div className="space-y-12">
              {[{
              step: "01",
              icon: Search,
              title: "Mapeamento do Seu DNA",
              description: "Descobrimos exatamente o que você quer através de conversa profunda sobre seu estilo de vida. Definimos critérios precisos e eliminamos 90% das opções erradas antes mesmo de começar."
            }, {
              step: "02",
              icon: Target,
              title: "Curadoria Inteligente",
              description: "Vasculhamos o mercado completo, incluindo imóveis que nunca aparecem nos sites. Você recebe apenas 3 a 5 opções perfeitas para seu perfil, economizando dezenas de horas."
            }, {
              step: "03",
              icon: Calculator,
              title: "Análise de Valor Real",
              description: "Investigamos e definimos o preço justo usando dados de vendas reais da região, informações de transações de Cartórios, pesquisas e estudos de mercado com ferramentas de Inteligência Artificial e outras fontes. Você sabe exatamente quanto vale cada imóvel antes de fazer qualquer oferta."
            }, {
              step: "04",
              icon: Shield,
              title: "Negociação Blindada",
              description: "Atuamos como seu único representante. Negociamos com estratégia, usando estratégias baseadas no perfil do vendedor e dados para garantir as melhores condições, maximizando sua economia e blindando seu investimento."
            }, {
              step: "05",
              icon: CheckCircle,
              title: "Fechamento Protegido",
              description: "Coordenamos toda documentação e validação técnica. Você recebe as chaves com total segurança jurídica e tranquilidade. Cada etapa e todos os nossos compromissos, incluindo ética, fidelidade e defesa de seus interesses, são formalmente assegurados em contrato assinado."
            }].map((step, index) => <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-gold rounded-full w-24 h-24 flex items-center justify-center">
                      <step.icon className="h-12 w-12 text-luxury-navy" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="outline" className="border-luxury-gold text-luxury-gold bg-luxury-gold/5">
                        Passo {step.step}
                      </Badge>
                      <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-luxury-navy text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-luxury-gold text-luxury-gold">
                Últimas 2 Vagas Disponíveis
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Sua Jornada Imobiliária de <span className="text-luxury-gold">Alto Padrão</span>
              </h2>
              <p className="text-xl text-white/80">
                Escolha o nível de blindagem e suporte que sua conquista imobiliária merece. Serviços indicados apenas para imóveis à partir de R$ 1.000.000,00 na região da Barra da Tijuca.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[{
              name: "Parecer Godoy Prime",
              subtitle: "Atestado de Valor",
              price: "À partir de R$ 5.000",
              description: "Para quem já tem um imóvel em vista e precisa de validação independente sobre seu valor, potencial e histórico de vendas. Transforme incerteza em convicção. Sua decisão será segura e inteligente, para um investimento sólido e sem surpresas.",
              features: ["Consulta de alinhamento estratégico", "Inspeção e Vistoria Técnica local detalhada", "Relatório comparativo com análise de mercado e parecer de preço justo (m² e preço máximo recomendado).", "Pack de Conhecimento exclusivo"],
              cta: "Quero Meu Parecer",
              popular: false
            }, {
              name: "Compra Blindada",
              subtitle: "Validação & Negociação",
              price: "Fee de Preparação e Análise + Comissão no Sucesso",
              description: "Assessoria completa para validar valor, negociar e garantir segurança jurídica. Evite deixar dinheiro na mesa e arriscar seu investimento.",
              features: ["Relatório de Avaliação e Vistoria Detalhada do Imóvel", "Negociação Ativa Profissional", "Análise Contratual e Segurança documental completa", "Coordenação e acompanhamento de todas as etapas do processo até entrega das chaves"],
              cta: "Quero Blindar Minha Compra",
              popular: true
            }, {
              name: "Personal Shopper Completo",
              subtitle: "Busca & Aquisição Total",
              price: "Fee de Preparação e Análise + Comissão no Sucesso",
              description: "Serviço completo de Personal Shopper Imobiliário. Desde a busca até as chaves na mão. Para quem quer o máximo de comodidade, economia e segurança.",
              features: ["Mapeamento completo do seu perfil e necessidades", "Curadoria exclusiva de imóveis (incluindo off-market)", "Análise completa de valor e potencial", "Negociação profissional e fechamento seguro", "Acompanhamento até entrega das chaves"],
              cta: "Quero o Serviço Completo",
              popular: false
            }].map((plan, index) => <Card key={index} className={cn(
                "relative border-0 shadow-luxury transition-all duration-300 hover:-translate-y-2",
                plan.popular ? "bg-gradient-gold text-luxury-navy" : "bg-white/5 text-white"
              )}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-luxury-navy text-luxury-gold border-luxury-gold">
                      Mais Escolhido
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className={cn(
                      "text-sm mb-4",
                      plan.popular ? "text-luxury-navy/70" : "text-white/70"
                    )}>
                      {plan.subtitle}
                    </p>
                    <div className="text-3xl font-bold mb-4">{plan.price}</div>
                    <p className={cn(
                      "text-sm leading-relaxed",
                      plan.popular ? "text-luxury-navy/80" : "text-white/80"
                    )}>
                      {plan.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className={cn(
                          "h-5 w-5 mt-0.5 flex-shrink-0",
                          plan.popular ? "text-luxury-navy" : "text-luxury-gold"
                        )} />
                        <span className={cn(
                          "text-sm",
                          plan.popular ? "text-luxury-navy" : "text-white"
                        )}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant={plan.popular ? "default" : "outline"} 
                    className={cn(
                      "w-full",
                      plan.popular 
                        ? "bg-luxury-navy text-luxury-gold hover:bg-luxury-navy/90" 
                        : "border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-navy"
                    )}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>)}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section id="garantias" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Suas <span className="text-luxury-gold">Garantias Blindadas</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Assumimos todos os riscos para que você tenha total tranquilidade
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[{
              icon: Shield,
              title: "Garantia de Economia ou Dinheiro de Volta",
              description: "Se não conseguirmos uma economia significativa na sua compra, você não paga nossos honorários. Simples assim."
            }, {
              icon: Clock,
              title: "Garantia de Prazo",
              description: "Cumprimos os prazos acordados ou você recebe compensação. Seu tempo é valioso e respeitamos isso."
            }, {
              icon: CheckCircle,
              title: "Garantia de Satisfação Total",
              description: "Se não ficar 100% satisfeito com nosso serviço, devolvemos seu investimento integral."
            }, {
              icon: Award,
              title: "Garantia de Exclusividade",
              description: "Trabalhamos exclusivamente para você, sem conflitos de interesse. Sua representação é nossa única prioridade."
            }].map((guarantee, index) => <Card key={index} className="border-0 shadow-luxury hover:shadow-gold transition-all duration-300">
                <CardContent className="p-8">
                  <div className="bg-gradient-gold rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <guarantee.icon className="h-8 w-8 text-luxury-navy" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{guarantee.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{guarantee.description}</p>
                </CardContent>
              </Card>)}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-luxury-navy">
                Perguntas <span className="text-luxury-gold">Frequentes</span>
              </h2>
              <p className="text-xl text-luxury-text-muted">
                Esclarecemos suas principais dúvidas sobre nosso serviço
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {[{
              question: "Como funciona a remuneração do Personal Shopper?",
              answer: "Trabalhamos com um modelo transparente: uma taxa de preparação e análise inicial, mais uma comissão de sucesso baseada na economia obtida. Quanto mais você economiza, mais ganhamos. Nossos interesses estão 100% alinhados com os seus."
            }, {
              question: "Qual a diferença entre vocês e um corretor tradicional?",
              answer: "Corretores tradicionais trabalham para o vendedor e ganham mais quando você paga mais caro. Nós trabalhamos exclusivamente para você e ganhamos mais quando você economiza. Temos acesso a dados que corretores não têm e nossa única missão é defender seus interesses."
            }, {
              question: "Vocês trabalham apenas na Barra da Tijuca?",
              answer: "Sim, somos especialistas exclusivos da região da Barra da Tijuca. Essa especialização nos permite ter conhecimento profundo do mercado local, acesso a oportunidades exclusivas e relacionamentos estratégicos que beneficiam nossos clientes."
            }, {
              question: "Qual o valor mínimo de imóvel para usar o serviço?",
              answer: "Trabalhamos com imóveis a partir de R$ 1.000.000,00. Essa faixa de valor permite que nossa expertise gere economia significativa que justifica o investimento no serviço."
            }, {
              question: "Como garantem que vou economizar dinheiro?",
              answer: "Temos acesso a dados de vendas reais, conhecimento profundo do mercado local e estratégias de negociação especializadas. Se não conseguirmos uma economia significativa, você não paga nossos honorários de sucesso."
            }, {
              question: "Quanto tempo leva o processo completo?",
              answer: "Depende do serviço escolhido. Um Parecer Godoy Prime leva de 7 a 15 dias. Uma Compra Blindada pode levar de 30 a 60 dias. O Personal Shopper Completo varia conforme a complexidade da busca, mas geralmente entre 60 a 120 dias."
            }].map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-xl border-0 shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-luxury-navy hover:text-luxury-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-luxury-text-muted leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contato" className="py-20 bg-luxury-navy text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-luxury-gold text-luxury-gold">
              Últimas 2 Vagas Disponíveis Este Mês
            </Badge>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Pronto Para Fazer a <span className="text-luxury-gold">Compra Mais Inteligente</span> da Sua Vida?
            </h2>
            
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Não deixe que outros compradores continuem levando vantagem enquanto você paga mais caro. 
              Agende sua consultoria estratégica gratuita e descubra quanto você pode economizar.
            </p>
            
            <div className="space-y-4 mb-8">
              <Button variant="gold" size="xl" className="w-full md:w-auto">
                Agendar Minha Consultoria Gratuita
                <ArrowRight className="ml-2" />
              </Button>
              
              <p className="text-sm text-white/70">
                Consultoria de 30 minutos • Sem compromisso • Totalmente gratuita
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <Phone className="h-8 w-8 text-luxury-gold mx-auto mb-3" />
                <p className="font-semibold mb-1">Telefone</p>
                <p className="text-white/80">(21) 4040-0067</p>
              </div>
              
              <div className="text-center">
                <MessageCircle className="h-8 w-8 text-luxury-gold mx-auto mb-3" />
                <p className="font-semibold mb-1">WhatsApp</p>
                <p className="text-white/80">(21) 99725-0515</p>
              </div>
              
              <div className="text-center">
                <MapPin className="h-8 w-8 text-luxury-gold mx-auto mb-3" />
                <p className="font-semibold mb-1">Localização</p>
                <p className="text-white/80">Barra da Tijuca, RJ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <img 
                  src="/Logotipo Principal.png" 
                  alt="Godoy Prime Realty" 
                  className="h-12 w-auto mb-4"
                />
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Personal Shopper Imobiliário exclusivo da Barra da Tijuca. 
                  Representação 100% do comprador para imóveis de alto padrão.
                </p>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>(21) 4040-0067</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>(21) 99725-0515</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Serviços</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Parecer Godoy Prime</li>
                  <li>Compra Blindada</li>
                  <li>Personal Shopper Completo</li>
                  <li>Consultoria Estratégica</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Links Úteis</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#sobre" className="hover:text-luxury-gold transition-colors">Sobre Marcus</a></li>
                  <li><a href="#metodo" className="hover:text-luxury-gold transition-colors">Método</a></li>
                  <li><a href="#garantias" className="hover:text-luxury-gold transition-colors">Garantias</a></li>
                  <li><a href="#faq" className="hover:text-luxury-gold transition-colors">FAQ</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Godoy Prime Realty. Todos os direitos reservados.</p>
              <p className="mt-2">Personal Shopper Imobiliário™ é marca registrada da Godoy Prime Realty.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};

export default LandingPage;