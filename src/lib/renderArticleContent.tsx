import { Fragment, type ReactNode } from "react";

// Minimal markdown-ish renderer: ## h2, ### h3, - list, **bold**, paragraphs.
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
    const lines = blk.split("\n").filter((l) => l.length > 0);
    if (lines.length === 0) return;
    if (lines[0].startsWith("## ")) {
      out.push(<h2 key={idx}>{lines[0].slice(3)}</h2>);
      const rest = lines.slice(1).join("\n");
      if (rest) out.push(<p key={`${idx}-p`}>{renderInline(rest, `${idx}-p`)}</p>);
      return;
    }
    if (lines[0].startsWith("### ")) {
      out.push(<h3 key={idx}>{lines[0].slice(4)}</h3>);
      const rest = lines.slice(1).join("\n");
      if (rest) out.push(<p key={`${idx}-p`}>{renderInline(rest, `${idx}-p`)}</p>);
      return;
    }
    if (lines.every((l) => /^([-*]|\d+\.)\s+/.test(l))) {
      const ordered = /^\d+\.\s+/.test(lines[0]);
      const items = lines.map((l, i) => (
        <li key={`${idx}-li-${i}`}>{renderInline(l.replace(/^([-*]|\d+\.)\s+/, ""), `${idx}-li-${i}`)}</li>
      ));
      out.push(ordered ? <ol key={idx}>{items}</ol> : <ul key={idx}>{items}</ul>);
      return;
    }
    out.push(<p key={idx}>{renderInline(lines.join(" "), `${idx}`)}</p>);
  });
  return <>{out}</>;
}