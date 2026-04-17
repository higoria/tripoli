import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BedDouble,
  Maximize2,
  Car,
  MapPin,
  CheckCircle,
  Clock,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { getEmpreendimentoBySlug } from '../data/empreendimentos';

const BASE_TRIPOLI = 'http://www.tripoliconstrutora.com.br';

/* ── Placeholder quando imagem falha ─────────────────────── */
function ImgWithFallback({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className={`flex items-center justify-center bg-zinc-100 ${className}`}>
        <span className="text-[#1b4332]/10 text-6xl font-serif select-none">T</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setErr(true)} />;
}

/* ── Página de Detalhe ────────────────────────────────────── */
export default function EmpreendimentoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const emp = getEmpreendimentoBySlug(slug ?? '');

  const [tipologiaAtiva, setTipologiaAtiva] = useState(0);
  const [plantaErr, setPlantaErr] = useState(false);

  if (!emp) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-zinc-900 gap-6">
        <p className="text-zinc-500">Empreendimento não encontrado.</p>
        <Link to="/" className="text-[#1b4332] underline">Voltar ao início</Link>
      </div>
    );
  }

  const tipologia = emp.tipologias[tipologiaAtiva];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-900 font-sans selection:bg-[#1b4332] selection:text-white">

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

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Link to="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/#empreendimentos" className="hover:text-zinc-900 transition-colors">Empreendimentos</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-900">{emp.nome}</span>
          </div>

          <a
            href={`${BASE_TRIPOLI}/imovel/${emp.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-[12px] font-medium text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            Tenho interesse
          </a>
        </div>
      </header>

      {/* ── HERO DO EMPREENDIMENTO ─────────────────────────── */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <ImgWithFallback
          src={emp.heroImg}
          alt={emp.nome}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradiente escuro para legibilidade do texto branco em cima da foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Badge de status */}
        <div className="absolute top-6 left-6 sm:left-12 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur border border-white/10">
          {emp.status === 'Pronto para Morar'
            ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            : <Clock className="w-3.5 h-3.5 text-amber-400" />}
          <span className="text-[11px] font-semibold tracking-wider uppercase text-white">{emp.status}</span>
        </div>

        {/* Título sobre a imagem */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-10 max-w-[1400px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400 mb-3">
            {emp.tipo} · Trípoli Construtora
          </p>
          <h1 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-white">
            {emp.nome}
          </h1>
          <div className="flex items-center gap-1.5 mt-3 text-white/50">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#4ade80]/60" />
            <span className="text-[13px]">{emp.endereco}</span>
          </div>
        </div>
      </section>

      {/* ── CONTEÚDO PRINCIPAL ─────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-14 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16">

        {/* ── COLUNA ESQUERDA ──────────────────────────────── */}
        <div className="flex flex-col gap-12">

          {/* Descrição */}
          <div>
            <h2 className="font-serif text-2xl font-light text-zinc-900 mb-4">Sobre o empreendimento</h2>
            <p className="text-zinc-600 text-[15px] leading-[1.85]">{emp.descricaoLonga}</p>
          </div>

          {/* Diferenciais */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {emp.diferenciais.map((d) => (
              <div key={d} className="flex flex-col items-center justify-center text-center p-4 rounded-xl border border-zinc-200 bg-white">
                <span className="text-[#1b4332] text-[13px] font-medium leading-snug">{d}</span>
              </div>
            ))}
          </div>

          {/* ── SELECTOR DE PLANTAS ──────────────────────── */}
          <div>
            <h2 className="font-serif text-2xl font-light text-zinc-900 mb-6">Plantas</h2>

            {/* Tabs das tipologias */}
            <div className="flex flex-wrap gap-2 mb-8">
              {emp.tipologias.map((t, i) => (
                <button
                  key={i}
                  onClick={() => { setTipologiaAtiva(i); setPlantaErr(false); }}
                  className={`px-4 py-2 rounded-full text-[12px] font-medium tracking-wide border transition-all duration-200 ${
                    i === tipologiaAtiva
                      ? 'bg-[#1b4332] border-[#1b4332] text-white'
                      : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Info da tipologia selecionada */}
            <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-zinc-200">
              <div className="flex items-center gap-2 text-zinc-600">
                <BedDouble className="w-4 h-4 text-[#1b4332]/60" />
                <span className="text-[13px]">{tipologia.quartos}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600">
                <Maximize2 className="w-4 h-4 text-[#1b4332]/60" />
                <span className="text-[13px]">{tipologia.area}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600">
                <Car className="w-4 h-4 text-[#1b4332]/60" />
                <span className="text-[13px]">{tipologia.vagas}</span>
              </div>
            </div>

            {/* Imagem da planta */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-white">
              {!plantaErr ? (
                <img
                  src={tipologia.planta}
                  alt={`Planta ${tipologia.label}`}
                  className="w-full object-contain max-h-[480px]"
                  onError={() => setPlantaErr(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Maximize2 className="w-10 h-10 text-zinc-200" />
                  <p className="text-zinc-400 text-sm">Planta não disponível para esta tipologia</p>
                </div>
              )}
              {/* Label na planta */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur border border-white/10">
                <span className="text-[11px] text-white/70 font-medium">{tipologia.label}</span>
              </div>
            </div>
          </div>

          {/* Galeria */}
          {emp.galeria.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-light text-zinc-900 mb-6">Galeria</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {emp.galeria.map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
                    <ImgWithFallback
                      src={img}
                      alt={`${emp.nome} ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── COLUNA DIREITA — SIDEBAR ─────────────────────── */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">

          {/* Card de interesse */}
          <div className="rounded-2xl border border-zinc-200 shadow-sm bg-white p-6 flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#1b4332] mb-1">
                Tenho interesse
              </p>
              <h3 className="font-serif text-xl text-zinc-900 font-light">{emp.nome}</h3>
              <p className="text-zinc-500 text-[13px] mt-1">{emp.bairro} · {emp.cidade}</p>
            </div>

            <a
              href={`https://api.whatsapp.com/send?phone=556298160202&text=Olá!%20Tenho%20interesse%20no%20${encodeURIComponent(emp.nome)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[13px] font-medium text-white transition-all duration-200"
            >
              Falar pelo WhatsApp
            </a>

            <a
              href="tel:+556298160202"
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-zinc-50 text-[13px] text-zinc-600 hover:text-zinc-900 transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              (62) 98160-0202
            </a>
          </div>

          {/* Lazer */}
          <div className="rounded-2xl border border-zinc-200 shadow-sm bg-white p-6">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#1b4332] mb-4">
              Áreas de Lazer
            </p>
            <ul className="flex flex-col gap-2.5">
              {emp.lazer.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-zinc-600 text-[13px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b4332]/40 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Localização */}
          <div className="rounded-2xl border border-zinc-200 shadow-sm bg-white p-6">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#1b4332] mb-3">
              Localização
            </p>
            <div className="flex items-start gap-2 text-zinc-600 text-[13px] leading-relaxed">
              <MapPin className="w-4 h-4 text-[#1b4332]/60 flex-shrink-0 mt-0.5" />
              {emp.endereco}
            </div>
          </div>

          {/* Ver site oficial */}
          <a
            href={`${BASE_TRIPOLI}/imovel/${emp.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center text-[12px] text-zinc-400 hover:text-zinc-600 transition-colors underline underline-offset-2"
          >
            Ver no site oficial da Trípoli ↗
          </a>
        </div>
      </div>
    </div>
  );
}
