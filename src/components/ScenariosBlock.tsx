import React, { useState } from "react";

const scenarios = [
  {
    tab: "Executivo com prazo definido",
    initials: "RM",
    name: "Ricardo M.",
    role: "Diretor Executivo",
    details: "52 anos · Barra da Tijuca · Orçamento R$3,2M · Apartamento 4 quartos, frente mar",
    situacao: "Ricardo tinha 90 dias para fechar antes de uma viagem internacional. Visitou quatro imóveis indicados por corretores diferentes — todos acima de R$3M — e não conseguia compará-los com critério técnico. O preço por m² variava 40% entre as opções sem nenhuma explicação fundamentada.",
    quote: "Estava prestes a fazer proposta no imóvel que 'parecia melhor' — sem qualquer análise independente de valor ou condições técnicas.",
    steps: [
      "Transações reais nos últimos 18 meses no mesmo condomínio: preço médio real estava 22% abaixo do anunciado.",
      "Vistoria técnica identificou infiltração na laje da varanda — não visível em visita comum — e histórico de reparo não declarado pelo vendedor.",
      "Negociação com dois rounds de contraproposta usando o laudo de valor e o laudo técnico como alavanca. Sem feeling. Com dados."
    ],
    results: [
      { value: "R$340k", label: "Redução no valor final negociado" },
      { value: "R$180k", label: "Risco evitado com vistoria técnica" },
      { value: "6", label: "Imóveis avaliados — não 30 ou 40" }
    ]
  },
  {
    tab: "Profissional que quase comprou errado",
    initials: "CS",
    name: "Claudia S.",
    role: "Sócia de escritório jurídico",
    details: "45 anos · Leblon → Barra da Tijuca · Orçamento R$2,1M · Cobertura duplex, 3 quartos",
    situacao: "Carla conhece contratos — mas não o mercado da Barra. Recebeu indicação de uma cobertura por um corretor que também representava o vendedor. O imóvel parecia perfeito. Ela não tinha como saber se R$2,1M era o preço justo, nem se havia passivos ocultos no condomínio.",
    quote: "Quem representa o vendedor tem incentivo de fechar, não de proteger o comprador. Não é má-fé — é o modelo.",
    steps: [
      "Parecer com dados oficiais: preço pedido estava 18% acima da mediana de transações equivalentes nos últimos 12 meses no mesmo condomínio.",
      "Leitura da ata de assembleia revelou ação judicial em andamento por infiltrações estruturais — disponível publicamente, mas não óbvia para quem não sabe onde procurar.",
      "Claudia não comprou. Dois meses depois, com o mesmo processo, encontrou cobertura equivalente 12% abaixo do orçamento original."
    ],
    results: [
      { value: "R$250k", label: "Economia no imóvel correto" },
      { value: "Zero", label: "Risco jurídico assumido" },
      { value: "1", label: "Visita até o imóvel certo" }
    ]
  },
  {
    tab: "Empresário, ticket maior",
    initials: "FP",
    name: "Fernando P.",
    role: "Empresário",
    details: "58 anos · Recreio · Orçamento R$4,8M · Casa em condomínio fechado",
    situacao: "Fernando já comprou imóveis antes — sempre com corretores. Desta vez o ticket era maior e ele queria certeza do valor. O corretor vendedor argumentava que 'não existe parâmetro de preço em condomínio fechado'. É um argumento frequente. E conveniente.",
    quote: "Quanto maior o ticket, maior o risco de uma decisão baseada em percepção em vez de dados. E maior o custo de um erro.",
    steps: [
      "Levantamento de transações em condomínios equivalentes por m² e padrão construtivo. O parâmetro que 'não existia' existia — registrado em cartório.",
      "Análise de liquidez: tempo médio de revenda acima de 18 meses. Relevante para a tese de investimento que Fernando tinha em mente.",
      "Negociação em três rodadas com contraproposta documentada. O argumento do 'sem parâmetro' substituído por dados registrados."
    ],
    results: [
      { value: "R$420k", label: "Redução no preço final" },
      { value: "Revelado", label: "Risco de liquidez antes da assinatura" },
      { value: "Dados", label: "Onde antes havia 'feeling'" }
    ]
  }
];

