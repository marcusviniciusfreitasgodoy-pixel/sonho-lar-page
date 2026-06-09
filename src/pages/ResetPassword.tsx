import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBackendClient } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState<"checking" | "ok" | "invalid">("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const client = await getBackendClient();
      if (!client) {
        if (!cancelled) setReady("invalid");
        return;
      }
      // Supabase entrega o token de recovery no hash da URL e dispara
      // onAuthStateChange('PASSWORD_RECOVERY') ao montar.
      const { data: sub } = client.auth.onAuthStateChange((event) => {
        if (event === "PASSWORD_RECOVERY") setReady("ok");
      });
      const { data } = await client.auth.getSession();
      if (cancelled) return;
      const hash = window.location.hash || "";
      if (data.session || hash.includes("type=recovery")) setReady("ok");
      else {
        // Aguarda um instante caso o evento ainda venha
        setTimeout(() => {
          if (!cancelled) setReady((s) => (s === "checking" ? "invalid" : s));
        }, 1500);
      }
      return () => sub.subscription.unsubscribe();
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Senha muito curta", description: "Mínimo de 8 caracteres.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Senhas diferentes", description: "Confirme a mesma senha nos dois campos.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const client = await getBackendClient();
    if (!client) {
      setLoading(false);
      toast({ title: "Backend indisponível", variant: "destructive" });
      return;
    }
    const { error } = await client.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Erro ao redefinir senha", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Senha redefinida", description: "Use a nova senha para entrar." });
    await client.auth.signOut();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-muted/20 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition">← Voltar</Link>
          <h1 className="text-3xl font-light mt-4 text-foreground" style={{ fontFamily: "Lato, sans-serif" }}>
            Godoy <span className="text-primary">Prime</span> Realty
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Redefinir senha</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          {ready === "checking" && (
            <p className="text-sm text-muted-foreground text-center">Validando link…</p>
          )}

          {ready === "invalid" && (
            <div className="space-y-4 text-center">
              <p className="text-sm text-foreground">
                Este link de redefinição é inválido ou expirou.
              </p>
              <Button asChild className="w-full">
                <Link to="/auth">Pedir novo link</Link>
              </Button>
            </div>
          )}

          {ready === "ok" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="new-password">Nova senha</Label>
                <Input
                  id="new-password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  minLength={8}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Salvando…" : "Redefinir senha"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;