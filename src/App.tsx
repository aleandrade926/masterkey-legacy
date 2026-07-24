import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.tsx";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import Dashboard from "./pages/dashboard";
import Training from "./pages/training";
import Lessons from "./pages/lessons";
import Achievements from "./pages/achievements";
import Leaderboard from "./pages/leaderboard";
import Shortcuts from "./pages/shortcuts";
import AuthPage from "./pages/auth-page";
import InfraPage from "./pages/infra";
import TaxManagers from "./pages/taxmanagers";
import TaxManagersPrivacy from "./pages/taxmanagers-privacy";
import TaxManagersApp from "./pages/taxmanagers-app";
import FootInTheDoorLab from "./pages/foot-in-the-door-lab";
import Empresas from "./pages/taxmanagers-navigator/Empresas";
import Pessoas from "./pages/taxmanagers-navigator/Pessoas";
import Negocios from "./pages/taxmanagers-navigator/Negocios";
import Oportunidades from "./pages/taxmanagers-navigator/Oportunidades";
import Entregas from "./pages/taxmanagers-navigator/Entregas";
import Sidebar from "./components/sidebar";
import { useIsMobile } from "./hooks/use-mobile";
import { useState } from "react";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/training" component={Training} />
      <ProtectedRoute path="/lessons" component={Lessons} />
      <ProtectedRoute path="/achievements" component={Achievements} />
      <ProtectedRoute path="/leaderboard" component={Leaderboard} />
      <ProtectedRoute path="/shortcuts" component={Shortcuts} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Rota independente da TailorSpace Infra
  if (location === "/infra") {
    return <InfraPage />;
  }

  // Rota independente Tax Managers
  if (location === "/taxmanagers") {
    return <TaxManagers />;
  }

  // Rota independente Tax Managers Privacidade
  if (location === "/taxmanagers/politica-de-privacidade" || location === "/taxmanagers/privacidade") {
    return <TaxManagersPrivacy />;
  }

  // Rota isolada Foot in the Door Lab (sem menu, sem Supabase, sem produção)
  if (import.meta.env.DEV && location === "/taxmanagers/foot-in-the-door-lab") {
    return <FootInTheDoorLab />;
  }

  // Rotas Tax Navigator (Entidades)
  if (location.startsWith("/taxmanagers/empresas/")) return <Empresas />;
  if (location.startsWith("/taxmanagers/pessoas/")) return <Pessoas />;
  if (location.startsWith("/taxmanagers/negocios/")) return <Negocios />;
  if (location.startsWith("/taxmanagers/oportunidades/")) return <Oportunidades />;
  if (location.startsWith("/taxmanagers/entregas/")) return <Entregas />;

  // Rotas Amigáveis no namespace exclusivo do Tax Managers (/taxmanagers/in/:slug e /taxmanagers/company/:slug)
  if (location.startsWith("/taxmanagers/in/")) return <Pessoas />;
  if (location.startsWith("/taxmanagers/company/")) return <Empresas />;

  // Rotas Amigáveis de Retrocompatibilidade / Aliases (/in/:slug, /company/:slug, /p/:slug, /c/:slug)
  if (location.startsWith("/p/") || location.startsWith("/in/")) return <Pessoas />;
  if (location.startsWith("/c/") || location.startsWith("/company/")) return <Empresas />;

  // Se estiver no domínio taxmanagers ou em rotas do portal
  const isTaxManagersDomain = typeof window !== "undefined" && window.location.hostname.includes("taxmanagers");
  const isMestreDasTeclasRoute = ["/training", "/lessons", "/achievements", "/leaderboard", "/shortcuts", "/auth"].some(r => location.startsWith(r));

  // Rota independente Tax Managers App Portal
  if (location === "/" || location.startsWith("/app") || location.startsWith("/taxmanagers") || (isTaxManagersDomain && !isMestreDasTeclasRoute)) {
    return <TaxManagersApp />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            isMobile={isMobile}
          />
          
          <div className="flex-1 lg:pl-64">
            {isMobile && (
              <div className="lg:hidden bg-white shadow-sm border-b border-slate-200 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button 
                      onClick={() => setSidebarOpen(true)}
                      className="text-slate-500 hover:text-slate-700"
                      data-testid="button-open-sidebar"
                    >
                      <i className="fas fa-bars text-xl"></i>
                    </button>
                    <h1 className="ml-3 text-lg font-bold text-slate-900">Mestre das Teclas</h1>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JD</span>
                  </div>
                </div>
              </div>
            )}
            
            <main className="p-6">
              <Router />
            </main>
          </div>
        </div>
        <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
