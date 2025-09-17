import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  TrendingUp, 
  Eye, 
  DollarSign, 
  Clock, 
  Award,
  Check,
  Star,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Minus
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero text-white">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/Logotipo Negativo 01.png" alt="Marcus Godoy" className="h-12 w-auto" />
          </div>
          <div className="flex items-center space-x-6">
            <a href="#servicos" className="text-white/80 hover:text-white transition-colors">Serviços</a>
            <a href="#sobre" className="text-white/80 hover:text-white transition-colors">Sobre</a>
            <a href="#contato" className="text-white/80 hover:text-white transition-colors">Contato</a>
            <Button variant="luxury-outline" size="sm">
              Consulta Gratuita
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in">
              Personal Shopper <span className="text-luxury-gold">Imobiliário</span>
              <br />
              <span className="text-3xl md:text-5xl">Barra da Tijuca</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-slide-up">
              Economize <span className="text-luxury-gold font-bold">R$ 200-500mil</span> na sua próxima compra de imóvel de luxo. 
              Representação 100% sua, sem conflito de interesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button variant="gold" size="xl" className="animate-slide-up">
                Consulta Gratuita
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button variant="luxury-outline" size="xl" className="animate-slide-up">
                Como Funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white text-luxury-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              O Mercado Imobiliário de Luxo tem <span className="text-red-600">3 Problemas Graves</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <Card className="border-2 border-red-100 hover:border-red-300 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <DollarSign className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-red-600">Você paga mais caro</h3>
                  <p className="text-gray-600">
                    Corretores trabalham para o vendedor. Quanto mais alto o preço, maior a comissão dele. 
                    Conflito de interesses óbvio.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-100 hover:border-red-300 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <Eye className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-red-600">Informações limitadas</h3>
                  <p className="text-gray-600">
                    Você vê apenas o que está no portfólio da imobiliária. 85% das melhores ofertas 
                    circulam apenas entre especialistas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-100 hover:border-red-300 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-red-600">Tempo perdido</h3>
                  <p className="text-gray-600">
                    Meses visitando imóveis inadequados, negociações amadoras e processos burocráticos 
                    que poderiam ser evitados.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-red-600 mb-4">
                O Resultado? Você perde dinheiro, tempo e oportunidades únicas.
              </h3>
              <p className="text-lg text-gray-700">
                No mercado de luxo da Barra, uma decisão errada pode custar centenas de milhares. 
                Não é hora de apostar no amadorismo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-luxury text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              A Solução: <span className="text-luxury-gold">Personal Shopper Imobiliário</span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Trabalho exclusivamente para VOCÊ. Minha comissão vem do vendedor, 
              mas minha lealdade é 100% sua.
            </p>

            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <Card className="bg-white/10 backdrop-blur-md border-luxury-gold/30 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-8 h-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-luxury-gold">Representação Exclusiva</h3>
                  <p className="text-white/80">
                    Sou SEU representante. Negocio sempre o menor preço. Quanto menos você pagar, 
                    melhor para ambos.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-luxury-gold/30 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto">
                    <Eye className="w-8 h-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-luxury-gold">Acesso Total ao Mercado</h3>
                  <p className="text-white/80">
                    Rede de contatos com todas as imobiliárias + ofertas off-market que só circulam 
                    entre especialistas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-luxury-gold/30 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="w-8 h-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-luxury-gold">Economia Garantida</h3>
                  <p className="text-white/80">
                    Clientes economizam entre R$ 200-500mil. Análise de mercado baseada em dados reais, 
                    não em "achismos".
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="servicos" className="py-20 bg-white text-luxury-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Como o <span className="text-luxury-gold">Personal Shopper Imobiliário</span> Funciona
            </h2>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 space-y-4 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="text-2xl font-bold">Consulta Gratuita de Estratégia</h3>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Definimos seu perfil ideal, orçamento real e estratégia de compra. 
                    Sem enrolação, direto ao ponto.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <Card className="border-luxury-gold/20 shadow-luxury">
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Análise de perfil</span>
                          <Check className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex justify-between">
                          <span>Definição de orçamento</span>
                          <Check className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex justify-between">
                          <span>Estratégia personalizada</span>
                          <Check className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="md:w-1/2 space-y-4 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h3 className="text-2xl font-bold">Curadoria Exclusiva de Imóveis</h3>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Acesso a 100% do mercado: MLS, ofertas off-market e oportunidades 
                    que só circulam entre especialistas.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <Card className="border-luxury-gold/20 shadow-luxury">
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Todas as imobiliárias</span>
                          <Eye className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="flex justify-between">
                          <span>Ofertas off-market</span>
                          <Shield className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="flex justify-between">
                          <span>Oportunidades exclusivas</span>
                          <Award className="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 space-y-4 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h3 className="text-2xl font-bold">Negociação e Fechamento Estratégico</h3>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Negocio o menor preço possível. Cuido de toda burocracia. 
                    Você só assina quando tudo estiver perfeito.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <Card className="border-luxury-gold/20 shadow-luxury">
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Negociação agressiva</span>
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex justify-between">
                          <span>Documentação completa</span>
                          <Check className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex justify-between">
                          <span>Suporte pós-venda</span>
                          <Shield className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-luxury text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Resultados <span className="text-luxury-gold">Reais</span> de Clientes Reais
            </h2>

            <div className="grid md:grid-cols-2 gap-8 pt-8">
              <Card className="bg-white/10 backdrop-blur-md border-luxury-gold/30">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-5 h-5 text-luxury-gold fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic">
                    "Marcus encontrou meu apartamento dos sonhos no Península por R$ 380mil abaixo 
                    do valor de tabela. Economia que pagou 3 anos de condomínio!"
                  </blockquote>
                  <div className="text-luxury-gold font-semibold">
                    - Patricia M., Empresária
                  </div>
                  <div className="bg-luxury-gold/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-luxury-gold">R$ 380.000</div>
                    <div className="text-sm">Economia na compra</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-luxury-gold/30">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-5 h-5 text-luxury-gold fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic">
                    "Em 2 semanas tinha 5 opções perfeitas para meu perfil. Fechei uma cobertura 
                    que nem estava no mercado aberto. Processo impecável."
                  </blockquote>
                  <div className="text-luxury-gold font-semibold">
                    - Roberto K., Médico
                  </div>
                  <div className="bg-luxury-gold/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-luxury-gold">14 dias</div>
                    <div className="text-sm">Para encontrar o imóvel ideal</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-luxury-gold/30">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-5 h-5 text-luxury-gold fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic">
                    "Estava há 8 meses procurando. Com Marcus, em 1 mês fechei negócio. 
                    A diferença é trabalhar com quem entende do mercado de verdade."
                  </blockquote>
                  <div className="text-luxury-gold font-semibold">
                    - Carla S., Advogada
                  </div>
                  <div className="bg-luxury-gold/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-luxury-gold">R$ 250.000</div>
                    <div className="text-sm">Economia na negociação</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-luxury-gold/30">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-5 h-5 text-luxury-gold fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic">
                    "Profissionalismo total. Marcus cuidou de cada detalhe, da visita à escritura. 
                    Comprei minha primeira cobertura sem stress nenhum."
                  </blockquote>
                  <div className="text-luxury-gold font-semibold">
                    - Eduardo F., Engenheiro
                  </div>
                  <div className="bg-luxury-gold/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-luxury-gold">Zero</div>
                    <div className="text-sm">Problemas pós-compra</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-luxury-gold/20 backdrop-blur-md rounded-xl p-8 border border-luxury-gold/30">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-luxury-gold mb-2">R$ 15M+</div>
                  <div className="text-white/80">Em negócios fechados</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-luxury-gold mb-2">47</div>
                  <div className="text-white/80">Clientes atendidos</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-luxury-gold mb-2">R$ 320K</div>
                  <div className="text-white/80">Economia média por cliente</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-white text-luxury-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/3">
                <img 
                  src="/src/assets/marcus-profile.jpg" 
                  alt="Marcus Godoy" 
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-luxury"
                />
              </div>
              <div className="lg:w-2/3 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Marcus Godoy
                </h2>
                <h3 className="text-2xl text-luxury-gold font-semibold">
                  Personal Shopper Imobiliário Especialista na Barra da Tijuca
                </h3>
                
                <div className="space-y-4 text-lg text-gray-600">
                  <p>
                    <strong>8 anos</strong> de mercado imobiliário de luxo. Especialista exclusivo na Barra da Tijuca, 
                    o bairro de maior valorização do Rio de Janeiro.
                  </p>
                  <p>
                    Diferente dos corretores tradicionais, trabalho como Personal Shopper Imobiliário: 
                    <strong>minha lealdade é 100% do comprador</strong>, não do vendedor.
                  </p>
                  <p>
                    Acesso privilegiado a ofertas off-market, relacionamento com todas as imobiliárias 
                    da região e estratégias de negociação que economizam centenas de milhares.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-6">
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6 text-luxury-gold" />
                    <span>Especialista Barra da Tijuca</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-luxury-gold" />
                    <span>Representação exclusiva do comprador</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6 text-luxury-gold" />
                    <span>R$ 15M+ em negócios fechados</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Eye className="w-6 h-6 text-luxury-gold" />
                    <span>Acesso a ofertas off-market</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-luxury text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center">
              <span className="text-luxury-gold">VISÃO DE FUTURO</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-center">
              Seu Futuro na Barra: Uma Conquista, Não uma Busca Sem Fim.
            </h3>
            
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-md border-luxury-gold/30">
                <CardContent className="p-8 text-center space-y-4">
                  <p className="text-lg text-center">
                    Imagine: em doze meses, você não busca mais. Você desfruta de sua residência de alto padrão na Barra. É o auge de uma compra estratégica e sem estresse.
                  </p>
                  <p className="text-lg text-center">
                    A paisagem exclusiva é um lembrete de sua decisão inteligente. Amigos, admirados, perguntam como sua escolha foi fácil e precisa. Você sorri, sabendo que Marcus Godoy estava ao seu lado.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-red-900/20 backdrop-blur-md border-red-400/30">
                <CardContent className="p-8 text-center space-y-4">
                  <p className="text-lg text-center">
                    Em contraste, quem segue no processo Tradicional continua em visitas inúteis, negociações ruins e problemas pós-compra.
                  </p>
                  <p className="text-lg text-center">
                    Sem a blindagem que você teve, sem acesso a ofertas ocultas, sem um defensor leal, o custo é enorme.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-luxury-gold/20 backdrop-blur-md border-luxury-gold/50">
                <CardContent className="p-8 text-center space-y-4">
                  <p className="text-lg text-center">
                    Ao invés de descobrir que pagou mais caro, seu imóvel é um ativo que já valorizou e a economia que teve na hora da compra, são a prova de uma parceria que vai além.
                  </p>
                </CardContent>
              </Card>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-luxury-gold/30">
                <h3 className="text-2xl font-bold text-luxury-gold mb-4 text-center">
                  O Ponto de Virada É Agora: Ficar parado no mercado de luxo é perder. Boas ofertas são rápidas. Sem um representante exclusivo, o risco é alto.
                </h3>
                <p className="text-xl text-center">
                  Onde você estará em um ano? Desfrutando de seu imóvel perfeito, ou ainda no mar de incertezas?
                </p>
              </div>
            </div>

            <div className="bg-blue-900/20 backdrop-blur-md rounded-xl p-6 border border-blue-400/30 italic text-blue-200">
              <p className="text-center">
                "Saber exatamente quanto vale o imóvel que você quer antes mesmo de fazer a oferta. Ter acesso a propriedades exclusivas que só circulam entre especialistas. Saber a valorização real daquela região antes de investir. E como jogar pôquer vendo as cartas dos outros jogadores."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white text-luxury-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Perguntas <span className="text-luxury-gold">Frequentes</span>
            </h2>

            <div className="space-y-6">
              <Card className="border-luxury-gold/20 hover:border-luxury-gold/40 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <Minus className="w-5 h-5 mr-2 text-luxury-gold" />
                    Como você ganha dinheiro se trabalha para o comprador?
                  </h3>
                  <p className="text-gray-600 ml-7">
                    Recebo comissão do vendedor (padrão do mercado), mas minha representação é exclusiva do comprador. 
                    É o mesmo modelo dos Personal Shoppers de outros setores: pago pelo fornecedor, leal ao cliente.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-luxury-gold/20 hover:border-luxury-gold/40 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <Minus className="w-5 h-5 mr-2 text-luxury-gold" />
                    Por que você cobra consulta se ganha comissão?
                  </h3>
                  <p className="text-gray-600 ml-7">
                    A primeira consulta é GRATUITA. Cobraria apenas se você decidisse por um acompanhamento 
                    mais longo sem fechar negócio. Meu foco é fechar bons negócios, não cobrar consultas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-luxury-gold/20 hover:border-luxury-gold/40 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <Minus className="w-5 h-5 mr-2 text-luxury-gold" />
                    Qual a diferença real para um corretor comum?
                  </h3>
                  <p className="text-gray-600 ml-7">
                    Corretor trabalha para quem paga (vendedor). Eu trabalho para VOCÊ. 
                    Acesso total ao mercado vs portfólio limitado. Negociação agressiva vs "facilitar a venda".
                  </p>
                </CardContent>
              </Card>

              <Card className="border-luxury-gold/20 hover:border-luxury-gold/40 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <Minus className="w-5 h-5 mr-2 text-luxury-gold" />
                    Como posso ter certeza que vou economizar?
                  </h3>
                  <p className="text-gray-600 ml-7">
                    Análise comparativa de mercado baseada em dados reais. Histórico de 47 clientes com economia 
                    média de R$ 320mil. Se não economizar no mínimo R$ 100mil, trabalho é gratuito.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-luxury-gold/20 hover:border-luxury-gold/40 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <Minus className="w-5 h-5 mr-2 text-luxury-gold" />
                    Quanto tempo leva o processo completo?
                  </h3>
                  <p className="text-gray-600 ml-7">
                    Em média 45-60 dias da primeira consulta até as chaves. Casos urgentes podem ser resolvidos 
                    em 15-30 dias. Depende do seu perfil e disponibilidade de ofertas adequadas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-luxury-gold/20 hover:border-luxury-gold/40 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <Minus className="w-5 h-5 mr-2 text-luxury-gold" />
                    E se eu não encontrar nada que me interesse?
                  </h3>
                  <p className="text-gray-600 ml-7">
                    Raro, mas pode acontecer em perfis muito específicos. Nesse caso, você não paga nada. 
                    Só cobro quando você fecha um excelente negócio.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-luxury text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Pronto para Encontrar Seu <span className="text-luxury-gold">Imóvel dos Sonhos</span> 
              na Barra?
            </h2>
            
            <p className="text-xl text-white/90">
              Consulta estratégica gratuita de 45 minutos. 
              Vamos definir seu perfil ideal e estratégia de compra.
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-luxury-gold/30">
              <h3 className="text-2xl font-bold text-luxury-gold mb-6">
                O que você vai descobrir na consulta gratuita:
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                  <span>Seu perfil de imóvel ideal baseado no seu estilo de vida</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                  <span>Análise de mercado da Barra com dados atuais</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                  <span>Estratégia de negociação para seu orçamento</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                  <span>Acesso a ofertas off-market exclusivas</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button variant="gold" size="xl">
                <Phone className="w-5 h-5 mr-2" />
                Agendar Consulta Gratuita
              </Button>
              <Button variant="luxury-outline" size="xl">
                <Mail className="w-5 h-5 mr-2" />
                Enviar WhatsApp
              </Button>
            </div>

            <div className="text-sm text-white/70">
              Resposta em até 2 horas • Consulta por videochamada ou presencial na Barra
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-white text-luxury-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Entre em <span className="text-luxury-gold">Contato</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-luxury-gold/20 hover:border-luxury-gold/40 transition-all hover:shadow-luxury">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-8 h-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-bold">Telefone & WhatsApp</h3>
                  <p className="text-gray-600">
                    (21) 99999-9999
                  </p>
                  <Button variant="luxury-outline" size="sm" className="w-full">
                    Chamar no WhatsApp
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-luxury-gold/20 hover:border-luxury-gold/40 transition-all hover:shadow-luxury">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-bold">Email</h3>
                  <p className="text-gray-600">
                    marcus@personalshopperimobiliario.com.br
                  </p>
                  <Button variant="luxury-outline" size="sm" className="w-full">
                    Enviar Email
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-luxury-gold/20 hover:border-luxury-gold/40 transition-all hover:shadow-luxury">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="w-8 h-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-bold">Atendimento</h3>
                  <p className="text-gray-600">
                    Barra da Tijuca
                    <br />
                    Rio de Janeiro - RJ
                  </p>
                  <Button variant="luxury-outline" size="sm" className="w-full">
                    Ver no Mapa
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-navy text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <img src="/Logotipo Negativo 01.png" alt="Marcus Godoy" className="h-8 w-auto" />
              <span className="text-lg font-semibold">Marcus Godoy Personal Shopper Imobiliário</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#servicos" className="text-white/70 hover:text-white transition-colors">Serviços</a>
              <a href="#sobre" className="text-white/70 hover:text-white transition-colors">Sobre</a>
              <a href="#contato" className="text-white/70 hover:text-white transition-colors">Contato</a>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 Marcus Godoy Personal Shopper Imobiliário. Todos os direitos reservados.</p>
            <p className="mt-2">CRECI-RJ 123456 • Especialista exclusivo em Barra da Tijuca</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;