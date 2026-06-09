import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBackendClient, type BackendClient } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIAS = [
  "Compra de Imóveis",
  "Venda de Imóveis",
  "Investimentos",
  "Dicas de Alto Padrão",
] as const;
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, ExternalLink, Eye, FileUp, Loader2, ArrowLeft } from "lucide-react";
import ArtigoPreview from "@/components/admin/ArtigoPreview";

type Artigo = {
  id: string;
  titulo: string;
  slug: string;
  imagem_capa: string | null;
  resumo: string;
  conteudo: string;
  data_publicacao: string;
  ativo: boolean;
  created_at: string;
  categoria: string | null;
};

type FormState = {
  id?: string;
  titulo: string;
  imagem_capa: string;
  resumo: string;
  conteudo: string;
  data_publicacao: string; // yyyy-mm-dd
  ativo: boolean;
  categoria: string;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function toDateInput(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

const emptyForm: FormState = {
  titulo: "",
  imagem_capa: "",
  resumo: "",
  conteudo: "",
  data_publicacao: new Date().toISOString().slice(0, 10),
  ativo: true,
  categoria: "",
};

const AdminArtigos = () => {
  const [client, setClient] = useState<BackendClient | null>(null);
  const [items, setItems] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Artigo | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    document.title = "Admin · Artigos";
    getBackendClient().then((c) => setClient(c));
  }, []);

  useEffect(() => {
    if (!client) return;
    refresh(client);
  }, [client]);

  async function refresh(c: BackendClient) {
    setLoading(true);
    const { data, error } = await c
      .from("artigos")
      .select("*")
      .order("data_publicacao", { ascending: false });
    if (error) {
      toast({ title: "Erro ao carregar artigos", description: error.message, variant: "destructive" });
    } else {
      setItems((data as Artigo[]) ?? []);
    }
    setLoading(false);
  }

  function openNew() {
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEdit(a: Artigo) {
    setForm({
      id: a.id,
      titulo: a.titulo,
      imagem_capa: a.imagem_capa ?? "",
      resumo: a.resumo,
      conteudo: a.conteudo,
      data_publicacao: toDateInput(a.data_publicacao),
      ativo: a.ativo,
      categoria: a.categoria ?? "",
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!client) return;
    if (!form.titulo.trim() || !form.resumo.trim() || !form.conteudo.trim()) {
      toast({ title: "Preencha título, resumo e conteúdo.", variant: "destructive" });
      return;
    }
    setSaving(true);

    const baseSlug = slugify(form.titulo);
    const payload = {
      titulo: form.titulo.trim(),
      imagem_capa: form.imagem_capa.trim() || null,
      resumo: form.resumo.trim(),
      conteudo: form.conteudo,
      data_publicacao: new Date(form.data_publicacao + "T12:00:00").toISOString(),
      ativo: form.ativo,
      categoria: form.categoria.trim() || null,
    };

    if (form.id) {
      const { error } = await client.from("artigos").update(payload).eq("id", form.id);
      if (error) {
        toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Artigo atualizado." });
        setDialogOpen(false);
        await refresh(client);
      }
    } else {
      // Ensure unique slug
      let slug = baseSlug || `artigo-${Date.now()}`;
      const { data: existing } = await client.from("artigos").select("slug").like("slug", `${slug}%`);
      const taken = new Set((existing ?? []).map((r: any) => r.slug));
      if (taken.has(slug)) {
        let n = 2;
        while (taken.has(`${slug}-${n}`)) n++;
        slug = `${slug}-${n}`;
      }
      const { error } = await client.from("artigos").insert({ ...payload, slug });
      if (error) {
        toast({ title: "Erro ao criar", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Artigo criado." });
        setDialogOpen(false);
        await refresh(client);
      }
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!client || !confirmDelete) return;
    const { error } = await client.from("artigos").delete().eq("id", confirmDelete.id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Artigo excluído." });
      setConfirmDelete(null);
      await refresh(client);
    }
  }

  async function toggleAtivo(a: Artigo) {
    if (!client) return;
    const { error } = await client.from("artigos").update({ ativo: !a.ativo }).eq("id", a.id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      await refresh(client);
    }
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // strip "data:...;base64," prefix
        const comma = result.indexOf(",");
        resolve(comma >= 0 ? result.slice(comma + 1) : result);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  async function handleImportPdf(file: File) {
    if (!client) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      toast({ title: "Selecione um arquivo PDF.", variant: "destructive" });
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      toast({ title: "PDF muito grande (máx. 12 MB).", variant: "destructive" });
      return;
    }
    setImporting(true);
    try {
      const file_base64 = await fileToBase64(file);
      const { data, error } = await client.functions.invoke("import-pdf-artigo", {
        body: { file_base64, filename: file.name },
      });
      if (error) throw error;
      if (!data?.ok) throw new Error(data?.error || "Falha ao importar PDF");
      setForm({
        titulo: data.titulo ?? "",
        imagem_capa: "",
        resumo: data.resumo ?? "",
        conteudo: data.conteudo ?? "",
        data_publicacao: new Date().toISOString().slice(0, 10),
        ativo: false,
        categoria: "",
      });
      setDialogOpen(true);
      toast({
        title: "PDF importado.",
        description: "Revise o texto, ajuste a formatação e adicione a imagem de capa antes de ativar.",
      });
    } catch (err: any) {
      toast({
        title: "Erro ao importar PDF",
        description: err?.message || String(err),
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <nav className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
          </Link>
          <span className="opacity-30">·</span>
          <Link to="/artigos" className="hover:text-foreground transition-colors">Blog público</Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/comentarios" className="hover:text-foreground transition-colors">Comentários</Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/configuracoes" className="hover:text-foreground transition-colors">Configurações</Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/leads" className="hover:text-foreground transition-colors">Leads</Link>
        </nav>
        <div className="admin-art-toolbar">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Artigos</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie os conteúdos publicados em <Link to="/artigos" className="underline">/artigos</Link>.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <label className={`cursor-pointer ${importing ? "opacity-60 pointer-events-none" : ""}`}>
                {importing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileUp className="mr-2 h-4 w-4" />
                )}
                {importing ? "Importando…" : "Importar PDF"}
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  className="hidden"
                  disabled={importing}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    e.target.value = "";
                    if (f) handleImportPdf(f);
                  }}
                />
              </label>
            </Button>
            <Button onClick={openNew}>
              <Plus className="mr-2 h-4 w-4" /> Novo artigo
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : items.length === 0 ? (
          <div className="border rounded-lg p-10 text-center text-muted-foreground">
            Nenhum artigo ainda. Clique em <strong>Novo artigo</strong> para começar.
          </div>
        ) : (
          <div className="grid gap-3">
            {items.map((a) => (
              <div key={a.id} className="border rounded-lg p-4 flex gap-4 items-start bg-card">
                {a.imagem_capa ? (
                  <img src={a.imagem_capa} alt="" className="w-28 h-20 object-cover rounded-md flex-shrink-0" />
                ) : (
                  <div className="w-28 h-20 bg-muted rounded-md flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold truncate">{a.titulo}</h3>
                    {a.ativo ? (
                      <Badge className="bg-emerald-600 hover:bg-emerald-600">Ativo</Badge>
                    ) : (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  {a.categoria ? (
                    <Badge variant="outline" className="text-[10px] tracking-[0.18em] uppercase">
                      {a.categoria}
                    </Badge>
                  ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {new Date(a.data_publicacao).toLocaleDateString("pt-BR")} · /artigos/{a.slug}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{a.resumo}</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Switch checked={a.ativo} onCheckedChange={() => toggleAtivo(a)} />
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" asChild title="Ver">
                      <a href={`/artigos/${a.slug}`} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => openEdit(a)} title="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setConfirmDelete(a)} title="Excluir">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Editar artigo" : "Novo artigo"}</DialogTitle>
            <DialogDescription>
              Use ## para subtítulos, - para listas e **texto** para negrito.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="titulo">Título</Label>
              <Input id="titulo" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imagem">Link da imagem de capa</Label>
              <Input
                id="imagem"
                placeholder="https://..."
                value={form.imagem_capa}
                onChange={(e) => setForm({ ...form, imagem_capa: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select
                value={form.categoria || undefined}
                onValueChange={(v) => setForm({ ...form, categoria: v })}
              >
                <SelectTrigger id="categoria">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resumo">Resumo curto</Label>
              <Textarea
                id="resumo"
                rows={2}
                value={form.resumo}
                onChange={(e) => setForm({ ...form, resumo: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="conteudo">Conteúdo completo</Label>
              <Textarea
                id="conteudo"
                rows={14}
                value={form.conteudo}
                onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="data">Data de publicação</Label>
                <Input
                  id="data"
                  type="date"
                  value={form.data_publicacao}
                  onChange={(e) => setForm({ ...form, data_publicacao: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <div className="flex items-center gap-3 h-10">
                  <Switch checked={form.ativo} onCheckedChange={(v) => setForm({ ...form, ativo: v })} />
                  <span className="text-sm">{form.ativo ? "Ativo (publicado)" : "Inativo (rascunho)"}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPreviewOpen(true)}
              disabled={saving}
              className="mr-auto"
            >
              <Eye className="mr-2 h-4 w-4" /> Pré-visualizar
            </Button>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Salvando…" : form.id ? "Salvar alterações" : "Criar artigo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ArtigoPreview
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        titulo={form.titulo}
        resumo={form.resumo}
        conteudo={form.conteudo}
        imagem_capa={form.imagem_capa}
        data_publicacao={form.data_publicacao}
      />

      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir artigo</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir <strong>{confirmDelete?.titulo}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminArtigos;