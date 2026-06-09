import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBackendClient } from "@/lib/backend";

type FeaturedArtigo = {
  id: string;
  titulo: string;
  slug: string;
  imagem_capa: string | null;
  resumo: string;
  data_publicacao: string;
  categoria: string | null;
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

const FeaturedArticles = () => {
  const [items, setItems] = useState<FeaturedArtigo[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const client = await getBackendClient();
      if (!client) {
        if (!cancelled) setItems([]);
        return;
      }
      const { data } = await client
        .from("artigos")
        .select("id, titulo, slug, imagem_capa, resumo, data_publicacao, categoria")
        .eq("ativo", true)
        .order("data_publicacao", { ascending: false })
        .limit(3);
      if (!cancelled) setItems((data as FeaturedArtigo[]) ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="sec sec-cream" id="artigos-destaque">
      <div className="wrap">
        <div className="featured-head">
          <div>
            <span className="featured-eyebrow">Conhecimento Patrimonial</span>
            <h2 className="featured-title">
              Artigos em <em>Destaque</em>
            </h2>
          </div>
          <Link to="/artigos" className="featured-all">
            Ver todos os artigos →
          </Link>
        </div>

        {items === null ? (
          <p className="featured-empty">Carregando…</p>
        ) : items.length === 0 ? (
          <p className="featured-empty">Novos artigos em breve.</p>
        ) : (
          <div className="featured-list">
            {items.map((a) => (
              <article key={a.id} className="featured-card">
                <Link to={`/artigos/${a.slug}`} className="featured-card-img-link" aria-label={a.titulo}>
                  {a.imagem_capa ? (
                    <img src={a.imagem_capa} alt={a.titulo} loading="lazy" />
                  ) : (
                    <div className="featured-card-img-placeholder" />
                  )}
                </Link>
                <div className="featured-card-body">
                  <span className="featured-card-meta">
                    {formatDate(a.data_publicacao)}
                    {a.categoria ? <span className="featured-card-cat"> · {a.categoria}</span> : null}
                  </span>
                  <h3 className="featured-card-title">
                    <Link to={`/artigos/${a.slug}`}>{a.titulo}</Link>
                  </h3>
                  <p className="featured-card-resumo">{a.resumo}</p>
                  <Link to={`/artigos/${a.slug}`} className="featured-card-cta">
                    Ler artigo →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArticles;
