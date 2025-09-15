import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Shield, 
  TrendingUp, 
  Users, 
  Star, 
  CheckCircle, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  Target,
  Award,
  Zap,
  Heart,
  Building,
  DollarSign,
  Eye,
  Search,
  UserCheck,
  ArrowRight
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop')"
          }}
        ></div>
        
        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-6 bg-luxury-gold/20 text-luxury-gold border-luxury-gold/30 px-6 py-2 text-sm font-medium">
              Personal Shopper Imobiliário Exclusivo da Barra da Tijuca
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Economize até
              <span className="text-luxury-gold block mt-2">R$ 500 mil</span>
              na compra do seu imóvel dos sonhos
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Representação 100% sua, sem conflito de interesses. Acesso a ofertas off-market e negociação baseada em dados reais do mercado.
            </p>
            
            <div className="space-y-4">
              <Button 
                className="bg-gradient-gold text-luxury-navy hover:bg-accent shadow-gold transition-all duration-300 hover:scale-105 w-full sm:w-auto h-10 sm:h-14 rounded-lg px-6 sm:px-10 text-sm sm:text-lg font-semibold mb-4"
                onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
              >
                Desbloquear minha Consultoria Exclusiva
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-sm text-gray-300">
                ✓ Consultoria gratuita de 60 minutos • ✓ Análise de mercado personalizada • ✓ Sem compromisso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Você está <span className="text-red-600">perdendo dinheiro</span> na compra do seu imóvel
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Sem representação adequada, compradores pagam em média 15-25% a mais do que deveriam
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 border-red-200 bg-red-50">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Preços Inflacionados</h3>
                <p className="text-gray-600">Corretores tradicionais trabalham para o vendedor, não para você. Resultado: você paga mais caro.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-red-200 bg-red-50">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Informações Limitadas</h3>
                <p className="text-gray-600">Sem acesso aos dados reais do mercado, você toma decisões baseadas em especulação.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-red-200 bg-red-50">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Oportunidades Perdidas</h3>
                <p className="text-gray-600">Os melhores imóveis são vendidos off-market, antes mesmo de serem anunciados publicamente.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              A Solução: <span className="text-luxury-gold">Personal Shopper Imobiliário</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Representação exclusiva do comprador com acesso privilegiado ao mercado da Barra da Tijuca
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 border-luxury-gold/20 bg-luxury-cream">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-8 w-8 text-luxury-gold" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">100% do Seu Lado</h3>
                <p className="text-gray-600">Representação exclusiva do comprador. Meu sucesso depende da sua economia, não da venda cara.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-luxury-gold/20 bg-luxury-cream">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-luxury-gold" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Dados Reais do Mercado</h3>
                <p className="text-gray-600">Acesso a análises detalhadas de preços, histórico de vendas e tendências do mercado da Barra.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-luxury-gold/20 bg-luxury-cream">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-luxury-gold" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Acesso Off-Market</h3>
                <p className="text-gray-600">Rede exclusiva de contatos que me permite apresentar oportunidades antes da concorrência.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Resultados Comprovados
            </h2>
            <p className="text-xl text-gray-600">
              Economia real para meus clientes na Barra da Tijuca
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <Card className="p-8 text-center border-luxury-gold/20">
              <CardContent>
                <div className="text-4xl font-bold text-luxury-gold mb-2">R$ 420K</div>
                <div className="text-gray-600 mb-4">Economia média por cliente</div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 text-center border-luxury-gold/20">
              <CardContent>
                <div className="text-4xl font-bold text-luxury-gold mb-2">95%</div>
                <div className="text-gray-600 mb-4">Taxa de satisfação</div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 text-center border-luxury-gold/20">
              <CardContent>
                <div className="text-4xl font-bold text-luxury-gold mb-2">30+</div>
                <div className="text-gray-600 mb-4">Clientes atendidos em 2024</div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-6">
              <CardContent>
                <div className="flex items-start mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Marcus me ajudou a economizar R$ 380 mil na compra do meu apartamento no Condomínio Atmosfera. 
                  Ele tinha acesso a dados que eu nunca conseguiria sozinho e negociou um preço muito melhor."
                </p>
                <div className="font-semibold text-gray-900">Roberto Silva</div>
                <div className="text-sm text-gray-600">Empresário, Atmosfera</div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="flex items-start mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Encontrou um imóvel off-market perfeito para nossa família. Conseguimos fechar por R$ 450 mil 
                  a menos do que estava sendo pedido inicialmente. Serviço excepcional!"
                </p>
                <div className="font-semibold text-gray-900">Carla Montenegro</div>
                <div className="text-sm text-gray-600">Médica, Le Parc</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-luxury text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pronto para Economizar na Sua Próxima Compra?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Agende uma consultoria gratuita de 60 minutos e descubra quanto você pode economizar
            </p>
            
            <Button 
              className="bg-gradient-gold text-luxury-navy hover:bg-accent shadow-gold transition-all duration-300 hover:scale-105 w-full sm:w-auto h-10 sm:h-14 rounded-lg px-6 sm:px-10 text-sm sm:text-lg font-semibold mb-6"
              onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
            >
              Agendar Consultoria Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="text-sm text-gray-300">
              ✓ Sem compromisso • ✓ Análise personalizada • ✓ Consultoria de 60 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-luxury-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4">Marcus Godoy</h3>
              <p className="text-gray-300 mb-4">
                Personal Shopper Imobiliário especializado na Barra da Tijuca
              </p>
              <div className="flex space-x-4">
                <Phone className="h-5 w-5" />
                <span className="text-gray-300">+55 21 99999-9999</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Serviços</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Personal Shopper Imobiliário</li>
                <li>Análise de Mercado</li>
                <li>Negociação Especializada</li>
                <li>Acesso Off-Market</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Área de Atuação</h3>
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-gray-300">Barra da Tijuca, Rio de Janeiro</span>
              </div>
              <p className="text-gray-300">
                Especialista exclusivo na região da Barra da Tijuca
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 Marcus Godoy - Personal Shopper Imobiliário. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;