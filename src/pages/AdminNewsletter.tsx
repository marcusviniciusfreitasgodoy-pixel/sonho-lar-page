import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBackendClient, type BackendClient } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Trash2, ArrowLeft, Download } from "lucide-react";

type Assinante = {
  id: string;
  nome: string | null;
  email: string;
  data_cadastro: string;
};

const AdminNewsletter = () => {
  const [client, setClient] = useState<BackendClient | null>(null);
  const [items, setItems] = useState<Assinante[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin · Newsletter";
    getBackendClient().then((c) => setClient(c));
  }, []);

  useEffect(() => {
    if (!client) return;
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  async function refresh() {
    if (!client) return;
    setLoading(true);
    const { data, error } = await client
      .from("newsletter_assinantes")
      .select("id, nome, email, data_cadastro")
      .order("data_cadastro", { ascending: false });
    if (error) {
      toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
    } else {
      setItems((data as Assinante[]) ?? []);
    }
    setLoading(false);
  }

  async function remove(id: string, email: string) {
    if (!client) return;
    if (!confirm(`Excluir o assinante ${email}?`)) return;
    const { error } = await client.from("newsletter_assinantes").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Assinante removido." });
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  }

  function exportCSV() {
    const rows = [["nome", "email", "data_cadastro"]];
    items.forEach((i) =>
      rows.push([i.nome ?? "", i.email, new Date(i.data_cadastro).toISOString()])
    );
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <nav className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground flex-wrap">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
          </Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/artigos" className="hover:text-foreground transition-colors">Artigos</Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/comentarios" className="hover:text-foreground transition-colors">Comentários</Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/configuracoes" className="hover:text-foreground transition-colors">Configurações</Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/leads" className="hover:text-foreground transition-colors">Leads</Link>
        </nav>

        <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Assinantes Newsletter</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {items.length} {items.length === 1 ? "assinante cadastrado" : "assinantes cadastrados"}.
            </p>
          </div>
          {items.length > 0 && (
            <Button size="sm" variant="outline" onClick={exportCSV}>
              <Download className="mr-2 h-4 w-4" /> Exportar CSV
            </Button>
          )}
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : items.length === 0 ? (
          <div className="border rounded-lg p-10 text-center text-muted-foreground">
            Nenhum assinante cadastrado ainda.
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Nome</th>
                  <th className="text-left px-5 py-3 font-medium">E-mail</th>
                  <th className="text-left px-5 py-3 font-medium">Cadastro</th>
                  <th className="text-right px-5 py-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-t">
                    <td className="px-5 py-3">{i.nome || <span className="text-muted-foreground">—</span>}</td>
                    <td className="px-5 py-3 font-mono text-xs">{i.email}</td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {new Date(i.data_cadastro).toLocaleString("pt-BR")}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button size="sm" variant="ghost" onClick={() => remove(i.id, i.email)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNewsletter;