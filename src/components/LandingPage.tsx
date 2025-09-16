import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Shield, Clock, Target, Users, TrendingUp, MapPin, Award, DollarSign, Phone, Mail, Instagram, Star, ArrowRight, Home, Calculator, Search, FileText } from "lucide-react";

const LandingPage = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-cream to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/src/assets/barra-beach-hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 bg-luxury-gold/20 border-luxury-gold text-luxury-gold text-sm px-4 py-2">
            Personal Shopper Imobiliário Exclusivo da Barra da Tijuca
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Economize <span className="text-luxury-gold">R$ 200-500mil</span> na sua próxima compra de imóvel
          </h1>
          
          <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Sou <strong>Marcus Godoy</strong>, seu representante exclusivo na negociação. 
            Acesso a ofertas off-market, análise de dados reais e negociação baseada em inteligência de mercado.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              className="bg-gradient-gold text-luxury-navy hover:bg-accent shadow-gold transition-all duration-300 hover:scale-105 w-full sm:w-auto h-10 sm:h-14 rounded-lg px-6 sm:px-10 text-sm sm:text-lg font-semibold mb-4"
              onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
            >
              Consultoria Exclusiva Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-luxury-gold" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-luxury-gold" />
              <span>Sem Conflito de Interesses</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-luxury-gold" />
              <span>Atendimento 24/48h</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-red-200 text-red-600">
              A Realidade do Mercado Imobiliário
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-luxury-navy mb-6">
              Você está perdendo <span className="text-red-600">centenas de milhares</span> sem saber
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              O mercado imobiliário da Barra da Tijuca movimenta bilhões, mas 97% dos compradores cometem os mesmos erros caros.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="text-red-600 mb-4">
                  <DollarSign className="h-8 w-8" />
                </div>
                <CardTitle className="text-lg mb-2 text-red-900">Pagando Preços Inflacionados</CardTitle>
                <CardDescription className="text-red-700">
                  Sem acesso a dados reais do mercado, você paga até 40% a mais do que deveria pelo mesmo imóvel.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="text-red-600 mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="text-lg mb-2 text-red-900">Corretor Representa a Construtora</CardTitle>
                <CardDescription className="text-red-700">
                  O corretor trabalha para vender pelo maior preço possível, não para conseguir o melhor negócio para você.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="text-red-600 mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <CardTitle className="text-lg mb-2 text-red-900">Perdendo Oportunidades Off-Market</CardTitle>
                <CardDescription className="text-red-700">
                  Os melhores negócios nunca chegam ao mercado público. Você só vê o que sobrou.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="bg-luxury-navy text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Resultado: Você perde entre R$ 200.000 a R$ 500.000 em uma única transação
            </h3>
            <p className="text-lg text-gray-300">
              Dinheiro que poderia estar no seu bolso, investido ou sendo usado para melhorar sua qualidade de vida.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-luxury-cream to-luxury-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-luxury-gold text-luxury-gold">
              A Solução Que Você Precisa
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-luxury-navy mb-6">
              Personal Shopper Imobiliário: <span className="text-luxury-gold">Sua Representação Exclusiva</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pela primeira vez na Barra da Tijuca, você tem alguém que trabalha 100% pelos seus interesses. 
              Nada de conflitos, nada de comissões duplas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-luxury-gold p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">100% Sua Representação</h3>
                    <p className="text-gray-600">
                      Trabalho exclusivamente para você. Não tenho vínculos com construtoras ou imobiliárias.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-luxury-gold p-2 rounded-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Acesso a Ofertas Off-Market</h3>
                    <p className="text-gray-600">
                      Rede exclusiva de contatos me permite acessar imóveis antes que cheguem ao mercado público.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-luxury-gold p-2 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Inteligência de Dados</h3>
                    <p className="text-gray-600">
                      Análise profunda de preços, tendências e comparáveis para garantir que você pague o preço justo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="/src/assets/barra-beach-luxury.jpg" 
                alt="Vista da Barra da Tijuca" 
                className="rounded-2xl shadow-luxury w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/60 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium">Barra da Tijuca</p>
                <p className="text-xs opacity-80">Mercado de R$ 2 bilhões/ano</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-luxury text-center">
            <h3 className="text-2xl font-bold text-luxury-navy mb-4">
              Resultado Garantido: Economia Mínima de R$ 200.000
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Meus clientes economizam em média R$ 350.000 por transação. 
              Se você não economizar no mínimo R$ 200.000, não me pague nada.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-gold text-luxury-navy hover:bg-accent shadow-gold transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
            >
              Quero Minha Consultoria Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-luxury-gold text-luxury-gold">
              Resultados Comprovados
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-luxury-navy mb-6">
              Mais de <span className="text-luxury-gold">R$ 50 milhões</span> economizados para meus clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-luxury-cream border-luxury-gold/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="/api/placeholder/50/50" />
                    <AvatarFallback>RC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      "Marcus conseguiu R$ 420.000 de desconto no meu apartamento na Península. 
                      Sem ele, eu teria pagado muito mais."
                    </p>
                    <p className="font-semibold text-luxury-navy">Roberto C.</p>
                    <p className="text-xs text-gray-500">Apartamento 4 suítes - Península</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-luxury-cream border-luxury-gold/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="/api/placeholder/50/50" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      "Encontrou um apartamento off-market que nem estava à venda. 
                      Economia de R$ 300.000 comparado aos similares."
                    </p>
                    <p className="font-semibold text-luxury-navy">Maria S.</p>
                    <p className="text-xs text-gray-500">Cobertura - Recreio Shopping</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-luxury-cream border-luxury-gold/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="/api/placeholder/50/50" />
                    <AvatarFallback>PL</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      "O investimento se pagou só na economia da primeira transação. 
                      Já é meu consultor para vida toda."
                    </p>
                    <p className="font-semibold text-luxury-navy">Paulo L.</p>
                    <p className="text-xs text-gray-500">Investidor - 3 imóveis</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-luxury-navy text-white rounded-2xl p-8 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-luxury-gold mb-2">127</div>
                <p className="text-gray-300">Transações Realizadas</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-luxury-gold mb-2">R$ 50M+</div>
                <p className="text-gray-300">Economizados para Clientes</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-luxury-gold mb-2">R$ 390k</div>
                <p className="text-gray-300">Economia Média por Cliente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-luxury-cream to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-luxury-gold text-luxury-gold">
                Sobre Marcus Godoy
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-luxury-navy mb-6">
                O primeiro Personal Shopper Imobiliário do Brasil
              </h2>
              
              <div className="space-y-4 text-gray-600 mb-8">
                <p>
                  Depois de 15 anos no mercado imobiliário, vi centenas de clientes pagarem muito mais 
                  do que deveriam pelos seus imóveis. O problema? Ninguém os representava de verdade.
                </p>
                
                <p>
                  Em 2019, criei o primeiro serviço de Personal Shopper Imobiliário do Brasil, 
                  focado exclusivamente na Barra da Tijuca - o mercado que conheço como a palma da minha mão.
                </p>
                
                <p>
                  <strong>Minha promessa é simples:</strong> Trabalhar 100% pelos seus interesses, 
                  conseguir o melhor preço possível e garantir que você economize no mínimo R$ 200.000.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-luxury-gold" />
                  <span className="text-sm font-medium">CRECI/RJ Ativo</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-luxury-gold" />
                  <span className="text-sm font-medium">15 anos na Barra</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-luxury-gold" />
                  <span className="text-sm font-medium">127+ clientes atendidos</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-luxury-gold" />
                  <span className="text-sm font-medium">R$ 50M+ economizados</span>
                </div>
              </div>

              <Button 
                size="lg"
                className="bg-gradient-gold text-luxury-navy hover:bg-accent shadow-gold transition-all duration-300 hover:scale-105"
                onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
              >
                Agendar Conversa Estratégica
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <img 
                src="/src/assets/marcus-profile.jpg" 
                alt="Marcus Godoy" 
                className="rounded-2xl shadow-luxury w-full h-96 object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-luxury-gold text-luxury-navy p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-xs font-medium">Anos de Experiência</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 lg:py-24 bg-luxury-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-luxury-gold text-luxury-gold">
              Minha História
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Por que criei o Personal Shopper Imobiliário
            </h2>
          </div>

          <div className="space-y-6 text-lg text-gray-300">
            <p>
              Em 2018, um amigo próximo me pediu ajuda para comprar um apartamento na Península. 
              Ele tinha orçamento de R$ 3 milhões e queria o melhor negócio possível.
            </p>
            
            <p>
              Depois de 3 meses de pesquisa intensiva, consegui encontrar um apartamento off-market 
              - nem estava oficialmente à venda - por R$ 2,1 milhões. O mesmo apartamento no andar 
              de cima estava sendo vendido por R$ 2,8 milhões.
            </p>
            
            <p>
              <strong className="text-luxury-gold">Economia: R$ 700.000.</strong>
            </p>
            
            <p>
              Foi nesse momento que percebi: <em>existia uma lacuna gigantesca no mercado</em>. 
              Todos os profissionais trabalhavam para as construtoras e imobiliárias. 
              Ninguém representava o comprador de verdade.
            </p>
            
            <p>
              Decidi dedicar minha carreira exclusivamente a isso: ser o advogado do comprador 
              no mercado imobiliário. Desde então, já economizei mais de R$ 50 milhões 
              para meus clientes.
            </p>
            
            <p className="text-luxury-gold font-semibold">
              E agora quero fazer o mesmo por você.
            </p>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-gradient-gold text-luxury-navy hover:bg-accent shadow-gold transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
            >
              Quero Economizar Também
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-luxury-gold text-luxury-gold">
              Metodologia Exclusiva
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-luxury-navy mb-6">
              Método Bússola Dourada: <span className="text-luxury-gold">Seu GPS para o melhor negócio</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Metodologia proprietária desenvolvida em 15 anos de experiência para garantir que você sempre encontre e negocie o melhor imóvel pelo menor preço.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-luxury-gold/20 hover:shadow-luxury transition-shadow">
              <CardContent className="p-8">
                <div className="bg-luxury-gold text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <div className="mb-4">
                  <Search className="h-8 w-8 text-luxury-gold mx-auto" />
                </div>
                <CardTitle className="text-xl mb-4 text-luxury-navy">Mapeamento Completo</CardTitle>
                <CardDescription className="text-gray-600">
                  Análise profunda do seu perfil, necessidades e objetivos. Mapeamento de todas as opções disponíveis, 
                  incluindo oportunidades off-market exclusivas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-luxury-gold/20 hover:shadow-luxury transition-shadow">
              <CardContent className="p-8">
                <div className="bg-luxury-gold text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <div className="mb-4">
                  <Calculator className="h-8 w-8 text-luxury-gold mx-auto" />
                </div>
                <CardTitle className="text-xl mb-4 text-luxury-navy">Inteligência de Dados</CardTitle>
                <CardDescription className="text-gray-600">
                  Análise comparativa de preços, histórico de vendas, tendências do mercado e precificação estratégica. 
                  Você saberá exatamente quanto cada imóvel vale.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-luxury-gold/20 hover:shadow-luxury transition-shadow">
              <CardContent className="p-8">
                <div className="bg-luxury-gold text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <div className="mb-4">
                  <Target className="h-8 w-8 text-luxury-gold mx-auto" />
                </div>
                <CardTitle className="text-xl mb-4 text-luxury-navy">Negociação Estratégica</CardTitle>
                <CardDescription className="text-gray-600">
                  Negociação profissional baseada em dados concretos, representando 100% os seus interesses. 
                  Objetivo: menor preço, melhores condições.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-luxury-navy to-luxury-navy-light text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Resultado: Economia Garantida de No Mínimo R$ 200.000
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Em 5 anos usando esta metodologia, nunca um cliente economizou menos que R$ 200.000. 
              Se isso acontecer com você, não pago nada.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-gold text-luxury-navy hover:bg-accent shadow-gold transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
            >
              Aplicar Método no Meu Caso
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-luxury-cream to-luxury-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-luxury-gold text-luxury-gold">
              Suas Garantias
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-luxury-navy mb-6">
              4 Garantias que protegem <span className="text-luxury-gold">100% do seu investimento</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-luxury-gold/20 bg-white shadow-luxury">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-luxury-gold text-white p-3 rounded-xl">
                    <DollarSign className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-luxury-navy">Garantia de Economia Mínima</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-gray-600">
                  Se você não economizar no mínimo R$ 200.000 na sua transação, você não paga nada pelos meus serviços. 
                  Seu investimento fica 100% protegido.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-luxury-gold/20 bg-white shadow-luxury">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-luxury-gold text-white p-3 rounded-xl">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-luxury-navy">Garantia de Representação Exclusiva</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-gray-600">
                  Trabalho exclusivamente para você. Zero conflito de interesses, zero comissões duplas. 
                  Sua representação é minha única prioridade.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-luxury-gold/20 bg-white shadow-luxury">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-luxury-gold text-white p-3 rounded-xl">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-luxury-navy">Garantia de Prazo</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-gray-600">
                  Resposta em até 24h e primeira proposta apresentada em até 7 dias úteis. 
                  Seu tempo é valioso e será respeitado.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-luxury-gold/20 bg-white shadow-luxury">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-luxury-gold text-white p-3 rounded-xl">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-luxury-navy">Garantia de Transparência Total</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-gray-600">
                  Acesso completo a todas as análises, comparativos e dados utilizados na negociação. 
                  Transparência total em todo o processo.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-luxury text-center">
            <h3 className="text-2xl font-bold text-luxury-navy mb-4">
              Sua Satisfação é Minha Garantia
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Em 5 anos de serviço, tenho 100% de satisfação dos clientes. 
              Sua economia e satisfação são minha prioridade número 1.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-gold text-luxury-navy hover:bg-accent shadow-gold transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
            >
              Quero Essas Garantias Para Mim
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Objections Section */}
      <section className="py-16 lg:py-24 bg-luxury-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-luxury-gold text-luxury-gold">
              Perguntas Frequentes
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              "Mas Marcus, e se..."
            </h2>
            <p className="text-xl text-gray-300">
              Resolvo aqui as principais dúvidas que você pode ter sobre o serviço.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-luxury-navy-light p-6 rounded-xl">
              <h3 className="text-xl font-bold text-luxury-gold mb-3">
                "E se eu não encontrar nada que me interesse?"
              </h3>
              <p className="text-gray-300">
                Em 15 anos, isso nunca aconteceu. Tenho acesso a mais de 80% dos imóveis da Barra, incluindo off-market. 
                Se realmente não encontrarmos nada (chances menores que 1%), você não paga nada.
              </p>
            </div>

            <div className="bg-luxury-navy-light p-6 rounded-xl">
              <h3 className="text-xl font-bold text-luxury-gold mb-3">
                "Seu serviço não vai ser mais caro que fazer sozinho?"
              </h3>
              <p className="text-gray-300">
                Meus honorários representam menos de 10% da economia média que consigo para os clientes. 
                Ou seja: você lucra no mínimo R$ 200.000 líquidos. É investimento, não gasto.
              </p>
            </div>

            <div className="bg-luxury-navy-light p-6 rounded-xl">
              <h3 className="text-xl font-bold text-luxury-gold mb-3">
                "Como sei que você realmente tem acesso a off-market?"
              </h3>
              <p className="text-gray-300">
                15 anos construindo relacionamentos na Barra me deram uma rede única. Na nossa primeira reunião, 
                mostro pelo menos 3 oportunidades off-market na sua faixa de interesse.
              </p>
            </div>

            <div className="bg-luxury-navy-light p-6 rounded-xl">
              <h3 className="text-xl font-bold text-luxury-gold mb-3">
                "E se eu não conseguir financiamento?"
              </h3>
              <p className="text-gray-300">
                Trabalho com uma rede de consultores financeiros especializados em alto padrão. 
                Eles ajudam a estruturar o financiamento antes mesmo de começarmos a busca.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-gradient-gold text-luxury-navy hover:bg-accent shadow-gold transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
            >
              Esclarecer Minhas Dúvidas Pessoalmente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-luxury-gold text-luxury-gold">
              Dúvidas Frequentes
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-luxury-navy mb-6">
              Perguntas e Respostas
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-luxury-gold/20">
              <AccordionTrigger className="text-left text-luxury-navy hover:text-luxury-gold">
                Como funciona exatamente o serviço de Personal Shopper Imobiliário?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Trabalho como seu representante exclusivo na busca e negociação de imóveis. Primeiro, fazemos uma análise 
                completa do seu perfil e necessidades. Depois, uso minha rede e metodologia para encontrar as melhores 
                opções, incluindo oportunidades off-market. Por fim, negocia em seu nome para conseguir o melhor preço e condições.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-luxury-gold/20">
              <AccordionTrigger className="text-left text-luxury-navy hover:text-luxury-gold">
                Qual é o investimento para ter seus serviços?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Meus honorários são baseados no sucesso: você só paga quando conseguirmos a economia mínima de R$ 200.000. 
                O valor representa uma pequena fração da economia obtida, garantindo que você sempre tenha lucro líquido 
                significativo com o serviço.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-luxury-gold/20">
              <AccordionTrigger className="text-left text-luxury-navy hover:text-luxury-gold">
                Por que focar apenas na Barra da Tijuca?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Especialização gera resultados superiores. Conheço cada edifício, cada construtora, cada movimento de preço 
                da Barra. Essa expertise profunda me permite encontrar oportunidades e negociar de forma que generalistas não conseguem.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-luxury-gold/20">
              <AccordionTrigger className="text-left text-luxury-navy hover:text-luxury-gold">
                Quanto tempo demora todo o processo?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Depende da complexidade das suas necessidades, mas em média: primeira reunião estratégica em 24-48h, 
                apresentação das primeiras opções em até 7 dias, e conclusão da transação entre 30-90 dias 
                (dependendo de financiamento e documentação).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-luxury-gold/20">
              <AccordionTrigger className="text-left text-luxury-navy hover:text-luxury-gold">
                E se eu não ficar satisfeito com o resultado?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Simples: se não conseguirmos a economia mínima de R$ 200.000, você não paga nada pelos meus serviços. 
                Em 5 anos, tenho 100% de satisfação dos clientes, mas sua garantia está sempre assegurada.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-luxury-navy to-luxury-navy-light text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6 border-luxury-gold text-luxury-gold">
            Última Oportunidade
          </Badge>
          
          <h2 className="text-4xl sm:text-6xl font-bold mb-6">
            Economize <span className="text-luxury-gold">R$ 200-500mil</span> na sua próxima compra
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            A diferença entre pagar preço cheio e conseguir o melhor negócio é ter alguém que trabalhe 100% por você.
          </p>
          
          <div className="bg-luxury-gold/10 border border-luxury-gold rounded-2xl p-8 mb-8">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-luxury-gold mb-2">24h</div>
                <p className="text-sm text-gray-300">Para primeira resposta</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-luxury-gold mb-2">127+</div>
                <p className="text-sm text-gray-300">Clientes atendidos</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-luxury-gold mb-2">R$ 50M+</div>
                <p className="text-sm text-gray-300">Economizados</p>
              </div>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-gradient-gold text-luxury-navy hover:bg-accent shadow-gold transition-all duration-300 hover:scale-105 text-xl px-12 py-6 mb-6"
            onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
          >
            Quero Minha Consultoria Gratuita Agora
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-luxury-gold" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-luxury-gold" />
              <span>Sem Compromisso</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-luxury-gold" />
              <span>Resposta em 24h</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer className="bg-luxury-navy text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img src="/Logotipo Negativo 01.png" alt="Marcus Godoy Personal Shopper" className="h-12 mb-4" />
              <p className="text-gray-300 mb-4">
                Personal Shopper Imobiliário exclusivo da Barra da Tijuca. 
                Sua representação na busca pelo melhor negócio imobiliário.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-luxury-gold">Contato</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-luxury-gold" />
                  <span className="text-gray-300">(21) 99999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-luxury-gold" />
                  <span className="text-gray-300">contato@personalshopperimobiliario.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-luxury-gold" />
                  <span className="text-gray-300">Barra da Tijuca, Rio de Janeiro</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-luxury-gold">Redes Sociais</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Marcus Godoy Personal Shopper Imobiliário. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;