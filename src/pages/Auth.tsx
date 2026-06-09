import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getBackendClient, isBackendConfigured } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) navigate("/admin/leads", { replace: true });
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const client = await getBackendClient();
    if (!client) {
      setLoading(false);
      toast({ title: "Backend indisponível", description: "Configuração de autenticação ausente nesta publicação.", variant: "destructive" });
      return;
    }
    const { error } = await client.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast({ title: "Erro ao entrar", description: error.message, variant: "destructive" });
    else navigate("/admin/leads", { replace: true });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const client = await getBackendClient();
    if (!client) {
      setLoading(false);
      toast({ title: "Backend indisponível", description: "Configuração de autenticação ausente nesta publicação.", variant: "destructive" });
      return;
    }
    const { error } = await client.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin/leads`, data: { full_name: name } },
    });
    setLoading(false);
    if (error) toast({ title: "Erro ao criar conta", description: error.message, variant: "destructive" });
    else toast({ title: "Conta criada", description: "Você já pode entrar. Apenas usuários autorizados acessam o painel." });
  };

  const handleGoogle = async () => {
    setLoading(true);
    if (!isBackendConfigured()) {
      setLoading(false);
      toast({ title: "Backend indisponível", description: "Configuração de autenticação ausente nesta publicação.", variant: "destructive" });
      return;
    }
    const { lovable } = await import("@/integrations/lovable");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/admin/leads" });
    if (result.error) {
      setLoading(false);
      toast({ title: "Erro Google", description: String(result.error), variant: "destructive" });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ title: "Informe seu e-mail", description: "Preencha o campo de e-mail antes de pedir o link.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const client = await getBackendClient();
    if (!client) {
      setLoading(false);
      toast({ title: "Backend indisponível", variant: "destructive" });
      return;
    }
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Erro ao enviar link", description: error.message, variant: "destructive" });
      return;
    }
    toast({
      title: "Verifique seu e-mail",
      description: "Se houver conta com este e-mail, você receberá o link para redefinir a senha.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-muted/20 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition">← Voltar ao site</Link>
          <h1 className="text-3xl font-light mt-4 text-foreground" style={{ fontFamily: "Lato, sans-serif" }}>
            Godoy <span className="text-primary">Prime</span> Realty
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Painel administrativo</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">E-mail</Label>
                  <Input id="login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="login-password">Senha</Label>
                  <Input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Entrando…" : "Entrar"}
                </Button>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="w-full text-xs text-muted-foreground hover:text-foreground transition text-center"
                  disabled={loading}
                >
                  Esqueci minha senha
                </button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="su-name">Nome</Label>
                  <Input id="su-name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="su-email">E-mail</Label>
                  <Input id="su-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="su-password">Senha</Label>
                  <Input id="su-password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Criando…" : "Criar conta"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Apenas usuários autorizados pelo administrador conseguem acessar o painel.
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
            Continuar com Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;