interface ScenariosBlockProps {
  trackCalendlyClick: (source: string) => void;
}

const ScenariosBlock: React.FC<ScenariosBlockProps> = () => {
  const [activeTab, setActiveTab] = useState(0);
  const s = scenarios[activeTab];

  return (
    <>
      {/* Tab navigation */}
      <div className="flex flex-col sm:flex-row gap-2 mb-8">
        {scenarios.map((sc, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 rounded-md text-[11px] md:text-[12px] uppercase tracking-[0.15em] font-medium transition-all duration-300 font-['DM_Sans',sans-serif] ${
              activeTab === i
                ? "bg-luxury-gold text-luxury-navy"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
            }`}
          >
            {sc.tab}
          </button>
        ))}
      </div>

      {/* Scenario card */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl overflow-hidden">
        {/* Profile strip */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 md:p-8 border-b border-white/10">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-full bg-luxury-gold/20 text-luxury-gold flex items-center justify-center font-['Cormorant_Garamond',serif] text-lg font-medium flex-shrink-0">
              {s.initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-['DM_Sans',sans-serif] text-[15px] font-medium text-white">{s.name}</span>
                <span className="font-['DM_Sans',sans-serif] text-[12px] text-white/40">— {s.role}</span>
              </div>
              <p className="font-['DM_Sans',sans-serif] text-[11px] text-white/30 mt-1">{s.details}</p>
            </div>
          </div>
          <span className="inline-flex items-center self-start sm:self-center px-3 py-1 rounded-full bg-white/5 border border-white/10 font-['DM_Sans',sans-serif] text-[10px] uppercase tracking-[0.15em] text-white/30 flex-shrink-0">
            Cenário ilustrativo
          </span>
        </div>

        {/* 2 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — A situação */}
          <div className="p-5 md:p-8 md:border-r border-white/10">
            <h4 className="font-['DM_Sans',sans-serif] text-[11px] uppercase tracking-[0.2em] text-luxury-gold mb-4">A situação</h4>
            <p className="font-['DM_Sans',sans-serif] text-[13px] font-light leading-[1.8] text-white/60 mb-6">
              {s.situacao}
            </p>
            <blockquote className="border-l-2 border-luxury-gold/40 pl-4 py-1">
              <p className="font-['Cormorant_Garamond',serif] text-[16px] md:text-[18px] italic text-white/80 leading-relaxed">
                "{s.quote}"
              </p>
            </blockquote>
          </div>

          {/* Right — O que identificamos */}
          <div className="p-5 md:p-8 border-t md:border-t-0 border-white/10">
            <h4 className="font-['DM_Sans',sans-serif] text-[11px] uppercase tracking-[0.2em] text-luxury-gold mb-4">O que identificamos</h4>
            <div className="space-y-5">
              {s.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-luxury-gold/10 text-luxury-gold font-['DM_Sans',sans-serif] text-[11px] font-medium flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="font-['DM_Sans',sans-serif] text-[13px] font-light leading-[1.8] text-white/60">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results bar */}
        <div className="border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {s.results.map((r, i) => (
            <div key={i} className="p-5 md:p-6 text-center">
              <p className="font-['Cormorant_Garamond',serif] text-[24px] md:text-[28px] font-light text-luxury-gold mb-1">{r.value}</p>
              <p className="font-['DM_Sans',sans-serif] text-[11px] text-white/40 leading-relaxed">{r.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="font-['DM_Sans',sans-serif] text-[11px] text-white/25 text-center mt-8 max-w-3xl mx-auto leading-relaxed">
        Cenários ilustrativos baseados na dinâmica real do mercado imobiliário de alto padrão da Barra da Tijuca e Recreio. Valores e situações representam o tipo de análise conduzida — não casos individuais identificáveis.
      </p>
    </>
  );
};

export default ScenariosBlock;
