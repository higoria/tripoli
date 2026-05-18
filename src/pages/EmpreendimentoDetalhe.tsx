import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  BedDouble,
  Maximize2,
  Car,
  MapPin,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Phone,
  ZoomIn,
  X,
  Download,
} from 'lucide-react';
import { getEmpreendimentoBySlug } from '../data/empreendimentos';
import WhatsAppButton from '../components/WhatsAppButton';
import { MapSection } from '../components/MapSection';
import { SectorSection } from '../components/SectorSection';

const BASE_TRIPOLI = 'http://www.tripoliconstrutora.com.br';

const WazeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3c4.4 0 8 3.6 8 8s-3.6 8-8 8c-1.3 0-2.6-.3-3.7-.9l-3.8 1.1c-.5.1-.9-.3-.8-.8l1.1-3.8c-.6-1.1-.9-2.4-.9-3.7 0-4.4 3.6-8 8-8z" fill="white" />
    <circle cx="8.5" cy="19.5" r="2" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="19.5" r="2" fill="currentColor" stroke="none" />
    <circle cx="9" cy="10" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="10" r="1.2" fill="currentColor" stroke="none" />
    <path d="M9 14c1 1.5 5 1.5 6 0" />
  </svg>
);

/* ── Placeholder quando imagem falha ─────────────────────── */
function ImgWithFallback({
  src,
  alt,
  className,
  loading,
  decoding,
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'auto' | 'sync';
}) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className={`flex items-center justify-center bg-zinc-100 ${className}`}>
        <span className="text-[#1b4332]/10 text-6xl font-serif select-none">T</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading={loading} decoding={decoding} onError={() => setErr(true)} />;
}

