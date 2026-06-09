import { useEffect, useState, type FormEvent } from "react";
import { Heart } from "lucide-react";
import { getBackendClient } from "@/lib/backend";
import { toast } from "@/hooks/use-toast";

type Comentario = {
  id: string;
  nome: string;
  mensagem: string;
  created_at: string;
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ArticleEngagement({ artigoId }: { artigoId: string }) {
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [liking, setLiking] = useState(false);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loadingComentarios, setLoadingComentarios] = useState(true);
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [submitting, setSubmitting] = useState(false);

  const storageKey = `artigo-liked-${artigoId}`;

  useEffect(() => {
    try {
      setHasLiked(localStorage.getItem(storageKey) === "1");
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    let cancelled = false;
    let likesChannel: any = null;
    let comentariosChannel: any = null;

    (async () => {
      const client = await getBackendClient();
      if (!client || cancelled) return;

      // Initial fetch — likes
      const { count } = await client
        .from("artigo_likes")
        .select("id", { count: "exact", head: true })
        .eq("artigo_id", artigoId);
      if (!cancelled) setLikes(count ?? 0);

      // Initial fetch — comentários aprovados
      const { data } = await client
        .from("artigo_comentarios")
        .select("id, nome, mensagem, created_at")
        .eq("artigo_id", artigoId)
        .eq("status", "aprovado")
        .order("created_at", { ascending: false });
      if (!cancelled) {
        setComentarios((data as Comentario[]) ?? []);
        setLoadingComentarios(false);
      }

      // Realtime — likes
      likesChannel = client
        .channel(`likes-${artigoId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "artigo_likes", filter: `artigo_id=eq.${artigoId}` },
          () => setLikes((n) => n + 1)
        )
        .subscribe();

      // Realtime — comentários (insere quando ficam aprovados)
      comentariosChannel = client
        .channel(`comentarios-${artigoId}`)
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "artigo_comentarios", filter: `artigo_id=eq.${artigoId}` },
          (payload: any) => {
            const row = payload.new as Comentario & { status: string };
            if (row.status === "aprovado") {
              setComentarios((curr) =>
                curr.some((c) => c.id === row.id)
                  ? curr
                  : [{ id: row.id, nome: row.nome, mensagem: row.mensagem, created_at: row.created_at }, ...curr]
              );
            } else {
              setComentarios((curr) => curr.filter((c) => c.id !== row.id));
            }
          }
        )
        .subscribe();
    })();

    return () => {
      cancelled = true;
      (async () => {
        const client = await getBackendClient();
        if (!client) return;
        if (likesChannel) client.removeChannel(likesChannel);
        if (comentariosChannel) client.removeChannel(comentariosChannel);
      })();
    };
  }, [artigoId]);

  async function handleLike() {
    if (hasLiked || liking) return;
    setLiking(true);
    // optimistic
    setHasLiked(true);
    setLikes((n) => n + 1);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {}
    try {
      const client = await getBackendClient();
      if (!client) throw new Error("backend indisponível");
      const { error } = await client.from("artigo_likes").insert({ artigo_id: artigoId });
      if (error) throw error;
    } catch (err: any) {
      // rollback
      setHasLiked(false);
      setLikes((n) => Math.max(0, n - 1));
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      toast({ title: "Não foi possível registrar a curtida.", description: err?.message, variant: "destructive" });
    } finally {
      setLiking(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nome = form.nome.trim();
    const email = form.email.trim();
    const mensagem = form.mensagem.trim();
    if (nome.length < 2) return toast({ title: "Informe seu nome." });
    if (!EMAIL_RE.test(email)) return toast({ title: "E-mail inválido." });
    if (mensagem.length < 3) return toast({ title: "Escreva uma mensagem." });
    if (mensagem.length > 2000) return toast({ title: "Mensagem muito longa (máx. 2000 caracteres)." });

    setSubmitting(true);
    try {
      const client = await getBackendClient();
      if (!client) throw new Error("backend indisponível");
      const { error } = await client
        .from("artigo_comentarios")
        .insert({ artigo_id: artigoId, nome, email, mensagem });
      if (error) throw error;
      setForm({ nome: "", email: "", mensagem: "" });
      toast({
        title: "Comentário enviado.",
        description: "Seu comentário ficará visível após a moderação.",
      });
    } catch (err: any) {
      toast({ title: "Falha ao enviar", description: err?.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="article-engagement" aria-label="Curtidas e comentários">
      {/* Likes */}
      <div className="engage-likes">
        <button
          type="button"
          className={`like-btn${hasLiked ? " is-liked" : ""}`}
          onClick={handleLike}
          disabled={hasLiked || liking}
          aria-pressed={hasLiked}
          aria-label={hasLiked ? "Você curtiu este artigo" : "Curtir este artigo"}
        >
          <Heart
            className="like-icon"
            size={20}
            strokeWidth={1.8}
            fill={hasLiked ? "currentColor" : "none"}
          />
          <span className="like-label">{hasLiked ? "Curtido" : "Curtir"}</span>
          <span className="like-count">{likes}</span>
        </button>
        <span className="engage-hint">
          {likes === 0 ? "Seja o primeiro a curtir." : likes === 1 ? "1 leitor curtiu este artigo." : `${likes} leitores curtiram este artigo.`}
        </span>
      </div>

      {/* Comentários */}
      <div className="engage-comments">
        <h2 className="engage-title">Comentários</h2>

        {loadingComentarios ? (
          <p className="engage-empty">Carregando…</p>
        ) : comentarios.length === 0 ? (
          <p className="engage-empty">Nenhum comentário aprovado ainda. Seja o primeiro a contribuir.</p>
        ) : (
          <ul className="comment-list">
            {comentarios.map((c) => (
              <li key={c.id} className="comment-item">
                <div className="comment-head">
                  <span className="comment-author">{c.nome}</span>
                  <span className="comment-date">{formatDate(c.created_at)}</span>
                </div>
                <p className="comment-msg">{c.mensagem}</p>
              </li>
            ))}
          </ul>
        )}

        <form className="comment-form" onSubmit={handleSubmit} noValidate>
          <h3 className="comment-form-title">Deixe seu comentário</h3>
          <p className="comment-form-note">
            Seu comentário passará por moderação antes de aparecer publicamente. O e-mail não é exibido.
          </p>
          <div className="comment-form-grid">
            <label className="cf-field">
              <span>Nome</span>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                maxLength={80}
                required
                autoComplete="name"
              />
            </label>
            <label className="cf-field">
              <span>E-mail</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={160}
                required
                autoComplete="email"
              />
            </label>
          </div>
          <label className="cf-field cf-field-full">
            <span>Mensagem</span>
            <textarea
              rows={5}
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              maxLength={2000}
              required
            />
          </label>
          <button type="submit" className="comment-submit" disabled={submitting}>
            {submitting ? "Enviando…" : "Enviar comentário"}
          </button>
        </form>
      </div>
    </section>
  );
}