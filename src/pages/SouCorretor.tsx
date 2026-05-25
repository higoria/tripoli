import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

// ─── Cole aqui a URL do seu Google Apps Script ───────────────────────────────
// Depois de publicar o script (veja instruções no README do projeto),
// substitua a string abaixo pela URL gerada.
const APPS_SCRIPT_URL = 'COLE_AQUI_A_URL_DO_APPS_SCRIPT';
// ─────────────────────────────────────────────────────────────────────────────

type Tipo = 'imobiliaria' | 'mercado' | '';
type Status = 'idle' | 'sending' | 'success' | 'error';

function maskCpf(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length > 9) return d.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, '$1.$2.$3-$4');
  if (d.length > 6) return d.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
  if (d.length > 3) return d.replace(/^(\d{3})(\d{0,3}).*/, '$1.$2');
  return d;
}

function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length > 10) return d.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  if (d.length > 6)  return d.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  if (d.length > 2)  return d.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
  if (d.length > 0)  return `(${d}`;
  return d;
}

export default function SouCorretor() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    creci: '',
    telefone: '',
    instagram: '',
    tipo: '' as Tipo,
    imobiliaria: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneDigits = form.telefone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      alert('Insira um número de telefone válido com DDD.');
      return;
    }

    setStatus('sending');

    try {
      // Google Apps Script exige o envio como URLSearchParams (não JSON)
      // para evitar problemas de CORS com preflight.
      const params = new URLSearchParams({
        nome:        form.nome,
        email:       form.email,
        cpf:         form.cpf,
        creci:       form.creci,
        telefone:    form.telefone,
        instagram:   form.instagram,
        tipo:        form.tipo === 'imobiliaria'
                       ? `Imobiliária — ${form.imobiliaria}`
                       : 'Corretor de mercado (autônomo)',
        data:        new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      });

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body:   params,
        // Apps Script com modo=no-cors não devolve resposta útil,
        // mas o dado é gravado. Usamos 'no-cors' para evitar erro de CORS.
        mode:   'no-cors',
      });

      setStatus('success');
    } catch {
      setStatus('error');
    }
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
            Parceiros · Trípoli Construtora
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1] tracking-tight mb-6">
            Sou <span className="text-[#4ade80]">Corretor</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
            Faça parte da nossa rede de parceiros e ofereça os melhores empreendimentos da Trípoli para seus clientes.
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
              <h2 className="font-serif text-2xl font-light text-zinc-900 mb-3">Cadastro enviado!</h2>
              <p className="text-zinc-500 text-[15px] leading-relaxed max-w-sm mx-auto">
                Seus dados foram registrados com sucesso. Em breve nossa equipe comercial entrará em contato.
              </p>
            </div>
            <button
              onClick={() => {
                setStatus('idle');
                setForm({ nome: '', email: '', cpf: '', creci: '', telefone: '', instagram: '', tipo: '', imobiliaria: '' });
              }}
              className="mt-2 px-6 py-2.5 rounded-full border border-zinc-300 text-[13px] text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition-all"
            >
              Enviar outro cadastro
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
              <h2 className="font-serif text-2xl font-light text-zinc-900 mb-1">Cadastro Corretor</h2>
              <p className="text-zinc-500 text-[13px]">
                Preencha seus dados para fazer parte da rede de parceiros Trípoli.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Nome completo */}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className={labelCls}>Nome Completo *</label>
                <input
                  required type="text" value={form.nome} onChange={set('nome')}
                  placeholder="Seu nome completo" className={field}
                />
              </div>

              {/* E-mail */}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className={labelCls}>E-mail *</label>
                <input
                  required type="email" value={form.email} onChange={set('email')}
                  placeholder="seu@email.com" className={field}
                />
              </div>

              {/* CPF */}
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>CPF *</label>
                <input
                  required type="text" inputMode="numeric" value={form.cpf}
                  onChange={(e) => setForm((p) => ({ ...p, cpf: maskCpf(e.target.value) }))}
                  placeholder="000.000.000-00" className={field}
                />
              </div>

              {/* CRECI */}
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>CRECI *</label>
                <input
                  required type="text" value={form.creci} onChange={set('creci')}
                  placeholder="Nº do CRECI" className={field}
                />
              </div>

              {/* Telefone */}
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Telefone / WhatsApp *</label>
                <input
                  required type="tel" value={form.telefone}
                  onChange={(e) => setForm((p) => ({ ...p, telefone: maskPhone(e.target.value) }))}
                  placeholder="(00) 00000-0000" className={field}
                />
              </div>

              {/* Instagram */}
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Instagram (Opcional)</label>
                <input
                  type="text" value={form.instagram} onChange={set('instagram')}
                  placeholder="@seuperfil" className={field}
                />
              </div>

              {/* Tipo */}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className={labelCls}>Você é... *</label>
                <select
                  required value={form.tipo}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tipo: e.target.value as Tipo, imobiliaria: '' }))
                  }
                  className={`${field} appearance-none cursor-pointer`}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="imobiliaria">Corretor de imobiliária</option>
                  <option value="mercado">Corretor de mercado (autônomo)</option>
                </select>
              </div>

              {/* Nome da Imobiliária — condicional */}
              {form.tipo === 'imobiliaria' && (
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className={labelCls}>Nome da Imobiliária *</label>
                  <input
                    required type="text" value={form.imobiliaria} onChange={set('imobiliaria')}
                    placeholder="Nome da imobiliária" className={field} autoFocus
                  />
                </div>
              )}

            </div>

            {/* Erro */}
            {status === 'error' && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px]">
                Ocorreu um erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-medium text-[14px] tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {status === 'sending' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
              ) : (
                'Enviar cadastro'
              )}
            </button>

            <p className="text-center text-[11px] text-zinc-400 leading-relaxed">
              Seus dados são enviados diretamente para nossa equipe comercial.
            </p>

          </motion.form>
        )}
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
