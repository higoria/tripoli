import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Hexagon, Menu, X } from 'lucide-react';

const EmpreendimentosSection = lazy(() => import('./components/EmpreendimentosSection'));
const InstagramSection = lazy(() => import('./components/InstagramSection'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-[#f8fafc] text-zinc-900 font-sans selection:bg-[#1b4332] selection:text-white overflow-x-hidden">

      {/* ── SECTION 1: HERO ─────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[600px] flex flex-col overflow-hidden">

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/banner.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0e1a14]/70 z-[1]" />

        <div className="relative z-10 flex flex-col h-full w-full px-6 sm:px-12 md:px-20 mx-auto max-w-[1600px] justify-between">

          {/* Navbar */}
          <header className="flex justify-between items-center py-8">
            <div className="relative w-[120px] sm:w-[140px] h-[30px] sm:h-[30px] flex items-center z-50">
              <img
                src="/logo.png"
                alt="Trípoli Construtora"
                className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 min-w-[70px] sm:min-w-[120px] object-contain drop-shadow-md pointer-events-none"
              />
            </div>
            <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-wide text-white/60">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#empreendimentos" className="hover:text-white transition-colors">Empreendimentos</a>
              <Link to="/sobre" className="hover:text-white transition-colors">A Trípoli</Link>
              <a href="#contato" className="hover:text-white transition-colors">Contato</a>
              <button className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-[#1b4332] transition-all font-semibold">
                Simular Financiamento
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-50 p-2 text-white/80 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Nav Overlay */}
            <div
              className={`fixed inset-0 bg-[#0a120d] z-40 flex flex-col px-8 pt-[120px] pb-12 transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1b4332]/20 rounded-full blur-[100px] pointer-events-none" />

              <nav className={`relative z-10 flex flex-col gap-6 transition-all duration-700 ease-out delay-100 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {[
                  { name: 'Home', href: '#', isRouter: false },
                  { name: 'Empreendimentos', href: '#empreendimentos', isRouter: false },
                  { name: 'A Trípoli', href: '/sobre', isRouter: true },
                  { name: 'Contato', href: '#contato', isRouter: false },
                  { name: 'Simular Financiamento', href: '#', isRouter: false },
                ].map((item, i) => (
                  item.isRouter ? (
                    <Link
                      key={i}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-center justify-between border-b border-white/10 pb-5"
                    >
                      <span className="font-serif text-[28px] font-light text-white/80 group-hover:text-white transition-colors tracking-wide">
                        {item.name}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-[#4ade80]/50 group-hover:text-[#4ade80] transition-colors" />
                    </Link>
                  ) : (
                    <a
                      key={i}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-center justify-between border-b border-white/10 pb-5"
                    >
                      <span className="font-serif text-[28px] font-light text-white/80 group-hover:text-white transition-colors tracking-wide">
                        {item.name}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-[#4ade80]/50 group-hover:text-[#4ade80] transition-colors" />
                    </a>
                  )
                ))}
              </nav>
            </div>
          </header>

          {/* Hero Central Content */}
          <main className="flex-1 flex flex-col items-center justify-center text-center w-full pt-20 pb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-[4.8rem] leading-[1.1] tracking-[-0.03em] mb-8 max-w-5xl mx-auto"
            >
              <span className="block text-white">Conquiste</span>
              <span className="block text-[#4ade80] mt-1 lg:mt-3">o espaço dos seus sonhos.</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#empreendimentos"
                className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white px-7 py-3.5 rounded-full font-medium text-[13px] tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto group"
              >
                Ver Empreendimentos
                <ArrowUpRight className="w-[18px] h-[18px] stroke-[1.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </main>

          {/* Footer Metrics */}

        </div>
      </section>

      <Suspense fallback={<div className="h-20" />}>
        {/* ── SECTION 2: EMPREENDIMENTOS ─────────────────────── */}
        <EmpreendimentosSection />

        {/* ── SECTION 3: INSTAGRAM ──────────────────────────────── */}
        <InstagramSection />

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <Footer />

        {/* ── WHATSAPP FLUTUANTE ─────────────────────────────────── */}
        <WhatsAppButton />
      </Suspense>
    </div>
  );
}
