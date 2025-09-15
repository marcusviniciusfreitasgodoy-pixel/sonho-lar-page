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
              <span className="text-luxury-gold text-4xl md:text-5xl"> Compre o Imóvel Que Você Quer e Pelo Preço Justo</span>
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
              Por Que Você Paga <span className="text-luxury-gold">Milhares de Reais</span> a Mais Sem Saber?
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
                  Foi assim que nasceu o conceito de Personal Shopper Imobiliário™ (Bússola Dourada) e a
                  Godoy Prime Realty, focada exclusivamente na representação de compradores de imóveis de alto padrão na Barra da Tijuca.
                </p>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
                Como Funciona o <span className="text-luxury-gold">Método Bússola Dourada</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Um processo estruturado e transparente, criado para maximizar suas chances de sucesso e minimizar riscos.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Análise Estratégica",
                  description: "Mapeamento completo das suas necessidades, objetivos e perfil de investimento para criar uma estratégia personalizada."
                },
                {
                  step: "02", 
                  title: "Inteligência de Mercado",
                  description: "Acesso exclusivo a dados de transações fechadas, análise de precificação e identificação das melhores oportunidades."
                },
                {
                  step: "03",
                  title: "Execução e Negociação",
                  description: "Representação exclusiva na negociação, garantindo o melhor preço e as melhores condições para você."
                }
              ].map((step, index) => (
                <Card key={index} className="border-0 shadow-luxury hover:shadow-gold transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-luxury-navy">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section id="garantias" className="py-20 bg-luxury-navy text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Suas <span className="text-luxury-gold">Garantias Blindadas</span>
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Investir em você mesmo nunca teve tanto respaldo. Suas garantias são nossa prioridade.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Garantia de Economia",
                  description: "Se você não economizar pelo menos o valor investido em nossos honorários, você não paga nada. Simples assim.",
                  icon: "💰"
                },
                {
                  title: "Garantia de Satisfação",
                  description: "Se não ficar 100% satisfeito com nosso trabalho, devolvemos seu investimento integral.",
                  icon: "⭐"
                },
                {
                  title: "Garantia de Transparência",
                  description: "Acesso total a todos os dados, análises e processos. Nada de caixa preta.",
                  icon: "🔍"
                },
                {
                  title: "Garantia de Exclusividade",
                  description: "Trabalhamos exclusivamente para você. Sem conflitos de interesse, sem exceções.",
                  icon: "🎯"
                }
              ].map((guarantee, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-4">{guarantee.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-luxury-gold">{guarantee.title}</h3>
                    <p className="text-white/90 leading-relaxed">{guarantee.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objections Section */}
      <section id="objections" className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-luxury-navy">
                Não Cometa os <span className="text-red-600">Mesmos Erros</span> Que os Outros Compradores
              </h2>
              <p className="text-xl text-luxury-text-muted max-w-4xl mx-auto">
                Tentar encontrar o seu imóvel perfeito da maneira tradicional e antiga, frequentemente, resulta em perda de tempo, dinheiro e frustração.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  objection: "\"Não preciso desse serviço, eu posso fazer isso sozinho.\"",
                  response: "Sim, é claro que pode, mas por que fazer se tem outra opção melhor, com menos risco, mais segura e mais barata? Nosso serviço economiza seu tempo e elimina o estresse, permitindo que você se concentre em suas prioridades."
                },
                {
                  objection: "\"Corretores tradicionais são suficientes?\"", 
                  response: "Oferecemos uma consultoria personalizada e exclusiva, focada em suas necessidades específicas e com a missão de defender somente os seus objetivos, algo que corretores tradicionais não conseguem proporcionar, sem um conflito de interesses. Lembre-se que ele ganha no valor da venda. O que isso te diz?"
                }
              ].map((item, index) => (
                <Card key={index} className="border-0 shadow-luxury hover:shadow-gold transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                        <X className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="text-lg font-bold text-red-600">{item.objection}</h3>
                    </div>
                    <p className="text-luxury-navy leading-relaxed pl-14">{item.response}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Special objection - full width */}
            <Card className="border-0 shadow-luxury mb-12">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-red-600">
                    "Por que pagar se o Corretor não me cobra?"
                  </h3>
                </div>
                <p className="text-luxury-navy leading-relaxed pl-14 mb-6">
                  Garantimos que o valor investido em nosso serviço é recuperado através da economia de tempo, dinheiro e na garantia de uma compra acertada e segura. Se não for assim você não pagará nada. Quanto maior o desconto mais ganhamos.
                </p>
              </CardContent>
            </Card>

            {/* Final CTA */}
            <div className="text-center">
              <div className="bg-gradient-gold rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-luxury-navy mb-4">
                  Agora Você Tem Opção
                </h3>
                <p className="text-luxury-navy text-lg">
                  A decisão é somente sua
                </p>
              </div>
              <Button 
                variant="gold" 
                size="xl"
                onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
              >
                Agendar Consulta Gratuita
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Perguntas <span className="text-luxury-gold">Frequentes</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Esclarecemos as principais dúvidas sobre nosso serviço
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Como funciona a cobrança do Personal Shopper Imobiliário?",
                  answer: "Cobramos apenas uma taxa de sucesso baseada na economia que conseguimos para você. Se não economizarmos pelo menos o valor dos nossos honorários, você não paga nada. É um investimento sem risco com retorno garantido."
                },
                {
                  question: "Qual é a diferença entre vocês e um corretor tradicional?",
                  answer: "Corretores tradicionais trabalham para o vendedor e ganham mais quando você paga mais caro. Nós trabalhamos exclusivamente para você e só ganhamos quando você economiza. É representação vs intermediação."
                },
                {
                  question: "Quanto tempo leva o processo de busca?",
                  answer: "Isso varia conforme seus critérios e o mercado, mas nossa inteligência de dados acelera significativamente o processo. Em média, nossos clientes encontram o imóvel ideal em 30-60 dias, comparado aos 6+ meses do processo tradicional."
                },
                {
                  question: "Vocês trabalham apenas na Barra da Tijuca?",
                  answer: "Sim, nossa especialização é focada na Barra da Tijuca e adjacências. Essa especialização nos permite conhecer profundamente cada micro-mercado, histórico de preços e oportunidades exclusivas da região."
                },
                {
                  question: "Quais garantias vocês oferecem?",
                  answer: "Oferecemos garantia de economia (se não economizar, não paga), garantia de satisfação (100% do dinheiro de volta se não ficar satisfeito) e garantia de transparência total no processo."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:text-luxury-gold">
                    <span className="flex items-start space-x-3">
                      <span className="bg-luxury-gold text-luxury-navy rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base sm:text-lg text-muted-foreground pl-8 sm:pl-12 pr-4 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="final-cta" className="py-20 bg-luxury-navy text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Pronto Para Descobrir o <span className="text-luxury-gold">Preço Real</span> do Seu Próximo Imóvel?
            </h2>
            
            <p className="text-xl mb-8 text-white/90">
              Agende uma conversa sem compromisso e descubra como economizar centenas de milhares de reais na sua próxima compra.
            </p>
            
            <Button 
              variant="gold" 
              size="xl" 
              className="mb-6"
              onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
            >
              Começar Agora - É Grátis
              <ArrowRight className="ml-2" />
            </Button>
            
            <p className="text-sm text-white/70">
              📞 Ligação de 30 minutos • 🔒 Sem compromisso • ✅ Análise gratuita do seu perfil
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left">
              <div>
                <img 
                  src="/Logotipo Principal.png" 
                  alt="Godoy Prime Realty" 
                  className="h-12 w-auto mx-auto sm:mx-0 mb-4"
                />
                <p className="text-sm text-muted-foreground">
                  Personal Shopper Imobiliário Exclusivo na Barra da Tijuca
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Contato</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>(21) 4040-0067</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>(21) 99725-0515</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>contato@godoyprimerealty.com</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Localização</h4>
                <div className="flex items-start justify-center sm:justify-start space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Barra da Tijuca<br />Rio de Janeiro, RJ</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 sm:mt-12 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Godoy Prime Realty. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </section>
    </div>;
};

export default LandingPage;