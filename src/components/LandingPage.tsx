import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Key, CheckCircle, Calculator, Search, Target, Users, TrendingUp, Award, Star, ArrowRight, Phone, Mail } from "lucide-react";
import heroImage from "@/assets/barra-beach-luxury.jpg";
import marcusProfile from "@/assets/721A9271.jpg";

const LandingPage = () => {
  const [highlightedCards, setHighlightedCards] = useState<number[]>([]);
  
  const toggleCardHighlight = (cardIndex: number) => {
    setHighlightedCards(prev => 
      prev.includes(cardIndex) 
        ? prev.filter(index => index !== cardIndex)
        : [...prev, cardIndex]
    );
  };

  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-6 border-luxury-gold text-luxury-gold bg-white/10">
              Personal Shopper Imobiliário Exclusivo
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Descubra O Segredo dos Compradores Inteligentes
              <span className="text-luxury-gold"> E Compre o Imóvel Que Você Quer e Pelo Preço Justo</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-4xl mx-auto">
              O Personal Shopper Imobiliário representa apenas você na compra, defende somente os seus interesses e sem conflitos. Negociação baseada em Estratégia, Inteligência de Mercado, Experiência e Conhecimento da Região.
            </p>
            
            <Button variant="gold" size="xl" className="mb-4">
              Desbloquear minha Consultoria Exclusiva
              <ArrowRight className="ml-2" />
            </Button>
            
            <p className="text-sm text-white/80">
              <strong>Economia e Compromisso comprovados. Ele só ganha se você economizar</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
              Por Que Você Paga <span className="text-luxury-gold">Milhares de Reais</span> a Mais Sem Saber?
            </h2>
            
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-luxury">
              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                Vou te contar algo que ninguém no mercado imobiliário quer que você entenda melhor.
              </p>
              
              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                A Imobiliária que te mostra o imóvel <strong>não trabalha para você</strong>. 
                Ela foi contratada pelo Vendedor para fazer a intermediação do negócio e <strong>vender pelo preço mais caro possível.</strong> Elas ganham mais dinheiro quando você paga mais caro. 
                Podem até dizer que estão lutando por você, mas o objetivo real é vender pelo maior preço possível. <strong>Simples Assim!</strong>
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
      <section className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-luxury-navy">
                Personal Shopper Imobiliário: <span className="text-luxury-gold">Representação 100% Sua</span>
              </h2>
              <p className="text-xl text-luxury-text-muted max-w-3xl mx-auto">
                Existe apenas uma maneira de ter a certeza que está fazendo a melhor negociação possível.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-luxury-navy mb-6 leading-relaxed">
                  Ter alguém que trabalhe exclusivamente para você. Que ganhe apenas quando você economizar 
                  dinheiro, não quando gastar mais. Para isso o Marcus Godoy criou o primeiro serviço de Personal Shopper 
                  Imobiliário da Barra da Tijuca.
                </p>
                
                <div className="space-y-4 mb-8">
                  {["Tenha acesso aos dados reais de vendas que nunca aparecem nos portais", "Conheça os segredos do mercado local", "Representação Exclusiva do Comprador, Sem Conflito de Interesses"].map((item, index) => <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <p className="text-luxury-navy">{item}</p>
                    </div>)}
                </div>
                
                <div className="bg-white/60 rounded-xl p-6 border border-luxury-gold/30">
                  <p className="text-lg font-semibold text-luxury-navy italic">
                    "Imagine saber exatamente quanto vale seu imóvel antes mesmo de fazer a oferta. 
                    Ter acesso a propriedades exclusivas que só circulam entre especialistas. 
                    É como jogar pôquer vendo as cartas dos outros jogadores."
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
      <section className="py-20 bg-background">
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
      <section className="py-20 bg-luxury-navy text-white">
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
              description: "Os imóveis mais interessantes nunca chegam aos portais. Acesso às oportunidades off-market exclusivas.",
              highlight: "Ofertas exclusivas"
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
                    <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                      highlightedCards.includes(index) ? 'text-luxury-gold' : 'text-white'
                    }`}>
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
      <section className="py-20 bg-background">
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
      <section className="py-20 bg-luxury-cream">
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
                  Minha jornada para redefinir a aquisição de imóveis de alto padrão no Brasil começou com experiências pessoais e profissionais frustrantes. Senti na pele, tanto como comprador quanto ao acompanhar amigos e familiares, as dores e ineficiências do processo tradicional.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Senti na pele, tanto como comprador quanto ao acompanhar amigos e familiares, as dores e ineficiências do processo tradicional.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  O ponto de virada foi ao ajudar um amigo empresário na busca por um apartamento na Barra. Ali percebi a dinâmica desfavorável.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Minha jornada para redefinir a aquisição de imóveis de alto padrão no Brasil começou com experiências pessoais e profissionais frustrantes. Senti na pele, tanto como comprador quanto ao acompanhar amigos e familiares, as dores e ineficiências do processo tradicional.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Como corretor, também observei as limitações da estrutura tradicional e da remuneração de mercado, que muitas vezes me impediam de ajudar o cliente como eu gostaria.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Essa clareza interna, somada à minha nova visão, me revelou uma grande oportunidade: a de construir um serviço capaz de oferecer transações mais justas e equilibradas para todos.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Percebi que a realidade era de sobrecarga de informações, falta de transparência e a sensação de que os interesses do comprador nem sempre eram prioridade
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Com minha experiência em outros mercados, como Telecomunicações e Internet, sabia que era possível trazer uma abordagem mais sofisticada. Decidi estudar como esses processos funcionavam em outros países e vi a possibilidade de mudar essa percepção no Brasil.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Assim, nasceu o conceito de Personal Shopper Imobiliário™ (Bússola Dourada), fundando a Godoy Prime Realty.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Meu compromisso é ser o guardião exclusivo dos seus interesses, com lealdade de 100% ao comprador.
                </p>
                
                <div className="bg-luxury-navy text-white rounded-xl p-8 text-center">
                  <p className="text-2xl font-bold mb-2">Meu amigo economizou R$ 380 mil naquela compra.</p>
                  <p className="text-lg">E eu descobri minha verdadeira missão: ser o primeiro profissional da Barra a representar exclusivamente o comprador, sem conflito de interesses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section className="py-20 bg-background">
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
              description: "Investigamos o preço justo usando dados de vendas reais da região. Você sabe exatamente quanto vale cada imóvel antes de fazer qualquer oferta."
            }, {
              step: "04",
              icon: Shield,
              title: "Negociação Blindada",
              description: "Representamos apenas você na mesa de negociação. Usamos estratégias baseadas no perfil do vendedor para conseguir o melhor preço e condições."
            }, {
              step: "05",
              icon: CheckCircle,
              title: "Fechamento Protegido",
              description: "Coordenamos toda documentação e validação técnica. Você recebe as chaves com total segurança jurídica e tranquilidade."
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
      <section className="py-20 bg-luxury-navy text-white">
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
                Escolha o nível de blindagem e suporte que sua conquista imobiliária merece
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[{
              name: "Parecer Godoy Prime",
              subtitle: "Atestado de Valor",
              price: "A partir de R$ 9.000",
              description: "Para quem já tem um imóvel em vista e precisa de validação independente.",
              features: ["Consulta de alinhamento estratégico", "Inspeção detalhada de Marcus Godoy", "Relatório técnico comparativo", "Pack de Conhecimento exclusivo"],
              cta: "Quero Meu Parecer",
              popular: false
            }, {
              name: "Compra Blindada",
              subtitle: "Validação & Negociação",
              price: "R$ 25.000",
              description: "Assessoria completa para validar valor, negociar e garantir segurança jurídica.",
              features: ["Relatório de Avaliação Detalhado", "Negociação Ativa Profissional", "Blindagem Jurídica Completa", "Coordenação até entrega das chaves"],
              cta: "Quero Proteção Básica",
              popular: false
            }, {
              name: "Método Bússola Dourada™",
              subtitle: "Experiência Completa",
              price: "R$ 45.000",
              description: "Experiência de compra fluida, estratégica e totalmente segura do início ao fim.",
              features: ["Metodologia completa em 5 fases", "Acesso completo ao mercado off-market", "Concierge até entrega das chaves", "Garantia de economia mínima R$ 100k", "Suporte pós-compra por 12 meses"],
              cta: "Sim! Quero a Bússola Dourada",
              popular: true
            }].map((plan, index) => <Card key={index} className={`relative border-0 ${plan.popular ? 'bg-white shadow-gold scale-105' : 'bg-white/5 border-white/10'}`}>
                  {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-luxury-gold text-luxury-navy font-bold px-6 py-1">
                        MAIS POPULAR
                      </Badge>
                    </div>}
                  
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-luxury-navy' : 'text-white'}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-sm mb-4 ${plan.popular ? 'text-luxury-text-muted' : 'text-white/70'}`}>
                        {plan.subtitle}
                      </p>
                      <div className={`text-3xl font-bold mb-2 ${plan.popular ? 'text-luxury-gold' : 'text-luxury-gold'}`}>
                        {plan.price}
                      </div>
                      <p className={`text-sm ${plan.popular ? 'text-luxury-text-muted' : 'text-white/70'}`}>
                        {plan.description}
                      </p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-luxury-gold' : 'text-luxury-gold'}`} />
                          <span className={`text-sm ${plan.popular ? 'text-luxury-navy' : 'text-white/90'}`}>{feature}</span>
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
      <section className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-luxury">
              <div className="bg-gradient-gold rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-luxury-navy" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-luxury-navy">
                Garantia Tripla de Resultados
              </h2>
              
              <p className="text-xl text-luxury-gold font-semibold mb-6">
                Economia, Satisfação ou Dinheiro de Volta
              </p>
              
              <p className="text-lg text-luxury-navy mb-8 leading-relaxed">
                Se você não economizar pelo menos R$ 100.000 na negociação do seu imóvel, 
                ou se não ficar completamente satisfeito com o processo, devolvemos 100% do valor investido no serviço.
              </p>
              
              <div className="bg-luxury-navy/5 border border-luxury-navy/10 rounded-xl p-6 mb-8">
                <p className="text-luxury-navy font-semibold">
                  Não é apenas uma promessa. É nossa forma de provar que trabalhamos exclusivamente para você. 
                  Assumimos todo o risco porque temos certeza absoluta de que você vai economizar muito mais 
                  do que pagou pela consultoria.
                </p>
              </div>
              
              <Button variant="gold" size="xl">
                Garantir Minha Vaga Agora
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto Para Economizar <span className="text-luxury-gold">Centenas de Milhares</span> Na Sua Próxima Compra?
            </h2>
            
            <p className="text-xl mb-8 text-white/90">
              Entre em contato agora e garanta sua vaga exclusiva para o próximo ciclo do Método Bússola Dourada™
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="gold" size="xl">
                <Phone className="mr-2 h-5 w-5" />
                (21) 99999-9999
              </Button>
              <Button variant="luxury-outline" size="xl">
                <Mail className="mr-2 h-5 w-5" />
                marcus@godoyrealty.com.br
              </Button>
            </div>
            
            <p className="text-sm text-white/70">
              Apenas 2 vagas disponíveis para este trimestre. Não perca sua oportunidade.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-navy text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-luxury-gold mb-2">Marcus Godoy</h3>
              <p className="text-white/80">Personal Shopper Imobiliário Exclusivo da Barra da Tijuca</p>
            </div>
            
            <div className="flex justify-center space-x-8 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-luxury-gold">R$ 280k</p>
                <p className="text-sm text-white/70">Economia Média</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-luxury-gold">100%</p>
                <p className="text-sm text-white/70">Representação Sua</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-luxury-gold">0</p>
                <p className="text-sm text-white/70">Conflito de Interesses</p>
              </div>
            </div>
            
            <p className="text-white/60 text-sm">
              © 2024 Godoy Prime Realty. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};

export default LandingPage;