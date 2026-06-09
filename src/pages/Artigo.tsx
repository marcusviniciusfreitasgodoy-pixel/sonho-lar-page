import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBackendClient } from "@/lib/backend";
import { renderArticleContent } from "@/lib/renderArticleContent";
import "@/styles/landing-v4.css";
import "@/styles/blog.css";

type Artigo = {
  id: string;
  titulo: string;
  slug: string;
  imagem_capa: string | null;
  resumo: string;
  conteudo: string;
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
        .select("id, titulo, slug, imagem_capa, resumo, conteudo, data_publicacao")
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

  return (
    <div className="landing-v4">
      <main className="article-page">
        <article className="article-wrap">
          <Link to="/artigos" className="article-back">← Voltar para Artigos</Link>
          <span className="article-date">{formatDate(artigo.data_publicacao)}</span>
          <h1 className="article-title">{artigo.titulo}</h1>
          {artigo.imagem_capa && (
            <img src={artigo.imagem_capa} alt={artigo.titulo} className="article-cover" />
          )}
          <p className="article-resumo">{artigo.resumo}</p>
          <div className="article-content">{renderArticleContent(artigo.conteudo)}</div>
        </article>
      </main>
    </div>
  );
};

export default ArtigoPage;