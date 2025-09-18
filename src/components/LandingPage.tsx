import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  MapPin, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle, 
  Star,
  Award,
  TrendingUp,
  Shield,
  Eye,
  Target,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Building2,
  Key,
  Search,
  AlertCircle,
  Zap,
  Heart,
  MessageSquare
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img 
                src="/Logotipo Principal.png" 
                alt="Marcus Godoy" 
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#servicos" className="text-luxury-navy hover:text-luxury-gold transition-colors">
                Serviços
              </a>
              <a href="#sobre" className="text-luxury-navy hover:text-luxury-gold transition-colors">
                Sobre
              </a>
              <a href="#processo" className="text-luxury-navy hover:text-luxury-gold transition-colors">
                Processo
              </a>
              <a href="#contato" className="text-luxury-navy hover:text-luxury-gold transition-colors">
                Contato
              </a>
            </div>
            <Button 
              variant="luxury" 
              size="sm"
              asChild
            >
              <a 
                href="https://calendly.com/marcusgodoy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Agendar Consultoria
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/src/assets/barra-beach-hero.jpg')`,
          }}
        ></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-white border-white/30 bg-white/10 backdrop-blur-sm">
              Personal Shopper Imobiliário Exclusivo da Barra da Tijuca
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Economize <span className="text-luxury-gold">R$ 200-500mil</span><br />
              na sua próxima compra de imóvel
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Representação 100% sua. Acesso a ofertas off-market. Negociação baseada em dados reais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="gold" 
                size="xl" 
                className="min-w-[280px] animate-float"
                asChild
              >
                <a 
                  href="https://calendly.com/marcusgodoy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Consultoria Gratuita
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <p className="text-sm text-white/70">
                ⏰ Agenda limitada - apenas 5 consultorias por mês
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <DollarSign className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />
                <p className="text-sm font-semibold">Economia Média</p>
                <p className="text-xs text-white/70">R$ 350.000</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />
                <p className="text-sm font-semibold">Tempo Economizado</p>
                <p className="text-xs text-white/70">6-8 meses</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Shield className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />
                <p className="text-sm font-semibold">Garantia Total</p>
                <p className="text-xs text-white/70">Sem riscos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-luxury-navy">
              O Problema que Você Enfrenta
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-red-500 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                  <CardTitle className="text-lg text-luxury-navy">Preços Inflacionados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Corretores tradicionais trabalham para o vendedor, não para você. Resultado: preços até 30% acima do valor real.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Clock className="w-8 h-8 text-orange-500 mb-2" />
                  <CardTitle className="text-lg text-luxury-navy">Tempo Perdido</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Meses visitando imóveis inadequados, sem critério técnico ou conhecimento real do mercado da Barra.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Eye className="w-8 h-8 text-yellow-500 mb-2" />
                  <CardTitle className="text-lg text-luxury-navy">Falta de Transparência</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Informações distorcidas sobre histórico de preços, problemas estruturais e potencial de valorização.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-luxury-navy">
                A Solução: Personal Shopper Imobiliário
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pela primeira vez na Barra da Tijuca: um profissional que trabalha exclusivamente para VOCÊ, 
                não para o vendedor.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-luxury-navy">
                  Como Funciona o Personal Shopping Imobiliário
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-luxury-gold rounded-full p-2 flex-shrink-0">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-luxury-navy">Representação Exclusiva do Comprador</h4>
                      <p className="text-gray-600">
                        Trabalho exclusivamente para você, sem conflito de interesses com vendedores ou construtoras.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-luxury-gold rounded-full p-2 flex-shrink-0">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-luxury-navy">Acesso a Ofertas Off-Market</h4>
                      <p className="text-gray-600">
                        Network exclusivo com proprietários e administradoras para imóveis não publicados.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-luxury-gold rounded-full p-2 flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-luxury-navy">Análise Técnica Completa</h4>
                      <p className="text-gray-600">
                        Avaliação de potencial de valorização, histórico de preços e análise técnica do imóvel.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-luxury-gold rounded-full p-2 flex-shrink-0">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-luxury-navy">Negociação Profissional</h4>
                      <p className="text-gray-600">
                        Negociação baseada em dados reais de mercado, não em "feeling" ou pressão de vendas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img 
                  src="/src/assets/barra-beach-luxury.jpg" 
                  alt="Luxury apartments in Barra da Tijuca" 
                  className="rounded-lg shadow-luxury w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-luxury-navy">
              Resultados Reais dos Meus Clientes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white shadow-lg border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-luxury-navy">Apartamento 4 Suítes - Península</CardTitle>
                      <CardDescription>Cliente: Família executiva de São Paulo</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Economia: R$ 420mil
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preço inicial pedido:</span>
                      <span className="font-semibold">R$ 2.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preço negociado:</span>
                      <span className="font-semibold text-green-600">R$ 2.38M</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">Tempo de busca:</span>
                      <span className="font-semibold">45 dias</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-luxury-navy">Cobertura - Barra Prime</CardTitle>
                      <CardDescription>Cliente: Empresário do Rio de Janeiro</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Economia: R$ 280mil
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preço inicial pedido:</span>
                      <span className="font-semibold">R$ 1.95M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preço negociado:</span>
                      <span className="font-semibold text-blue-600">R$ 1.67M</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">Tempo de busca:</span>
                      <span className="font-semibold">32 dias</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-luxury-gold/10 rounded-full px-8 py-4 mb-8">
                <TrendingUp className="w-6 h-6 text-luxury-gold" />
                <div className="text-left">
                  <p className="text-lg font-bold text-luxury-navy">Economia Média: R$ 350.000</p>
                  <p className="text-sm text-gray-600">Baseado em 27 transações nos últimos 18 meses</p>
                </div>
              </div>
              
              <Button 
                variant="gold" 
                size="xl"
                asChild
              >
                <a 
                  href="https://calendly.com/marcusgodoy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Consultoria Gratuita
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="processo" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-luxury-navy">
              Meu Processo em 5 Etapas
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-luxury-gold text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-luxury-navy">Consultoria Gratuita (45min)</h3>
                  <p className="text-gray-600 mb-4">
                    Entendo suas necessidades, orçamento, timeline e critérios específicos. Defino estratégia personalizada.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Presencial ou Online</Badge>
                    <Badge variant="outline">Sem Compromisso</Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-luxury-gold text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-luxury-navy">Mapeamento Completo do Mercado</h3>
                  <p className="text-gray-600 mb-4">
                    Análise de todas as opções disponíveis, incluindo off-market. Relatório detalhado com preços históricos.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Análise Técnica</Badge>
                    <Badge variant="outline">Ofertas Exclusivas</Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-luxury-gold text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-luxury-navy">Visitas Estratégicas</h3>
                  <p className="text-gray-600 mb-4">
                    Agenda otimizada visitando apenas imóveis pre-qualificados. Análise técnica durante cada visita.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Roteiro Otimizado</Badge>
                    <Badge variant="outline">Análise Técnica</Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-luxury-gold text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-luxury-navy">Negociação Profissional</h3>
                  <p className="text-gray-600 mb-4">
                    Estratégia de negociação baseada em dados reais. Condução de todas as tratativas até o fechamento.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Baseado em Dados</Badge>
                    <Badge variant="outline">Máxima Economia</Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-luxury-gold text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-luxury-navy">Acompanhamento até as Chaves</h3>
                  <p className="text-gray-600 mb-4">
                    Suporte completo na documentação, financiamento e entrega. Garantia pós-venda por 6 meses.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Suporte Completo</Badge>
                    <Badge variant="outline">Garantia 6 meses</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-luxury-navy">
                  Marcus Godoy
                </h2>
                <p className="text-xl text-luxury-gold mb-6 font-semibold">
                  O Primeiro Personal Shopper Imobiliário da Barra da Tijuca
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-luxury-navy">12 anos de experiência exclusiva na Barra</p>
                      <p className="text-gray-600 text-sm">Especialista em imóveis de alto padrão da região</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-luxury-navy">R$ 87 milhões em transações</p>
                      <p className="text-gray-600 text-sm">Mais de 150 famílias atendidas com sucesso</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-luxury-navy">Metodologia exclusiva de buyer agent</p>
                      <p className="text-gray-600 text-sm">Primeira consultoria certificada em buyer representation do RJ</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-luxury-navy">98% de satisfação dos clientes</p>
                      <p className="text-gray-600 text-sm">Baseado em pesquisa pós-transação dos últimos 24 meses</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-luxury-navy mb-3">Por que criei o Personal Shopping Imobiliário?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "Após anos vendo clientes pagarem mais do que deveriam e perderem tempo precioso, 
                    decidi criar um serviço que finalmente colocasse o comprador em primeiro lugar. 
                    Aqui, eu trabalho exclusivamente para você - não para construtoras ou vendedores."
                  </p>
                </div>
              </div>

              <div className="relative">
                <img 
                  src="/src/assets/marcus-profile.jpg" 
                  alt="Marcus Godoy - Personal Shopper Imobiliário" 
                  className="rounded-lg shadow-luxury w-full h-[600px] object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-luxury-gold" />
                    <span className="font-semibold text-luxury-navy">Avaliação dos Clientes</span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    "Profissional excepcional. Economizamos R$ 380mil na compra do nosso apartamento."
                    <br />
                    <span className="text-xs">- Família Silva, Peninsula</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-luxury-navy">
              Serviços Disponíveis
            </h2>

            <Tabs defaultValue="compra" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
                <TabsTrigger value="compra" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Compra de Imóvel
                </TabsTrigger>
                <TabsTrigger value="investimento" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Investimento
                </TabsTrigger>
                <TabsTrigger value="consultoria" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Consultoria
                </TabsTrigger>
              </TabsList>

              <TabsContent value="compra" className="space-y-6">
                <Card className="overflow-hidden">
                  <CardHeader className="bg-luxury-navy text-white">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Home className="w-6 h-6" />
                      Personal Shopping para Compra de Imóvel
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Serviço completo para encontrar e comprar seu imóvel ideal na Barra da Tijuca
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-bold mb-4 text-luxury-navy">O que está incluído:</h3>
                        <ul className="space-y-2">
                          {[
                            "Consultoria inicial gratuita (45min)",
                            "Mapeamento completo do mercado",
                            "Acesso a ofertas off-market exclusivas",
                            "Análise técnica de cada imóvel",
                            "Visitas estratégicas acompanhadas",
                            "Negociação profissional",
                            "Due diligence completa",
                            "Acompanhamento até as chaves",
                            "Garantia pós-venda (6 meses)"
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                          <h4 className="font-bold text-luxury-navy mb-2">Investimento</h4>
                          <p className="text-2xl font-bold text-luxury-gold mb-2">3% sobre o valor do imóvel</p>
                          <p className="text-sm text-gray-600 mb-4">Pagamento apenas no fechamento da compra</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            ✓ Sem riscos - Só paga se comprar
                          </Badge>
                        </div>
                        <div className="bg-luxury-gold/10 rounded-lg p-4">
                          <h4 className="font-bold text-luxury-navy mb-2">Economia Típica</h4>
                          <p className="text-lg font-bold text-luxury-gold">R$ 200.000 - R$ 500.000</p>
                          <p className="text-xs text-gray-600">ROI médio de 10:1 sobre o investimento</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="investimento" className="space-y-6">
                <Card className="overflow-hidden">
                  <CardHeader className="bg-luxury-gold text-white">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <TrendingUp className="w-6 h-6" />
                      Consultoria para Investimento Imobiliário
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Identificação de oportunidades de investimento com alto potencial de retorno
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-bold mb-4 text-luxury-navy">Ideal para:</h3>
                        <ul className="space-y-2 mb-6">
                          {[
                            "Investidores buscando renda passiva",
                            "Diversificação de portfólio",
                            "Proteção contra inflação",
                            "Aposentadoria através de imóveis",
                            "Multiplicação de patrimônio"
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-bold text-luxury-navy mb-2">Resultados Típicos</h4>
                          <p className="text-sm text-gray-600">• Yield de 6-8% ao ano</p>
                          <p className="text-sm text-gray-600">• Valorização de 8-12% ao ano</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-4 text-luxury-navy">Serviços inclusos:</h3>
                        <ul className="space-y-2">
                          {[
                            "Análise de mercado e tendências",
                            "Identificação de oportunidades",
                            "Cálculo de rentabilidade (ROI, Yield)",
                            "Análise de potencial de valorização",
                            "Estruturação da operação",
                            "Negociação especializada",
                            "Acompanhamento do investimento"
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="consultoria" className="space-y-6">
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gray-800 text-white">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <MessageSquare className="w-6 h-6" />
                      Consultoria Pontual
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Orientação especializada para decisões específicas sobre imóveis na Barra
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-lg">Avaliação de Imóvel</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm mb-4">
                            Análise completa de um imóvel específico que você já identificou.
                          </p>
                          <p className="text-xl font-bold text-luxury-gold mb-2">R$ 800</p>
                          <ul className="text-xs space-y-1">
                            <li>• Análise de preço vs. mercado</li>
                            <li>• Potencial de valorização</li>
                            <li>• Pontos de atenção</li>
                            <li>• Relatório detalhado</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-lg">Orientação de Compra</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm mb-4">
                            Consultoria estratégica para sua decisão de compra na Barra.
                          </p>
                          <p className="text-xl font-bold text-luxury-gold mb-2">R$ 1.200</p>
                          <ul className="text-xs space-y-1">
                            <li>• Sessão de 90 minutos</li>
                            <li>• Análise do seu perfil</li>
                            <li>• Estratégia personalizada</li>
                            <li>• Plano de ação</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-lg">Due Diligence</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm mb-4">
                            Verificação completa da documentação e situação do imóvel.
                          </p>
                          <p className="text-xl font-bold text-luxury-gold mb-2">R$ 1.500</p>
                          <ul className="text-xs space-y-1">
                            <li>• Análise documental</li>
                            <li>• Verificação legal</li>
                            <li>• Check-list completo</li>
                            <li>• Parecer final</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-luxury-navy">
              Perguntas Frequentes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-luxury-navy">Como você é remunerado?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Recebo 3% sobre o valor final do imóvel, pago apenas quando você compra. 
                    Sem riscos para você - se não fechar negócio, não há cobrança.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-luxury-navy">Qual a garantia de economia?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Baseado no histórico, 98% dos clientes economizam mais que o valor investido. 
                    Se não conseguir economia mínima de 10% do valor pago, devolvo integralmente.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-luxury-navy">Quanto tempo leva o processo?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Em média 45-60 dias da primeira consultoria até as chaves. 
                    Casos urgentes podem ser resolvidos em 30 dias com dedicação exclusiva.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-luxury-navy">Trabalha com financiamento?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sim! Tenho parceria com os principais bancos e assessoro todo o processo, 
                    incluindo negociação de taxa e agilização da aprovação.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-luxury-navy">Atende apenas a Barra da Tijuca?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sou especialista exclusivo da Barra da Tijuca e Recreio. 
                    Essa especialização me permite conhecer profundamente o mercado local.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-luxury-navy">E se eu não gostar de nenhuma opção?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sem problemas! O serviço é orientado por resultados. 
                    Continuamos buscando até encontrar o imóvel perfeito para você.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-luxury-navy text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para Economizar na Sua Próxima Compra?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Agende uma consultoria gratuita e descubra quanto você pode economizar
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <DollarSign className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />
                  <p className="text-2xl font-bold mb-1">R$ 350mil</p>
                  <p className="text-sm text-white/70">Economia Média</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />
                  <p className="text-2xl font-bold mb-1">45 dias</p>
                  <p className="text-sm text-white/70">Tempo Médio</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />
                  <p className="text-2xl font-bold mb-1">98%</p>
                  <p className="text-sm text-white/70">Satisfação</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                variant="gold" 
                size="xl" 
                className="min-w-[300px] animate-float"
                asChild
              >
                <a 
                  href="https://calendly.com/marcusgodoy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Consultoria Gratuita
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              
              <p className="text-sm text-white/60">
                ⚡ Resposta em até 2 horas • 📅 Agenda limitada • ✅ Sem compromisso
              </p>
              
              <div className="pt-4 border-t border-white/20">
                <p className="text-white/80 mb-2">Ou entre em contato diretamente:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href="https://wa.me/5521964075124" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/90 hover:text-luxury-gold transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    (21) 96407-5124
                  </a>
                  <span className="text-white/40 hidden sm:block">•</span>
                  <a 
                    href="mailto:contato@marcusgodoy.com" 
                    className="flex items-center gap-2 text-white/90 hover:text-luxury-gold transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    contato@marcusgodoy.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <img 
              src="/Logotipo Negativo 01.png" 
              alt="Marcus Godoy" 
              className="h-12 mx-auto mb-6"
            />
            <p className="text-gray-400 mb-6">
              Personal Shopper Imobiliário Exclusivo da Barra da Tijuca
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <span>© 2024 Marcus Godoy</span>
              <span>•</span>
              <span>Todos os direitos reservados</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;