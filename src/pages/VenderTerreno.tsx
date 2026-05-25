import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, CheckCircle, Loader2, X } from 'lucide-react';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length > 10) return d.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  if (d.length > 6)  return d.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  if (d.length > 2)  return d.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
  if (d.length > 0)  return `(${d}`;
  return d;
}

function maskCEP(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 8);
  if (d.length > 5) return d.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
  return d;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function VenderTerreno() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    relacao: '',
    cep: '',
    cidade: '',
    estado: '',
    area: '',
    mensagem: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskedValue = maskCEP(rawValue);
    setForm((p) => ({ ...p, cep: maskedValue }));

    const digits = maskedValue.replace(/\D/g, '');
    if (digits.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setForm((p) => ({
            ...p,
            cidade: data.localidade || '',
            estado: data.uf || '',
          }));
        }
      } catch (err) {
        console.error('Erro ao buscar CEP', err);
      }
    }
  };

  const handleFile = (f: File | null) => {
    if (!f) return;
    
    const ext = f.name.split('.').pop()?.toLowerCase();
    const isAllowedExt = ext === 'kmz' || ext === 'pdf' || ext === 'doc' || ext === 'docx' || ext === 'jpg' || ext === 'jpeg' || ext === 'png';
    
    if (!isAllowedExt) {
      alert('Formato inválido. Aceitamos apenas .kmz, PDF, imagens ou documentos de texto.');
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      alert('Arquivo muito grande. O tamanho máximo é de 20 MB.');
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
    
    if (!file) {
      alert('Por favor, anexe as informações da área antes de enviar.');
      return;
    }

    setStatus('sending');

    const body = [
      'Nova Proposta de Terreno via site Trípoli Construtora',
      '',
      `Nome: ${form.nome}`,
      `E-mail: ${form.email}`,
      `Telefone: ${form.telefone}`,
      `Relação com o terreno: ${form.relacao}`,
      `CEP: ${form.cep}`,
      `Cidade/UF: ${form.cidade} - ${form.estado}`,
      `Área: ${form.area} m²`,
      `Mensagem/Proposta: ${form.mensagem}`,
      `Arquivo anexo: ${file.name}`,
      '',
      '(Lembre-se de anexar o arquivo manualmente no e-mail antes de enviar.)',
    ].join('\n');

    const mailtoLink = `mailto:imoveis@tripoliconstrutora.com.br?subject=${encodeURIComponent(`Nova Área para Análise – ${form.cidade}/${form.estado}`)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    await new Promise((r) => setTimeout(r, 1000));
    setStatus('success');
  };

  const field =
    'w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332]/40 transition-all';
  const labelCls =
    'text-[12px] font-semibold tracking-[0.1em] uppercase text-zinc-500';

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
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1b4332]/30 rounded-full blur-[120px] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[780px] mx-auto text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4ade80] mb-4">
            Negócios · Trípoli Construtora
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1] tracking-tight mb-6">
            Vender <span className="text-[#4ade80]">Terreno</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
            Tem uma área com potencial construtivo? Envie os dados do seu terreno e nossa equipe fará uma análise de viabilidade.
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
              onClick={() => { setStatus('idle'); setForm({ nome:'', email:'', telefone:'', relacao:'', cep:'', cidade:'', estado:'', area:'', mensagem:'' }); setFile(null); }}
              className="mt-2 px-6 py-2.5 rounded-full border border-zinc-300 text-[13px] text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition-all"
            >
              Enviar nova proposta
            </button>
          </div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px", amount: 0.1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit} 
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="font-serif text-2xl font-light text-zinc-900 mb-1">Ficha da Área</h2>
              <p className="text-zinc-500 text-[13px]">
                Preencha o formulário abaixo e anexe as informações para nos apresentar sua área.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className={labelCls}>Nome Completo *</label>
                <input required type="text" value={form.nome} onChange={set('nome')} placeholder="Seu nome completo" className={field} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>E-mail *</label>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="seu@email.com" className={field} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Telefone / WhatsApp *</label>
                <input required type="tel" value={form.telefone} onChange={(e) => setForm((p) => ({ ...p, telefone: maskPhone(e.target.value) }))} placeholder="(00) 00000-0000" className={field} />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className={labelCls}>Relação com o terreno *</label>
                <select required value={form.relacao} onChange={set('relacao')} className={`${field} appearance-none cursor-pointer`}>
                  <option value="">Selecione uma opção</option>
                  <option value="Proprietário">Proprietário</option>
                  <option value="Corretor">Corretor</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>CEP *</label>
                <input required type="text" value={form.cep} onChange={handleCEPChange} placeholder="00000-000" className={field} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Área em m² *</label>
                <input required type="number" min="0" value={form.area} onChange={set('area')} placeholder="Ex: 1000" className={field} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Cidade *</label>
                <input required type="text" value={form.cidade} onChange={set('cidade')} placeholder="Sua cidade" className={field} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Estado *</label>
                <input required type="text" value={form.estado} onChange={set('estado')} placeholder="Ex: GO" className={field} />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className={labelCls}>Mensagem / Proposta</label>
                <textarea rows={4} value={form.mensagem} onChange={set('mensagem')} placeholder="Detalhes adicionais sobre a área..." className={`${field} resize-none`} />
              </div>

              {/* Upload de arquivo */}
              <div className="sm:col-span-2 flex flex-col gap-1.5 mt-2">
                <label className={labelCls}>
                  Envie informações da área (.kmz, IPTU, uso do solo, imagem ou PDF) *
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
                        Clique para selecionar ou arraste o arquivo aqui
                      </p>
                      <p className="text-[12px] text-zinc-400 mt-0.5">.kmz, IPTU, uso do solo, imagens, PDF · máximo 20 MB</p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileRef}
                  type="file"
                  accept=".kmz,.pdf,image/*,.doc,.docx"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
              </div>

            </div>

            <button 
              type="submit" 
              disabled={status === 'sending'} 
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-medium text-[14px] tracking-wide transition-all duration-200 shadow-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
              ) : (
                'Enviar Proposta'
              )}
            </button>
          </motion.form>
        )}
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
