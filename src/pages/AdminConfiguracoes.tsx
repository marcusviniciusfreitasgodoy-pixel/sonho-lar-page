import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBackendClient, type BackendClient } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

type Settings = {
  cta_titulo: string;
  cta_subtitulo: string;
  cta_botao_texto: string;
  whatsapp_url: string;
};

const empty: Settings = {
  cta_titulo: "",
  cta_subtitulo: "",
  cta_botao_texto: "",
  whatsapp_url: "",
};

const AdminConfiguracoes = () => {
  const [client, setClient] = useState<BackendClient | null>(null);
  const [form, setForm] = useState<Settings>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "Admin · Configurações do Blog";
    getBackendClient().then((c) => setClient(c));
  }, []);

  useEffect(() => {
    if (!client) return;
    (async () => {
      setLoading(true);
      const { data, error } = await client
        .from("blog_settings")
        .select("cta_titulo, cta_subtitulo, cta_botao_texto, whatsapp_url")
        .maybeSingle();
      if (error) {
        toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
      } else if (data) {
        setForm(data as Settings);
      }
      setLoading(false);
    })();
  }, [client]);

  async function handleSave() {
    if (!client) return;
    if (!form.cta_titulo.trim() || !form.cta_botao_texto.trim() || !form.whatsapp_url.trim()) {
      toast({ title: "Preencha título, texto do botão e link do WhatsApp.", variant: "destructive" });
      return;
    }
    if (!/^https?:\/\//i.test(form.whatsapp_url.trim())) {
      toast({ title: "Link do WhatsApp deve começar com http(s)://", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await client
      .from("blog_settings")
      .update({
        cta_titulo: form.cta_titulo.trim(),
        cta_subtitulo: form.cta_subtitulo.trim(),
        cta_botao_texto: form.cta_botao_texto.trim(),
        whatsapp_url: form.whatsapp_url.trim(),
      })
      .eq("id", true);
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Configurações salvas." });
    }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <nav className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
          </Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/artigos" className="hover:text-foreground transition-colors">Artigos</Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/comentarios" className="hover:text-foreground transition-colors">Comentários</Link>
          <span className="opacity-30">·</span>
          <Link to="/admin/leads" className="hover:text-foreground transition-colors">Leads</Link>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight">Configurações do Blog</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-8">
          Estas configurações são aplicadas automaticamente ao bloco de CTA exibido no final de todos os artigos.
        </p>

        {loading ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : (
          <div className="grid gap-6 border rounded-lg p-6 bg-card">
            <div className="grid gap-2">
              <Label htmlFor="cta_titulo">Título do CTA</Label>
              <Input
                id="cta_titulo"
                value={form.cta_titulo}
                maxLength={140}
                onChange={(e) => setForm({ ...form, cta_titulo: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cta_subtitulo">Frase de valor</Label>
              <Textarea
                id="cta_subtitulo"
                rows={3}
                maxLength={300}
                value={form.cta_subtitulo}
                onChange={(e) => setForm({ ...form, cta_subtitulo: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cta_botao_texto">Texto do botão</Label>
                <Input
                  id="cta_botao_texto"
                  value={form.cta_botao_texto}
                  maxLength={60}
                  onChange={(e) => setForm({ ...form, cta_botao_texto: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="whatsapp_url">Link do WhatsApp</Label>
                <Input
                  id="whatsapp_url"
                  placeholder="https://wa.me/55XXXXXXXXXXX"
                  value={form.whatsapp_url}
                  onChange={(e) => setForm({ ...form, whatsapp_url: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Salvando…" : "Salvar configurações"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConfiguracoes;