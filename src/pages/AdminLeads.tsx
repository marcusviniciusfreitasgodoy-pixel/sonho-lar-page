import { useEffect, useMemo, useState } from "react";
import { getBackendClient, type BackendClient } from "@/lib/backend";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { RefreshCw, Download, LogOut, Copy, MessageCircle } from "lucide-react";

type Lead = {
  id: string;
  nome: string;
  email: string | null;
  whatsapp: string | null;
  servico: string | null;
  orcamento: string | null;
  momento: string | null;
  mensagem: string | null;
  origem: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string | null;
  landing_path: string | null;
  crm_status: string;
  crm_response: any;
  crm_attempts: number;
  crm_last_attempt_at: string | null;
  is_duplicate: boolean;
  duplicate_of: string | null;
  created_at: string;
};

const PAGE_SIZE = 50;
const PERIODS = [
  { v: "1", l: "Hoje" },
  { v: "7", l: "Últimos 7 dias" },
  { v: "30", l: "Últimos 30 dias" },
  { v: "90", l: "Últimos 90 dias" },
  { v: "all", l: "Tudo" },
];

function statusBadge(s: string) {
  if (s === "sent") return <Badge className="bg-emerald-600 hover:bg-emerald-600">Enviado</Badge>;
  if (s === "failed") return <Badge variant="destructive">Falhou</Badge>;
  return <Badge variant="secondary">Pendente</Badge>;
}

const AdminLeads = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30");
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [retrying, setRetrying] = useState<string | null>(null);
  const [client, setClient] = useState<BackendClient | null>(null);

  useEffect(() => {
    let cancelled = false;
    getBackendClient().then((backendClient) => {
      if (cancelled) return;
      setClient(backendClient);
      if (!backendClient) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  const fetchLeads = async () => {
    if (!client) { setLoading(false); return; }
    setLoading(true);
    let q = client.from("leads").select("*", { count: "exact" }).order("created_at", { ascending: false });
    if (period !== "all") {
      const since = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000).toISOString();
      q = q.gte("created_at", since);
    }
    if (status !== "all") q = q.eq("crm_status", status);
    if (search.trim()) {
      const s = `%${search.trim()}%`;
      q = q.or(`nome.ilike.${s},email.ilike.${s},whatsapp.ilike.${s}`);
    }
    q = q.range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
    const { data, error, count } = await q;
    setLoading(false);
    if (error) { toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" }); return; }
    setLeads((data || []) as Lead[]);
    setTotal(count || 0);
  };

  useEffect(() => { if (client) fetchLeads(); }, [client, period, status, page]);

  // KPIs computed from current page; for accurate totals we use count fetch
  const [kpis, setKpis] = useState({ total: 0, sent: 0, failed: 0, dupes: 0 });
  useEffect(() => {
    (async () => {
      if (!client) return;
      const since = period === "all" ? null : new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000).toISOString();
      const base = () => {
        let q = client.from("leads").select("id", { count: "exact", head: true });
        if (since) q = q.gte("created_at", since);
        return q;
      };
      const [t, s, f, d] = await Promise.all([
        base(),
        base().eq("crm_status", "sent"),
        base().eq("crm_status", "failed"),
        base().eq("is_duplicate", true),
      ]);
      setKpis({ total: t.count || 0, sent: s.count || 0, failed: f.count || 0, dupes: d.count || 0 });
    })();
  }, [client, period, leads]);

  const successRate = kpis.total > 0 ? Math.round((kpis.sent / kpis.total) * 100) : 0;

  const handleRetry = async (lead: Lead) => {
    if (!client) return;
    setRetrying(lead.id);
    const { data, error } = await client.functions.invoke("retry-crm-lead", { body: { lead_id: lead.id } });
    setRetrying(null);
    if (error) { toast({ title: "Erro no reenvio", description: error.message, variant: "destructive" }); return; }
    toast({ title: (data as any)?.success ? "Reenviado ao CRM" : "Reenvio falhou", description: JSON.stringify((data as any)?.crm_status || data) });
    fetchLeads();
    if (selected?.id === lead.id) setSelected({ ...lead, ...((data as any)?.lead || {}) });
  };

  const handleExportCsv = () => {
    const headers = ["data","nome","email","whatsapp","servico","orcamento","momento","mensagem","origem","utm_source","utm_medium","utm_campaign","crm_status","is_duplicate"];
    const rows = leads.map(l => [
      new Date(l.created_at).toISOString(), l.nome, l.email, l.whatsapp, l.servico, l.orcamento,
      l.momento, (l.mensagem || "").replace(/\n/g, " "), l.origem, l.utm_source, l.utm_medium,
      l.utm_campaign, l.crm_status, l.is_duplicate ? "sim" : "nao",
    ].map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `leads-${new Date().toISOString().slice(0,10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    if (client) await client.auth.signOut();
    window.location.href = "/";
  };

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "Lato, sans-serif" }}>
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-light">Painel de Leads</h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition px-3">Site</Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Sair</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KpiCard label="Total" value={kpis.total} />
          <KpiCard label="Enviados ao CRM" value={kpis.sent} sub={`${successRate}% sucesso`} />
          <KpiCard label="Falharam" value={kpis.failed} accent={kpis.failed > 0 ? "destructive" : undefined} />
          <KpiCard label="Duplicados" value={kpis.dupes} sub={kpis.total > 0 ? `${Math.round((kpis.dupes/kpis.total)*100)}%` : ""} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Select value={period} onValueChange={(v) => { setPeriod(v); setPage(0); }}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>{PERIODS.map(p => <SelectItem key={p.v} value={p.v}>{p.l}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={status} onValueChange={(v) => { setStatus(v); setPage(0); }}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Status CRM" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="sent">Enviados</SelectItem>
              <SelectItem value="failed">Falharam</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Buscar nome, e-mail ou WhatsApp…"
            className="max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { setPage(0); fetchLeads(); } }}
          />
          <Button variant="outline" size="sm" onClick={() => { setPage(0); fetchLeads(); }}>
            <RefreshCw className="w-4 h-4 mr-2" />Atualizar
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCsv} disabled={leads.length === 0}>
            <Download className="w-4 h-4 mr-2" />CSV
          </Button>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">Data</th>
                  <th className="text-left px-4 py-3">Nome</th>
                  <th className="text-left px-4 py-3">Contato</th>
                  <th className="text-left px-4 py-3">Orçamento</th>
                  <th className="text-left px-4 py-3">Momento</th>
                  <th className="text-left px-4 py-3">UTM</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="text-center py-8 text-muted-foreground">Carregando…</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-8 text-muted-foreground">Nenhum lead no filtro</td></tr>
                ) : leads.map(l => (
                  <tr key={l.id} className="border-t border-border hover:bg-muted/30 cursor-pointer" onClick={() => setSelected(l)}>
                    <td className="px-4 py-3 text-xs whitespace-nowrap">{new Date(l.created_at).toLocaleString("pt-BR")}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{l.nome}</div>
                      {l.is_duplicate && <span className="text-[10px] text-amber-600 uppercase">Duplicado</span>}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <div>{l.email}</div>
                      <div className="text-muted-foreground">{l.whatsapp}</div>
                    </td>
                    <td className="px-4 py-3 text-xs">{l.orcamento}</td>
                    <td className="px-4 py-3 text-xs">{l.momento}</td>
                    <td className="px-4 py-3 text-xs">
                      {l.utm_source ? <div>{l.utm_source}</div> : <span className="text-muted-foreground">—</span>}
                      {l.utm_campaign && <div className="text-muted-foreground">{l.utm_campaign}</div>}
                    </td>
                    <td className="px-4 py-3">
                      {statusBadge(l.crm_status)}
                      {l.crm_attempts > 0 && <div className="text-[10px] text-muted-foreground mt-1">{l.crm_attempts} tent.</div>}
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      {l.crm_status === "failed" && (
                        <Button size="sm" variant="outline" disabled={retrying === l.id} onClick={() => handleRetry(l)}>
                          {retrying === l.id ? "..." : "Reenviar"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <p className="text-muted-foreground">{total} resultado(s) • Página {page + 1}/{pageCount}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Anterior</Button>
            <Button variant="outline" size="sm" disabled={page + 1 >= pageCount} onClick={() => setPage(p => p + 1)}>Próxima</Button>
          </div>
        </div>
      </main>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.nome}</SheetTitle>
                <p className="text-xs text-muted-foreground">{new Date(selected.created_at).toLocaleString("pt-BR")}</p>
              </SheetHeader>
              <div className="mt-6 space-y-4 text-sm">
                <Row label="Status CRM">{statusBadge(selected.crm_status)} {selected.crm_attempts > 0 && <span className="ml-2 text-xs text-muted-foreground">{selected.crm_attempts} tentativa(s)</span>}</Row>
                <Row label="E-mail">{selected.email}</Row>
                <Row label="WhatsApp">
                  {selected.whatsapp}
                  {selected.whatsapp && (
                    <a href={`https://wa.me/${selected.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center gap-1 text-primary text-xs hover:underline">
                      <MessageCircle className="w-3 h-3" />Abrir
                    </a>
                  )}
                </Row>
                <Row label="Serviço">{selected.servico}</Row>
                <Row label="Orçamento">{selected.orcamento}</Row>
                <Row label="Momento">{selected.momento}</Row>
                <Row label="Mensagem">{selected.mensagem || "—"}</Row>
                <Row label="Origem">{selected.origem}</Row>
                <Row label="UTM">
                  <div className="text-xs space-y-0.5">
                    <div>source: {selected.utm_source || "—"}</div>
                    <div>medium: {selected.utm_medium || "—"}</div>
                    <div>campaign: {selected.utm_campaign || "—"}</div>
                    <div>content: {selected.utm_content || "—"}</div>
                    <div>term: {selected.utm_term || "—"}</div>
                  </div>
                </Row>
                <Row label="Referrer">{selected.referrer || "—"}</Row>
                <Row label="Landing">{selected.landing_path || "—"}</Row>
                {selected.is_duplicate && (
                  <Row label="Duplicado de">{selected.duplicate_of}</Row>
                )}
                <Row label="Resposta CRM">
                  <pre className="text-[11px] bg-muted/40 p-2 rounded overflow-x-auto max-h-40">{JSON.stringify(selected.crm_response, null, 2)}</pre>
                </Row>
                <div className="flex gap-2 pt-4">
                  {selected.crm_status === "failed" && (
                    <Button size="sm" onClick={() => handleRetry(selected)} disabled={retrying === selected.id}>
                      <RefreshCw className="w-4 h-4 mr-2" />Reenviar ao CRM
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(JSON.stringify(selected, null, 2)); toast({ title: "Copiado" }); }}>
                    <Copy className="w-4 h-4 mr-2" />Copiar
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

function KpiCard({ label, value, sub, accent }: { label: string; value: number | string; sub?: string; accent?: "destructive" }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`text-2xl font-light mt-1 ${accent === "destructive" ? "text-destructive" : "text-foreground"}`}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="col-span-2 text-sm break-words">{children}</div>
    </div>
  );
}

export default AdminLeads;