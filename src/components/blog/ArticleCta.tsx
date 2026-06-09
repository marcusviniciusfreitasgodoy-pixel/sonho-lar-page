import { useEffect, useState } from "react";
import { getBackendClient } from "@/lib/backend";

type Settings = {
  cta_titulo: string;
  cta_subtitulo: string;
  cta_botao_texto: string;
  whatsapp_url: string;
};

const FALLBACK: Settings = {
  cta_titulo: "Pronto para comprar com critério, não com pressa?",
  cta_subtitulo:
    "Agende uma conversa direta com Marcus Godoy e descubra como o Personal Shopper Imobiliário protege sua próxima decisão patrimonial.",
  cta_botao_texto: "Fale comigo no WhatsApp",
  whatsapp_url: "https://wa.me/5521964075124",
};

export default function ArticleCta() {
  const [s, setS] = useState<Settings>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const client = await getBackendClient();
      if (!client) return;
      const { data } = await client
        .from("blog_settings")
        .select("cta_titulo, cta_subtitulo, cta_botao_texto, whatsapp_url")
        .maybeSingle();
      if (!cancelled && data) setS(data as Settings);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <aside className="article-cta" aria-label="Próximo passo">
      <span className="article-cta-eyebrow">Próximo passo</span>
      <h2 className="article-cta-title">{s.cta_titulo}</h2>
      <p className="article-cta-sub">{s.cta_subtitulo}</p>
      <a
        href={s.whatsapp_url}
        target="_blank"
        rel="noopener noreferrer"
        className="article-cta-btn"
      >
        {s.cta_botao_texto}
        <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}