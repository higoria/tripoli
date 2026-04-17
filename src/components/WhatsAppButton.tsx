import { useState, useEffect } from 'react';
import { X, Phone, MessageCircle, Users } from 'lucide-react';

const WA_NUMBER = '556298160202';
const WA_BASE = `https://api.whatsapp.com/send?phone=${WA_NUMBER}`;

const options = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    sublabel: '(62) 98160-0202',
    icon: MessageCircle,
    iconColor: '#25D366',
    href: `${WA_BASE}&text=Olá!%20Tenho%20interesse%20em%20um%20imóvel%20Trípoli.`,
  },
  {
    id: 'telefone',
    label: 'Telefone',
    sublabel: '(62) 3941-3060',
    icon: Phone,
    iconColor: '#1b4332',
    href: 'tel:+556239413060',
  },
  {
    id: 'corretores',
    label: 'Fale com nossos Corretores',
    sublabel: 'Encontre um corretor credenciado',
    icon: Users,
    iconColor: '#1b4332',
    href: 'http://www.tripoliconstrutora.com.br/corretores-e-imobiliarias/',
  },
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Aparece após scroll de 200px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha modal com ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Trava scroll quando modal aberto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── BOTÃO FLUTUANTE ─────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir chat WhatsApp"
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.4)] transition-all duration-500 group ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
        style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
      >
        {/* Ping animado */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        {/* Ícone WhatsApp SVG oficial */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 text-white fill-current relative z-10 group-hover:scale-110 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      {/* ── MODAL ───────────────────────────────────────── */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Painel do modal */}
      <div
        className={`fixed z-[70] bottom-24 right-6 w-[320px] sm:w-[360px] rounded-2xl bg-white border border-zinc-200 shadow-[0_30px_80px_rgba(0,0,0,0.1)] transition-all duration-300 ${
          open
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        {/* Header do modal */}
        <div className="flex items-start justify-between p-5 pb-4 border-b border-zinc-200">
          <div>
            <h3 className="font-serif font-light text-xl text-zinc-900 leading-snug">
              Converse com<br />Vendas
            </h3>
            <p className="text-[12px] text-zinc-500 mt-1">Selecione uma opção de contato</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 rounded-full flex items-center justify-center border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 mt-0.5"
          >
            <X className="w-3.5 h-3.5 text-zinc-400" />
          </button>
        </div>

        {/* Opções de contato */}
        <div className="p-4 flex flex-col gap-2.5">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <a
                key={opt.id}
                href={opt.href}
                target={opt.href.startsWith('http') || opt.href.startsWith('https') ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between px-4 py-3.5 rounded-xl border border-zinc-200 hover:border-[#1b4332]/30 bg-zinc-50 hover:bg-[#1b4332]/5 transition-all duration-200"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-medium text-zinc-900 transition-colors">
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-zinc-500">{opt.sublabel}</span>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${opt.iconColor}18` }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: opt.iconColor }}
                    strokeWidth={1.8}
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer do modal */}
        <div className="px-5 pb-4 pt-1">
          <p className="text-[10px] text-zinc-400 text-center leading-relaxed">
            Ao entrar em contato, você concorda com nossa{' '}
            <a
              href="http://www.tripoliconstrutora.com.br/politica-de-privacidade/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-600 transition-colors"
            >
              política de privacidade
            </a>.
          </p>
        </div>
      </div>
    </>
  );
}
