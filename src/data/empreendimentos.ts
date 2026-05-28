export interface Tipologia {
  label: string;
  quartos: string;
  area: string;
  vagas: string;
  planta: string;
}

export interface CategoriaGaleria {
  nome: string;
  imagens: string[];
}

export interface PontoDeInteresse {
  nome: string;
  lat: number;
  lng: number;
}

export interface CategoriaPOI {
  categoria: string;
  locais: PontoDeInteresse[];
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
  enderecoCurto?: string;
  descricao: string;
  descricaoLonga: string;
  heroImg: string;
  heroVideo?: string;
  heroVideoDesktop?: string;
  heroVideoClassName?: string;
  presentationVideo?: string;
  cadernoDePlantas?: string;
  galeria: CategoriaGaleria[];
  tipologias: Tipologia[];
  resumo: {
    quartos: string;
    area: string;
    vagas: string;
  };
  lazer: string[];
  diferenciais: string[];
  localizacao?: {
    lat: number;
    lng: number;
  };
  pontosDeInteresse?: CategoriaPOI[];
  setorInfo?: {
    nome: string;
    descricao: string;
    imagens: string[];
  };
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
    endereco: 'Rua T-37, nº 3449/3457 - Setor Bueno, Goiânia - GO (CEP: 74.230-022)',
    enderecoCurto: 'Rua T-37, 3449 - St. Bueno.',
    descricao: 'Iluminação natural, amplitude e uma vista privilegiada no alto do Bueno.',
    descricaoLonga:
      'O Ilumi Bueno une arquitetura contemporânea e áreas verdes exuberantes em um dos bairros mais valorizados de Goiânia. Com 36 andares e apenas 5 apartamentos por andar, o empreendimento garante privacidade e exclusividade para quem busca o melhor em qualidade de vida. O rooftop com piscina e vista panorâmica é o ponto alto do projeto.',
    heroImg: '/images/ilumi-bueno/hero.jpg',
    heroVideo: '/videoIlumiBuenoBannerSectionOFC.mp4',
    heroVideoDesktop: '/0526.mp4',
    heroVideoClassName: '!object-cover scale-[1.35] md:scale-125',
    cadernoDePlantas: '/cadernoDePlantasIlumiBueno.pdf',
    galeria: [
      {
        nome: 'Area comum / Lazer',
        imagens: [
          '/images/ilumi-bueno/area-comum/01 - Fachada frente.jpg',
          '/images/ilumi-bueno/area-comum/01 - Fachada 2.jpg',
          '/images/ilumi-bueno/area-comum/14 - vista aerea (1).jpg',
          '/images/ilumi-bueno/area-comum/14 - vista aerea (2).jpg',
          '/images/ilumi-bueno/area-comum/14 - vista aerea (7).jpg',
          '/images/ilumi-bueno/area-comum/14 - vista aerea (8).jpg',
          '/images/ilumi-bueno/area-comum/14 - vista aerea (9).jpg',
          '/images/ilumi-bueno/area-comum/14 - vista aerea (11).jpg',
          '/images/ilumi-bueno/area-comum/02 - hall de entrada.jpg',
          '/images/ilumi-bueno/area-comum/02 - hall de entrada 2.jpg',
          '/images/ilumi-bueno/area-comum/03 - mercado exclusivo.jpg',
          '/images/ilumi-bueno/area-comum/04 - sala de entregas.jpg',
          '/images/ilumi-bueno/area-comum/05 - piscina - 1.jpg',
          '/images/ilumi-bueno/area-comum/05 - piscina -  2.jpg',
          '/images/ilumi-bueno/area-comum/05 - piscina  3.jpg',
          '/images/ilumi-bueno/area-comum/05 - piscina - 4.jpg',
          '/images/ilumi-bueno/area-comum/05 - piscina - 5.jpg',
          '/images/ilumi-bueno/area-comum/06 - quadra esportiva.jpg',
          '/images/ilumi-bueno/area-comum/07 - playground - 1.jpg',
          '/images/ilumi-bueno/area-comum/07 - playground - 2.jpg',
          '/images/ilumi-bueno/area-comum/08 - brinquedoteca - 1.jpg',
          '/images/ilumi-bueno/area-comum/08 - brinquedoteca - 02.jpg',
          '/images/ilumi-bueno/area-comum/09 - sauna.jpg',
          '/images/ilumi-bueno/area-comum/10 - varanda de jogos - 1.jpg',
          '/images/ilumi-bueno/area-comum/10 - varanda de jogos - 2.jpg',
          '/images/ilumi-bueno/area-comum/10 - varanda de jogos - 3.jpg',
          '/images/ilumi-bueno/area-comum/11 - gourmet com varanda.jpg',
          '/images/ilumi-bueno/area-comum/11 - gourmet com varanda (2).jpg',
          '/images/ilumi-bueno/area-comum/11 - gourmet com varanda (3).jpg',
          '/images/ilumi-bueno/area-comum/11 - gourmet com varanda (4).jpg',
          '/images/ilumi-bueno/area-comum/12 - salão de festas.jpg',
          '/images/ilumi-bueno/area-comum/12 - salão de festas (2).jpg',
          '/images/ilumi-bueno/area-comum/13 - academia.jpg',
          '/images/ilumi-bueno/area-comum/13 - academia (2).jpg',
          '/images/ilumi-bueno/area-comum/13 - academia (3).jpg',
          '/images/ilumi-bueno/area-comum/13 - academia (4).jpg',
          '/images/ilumi-bueno/area-comum/13 - academia (5).jpg',
        ],
      },
      {
        nome: 'Decorado 3Q',
        imagens: [
          '/images/ilumi-bueno/decorado-3q/01-ENTRADA.jpeg',
          '/images/ilumi-bueno/decorado-3q/02-SALA ESTAR - HOME.jpeg',
          '/images/ilumi-bueno/decorado-3q/03-SALA ESTAR - HOME.jpeg',
          '/images/ilumi-bueno/decorado-3q/04- ESTAR-JANTAR-COZINHA.jpeg',
          '/images/ilumi-bueno/decorado-3q/05-JANTAR.jpeg',
          '/images/ilumi-bueno/decorado-3q/06-COZINHA.jpg',
          '/images/ilumi-bueno/decorado-3q/07-COZINHA.jpeg',
          '/images/ilumi-bueno/decorado-3q/08-COZINHA.jpeg',
          '/images/ilumi-bueno/decorado-3q/09-INTEGRAÇÃO.jpeg',
          '/images/ilumi-bueno/decorado-3q/10-VARANDA.jpg',
          '/images/ilumi-bueno/decorado-3q/11-VARANDA.jpeg',
          '/images/ilumi-bueno/decorado-3q/12-QUARTO 1.jpg',
          '/images/ilumi-bueno/decorado-3q/13-QUARTO 1.jpg',
          '/images/ilumi-bueno/decorado-3q/14-QUARTO 1.jpeg',
          '/images/ilumi-bueno/decorado-3q/15-QUARTO 2.jpeg',
          '/images/ilumi-bueno/decorado-3q/16-QUARTO 2.jpg',
          '/images/ilumi-bueno/decorado-3q/17-QUARTO 2.jpeg',
          '/images/ilumi-bueno/decorado-3q/18-QUARTO 2.jpeg',
          '/images/ilumi-bueno/decorado-3q/19-SUÍTE CASAL.jpeg',
          '/images/ilumi-bueno/decorado-3q/20-SUÍTE CASAL.jpeg',
          '/images/ilumi-bueno/decorado-3q/21-SUÍTE CASAL.jpeg',
          '/images/ilumi-bueno/decorado-3q/22-SUÍTE CASAL.jpg',
          '/images/ilumi-bueno/decorado-3q/23-SUÍTE CASAL (PENTEADEIRA).jpg',
          '/images/ilumi-bueno/decorado-3q/24-BANHEIRO SUÍTE CASAL.jpeg',
        ],
      },
    ],
    tipologias: [
      {
        label: '3 Suítes · 109m²',
        quartos: '3 Suítes',
        area: '109m²',
        vagas: '2 vagas',
        planta: '/images/ilumi-bueno/planta-109m.jpg',
      },
      {
        label: '3 Suítes · 103m²',
        quartos: '3 Suítes',
        area: '103m²',
        vagas: '2 vagas',
        planta: '/images/ilumi-bueno/planta-103m.jpg',
      },
      {
        label: '3 Quartos · 75m²',
        quartos: '3 Quartos',
        area: '75m²',
        vagas: '2 vagas',
        planta: '/images/ilumi-bueno/planta-75m.jpg',
      },
      {
        label: '2 Quartos · 64m²',
        quartos: '2 Quartos (1 suíte)',
        area: '64m²',
        vagas: '1–2 vagas',
        planta: '/images/ilumi-bueno/planta-64m.jpg',
      },
      {
        label: '2 Quartos · 58m²',
        quartos: '2 Quartos',
        area: '58m²',
        vagas: '1 vaga',
        planta: '/images/ilumi-bueno/planta-58m.jpg',
      },
    ],
    resumo: {
      quartos: '2 a 3 quartos',
      area: '58m² a 109m²',
      vagas: '1 a 2 vagas',
    },
    lazer: ['Piscina Rooftop', 'Fitness', 'Espaço Gourmet', 'Kids Space', 'Salão de Festas'],
    diferenciais: ['36 andares', '5 aptos por andar', '145 unidades', 'Entrega prevista 2026'],
    localizacao: {
      lat: -16.714460053633815,
      lng: -49.26570567116407,
    },
    pontosDeInteresse: [
      {
        categoria: 'Hospital',
        locais: [{ nome: 'Hospital Master', lat: -16.7120, lng: -49.2680 }],
      },
      {
        categoria: 'Padaria',
        locais: [{ nome: 'Padaria Modelo', lat: -16.7130, lng: -49.2640 }],
      },
      {
        categoria: 'Mercado',
        locais: [{ nome: 'Supermercado Bretas', lat: -16.7160, lng: -49.2660 }],
      },
      {
        categoria: 'Farmácia',
        locais: [{ nome: 'Drogasil', lat: -16.7150, lng: -49.2630 }],
      },
      {
        categoria: 'Escola',
        locais: [{ nome: 'Colégio WR', lat: -16.7140, lng: -49.2690 }],
      },
    ],
    setorInfo: {
      nome: 'Setor Bueno',
      descricao: 'O Setor Bueno é um dos bairros mais desejados e valorizados de Goiânia. Conhecido por sua infraestrutura completa, oferece excelentes opções de gastronomia, escolas renomadas, parques arborizados como o Vaca Brava, e fácil acesso aos principais pontos da cidade. Viver aqui é sinônimo de conveniência e exclusividade.',
      imagens: [
        '/images/setor-bueno/vaca-brava-1.jpg',
        '/images/setor-bueno/vaca-brava-2.jpg'
      ],
    },
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
    endereco: 'Rua T-37, nº 3449 (Qd. 147, Lotes 16/17), no coração do Setor Bueno em Goiânia, Goiás, bem ao lado da Av. T-63',
    enderecoCurto: 'Rua T-37, 3449 - St. Bueno.',
    descricao: 'Para cada estilo de vida, um apartamento no coração do Bueno.',
    descricaoLonga:
      'O Ritmo Bueno oferece a maior variedade de tipologias entre os empreendimentos da Trípoli, com opções do studio ao 3 quartos. São 32 andares, 8 apartamentos por andar e 3 elevadores, garantindo agilidade e conforto no dia a dia. Localizado lado a lado com o Ilumi Bueno, no coração do Setor Bueno.',
    heroImg: '/images/ritmo-bueno/hero.jpg',
    heroVideo: '/videoOriginal-Ritmo.mp4',
    cadernoDePlantas: '/cadernoDePlantasRitmoBueno.pdf',
    galeria: [
      {
        nome: 'Área comum / Lazer',
        imagens: [
          '/images/ritmo-bueno/area-comum/00 -FACHADA.jpg',
          '/images/ritmo-bueno/area-comum/05 - PISCINA EXTERNA.jpg',
          '/images/ritmo-bueno/area-comum/02 - HALL DE ENTRADA.jpg',
          '/images/ritmo-bueno/area-comum/01 - PORTARIA 1.jpg',
          '/images/ritmo-bueno/area-comum/01 - PORTARIA 2.jpg',
          '/images/ritmo-bueno/area-comum/09 - PLAYGROUND.jpg',
          '/images/ritmo-bueno/area-comum/02 - HALL DE ENTRADA 2.jpg',
          '/images/ritmo-bueno/area-comum/03 - CHURRASQUEIRA SALÃO FESTAS.jpg',
          '/images/ritmo-bueno/area-comum/03 - SALÃO DE FESTAS.jpg',
          '/images/ritmo-bueno/area-comum/03 - VARANDA SALÃO DE FESTAS(1).jpg',
          '/images/ritmo-bueno/area-comum/03 - VARANDA SALÃO DE FESTAS.jpg',
          '/images/ritmo-bueno/area-comum/04 - GOURMET 1.jpg',
          '/images/ritmo-bueno/area-comum/04 - GOURMET 2.jpg',
          '/images/ritmo-bueno/area-comum/04 - GOURMET 3.jpg',
          '/images/ritmo-bueno/area-comum/05 - PISCINA INTERNA.jpg',
          '/images/ritmo-bueno/area-comum/06 -Varanda.jpg',
          '/images/ritmo-bueno/area-comum/07 - PRAÇA DE CONVIVÊNCIA.jpg',
          '/images/ritmo-bueno/area-comum/08 - QUADRA ESPORTIVA.jpg',
          '/images/ritmo-bueno/area-comum/10 - PET PLACE.jpg',
          '/images/ritmo-bueno/area-comum/11 - ESPAÇO YOUTUBER.jpg',
          '/images/ritmo-bueno/area-comum/12 - FITNESS.jpg',
          '/images/ritmo-bueno/area-comum/12 - FITNESS 1.jpg',
          '/images/ritmo-bueno/area-comum/12 - FITNESS 2.jpg',
          '/images/ritmo-bueno/area-comum/13 - SALA DE REUNIÃO.jpg',
        ],
      },
      {
        nome: 'Decorado 1Q - 45m²',
        imagens: [
          '/images/ritmo-bueno/decorado-45m/02 - entrada apto.jpeg',
          '/images/ritmo-bueno/decorado-45m/03 - entrada apto.jpeg',
          '/images/ritmo-bueno/decorado-45m/04 - sala.jpeg',
          '/images/ritmo-bueno/decorado-45m/05 - cozinha.jpeg',
          '/images/ritmo-bueno/decorado-45m/06 - cozinha integrada com sala.jpeg',
          '/images/ritmo-bueno/decorado-45m/07 - sala estar.jpeg',
          '/images/ritmo-bueno/decorado-45m/08 - sala jantar.jpeg',
          '/images/ritmo-bueno/decorado-45m/09 - sala com cozinha integrada.jpeg',
          '/images/ritmo-bueno/decorado-45m/10 - sala estar e jantar.jpeg',
          '/images/ritmo-bueno/decorado-45m/11 - banheiro.jpeg',
          '/images/ritmo-bueno/decorado-45m/12 - banheiro.jpeg',
          '/images/ritmo-bueno/decorado-45m/13 - banheiro com ventilacao natural.jpeg',
          '/images/ritmo-bueno/decorado-45m/14 - quarto (2).jpeg',
          '/images/ritmo-bueno/decorado-45m/15 - quarto.jpeg',
          '/images/ritmo-bueno/decorado-45m/CMO-01-sala e cozinha.jpeg',
          '/images/ritmo-bueno/decorado-45m/CMO-02-quarto.jpeg',
          '/images/ritmo-bueno/decorado-45m/CMO-03-banheiro.jpeg'
        ],
      },
      {
        nome: 'Decorado 3Q - 88m²',
        imagens: [
          '/images/ritmo-bueno/decorado-88m/02 - sala de jantar e estar.jpeg',
          '/images/ritmo-bueno/decorado-88m/03 - sala de jantar.jpeg',
          '/images/ritmo-bueno/decorado-88m/04 - sala de jantar.jpeg',
          '/images/ritmo-bueno/decorado-88m/05 - sala estar e jantar.jpeg',
          '/images/ritmo-bueno/decorado-88m/06 - sala estar.jpeg',
          '/images/ritmo-bueno/decorado-88m/07 - sala estar.jpeg',
          '/images/ritmo-bueno/decorado-88m/08 - varanda.jpeg',
          '/images/ritmo-bueno/decorado-88m/09 - lavabo.jpeg',
          '/images/ritmo-bueno/decorado-88m/10 - cozinha.jpeg',
          '/images/ritmo-bueno/decorado-88m/11 - area de serviço.jpeg',
          '/images/ritmo-bueno/decorado-88m/12 - corredor quartos.jpeg',
          '/images/ritmo-bueno/decorado-88m/13 - suite 01.jpeg',
          '/images/ritmo-bueno/decorado-88m/14 - suite 01.jpeg',
          '/images/ritmo-bueno/decorado-88m/15 - suite 01.jpeg',
          '/images/ritmo-bueno/decorado-88m/16 - banheiro americano.jpeg',
          '/images/ritmo-bueno/decorado-88m/17 - banheiro americano.jpeg',
          '/images/ritmo-bueno/decorado-88m/18 - suite 02.jpeg',
          '/images/ritmo-bueno/decorado-88m/19 - suite 02.jpeg',
          '/images/ritmo-bueno/decorado-88m/20 - suite 02.jpeg',
          '/images/ritmo-bueno/decorado-88m/21 - suite master.jpeg',
          '/images/ritmo-bueno/decorado-88m/22 - suite master.jpeg',
          '/images/ritmo-bueno/decorado-88m/23 - suite master closet.jpeg',
          '/images/ritmo-bueno/decorado-88m/24 - suite master.jpeg',
          '/images/ritmo-bueno/decorado-88m/25 - suite master - vista closet.jpeg',
          '/images/ritmo-bueno/decorado-88m/26 - banheiro suite master.jpeg',
          '/images/ritmo-bueno/decorado-88m/27 - banheiro suite master.jpeg',
          '/images/ritmo-bueno/decorado-88m/CMO-01-Sala Jantar.jpeg',
          '/images/ritmo-bueno/decorado-88m/CMO-02-Sala Estar.jpeg',
          '/images/ritmo-bueno/decorado-88m/CMO-03-Lavabo.jpeg',
          '/images/ritmo-bueno/decorado-88m/CMO-04-Cozinha.jpeg',
          '/images/ritmo-bueno/decorado-88m/CMO-05-Suite 01 (americana).jpeg',
          '/images/ritmo-bueno/decorado-88m/CMO-06-Suite 02 (americana).jpeg',
          '/images/ritmo-bueno/decorado-88m/CMO-07-suíte master.jpeg',
          '/images/ritmo-bueno/decorado-88m/CMO-08-banheiro suíte master.jpeg'
        ],
      },
    ],
    tipologias: [
      {
        label: '3 Quartos · 88m²',
        quartos: '3 Quartos',
        area: '88m²',
        vagas: '2 vagas',
        planta: '/images/ritmo-bueno/planta-88m.png',
      },

      {
        label: '2 Quartos · 67m²',
        quartos: '2 Quartos',
        area: '67m²',
        vagas: '1 vaga',
        planta: '/images/ritmo-bueno/planta-67m.png',
      },
      {
        label: '2 Quartos · 62m²',
        quartos: '2 Quartos',
        area: '62m²',
        vagas: '1 vaga',
        planta: '/images/ritmo-bueno/planta-62m.png',
      },
      {
        label: '1 Quarto · 51m²',
        quartos: '1 Quarto',
        area: '51m²',
        vagas: '1 vaga',
        planta: '/images/ritmo-bueno/planta-51m.png',
      },
      {
        label: '1 Quarto · 45m²',
        quartos: '1 Quarto',
        area: '45m²',
        vagas: '1 vaga',
        planta: '/images/ritmo-bueno/planta-45m.png',
      },
    ],
    resumo: {
      quartos: '1 a 3 quartos',
      area: '45m² a 88m²',
      vagas: '1 a 2 vagas',
    },
    lazer: ['Piscina Rooftop', 'Academia', 'Hall de Entrada Elegante', '3 Elevadores', 'Coworking'],
    diferenciais: ['32 andares', '8 aptos por andar', '200 unidades', 'Entrega prevista 2026'],
    localizacao: {
      lat: -16.71469882728873,
      lng: -49.26568861349224,
    },
    pontosDeInteresse: [
      {
        categoria: 'Hospital',
        locais: [{ nome: 'Hospital Amparo', lat: -16.7126, lng: -49.2686 }],
      },
      {
        categoria: 'Padaria',
        locais: [{ nome: 'Panificadora Mundial', lat: -16.7136, lng: -49.2646 }],
      },
      {
        categoria: 'Mercado',
        locais: [{ nome: 'Pão de Açúcar', lat: -16.7166, lng: -49.2666 }],
      },
      {
        categoria: 'Farmácia',
        locais: [{ nome: 'Drogaria Pacheco', lat: -16.7156, lng: -49.2636 }],
      },
      {
        categoria: 'Escola',
        locais: [{ nome: 'Colégio WR', lat: -16.7146, lng: -49.2696 }],
      },
    ],
    setorInfo: {
      nome: 'Setor Bueno',
      descricao: 'Morar no Setor Bueno é ter a cidade aos seus pés. Com uma vizinhança repleta de facilidades, desde empórios premium a shoppings centers sofisticados, o bairro proporciona uma rotina prática e cheia de estilo. O ritmo de vida aqui é dinâmico, envolto por praças e ruas arborizadas.',
      imagens: [
        '/images/setor-bueno/vaca-brava-1.jpg',
        '/images/setor-bueno/vaca-brava-2.jpg'
      ],
    },
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
    endereco: 'Bosque das Orquídeas - R. X-28, Chácaras 131/132 - Sitios Santa Luzia, Aparecida de Goiânia - GO, 74922-700',
    enderecoCurto: 'R. X-28 - St. Santa Luzia.',
    descricao: 'O privilégio de viver com mais espaço, segurança e natureza.',
    descricaoLonga:
      'O Bosque das Orquídeas é um condomínio fechado de sobrados com 64 unidades distribuídas em meio a área verde preservada. Com portaria 24 horas, piscina, salão de festas e bosque privativo, o empreendimento oferece segurança e qualidade de vida para toda a família. Pronto para morar agora.',
    heroImg: '/images/bosque-das-orquideas/hero.jpg',
    heroVideo: '/Video Project 33.mp4',
    heroVideoDesktop: '/video-bosque.mp4',
    heroVideoClassName: '!object-bottom',
    presentationVideo: '/video-bosque.mp4',
    galeria: [
      {
        nome: 'Área Comum / Lazer',
        imagens: [
          '/images/bosque-das-orquideas/fotos-reais/05 - vista sobrados.JPG',
          '/images/bosque-das-orquideas/fotos-reais/19 - Piscina Mar.26.jpeg',
          '/images/bosque-das-orquideas/fotos-reais/20 - playground.jpeg',
          '/images/bosque-das-orquideas/fotos-reais/01- portaria.jpg',
          '/images/bosque-das-orquideas/fotos-reais/02 - vista dos sobrados (2).JPG',
          '/images/bosque-das-orquideas/fotos-reais/03 - vista lateral esquerda.JPG',
          '/images/bosque-das-orquideas/fotos-reais/03 - vista lateral esquerda (2).JPG',
          '/images/bosque-das-orquideas/fotos-reais/04 - vista bosque.JPG',
          '/images/bosque-das-orquideas/fotos-reais/04 - vista bosque (2).JPG',
          '/images/bosque-das-orquideas/fotos-reais/02 - vista dos sobrados.JPG',
          '/images/bosque-das-orquideas/fotos-reais/08 - sobrados.JPG',
          '/images/bosque-das-orquideas/fotos-reais/09 - Acesso independente ao quintal.jpg',
          '/images/bosque-das-orquideas/fotos-reais/17 - vista geral.JPG',
          '/images/bosque-das-orquideas/fotos-reais/06 - Pergolado Mar.26.jpeg',
          '/images/bosque-das-orquideas/fotos-reais/07 - Churrasqueira.JPG',
          '/images/bosque-das-orquideas/fotos-reais/16 - Piscinas.JPG',
          '/images/bosque-das-orquideas/fotos-reais/18 - Piscina Mar.26.jpeg',
          '/images/bosque-das-orquideas/fotos-reais/21 - playground.jpeg',
          '/images/bosque-das-orquideas/fotos-reais/22 - playground.jpeg',
        ],
      },
      {
        nome: 'Sobrado Decorado',
        imagens: [
          '/images/bosque-das-orquideas/fotos-reais/10 - salas-decorado.JPG',
          '/images/bosque-das-orquideas/fotos-reais/11 - salas-decorado.JPG',
          '/images/bosque-das-orquideas/fotos-reais/12 - cozinha-decorado.JPG',
          '/images/bosque-das-orquideas/fotos-reais/13 - area de serviço-decorado.JPG',
          '/images/bosque-das-orquideas/fotos-reais/14 - varanda gourmet-decorado.jpg',
          '/images/bosque-das-orquideas/fotos-reais/15 - varanda gourmet-decorado.JPG',
        ],
      },
    ],
    tipologias: [
      {
        label: 'Pavimento Térreo',
        quartos: '3 Quartos',
        area: '161m²',
        vagas: '2 vagas',
        planta: '/images/bosque-das-orquideas/planta-pavimento-terreo.jpg',
      },
      {
        label: 'Pavimento Superior',
        quartos: '3 Quartos',
        area: '161m²',
        vagas: '2 vagas',
        planta: '/images/bosque-das-orquideas/planta-pavimento-superior.jpg',
      },
    ],
    resumo: {
      quartos: '3 quartos',
      area: '161m²',
      vagas: '2 vagas',
    },
    lazer: ['Portaria 24h', 'Piscina', 'Salão de Festas', 'Bosque Privativo', 'Área de Lazer'],
    diferenciais: ['64 sobrados', 'Condomínio fechado', 'Pronto para morar', 'Área verde preservada'],
    localizacao: {
      lat: -16.753341911302407,
      lng: -49.22643691779336,
    },
    pontosDeInteresse: [
      {
        categoria: 'Hospital',
        locais: [{ nome: 'Hospital Aparecida', lat: -16.7550, lng: -49.2280 }],
      },
      {
        categoria: 'Mercado',
        locais: [{ nome: 'Atacadão', lat: -16.7520, lng: -49.2250 }],
      },
      {
        categoria: 'Escola',
        locais: [{ nome: 'Escola Municipal', lat: -16.7540, lng: -49.2240 }],
      },
      {
        categoria: 'Padaria',
        locais: [{ nome: 'Padaria Santa Luzia', lat: -16.7530, lng: -49.2270 }],
      },
      {
        categoria: 'Farmácia',
        locais: [{ nome: 'Farmácia Pague Menos', lat: -16.7510, lng: -49.2280 }],
      },
    ],
    setorInfo: {
      nome: 'Sítios Santa Luzia',
      descricao: 'O bairro Sítios Santa Luzia une a tranquilidade de uma região residencial arborizada com o desenvolvimento contínuo de Aparecida de Goiânia. Perfeito para quem busca paz e contato com a natureza sem abrir mão de acessos estratégicos e conveniências próximas para o dia a dia.',
      imagens: [
        '/images/bosque-das-orquideas/setor-1.jpg',
        '/images/bosque-das-orquideas/setor-2.jpg',
      ],
    },
  },
];

export function getEmpreendimentoBySlug(slug: string): Empreendimento | undefined {
  return empreendimentos.find((e) => e.slug === slug);
}
