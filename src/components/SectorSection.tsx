import React, { useState, useEffect, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SectorSectionProps {
  setorInfo?: {
    nome: string;
    descricao: string;
    imagens: string[];
  };
}

export const SectorSection = memo(function SectorSection({ setorInfo }: SectorSectionProps) {
  if (!setorInfo || !setorInfo.imagens || setorInfo.imagens.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % setorInfo.imagens.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? setorInfo.imagens.length - 1 : prev - 1));
  };

  // Auto advance every 5s
  useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, [setorInfo.imagens.length]);

  return (
    <div className="mt-20 mb-16 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Lado Esquerdo: Carrossel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 group"
        >
          {/* Imagens com crossfade */}
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentIndex}
              src={setorInfo.imagens[currentIndex]}
              alt={`Vista do ${setorInfo.nome}`}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradiente inferior para dots e botões */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Botões de navegação (aparecem no hover) */}
          {setorInfo.imagens.length > 1 && (
            <>
              <button
                onClick={(e) => { e.preventDefault(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/50 text-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-105 shadow-lg z-10"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-5 h-5 ml-[-2px]" />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/50 text-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-105 shadow-lg z-10"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-5 h-5 mr-[-2px]" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
                {setorInfo.imagens.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${
                      idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Ir para a imagem ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Lado Direito: Texto */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <h2 className="font-serif text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-light text-zinc-900 leading-[1.1] mb-6 tracking-tight">
            Descubra o melhor do <br />
            <span className="font-medium text-[#1b4332]">{setorInfo.nome}</span>
          </h2>
          <p className="text-zinc-600 text-lg leading-[1.8] max-w-xl font-light">
            {setorInfo.descricao}
          </p>
        </motion.div>

      </div>
    </div>
  );
});
