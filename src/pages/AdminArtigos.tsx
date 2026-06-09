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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, ExternalLink, Eye, FileUp, Loader2, ArrowLeft, ImagePlus, X, Code2 } from "lucide-react";
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
  autor_nome: string | null;
  autor_foto: string | null;
  autor_bio: string | null;
  autor_link: string | null;
  destaque: boolean;
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
  autor_nome: string;
  autor_foto: string;
  autor_bio: string;
  autor_link: string;
  destaque: boolean;
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
  autor_nome: "Marcus Godoy",
  autor_foto: "https://storage.googleapis.com/gpt-engineer-file-uploads/BBFgKw5VGEMBOR5chHp4mTx4SWQ2/uploads/1762304652528-11 - Perfil Circular 02.png",
  autor_bio: "Personal Shopper Imobiliário de Alto Padrão, especialista em Barra da Tijuca, Portugal e Flórida.",
  autor_link: "https://www.linkedin.com/in/marcusgodoy/",
  destaque: false,
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
  const [htmlPaste, setHtmlPaste] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);

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
      autor_nome: a.autor_nome ?? "",
      autor_foto: a.autor_foto ?? "",
      autor_bio: a.autor_bio ?? "",
      autor_link: a.autor_link ?? "",
      destaque: !!a.destaque,
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
      autor_nome: form.autor_nome.trim() || null,
      autor_foto: form.autor_foto.trim() || null,
      autor_bio: form.autor_bio.trim() || null,
      autor_link: form.autor_link.trim() || null,
      destaque: form.destaque,
    };

    if (form.id) {
      if (form.destaque) {
        await client.from("artigos").update({ destaque: false }).neq("id", form.id);
      }
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
      if (form.destaque) {
        await client.from("artigos").update({ destaque: false }).eq("destaque", true);
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

  // 1 ano em segundos (máximo permitido pelo Storage para signed URL).
  const COVER_SIGNED_URL_TTL = 60 * 60 * 24 * 365;

  async function handleCoverUpload(file: File) {
    if (!client) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Selecione um arquivo de imagem.", variant: "destructive" });
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast({ title: "Imagem muito grande (máx. 8 MB).", variant: "destructive" });
      return;
    }
    setUploadingCover(true);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const path = `${new Date().getFullYear()}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await client.storage
        .from("artigos-capas")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;
      const { data: signed, error: signErr } = await client.storage
        .from("artigos-capas")
        .createSignedUrl(path, COVER_SIGNED_URL_TTL);
      if (signErr || !signed?.signedUrl) throw signErr ?? new Error("Falha ao gerar URL");
      setForm((f) => ({ ...f, imagem_capa: signed.signedUrl }));
      toast({ title: "Imagem enviada." });
    } catch (err: any) {
      toast({
        title: "Erro ao enviar imagem",
        description: err?.message || String(err),
        variant: "destructive",
      });
    } finally {
      setUploadingCover(false);
    }
  }

  function parseHtmlToArtigo(html: string): {
    titulo: string;
    resumo: string;
    conteudo: string;
    categoria: string;
    capaUrl: string;
    capaRelativa: boolean;
  } {
    const doc = new DOMParser().parseFromString(html, "text/html");

    // Título: prioriza <h1>, faz fallback para <title> (removendo sufixos comuns).
    const h1 = doc.querySelector("h1")?.textContent?.trim() || "";
    const titleTag = (doc.querySelector("title")?.textContent || "")
      .replace(/\s*[—–|·-]\s*Godoy Prime Realty.*$/i, "")
      .trim();
    const titulo = h1 || titleTag;

    const metaDesc =
      doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ||
      doc.querySelector('meta[property="og:description"]')?.getAttribute("content")?.trim() ||
      "";

    // Categoria via .hero-eyebrow / [class*=eyebrow]
    const eyebrow =
      doc.querySelector(".hero-eyebrow")?.textContent?.trim() ||
      doc.querySelector("[class*='eyebrow']")?.textContent?.trim() ||
      "";

    // Imagem de capa via header.article-hero img (ou primeira img dentro do <header>).
    const heroImg =
      (doc.querySelector("header.article-hero img") as HTMLImageElement | null) ||
      (doc.querySelector("header img") as HTMLImageElement | null);
    const rawSrc = heroImg?.getAttribute("src")?.trim() || "";
    const isAbsolute = /^(https?:)?\/\//i.test(rawSrc) || rawSrc.startsWith("data:");
    const capaUrl = isAbsolute ? rawSrc : "";
    const capaRelativa = !!rawSrc && !isAbsolute;

    // Escolhe raiz do conteúdo: .article-body > article > main > body.
    const root: Element =
      doc.querySelector(".article-body") ||
      doc.querySelector("article") ||
      doc.querySelector("main") ||
      doc.body ||
      doc.documentElement;

    // Clona e remove o que não é conteúdo.
    const clone = root.cloneNode(true) as Element;
    clone.querySelectorAll(
      "script, style, noscript, nav, header, footer, aside, form, iframe, " +
      ".article-cta, .related-nav, .site-nav, .site-footer, .nav-back, .nav-cta",
    ).forEach((n) => n.remove());

    // Limpa travessões/bullets soltos nos nós de texto.
    const cleanTextNodes = (el: Node) => {
      el.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          child.textContent = (child.textContent || "")
            .replace(/[\u2013\u2014\u2212]/g, "-")
            .replace(/[•·●◦‣▪]/g, "");
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          cleanTextNodes(child);
        }
      });
    };
    cleanTextNodes(clone);

    const conteudo = clone.innerHTML.trim();

    const plain = (clone.textContent || "").replace(/\s+/g, " ").trim();
    const resumo = (metaDesc || plain.slice(0, 200)).slice(0, 280);

    return { titulo, resumo, conteudo, categoria: eyebrow, capaUrl, capaRelativa };
  }

  function applyHtmlImport(html: string) {
    const trimmed = html.trim();
    if (!trimmed) {
      toast({ title: "Cole o HTML antes de importar.", variant: "destructive" });
      return;
    }
    try {
      const { titulo, resumo, conteudo, categoria, capaUrl, capaRelativa } = parseHtmlToArtigo(trimmed);
      if (!titulo && !conteudo) {
        toast({
          title: "Não foi possível extrair o conteúdo",
          description: "O HTML enviado não possui uma estrutura clara (título, parágrafos ou cabeçalhos). Verifique o arquivo e tente novamente.",
          variant: "destructive",
        });
        return;
      }
      // Mapeia categoria importada (ex.: "Educacional") para a lista oficial; só aplica se houver match.
      const categoriaNorm = categoria.trim().toLowerCase();
      const matchedCat =
        CATEGORIAS.find((c) => c.toLowerCase() === categoriaNorm) ||
        CATEGORIAS.find((c) => c.toLowerCase().includes(categoriaNorm) && categoriaNorm.length > 2) ||
        "";

      setForm((f) => ({
        ...f,
        titulo: titulo || f.titulo,
        resumo: resumo || f.resumo,
        conteudo: conteudo || f.conteudo,
        categoria: matchedCat || f.categoria,
        imagem_capa: capaUrl || f.imagem_capa,
      }));

      toast({
        title: "HTML importado.",
        description: capaRelativa
          ? "Conteúdo importado. A imagem de capa tinha caminho relativo — envie-a manualmente."
          : "Revise título, resumo, categoria e conteúdo antes de salvar.",
      });
    } catch (err: any) {
      toast({
        title: "Erro ao processar HTML",
        description: err?.message || String(err),
        variant: "destructive",
      });
    }
  }

  async function handleImportHtmlFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".html") && !file.name.toLowerCase().endsWith(".htm")) {
      toast({ title: "Selecione um arquivo .html", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Arquivo muito grande (máx. 5 MB).", variant: "destructive" });
      return;
    }
    setImporting(true);
    try {
      const text = await file.text();
      applyHtmlImport(text);
    } catch (err: any) {
      toast({ title: "Erro ao ler arquivo", description: err?.message || String(err), variant: "destructive" });
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
          <Link to="/admin/newsletter" className="hover:text-foreground transition-colors">Newsletter</Link>
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
                  {a.destaque ? (
                    <Badge className="bg-amber-600 hover:bg-amber-600 text-[10px] tracking-[0.18em] uppercase">
                      Em destaque
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
          <div className="rounded-md border bg-muted/20 p-4 grid gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Code2 className="h-3.5 w-3.5" /> Importar HTML
            </div>
            <p className="text-xs text-muted-foreground -mt-1">
              Preenche <strong>Título</strong>, <strong>Resumo</strong> e <strong>Conteúdo completo</strong> a partir de um HTML.
            </p>
            <Tabs defaultValue="paste">
              <TabsList className="grid grid-cols-2 w-full max-w-sm">
                <TabsTrigger value="paste">Colar HTML</TabsTrigger>
                <TabsTrigger value="file">Enviar arquivo</TabsTrigger>
              </TabsList>
              <TabsContent value="paste" className="grid gap-2">
                <Textarea
                  rows={6}
                  placeholder="<html>... cole o código HTML aqui ...</html>"
                  value={htmlPaste}
                  onChange={(e) => setHtmlPaste(e.target.value)}
                  className="font-mono text-xs"
                />
                <div className="flex gap-2 flex-wrap">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => applyHtmlImport(htmlPaste)}
                    disabled={!htmlPaste.trim()}
                  >
                    <Code2 className="mr-2 h-4 w-4" /> Importar conteúdo
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setPreviewOpen(true)}
                    disabled={!form.titulo && !form.conteudo}
                  >
                    <Eye className="mr-2 h-4 w-4" /> Visualizar
                  </Button>
                  {htmlPaste ? (
                    <Button type="button" size="sm" variant="ghost" onClick={() => setHtmlPaste("")}>
                      <X className="mr-2 h-4 w-4" /> Limpar
                    </Button>
                  ) : null}
                </div>
              </TabsContent>
              <TabsContent value="file" className="grid gap-2">
                <div className="flex gap-2 flex-wrap items-center">
                  <Button type="button" size="sm" variant="outline" asChild>
                    <label className={`cursor-pointer ${importing ? "opacity-60 pointer-events-none" : ""}`}>
                      {importing ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <FileUp className="mr-2 h-4 w-4" />
                      )}
                      {importing ? "Enviando…" : "Enviar arquivo"}
                      <input
                        type="file"
                        accept=".html,.htm,text/html"
                        className="hidden"
                        disabled={importing}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          e.target.value = "";
                          if (f) handleImportHtmlFile(f);
                        }}
                      />
                    </label>
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setPreviewOpen(true)}
                    disabled={!form.titulo && !form.conteudo}
                  >
                    <Eye className="mr-2 h-4 w-4" /> Visualizar
                  </Button>
                  <span className="text-xs text-muted-foreground">Aceita apenas .html (máx. 5 MB).</span>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="titulo">Título</Label>
              <Input id="titulo" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imagem">Imagem de capa</Label>
              <div className="flex gap-3 items-start">
                <div className="w-28 h-20 rounded-md border bg-muted/40 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {form.imagem_capa ? (
                    <img src={form.imagem_capa} alt="Capa" className="w-full h-full object-cover" />
                  ) : (
                    <ImagePlus className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 grid gap-2">
                  <div className="flex gap-2 flex-wrap">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <label className={`cursor-pointer ${uploadingCover ? "opacity-60 pointer-events-none" : ""}`}>
                        {uploadingCover ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <ImagePlus className="mr-2 h-4 w-4" />
                        )}
                        {uploadingCover ? "Enviando…" : form.imagem_capa ? "Trocar imagem" : "Enviar imagem"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingCover}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            e.target.value = "";
                            if (f) handleCoverUpload(f);
                          }}
                        />
                      </label>
                    </Button>
                    {form.imagem_capa ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setForm({ ...form, imagem_capa: "" })}
                      >
                        <X className="mr-2 h-4 w-4" /> Remover
                      </Button>
                    ) : null}
                  </div>
                  <Input
                    id="imagem"
                    placeholder="Ou cole um link https://..."
                    value={form.imagem_capa}
                    onChange={(e) => setForm({ ...form, imagem_capa: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG ou WebP até 8 MB. A imagem fica salva no storage do projeto.
                  </p>
                </div>
              </div>
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
              <p className="text-xs text-muted-foreground">
                Resumo que aparece na listagem do blog e em cards de compartilhamento.
              </p>
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
            <div className="grid gap-3 rounded-md border p-4 bg-muted/30">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Autor do artigo
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="autor_nome">Nome do autor</Label>
                  <Input
                    id="autor_nome"
                    value={form.autor_nome}
                    onChange={(e) => setForm({ ...form, autor_nome: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="autor_foto">Link da foto</Label>
                  <Input
                    id="autor_foto"
                    placeholder="https://..."
                    value={form.autor_foto}
                    onChange={(e) => setForm({ ...form, autor_foto: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="autor_bio">Mini bio</Label>
                <Textarea
                  id="autor_bio"
                  rows={3}
                  value={form.autor_bio}
                  onChange={(e) => setForm({ ...form, autor_bio: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="autor_link">Link do LinkedIn ou Instagram</Label>
                <Input
                  id="autor_link"
                  placeholder="https://www.linkedin.com/in/..."
                  value={form.autor_link}
                  onChange={(e) => setForm({ ...form, autor_link: e.target.value })}
                />
              </div>
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
            <div className="grid gap-2 rounded-md border p-4 bg-muted/30">
              <Label className="flex items-center justify-between gap-3 cursor-pointer">
                <span>
                  <span className="block text-sm font-medium">Destaque Principal</span>
                  <span className="block text-xs text-muted-foreground mt-1">
                    Aparece no topo da listagem com um visual ampliado. Apenas um artigo pode estar em destaque por vez — ao ativar aqui, o anterior é desmarcado automaticamente.
                  </span>
                </span>
                <Switch
                  checked={form.destaque}
                  onCheckedChange={(v) => setForm({ ...form, destaque: v })}
                />
              </Label>
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