import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  Download, 
  Calculator, 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Percent, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

interface RowData {
  periodo: number;
  amortizacao: number;
  juros: number;
  prestacao: number;
  saldo: number;
}

interface DadosCalculo {
  valor_imovel: number;
  valor_entrada: number;
  valor_financiar: number;
  prazo: number;
  taxa_anual: number;
  taxa_mensal: number;
  tabela_price: RowData[];
  tabela_sac: RowData[];
  juros_price: number;
  juros_sac: number;
  total_price: number;
  total_sac: number;
  primeira_price: number;
  ultima_price: number;
  primeira_sac: number;
  ultima_sac: number;
}

export default function SimuladorFinanciamento() {
  const [imovel, setImovel] = useState('');
  const [entrada, setEntrada] = useState('');
  const [prazo, setPrazo] = useState('');
  const [taxa, setTaxa] = useState('0,00');

  const [activeTab, setActiveTab] = useState<'comparativo' | 'detalhamento'>('comparativo');
  const [direction, setDirection] = useState<number>(0);
  const [tabelaAtiva, setTabelaAtiva] = useState<'sac' | 'price'>('sac');
  const [dadosCalculo, setDadosCalculo] = useState<DadosCalculo | null>(null);

  const slideToTab = (targetTab: 'comparativo' | 'detalhamento') => {
    if (targetTab === activeTab) return;
    const dir = targetTab === 'detalhamento' ? 1 : -1;
    setDirection(dir);
    setActiveTab(targetTab);
  };

  const formatarMoedaInput = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (!apenasNumeros) return '';
    return new Intl.NumberFormat('pt-BR').format(parseInt(apenasNumeros, 10));
  };

  const formatarPercentualInput = (valor: string) => {
    let numeros = valor.replace(/\D/g, '');
    if (!numeros) return '';
    while (numeros.length < 3) numeros = '0' + numeros;
    const inteiro = numeros.slice(0, -2);
    const decimal = numeros.slice(-2);
    return `${parseInt(inteiro, 10)},${decimal}`;
  };

  const parseMoeda = (valor: string) => parseFloat(valor.replace(/\./g, ''));
  const parsePercentual = (valor: string) => parseFloat(valor.replace(',', '.'));

  const calcularPrice = (valor: number, prazo: number, taxaMensal: number) => {
    if (taxaMensal === 0) {
      const prestacao = valor / prazo;
      const tabela: RowData[] = [];
      let saldo = valor;
      for (let i = 0; i < prazo; i++) {
        saldo -= prestacao;
        tabela.push({ periodo: i + 1, amortizacao: prestacao, juros: 0, prestacao, saldo: Math.max(0, saldo) });
      }
      return { tabela, prestacao, totalJuros: 0 };
    }

    const prestacao = valor * (taxaMensal * Math.pow(1 + taxaMensal, prazo)) / (Math.pow(1 + taxaMensal, prazo) - 1);
    const tabela: RowData[] = [];
    let saldo = valor;
    let totalJuros = 0;

    for (let i = 0; i < prazo; i++) {
      const juros = saldo * taxaMensal;
      const amort = prestacao - juros;
      saldo -= amort;
      totalJuros += juros;
      tabela.push({ periodo: i + 1, amortizacao: amort, juros, prestacao, saldo: Math.max(0, saldo) });
    }

    return { tabela, prestacao, totalJuros };
  };

  const calcularSac = (valor: number, prazo: number, taxaMensal: number) => {
    const amortConstante = valor / prazo;
    const tabela: RowData[] = [];
    let saldo = valor;
    let totalJuros = 0;
    let primeiraPrestacao = 0;
    let ultimaPrestacao = 0;

    for (let i = 0; i < prazo; i++) {
      const juros = saldo * taxaMensal;
      const prestacao = amortConstante + juros;
      if (i === 0) primeiraPrestacao = prestacao;
      if (i === prazo - 1) ultimaPrestacao = prestacao;

      saldo -= amortConstante;
      totalJuros += juros;

      tabela.push({ periodo: i + 1, amortizacao: amortConstante, juros, prestacao, saldo: Math.max(0, saldo) });
    }

    return { tabela, primeiraPrestacao, ultimaPrestacao, totalJuros };
  };

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imovel || !entrada || !prazo || !taxa) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const valorImovel = parseMoeda(imovel);
    const valorEntrada = parseMoeda(entrada);
    const prazoMeses = parseInt(prazo, 10);
    const taxaAnual = parsePercentual(taxa);

    if (valorEntrada >= valorImovel) {
      alert("O valor da entrada deve ser menor que o valor do imóvel!");
      return;
    }

    const valorFinanciar = valorImovel - valorEntrada;
    const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;

    const price = calcularPrice(valorFinanciar, prazoMeses, taxaMensal);
    const sac = calcularSac(valorFinanciar, prazoMeses, taxaMensal);

    const primeiraPrice = price.prestacao;
    const ultimaPrice = price.tabela[price.tabela.length - 1].prestacao;
    const totalPrice = primeiraPrice * prazoMeses;
    const totalSac = sac.tabela.reduce((acc, curr) => acc + curr.prestacao, 0);

    setDadosCalculo({
      valor_imovel: valorImovel,
      valor_entrada: valorEntrada,
      valor_financiar: valorFinanciar,
      prazo: prazoMeses,
      taxa_anual: taxaAnual,
      taxa_mensal: taxaMensal,
      tabela_price: price.tabela,
      tabela_sac: sac.tabela,
      juros_price: price.totalJuros,
      juros_sac: sac.totalJuros,
      total_price: totalPrice,
      total_sac: totalSac,
      primeira_price: primeiraPrice,
      ultima_price: ultimaPrice,
      primeira_sac: sac.primeiraPrestacao,
      ultima_sac: sac.ultimaPrestacao
    });
  };

  const gerarPdf = () => {
    if (!dadosCalculo) {
      alert("Realize o cálculo primeiro!");
      return;
    }

    const d = dadosCalculo;
    const doc = new jsPDF('landscape', 'mm', 'a4');
    
    const colorHeader = [44, 95, 45]; // #2c5f2d
    const colorSubHeader = [74, 124, 78]; // #4a7c4e
    const colorGold = [255, 215, 0]; // #FFD700
    const colorBeige = [245, 245, 220]; // beige / whitesmoke used loosely

    doc.setFontSize(16);
    doc.setTextColor(colorHeader[0], colorHeader[1], colorHeader[2]);
    doc.text("TRÍPOLI CONSTRUTORA", 148, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text("Simulação de Financiamento Imobiliário", 148, 28, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Data: ${new Date().toLocaleString('pt-BR')}`, 15, 38);

    doc.setFontSize(12);
    doc.setTextColor(colorHeader[0], colorHeader[1], colorHeader[2]);
    doc.text("INFORMAÇÕES GERAIS", 15, 48);

    autoTable(doc, {
      startY: 52,
      margin: { left: 15 },
      tableWidth: 150,
      theme: 'grid',
      styles: { fontSize: 10, textColor: [0, 0, 0], fontStyle: 'normal' },
      columnStyles: { 0: { halign: 'left', fontStyle: 'bold' }, 1: { halign: 'right' } },
      body: [
        ['Valor do Imóvel:', `R$ ${d.valor_imovel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Valor da Entrada:', `R$ ${d.valor_entrada.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Valor a Financiar:', `R$ ${d.valor_financiar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Prazo:', `${d.prazo} meses`],
        ['Taxa de Juros:', `${d.taxa_anual.toFixed(2)}% ao ano`]
      ]
    });

    const finalYInfo = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    doc.setTextColor(colorHeader[0], colorHeader[1], colorHeader[2]);
    doc.text("RESUMO COMPARATIVO", 15, finalYInfo);

    autoTable(doc, {
      startY: finalYInfo + 4,
      margin: { left: 15 },
      tableWidth: 200,
      theme: 'grid',
      headStyles: { fillColor: colorHeader, textColor: [255, 255, 255], halign: 'center', fontSize: 11 },
      bodyStyles: { fillColor: colorBeige, textColor: [0, 0, 0], halign: 'center', fontSize: 9 },
      columnStyles: { 0: { fontStyle: 'bold', fillColor: [255, 255, 255], halign: 'left' } },
      head: [['', 'PRICE', 'SAC']],
      body: [
        ['Primeira Prestação', `R$ ${d.primeira_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, `R$ ${d.primeira_sac.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Última Prestação', `R$ ${d.ultima_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, `R$ ${d.ultima_sac.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Total de Juros', `R$ ${d.juros_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, `R$ ${d.juros_sac.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Total Pago', `R$ ${d.total_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, `R$ ${d.total_sac.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`]
      ]
    });

    const finalYComp = (doc as any).lastAutoTable.finalY + 10;

    const economia = d.total_price - d.total_sac;
    const perc = (economia / d.total_price) * 100;

    doc.setFontSize(12);
    doc.setTextColor(colorHeader[0], colorHeader[1], colorHeader[2]);
    doc.text("ANÁLISE", 15, finalYComp);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Economia com SAC: R$ ${economia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${perc.toFixed(2)}% menor que PRICE)`, 15, finalYComp + 6);

    // Nova página para Detalhamento Completo
    doc.addPage();
    doc.setFontSize(12);
    doc.setTextColor(colorHeader[0], colorHeader[1], colorHeader[2]);
    doc.text("DETALHAMENTO COMPLETO - TABELAS PRICE E SAC", 15, 20);

    const formatCurrency = (val: number) => `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const headerRow1 = [
      { content: 'TABELA PRICE', colSpan: 5, styles: { halign: 'center', fillColor: colorHeader, textColor: [255, 255, 255] } },
      { content: '', styles: { fillColor: [255, 255, 255] } },
      { content: 'TABELA SAC', colSpan: 5, styles: { halign: 'center', fillColor: colorHeader, textColor: [255, 255, 255] } }
    ];

    const headerRow2 = [
      'Período', 'Amortização', 'Juros', 'Prestação', 'Saldo',
      '',
      'Período', 'Amortização', 'Juros', 'Prestação', 'Saldo'
    ];

    const bodyData = [];

    // Linha de Soma
    bodyData.push([
      { content: 'SOMA', styles: { fillColor: colorGold, fontStyle: 'bold' } },
      { content: formatCurrency(d.valor_financiar), styles: { fillColor: colorGold, fontStyle: 'bold' } },
      { content: formatCurrency(d.juros_price), styles: { fillColor: colorGold, fontStyle: 'bold' } },
      { content: formatCurrency(d.total_price), styles: { fillColor: colorGold, fontStyle: 'bold' } },
      { content: '', styles: { fillColor: colorGold } },
      { content: '', styles: { fillColor: [255, 255, 255] } },
      { content: 'SOMA', styles: { fillColor: colorGold, fontStyle: 'bold' } },
      { content: formatCurrency(d.valor_financiar), styles: { fillColor: colorGold, fontStyle: 'bold' } },
      { content: formatCurrency(d.juros_sac), styles: { fillColor: colorGold, fontStyle: 'bold' } },
      { content: formatCurrency(d.total_sac), styles: { fillColor: colorGold, fontStyle: 'bold' } },
      { content: '', styles: { fillColor: colorGold } },
    ]);

    // Linha Inicial (0)
    bodyData.push([
      '0', '', '', '', formatCurrency(d.valor_financiar),
      '',
      '0', '', '', '', formatCurrency(d.valor_financiar)
    ]);

    for (let i = 0; i < Math.max(d.tabela_price.length, d.tabela_sac.length); i++) {
      const p = d.tabela_price[i];
      const s = d.tabela_sac[i];

      bodyData.push([
        p ? p.periodo.toString() : '',
        p ? formatCurrency(p.amortizacao) : '',
        p ? formatCurrency(p.juros) : '',
        p ? formatCurrency(p.prestacao) : '',
        p ? formatCurrency(p.saldo) : '',
        '',
        s ? s.periodo.toString() : '',
        s ? formatCurrency(s.amortizacao) : '',
        s ? formatCurrency(s.juros) : '',
        s ? formatCurrency(s.prestacao) : '',
        s ? formatCurrency(s.saldo) : ''
      ]);
    }

    autoTable(doc, {
      startY: 25,
      margin: { left: 15 },
      theme: 'grid',
      head: [headerRow1 as any, headerRow2],
      body: bodyData,
      headStyles: { fillColor: colorSubHeader, textColor: [255, 255, 255], fontSize: 7, halign: 'center' },
      bodyStyles: { fontSize: 6, halign: 'center', cellPadding: 1, fillColor: colorBeige },
      columnStyles: { 5: { fillColor: [255, 255, 255], cellWidth: 10 } },
      styles: { lineWidth: 0.1, lineColor: [0, 0, 0] }
    });

    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
    doc.save(`Simulacao_Financiamento_${timestamp}.pdf`);
  };

  const formatCurrencyLocal = (val: number) => `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const field = 'w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20 focus:border-[#1b4332]/40 transition-all';
  const labelCls = 'text-[12px] font-semibold tracking-[0.1em] uppercase text-zinc-500';

  return (
    <div className="bg-[#f8fafc] min-h-screen text-zinc-900 font-sans">
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
            Ferramenta · Trípoli Construtora
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1] tracking-tight mb-6">
            Simular <span className="text-[#4ade80]">Financiamento</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
            Faça uma simulação comparativa entre os sistemas PRICE e SAC para encontrar a melhor condição para o seu imóvel.
          </p>
        </motion.div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 py-20">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Formulário */}
          <div className="flex-1">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleCalcular} 
              className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-sm border border-zinc-200"
            >
              <div>
                <h2 className="font-serif text-2xl font-light text-zinc-900 mb-1">Dados do Imóvel</h2>
                <p className="text-zinc-500 text-[13px]">Preencha os campos abaixo para realizar o cálculo comparativo.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Valor do Imóvel (R$) *</label>
                  <input 
                    type="text" 
                    value={imovel} 
                    onChange={(e) => setImovel(formatarMoedaInput(e.target.value))}
                    className={field}
                    placeholder="Ex: 500.000"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Valor da Entrada (R$) *</label>
                  <input 
                    type="text" 
                    value={entrada} 
                    onChange={(e) => setEntrada(formatarMoedaInput(e.target.value))}
                    className={field}
                    placeholder="Ex: 100.000"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Prazo do Financiamento *</label>
                  <input 
                    type="number" 
                    value={prazo} 
                    onChange={(e) => setPrazo(e.target.value.replace(/\D/g, ''))}
                    className={field}
                    placeholder="Em meses (ex: 360)"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Taxa de Juros ao Ano (%) *</label>
                  <input 
                    type="text" 
                    value={taxa} 
                    onChange={(e) => setTaxa(formatarPercentualInput(e.target.value))}
                    className={field}
                    placeholder="Ex: 10,00"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 mt-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-medium text-[14px] tracking-wide transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Realizar Cálculo
              </button>
            </motion.form>
          </div>

          {/* PDF Button */}
          <div className="lg:w-[320px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 h-full flex flex-col justify-center items-center text-center gap-4"
            >
              <div className={`p-4 rounded-full ${dadosCalculo ? 'bg-[#1b4332]/10 text-[#1b4332]' : 'bg-zinc-100 text-zinc-400'}`}>
                <Download className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-zinc-900 mb-2">Relatório em PDF</h3>
                <p className="text-[13px] text-zinc-500 mb-6">Gere um documento completo com as tabelas PRICE e SAC detalhadas mês a mês.</p>
              </div>
              <button 
                onClick={gerarPdf}
                disabled={!dadosCalculo}
                className={`w-full py-4 rounded-xl font-medium text-[14px] tracking-wide transition-all duration-200 shadow-sm ${
                  dadosCalculo 
                    ? 'bg-[#1b4332] hover:bg-[#2d6a4f] text-white shadow-md shadow-[#1b4332]/15' 
                    : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                }`}
              >
                Baixar PDF
              </button>
            </motion.div>
          </div>
        </div>

        {/* Notebook (Carrossel) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px", amount: 0.1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden min-h-[400px] flex flex-col"
        >
          {/* Cabeçalho do Carrossel Premium */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50/60 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1b4332]/10 text-[#1b4332] font-semibold text-[13px]">
                {activeTab === 'comparativo' ? '01' : '02'}
              </span>
              <div>
                <h3 className="font-serif text-base font-medium text-zinc-900 leading-tight">
                  {activeTab === 'comparativo' ? 'Resumo Comparativo' : 'Detalhamento Mensal'}
                </h3>
                <p className="text-zinc-500 text-[11px]">
                  {activeTab === 'comparativo' ? 'Visão consolidada e economia PRICE vs SAC' : 'Tabelas completas de amortização mês a mês'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Indicadores de bolinha */}
              <div className="flex gap-1.5 mr-3">
                <button
                  onClick={() => dadosCalculo && slideToTab('comparativo')}
                  disabled={!dadosCalculo}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    !dadosCalculo 
                      ? 'bg-zinc-200 cursor-not-allowed' 
                      : activeTab === 'comparativo' 
                        ? 'w-6 bg-[#1b4332]' 
                        : 'bg-zinc-300 hover:bg-zinc-400'
                  }`}
                  aria-label="Ir para Resumo Comparativo"
                />
                <button
                  onClick={() => dadosCalculo && slideToTab('detalhamento')}
                  disabled={!dadosCalculo}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    !dadosCalculo 
                      ? 'bg-zinc-200 cursor-not-allowed' 
                      : activeTab === 'detalhamento' 
                        ? 'w-6 bg-[#1b4332]' 
                        : 'bg-zinc-300 hover:bg-zinc-400'
                  }`}
                  aria-label="Ir para Detalhamento Mensal"
                />
              </div>

              {/* Botões de navegação */}
              <button
                onClick={() => slideToTab('comparativo')}
                disabled={!dadosCalculo || activeTab === 'comparativo'}
                className={`p-2 rounded-lg border transition-all duration-200 ${
                  !dadosCalculo || activeTab === 'comparativo' 
                    ? 'border-zinc-100 text-zinc-300 cursor-not-allowed bg-zinc-50/20' 
                    : 'border-zinc-200 text-zinc-600 hover:bg-white hover:shadow-sm hover:text-zinc-900 bg-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => slideToTab('detalhamento')}
                disabled={!dadosCalculo || activeTab === 'detalhamento'}
                className={`p-2 rounded-lg border transition-all duration-200 ${
                  !dadosCalculo || activeTab === 'detalhamento' 
                    ? 'border-zinc-100 text-zinc-300 cursor-not-allowed bg-zinc-50/20' 
                    : 'border-zinc-200 text-zinc-600 hover:bg-white hover:shadow-sm hover:text-zinc-900 bg-white'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 flex-1">
            {!dadosCalculo ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-zinc-400 text-center gap-3">
                <Calculator className="w-12 h-12 text-zinc-300 stroke-[1.5]" />
                <p className="text-[14px]">Preencha os dados no formulário acima e clique em "Realizar Cálculo".</p>
              </div>
            ) : (
              <AnimatePresence mode="wait" custom={direction}>
                {activeTab === 'comparativo' ? (
                  <motion.div 
                    key="comparativo"
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        x: dir > 0 ? 100 : dir < 0 ? -100 : 0,
                        opacity: 0
                      }),
                      center: {
                        x: 0,
                        opacity: 1
                      },
                      exit: (dir: number) => ({
                        x: dir > 0 ? -100 : dir < 0 ? 100 : 0,
                        opacity: 0
                      })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="flex flex-col gap-8"
                  >
                    {/* 1. Visão Geral do Financiamento */}
                    <div>
                      <h3 className="text-zinc-400 font-semibold tracking-wider text-[11px] uppercase mb-4">Visão Geral do Crédito</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col gap-1">
                          <span className="text-zinc-400 text-[11px] font-semibold uppercase">Valor Financiado</span>
                          <span className="text-zinc-800 text-[16px] font-semibold font-mono">{formatCurrencyLocal(dadosCalculo.valor_financiar)}</span>
                        </div>
                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col gap-1">
                          <span className="text-zinc-400 text-[11px] font-semibold uppercase">Prazo</span>
                          <span className="text-zinc-800 text-[16px] font-semibold font-mono">{dadosCalculo.prazo} meses <span className="text-zinc-500 text-[12px] font-sans">({Math.floor(dadosCalculo.prazo / 12)}a e {dadosCalculo.prazo % 12}m)</span></span>
                        </div>
                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col gap-1">
                          <span className="text-zinc-400 text-[11px] font-semibold uppercase">Juros ao Ano</span>
                          <span className="text-zinc-800 text-[16px] font-semibold font-mono">{dadosCalculo.taxa_anual.toFixed(2)}% <span className="text-zinc-500 text-[12px] font-sans">a.a.</span></span>
                        </div>
                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col gap-1">
                          <span className="text-zinc-400 text-[11px] font-semibold uppercase">Juros ao Mês</span>
                          <span className="text-zinc-800 text-[16px] font-semibold font-mono">{(dadosCalculo.taxa_mensal * 100).toFixed(4)}% <span className="text-zinc-500 text-[12px] font-sans">a.m.</span></span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Comparação Direta de Sistemas */}
                    <div>
                      <h3 className="text-zinc-400 font-semibold tracking-wider text-[11px] uppercase mb-4">Sistemas de Financiamento</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* PRICE Card */}
                        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm hover:border-zinc-300 transition-colors relative flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-serif text-lg text-zinc-900 font-medium">Tabela PRICE</h4>
                                <p className="text-zinc-500 text-[12px]">Sistema Francês (Parcelas Fixas)</p>
                              </div>
                              <span className="bg-zinc-100 text-zinc-600 border border-zinc-200 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                                Prestações Fixas
                              </span>
                            </div>
                            
                            <div className="flex flex-col gap-3 py-4 border-y border-zinc-100 font-mono text-[13px] text-zinc-600">
                              <div className="flex justify-between">
                                <span>Primeira Prestação:</span>
                                <span className="font-semibold text-zinc-950">{formatCurrencyLocal(dadosCalculo.primeira_price)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Última Prestação:</span>
                                <span className="font-semibold text-zinc-950">{formatCurrencyLocal(dadosCalculo.ultima_price)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total Pago em Juros:</span>
                                <span className="font-semibold text-red-700/80">{formatCurrencyLocal(dadosCalculo.juros_price)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 flex flex-col gap-1">
                            <span className="text-zinc-400 text-[10px] font-semibold uppercase">Total Geral Pago</span>
                            <span className="text-zinc-900 text-[22px] font-bold font-mono tracking-tight">{formatCurrencyLocal(dadosCalculo.total_price)}</span>
                          </div>
                        </div>

                        {/* SAC Card */}
                        <div className="bg-white border border-[#1b4332]/30 rounded-xl p-6 shadow-sm hover:border-[#1b4332]/50 transition-colors relative flex flex-col justify-between">
                          <div className="absolute -top-3 right-6 bg-[#4ade80] text-[#0e1a14] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                            Maior Economia
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-serif text-lg text-zinc-900 font-medium">Tabela SAC</h4>
                                <p className="text-zinc-500 text-[12px]">Sistema de Amortização Constante</p>
                              </div>
                              <span className="bg-[#1b4332]/10 text-[#1b4332] border border-[#1b4332]/20 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Recomendado
                              </span>
                            </div>

                            <div className="flex flex-col gap-3 py-4 border-y border-zinc-100 font-mono text-[13px] text-zinc-600">
                              <div className="flex justify-between">
                                <span>Primeira Prestação:</span>
                                <span className="font-semibold text-zinc-950">{formatCurrencyLocal(dadosCalculo.primeira_sac)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Última Prestação:</span>
                                <span className="font-semibold text-zinc-950">{formatCurrencyLocal(dadosCalculo.ultima_sac)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total Pago em Juros:</span>
                                <span className="font-semibold text-[#1b4332]">{formatCurrencyLocal(dadosCalculo.juros_sac)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 flex flex-col gap-1">
                            <span className="text-zinc-400 text-[10px] font-semibold uppercase">Total Geral Pago</span>
                            <span className="text-[#1b4332] text-[22px] font-bold font-mono tracking-tight">{formatCurrencyLocal(dadosCalculo.total_sac)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. Painel de Vantagem / Economia Real */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0e1a14] to-[#1b4332] p-8 text-white shadow-lg">
                      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#4ade80]/10 rounded-full blur-[80px] pointer-events-none" />
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div className="flex gap-4 items-start md:items-center max-w-lg">
                          <div className="p-3 bg-[#4ade80]/15 text-[#4ade80] rounded-xl border border-[#4ade80]/20 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <div>
                            <h4 className="font-serif text-xl font-light text-white mb-2">Simulação Concluída com Sucesso</h4>
                            <p className="text-zinc-300 text-[13px] leading-relaxed">
                              O Sistema SAC é a opção financeiramente mais inteligente, amortizando o saldo devedor de forma linear e diminuindo a incidência de juros.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1.5 min-w-[200px] border-t border-white/10 md:border-t-0 md:border-l md:border-white/10 pt-4 md:pt-0 md:pl-8">
                          <span className="text-[#4ade80] text-[10px] font-bold uppercase tracking-wider">Economia Real (SAC)</span>
                          <span className="text-white text-[28px] font-bold font-mono leading-none tracking-tight">
                            {formatCurrencyLocal(dadosCalculo.total_price - dadosCalculo.total_sac)}
                          </span>
                          <span className="text-zinc-300 text-[12px]">
                            Redução de {(((dadosCalculo.total_price - dadosCalculo.total_sac) / dadosCalculo.total_price) * 100).toFixed(2)}% nos encargos.
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="detalhamento"
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        x: dir > 0 ? 100 : dir < 0 ? -100 : 0,
                        opacity: 0
                      }),
                      center: {
                        x: 0,
                        opacity: 1
                      },
                      exit: (dir: number) => ({
                        x: dir > 0 ? -100 : dir < 0 ? 100 : 0,
                        opacity: 0
                      })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="flex flex-col gap-6"
                  >
                    {/* Carrossel Interno Switch */}
                    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                      <div className="flex p-1 bg-zinc-200/60 rounded-lg self-start">
                        <button
                          onClick={() => setTabelaAtiva('sac')}
                          className={`px-5 py-2 rounded-md text-[13px] font-semibold transition-all duration-200 flex items-center gap-2 ${
                            tabelaAtiva === 'sac'
                              ? 'bg-white text-[#1b4332] shadow-sm font-bold'
                              : 'text-zinc-600 hover:text-zinc-900'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Tabela SAC
                        </button>
                        <button
                          onClick={() => setTabelaAtiva('price')}
                          className={`px-5 py-2 rounded-md text-[13px] font-semibold transition-all duration-200 flex items-center gap-2 ${
                            tabelaAtiva === 'price'
                              ? 'bg-white text-[#1b4332] shadow-sm font-bold'
                              : 'text-zinc-600 hover:text-zinc-900'
                          }`}
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                          Tabela PRICE
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-zinc-500 text-[12px] pr-2">
                        <Info className="w-4 h-4 text-[#1b4332] shrink-0" />
                        <span>Deslize ou clique para comparar a amortização de cada modalidade.</span>
                      </div>
                    </div>

                    {/* Conteúdo em Carrossel com AnimatePresence */}
                    <div className="relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={tabelaAtiva}
                          initial={{ opacity: 0, x: tabelaAtiva === 'sac' ? -40 : 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: tabelaAtiva === 'sac' ? 40 : -40 }}
                          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                          className="w-full"
                        >
                          <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm bg-white">
                            <div className="max-h-[500px] overflow-y-auto">
                              <table className="w-full border-collapse text-left text-[13px]">
                                <thead className="sticky top-0 bg-[#0e1a14] text-white text-[11px] uppercase font-semibold tracking-wider z-10">
                                  <tr>
                                    <th className="py-4 px-6 text-center border-b border-zinc-800 w-16">Período</th>
                                    <th className="py-4 px-6 text-right border-b border-zinc-800">Amortização</th>
                                    <th className="py-4 px-6 text-right border-b border-zinc-800">Juros</th>
                                    <th className="py-4 px-6 text-right border-b border-zinc-800">Prestação</th>
                                    <th className="py-4 px-6 text-right border-b border-zinc-800">Saldo Devedor</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-200">
                                  {/* SOMA Row */}
                                  <tr className="bg-[#4ade80]/10 font-semibold text-zinc-900 border-b border-zinc-300">
                                    <td className="py-3 px-6 text-center text-[#1b4332]">SOMA</td>
                                    <td className="py-3 px-6 text-right text-[#1b4332] font-mono">{formatCurrencyLocal(dadosCalculo.valor_financiar)}</td>
                                    <td className="py-3 px-6 text-right text-[#1b4332] font-mono">
                                      {formatCurrencyLocal(tabelaAtiva === 'sac' ? dadosCalculo.juros_sac : dadosCalculo.juros_price)}
                                    </td>
                                    <td className="py-3 px-6 text-right text-[#1b4332] font-mono">
                                      {formatCurrencyLocal(tabelaAtiva === 'sac' ? dadosCalculo.total_sac : dadosCalculo.total_price)}
                                    </td>
                                    <td className="py-3 px-6 text-right text-[#1b4332]">-</td>
                                  </tr>
                                  
                                  {/* Mês 0 Row */}
                                  <tr className="bg-zinc-50/50">
                                    <td className="py-3 px-6 text-center text-zinc-400 font-medium">0</td>
                                    <td className="py-3 px-6 text-right text-zinc-400">-</td>
                                    <td className="py-3 px-6 text-right text-zinc-400">-</td>
                                    <td className="py-3 px-6 text-right text-zinc-400">-</td>
                                    <td className="py-3 px-6 text-right font-medium text-zinc-800 font-mono">{formatCurrencyLocal(dadosCalculo.valor_financiar)}</td>
                                  </tr>

                                  {/* Regular Rows */}
                                  {(tabelaAtiva === 'sac' ? dadosCalculo.tabela_sac : dadosCalculo.tabela_price).map((row) => (
                                    <tr key={row.periodo} className="odd:bg-white even:bg-zinc-50/30 hover:bg-[#1b4332]/5 transition-colors">
                                      <td className="py-3 px-6 text-center font-medium text-zinc-500">{row.periodo}</td>
                                      <td className="py-3 px-6 text-right text-zinc-600 font-mono">{formatCurrencyLocal(row.amortizacao)}</td>
                                      <td className="py-3 px-6 text-right text-zinc-600 font-mono">{formatCurrencyLocal(row.juros)}</td>
                                      <td className="py-3 px-6 text-right font-semibold text-zinc-850 font-mono">{formatCurrencyLocal(row.prestacao)}</td>
                                      <td className="py-3 px-6 text-right font-medium text-zinc-700 font-mono">{formatCurrencyLocal(row.saldo)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
