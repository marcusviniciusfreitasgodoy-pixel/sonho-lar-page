import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, Star, MapPin, Shield, Award, Clock, TrendingUp, Home, Phone, Mail } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <Badge className="mb-6 bg-luxury-gold text-luxury-navy font-semibold">
            Personal Shopper Imobiliário Exclusivo da Barra da Tijuca
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Economize <span className="text-luxury-gold">R$ 200-500mil</span> na sua próxima compra de imóvel de luxo
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Representação 100% sua, sem conflito de interesses. Acesso exclusivo a ofertas off-market e negociação baseada em dados reais do mercado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              className="bg-gradient-gold text-luxury-navy hover:bg-accent shadow-gold transition-all duration-300 hover:scale-105 w-full sm:w-auto h-10 sm:h-14 rounded-lg px-6 sm:px-10 text-sm sm:text-lg font-semibold"
              onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
            >
              Consultoria Exclusiva Gratuita
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Check className="w-4 h-4 text-luxury-gold" />
            Consulta 100% gratuita e sem compromisso
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white text-luxury-navy">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Por que você está <span className="text-red-600">perdendo dinheiro</span> na compra do seu imóvel?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-red-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Corretor trabalha para o vendedor</h3>
                <p className="text-gray-600">
                  85% dos corretores recebem comissão do vendedor. Quem você acha que eles estão representando?
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-red-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Falta de informação do mercado</h3>
                <p className="text-gray-600">
                  Você não tem acesso aos dados reais de vendas comparáveis para negociar com propriedade.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-red-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ofertas ocultas</h3>
                <p className="text-gray-600">
                  70% dos melhores imóveis nunca são anunciados publicamente. Você só vê o que sobra.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-luxury-navy text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            A solução: <span className="text-luxury-gold">Personal Shopper Imobiliário</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-luxury-navy-light border-luxury-gold">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-luxury-navy" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">100% do seu lado</h3>
                <p className="text-gray-300">
                  Representação exclusiva do comprador. Minha comissão vem de você, não do vendedor.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-luxury-navy-light border-luxury-gold">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-luxury-navy" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Acesso exclusivo</h3>
                <p className="text-gray-300">
                  Network com os principais players da Barra para ofertas off-market e pré-lançamentos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-luxury-navy-light border-luxury-gold">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-luxury-navy" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Dados reais</h3>
                <p className="text-gray-300">
                  Análise de mercado com dados de vendas reais para negociação fundamentada.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-luxury-gold text-luxury-navy text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pare de perder dinheiro. Comece a economizar hoje.
          </h2>
          
          <p className="text-xl mb-8">
            Agenda uma consulta gratuita e descubra quanto você pode economizar na sua próxima compra.
          </p>
          
          <Button 
            className="bg-luxury-navy text-white hover:bg-luxury-navy-light shadow-luxury transition-all duration-300 hover:scale-105 w-full sm:w-auto h-10 sm:h-14 rounded-lg px-6 sm:px-10 text-sm sm:text-lg font-semibold"
            onClick={() => window.open('https://calendly.com/personalshopperimobiliario/entrevista-personal-shopper-imobiliario', '_blank')}
          >
            Agendar Consulta Gratuita
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white text-luxury-navy">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Como funciona o Personal Shopper Imobiliário?</AccordionTrigger>
              <AccordionContent>
                Trabalho exclusivamente para você, o comprador. Encontro o imóvel ideal, nego o melhor preço e cuido de todo o processo de compra. Minha remuneração vem de você, não do vendedor, garantindo total alinhamento de interesses.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Qual o valor do investimento?</AccordionTrigger>
              <AccordionContent>
                Meus honorários são uma porcentagem do valor economizado na negociação. Se eu não conseguir uma economia significativa, você não paga. É um modelo win-win: você só paga se realmente economizar.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Por que focar só na Barra da Tijuca?</AccordionTrigger>
              <AccordionContent>
                Especialização é a chave do sucesso. Conheço cada edifício, cada construtora, cada movimento do mercado na Barra. Esse conhecimento profundo me permite encontrar as melhores oportunidades e negociar com propriedade.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Como posso ter certeza que vai funcionar?</AccordionTrigger>
              <AccordionContent>
                Ofereço garantia de economia mínima. Se eu não conseguir uma economia de pelo menos 10% do valor inicial pedido pelo vendedor, você não paga meus honorários. É meu compromisso com o seu resultado.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-luxury-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">Marcus Godoy</h3>
          <p className="text-gray-300 mb-6">Personal Shopper Imobiliário - Barra da Tijuca</p>
          
          <div className="flex justify-center space-x-6 mb-6">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">Barra da Tijuca, RJ</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">(21) 99999-9999</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">marcus@personalshopperimobiliario.com</span>
            </div>
          </div>
          
          <div className="border-t border-luxury-navy-light pt-6">
            <p className="text-gray-400 text-sm">
              © 2024 Marcus Godoy - Personal Shopper Imobiliário. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;