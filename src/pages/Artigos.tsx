import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBackendClient } from "@/lib/backend";
import "@/styles/landing-v4.css";
import "@/styles/blog.css";

type ArtigoCard = {
  id: string;
  titulo: string;
  slug: string;
  imagem_capa: string | null;
  resumo: string;
  data_publicacao: string;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

const Artigos = () => {
  const [items, setItems] = useState<ArtigoCard[] | null>(null);

  useEffect(() => {
    document.title = "Artigos | Godoy Prime Realty";
    let cancelled = false;
    (async () => {
      const client = await getBackendClient();
      if (!client) {
        if (!cancelled) setItems([]);
        return;
      }
      const { data } = await client
        .from("artigos")
        .select("id, titulo, slug, imagem_capa, resumo, data_publicacao")
        .eq("ativo", true)
        .order("data_publicacao", { ascending: false });
      if (!cancelled) setItems((data as ArtigoCard[]) ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="landing-v4">
      <main className="blog-page">
        <div className="blog-wrap">
          <div className="blog-eyebrow">
            <span className="blog-eyebrow-line" />
            <span className="blog-eyebrow-text">Conhecimento Patrimonial</span>
            <span className="blog-eyebrow-line" />
          </div>
          <h1 className="blog-title">
            Artigos & <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Análises</em>
          </h1>
          <p className="blog-subtitle">
            Inteligência aplicada ao mercado imobiliário de alto padrão — para quem compra com critério,
            não com pressa.
          </p>

          {items === null ? (
            <div className="blog-empty">Carregando…</div>
          ) : items.length === 0 ? (
            <div className="blog-empty">Em breve, novos artigos.</div>
          ) : (
            <div className="blog-grid">
              {items.map((a) => (
                <Link key={a.id} to={`/artigos/${a.slug}`} className="blog-card">
                  {a.imagem_capa ? (
                    <img src={a.imagem_capa} alt={a.titulo} className="blog-card-img" loading="lazy" />
                  ) : (
                    <div className="blog-card-img" />
                  )}
                  <div className="blog-card-body">
                    <span className="blog-card-date">{formatDate(a.data_publicacao)}</span>
                    <h2 className="blog-card-title">{a.titulo}</h2>
                    <p className="blog-card-resumo">{a.resumo}</p>
                    <span className="blog-card-cta">Ler artigo →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div style={{ marginTop: 80, textAlign: "center" }}>
            <Link to="/" className="article-back">← Voltar para o site</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Artigos;