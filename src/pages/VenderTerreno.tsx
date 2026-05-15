import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Olá! Quero vender meu terreno.\n\n*Nome:* ${form.nome}\n*E-mail:* ${form.email}\n*Telefone:* ${form.telefone}\n*Relação com o terreno:* ${form.relacao}\n*CEP:* ${form.cep}\n*Cidade/UF:* ${form.cidade} - ${form.estado}\n*Área:* ${form.area} m²\n*Mensagem/Proposta:* ${form.mensagem}`;
    const url = `https://api.whatsapp.com/send?phone=556298160202&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
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
              Preencha o formulário abaixo para nos apresentar sua área.
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
          </div>

          <button type="submit" className="w-full py-4 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-medium text-[14px] tracking-wide transition-all duration-200 shadow-sm mt-2">
            Enviar proposta por WhatsApp
          </button>
        </motion.form>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
