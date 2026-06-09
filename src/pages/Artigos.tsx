import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getBackendClient } from "@/lib/backend";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import { readingTimeLabel } from "@/lib/readingTime";
import { Clock, Eye } from "lucide-react";
import "@/styles/landing-v4.css";
import "@/styles/blog.css";

type ArtigoCard = {
  id: string;
  titulo: string;
  slug: string;
  imagem_capa: string | null;
  resumo: string;
  conteudo: string;
  data_publicacao: string;
  categoria: string | null;
  visualizacoes: number | null;
};

const CATEGORIAS = [
  "Compra de Imóveis",
  "Venda de Imóveis",
  "Investimentos",
  "Dicas de Alto Padrão",
] as const;

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
  const [filtro, setFiltro] = useState<string>("Todas");

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
        .select("id, titulo, slug, imagem_capa, resumo, conteudo, data_publicacao, categoria, visualizacoes")
        .eq("ativo", true)
        .order("data_publicacao", { ascending: false });
      if (!cancelled) setItems((data as ArtigoCard[]) ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtrados = useMemo(() => {
    if (!items) return null;
    if (filtro === "Todas") return items;
    return items.filter((a) => (a.categoria ?? "") === filtro);
  }, [items, filtro]);

  return (
    <div className="landing-v4">
      <Helmet>
        <title>Artigos e Dicas Imobiliárias — Personal Shopper de Alto Padrão | Godoy Prime Realty</title>
        <meta
          name="description"
          content="Conteúdo exclusivo sobre o mercado imobiliário de luxo na Barra da Tijuca e Recreio: análises, dicas de compra, venda e investimento em imóveis de alto padrão."
        />
        <link rel="canonical" href="https://personalshopperimobiliario.godoyprime.com.br/artigos" />
        <meta property="og:title" content="Artigos e Dicas Imobiliárias — Personal Shopper de Alto Padrão" />
        <meta property="og:description" content="Inteligência aplicada ao mercado imobiliário de alto padrão. Artigos exclusivos sobre compra, venda e investimento em imóveis de luxo." />
        <meta property="og:url" content="https://personalshopperimobiliario.godoyprime.com.br/artigos" />
        <meta property="og:type" content="website" />
      </Helmet>
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

          <div className="blog-toolbar">
            <div className="blog-filters" role="tablist" aria-label="Filtrar por categoria">
              {(["Todas", ...CATEGORIAS] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filtro === c}
                  className={`blog-filter${filtro === c ? " is-active" : ""}`}
                  onClick={() => setFiltro(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            {filtrados && filtrados.length > 0 ? (
              <span className="blog-count">
                <strong>{filtrados.length}</strong>{" "}
                {filtrados.length === 1 ? "artigo" : "artigos"}
              </span>
            ) : null}
          </div>

          {filtrados === null ? (
            <div className="blog-empty">Carregando…</div>
          ) : filtrados.length === 0 ? (
            <div className="blog-empty">
              {filtro === "Todas" ? "Em breve, novos artigos." : "Nenhum artigo nesta categoria ainda."}
            </div>
          ) : (
            <div className="blog-grid">
              {filtrados.map((a) => (
                <Link key={a.id} to={`/artigos/${a.slug}`} className="blog-card">
                  <div className="blog-card-media">
                    {a.categoria ? (
                      <span className="blog-card-cat-badge">{a.categoria}</span>
                    ) : null}
                    {a.imagem_capa ? (
                      <img src={a.imagem_capa} alt={a.titulo} className="blog-card-img" loading="lazy" />
                    ) : null}
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-card-meta">
                      <span className="blog-card-date">{formatDate(a.data_publicacao)}</span>
                      <span className="blog-card-meta-dot" aria-hidden="true">·</span>
                      <span className="blog-card-reading">
                        <Clock size={12} aria-hidden="true" />
                        {readingTimeLabel(a.conteudo)}
                      </span>
                    </span>
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
          <NewsletterSignup />
        </div>
      </main>
    </div>
  );
};

export default Artigos;
