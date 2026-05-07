import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

/* ── Contador animado ─────────────────────────────────────── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Imagem com fallback ──────────────────────────────────── */
function AwardLogo({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-[#1b4332]/40 text-xs text-center px-2">
        {alt}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="max-h-24 max-w-[180px] object-contain mx-auto transition-all duration-300 group-hover:scale-105"
      onError={() => setErr(true)}
    />
  );
}

/* ── Stats ────────────────────────────────────────────────── */
const stats = [
  { value: 21, suffix: '+', label: 'Anos de Experiência' },
  { value: 500, suffix: '+', label: 'Famílias Atendidas' },
  { value: 3, suffix: '', label: 'Prêmios de Excelência' },
  { value: 100, suffix: '%', label: 'Compromisso com Qualidade' },
];

/* ── Valores / diferenciais ───────────────────────────────── */
const valores = [
  'Materiais de alta qualidade em cada projeto',
  'Profissionais altamente capacitados',
  'Tecnologia avançada na construção',
  'Pontualidade e transparência com o cliente',
  'Compromisso com o meio ambiente',
  'Mais de 21 anos no mercado imobiliário',
];

/* ── Prêmios ─────────────────────────────────────────────── */
const premios = [
  {
    nome: '10º Prêmio Crea Goiás de Meio Ambiente',
    descricao: 'Melhor projeto de reservação e infiltração de águas pluviais — Bosque Sumaré',
    ano: '2011',
    logo: '/3.jpg',
    link: 'http://www.tripoliconstrutora.com.br/a-tripoli-premiacao.php?id=3',
  },
  {
    nome: 'Prêmio Brasil de Engenharia',
    descricao: 'Reconhecimento nacional pela excelência em engenharia e inovação construtiva',
    ano: '2011',
    logo: '/1.jpg',
    link: 'http://www.tripoliconstrutora.com.br/a-tripoli-premiacao.php?id=1',
  },
  {
    nome: '9º Prêmio Crea Goiás de Meio Ambiente',
    descricao: 'Realização do Parque Ambiental Cascavel — projeto de preservação ambiental',
    ano: '2010',
    logo: '/2.jpg',
    link: 'http://www.tripoliconstrutora.com.br/a-tripoli-premiacao.php?id=2',
  },
];

/* ── COMPONENTE PRINCIPAL ─────────────────────────────────── */
export default function SobreSection() {
  return (
    <section id="sobre" className="relative bg-zinc-50 overflow-hidden">

      {/* ── BLOCO 1 — HERO SOBRE ────────────────────────────── */}
      <div className="relative py-24 px-6 sm:px-12 md:px-20">

        {/* Ambient glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1b4332]/5 rounded-full blur-[130px] pointer-events-none translate-x-1/3 translate-y-1/3" />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Coluna esquerda — Texto */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1b4332] mb-4">
                A Trípoli Construtora
              </p>
              <h2 className="font-serif font-light text-4xl sm:text-5xl leading-[1.1] tracking-tight text-zinc-900">
                Inovando na Arte<br />
                <span className="text-[#1b4332]">de Construir</span>
              </h2>
            </div>

            <div className="flex flex-col gap-5 text-zinc-600 text-[14px] sm:text-[15px] leading-[1.85]">
              <p>
                A opção de morar e investir sem dúvida estão entre as mais importantes decisões das nossas vidas.
                A Trípoli Construtora reconhece a importância desse momento e a responsabilidade que tem nas mãos
                em proporcionar a certeza de morar bem e com qualidade de vida. Quem compra um imóvel Trípoli tem
                a confiança de estar realizando um ótimo negócio.
              </p>
              <p>
                Não poupamos esforços para oferecer imóveis de excelência em todos os aspectos, desde a fundação ao
                acabamento. Nosso compromisso maior é com a satisfação de nossos clientes — a pontualidade, a
                honestidade e a transparência são os pilares que nos guiam há{' '}
                <span className="text-[#1b4332] font-medium">mais de 21 anos de experiência</span> no mercado imobiliário.
              </p>
            </div>

            {/* Valores */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {valores.map((v) => (
                <li key={v} className="flex items-start gap-2.5 text-[13px] text-zinc-600">
                  <CheckCircle2 className="w-4 h-4 text-[#1b4332]/80 flex-shrink-0 mt-0.5" />
                  {v}
                </li>
              ))}
            </ul>

            <a
              href="https://www.tripoliconstrutora.com.br/a-tripoli/"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-[13px] font-medium text-zinc-900 shadow-sm transition-all duration-300"
            >
              Conheça nossa história
            </a>
          </motion.div>

          {/* Coluna direita — Imagem + card flutuante */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Imagem principal */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/ilumi-bueno/foto-4.png"
                alt="Trípoli Construtora"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/ilumi-bueno/foto-1.png';
                }}
              />
              {/* Gradiente sutil */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
            </div>

            {/* Card flutuante — anos de experiência */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-zinc-200 rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <p className="font-serif text-4xl font-light text-[#1b4332]">21<span className="text-2xl">+</span></p>
              <p className="text-[12px] text-zinc-500 mt-1 leading-tight">Anos no mercado<br />imobiliário</p>
            </div>

            {/* Card flutuante — prêmios */}
            <div className="absolute -top-5 -right-5 bg-white border border-zinc-200 rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <p className="font-serif text-3xl font-light text-[#1b4332]">3</p>
              <p className="text-[12px] text-zinc-500 mt-1 leading-tight">Prêmios de<br />excelência</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BLOCO 2 — STATS ─────────────────────────────────── */}
      <div className="border-y border-zinc-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <p className="font-serif font-light text-4xl sm:text-5xl text-[#1b4332]">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[12px] text-zinc-500 tracking-wide leading-snug max-w-[120px]">{s.label}</p>
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-zinc-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BLOCO 3 — PREMIAÇÕES ────────────────────────────── */}
      <div className="py-24 px-6 sm:px-12 md:px-20">

        {/* Glow esquerdo */}
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-[#1b4332]/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />

        <div className="max-w-[1400px] mx-auto">
          {/* Header da seção de prêmios */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1b4332] mb-4">
              Reconhecimento
            </p>
            <h2 className="font-serif font-light text-3xl sm:text-4xl text-zinc-900">
              Premiações & Conquistas
            </h2>
            <p className="text-zinc-500 text-[14px] mt-4 max-w-lg mx-auto leading-relaxed">
              Reconhecida por órgãos como o CREA-GO e em âmbito nacional pelo compromisso com a sustentabilidade e inovação na engenharia.
            </p>
          </motion.div>

          {/* Cards dos prêmios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {premios.map((p, i) => (
              <motion.a
                key={p.nome}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="group flex flex-col gap-6 p-7 rounded-2xl bg-white border border-zinc-200 hover:border-[#1b4332]/30 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
              >
                {/* Logo do prêmio */}
                <div className="h-24 flex items-center justify-center">
                  <AwardLogo src={p.logo} alt={p.nome} />
                </div>

                {/* Divider */}
                <div className="h-px bg-zinc-100" />

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#1b4332]/60">{p.ano}</p>
                  </div>
                  <h3 className="text-zinc-900 font-medium text-[14px] leading-snug">{p.nome}</h3>
                  <p className="text-zinc-500 text-[12px] leading-relaxed">{p.descricao}</p>
                </div>

                <div className="flex items-center gap-1 text-zinc-400 group-hover:text-[#1b4332] transition-colors text-[12px] font-medium mt-auto">
                  Saiba mais
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
