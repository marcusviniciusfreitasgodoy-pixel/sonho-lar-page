import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacidade from "./pages/Privacidade";
import LGPD from "./pages/LGPD";
import Confirmacao from "./pages/Confirmacao";
import Obrigado from "./pages/Obrigado";
// Lazy load any route that touches the Supabase client so the landing page
// never crashes if env vars are missing at runtime.
const Auth = lazy(() => import("./pages/Auth"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));
const RequireAdmin = lazy(() =>
  import("./components/RequireAdmin").then((m) => ({ default: m.RequireAdmin }))
);
// import HeygenAvatar from "./components/HeygenAvatar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Avatar Sofia (HeyGen) temporariamente oculto até atualização da base de conhecimento */}
      {/* <HeygenAvatar /> */}
      <BrowserRouter>
        <Suspense fallback={null}>
         <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/lgpd" element={<LGPD />} />
          <Route path="/confirmacao" element={<Confirmacao />} />
          <Route path="/obrigado" element={<Obrigado />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin/leads" element={<RequireAdmin><AdminLeads /></RequireAdmin>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
         </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
