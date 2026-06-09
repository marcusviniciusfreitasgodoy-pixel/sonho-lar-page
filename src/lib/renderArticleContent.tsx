import { Fragment, type ReactNode } from "react";

// Bullet chars aceitos no início de itens de lista (hífen, asterisco, bullets
// unicode e travessões/em-dash que muitas vezes aparecem ao colar de PDFs/Docs).
const BULLET_RE = /^\s*([-*•·●◦‣▪–—]|\d+[.)])\s+/;
const HEADING2_RE = /^\s*##\s*/;
const HEADING3_RE = /^\s*###\s*/;

const ALLOWED_TAGS = new Set([
  "h2", "h3", "h4", "p", "ul", "ol", "li", "strong", "em", "b", "i",
  "blockquote", "a", "br", "hr",
  "div", "span",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td",
  "figure", "figcaption",
]);

// Classes permitidas (preservadas no atributo class) — espelham o design original.
const ALLOWED_CLASSES = new Set([
  "article-lead",
  "callout", "callout-label",
  "stat-row", "stat-cell", "stat-n", "stat-l",
  "comparison-table",
  "hero-eyebrow",
]);

function sanitizeHtml(html: string): string {
  if (typeof window === "undefined" || typeof DOMParser === "undefined") return html;
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstElementChild as HTMLElement | null;
  if (!root) return "";
  const walk = (node: Element) => {
    Array.from(node.children).forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) {
        // Mantém o texto/filhos, remove o wrapper
        const replacement = doc.createElement(tag === "h1" ? "h2" : "p");
        replacement.innerHTML = child.innerHTML;
        child.replaceWith(replacement);
        walk(replacement);
        return;
      }
      // Remove todos os atributos exceto href em <a> e class na allowlist.
      Array.from(child.attributes).forEach((attr) => {
        if (tag === "a" && attr.name === "href") return;
        if (attr.name === "class") {
          const kept = attr.value
            .split(/\s+/)
            .filter((c) => ALLOWED_CLASSES.has(c))
            .join(" ");
          if (kept) child.setAttribute("class", kept);
          else child.removeAttribute("class");
          return;
        }
        child.removeAttribute(attr.name);
      });
      if (tag === "a") {
        child.setAttribute("rel", "noopener noreferrer");
        child.setAttribute("target", "_blank");
      }
      walk(child);
    });
  };
  walk(root);
  return root.innerHTML;
}

function looksLikeHtml(s: string): boolean {
  const t = s.trimStart();
  return /^<(h[1-6]|p|ul|ol|div|article|section|blockquote|strong|em|br|table|figure)\b/i.test(t);
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={`${keyPrefix}-b-${i}`}>{p.slice(2, -2)}</strong>;
    }
    return <Fragment key={`${keyPrefix}-t-${i}`}>{p}</Fragment>;
  });
}

export function renderArticleContent(content: string): ReactNode {
  // Conteúdo em HTML (novo formato do importador) — renderiza direto.
  if (looksLikeHtml(content)) {
    return (
      <div
        className="article-html"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
      />
    );
  }

  const blocks = content.replace(/\r\n/g, "\n").split(/\n\n+/);
  const out: ReactNode[] = [];
  blocks.forEach((blk, idx) => {
    const lines = blk.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length === 0) return;

    // Heading H3 (### ...) — também aceita "###Texto"
    if (HEADING3_RE.test(lines[0])) {
      out.push(<h3 key={idx}>{lines[0].replace(HEADING3_RE, "")}</h3>);
      const rest = lines.slice(1).join("\n");
      if (rest) out.push(<p key={`${idx}-p`}>{renderInline(rest, `${idx}-p`)}</p>);
      return;
    }
    // Heading H2 (## ...) — também aceita "##Texto"
    if (HEADING2_RE.test(lines[0])) {
      out.push(<h2 key={idx}>{lines[0].replace(HEADING2_RE, "")}</h2>);
      const rest = lines.slice(1).join("\n");
      if (rest) out.push(<p key={`${idx}-p`}>{renderInline(rest, `${idx}-p`)}</p>);
      return;
    }

    // Lista: se MAIORIA das linhas começa com bullet/numeral, trata como lista
    const bulletCount = lines.filter((l) => BULLET_RE.test(l)).length;
    if (bulletCount >= Math.max(1, Math.ceil(lines.length * 0.6))) {
      const ordered = /^\s*\d+[.)]\s+/.test(lines[0]);
      const items = lines
        .filter((l) => BULLET_RE.test(l))
        .map((l, i) => (
          <li key={`${idx}-li-${i}`}>
            {renderInline(l.replace(BULLET_RE, ""), `${idx}-li-${i}`)}
          </li>
        ));
      out.push(ordered ? <ol key={idx}>{items}</ol> : <ul key={idx}>{items}</ul>);
      return;
    }

    out.push(<p key={idx}>{renderInline(lines.join(" "), `${idx}`)}</p>);
  });
  return <>{out}</>;
}