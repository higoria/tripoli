export interface Tipologia {
  label: string;
  quartos: string;
  area: string;
  vagas: string;
  planta: string;
}

export interface Empreendimento {
  id: string;
  slug: string;
  nome: string;
  tipo: string;
  status: 'Em Obras' | 'Pronto para Morar';
  bairro: string;
  cidade: string;
  endereco: string;
  descricao: string;
  descricaoLonga: string;
  heroImg: string;
  galeria: string[];
  tipologias: Tipologia[];
  lazer: string[];
  diferenciais: string[];
}

export const empreendimentos: Empreendimento[] = [
  /* ── ILUMI BUENO ─────────────────────────────────────────── */
  {
    id: 'ilumi-bueno',
    slug: 'ilumi-bueno',
    nome: 'Ilumi Bueno',
    tipo: 'Apartamento',
    status: 'Pronto para Morar',
    bairro: 'Setor Bueno',
    cidade: 'Goiânia — GO',
    endereco: 'Rua T-37, Qd. 147, Lotes 14/15 — Setor Bueno, Goiânia',
    descricao: 'Sofisticação e natureza integradas em pleno Setor Bueno.',
    descricaoLonga:
      'O Ilumi Bueno une arquitetura contemporânea e áreas verdes exuberantes em um dos bairros mais valorizados de Goiânia. Com 36 andares e apenas 5 apartamentos por andar, o empreendimento garante privacidade e exclusividade para quem busca o melhor em qualidade de vida. O rooftop com piscina e vista panorâmica é o ponto alto do projeto.',
    heroImg: '/images/ilumi-bueno/hero.jpg',
    galeria: [
      '/images/ilumi-bueno/foto-1.png',
      '/images/ilumi-bueno/foto-2.png',
      '/images/ilumi-bueno/foto-3.png',
      '/images/ilumi-bueno/foto-4.png',
      '/images/ilumi-bueno/foto-5.png',
      '/images/ilumi-bueno/foto-6.png',
      '/images/ilumi-bueno/foto-7.png',
      '/images/ilumi-bueno/foto-8.png',
    ],
    tipologias: [
      {
        label: '3 Suítes · 109m²',
        quartos: '3 Suítes',
        area: '109m²',
        vagas: '2 vagas',
        planta: '/images/ilumi-bueno/planta-4.jpg',
      },
      {
        label: '3 Quartos · 75m²',
        quartos: '3 Quartos',
        area: '75m²',
        vagas: '2 vagas',
        planta: '/images/ilumi-bueno/planta-3.jpg',
      },
      {
        label: '2 Quartos · 64m²',
        quartos: '2 Quartos (1 suíte)',
        area: '64m²',
        vagas: '1–2 vagas',
        planta: '/images/ilumi-bueno/planta-5.jpg',
      },
      {
        label: '2 Quartos · 58m²',
        quartos: '2 Quartos',
        area: '58m²',
        vagas: '1 vaga',
        planta: '/images/ilumi-bueno/planta-2.jpg',
      },
    ],
    lazer: ['Piscina Rooftop', 'Fitness', 'Espaço Gourmet', 'Kids Space', 'Salão de Festas'],
    diferenciais: ['36 andares', '5 aptos por andar', '145 unidades', 'Entrega prevista 2026'],
  },

  /* ── RITMO BUENO ─────────────────────────────────────────── */
  {
    id: 'ritmo-bueno',
    slug: 'ritmo-bueno',
    nome: 'Ritmo Bueno',
    tipo: 'Apartamento',
    status: 'Pronto para Morar',
    bairro: 'Setor Bueno',
    cidade: 'Goiânia — GO',
    endereco: 'Rua T-37, Qd. 147, nº 3.449, Lotes 16/17 — Setor Bueno, Goiânia',
    descricao: 'Para cada estilo de vida, um apartamento no coração do Bueno.',
    descricaoLonga:
      'O Ritmo Bueno oferece a maior variedade de tipologias entre os empreendimentos da Trípoli, com opções do studio ao 3 quartos. São 32 andares, 8 apartamentos por andar e 3 elevadores, garantindo agilidade e conforto no dia a dia. Localizado lado a lado com o Ilumi Bueno, no coração do Setor Bueno.',
    heroImg: '/images/ritmo-bueno/hero.jpg',
    galeria: [
      '/images/ritmo-bueno/foto-1.jpg',
      '/images/ritmo-bueno/foto-2.jpg',
      '/images/ritmo-bueno/foto-3.jpg',
      '/images/ritmo-bueno/foto-4.jpg',
      '/images/ritmo-bueno/foto-5.jpg',
      '/images/ritmo-bueno/foto-6.jpg',
      '/images/ritmo-bueno/foto-7.jpg',
      '/images/ritmo-bueno/foto-8.jpg',
    ],
    tipologias: [
      {
        label: '3 Quartos · 88m²',
        quartos: '3 Quartos',
        area: '88m²',
        vagas: '1–2 vagas',
        planta: '/images/ritmo-bueno/planta-8.jpg',
      },
      {
        label: '3 Quartos · 85m²',
        quartos: '3 Quartos',
        area: '85m²',
        vagas: '1–2 vagas',
        planta: '/images/ritmo-bueno/planta-6.jpg',
      },
      {
        label: '2 Quartos · 67m²',
        quartos: '2 Quartos',
        area: '67m²',
        vagas: '1–2 vagas',
        planta: '/images/ritmo-bueno/planta-5.jpg',
      },
      {
        label: '2 Quartos · 62m²',
        quartos: '2 Quartos',
        area: '62m²',
        vagas: '1 vaga',
        planta: '/images/ritmo-bueno/planta-4.jpg',
      },
      {
        label: '1 Quarto · 51m²',
        quartos: '1 Quarto',
        area: '51m²',
        vagas: '1 vaga',
        planta: '/images/ritmo-bueno/planta-3.jpg',
      },
      {
        label: '1 Quarto · 45m²',
        quartos: '1 Quarto',
        area: '45m²',
        vagas: '0–1 vaga',
        planta: '/images/ritmo-bueno/planta-1.jpg',
      },
      {
        label: '1 Quarto · 39m²',
        quartos: '1 Quarto (Studio)',
        area: '39m²',
        vagas: '0 vaga',
        planta: '/images/ritmo-bueno/planta-2.jpg',
      },
    ],
    lazer: ['Piscina Rooftop', 'Academia', 'Hall de Entrada Elegante', '3 Elevadores', 'Coworking'],
    diferenciais: ['32 andares', '8 aptos por andar', '200 unidades', 'Entrega prevista 2026'],
  },

  /* ── BOSQUE DAS ORQUÍDEAS ───────────────────────────────── */
  {
    id: 'bosque-das-orquideas',
    slug: 'bosque-das-orquideas',
    nome: 'Bosque das Orquídeas',
    tipo: 'Sobrado em Condomínio',
    status: 'Pronto para Morar',
    bairro: 'Sítios Santa Luzia',
    cidade: 'Aparecida de Goiânia — GO',
    endereco: 'Rua X-028 — Sítios Santa Luzia, Aparecida de Goiânia',
    descricao: 'Sobrados prontos em condomínio fechado com bosque privativo.',
    descricaoLonga:
      'O Bosque das Orquídeas é um condomínio fechado de sobrados com 64 unidades distribuídas em meio a área verde preservada. Com portaria 24 horas, piscina, salão de festas e bosque privativo, o empreendimento oferece segurança e qualidade de vida para toda a família. Pronto para morar agora.',
    heroImg: '/images/bosque-das-orquideas/hero.jpg',
    galeria: [
      '/images/bosque-das-orquideas/foto-1.jpg',
      '/images/bosque-das-orquideas/foto-2.jpg',
      '/images/bosque-das-orquideas/foto-3.jpg',
      '/images/bosque-das-orquideas/foto-4.jpg',
      '/images/bosque-das-orquideas/foto-5.jpg',
      '/images/bosque-das-orquideas/foto-6.jpg',
      '/images/bosque-das-orquideas/foto-7.jpg',
      '/images/bosque-das-orquideas/foto-8.jpg',
    ],
    tipologias: [
      {
        label: 'Sobrado · 161m²',
        quartos: '3 Quartos',
        area: '161m²',
        vagas: '2 vagas',
        planta: '/images/bosque-das-orquideas/planta-3.jpg',
      },
    ],
    lazer: ['Portaria 24h', 'Piscina', 'Salão de Festas', 'Bosque Privativo', 'Área de Lazer'],
    diferenciais: ['64 sobrados', 'Condomínio fechado', 'Pronto para morar', 'Área verde preservada'],
  },
];

export function getEmpreendimentoBySlug(slug: string): Empreendimento | undefined {
  return empreendimentos.find((e) => e.slug === slug);
}
