import { Fragment, type ReactNode } from "react";

// Bullet chars aceitos no início de itens de lista (hífen, asterisco, bullets
// unicode e travessões/em-dash que muitas vezes aparecem ao colar de PDFs/Docs).
const BULLET_RE = /^\s*([-*•·●◦‣▪–—]|\d+[.)])\s+/;
const HEADING2_RE = /^\s*##\s*/;
const HEADING3_RE = /^\s*###\s*/;

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