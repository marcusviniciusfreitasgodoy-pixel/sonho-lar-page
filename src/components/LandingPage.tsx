import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
              <span className="text-luxury-gold"> Compre o Imóvel Que Você Quer e Pelo Preço Justo</span>
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

            <div className="grid md:grid-cols-3 gap-8">
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
              popular: false
            }, {
              name: "Método Bússola Dourada™",
              subtitle: "Experiência Completa",
              price: "Retainer Fee PROMOCIONALMENTE ISENTA + Comissão no Sucesso",
              description: "Para clientes que buscam uma experiência de compra fluida, estratégica e totalmente segura. Você delega toda a complexidade a um especialista com lealdade inquestionável. Ideal para quem valoriza tempo, discrição e excelência.",
              features: ["Metodologia completa em 5 fases", "Acesso completo ao mercado off-market", "Concierge até entrega das chaves", "Garantia de economia mínima R$ 100k", "Suporte pós-compra por 12 meses"],
              cta: "Sim! Quero a Bússola Dourada",
              popular: true
            }].map((plan, index) => <Card key={index} className={cn("relative border-0", plan.popular ? 'bg-white shadow-gold scale-105' : 'bg-white/5 border-white/10')}>
                  {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-luxury-gold text-luxury-navy font-bold px-6 py-1">
                        MAIS POPULAR
                      </Badge>
                    </div>}
                  
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className={cn("text-2xl font-bold mb-2", plan.popular ? 'text-luxury-navy' : 'text-white')}>
                        {plan.name}
                      </h3>
                      <p className={cn("text-sm mb-4", plan.popular ? 'text-luxury-text-muted' : 'text-white/70')}>
                        {plan.subtitle}
                      </p>
                      <div className={cn("text-3xl font-bold mb-2", plan.popular ? 'text-luxury-gold' : 'text-luxury-gold')}>
                        {plan.price}
                      </div>
                      <p className={cn("text-sm", plan.popular ? 'text-luxury-text-muted' : 'text-white/70')}>
                        {plan.description}
                      </p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className={cn("h-5 w-5 mt-0.5 flex-shrink-0", plan.popular ? 'text-luxury-gold' : 'text-luxury-gold')} />
                          <span className={cn("text-sm", plan.popular ? 'text-luxury-navy' : 'text-white/90')}>{feature}</span>
                        </li>)}
                    </ul>
                    
                    <Button variant={plan.popular ? "luxury" : "luxury-outline"} className="w-full" size="lg">
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section id="garantias" className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-luxury">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-luxury-navy">
                Sua Compra de Imóvel na Barra da Tijuca: Confiança Contratada, Economia Garantida.
              </h2>
              
              <p className="text-xl text-luxury-gold font-semibold mb-6">
                Nosso Compromisso na contratação do Método Bússola Dourada: Você Só Paga se Houver Economia Real.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-luxury-navy text-left">
                Nossa Garantia de Confiança é Inabalável:
              </h3>
              
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-luxury-navy">Zero Custo Inicial:</strong>
                    <span className="text-luxury-navy"> Você não investe absolutamente nada para iniciar nossa parceria. Meu compromisso é total e sem amarras financeiras prévias.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-luxury-navy">Foco Exclusivo no SEU Interesse:</strong>
                    <span className="text-luxury-navy"> Com o Método Bússola Dourada™, realizo uma curadoria personalizada e acesso oportunidades exclusivas, incluindo imóveis off-market. Minha lealdade é única com você, o comprador.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-luxury-navy">Remuneração por Performance:</strong>
                    <span className="text-luxury-navy"> Minha comissão é 100% atrelada ao seu sucesso e à economia real e significativa que eu gerar. Você só me remunera sobre o valor que eu conseguir economizar. Se não houver economia, você não me paga nada!</span>
                  </div>
                </li>
              </ul>
              
              <h3 className="text-2xl font-bold mb-4 text-luxury-navy text-left">
                Esta é a Sua Prova de Valor e Alinhamento Total:
              </h3>
              
              <p className="text-lg text-luxury-navy mb-8 leading-relaxed text-left">
                Sua decisão é respaldada por uma Garantia robusta, formalizada em contrato. Todos os nossos compromissos de ética, fidelidade e defesa intransigente de seus interesses estão assegurados neste documento.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-luxury-navy text-left">
               Por que esta Garantia é para você?
              </h3>
              
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-luxury-navy">Paz de Espírito:</strong>
                    <span className="text-luxury-navy"> Elimine a insegurança e o desgaste de buscar um imóvel de Alto Padrão sozinho.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-luxury-navy">Interesses Alinhados:</strong>
                    <span className="text-luxury-navy"> Meu sucesso é o seu sucesso. Meu objetivo é que o valor economizado seja significativamente maior do que minha remuneração, proporcionando um ganho líquido substancial para você..</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-luxury-navy">Processo Excepcional:</strong>
                    <span className="text-luxury-navy"> Sua jornada será guiada com excelência, discrição e eficiência, do início ao fim.</span>
                  </div>
                </li>
              </ul>
              
              <p className="text-lg text-luxury-navy mb-8 leading-relaxed text-left">
                Pronto para uma aquisição imobiliária estratégica e sem preocupações? Agende agora sua consultoria inicial gratuita e vamos descobrir se faz sentido pra você e também pra mim iniciarmos essa parceria.
              </p>
              
              <p className="text-sm text-luxury-text-muted mb-8 leading-relaxed text-left italic">
                Os detalhes completos e as condições da nossa garantia, estão descritos em nosso Contrato de Personal Shopper Imobiliário, que será apresentado e discutido com você antes de qualquer compromisso formal.
              </p>
              
              <Button variant="gold" size="xl">
                Garantir Minha Vaga Agora
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
              <Badge variant="outline" className="mb-4 border-luxury-gold text-luxury-gold">
                Perguntas Frequentes
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                O Caminho para a Certeza: <span className="text-luxury-gold">Respostas Diretas</span> para Suas Incertezas
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "O que é um Personal Shopper Imobiliário e como a Godoy Prime Realty atua?",
                  answer: "Um Personal Shopper Imobiliário é um profissional especializado que atua exclusivamente em nome do comprador, defendendo seus interesses em todas as etapas da aquisição de um imóvel. Diferente do modelo tradicional, onde o corretor representa o vendedor, a Godoy Prime Realty, liderada por Marcus Godoy, oferece uma consultoria imobiliária boutique focada 100% no cliente comprador. Nosso objetivo é encontrar o imóvel perfeito que reflita seu sucesso e estilo de vida, garantindo a melhor negociação possível."
                },
                {
                  question: "Qual a diferença entre o serviço da Godoy Prime Realty e o de um corretor de imóveis tradicional?",
                  answer: "A principal diferença reside na lealdade e no foco. Enquanto o corretor tradicional geralmente representa o vendedor e busca vender os imóveis de sua carteira, o Personal Shopper Imobiliário da Godoy Prime Realty trabalha exclusivamente para o comprador. Isso significa que buscamos no mercado o imóvel que melhor atenda às suas necessidades, sem conflitos de interesse, e negociamos sempre em seu benefício. Nosso compromisso é com a sua satisfação e com a sua economia, não com a venda de um estoque."
                },
                {
                  question: "Quais são os principais benefícios de contratar um Personal Shopper Imobiliário da Godoy Prime Realty?",
                  answer: "Contratar a Godoy Prime Realty significa ter um guardião exclusivo dos seus interesses, protegendo-o da \"Armadilha da Opulência Desorientada\". Os benefícios incluem: Economia de Tempo Precioso (eliminamos visitas improdutivas), Segurança e Transparência (due diligence completa), Acesso a Oportunidades Exclusivas (propriedades off-market), Negociação Estratégica (condições mais vantajosas), e Paz de Espírito (experiência fluida e sofisticada)."
                },
                {
                  question: "Como funciona o processo de busca e aquisição de imóveis com a Godoy Prime Realty?",
                  answer: "Nosso processo é guiado pelo exclusivo Método Bússola Dourada™, estruturado em 4 fases: 1) Alinhamento Profundo & Diagnóstico de Aspirações (O Norte Verdadeiro), 2) Curadoria Exclusiva & Prospecção Inteligente (O Mapa do Tesouro), 3) Negociação Estratégica & Blindagem Contratual (A Fortaleza Dourada), e 4) Experiência de Transição & Concierge Pós-Aquisição (A Chave de Ouro)."
                },
                {
                  question: "Como é definida a remuneração pelo serviço de Personal Shopper Imobiliário da Godoy Prime Realty?",
                  answer: "Nossa remuneração é baseada em um modelo de sucesso e performance, garantindo total alinhamento com seus interesses. Você não paga absolutamente nada para iniciar nossa parceria. Minha comissão é 100% atrelada à economia real e significativa que eu gerar para você na negociação do imóvel. Se não houver economia significativa, você não me paga nada! Os detalhes completos são apresentados em nosso Contrato de Prestação de Serviços."
                },
                {
                  question: "Como a Godoy Prime Realty garante a discrição e a privacidade dos meus dados e da minha busca?",
                  answer: "A discrição e a confidencialidade são pilares fundamentais do nosso serviço de alto padrão. Entendemos a importância da privacidade para nosso público. Todas as suas informações e detalhes da sua busca são tratados com a máxima segurança e profissionalismo. Nosso processo é desenhado para proteger sua identidade e suas aspirações, garantindo que sua jornada de aquisição seja conduzida com a discrição que você espera e merece."
                },
                {
                  question: "Por que confiar na Godoy Prime Realty para uma decisão de investimento tão importante?",
                  answer: "Confiar na Godoy Prime Realty é escolher um parceiro com vasta experiência no mercado imobiliário de alto padrão, uma visão inovadora e um compromisso inabalável com o comprador. Marcus Godoy traz uma perspectiva única, aplicando as melhores práticas de setores orientados ao cliente para elevar o padrão de atendimento. Nossa lealdade exclusiva, o Método Bússola Dourada™, a tecnologia integrada e a garantia de remuneração por performance asseguram que sua aquisição será estratégica, segura e alinhada aos seus mais altos padrões de exigência."
                },
                {
                  question: "O que é a \"Armadilha da Opulência Desorientada\" e como a Godoy Prime Realty me protege dela?",
                  answer: "A \"Armadilha da Opulência Desorientada\" é o grande inimigo que impede o comprador de luxo de encontrar o imóvel perfeito com tranquilidade. Ela se manifesta como sobrecarga de informações genéricas, conflito de interesses de corretores, falta de transparência, oportunidades perdidas e desgaste emocional. A Godoy Prime Realty é o antídoto direto: oferecemos clareza e foco, lealdade inquestionável, transparência total, acesso exclusivo e uma experiência premium e eficiente."
                },
                {
                  question: "Como posso ter certeza de que você está realmente do meu lado?",
                  answer: "Nossa garantia reside em nosso modelo de remuneração e na transparência de nossa atuação. Nosso honorário é um percentual sobre a economia gerada para você, o que significa que nosso sucesso está diretamente ligado ao seu. Além disso, nosso contrato detalha nosso compromisso exclusivo com seus interesses, assegurando total confidencialidade, ética e uma blindagem completa em cada passo do processo."
                },
                {
                  question: "Como posso iniciar minha jornada com a Godoy Prime Realty?",
                  answer: "É simples! Basta entrar em contato conosco para agendar sua consultoria inicial gratuita. Nesta conversa, entenderemos suas necessidades e aspirações em profundidade, e explicaremos detalhadamente como podemos blindar sua compra e auxiliá-lo na busca pelo seu imóvel ideal na Barra da Tijuca."
                }
              ].map((faq, index) => (
                <Card key={index} className="border-0 shadow-luxury hover:shadow-gold transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                      <div className="bg-luxury-gold rounded-full w-8 h-8 flex items-center justify-center mr-4 text-luxury-navy font-bold text-sm">
                        {index + 1}
                      </div>
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed ml-12">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contato" className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto Para Economizar <span className="text-luxury-gold">Dezenas de Milhares de R$</span> Na Sua Próxima Compra?
            </h2>
            
            <p className="text-xl mb-8 text-white/90">
              Entre em contato agora e garanta sua vaga exclusiva para o próximo ciclo do Método Bússola Dourada™
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="gold" size="xl">
                <Phone className="mr-2 h-5 w-5" />
                (21) 96407-5124
              </Button>
              <Button variant="luxury-outline" size="xl">
                <Mail className="mr-2 h-5 w-5" />
                marcus@godoyprime.com.br
              </Button>
            </div>
            
            <p className="text-sm text-white/70">
              Apenas 6 vagas disponíveis por trimestre. Não perca sua oportunidade.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-navy text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <img 
                  src="/Logotipo Negativo 01.png" 
                  alt="Godoy Prime Realty" 
                  className="h-16 w-auto mb-4"
                />
                <h3 className="text-xl font-bold text-luxury-gold mb-2">Marcus Godoy</h3>
                <p className="text-white/80 mb-4">Personal Shopper Imobiliário Exclusivo da Barra da Tijuca</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Representação exclusiva do comprador em imóveis de alto padrão. 
                  Economia garantida e transparência total em cada negociação.
                </p>
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-luxury-gold flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm">(21) 4040-0067</p>
                    <p className="text-white/60 text-xs">Telefone</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-4 w-4 text-luxury-gold flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm">(21) 99725-0515</p>
                    <p className="text-white/60 text-xs">WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-luxury-gold flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm">marcus@godoyprime.com.br</p>
                    <p className="text-white/60 text-xs">E-mail</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-luxury-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white text-sm">Barra da Tijuca</p>
                    <p className="text-white/60 text-xs">Rio de Janeiro - RJ</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Links Úteis</h4>
              <div className="space-y-2">
                <a href="#servicos" className="block text-white/80 hover:text-luxury-gold transition-colors text-sm">
                  Nossos Serviços
                </a>
                <a href="#sobre" className="block text-white/80 hover:text-luxury-gold transition-colors text-sm">
                  Sobre Marcus
                </a>
                <a href="#metodo" className="block text-white/80 hover:text-luxury-gold transition-colors text-sm">
                  Método Bússola Dourada™
                </a>
                <a href="#garantias" className="block text-white/80 hover:text-luxury-gold transition-colors text-sm">
                  Garantias
                </a>
                <a href="#depoimentos" className="block text-white/80 hover:text-luxury-gold transition-colors text-sm">
                  Depoimentos
                </a>
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="border-t border-white/20 pt-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center max-w-2xl mx-auto">
              <div>
                <p className="text-3xl font-bold text-luxury-gold mb-1">100%</p>
                <p className="text-white/70 text-sm">Representação do Comprador</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-luxury-gold mb-1">Zero</p>
                <p className="text-white/70 text-sm">Conflito de Interesses</p>
              </div>
            </div>
          </div>
          
          {/* Legal Links & Copyright */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-white/60">
                <a href="#" className="hover:text-luxury-gold transition-colors">
                  Política de Privacidade
                </a>
                <a href="#" className="hover:text-luxury-gold transition-colors">
                  Termos de Uso
                </a>
                <a href="#" className="hover:text-luxury-gold transition-colors">
                  LGPD
                </a>
              </div>
              
              <p className="text-white/60 text-sm text-center md:text-right">
                © 2025 Godoy Prime Realty. Todos os direitos reservados.<br />
                CRECI/RJ: 11841 PJ RJ e 80199 PF RJ
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/5521997250515?text=Olá! Gostaria de saber mais sobre o Personal Shopper Imobiliário"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute right-full mr-3 bg-luxury-navy text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Fale no WhatsApp
          </span>
        </a>
      </div>
    </div>;
};

export default LandingPage;