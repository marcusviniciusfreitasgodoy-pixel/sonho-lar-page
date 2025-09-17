import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle, Star, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-cream to-white">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')"
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <Badge variant="outline" className="mb-6 text-luxury-gold border-luxury-gold bg-black/30 backdrop-blur-sm">
              ✨ Exclusivo Barra da Tijuca
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Economize <span className="text-luxury-gold">R$ 200-500mil</span> na sua próxima compra
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Personal Shopper Imobiliário exclusivo da Barra da Tijuca. 
              <strong>Representação 100% sua</strong>, sem conflito de interesses.
            </p>
            
            <Button asChild variant="gold" size="xl" className="group animate-float shadow-2xl">
              <a 
                href="https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario"
                target="_blank"
                rel="noopener noreferrer"
              >
                Desbloquear minha Consultoria Exclusiva
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Social Proof */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-4">
              Resultados Comprovados
            </h2>
            <p className="text-luxury-text-muted text-lg max-w-2xl mx-auto">
              Mais de R$ 50 milhões em economias geradas para meus clientes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-slide-up">
              <div className="text-4xl font-bold text-luxury-gold mb-2">R$ 450mil</div>
              <p className="text-luxury-text-muted">Economia média por transação</p>
            </div>
            <div className="text-center animate-slide-up">
              <div className="text-4xl font-bold text-luxury-gold mb-2">98%</div>
              <p className="text-luxury-text-muted">Taxa de satisfação</p>
            </div>
            <div className="text-center animate-slide-up">
              <div className="text-4xl font-bold text-luxury-gold mb-2">120+</div>
              <p className="text-luxury-text-muted">Clientes atendidos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-luxury-navy mb-6">
                O Problema que Você Enfrenta
              </h2>
              <p className="text-xl text-luxury-text-muted leading-relaxed">
                No mercado imobiliário da Barra, você está sozinho contra um sistema 
                que lucra com a sua falta de informação
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img 
                  src="https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Complexidade do mercado imobiliário"
                  className="rounded-lg shadow-luxury w-full h-80 object-cover"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-luxury-text-muted">
                    <strong>Corretores representam o vendedor</strong>, não você - querem 
                    vender pelo preço mais caro possível.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-luxury-text-muted">
                    <strong>Informações privilegiadas</strong> ficam restritas aos profissionais do setor
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-luxury-text-muted">
                    <strong>Você paga mais</strong> por não conhecer o valor real do mercado
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-luxury-text-muted">
                    <strong>Oportunidades off-market</strong> nunca chegam até você
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-luxury-gold text-luxury-navy">
                A Solução
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-luxury-navy mb-6">
                Personal Shopper Imobiliário que Trabalha Para Você
              </h2>
              <p className="text-xl text-luxury-text-muted max-w-3xl mx-auto leading-relaxed">
                Represento exclusivamente seus interesses, com conhecimento profundo 
                do mercado da Barra da Tijuca
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center p-8 border-0 shadow-luxury hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <Shield className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                  <CardTitle className="text-xl text-luxury-navy">100% Representação Sua</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-luxury-text-muted">
                    Trabalho exclusivamente para você, não para vendedores ou construtoras
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-8 border-0 shadow-luxury hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <TrendingUp className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                  <CardTitle className="text-xl text-luxury-navy">Análise de Mercado Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-luxury-text-muted">
                    Dados reais de preço por m², histórico de vendas e tendências do bairro
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-8 border-0 shadow-luxury hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <Users className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                  <CardTitle className="text-xl text-luxury-navy">Rede Exclusiva</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-luxury-text-muted">
                    Acesso a oportunidades off-market que nunca chegam ao mercado público
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-luxury-navy mb-6">
                Como Funciona
              </h2>
              <p className="text-xl text-luxury-text-muted">
                Processo transparente e focado nos seus objetivos
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6 bg-white p-8 rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-luxury-gold text-luxury-navy rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-luxury-navy mb-3">Consulta Estratégica</h3>
                  <p className="text-luxury-text-muted text-lg leading-relaxed">
                    Entendemos seus objetivos, orçamento e critérios. Definimos a estratégia 
                    personalizada para encontrar o imóvel ideal.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 bg-white p-8 rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-luxury-gold text-luxury-navy rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-luxury-navy mb-3">Pesquisa de Mercado</h3>
                  <p className="text-luxury-text-muted text-lg leading-relaxed">
                    Analisamos todas as opções disponíveis, incluindo oportunidades off-market. 
                    Comparamos preços e identificamos as melhores oportunidades.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 bg-white p-8 rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-luxury-gold text-luxury-navy rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-luxury-navy mb-3">Negociação Estratégica</h3>
                  <p className="text-luxury-text-muted text-lg leading-relaxed">
                    Negociamos o melhor preço com base em dados reais de mercado. 
                    Cuidamos de toda a documentação e processo de compra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-luxury-navy mb-6">
                O Que Você Ganha
              </h2>
              <p className="text-xl text-luxury-text-muted">
                Resultados tangíveis que transformam sua experiência de compra
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-luxury-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-luxury-navy mb-2">Economia Garantida</h3>
                  <p className="text-luxury-text-muted">
                    Entre R$ 200-500mil de economia comprovada em cada transação
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-luxury-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-luxury-navy mb-2">Acesso Exclusivo</h3>
                  <p className="text-luxury-text-muted">
                    Imóveis off-market que nunca chegam aos portais públicos
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-luxury-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-luxury-navy mb-2">Negociação Expert</h3>
                  <p className="text-luxury-text-muted">
                    15 anos de experiência negociando no mercado da Barra
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-luxury-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-luxury-navy mb-2">Processo Transparente</h3>
                  <p className="text-luxury-text-muted">
                    Relatórios detalhados e acompanhamento em todas as etapas
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-luxury-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-luxury-navy mb-2">Economia de Tempo</h3>
                  <p className="text-luxury-text-muted">
                    Meses de pesquisa resumidos em semanas com foco certeiro
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-luxury-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-luxury-navy mb-2">Suporte Completo</h3>
                  <p className="text-luxury-text-muted">
                    Da primeira visita até a entrega das chaves
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-luxury-navy mb-6">
              O Que Meus Clientes Dizem
            </h2>
            <p className="text-xl text-luxury-text-muted">
              Resultados reais de quem já economizou centenas de milhares
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-0 shadow-luxury">
              <CardContent>
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-luxury-gold fill-current" />
                  ))}
                </div>
                <p className="text-luxury-text-muted text-lg mb-6 leading-relaxed">
                  "Marcus conseguiu negociar R$ 420mil de desconto no meu apartamento no 
                  Península. O conhecimento dele do mercado local é impressionante."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-luxury-navy rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-bold text-luxury-navy">Ana Paula Rodrigues</p>
                    <p className="text-luxury-text-muted text-sm">Empresária</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 border-0 shadow-luxury">
              <CardContent>
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-luxury-gold fill-current" />
                  ))}
                </div>
                <p className="text-luxury-text-muted text-lg mb-6 leading-relaxed">
                  "Encontrou meu apartamento dos sonhos em uma oportunidade off-market. 
                  Economizei R$ 300mil e ainda consegui a localização perfeita."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-luxury-navy rounded-full flex items-center justify-center text-white font-bold">
                    C
                  </div>
                  <div>
                    <p className="font-bold text-luxury-navy">Carlos Mendonça</p>
                    <p className="text-luxury-text-muted text-sm">Médico</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Marcus */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                  alt="Marcus Godoy - Personal Shopper Imobiliário"
                  className="rounded-lg shadow-luxury w-full h-96 object-cover"
                />
              </div>
              <div>
                <Badge className="mb-6 bg-luxury-gold text-luxury-navy">
                  Sobre Marcus Godoy
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-6">
                  15 Anos Especializando na Barra da Tijuca
                </h2>
                <div className="space-y-4 text-luxury-text-muted text-lg leading-relaxed">
                  <p>
                    <strong>Formado em Arquitetura e Urbanismo</strong> pela UFRJ, 
                    especializei-me no mercado imobiliário da Barra da Tijuca há mais de uma década.
                  </p>
                  <p>
                    <strong>Já ajudei mais de 120 famílias</strong> a encontrar o imóvel dos sonhos, 
                    sempre representando exclusivamente os interesses do comprador.
                  </p>
                  <p>
                    <strong>Minha missão</strong> é democratizar o acesso à informação no mercado 
                    imobiliário, garantindo que você tenha as mesmas vantagens que os profissionais do setor.
                  </p>
                </div>
                
                <div className="mt-8 flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-luxury-gold">15+</div>
                    <p className="text-sm text-luxury-text-muted">Anos de Experiência</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-luxury-gold">120+</div>
                    <p className="text-sm text-luxury-text-muted">Clientes Atendidos</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-luxury-gold">R$ 50M+</div>
                    <p className="text-sm text-luxury-text-muted">Em Economias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')"
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto Para Economizar Centenas de Milhares?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Agende sua consulta estratégica gratuita e descubra como posso 
            encontrar o imóvel dos seus sonhos pelo melhor preço do mercado.
          </p>
          
          <div className="space-y-4 max-w-xl mx-auto">
            <Button asChild variant="gold" size="xl" className="w-full group shadow-2xl">
              <a 
                href="https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar Consulta Gratuita Agora
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <p className="text-sm text-gray-300">
              ✓ Consulta 100% gratuita ✓ Sem compromisso ✓ Análise personalizada
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-luxury-navy text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Entre em Contato</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-luxury-navy" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Telefone</h3>
                  <p className="text-gray-300">(21) 99999-9999</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-luxury-navy" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-gray-300">marcus@personalshopperimobiliario.com</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-luxury-navy" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Localização</h3>
                  <p className="text-gray-300">Barra da Tijuca, Rio de Janeiro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Marcus Godoy - Personal Shopper Imobiliário. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;