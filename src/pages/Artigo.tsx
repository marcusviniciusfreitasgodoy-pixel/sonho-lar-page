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
import ArticleAuthor from "@/components/blog/ArticleAuthor";
import { readingTimeLabel } from "@/lib/readingTime";
import { Clock, Eye } from "lucide-react";

type Artigo = {
  id: string;
  titulo: string;
  slug: string;
  imagem_capa: string | null;
  resumo: string;
  conteudo: string;
  data_publicacao: string;
  categoria: string | null;
  visualizacoes: number | null;
  autor_nome: string | null;
  autor_foto: string | null;
  autor_bio: string | null;
  autor_link: string | null;
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

function formatViews(n: number | null | undefined) {
  const count = n || 0;
  return `${count.toLocaleString("pt-BR")} ${count === 1 ? "leitura" : "leituras"}`;
}

const VIEW_DEDUP_MS = 30 * 60 * 1000; // 30 minutes



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
        .select("id, titulo, slug, imagem_capa, resumo, conteudo, data_publicacao, categoria, visualizacoes, autor_nome, autor_foto, autor_bio, autor_link")
        .eq("slug", slug)
        .eq("ativo", true)
        .maybeSingle();
      if (!cancelled) {
        if (data) {
          const art = data as Artigo;
          setArtigo(art);
          document.title = `${art.titulo} | Godoy Prime Realty`;
          // Dedup: only count one view per visitor per 30min
          try {
            const storageKey = `artigo_viewed_${art.id}`;
            const last = Number(localStorage.getItem(storageKey) || 0);
            if (!last || Date.now() - last > VIEW_DEDUP_MS) {
              localStorage.setItem(storageKey, String(Date.now()));
              client.rpc("increment_artigo_views", { p_id: art.id }).then(() => {
                if (!cancelled) {
                  setArtigo((prev) =>
                    prev && prev !== "notfound"
                      ? { ...prev, visualizacoes: (prev.visualizacoes || 0) + 1 }
                      : prev
                  );
                }
              });
            }
          } catch {
            // localStorage unavailable; skip dedup
          }
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
            <span className="article-meta-sep" aria-hidden="true" />
            <span className="article-meta-item article-meta-reading">
              <Eye size={14} aria-hidden="true" />
              {formatViews(artigo.visualizacoes)}
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
          <ArticleAuthor
            nome={artigo.autor_nome}
            foto={artigo.autor_foto}
            bio={artigo.autor_bio}
            link={artigo.autor_link}
          />
          <ArticleCta />
          <ArticleEngagement artigoId={artigo.id} />
        </article>
        <RelatedArticles currentId={artigo.id} categoria={artigo.categoria} />
      </main>
    </div>
  );
};

export default ArtigoPage;