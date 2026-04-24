import { ArrowUpRight, Hexagon } from 'lucide-react';
import EmpreendimentosSection from './components/EmpreendimentosSection';
import SobreSection from './components/SobreSection';
import InstagramSection from './components/InstagramSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="bg-[#f8fafc] text-zinc-900 font-sans selection:bg-[#1b4332] selection:text-white">

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
            <div className="relative w-[160px] sm:w-[240px] h-[40px] sm:h-[50px] flex items-center">
              <img
                src="/logo.png"
                alt="Trípoli Construtora"
                className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 min-w-[200px] sm:min-w-[280px] object-contain drop-shadow-md pointer-events-none"
              />
            </div>
            <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-wide text-white/60">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#empreendimentos" className="hover:text-white transition-colors">Empreendimentos</a>
              <a href="#" className="hover:text-white transition-colors">A Trípoli</a>
              <a href="#" className="hover:text-white transition-colors">Contato</a>
            </nav>
          </header>

          {/* Hero Central Content */}
          <main className="flex-1 flex flex-col items-center justify-center text-center w-full pt-10 pb-10">
            <h1 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] tracking-[-0.03em] mb-8 max-w-5xl mx-auto">
              <span className="block text-white">Encontre imóveis e conquiste</span>
              <span className="block text-[#4ade80] mt-1 lg:mt-3">o espaço dos seus sonhos.</span>
            </h1>

            <p className="text-white/70 font-light text-[15px] sm:text-base mb-10 max-w-xl md:max-w-2xl leading-[1.8] antialiased">
              A Trípoli desenvolve empreendimentos de alto padrão que combinam design sofisticado, localizações privilegiadas e excelência construtiva para elevar sua qualidade de vida.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 bg-[#1b4332] text-white px-7 py-3.5 rounded-full font-medium text-[13px] tracking-wide hover:bg-[#2d6a4f] transition-colors w-full sm:w-auto group">
                Fale com um Corretor
                <ArrowUpRight className="w-[18px] h-[18px] stroke-[1.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <a
                href="#empreendimentos"
                className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white px-7 py-3.5 rounded-full font-medium text-[13px] tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto group"
              >
                Ver Empreendimentos
                <ArrowUpRight className="w-[18px] h-[18px] stroke-[1.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </main>

          {/* Footer Metrics */}
          <footer className="w-full pb-10">
            <div className="flex flex-col md:flex-row items-center justify-between text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-[#4ade80]/60 uppercase w-full gap-6">
              <div className="whitespace-nowrap">21+ Anos de História</div>
              <div className="h-px bg-white/10 flex-1 mx-4 hidden md:block" />
              <div className="whitespace-nowrap">Alto Padrão Construtivo</div>
              <div className="h-px bg-white/10 flex-1 mx-4 hidden md:block" />
              <div className="whitespace-nowrap">Inovação e Design</div>
            </div>
          </footer>
        </div>
      </section>

      {/* ── SECTION 2: EMPREENDIMENTOS ─────────────────────── */}
      <EmpreendimentosSection />

      {/* ── SECTION 3: SOBRE A TRÍPOLI ─────────────────────── */}
      <SobreSection />

      {/* ── SECTION 4: INSTAGRAM ──────────────────────────────── */}
      <InstagramSection />

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <Footer />

      {/* ── WHATSAPP FLUTUANTE ─────────────────────────────────── */}
      <WhatsAppButton />

    </div>
  );
}
