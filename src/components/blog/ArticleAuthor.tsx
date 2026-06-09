import { ExternalLink } from "lucide-react";

type Props = {
  nome: string | null;
  foto: string | null;
  bio: string | null;
  link: string | null;
};

const ArticleAuthor = ({ nome, foto, bio, link }: Props) => {
  // Only render when at least nome or bio is provided
  if (!nome && !bio) return null;

  const isLinkedIn = link?.includes("linkedin");
  const isInstagram = link?.includes("instagram");
  const ctaLabel = isLinkedIn
    ? "Conectar no LinkedIn"
    : isInstagram
    ? "Seguir no Instagram"
    : "Perfil completo";

  return (
    <aside className="article-author" aria-label={`Sobre o autor${nome ? `: ${nome}` : ""}`}>
      {foto ? (
        <img src={foto} alt={nome ?? "Autor"} className="article-author-photo" loading="lazy" />
      ) : (
        <div className="article-author-photo article-author-photo-fallback" aria-hidden="true">
          {(nome ?? "?").slice(0, 1).toUpperCase()}
        </div>
      )}
      <div className="article-author-body">
        <span className="article-author-eyebrow">Sobre o autor</span>
        {nome ? <h3 className="article-author-name">{nome}</h3> : null}
        {bio ? <p className="article-author-bio">{bio}</p> : null}
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="article-author-link"
          >
            {ctaLabel}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </aside>
  );
};

export default ArticleAuthor;
