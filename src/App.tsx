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

// Rotas do ToDeAcordo Market MVP
import Marketplace from "./pages/market/Marketplace";
import MarketAffiliate from "./pages/market/MarketAffiliate";
import MarketCheckout from "./pages/market/MarketCheckout";

// Rotas do TáMarcado (Calendly Clone MVP)
import TamarcadoDashboard from "./pages/tamarcado/Dashboard";
import PublicBooking from "./pages/tamarcado/PublicBooking";

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
  const [wouterLocation] = useLocation();
  const location = typeof window !== "undefined" ? window.location.pathname : wouterLocation;
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const isTodeAcordoDomain = hostname.includes("todeacordo");
  const isTaxManagersDomain = hostname.includes("taxmanagers");

  // ==========================================
  // 1. ISOLAMENTO TOTAL: ToDeAcordo & TáMarcado
  // ==========================================
  if (isTodeAcordoDomain || location.startsWith("/market") || location.startsWith("/book") || location.startsWith("/tamarcado")) {
    if (location.startsWith("/book/")) return (
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <PublicBooking />
      </QueryClientProvider>
    );
    if (location === "/market/tamarcado" || location === "/market/tamarcado/" || location === "/tamarcado" || location === "/tamarcado/") return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          <TamarcadoDashboard />
        </AuthProvider>
      </QueryClientProvider>
    );
    if (location.startsWith("/market/checkout")) return <MarketCheckout />;
    if (location.startsWith("/market/afiliado")) return <MarketAffiliate />;
    
    // Qualquer outra rota no domínio todeacordo abre a vitrine do Marketplace
    return <Marketplace />;
  }

  // ==========================================
  // 2. ROTA INDEPENDENTE: TailorSpace Infra
  // ==========================================
  if (location === "/infra") {
    return <InfraPage />;
  }

  // ==========================================
  // 3. ISOLAMENTO TOTAL: Tax Managers Ecosystem
  // ==========================================
  if (location === "/taxmanagers") {
    return <TaxManagers />;
  }
  if (location === "/taxmanagers/politica-de-privacidade" || location === "/taxmanagers/privacidade") {
    return <TaxManagersPrivacy />;
  }
  if (import.meta.env.DEV && location === "/taxmanagers/foot-in-the-door-lab") {
    return <FootInTheDoorLab />;
  }

  // Rotas Tax Navigator (Entidades & Aliases)
  if (
    location.startsWith("/taxmanagers/empresas/") ||
    location.startsWith("/taxmanagers/pessoas/") ||
    location.startsWith("/taxmanagers/negocios/") ||
    location.startsWith("/taxmanagers/oportunidades/") ||
    location.startsWith("/taxmanagers/entregas/") ||
    location.startsWith("/taxmanagers/in/") ||
    location.startsWith("/taxmanagers/company/")
  ) {
    if (location.startsWith("/taxmanagers/empresas/") || location.startsWith("/taxmanagers/company/")) return <Empresas />;
    if (location.startsWith("/taxmanagers/pessoas/") || location.startsWith("/taxmanagers/in/")) return <Pessoas />;
    if (location.startsWith("/taxmanagers/negocios/")) return <Negocios />;
    if (location.startsWith("/taxmanagers/oportunidades/")) return <Oportunidades />;
    if (location.startsWith("/taxmanagers/entregas/")) return <Entregas />;
  }

  // Rotas legadas de retrocompatibilidade Tax Managers
  if (location.startsWith("/p/") || location.startsWith("/in/")) return <Pessoas />;
  if (location.startsWith("/c/") || location.startsWith("/company/")) return <Empresas />;

  // Rota independente Tax Managers App Portal
  if (location === "/" || location.startsWith("/app") || location.startsWith("/taxmanagers") || isTaxManagersDomain) {
    return <TaxManagersApp />;
  }

  // ==========================================
  // 4. MESTRE DAS TECLAS (Plataforma de Treino)
  // ==========================================
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
