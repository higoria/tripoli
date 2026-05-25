import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function GlobalHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 150) {
        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock scroll when menu is open
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

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[150] bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-transform duration-300 ${
          isVisible || isMenuOpen ? 'translate-y-0 shadow-sm' : '-translate-y-full'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Trípoli Construtora"
              className="h-8 object-contain"
            />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 text-zinc-900 font-medium hover:text-[#1b4332] transition-colors"
          >
            <span className="hidden sm:block text-[13px] uppercase tracking-wider font-semibold">Menu</span>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a120d] z-[140] flex flex-col px-6 sm:px-12 pt-[100px] pb-12 transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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

        <div className="max-w-[1400px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
          <nav className={`flex flex-col gap-4 sm:gap-6 transition-all duration-700 ease-out delay-100 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { name: 'Home', href: '/', isRouter: true },
              { name: 'Empreendimentos', href: '/#empreendimentos', isRouter: false },
              { name: 'A Trípoli', href: '/sobre', isRouter: true },
              { name: 'Contato', href: '/#contato', isRouter: false },
              { name: 'Simular Financiamento', href: '/simular-financiamento', isRouter: true },
            ].map((item, i) => (
              item.isRouter ? (
                <Link
                  key={i}
                  to={item.href}
                  className="group flex items-center justify-between border-b border-white/10 pb-4 sm:pb-5"
                >
                  <span className="font-serif text-[22px] sm:text-[28px] md:text-[32px] font-light text-white/80 group-hover:text-white transition-colors tracking-wide">
                    {item.name}
                  </span>
                  <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 text-[#4ade80]/50 group-hover:text-[#4ade80] transition-colors" />
                </Link>
              ) : (
                <a
                  key={i}
                  href={item.href}
                  className="group flex items-center justify-between border-b border-white/10 pb-4 sm:pb-5"
                >
                  <span className="font-serif text-[22px] sm:text-[28px] md:text-[32px] font-light text-white/80 group-hover:text-white transition-colors tracking-wide">
                    {item.name}
                  </span>
                  <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 text-[#4ade80]/50 group-hover:text-[#4ade80] transition-colors" />
                </a>
              )
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
