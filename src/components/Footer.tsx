import { useState } from 'react';
import { ChevronDown, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

const TRIPOLI = 'http://www.tripoliconstrutora.com.br';

interface AccordionItem {
  title: string;
  links: { label: string; href: string }[];
}

const sections: AccordionItem[] = [
  {
    title: 'Ver todos os imóveis',
    links: [
      { label: 'Ilumi Bueno', href: `/empreendimento/ilumi-bueno` },
      { label: 'Ritmo Bueno', href: `/empreendimento/ritmo-bueno` },
      { label: 'Bosque das Orquídeas', href: `/empreendimento/bosque-das-orquideas` },
      { label: 'Pronto para Morar', href: `${TRIPOLI}/imoveis/pronto-para-morar/` },
      { label: 'Em Obras', href: `${TRIPOLI}/imoveis/em-obras/` },
    ],
  },
  {
    title: 'Fale com um Corretor',
    links: [
      { label: 'WhatsApp (62) 98160-0202', href: 'https://api.whatsapp.com/send?phone=556298160202&text=Olá!%20Gostaria%20de%20falar%20com%20um%20corretor.' },
      { label: 'Telefone (62) 3941-3060', href: 'tel:+556239413060' },
      { label: 'Corretores e Imobiliárias', href: `${TRIPOLI}/corretores-e-imobiliarias/` },
    ],
  },
  {
    title: 'Sobre a Trípoli',
    links: [
      { label: 'Nossa História', href: `${TRIPOLI}/a-tripoli/` },
      { label: 'Premiações', href: `${TRIPOLI}/a-tripoli/#premiacoes` },
      { label: 'Blog', href: `${TRIPOLI}/blog/` },
      { label: 'Trabalhe Conosco', href: `${TRIPOLI}/trabalhe-conosco/` },
    ],
  },
  {
    title: 'Fale Conosco',
    links: [
      { label: 'Quero comprar um imóvel', href: `${TRIPOLI}/fale-conosco/` },
      { label: 'Seja um fornecedor', href: `${TRIPOLI}/fale-conosco/` },
      { label: 'Simular Financiamento', href: `${TRIPOLI}/simular-financiamento/` },
    ],
  },
];

function AccordionSection({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200">
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] font-medium text-zinc-900">{item.title}</span>
        <ChevronDown
          className={`w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[300px] pb-4' : 'max-h-0'}`}
      >
        <ul className="flex flex-col gap-3 pl-1">
          {item.links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="text-[13px] text-zinc-500 hover:text-[#1b4332] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-zinc-100 border-t border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20">

        {/* ── TOP: Logo + Nav ─────────────────────────────── */}
        <div className="py-14 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">

          {/* Logo + tagline + social */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src={`${TRIPOLI}/arqs/logo/logo.png`}
                alt="Trípoli Construtora"
                className="h-10 object-contain"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = 'none';
                }}
              />
              <div>
                <p className="font-serif text-xl font-light text-zinc-900 leading-tight">Trípoli</p>
                <p className="text-[10px] text-zinc-500 tracking-widest uppercase">Construtora</p>
              </div>
            </div>

            <p className="text-[13px] text-zinc-500 leading-relaxed max-w-[240px]">
              Inovando na arte de construir. Mais de 21 anos transformando sonhos em endereços.
            </p>

            {/* Endereço */}
            <div className="flex items-start gap-2 text-zinc-500 text-[12px]">
              <MapPin className="w-3.5 h-3.5 text-[#1b4332]/60 flex-shrink-0 mt-0.5" />
              <span>Rua 10, nº 1057 — Setor Oeste<br />Goiânia — GO · CEP 74.120-020</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-500 text-[12px]">
              <Phone className="w-3.5 h-3.5 text-[#1b4332]/60 flex-shrink-0" />
              <span>(62) 98160-0202 · (62) 3941-3060</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://www.instagram.com/tripoliconstrutora/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-zinc-300 hover:border-[#1b4332]/30 hover:bg-[#1b4332]/5 transition-all duration-200"
              >
                <Instagram className="w-4 h-4 text-zinc-400 hover:text-[#1b4332] transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/tripoliconstrutora/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-zinc-300 hover:border-[#1b4332]/30 hover:bg-[#1b4332]/5 transition-all duration-200"
              >
                <Facebook className="w-4 h-4 text-zinc-400 hover:text-[#1b4332] transition-colors" />
              </a>
            </div>
          </div>

          {/* Desktop: 4 colunas de links */}
          <div className="hidden lg:grid grid-cols-4 gap-8">
            {sections.map((s) => (
              <div key={s.title} className="flex flex-col gap-4">
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#1b4332]">
                  {s.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {s.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-[13px] text-zinc-500 hover:text-[#1b4332] transition-colors leading-snug"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile: accordion */}
          <div className="flex flex-col lg:hidden">
            {sections.map((s) => (
              <AccordionSection key={s.title} item={s} />
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ──────────────────────────────────── */}
        <div className="border-t border-zinc-200 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-zinc-400 text-center sm:text-left">
            © {new Date().getFullYear()} Trípoli Construtora. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <a href={`${TRIPOLI}/politica-de-privacidade/`} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 transition-colors">
              Política de Privacidade
            </a>
            <span>·</span>
            <a href={`${TRIPOLI}/termos-de-uso/`} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
