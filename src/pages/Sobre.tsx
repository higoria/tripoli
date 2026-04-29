import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import SobreSection from '../components/SobreSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
export default function Sobre() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-900 font-sans selection:bg-[#1b4332] selection:text-white flex flex-col overflow-x-hidden">
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors group text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Voltar
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
            <Link to="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-900">A Trípoli</span>
          </div>

          <div className="w-[80px]" /> {/* Spacer */}
        </div>
      </header>

      {/* ── CONTEÚDO PRINCIPAL ─────────────────────────────── */}
      <main className="flex-1">
        <SobreSection />
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <Footer />

      {/* ── WHATSAPP FLUTUANTE ─────────────────────────────────── */}
      <WhatsAppButton />
    </div>
  );
}
