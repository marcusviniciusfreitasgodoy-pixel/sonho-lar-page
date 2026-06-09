import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getBackendClient } from "@/lib/backend";
import { renderArticleContent } from "@/lib/renderArticleContent";
import "@/styles/landing-v4.css";
import "@/styles/blog.css";
import ArticleEngagement from "@/components/blog/ArticleEngagement";
import ArticleCta from "@/components/blog/ArticleCta";
import ArticleShare from "@/components/blog/ArticleShare";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { readingTimeLabel } from "@/lib/readingTime";
import { Clock } from "lucide-react";

type Artigo = {
  id: string;
  titulo: string;
  slug: string;
  imagem_capa: string | null;
  resumo: string;
  conteudo: string;
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




const ArtigoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [artigo, setArtigo] = useState<Artigo | null | "notfound">(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const client = await getBackendClient();
      if (!client || !slug) {
        if (!cancelled) setArtigo("notfound");
        return;
      }
      const { data } = await client
        .from("artigos")
        .select("id, titulo, slug, imagem_capa, resumo, conteudo, data_publicacao, categoria")
        .eq("slug", slug)
        .eq("ativo", true)
        .maybeSingle();
      if (!cancelled) {
        if (data) {
          setArtigo(data as Artigo);
          document.title = `${(data as Artigo).titulo} | Godoy Prime Realty`;
        } else {
          setArtigo("notfound");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (artigo === null) {
    return (
      <div className="landing-v4">
        <main className="article-page">
          <div className="article-wrap blog-empty">Carregando…</div>
        </main>
      </div>
    );
  }

  if (artigo === "notfound") {
    return (
      <div className="landing-v4">
        <main className="article-page">
          <div className="article-wrap">
            <Link to="/artigos" className="article-back">← Voltar para Artigos</Link>
            <h1 className="article-title">Artigo não encontrado</h1>
            <p style={{ textAlign: "center", color: "var(--text2)" }}>
              O conteúdo que você procura pode ter sido movido ou desativado.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const canonical = `https://personalshopperimobiliario.godoyprime.com.br/artigos/${artigo.slug}`;
  const metaDescription = (artigo.resumo || "").slice(0, 160);

  return (
    <div className="landing-v4">
      <Helmet>
        <title>{`${artigo.titulo} | Godoy Prime Realty`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={artigo.titulo} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        {artigo.imagem_capa ? <meta property="og:image" content={artigo.imagem_capa} /> : null}
        {artigo.categoria ? <meta property="article:section" content={artigo.categoria} /> : null}
        <meta property="article:published_time" content={artigo.data_publicacao} />
      </Helmet>
      <main className="article-page">
        <div className="article-wrap">
          <Link to="/artigos" className="article-back">← Voltar para Artigos</Link>
          <h1 className="article-title">{artigo.titulo}</h1>
          <div className="article-meta">
            <span className="article-meta-item">{formatDate(artigo.data_publicacao)}</span>
            {artigo.categoria ? (
              <>
                <span className="article-meta-sep" aria-hidden="true" />
                <span className="article-meta-item is-accent">{artigo.categoria}</span>
              </>
            ) : null}
            <span className="article-meta-sep" aria-hidden="true" />
            <span className="article-meta-item article-meta-reading">
              <Clock size={14} aria-hidden="true" />
              {readingTimeLabel(artigo.conteudo)}
            </span>
          </div>
        </div>
        {artigo.imagem_capa && (
          <div className="article-cover-wrap">
            <img src={artigo.imagem_capa} alt={artigo.titulo} className="article-cover" />
          </div>
        )}
        <article className="article-wrap">
          <p className="article-resumo">{artigo.resumo}</p>
          <div className="article-content">{renderArticleContent(artigo.conteudo)}</div>
          <ArticleShare title={artigo.titulo} />
          <ArticleCta />
          <ArticleEngagement artigoId={artigo.id} />
        </article>
        <RelatedArticles currentId={artigo.id} categoria={artigo.categoria} />
      </main>
    </div>
  );
};

export default ArtigoPage;