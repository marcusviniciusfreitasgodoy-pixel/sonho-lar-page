import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBackendClient, type BackendClient } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Check, X, Trash2, ArrowLeft, ExternalLink } from "lucide-react";

type Comentario = {
  id: string;
  artigo_id: string;
  nome: string;
  email: string;
  mensagem: string;
  status: "pendente" | "aprovado" | "rejeitado";
  created_at: string;
  artigos: { titulo: string; slug: string } | null;
};

type Filter = "pendente" | "aprovado" | "rejeitado" | "todos";

const AdminComentarios = () => {
  const [client, setClient] = useState<BackendClient | null>(null);
  const [items, setItems] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("pendente");

  useEffect(() => {
    document.title = "Admin · Comentários";
    getBackendClient().then((c) => setClient(c));
  }, []);

  useEffect(() => {
    if (!client) return;
    refresh();
    // realtime
    const ch = client
      .channel("admin-comentarios")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "artigo_comentarios" },
        () => refresh()
      )
      .subscribe();
    return () => {
      client.removeChannel(ch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, filter]);

  async function refresh() {
    if (!client) return;
    setLoading(true);
    let q = client
      .from("artigo_comentarios")
      .select("id, artigo_id, nome, email, mensagem, status, created_at, artigos(titulo, slug)")
      .order("created_at", { ascending: false });
    if (filter !== "todos") q = q.eq("status", filter);
    const { data, error } = await q;
    if (error) {
      toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
    } else {
      setItems((data as unknown as Comentario[]) ?? []);
    }
    setLoading(false);
  }

  async function setStatus(id: string, status: Comentario["status"]) {
    if (!client) return;
    const { error } = await client.from("artigo_comentarios").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: status === "aprovado" ? "Comentário aprovado." : "Comentário rejeitado." });
    }
  }

  async function remove(id: string) {
    if (!client) return;
    if (!confirm("Excluir este comentário definitivamente?")) return;
    const { error } = await client.from("artigo_comentarios").delete().eq("id", id);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else toast({ title: "Comentário excluído." });
  }

  const filters: { key: Filter; label: string }[] = [
    { key: "pendente", label: "Pendentes" },
    { key: "aprovado", label: "Aprovados" },
    { key: "rejeitado", label: "Rejeitados" },
    { key: "todos", label: "Todos" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <nav className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
          </Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/artigos" className="hover:text-foreground transition-colors">Artigos</Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/configuracoes" className="hover:text-foreground transition-colors">Configurações</Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/leads" className="hover:text-foreground transition-colors">Leads</Link>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight">Moderação de Comentários</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-8">
          Aprove para publicar no blog, ou rejeite para ocultar permanentemente.
        </p>

        <div className="flex gap-2 mb-6 flex-wrap">
          {filters.map((f) => (
            <Button
              key={f.key}
              size="sm"
              variant={filter === f.key ? "default" : "outline"}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : items.length === 0 ? (
          <div className="border rounded-lg p-10 text-center text-muted-foreground">
            Nenhum comentário {filter !== "todos" ? `com status "${filter}"` : ""}.
          </div>
        ) : (
          <div className="grid gap-3">
            {items.map((c) => (
              <div key={c.id} className="border rounded-lg p-5 bg-card">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-semibold">{c.nome}</span>
                  <span className="text-xs text-muted-foreground">&lt;{c.email}&gt;</span>
                  {c.status === "pendente" && <Badge variant="secondary">Pendente</Badge>}
                  {c.status === "aprovado" && <Badge className="bg-emerald-600 hover:bg-emerald-600">Aprovado</Badge>}
                  {c.status === "rejeitado" && <Badge variant="destructive">Rejeitado</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {new Date(c.created_at).toLocaleString("pt-BR")}
                  {c.artigos ? (
                    <>
                      {" · em "}
                      <a
                        href={`/artigos/${c.artigos.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline inline-flex items-center gap-1"
                      >
                        {c.artigos.titulo}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </>
                  ) : null}
                </p>
                <p className="text-sm whitespace-pre-wrap mb-4 leading-relaxed">{c.mensagem}</p>
                <div className="flex gap-2 flex-wrap">
                  {c.status !== "aprovado" && (
                    <Button size="sm" onClick={() => setStatus(c.id, "aprovado")}>
                      <Check className="mr-2 h-4 w-4" /> Aprovar
                    </Button>
                  )}
                  {c.status !== "rejeitado" && (
                    <Button size="sm" variant="outline" onClick={() => setStatus(c.id, "rejeitado")}>
                      <X className="mr-2 h-4 w-4" /> Rejeitar
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => remove(c.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminComentarios;