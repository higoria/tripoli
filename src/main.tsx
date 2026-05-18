import { StrictMode, useEffect, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import GlobalHeader from './components/GlobalHeader.tsx';
import './index.css';

// Lazy-load de páginas para code splitting automático
const EmpreendimentoDetalhe = lazy(() => import('./pages/EmpreendimentoDetalhe.tsx'));
const Sobre = lazy(() => import('./pages/Sobre.tsx'));
const TrabalheConosco = lazy(() => import('./pages/TrabalheConosco.tsx'));
const SouCorretor = lazy(() => import('./pages/SouCorretor.tsx'));
const VenderTerreno = lazy(() => import('./pages/VenderTerreno.tsx'));
const SejaFornecedor = lazy(() => import('./pages/SejaFornecedor.tsx'));
const SimuladorFinanciamento = lazy(() => import('./pages/SimuladorFinanciamento.tsx'));

// Sempre rola para o topo ao trocar de rota
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <GlobalHeader />
      <Suspense fallback={<div className="fixed inset-0 bg-white flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-[#1b4332]/20 border-t-[#1b4332] animate-spin" /></div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
          <Route path="/empreendimento/:slug" element={<EmpreendimentoDetalhe />} />
          <Route path="/sou-corretor" element={<SouCorretor />} />
          <Route path="/vender-terreno" element={<VenderTerreno />} />
          <Route path="/seja-fornecedor" element={<SejaFornecedor />} />
          <Route path="/simular-financiamento" element={<SimuladorFinanciamento />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
