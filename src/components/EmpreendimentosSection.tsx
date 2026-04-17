import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BedDouble, Maximize2, Car, MapPin, CheckCircle, Clock } from 'lucide-react';
import { empreendimentos, type Empreendimento } from '../data/empreendimentos';

/* ─── Card individual ─────────────────────────────────────── */
function EmpreendimentoCard({ emp, index }: { emp: Empreendimento; index: number }) {
  const [activeImg, setActiveImg] = useState(0);
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-[#2d6a4f]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(45,106,79,0.1)]"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Image area */}
      <div className="relative h-64 overflow-hidden bg-zinc-100">
        {!imgError ? (
          <img
            src={emp.galeria[activeImg] ?? emp.heroImg}
            alt={emp.nome}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1b4332] to-[#0a120d]">
            <span className="text-white/20 text-5xl font-serif">T</span>
          </div>
        )}

        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

        {/* Status badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
          {emp.status === 'Pronto para Morar'
            ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            : <Clock className="w-3.5 h-3.5 text-amber-400" />}
          <span className="text-[11px] font-semibold tracking-wider uppercase text-white">
            {emp.status}
          </span>
        </div>

        {/* Thumbnail dots */}
        {emp.galeria.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {emp.galeria.slice(0, 4).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeImg ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/70 w-1.5'
                }`}
              />
            ))}
          </div>
        )}

        {/* Type tag */}
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm">
          <span className="text-[10px] font-medium tracking-widest uppercase text-white/70">{emp.tipo}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex items-center gap-1.5 text-[#1b4332]/70">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-[11px] font-medium tracking-wide">{emp.bairro} · {emp.cidade}</span>
        </div>

        <h3 className="font-serif text-2xl font-light text-zinc-900 leading-tight tracking-tight">
          {emp.nome}
        </h3>

        <p className="text-zinc-500 text-[13px] leading-relaxed line-clamp-2">
          {emp.descricao}
        </p>

        <div className="h-px bg-zinc-100" />

        {/* Tipologias */}
        <div>
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#1b4332]/60 mb-3">
            Tipologias Disponíveis
          </p>
          <div className="flex flex-col gap-2">
            {emp.tipologias.map((t, i) => (
              <div key={i} className="flex items-center justify-between gap-3 py-1.5 border-b border-zinc-100 last:border-0">
                <div className="flex items-center gap-2 text-zinc-600">
                  <BedDouble className="w-3.5 h-3.5 text-[#1b4332]/60 flex-shrink-0" />
                  <span className="text-[12px]">{t.quartos}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-500 text-[12px]">
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" /> {t.area}
                  </span>
                  <span className="flex items-center gap-1">
                    <Car className="w-3 h-3" /> {t.vagas}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lazer pills */}
        <div className="flex flex-wrap gap-1.5">
          {emp.lazer.slice(0, 4).map((item) => (
            <span key={item} className="px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-600 font-medium">
              {item}
            </span>
          ))}
        </div>

        {/* CTA — agora usa Link interno */}
        <Link
          to={`/empreendimento/${emp.slug}`}
          className="mt-auto flex items-center justify-between gap-2 w-full px-5 py-3.5 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-[#1b4332]/30 transition-all duration-300 group/btn"
        >
          <span className="text-[13px] font-medium text-zinc-900 tracking-wide">Ver Empreendimento</span>
          <ArrowUpRight className="w-4 h-4 text-[#1b4332] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
        </Link>
      </div>
    </article>
  );
}

/* ─── Section completa ────────────────────────────────────── */
export default function EmpreendimentosSection() {
  return (
    <section id="empreendimentos" className="relative bg-white py-24 px-6 sm:px-12 md:px-20 overflow-hidden">
      {/* Grid de fundo */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(#1b4332 1px, transparent 1px), linear-gradient(90deg, #1b4332 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1b4332]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1b4332] mb-4">
              Trípoli Construtora · Goiânia
            </p>
            <h2 className="font-serif font-light text-4xl sm:text-5xl md:text-[3.5rem] leading-[1.1] tracking-tight text-zinc-900">
              Nossos<br />
              <span className="text-[#1b4332]">Empreendimentos</span>
            </h2>
          </div>
          <p className="max-w-sm text-zinc-500 text-[14px] leading-relaxed md:text-right">
            Apartamentos e sobrados em localização privilegiada em Goiânia e Aparecida de Goiânia. Qualidade Trípoli em cada detalhe.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {empreendimentos.map((emp, i) => (
            <EmpreendimentoCard key={emp.id} emp={emp} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-center mt-14">
          <a
            href="https://www.tripoliconstrutora.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-200 hover:border-[#1b4332]/40 bg-zinc-50 hover:bg-[#1b4332]/5 transition-all duration-300 text-zinc-600 hover:text-[#1b4332] text-[13px] font-medium tracking-wide"
          >
            Ver todos os imóveis
            <ArrowUpRight className="w-4 h-4 text-[#1b4332] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