/* ── Página de Detalhe ────────────────────────────────────── */
export default function EmpreendimentoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const emp = getEmpreendimentoBySlug(slug ?? '');

  const [tipologiaAtiva, setTipologiaAtiva] = useState(0);
  const [plantaErr, setPlantaErr] = useState(false);
  const [categoriaGaleriaAtiva, setCategoriaGaleriaAtiva] = useState(0);
  const [plantaZoomOpen, setPlantaZoomOpen] = useState(false);
  const [galeriaZoomOpen, setGaleriaZoomOpen] = useState(false);
  const [galeriaImgIndex, setGaleriaImgIndex] = useState(0);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.defaultMuted = true;
      heroVideoRef.current.muted = true;
      heroVideoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [emp?.heroVideo]);


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

          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-400">
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
      <section className="relative h-[75vh] min-h-[500px] overflow-hidden">
        {emp.heroVideo ? (
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            poster={emp.heroImg}
            className={`absolute inset-0 w-full h-full object-cover object-center ${emp.heroVideoClassName || ''}`}
          >
            <source src={emp.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <ImgWithFallback
            src={emp.heroImg}
            alt={emp.nome}
            loading="eager"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
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

        {/* Título sobre a imagem e Endereço */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-10 max-w-[1400px] mx-auto"
        >
          <h1 className="font-serif font-light text-2xl sm:text-3xl md:text-4xl leading-[1.05] tracking-tight text-white">
            {emp.nome}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-white/90 text-sm sm:text-base font-light tracking-wide drop-shadow-md">
            <MapPin className="w-4 h-4 text-white/80" />
            <span>{emp.enderecoCurto || emp.endereco}</span>
          </div>
        </motion.div>
      </section>

      {/* ── CONTEÚDO PRINCIPAL ─────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-14 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16">

        {/* ── COLUNA ESQUERDA ──────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-12"
        >

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

          {/* Vídeo de Apresentação */}
          {emp.presentationVideo && (
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-light text-zinc-900 mb-6">Apresentação</h2>
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-black shadow-sm">
                <video
                  playsInline
                  controls
                  preload="none"
                  poster={emp.heroImg}
                  disablePictureInPicture
                  className="w-full max-h-[60vh] object-contain"
                  src={emp.presentationVideo}
                />
              </div>
            </div>
          )}

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
            <div 
              className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-white flex justify-center p-4 cursor-pointer group hover:border-[#1b4332]/30 transition-colors"
              onClick={() => !plantaErr && setPlantaZoomOpen(true)}
            >
              {!plantaErr ? (
                <img
                  src={tipologia.planta}
                  alt={`Planta ${tipologia.label}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-contain max-h-[600px] group-hover:scale-[1.02] transition-transform duration-500"
                  onError={() => setPlantaErr(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <Maximize2 className="w-10 h-10 text-zinc-200" />
                  <p className="text-zinc-400 text-sm">Planta não disponível para esta tipologia</p>
                </div>
              )}

              {/* Cue de Ampliar */}
              {!plantaErr && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-white/10 shadow-sm transition-transform group-hover:scale-105">
                  <ZoomIn className="w-3.5 h-3.5 text-white" />
                  <span className="text-[11px] font-medium text-white tracking-wide">Ampliar</span>
                </div>
              )}

              {/* Label na planta */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur border border-white/10">
                <span className="text-[11px] text-white/70 font-medium">{tipologia.label}</span>
              </div>
            </div>

            {/* Botão de Download do Caderno de Plantas */}
            {emp.slug !== 'bosque-das-orquideas' && (
              <a
                href="#"
                className="mt-6 flex items-center justify-center gap-2 px-6 py-3.5 border border-zinc-200 hover:border-zinc-300 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 text-[13px] font-medium transition-colors"
              >
                <Download className="w-4 h-4 text-[#1b4332]" />
                Baixe o caderno de plantas
              </a>
            )}
          </div>

          {/* Galeria */}
          {emp.galeria.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-light text-zinc-900 mb-6">Galeria</h2>
              
              {/* Tabs das Categorias da Galeria */}
              <div className="flex flex-wrap gap-2 mb-6">
                {emp.galeria.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setCategoriaGaleriaAtiva(i)}
                    className={`px-4 py-2 rounded-full text-[12px] font-medium tracking-wide border transition-all duration-200 ${
                      i === categoriaGaleriaAtiva
                        ? 'bg-[#1b4332] border-[#1b4332] text-white'
                        : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900'
                    }`}
                  >
                    {cat.nome}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {emp.galeria[categoriaGaleriaAtiva].imagens.slice(0, 8).map((img, i) => {
                  const isUltima = i === 7;
                  const excedente = emp.galeria[categoriaGaleriaAtiva].imagens.length - 8;
                  const mostraOverlayExcedente = isUltima && excedente > 0;
                  
                  return (
                    <div 
                      key={i} 
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 cursor-pointer group"
                      onClick={() => {
                        setGaleriaImgIndex(i);
                        setGaleriaZoomOpen(true);
                      }}
                    >
                      <ImgWithFallback
                        src={img}
                        alt={`${emp.nome} - ${emp.galeria[categoriaGaleriaAtiva].nome} ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {mostraOverlayExcedente ? (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white transition-colors group-hover:bg-black/60">
                          <span className="text-2xl sm:text-3xl font-light">+{excedente}</span>
                          <span className="text-[11px] sm:text-[13px] font-medium tracking-wide uppercase mt-1">Imagens</span>
                        </div>
                      ) : (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 shadow-sm transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100 duration-300">
                          <ZoomIn className="w-3 h-3 text-white" />
                          <span className="text-[10px] font-medium text-white tracking-wide">Ampliar</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </motion.div>

        {/* ── COLUNA DIREITA — SIDEBAR ─────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start"
        >

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

            {emp.localizacao && (
              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${emp.localizacao.lat},${emp.localizacao.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-zinc-50 text-[13px] text-zinc-600 hover:text-zinc-900 transition-all duration-200 group"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" 
                    alt="Google Maps" 
                    loading="lazy"
                    decoding="async"
                    className="w-[15px] h-[15px] group-hover:scale-110 transition-transform" 
                  />
                  Como chegar com Google Maps
                </a>
                <a
                  href={`https://waze.com/ul?ll=${emp.localizacao.lat},${emp.localizacao.lng}&navigate=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-zinc-50 text-[13px] text-zinc-600 hover:text-zinc-900 transition-all duration-200 group"
                >
                  <WazeIcon className="w-[15px] h-[15px] text-zinc-600 group-hover:scale-110 transition-transform" />
                  Como chegar com Waze
                </a>
              </div>
            )}
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
        </motion.div>
      </div>

      {/* ── SEÇÃO DO SETOR (largura total) ──────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <SectorSection setorInfo={emp.setorInfo} />
      </div>

      {/* ── MAPA (largura total) ─────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 pb-14">
        <MapSection empreendimento={emp} />
      </div>

      {/* ── WHATSAPP FLUTUANTE ─────────────────────────────────── */}
      <WhatsAppButton />

      {/* ── MODAL DE PLANTA AMPLIADA ───────────────────────────── */}
      {plantaZoomOpen && !plantaErr && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 transition-opacity"
          onClick={() => setPlantaZoomOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setPlantaZoomOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {emp.tipologias.length > 1 && (
            <button
              className="absolute left-4 sm:left-12 p-2 rounded-full bg-white text-[#1b4332] shadow-xl hover:scale-105 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                setTipologiaAtiva((prev) => (prev === 0 ? emp.tipologias.length - 1 : prev - 1));
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <img
            src={tipologia.planta}
            alt={`Planta Ampliada ${tipologia.label}`}
            loading="lazy"
            decoding="async"
            className="max-w-full max-h-[90vh] object-contain select-none shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {emp.tipologias.length > 1 && (
            <button
              className="absolute right-4 sm:right-12 p-2 rounded-full bg-white text-[#1b4332] shadow-xl hover:scale-105 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                setTipologiaAtiva((prev) => (prev === emp.tipologias.length - 1 ? 0 : prev + 1));
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}

      {/* ── MODAL DE GALERIA AMPLIADA ───────────────────────────── */}
      {galeriaZoomOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 transition-opacity"
          onClick={() => setGaleriaZoomOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setGaleriaZoomOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {emp.galeria[categoriaGaleriaAtiva].imagens.length > 1 && (
            <button
              className="absolute left-4 sm:left-12 p-2 rounded-full bg-white text-[#1b4332] shadow-xl hover:scale-105 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                setGaleriaImgIndex((prev) => (prev === 0 ? emp.galeria[categoriaGaleriaAtiva].imagens.length - 1 : prev - 1));
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <img
            src={emp.galeria[categoriaGaleriaAtiva].imagens[galeriaImgIndex]}
            alt="Imagem Ampliada"
            loading="lazy"
            decoding="async"
            className="max-w-full max-h-[90vh] object-contain select-none shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {emp.galeria[categoriaGaleriaAtiva].imagens.length > 1 && (
            <button
              className="absolute right-4 sm:right-12 p-2 rounded-full bg-white text-[#1b4332] shadow-xl hover:scale-105 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                setGaleriaImgIndex((prev) => (prev === emp.galeria[categoriaGaleriaAtiva].imagens.length - 1 ? 0 : prev + 1));
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}

    </div>
  );
}
