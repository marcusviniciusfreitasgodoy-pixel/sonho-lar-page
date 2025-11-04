import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Building2, 
  Shield, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  DollarSign,
  Eye,
  Target,
  Award,
  Briefcase,
  Home,
  Play,
  BarChart3,
  Clock,
  ThumbsUp
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

const LandingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-luxury-gold" />
              <span className="text-xl font-bold text-luxury-navy">Marcus Godoy</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#sobre" className="text-gray-700 hover:text-luxury-gold transition-colors">Sobre</a>
              <a href="#servicos" className="text-gray-700 hover:text-luxury-gold transition-colors">Serviços</a>
              <a href="#processo" className="text-gray-700 hover:text-luxury-gold transition-colors">Processo</a>
              <a href="#contato" className="text-gray-700 hover:text-luxury-gold transition-colors">Contato</a>
            </nav>
            <Button variant="luxury" size="sm" className="hidden md:inline-flex">
              <Phone className="w-4 h-4 mr-2" />
              Falar Agora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge variant="outline" className="border-luxury-gold text-luxury-gold bg-luxury-gold/10">
                Personal Shopper Imobiliário Exclusivo da Barra da Tijuca
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Economize <span className="text-luxury-gold">R$ 200-500mil</span> na sua próxima compra de imóvel de luxo
              </h1>
              
              <p className="text-xl text-gray-200 leading-relaxed">
                Representação 100% sua, sem conflito de interesses. Acesso exclusivo a ofertas off-market e negociação baseada em dados reais de transações fechadas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" size="xl" className="group">
                  <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Agendar Consulta Gratuita
                </Button>
                <Button variant="luxury-outline" size="xl">
                  <Eye className="w-5 h-5 mr-2" />
                  Ver Portfólio
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold">R$ 50M+</div>
                  <div className="text-sm text-gray-300">Em negociações</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold">150+</div>
                  <div className="text-sm text-gray-300">Clientes atendidos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold">98%</div>
                  <div className="text-sm text-gray-300">Satisfação</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="relative">
                <img 
                  src="/src/assets/marcus-profile-new.jpg" 
                  alt="Marcus Godoy - Personal Shopper Imobiliário" 
                  className="rounded-2xl shadow-luxury w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-luxury-gold text-luxury-navy p-4 rounded-xl shadow-gold">
                  <Award className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Por Que Muitos Compradores Pagam{" "}
              <span className="text-luxury-gold">Milhares de Reais</span> a Mais e só{" "}
              <span className="text-gray-600">Descobrem Depois?</span>
            </h2>
          </div>
          
          <Card className="bg-white shadow-luxury border-0 p-8 md:p-12">
            <CardContent className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-luxury-navy mb-4">
                  Verdades Inconvenientes que ninguém te fala, e tem muito mais...
                </h3>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  A Imobiliária que te mostra o imóvel <strong>não trabalha para você</strong>. Ela foi contratada pelo 
                  Vendedor para fazer a intermediação do negócio e <strong>vender pelo preço mais caro possível</strong>. 
                  Elas ganham mais dinheiro quando você paga mais caro. <strong>Simples Assim!</strong>
                </p>
                
                <div className="bg-luxury-cream p-6 rounded-lg border-l-4 border-luxury-gold">
                  <p>
                    Na Barra da Tijuca, em negociações com imóveis de Alto Padrão, essa diferença pode ser 
                    de <strong className="text-luxury-gold">R$ 200 mil, R$ 300 mil ou até R$ 500 mil</strong> que saem direto do seu bolso.
                  </p>
                </div>
                
                <p className="text-center text-gray-600">
                  Você negocia no escuro, sem saber o preço real que outros pagaram pelos mesmos imóveis. Sem 
                  acesso aos dados de transações fechadas, sem inteligência de mercado e sem conhecer os 
                  segredos da região.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Descubra Como o Personal Shopper Imobiliário 
              <span className="text-luxury-gold block mt-2">Pode Transformar Sua Compra</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Veja como economizei milhões para meus clientes e como posso fazer o mesmo por você
            </p>
          </div>
          
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Video Container */}
            <div className="relative w-full pt-[56.25%] bg-luxury-navy-light rounded-lg overflow-hidden shadow-luxury">
              {/* Video Placeholder - Replace with actual video */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-luxury-navy to-luxury-navy-light">
                <button className="bg-luxury-gold text-luxury-navy p-6 rounded-full shadow-gold hover:scale-110 transition-transform duration-300 mb-4">
                  <Play className="w-12 h-12 ml-1" />
                </button>
                <p className="text-white text-lg font-medium">Clique para assistir o vídeo</p>
                <p className="text-gray-300 text-sm mt-2">Duração: 3:45 minutos</p>
              </div>
              
              {/* Uncomment and replace with your actual video URL */}
              {/* 
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="YOUR_VIDEO_URL_HERE"
                title="Personal Shopper Imobiliário - Marcus Godoy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              */}
            </div>
            
            {/* Video Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center text-white">
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-luxury-gold mr-2" />
                  <span className="text-3xl font-bold text-luxury-gold">R$ 15M+</span>
                </div>
                <p className="text-gray-200">Economizados para clientes</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <Clock className="w-8 h-8 text-luxury-gold mr-2" />
                  <span className="text-3xl font-bold text-luxury-gold">30 dias</span>
                </div>
                <p className="text-gray-200">Tempo médio de negociação</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <ThumbsUp className="w-8 h-8 text-luxury-gold mr-2" />
                  <span className="text-3xl font-bold text-luxury-gold">100%</span>
                </div>
                <p className="text-gray-200">Clientes recomendariam</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              A Solução: <span className="text-luxury-gold">Personal Shopper Imobiliário</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Representação exclusiva do comprador com acesso a dados privilegiados e estratégias de negociação comprovadas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "100% do Seu Lado",
                description: "Representação exclusiva do comprador, sem conflito de interesses com vendedores ou construtoras"
              },
              {
                icon: Eye,
                title: "Acesso Off-Market",
                description: "Oportunidades exclusivas que nunca chegam ao mercado público, com descontos de até 30%"
              },
              {
                icon: BarChart3,
                title: "Dados Reais",
                description: "Acesso a transações fechadas e análise comparativa para negociação baseada em fatos"
              },
              {
                icon: Target,
                title: "Estratégia Personalizada",
                description: "Plano de ação customizado baseado no seu perfil, necessidades e objetivos específicos"
              },
              {
                icon: DollarSign,
                title: "Economia Garantida",
                description: "Metodologia comprovada que já economizou milhões para nossos clientes na Barra da Tijuca"
              },
              {
                icon: Award,
                title: "Expertise Local",
                description: "Conhecimento profundo da Barra da Tijuca, tendências de mercado e oportunidades futuras"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-luxury transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-luxury-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-luxury-navy mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="processo" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Como Funciona o <span className="text-luxury-gold">Processo</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Metodologia estruturada em 5 etapas para garantir a melhor compra da sua vida
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Análise do Perfil",
                description: "Entendimento completo das suas necessidades, orçamento e objetivos para criar uma estratégia personalizada",
                icon: Users
              },
              {
                step: "02", 
                title: "Inteligência de Mercado",
                description: "Análise profunda dos dados de transações, tendências e oportunidades específicas da Barra da Tijuca",
                icon: TrendingUp
              },
              {
                step: "03",
                title: "Curadoria Exclusiva", 
                description: "Seleção criteriosa de imóveis que atendem ao seu perfil, incluindo oportunidades off-market",
                icon: Eye
              },
              {
                step: "04",
                title: "Negociação Estratégica",
                description: "Negociação baseada em dados reais com estratégias comprovadas para maximizar sua economia",
                icon: Target
              },
              {
                step: "05",
                title: "Fechamento Seguro",
                description: "Acompanhamento completo até a assinatura, garantindo todos os aspectos legais e documentais",
                icon: CheckCircle
              }
            ].map((process, index) => (
              <div key={index} className="flex items-start space-x-6 bg-white p-8 rounded-xl shadow-lg">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-navy font-bold text-xl">
                    {process.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <process.icon className="w-8 h-8 text-luxury-gold" />
                    <h3 className="text-2xl font-bold text-luxury-navy">{process.title}</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              O Que Dizem Nossos <span className="text-luxury-gold">Clientes</span>
            </h2>
            <p className="text-xl text-gray-600">
              Resultados reais de quem já economizou milhares com nosso serviço
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Mendes",
                role: "Empresário",
                savings: "R$ 380.000",
                text: "Marcus me ajudou a economizar quase 400 mil reais na compra do meu apartamento na Barra. O conhecimento dele sobre o mercado é impressionante.",
                rating: 5
              },
              {
                name: "Ana Paula Silva",
                role: "Médica",
                savings: "R$ 250.000", 
                text: "Processo transparente e profissional. Consegui um apartamento incrível por um preço muito abaixo do que estava sendo oferecido no mercado.",
                rating: 5
              },
              {
                name: "Roberto Costa",
                role: "Investidor",
                savings: "R$ 420.000",
                text: "A expertise do Marcus em negociação é excepcional. Ele conhece cada detalhe do mercado da Barra e isso fez toda a diferença.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-luxury-gold text-luxury-gold" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-luxury-navy">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Economia</p>
                        <p className="font-bold text-luxury-gold">{testimonial.savings}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Sobre <span className="text-luxury-gold">Marcus Godoy</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Personal Shopper Imobiliário especializado em imóveis de alto padrão na Barra da Tijuca, 
                  com mais de 10 anos de experiência e R$ 50 milhões em negociações realizadas.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Award,
                    title: "Especialista em Alto Padrão",
                    description: "Foco exclusivo em imóveis de luxo na Barra da Tijuca"
                  },
                  {
                    icon: BarChart3,
                    title: "R$ 50M+ em Negociações",
                    description: "Histórico comprovado de resultados excepcionais"
                  },
                  {
                    icon: Users,
                    title: "150+ Clientes Satisfeitos",
                    description: "98% de taxa de satisfação e recomendação"
                  },
                  {
                    icon: MapPin,
                    title: "Conhecimento Local",
                    description: "Expertise profunda sobre a Barra da Tijuca"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-luxury-gold/10 p-3 rounded-lg">
                      <item.icon className="w-6 h-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-luxury-navy mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="luxury" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Conversa
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src="/src/assets/marcus-profile.jpg" 
                alt="Marcus Godoy" 
                className="rounded-2xl shadow-luxury w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-luxury-gold">10+</div>
                  <div className="text-sm text-gray-600">Anos de experiência</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para Economizar <span className="text-luxury-gold">Centenas de Milhares</span> na Sua Próxima Compra?
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Agende uma consulta gratuita e descubra como posso ajudar você a encontrar o imóvel dos seus sonhos 
            pelo melhor preço possível na Barra da Tijuca.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="xl" className="group">
              <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Falar com Marcus Agora
            </Button>
            <Button variant="luxury-outline" size="xl">
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Consulta Gratuita
            </Button>
          </div>
          
          <p className="text-sm text-gray-300 mt-6">
            Consulta inicial gratuita • Sem compromisso • Resultados garantidos
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Entre em <span className="text-luxury-gold">Contato</span>
            </h2>
            <p className="text-xl text-gray-600">
              Vamos conversar sobre como posso ajudar você a economizar na compra do seu imóvel
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-luxury-navy mb-6">Informações de Contato</h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Phone,
                      title: "Telefone",
                      info: "(21) 99999-9999",
                      action: "tel:+5521999999999"
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      info: "marcus@personalshopper.com.br",
                      action: "mailto:marcus@personalshopper.com.br"
                    },
                    {
                      icon: MapPin,
                      title: "Localização",
                      info: "Barra da Tijuca, Rio de Janeiro",
                      action: "#"
                    }
                  ].map((contact, index) => (
                    <a 
                      key={index}
                      href={contact.action}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="bg-luxury-gold/10 p-3 rounded-lg">
                        <contact.icon className="w-6 h-6 text-luxury-gold" />
                      </div>
                      <div>
                        <p className="font-semibold text-luxury-navy">{contact.title}</p>
                        <p className="text-gray-600">{contact.info}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="bg-luxury-cream p-6 rounded-xl">
                <h4 className="font-bold text-luxury-navy mb-2">Horário de Atendimento</h4>
                <p className="text-gray-600">Segunda a Sexta: 9h às 18h</p>
                <p className="text-gray-600">Sábado: 9h às 14h</p>
                <p className="text-sm text-gray-500 mt-2">
                  Atendimento de urgência disponível 24/7 para clientes
                </p>
              </div>
            </div>
            
            <Card className="border-0 shadow-luxury">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-luxury-navy mb-6">Envie uma Mensagem</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="seu@email.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="(21) 99999-9999" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Conte-me sobre o tipo de imóvel que você está procurando..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      variant="luxury" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-navy text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-8 w-8 text-luxury-gold" />
                <span className="text-xl font-bold">Marcus Godoy</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Personal Shopper Imobiliário especializado em imóveis de alto padrão na Barra da Tijuca.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Serviços</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Personal Shopper Imobiliário</li>
                <li>Consultoria em Investimentos</li>
                <li>Análise de Mercado</li>
                <li>Negociação Especializada</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-300">
                <p>(21) 99999-9999</p>
                <p>marcus@personalshopper.com.br</p>
                <p>Barra da Tijuca, RJ</p>
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