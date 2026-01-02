import { useEffect } from "react";
import { CheckCircle2, Calendar, ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Confirmacao = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Track conversion
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        event_category: "agendamento",
        event_label: "diagnostico_confirmado",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-full p-6">
              <CheckCircle2 className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Agendamento{" "}
          <span className="text-primary">Confirmado!</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
          Seu Diagnóstico Estratégico foi agendado com sucesso. 
          Você receberá um e-mail de confirmação em breve.
        </p>

        {/* Info Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Próximos Passos
            </h2>
          </div>

          <div className="space-y-4 text-left max-w-md mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                <span className="text-primary font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Verifique seu e-mail</h3>
                <p className="text-sm text-muted-foreground">
                  Você receberá um e-mail com os detalhes da reunião e o link de acesso.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                <span className="text-primary font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Prepare suas dúvidas</h3>
                <p className="text-sm text-muted-foreground">
                  Liste suas principais questões sobre o mercado imobiliário de alto padrão.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                <span className="text-primary font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Compareça à reunião</h3>
                <p className="text-sm text-muted-foreground">
                  Esteja pronto no horário agendado para aproveitar ao máximo sua consultoria.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm text-muted-foreground">
          <a 
            href="https://wa.me/5521964075124" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            (21) 96407-5124
          </a>
          <span className="hidden sm:block">•</span>
          <a 
            href="mailto:contato@godoyprimerealty.com.br" 
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
            contato@godoyprimerealty.com.br
          </a>
        </div>

        {/* CTA Button */}
        <Button variant="gold" size="lg" asChild>
          <Link to="/">
            Voltar ao Site
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        {/* Trust Badge */}
        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Godoy Prime Realty. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Confirmacao;
