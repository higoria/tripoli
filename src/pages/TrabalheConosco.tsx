import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, CheckCircle, Loader2, X } from 'lucide-react';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
];

const VAGAS = [
  'Engenheiro Civil',
  'Arquiteto',
  'Mestre de Obras',
  'Encarregado de Obras',
  'Técnico em Edificações',
  'Vendedor de Imóveis',
  'Auxiliar Administrativo',
  'Assistente de Marketing',
  'Recursos Humanos',
  'Financeiro / Contabilidade',
  'Estagiário',
  'Outra',
];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function TrabalheConosco() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    estado: '',
    vaga: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    // Aplica a máscara (XX) XXXXX-XXXX
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)/, '($1');
    }

    setForm((p) => ({ ...p, telefone: value }));
  };

  const handleFile = (f: File | null) => {
    if (!f) return;
    const allowed = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(f.type)) {
      alert('Envie o currículo em formato PDF ou Word (.doc / .docx).');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      alert('Arquivo muito grande. Máximo 10 MB.');
      return;
    }
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { alert('Anexe seu currículo antes de enviar.'); return; }

    const phoneDigits = form.telefone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      alert('Por favor, insira um número de telefone válido com DDD.');
      return;
    }

    setStatus('sending');

    const body = [
      'Candidatura recebida via site Trípoli Construtora',
      '',
      `Nome: ${form.nome}`,
      `E-mail: ${form.email}`,
      `Telefone: ${form.telefone}`,
      `Cidade: ${form.cidade} - ${form.estado}`,
      `Vaga desejada: ${form.vaga}`,
      `Arquivo de currículo: ${file.name}`,
      '',
      '(Lembre-se de anexar o arquivo do currículo antes de enviar.)',
    ].join('\n');

    const mailtoLink = `mailto:rh@tripoliconstrutora.com.br?subject=${encodeURIComponent(`Currículo – ${form.vaga} – ${form.nome}`)}&body=${encodeURIComponent(body)}`;

    // usa location.href para evitar bloqueio de popup
    window.location.href = mailtoLink;

    await new Promise((r) => setTimeout(r, 1000));
    setStatus('success');
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-zinc-900 font-sans">

      {/* ── HEADER ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors text-[13px]">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
          <img src="/logo.png" alt="Trípoli Construtora" className="h-7 object-contain" />
          <div className="w-24" />
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0e1a14] py-24 px-6 sm:px-12">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1b4332]/30 rounded-full blur-[120px] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-[780px] mx-auto text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4ade80] mb-4">
            Carreira · Trípoli Construtora
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1] tracking-tight mb-6">
            Trabalhe <span className="text-[#4ade80]">Conosco</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
            Faça parte do time que transforma sonhos em endereços. Envie seu currículo e venha crescer com a gente.
          </p>
        </motion.div>
      </section>

      {/* ── FORMULÁRIO ───────────────────────────────── */}
      <section className="max-w-[680px] mx-auto px-6 sm:px-12 py-20">

        {status === 'success' ? (
          <div className="flex flex-col items-center text-center gap-6 py-16">
            <div className="w-20 h-20 rounded-full bg-[#1b4332]/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#1b4332]" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-light text-zinc-900 mb-3">Quase lá!</h2>
              <p className="text-zinc-500 text-[15px] leading-relaxed max-w-sm mx-auto mb-4">
                Seu cliente de e-mail foi aberto com as informações já preenchidas.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-left max-w-sm mx-auto">
                <p className="text-amber-800 text-[13px] font-semibold mb-1">Importante</p>
                <p className="text-amber-700 text-[13px] leading-relaxed">
                  Antes de clicar em <strong>Enviar</strong> no seu e-mail, anexe o arquivo{' '}
                  <strong className="text-amber-900">{file?.name}</strong> manualmente.
                </p>
              </div>
            </div>
            <button
              onClick={() => { setStatus('idle'); setForm({ nome:'', email:'', telefone:'', cidade:'', estado:'', vaga:'' }); setFile(null); }}
              className="mt-2 px-6 py-2.5 rounded-full border border-zinc-300 text-[13px] text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition-all"
            >
              Enviar outra candidatura
            </button>
          </div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onSubmit={handleSubmit} 
            className="flex flex-col gap-6"
          >

            <div>
              <h2 className="font-serif text-2xl font-light text-zinc-900 mb-1">Sua candidatura</h2>
              <p className="text-zinc-500 text-[13px]">
                Preencha os campos abaixo. Seu currículo será enviado para{' '}
                <span className="font-medium text-zinc-700">rh@tripoliconstrutora.com.br</span>.
              </p>
            </div>

            {/* Grid 2 colunas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Nome */}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-zinc-500">Nome completo *</label>
                <input
                  required
                  type="text"
                  value={form.nome}
                  onChange={set('nome')}
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332]/40 transition-all"
                />
              </div>

              {/* E-mail */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-zinc-500">E-mail *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332]/40 transition-all"
                />
              </div>

              {/* Telefone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-zinc-500">Telefone / WhatsApp *</label>
                <input
                  required
                  type="tel"
                  value={form.telefone}
                  onChange={handleTelefoneChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332]/40 transition-all"
                />
              </div>

              {/* Cidade */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-zinc-500">Cidade *</label>
                <input
                  required
                  type="text"
                  value={form.cidade}
                  onChange={set('cidade')}
                  placeholder="Sua cidade"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332]/40 transition-all"
                />
              </div>

              {/* Estado */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-zinc-500">Estado *</label>
                <select
                  required
                  value={form.estado}
                  onChange={set('estado')}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-[14px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332]/40 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Selecione o estado</option>
                  {ESTADOS.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>

              {/* Vaga desejada */}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-zinc-500">Vaga desejada *</label>
                <select
                  required
                  value={form.vaga}
                  onChange={set('vaga')}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-[14px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332]/40 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Selecione a vaga</option>
                  {VAGAS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Upload de currículo */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold tracking-[0.1em] uppercase text-zinc-500">
                Currículo (PDF ou Word) *
              </label>

              {file ? (
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#1b4332]/30 bg-[#1b4332]/5">
                  <div className="w-9 h-9 rounded-lg bg-[#1b4332]/10 flex items-center justify-center flex-shrink-0">
                    <Upload className="w-4 h-4 text-[#1b4332]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-zinc-800 truncate">{file.name}</p>
                    <p className="text-[11px] text-zinc-500">{(file.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-zinc-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-zinc-500" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                  className={`cursor-pointer flex flex-col items-center justify-center gap-3 px-6 py-10 rounded-xl border-2 border-dashed transition-all duration-200 ${
                    dragOver
                      ? 'border-[#1b4332] bg-[#1b4332]/5'
                      : 'border-zinc-200 hover:border-[#1b4332]/40 hover:bg-zinc-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] text-zinc-700 font-medium">
                      Clique para selecionar ou arraste aqui
                    </p>
                    <p className="text-[12px] text-zinc-400 mt-0.5">PDF, DOC ou DOCX · máximo 10 MB</p>
                  </div>
                </div>
              )}

              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />
            </div>

            {/* Botão de envio */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-medium text-[14px] tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {status === 'sending' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
              ) : (
                'Enviar candidatura'
              )}
            </button>

            <p className="text-center text-[11px] text-zinc-400 leading-relaxed">
              Ao clicar em enviar, seu aplicativo de e-mail será aberto.
              Lembre-se de <span className="font-medium text-zinc-500">anexar o arquivo do currículo</span> antes de confirmar o envio.
            </p>

          </motion.form>
        )}
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
