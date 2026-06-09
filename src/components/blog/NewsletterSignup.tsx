import { useState, type FormEvent } from "react";
import { getBackendClient } from "@/lib/backend";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterSignup = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanNome = nome.trim().slice(0, 100);

    if (!emailRegex.test(cleanEmail) || cleanEmail.length > 255) {
      setStatus("error");
      setMessage("Por favor, informe um e-mail válido.");
      return;
    }

    setStatus("loading");
    const client = await getBackendClient();
    if (!client) {
      setStatus("error");
      setMessage("Serviço indisponível no momento. Tente novamente em instantes.");
      return;
    }

    const { error } = await client
      .from("newsletter_assinantes")
      .insert({ nome: cleanNome || null, email: cleanEmail });

    if (error) {
      if (error.code === "23505") {
        setStatus("success");
        setMessage("Você já está na nossa lista. Obrigado pelo interesse.");
      } else {
        setStatus("error");
        setMessage("Não foi possível concluir o cadastro. Tente novamente.");
      }
      return;
    }

    setStatus("success");
    setMessage("Cadastro confirmado. Em breve você receberá nossos artigos exclusivos.");
    setNome("");
    setEmail("");
  }

  return (
    <section className="newsletter-block" aria-labelledby="newsletter-title">
      <div className="newsletter-inner">
        <span className="newsletter-eyebrow">Conteúdo Exclusivo</span>
        <h2 id="newsletter-title" className="newsletter-title">
          Receba artigos exclusivos no seu e-mail
        </h2>
        <p className="newsletter-sub">
          Análises, dados de mercado e estratégias de compra de alto padrão, direto na sua caixa de entrada.
        </p>

        {status === "success" ? (
          <div className="newsletter-success" role="status">
            <span className="newsletter-success-mark" aria-hidden="true">✓</span>
            <p>{message}</p>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={onSubmit} noValidate>
            <div className="newsletter-fields">
              <input
                type="text"
                className="newsletter-input"
                placeholder="Seu nome (opcional)"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                maxLength={100}
                autoComplete="name"
                disabled={status === "loading"}
              />
              <input
                type="email"
                className="newsletter-input"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                autoComplete="email"
                required
                disabled={status === "loading"}
              />
            </div>
            <button type="submit" className="newsletter-submit" disabled={status === "loading"}>
              {status === "loading" ? "Enviando…" : "Cadastrar"}
            </button>
            {status === "error" && (
              <p className="newsletter-error" role="alert">{message}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;