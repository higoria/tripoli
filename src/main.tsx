import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import EmpreendimentoDetalhe from './pages/EmpreendimentoDetalhe.tsx';
import Sobre from './pages/Sobre.tsx';
import TrabalheConosco from './pages/TrabalheConosco.tsx';
import './index.css';

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
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
        <Route path="/empreendimento/:slug" element={<EmpreendimentoDetalhe />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
