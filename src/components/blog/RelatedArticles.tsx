import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBackendClient } from "@/lib/backend";

type Related = {
  id: string;
  titulo: string;
  slug: string;
  imagem_capa: string | null;
  categoria: string | null;
};

type Props = {
  currentId: string;
  categoria: string | null;
};

const RelatedArticles = ({ currentId, categoria }: Props) => {
  const [items, setItems] = useState<Related[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const client = await getBackendClient();
      if (!client) {
        if (!cancelled) setItems([]);
        return;
      }

      const baseSelect = "id, titulo, slug, imagem_capa, categoria";
      let results: Related[] = [];

      if (categoria) {
        const { data } = await client
          .from("artigos")
          .select(baseSelect)
          .eq("ativo", true)
          .eq("categoria", categoria)
          .neq("id", currentId)
          .order("data_publicacao", { ascending: false })
          .limit(3);
        results = (data as Related[]) ?? [];
      }

      if (results.length === 0) {
        const { data } = await client
          .from("artigos")
          .select(baseSelect)
          .eq("ativo", true)
          .neq("id", currentId)
          .order("data_publicacao", { ascending: false })
          .limit(3);
        results = (data as Related[]) ?? [];
      }

      if (!cancelled) setItems(results);
    })();
    return () => {
      cancelled = true;
    };
  }, [currentId, categoria]);

  if (!items || items.length === 0) return null;

  return (
    <section className="related-articles" aria-labelledby="related-title">
      <div className="related-head">
        <span className="related-eyebrow">Continue Lendo</span>
        <h2 id="related-title" className="related-title">Artigos Relacionados</h2>
      </div>
      <div className="related-grid">
        {items.map((a) => (
          <Link key={a.id} to={`/artigos/${a.slug}`} className="related-card">
            <div className="related-card-media">
              {a.imagem_capa ? (
                <img src={a.imagem_capa} alt={a.titulo} loading="lazy" />
              ) : (
                <div className="related-card-placeholder" aria-hidden="true" />
              )}
            </div>
            <div className="related-card-body">
              {a.categoria ? <span className="related-card-cat">{a.categoria}</span> : null}
              <h3 className="related-card-title">{a.titulo}</h3>
              <span className="related-card-cta">Ler mais →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
