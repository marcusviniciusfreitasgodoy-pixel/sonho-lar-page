import { useEffect } from "react";
import { CheckCircle2, Clock, MessageCircle, Mail, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, Navigate } from "react-router-dom";

type LeadSummary = {
  nome?: string;
  email?: string;
  whatsapp?: string;
  orcamento?: string;
  momento?: string;
  servico?: string;
};

const MARCUS_WA = "5521964075124";

const Field = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between gap-4 py-2 border-b border-border/60 last:border-0">
    <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-foreground text-right break-words">{value || "—"}</span>
  </div>
);

const Obrigado = () => {
  const location = useLocation();
  const lead = (location.state as { lead?: LeadSummary } | null)?.lead;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        event_category: "lead",
        event_label: "obrigado_view",
      });
    }
  }, []);

  // Fallback: se acessou direto sem state, redireciona para confirmação genérica
  if (!lead) return <Navigate to="/confirmacao" replace />;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex items-center justify-center px-4 py-12"
      style={{ fontFamily: "Lato, sans-serif" }}
    >
      <div className="max-w-2xl w-full">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-full p-6">
              <CheckCircle2 className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-foreground mb-3">
            Obrigado{lead.nome ? `, ${lead.nome.split(" ")[0]}` : ""}.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Sua solicitação de Diagnóstico Estratégico foi recebida com sucesso.
          </p>
        </div>

        {/* ETA Card */}
        <div className="bg-primary/5 border border-primary/30 rounded-xl p-5 mb-6 flex items-center gap-4">
          <Clock className="h-8 w-8 text-primary shrink-0" />
          <div>
            <h2 className="text-sm font-semibold text-foreground">Previsão de contato</h2>
            <p className="text-sm text-muted-foreground">
              Marcus Godoy entrará em contato por <strong className="text-foreground">WhatsApp</strong> ou{" "}
              <strong className="text-foreground">e-mail</strong> em até{" "}
              <strong className="text-foreground">24 horas úteis</strong>.
            </p>
          </div>
        </div>

        {/* Resumo do lead */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Resumo da sua solicitação
          </h2>
          <Field label="Nome" value={lead.nome} />
          <Field label="E-mail" value={lead.email} />
          <Field label="WhatsApp" value={lead.whatsapp} />
          <Field label="Serviço" value={lead.servico} />
          <Field label="Faixa de investimento" value={lead.orcamento} />
          <Field label="Momento" value={lead.momento} />
        </div>

        {/* Contato direto */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button asChild className="flex-1" variant="gold">
            <a
              href={`https://wa.me/${MARCUS_WA}?text=${encodeURIComponent(
                `Olá Marcus, acabei de solicitar o Diagnóstico Estratégico (${lead.nome || ""}).`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Falar agora no WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link to="/">
              Voltar ao site
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Contatos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground">
          <a href={`tel:+${MARCUS_WA}`} className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-3.5 w-3.5" />
            (21) 96407-5124
          </a>
          <span className="hidden sm:block">•</span>
          <a
            href="mailto:contato@godoyprimerealty.com.br"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            contato@godoyprimerealty.com.br
          </a>
        </div>

        <p className="text-center mt-8 text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Godoy Prime Realty · CRECI/RJ 80.199
        </p>
      </div>
    </div>
  );
};

export default Obrigado;