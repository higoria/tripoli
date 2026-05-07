import { Instagram, Heart, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

const INSTA_URL = 'https://www.instagram.com/tripoliconstrutora/';

/* ── Posts simulados com imagens reais dos empreendimentos ── */
const posts = [
  {
    id: 1,
    img: '/images/ilumi-bueno/foto-4.png',
    caption: 'Ilumi Bueno — Sofisticação e natureza no coração do Setor Bueno. 36 andares de pura elegância. 🌿 #IlumiBueno #TrípoliConstrutora',
    likes: '1.2k',
    link: `${INSTA_URL}p/DXEqEKICOJF/`,
    tag: 'Ilumi Bueno',
  },
  {
    id: 2,
    img: '/images/ritmo-bueno/foto-2.jpg',
    caption: 'Ritmo Bueno — Para cada estilo de vida, um apartamento perfeito. Do studio ao 3 quartos. 🏢 #RitmoBueno',
    likes: '987',
    link: `${INSTA_URL}p/DXJzsgSjeUW/`,
    tag: 'Ritmo Bueno',
  },
  {
    id: 3,
    img: '/images/bosque-das-orquideas/hero.jpg',
    caption: 'Bosque das Orquídeas — Condomínio fechado com bosque privativo e lazer completo. Pronto para morar! 🌳 #BosqueOrquideas',
    likes: '854',
    link: `${INSTA_URL}p/DXO9ZPkk8To/`,
    tag: 'Bosque das Orquídeas',
  },
  {
    id: 4,
    img: '/images/ilumi-bueno/foto-2.png',
    caption: 'Detalhes que fazem a diferença. Cada projeto Trípoli é pensado do alicerce ao acabamento. ✨ #TrípoliConstrutora #Qualidade',
    likes: '1.1k',
    link: INSTA_URL,
    tag: 'Qualidade',
  },
  {
    id: 5,
    img: '/images/bosque-das-orquideas/foto-3.jpg',
    caption: 'Confiança não se promete. Se constrói. 21 anos transformando sonhos em endereços. 🏡 #Construtora #Goiânia',
    likes: '2.3k',
    link: INSTA_URL,
    tag: 'Institucional',
  },
  {
    id: 6,
    img: '/images/ritmo-bueno/foto-5.jpg',
    caption: 'MORAR OU INVESTIR? Por que não os dois? Venha conhecer nossos empreendimentos no Setor Bueno. 📍 #Investimento #ImóveisGoiânia',
    likes: '1.8k',
    link: INSTA_URL,
    tag: 'Investimento',
  },
];

/* ── Card individual ─────────────────────────────────────── */
function PostCard({ post }: { post: typeof posts[number] }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[4/5] overflow-hidden bg-zinc-100 rounded-xl border border-zinc-200 cursor-pointer shadow-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagem */}
      {!imgErr ? (
        <img
          src={post.img}
          alt={post.tag}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgErr(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-50 flex items-center justify-center">
          <Instagram className="w-10 h-10 text-zinc-300" />
        </div>
      )}

      {/* Overlay escuro no hover */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Conteúdo do hover */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
          hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="flex items-center gap-1.5 text-white font-medium text-[14px]">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          {post.likes}
        </div>
        <p className="text-white/80 text-[11px] text-center leading-relaxed px-4 line-clamp-3">
          {post.caption}
        </p>
        <div className="flex items-center gap-1 text-white text-[11px] font-medium mt-1">
          <ExternalLink className="w-3 h-3" />
          Ver no Instagram
        </div>
      </div>

      {/* Tag no canto */}
      <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm border border-zinc-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] text-zinc-800 font-medium">{post.tag}</span>
      </div>
    </a>
  );
}

/* ── COMPONENTE PRINCIPAL ─────────────────────────────────── */
export default function InstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - (clientWidth * 0.8) : scrollLeft + (clientWidth * 0.8);
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="instagram" className="relative bg-white border-t border-zinc-200 py-24 px-6 sm:px-12 md:px-20 overflow-hidden">

      {/* Ambient glow central */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#1b4332]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto">

        {/* ── HEADER ──────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="flex flex-col gap-4">
            {/* Badge Instagram */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-lg shadow-purple-500/20">
                <Instagram className="w-4.5 h-4.5 text-white" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#1b4332]">Instagram</span>
                <a
                  href={INSTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 text-[12px] hover:text-zinc-900 transition-colors"
                >
                  @tripoliconstrutora
                </a>
              </div>
            </div>

            <h2 className="font-serif font-light text-4xl sm:text-5xl leading-[1.1] tracking-tight text-zinc-900">
              Acompanhe nossa<br />
              <span className="text-[#1b4332]">jornada</span>
            </h2>
          </div>

        </div>

        {/* ── CARROSSEL DE POSTS ────────────────────────────── */}
        <div className="relative group/insta">
          {/* Navegação - Setas no meio */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/20 hover:bg-[#1b4332] transition-all active:scale-95 md:-left-6 opacity-100 sm:opacity-0 sm:group-hover/insta:opacity-100 flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/20 hover:bg-[#1b4332] transition-all active:scale-95 md:-right-6 opacity-100 sm:opacity-0 sm:group-hover/insta:opacity-100 flex"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-8 -mx-6 px-6 sm:-mx-12 sm:px-12 md:mx-0 md:px-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {posts.map((post) => (
              <div key={post.id} className="w-[70vw] sm:w-[280px] md:w-[320px] shrink-0 snap-center md:snap-start">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA BUTTON ───────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <a
            href={INSTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(238,42,123,0.2)]"
          >
            {/* Fundo gradiente instagram */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Brilho interno */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent" />

            <Instagram className="relative z-10 w-4.5 h-4.5 text-white" strokeWidth={2} />
            <span className="relative z-10 text-[14px] font-semibold text-white tracking-wide">
              Seguir no Instagram
            </span>
            <ArrowUpRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>

          <span className="text-zinc-400 text-[13px]">
            ou acesse{' '}
            <a
              href={INSTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors"
            >
              @tripoliconstrutora
            </a>
          </span>
        </div>

      </div>
    </section>
  );
}
