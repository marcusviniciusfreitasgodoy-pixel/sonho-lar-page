import { useEffect, useRef, useState, useCallback } from 'react';
import '@/styles/landing-v4.css';
import heroImage from '@/assets/barra-hero-new.jpg';
import marcusProfile from '@/assets/marcus-profile.jpg';
import godoyLogo from '@/assets/godoy-logo.png';
import { supabase } from '@/integrations/supabase/client';

const MARCUS_EMAIL = 'marcus@godoyprime.com.br';
const MARCUS_WA = '5521964075124';

async function sendEmail(to: string, _toName: string, subject: string, htmlBody: string) {
  try {
    const { error } = await supabase.functions.invoke('send-email', {
      body: { to, subject, html: htmlBody }
    });
    if (error) console.warn('Email send failed:', error);
  } catch (e) { console.warn('Email send failed:', e); }
}

function emailParaMarcus(dados: any) {
  return `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
    <div style="background:#080808;padding:24px 32px;border-bottom:2px solid #C9A96E">
      <h2 style="color:#C9A96E;font-weight:400;margin:0;font-size:20px">Novo lead — Godoy Prime Realty</h2>
    </div>
    <div style="padding:28px 32px;background:#fafafa;border:1px solid #eee">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666;font-size:13px;width:140px">Serviço</td><td style="padding:8px 0;font-size:13px;font-weight:bold;color:#C9A96E">${dados.servico || 'Diagnóstico Estratégico'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Nome</td><td style="padding:8px 0;font-size:13px">${dados.nome}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">WhatsApp</td><td style="padding:8px 0;font-size:13px">${dados.whatsapp || '-'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">E-mail</td><td style="padding:8px 0;font-size:13px">${dados.email || '-'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Orçamento</td><td style="padding:8px 0;font-size:13px">${dados.orcamento || '-'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Tipo</td><td style="padding:8px 0;font-size:13px">${dados.tipo || '-'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Momento</td><td style="padding:8px 0;font-size:13px">${dados.momento || '-'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Data</td><td style="padding:8px 0;font-size:13px">${dados.data}</td></tr>
      </table>
    </div>
  </div>`;
}

function emailParaCliente(dados: any) {
  const servico = dados.servico || 'Diagnóstico Estratégico Gratuito';
  const proximosPassos: Record<string, string> = {
    'Parecer Godoy Prime': 'Em até 24 horas Marcus entrará em contato para entender o imóvel que você identificou e apresentar a proposta completa do Parecer Godoy Prime.',
    'Compra Blindada': 'Em até 24 horas Marcus entrará em contato para entender o imóvel em vista e como a Compra Blindada pode proteger sua negociação.',
    'Prime Buyer Experience': 'Em até 24 horas Marcus entrará em contato para agendar a conversa inicial sobre seu perfil de busca e apresentar como o Prime Buyer Experience funciona.',
    'Diagnóstico Estratégico': 'Em até 24 horas Marcus entrará em contato para agendar seu Diagnóstico Estratégico Gratuito — 30 minutos que podem mudar como você compra seu próximo imóvel.'
  };
  const msgProximos = proximosPassos[servico] || proximosPassos['Diagnóstico Estratégico'];
  return `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
    <div style="background:#080808;padding:24px 32px;border-bottom:2px solid #C9A96E">
      <h2 style="color:#C9A96E;font-weight:400;margin:0;font-size:20px">Godoy Prime Realty</h2>
    </div>
    <div style="padding:32px;background:#fafafa;border:1px solid #eee">
      <p style="font-size:16px;color:#1a1a1a;margin-bottom:16px">Olá, <strong>${dados.nome}</strong>.</p>
      <p style="font-size:14px;color:#444;line-height:1.8;margin-bottom:20px">Sua solicitação referente ao <strong style="color:#b8883a">${servico}</strong> foi recebida.</p>
      <div style="background:#fff;border:1px solid #e0d8cc;border-left:3px solid #C9A96E;padding:20px 24px;margin-bottom:24px">
        <p style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Próximo passo</p>
        <p style="font-size:14px;color:#333;line-height:1.75;margin:0">${msgProximos}</p>
      </div>
      <p style="font-size:13px;color:#666;line-height:1.7">Se preferir contato imediato:</p>
      <a href="https://wa.me/${MARCUS_WA}" style="display:inline-block;margin-top:12px;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;font-size:13px;border-radius:2px">WhatsApp (21) 96407-5124</a>
    </div>
  </div>`;
}

const LandingPageV4 = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Nav scroll
  useEffect(() => {
    const handler = () => setNavSolid(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Smooth scroll for anchor links
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const dados = {
      nome: (form.querySelector('#nome') as HTMLInputElement).value,
      whatsapp: (form.querySelector('#whatsapp') as HTMLInputElement).value,
      email: (form.querySelector('#email') as HTMLInputElement).value,
      orcamento: (form.querySelector('#orcamento') as HTMLSelectElement).value,
      tipo: (form.querySelector('#tipo') as HTMLSelectElement).value,
      momento: (form.querySelector('#momento') as HTMLSelectElement).value,
      servico: 'Diagnóstico Estratégico',
      origem: 'formulario_principal',
      data: new Date().toLocaleString('pt-BR')
    };

    // Facebook Pixel
    if (typeof (window as any).fbq !== 'undefined') (window as any).fbq('track', 'Lead', { currency: 'BRL', value: 10000 });

    // Send emails
    sendEmail(MARCUS_EMAIL, 'Marcus Godoy', '🏠 Novo lead — ' + dados.nome + ' | ' + dados.servico, emailParaMarcus(dados));
    if (dados.email) sendEmail(dados.email, dados.nome, 'Godoy Prime Realty — Solicitação recebida', emailParaCliente(dados));

    setFormSubmitted(true);
  };

  const ctaServico = (e: React.MouseEvent, servico: string, msgWa: string) => {
    e.preventDefault();
    window.open('https://wa.me/' + MARCUS_WA + '?text=' + encodeURIComponent(msgWa), '_blank');
    const dados = { nome: 'Lead via CTA', whatsapp: '-', email: '-', servico, origem: 'cta_servico', data: new Date().toLocaleString('pt-BR') };
    sendEmail(MARCUS_EMAIL, 'Marcus Godoy', '🏠 Interesse em ' + servico + ' — clique via CTA', emailParaMarcus(dados));
    if (typeof (window as any).fbq !== 'undefined') (window as any).fbq('track', 'InitiateCheckout', { content_name: servico });
  };

  const scenarios = [
    { id: 'sc-0', btn: 'Executivo com prazo', av: 'RM', name: 'Ricardo M. — Diretor Executivo', detail: '52 anos · Barra da Tijuca · R$3,2M · Apartamento 4 quartos, frente mar',
      situacao: 'Ricardo tinha 90 dias para fechar antes de uma viagem internacional. Visitou quatro imóveis indicados por corretores — todos acima de R$3M — e não conseguia compará-los tecnicamente. O preço por m² variava 40% entre as opções sem nenhuma explicação.',
      pullquote: 'Estava prestes a fazer proposta no imóvel que "parecia melhor" — sem análise independente de valor ou condições técnicas.',
      colLabel: 'O que identificamos',
      steps: ['Transações reais da região nos últimos 18 meses: preço médio real estava 22% abaixo do anunciado.', 'Vistoria técnica identificou infiltração na laje da varanda e histórico de reparo não declarado.', 'Negociação em dois rounds usando laudo de valor e laudo técnico como alavanca. Com dados.'],
      results: [{ val: 'R$340k', label: 'Redução no valor final negociado' }, { val: 'R$180k', label: 'Risco evitado com vistoria técnica' }, { val: '6', label: 'Imóveis avaliados — não 30 ou 40' }]
    },
    { id: 'sc-1', btn: 'Profissional que quase errou', av: 'CS', name: 'Carla S. — Sócia de escritório jurídico', detail: '45 anos · Leblon → Barra da Tijuca · R$2,1M · Cobertura duplex, 3 quartos',
      situacao: 'Carla conhece contratos — mas não o mercado da Barra. Recebeu indicação de uma cobertura por um corretor que também representava o vendedor. O imóvel parecia perfeito. Ela não tinha como saber se R$2,1M era o preço justo.',
      pullquote: 'Quem representa o vendedor tem incentivo de fechar, não de proteger o comprador. Não é má-fé — é o modelo.',
      colLabel: 'O que identificamos',
      steps: ['Análise de transações reais da região: preço 18% acima da mediana de negócios equivalentes nos últimos 12 meses.', 'Ata de assembleia revelou ação judicial por infiltrações estruturais — informação disponível mas não óbvia.', 'Carla não comprou. Dois meses depois encontrou cobertura equivalente 12% abaixo do orçamento.'],
      results: [{ val: 'R$250k', label: 'Economia no imóvel correto' }, { val: 'Zero', label: 'Risco jurídico assumido' }, { val: '1', label: 'Visita até o imóvel certo' }]
    },
    { id: 'sc-2', btn: 'Empresário, ticket maior', av: 'FP', name: 'Fernando P. — Empresário', detail: '58 anos · Recreio · R$4,8M · Casa em condomínio fechado',
      situacao: 'Fernando já comprou imóveis antes — sempre com corretores. Desta vez o ticket era maior e ele queria certeza do valor. O corretor argumentava que "não existe parâmetro de preço em condomínio fechado". Argumento frequente. E conveniente.',
      pullquote: 'Quanto maior o ticket, maior o risco de uma decisão baseada em percepção. E maior o custo de um erro.',
      colLabel: 'O que identificamos',
      steps: ['Transações reais da região em condomínios equivalentes por m² e padrão construtivo — o parâmetro existia.', 'Liquidez: tempo médio de revenda acima de 18 meses. Relevante para a tese de investimento.', 'Negociação em três rodadas com contraproposta documentada. O feeling substituído por dados.'],
      results: [{ val: 'R$420k', label: 'Redução no preço final' }, { val: 'Revelado', label: 'Risco de liquidez antes da compra' }, { val: 'Dados', label: 'Onde antes havia feeling' }]
    },
    { id: 'sc-3', btn: 'Executivo em relocação', av: 'DK', name: 'David K. — CEO, multinacional europeia', detail: '48 anos · Transferência Lisboa → Rio de Janeiro · Orçamento R$3,8M · Apartamento 4 quartos, Barra da Tijuca',
      situacao: 'David teve 60 dias para fechar moradia após aceitar transferência para o Rio. Nunca havia morado no Brasil. Não conhecia a diferença entre Barra da Tijuca e Recreio, entre os condomínios da Av. das Américas e os da orla. Fez uma visita rápida ao Rio com a família — mas visitar imóveis a distância é uma aposta no escuro.',
      pullquote: 'Comprar um imóvel num mercado que você não conhece, no país que você não conhece, sob pressão de prazo, é o cenário de maior risco possível.',
      colLabel: 'O que o PSI entregou',
      steps: ['Briefing remoto detalhado: perfil da família, rotina, escola dos filhos, distância ao escritório. Mapeamos os bairros e condomínios realmente compatíveis com o estilo de vida — sem filtros de portal.', 'Visitei e filtrei 18 imóveis presencialmente. David veio ao Rio apenas uma vez e visitou 3. Fechou na segunda visita — imóvel que não estava nos portais, acessado via rede direta.', 'Conduzi toda a due diligence, negociação e acompanhamento documental enquanto David estava em Lisboa. Na data da mudança, o imóvel estava pronto para entrega.'],
      results: [{ val: '1', label: 'Viagem ao Rio para fechar o imóvel' }, { val: 'R$290k', label: 'Economia na negociação final' }, { val: 'Off-market', label: 'Imóvel adquirido fora dos portais' }]
    },
    { id: 'sc-4', btn: 'Personalidade pública', av: 'A.', name: 'A. — Personalidade pública', detail: '34 anos · Rio de Janeiro · Orçamento R$5,2M · Cobertura duplex com privacidade · Nome preservado a pedido',
      situacao: 'Uma personalidade com alto grau de exposição pública tentou buscar imóvel por conta própria. Em cada visita, corretores reconheciam quem era. O preço subia. A informação vazava. Uma cobertura de R$4,8M foi cotada por R$5,9M assim que o corretor soube quem era o interessado. A busca precisou ser interrompida.',
      pullquote: 'Quando o vendedor sabe quem você é, o preço muda. A discrição não é conforto — é proteção financeira real.',
      colLabel: 'Como o PSI protegeu',
      steps: ['Conduzi toda a prospecção, visitas e negociações sem revelar a identidade do comprador. Para o mercado, o interessado era "um cliente do consultor" — até a assinatura da proposta aceita.', 'Análise de transações reais da região mostrou que o preço justo estava 19% abaixo do que havia sido cotado quando o nome era conhecido. A negociação foi baseada em dados, não em urgência.', 'Contrato de representação com cláusula expressa de confidencialidade. Toda a documentação e comunicação transitaram pelo escritório — sem exposição pública em nenhuma etapa.'],
      results: [{ val: 'Zero', label: 'Exposição pública durante o processo' }, { val: 'R$380k', label: 'Economia vs. cotação com nome revelado' }, { val: 'Contrato', label: 'Confidencialidade total formalizada' }],
      avStyle: { fontSize: '11px', letterSpacing: '.02em' }
    }
  ];

  return (
    <div className="landing-v4">
      {/* NAV */}
      <nav className={navSolid ? 'solid' : ''}>
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={handleAnchorClick}>
            <img src={godoyLogo} alt="Godoy Prime" />
            <span className="nav-logo-text">Godoy <span>Prime</span></span>
          </a>
          <ul className="nav-menu">
            <li><a href="#conceito" onClick={handleAnchorClick}>Conceito</a></li>
            <li><a href="#como-funciona" onClick={handleAnchorClick}>Processo</a></li>
            <li><a href="#servicos" onClick={handleAnchorClick}>Serviços</a></li>
            <li><a href="#sobre" onClick={handleAnchorClick}>Sobre</a></li>
            <li><a href="#faq" onClick={handleAnchorClick}>FAQ</a></li>
          </ul>
          <a href="#contato" className="nav-cta" onClick={handleAnchorClick}>Diagnóstico Gratuito</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-img" style={{ backgroundImage: `url(${heroImage})` }}></div>
        <div className="hero-gradient"></div>
        <div className="hero-gradient2"></div>
        <div className="hero-content">
          <div className="hero-issue">
            <div className="hero-issue-line"></div>
            <span className="hero-issue-text">Personal Shopper Imobiliário · Barra da Tijuca e Recreio</span>
          </div>
          <h1 className="hero-headline">Comprar imóvel de alto padrão sem representação exclusiva é o <em>erro mais caro</em> do mercado imobiliário.</h1>
          <p className="hero-sub">Eu represento compradores exigentes — usando dados de transações reais da região, curadoria técnica e negociação profissional. Sem conflito de interesses.</p>
          <div className="hero-actions">
            <a href="#contato" className="btn btn-gold" onClick={handleAnchorClick}>Agendar Diagnóstico Gratuito</a>
            <a href="#conceito" className="btn btn-outline" onClick={handleAnchorClick}>Entender o conceito</a>
          </div>
          <p className="hero-note">Conversa direta · Sem compromisso · Sem venda de imóveis</p>
          <div className="hero-meta">
            <div className="hero-meta-item"><div className="hero-meta-dot"></div><span className="hero-meta-text">CRECI 80.199 PF | 11.841 PJ</span></div>
            <div className="hero-meta-item"><div className="hero-meta-dot"></div><span className="hero-meta-text">Perito Avaliador TJRJ</span></div>
            <div className="hero-meta-item"><div className="hero-meta-dot"></div><span className="hero-meta-text">Transações reais da região</span></div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="sec sec-vellum" id="conceito">
        <div className="wrap">
          <div className="prob-intro">
            <div className="prob-intro-left">
              <span className="overline">O problema</span>
              <h2>O mercado não foi desenhado <em>para o comprador.</em></h2>
            </div>
            <div className="prob-intro-right">
              <p>A maioria das recomendações vem de quem está vendendo — não de quem está protegendo sua decisão. E é exatamente aí que começam os erros caros.</p>
            </div>
          </div>
          <div className="prob-items">
            <div className="prob-item"><div className="prob-num">01</div><div className="prob-icon-wrap">⚠️</div><div className="prob-title">Conflito de Interesse Estrutural</div><div className="prob-text">Quanto mais caro você paga, mais o corretor ganha. Nenhum incentivo para negociar menor.</div></div>
            <div className="prob-item"><div className="prob-num">02</div><div className="prob-icon-wrap">💸</div><div className="prob-title">Preços Inflados Sem Critério</div><div className="prob-text">Você não tem acesso a transações reais. Paga baseado em "feeling" e informação assimétrica.</div></div>
            <div className="prob-item"><div className="prob-num">03</div><div className="prob-icon-wrap">⏱️</div><div className="prob-title">Tempo Desperdiçado</div><div className="prob-text">Visita 30–40 imóveis errados em 2–3 meses. 80–120 horas perdidas — R$40–60k se você ganha R$500/h.</div></div>
            <div className="prob-item"><div className="prob-num">04</div><div className="prob-icon-wrap">🚨</div><div className="prob-title">Risco de Erro Invisível</div><div className="prob-text">Problemas estruturais, condomínio em litígio, documentação irregular. Descobertos tarde demais.</div></div>
          </div>
          <div className="prob-callout">
            <p className="prob-callout-text">No alto padrão, um erro custa <strong>R$100k a R$500k.</strong><br/>E você só descobre depois de assinar.</p>
            <a href="#contato" className="btn btn-outline" onClick={handleAnchorClick}>→ Agendar Diagnóstico Gratuito</a>
          </div>
        </div>
      </section>

      {/* MISSION / INTERNATIONAL CONTEXT */}
      <section className="sec sec-ink3" id="missao">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'end', marginBottom: 'clamp(52px,7vw,80px)' }}>
            <div>
              <span className="overline" style={{ color: 'var(--gold3)', display: 'block', marginBottom: 20 }}>Um modelo testado. Uma missão clara.</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(30px,4.5vw,50px)', lineHeight: 1.1, color: 'var(--txt-ink)', letterSpacing: '-.01em' }}>O comprador já tem quem o represente exclusivamente nos maiores mercados do mundo. <em>Agora também no Rio de Janeiro.</em></h2>
            </div>
            <div>
              <p style={{ fontSize: 15, color: 'var(--txt-ink2)', lineHeight: 1.85 }}>Não estou criando algo novo. Estou trazendo para o Rio de Janeiro um modelo que funciona há décadas nos Estados Unidos, na Austrália e na Europa — e que transformou a forma como compradores de alto padrão protegem seu capital.</p>
              <p style={{ fontSize: 15, color: 'var(--txt-ink2)', lineHeight: 1.85, marginTop: 16 }}>O objetivo é simples: tornar o mercado imobiliário brasileiro mais justo e equilibrado para o comprador.</p>
            </div>
          </div>

          {/* 3 market cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 2, overflow: 'hidden', marginBottom: 1 }}>
            {[
              { country: 'Estados Unidos', stat: '+50%', desc: 'das transações imobiliárias envolvem um buyer\'s agent. O modelo está consolidado há mais de três décadas.', ref: 'Exclusive Buyer\'s Agent (EBA)' },
              { country: 'Austrália', stat: '85%', desc: 'dos compradores que usaram um buyer\'s agent disseram ter conseguido um negócio melhor do que conseguiriam sozinhos.', ref: 'Buyer\'s Agent / REBAA' },
              { country: 'Espanha', stat: '20+', desc: 'anos de mercado maduro de representação exclusiva do comprador, especialmente nos segmentos de luxo de Madrid e Barcelona.', ref: 'Personal Shopper Inmobiliario' }
            ].map((m, i) => (
              <div key={i} style={{ background: 'var(--ink2)', padding: 'clamp(28px,4vw,40px)', borderRight: i < 2 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
                <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--gold3)', marginBottom: 16 }}>{m.country}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: 8, letterSpacing: '-.02em' }}>{m.stat}</div>
                <p style={{ fontSize: 13, color: 'var(--txt-ink2)', lineHeight: 1.65, marginBottom: 20 }}>{m.desc}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 16 }}>
                  <div style={{ fontSize: 11, color: 'var(--txt-ink3)', letterSpacing: '.04em' }}>Referência local</div>
                  <div style={{ fontSize: 13, color: 'var(--txt-ink2)', marginTop: 4 }}>{m.ref}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Brazil statement */}
          <div style={{ background: 'rgba(200,164,94,.05)', border: '1px solid rgba(200,164,94,.15)', borderRadius: 2, padding: 'clamp(28px,4vw,44px)', display: 'flex', alignItems: 'center', gap: 'clamp(24px,4vw,48px)', flexWrap: 'wrap' as const }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--gold3)', marginBottom: 12 }}>Brasil — 2024</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 300, color: 'var(--txt-ink)', lineHeight: 1.3 }}>O mercado imobiliário do Rio de Janeiro movimenta <em>R$8 bilhões por ano</em> só na Barra da Tijuca. Sem nenhuma estrutura de representação exclusiva para o comprador.</div>
            </div>
            <div style={{ flex: 1, minWidth: 240, borderLeft: '1px solid rgba(200,164,94,.2)', paddingLeft: 'clamp(24px,4vw,48px)' }}>
              <p style={{ fontSize: 14, color: 'var(--txt-ink2)', lineHeight: 1.85, marginBottom: 16 }}>A Godoy Prime Realty nasce para preencher essa lacuna — com o mesmo rigor técnico, a mesma estrutura contratual e o mesmo alinhamento de interesses que protegem compradores nos mercados mais sofisticados do mundo.</p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontStyle: 'italic', color: 'rgba(200,164,94,.8)', lineHeight: 1.6 }}>Você não precisa ser o primeiro a confiar nesse modelo. Apenas o primeiro no Rio de Janeiro a ter acesso a ele.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REPRESENTATION */}
      <section className="sec sec-ink" id="representacao">
        <div className="wrap">
          {/* Objeção */}
          <div style={{ border: '1px solid rgba(200,164,94,.2)', borderRadius: 2, padding: 'clamp(28px,4vw,48px)', marginBottom: 'clamp(48px,6vw,72px)', background: 'rgba(200,164,94,.04)' }}>
            <div style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: 'var(--gold3)', marginBottom: 16 }}>A pergunta que todo comprador faz</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(24px,3.5vw,40px)', lineHeight: 1.15, color: 'var(--txt-ink)', letterSpacing: '-.01em', marginBottom: 20 }}>"Por que preciso pagar por você se <em>o corretor não me cobra nada?"</em></h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,4vw,48px)', alignItems: 'start' }}>
              <div>
                <p style={{ fontSize: 15, color: 'var(--txt-ink2)', lineHeight: 1.85, marginBottom: 16 }}>O corretor <strong style={{ color: 'var(--txt-ink)' }}>não é gratuito para você.</strong> Ele é pago pelo vendedor — geralmente entre 4% e 6% do valor do imóvel.</p>
                <p style={{ fontSize: 15, color: 'var(--txt-ink2)', lineHeight: 1.85 }}>E quem paga o corretor, dita os interesses do corretor. O contrato que ele assina é com o vendedor, para vender pelo maior preço possível, no menor tempo possível.</p>
              </div>
              <div style={{ borderLeft: '1px solid rgba(200,164,94,.2)', paddingLeft: 'clamp(24px,4vw,48px)' }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px,2.2vw,22px)', fontStyle: 'italic', color: 'rgba(200,164,94,.9)', lineHeight: 1.6, marginBottom: 16 }}>Você está na negociação mais cara da sua vida sem nenhum profissional do seu lado.</p>
                <p style={{ fontSize: 13, color: 'var(--txt-ink3)', lineHeight: 1.7 }}>O corretor não é seu inimigo. Mas o modelo no qual ele opera é estruturalmente contrário aos seus interesses como comprador.</p>
              </div>
            </div>
          </div>

          {/* Dores reais */}
          <div style={{ marginBottom: 'clamp(48px,6vw,72px)' }}>
            <span className="overline" style={{ color: 'var(--gold3)', display: 'block', marginBottom: 20 }}>O que compradores descobrem — tarde demais</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(28px,4vw,46px)', lineHeight: 1.1, color: 'var(--txt-ink)', letterSpacing: '-.01em', marginBottom: 12 }}>O mercado não foi desenhado <em>para proteger você.</em></h2>
            <p style={{ fontSize: 15, color: 'var(--txt-ink2)', lineHeight: 1.75, maxWidth: 640, marginBottom: 40 }}>Estas não são situações excepcionais. São as reclamações mais comuns de quem comprou imóvel no Brasil sem representação exclusiva.</p>

            {[
              [
                { tag: 'Omissão de informação', text: '"Descobri após assinar que o condomínio tinha dívidas em atraso. O corretor sabia — e não me contou."', sub: 'O corretor tem incentivo de fechar o negócio. Informação que atrasa ou cancela a venda prejudica a comissão dele.' },
                { tag: 'Pressão para decidir rápido', text: '"Fui pressionado a fazer proposta no mesmo dia. \'Tem outro interessado.\' Comprei com medo de perder."', sub: 'Urgência fabricada é uma das táticas mais comuns. Quanto mais rápido você decide, menos você analisa.' },
                { tag: 'Portfólio limitado', text: '"O corretor só me mostrou imóveis do portfólio dele. O imóvel ideal que encontrei depois não passava pela imobiliária dele."', sub: 'Corretor só vende o que tem. Não busca o que você precisa — a menos que seja pago para isso.' }
              ],
              [
                { tag: 'Problema estrutural oculto', text: '"Infiltração na laje, fiação elétrica fora do padrão, estrutura do terraço comprometida. Nada disso apareceu na visita."', sub: 'Vistoria técnica independente antes da compra é o único proteção real. O corretor não faz isso — e não é sua função.' },
                { tag: 'Preço sem critério', text: '"Paguei o preço pedido. Meses depois descobri que imóveis equivalentes tinham sido vendidos muito abaixo. Não tinha como saber."', sub: 'Sem acesso a transações reais da região, você negocia no escuro — com alguém que tem todas as informações.' },
                { tag: 'Documentação irregular', text: '"Havia uma penhora na matrícula. O corretor não verificou. Só descobrimos quando fomos ao cartório para assinar."', sub: 'Due diligence documental completa protege você de problemas que podem travar ou anular a compra após a assinatura.' }
              ]
            ].map((row, ri) => (
              <div key={ri} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.08)', borderBottom: ri === 0 ? 'none' : undefined, borderTop: ri === 1 ? 'none' : undefined, overflow: 'hidden' }}>
                {row.map((item, ci) => (
                  <div key={ci} style={{ background: 'var(--ink2)', padding: '28px 24px', borderRight: ci < 2 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
                    <div style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#c05050', marginBottom: 14 }}>{item.tag}</div>
                    <p style={{ fontSize: 13.5, color: 'var(--txt-ink2)', lineHeight: 1.75, marginBottom: 14 }}>{item.text}</p>
                    <p style={{ fontSize: 12, color: 'var(--txt-ink3)', lineHeight: 1.6 }}>{item.sub}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Comparação */}
          <div>
            <span className="overline" style={{ color: 'var(--gold3)', display: 'block', marginBottom: 20 }}>A diferença que muda tudo</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(28px,4vw,46px)', lineHeight: 1.1, color: 'var(--txt-ink)', letterSpacing: '-.01em', marginBottom: 40 }}>Aqui, o interesse é <em>um só: o seu.</em></h2>

            <div className="compare-wrap">
              <div className="compare-heads">
                <div className="compare-head">
                  <span className="compare-head-label">Corretor / Imobiliária</span>
                  <span className="compare-pill pill-muted">Modelo tradicional</span>
                </div>
                <div className="compare-head">
                  <span className="compare-head-label highlight">Personal Shopper Imobiliário</span>
                  <span className="compare-pill pill-gold">Godoy Prime</span>
                </div>
              </div>
              {[
                { lbl: ['Para quem trabalha', 'Para quem trabalha'], neg: 'Para o vendedor. Assina contrato com quem quer vender pelo maior preço.', pos: 'Para você. Assina contrato com quem quer comprar pelo melhor preço.' },
                { lbl: ['Como é remunerado', 'Como é remunerado'], neg: '% sobre o preço final. Quanto mais caro você paga, mais ele ganha.', pos: '% sobre a economia gerada. Quanto mais você economiza, mais ganho.' },
                { lbl: ['Quais imóveis mostra', 'Quais imóveis busca'], neg: 'Apenas o portfólio próprio ou da imobiliária. Não busca o que você precisa.', pos: 'Mercado inteiro — portais, off-market e rede direta. Foco no seu critério.' },
                { lbl: ['Vistoria técnica', 'Vistoria técnica'], neg: 'Não realiza. Interesse é facilitar a venda, não identificar problemas.', pos: 'Realiza antes de você visitar. Infiltrações, documentação, histórico do imóvel.' },
                { lbl: ['Negociação', 'Negociação'], neg: 'Negocia para fechar rápido. Acordo rápido = comissão garantida.', pos: 'Negocia para obter o melhor preço. Minha comissão depende do seu desconto.' },
                { lbl: ['Contrato', 'Contrato'], neg: 'Com o vendedor. Você não tem representação jurídica formal.', pos: 'Com você. Dever fiduciário, confidencialidade e responsabilidade definidos.' },
                { lbl: ['Custo real para o comprador', 'Custo real para o comprador'], neg: 'Embutido no preço final — invisível, mas real. Você paga mais para cobrir a comissão do vendedor.', pos: 'Transparente e contratual. Na maioria dos casos, a economia supera o honorário.' }
              ].map((r, i) => (
                <div key={i} className="compare-row">
                  <div className="compare-cell"><div className="cc-lbl">{r.lbl[0]}</div><div className="cc-val neg">{r.neg}</div></div>
                  <div className="compare-cell"><div className="cc-lbl">{r.lbl[1]}</div><div className="cc-val pos">{r.pos}</div></div>
                </div>
              ))}
            </div>

            {/* Proteção jurídica */}
            <div className="legal-editorial" style={{ marginTop: 'clamp(48px,6vw,72px)' }}>
              <div className="legal-label-col">
                <span className="overline">Proteção jurídica</span>
                <div className="legal-rule"></div>
              </div>
              <div className="legal-content">
                <p>Na representação, há um contrato antes de qualquer ação. Nele estão: o escopo exato do trabalho, meus poderes de negociação, os honorários e os prazos. <strong>Sem ambiguidades.</strong></p>
                <p>Minha remuneração depende da sua economia real — não do fechamento. Se não houver resultado concreto, <strong>não há cobrança.</strong></p>
                <p>Você tem um profissional com CRECI ativo e credenciamento como <strong>Perito Avaliador pelo TJRJ</strong> respondendo pelo trabalho. Isso é diferente de uma consultoria informal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec sec-vellum2" id="como-funciona">
        <div className="wrap">
          <div className="steps-intro">
            <div>
              <span className="overline">Como trabalhamos</span>
              <h2>Dados de transações reais da região — não apenas anúncios — para determinar o <em>valor justo.</em></h2>
            </div>
            <p>Cada etapa foi desenhada para proteger sua decisão e seu capital. Sem atalhos, sem pressão, sem conflito.</p>
          </div>
          <div className="steps-list">
            {[
              { n: '01', title: 'Entendimento do Momento', text: 'Mapeamos perfil, orçamento, prioridades e prazo antes de qualquer busca.' },
              { n: '02', title: 'Leitura de Mercado', text: 'Analisamos transações reais da região para identificar o valor justo de mercado.' },
              { n: '03', title: 'Curadoria Estratégica', text: 'Visitamos e filtramos. Você vê apenas os imóveis que realmente fazem sentido.' },
              { n: '04', title: 'Análise Comparativa', text: 'Cada opção avaliada com metodologia técnica: estrutura, documentação, m².' },
              { n: '05', title: 'Até a Assinatura', text: 'Conduzimos a negociação em seu nome até o fechamento. Sem surpresas.' }
            ].map((s, i) => (
              <div key={i} className="step-card"><div className="step-card-n">{s.n}</div><div className="step-card-title">{s.title}</div><div className="step-card-text">{s.text}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="sec sec-ink2" id="na-pratica">
        <div className="wrap">
          <div className="sc-header">
            <span className="overline">Na prática</span>
            <h2>O que muda quando há <em>alguém do seu lado</em></h2>
            <p>Três situações que ilustram como a representação exclusiva muda o resultado de uma compra de alto padrão.</p>
          </div>

          <div className="sc-nav">
            {scenarios.map((s, i) => (
              <button key={i} className={`sc-btn${activeScenario === i ? ' on' : ''}`} onClick={() => setActiveScenario(i)}>{s.btn}</button>
            ))}
          </div>

          {scenarios.map((s, i) => (
            <div key={i} className={`sc-panel${activeScenario === i ? ' on' : ''}`}>
              <div className="sc-card">
                <div className="sc-head">
                  <div className="sc-head-l">
                    <div className="sc-av" style={s.avStyle}>{s.av}</div>
                    <div><div className="sc-name">{s.name}</div><div className="sc-detail">{s.detail}</div></div>
                  </div>
                  <span className="sc-badge">Cenário Ilustrativo</span>
                </div>
                <div className="sc-body">
                  <div className="sc-col">
                    <span className="sc-col-label">A situação</span>
                    <p className="sc-sit-text">{s.situacao}</p>
                    <span className="sc-pullquote">{s.pullquote}</span>
                  </div>
                  <div className="sc-col">
                    <span className="sc-col-label">{s.colLabel}</span>
                    <div className="sc-steps-list">
                      {s.steps.map((step, si) => (
                        <div key={si} className="sc-step"><div className="sc-step-n">{si + 1}</div><div className="sc-step-t">{step}</div></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="sc-results">
                  {s.results.map((r, ri) => (
                    <div key={ri} className="sc-res-item"><div className="sc-res-val">{r.val}</div><div className="sc-res-label">{r.label}</div></div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <p className="sc-footer-note">Cenários ilustrativos baseados na dinâmica real do mercado imobiliário de alto padrão da Barra da Tijuca e Recreio.<br/>Valores e situações representam o tipo de análise conduzida — não casos individuais identificáveis.</p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="sec sec-vellum" id="servicos">
        <div className="wrap">
          <div className="prod-header">
            <span className="overline">Serviços</span>
            <h2>Três formas de <em>atuar ao seu lado</em></h2>
          </div>
          <div className="prod-grid">
            <div className="prod-card">
              <div className="prod-number">01</div>
              <div className="prod-tag">Atestado de Valor</div>
              <div className="prod-name">Parecer Godoy Prime</div>
              <div className="prod-type">Validação independente</div>
              <div className="prod-divider"></div>
              <p className="prod-desc">Análise técnica e estratégica para validar o valor real de um imóvel que você já identificou. Análise de transações reais da região, histórico de valorização, liquidez e recomendação de oferta.</p>
              <div className="prod-price">R$4.900 <small>a partir de</small></div>
              <a href="#" className="btn btn-outline-dark btn-sm" onClick={(e) => ctaServico(e, 'Parecer Godoy Prime', 'Olá Marcus! Tenho interesse no *Parecer Godoy Prime* (Atestado de Valor). Gostaria de entender melhor como funciona e os próximos passos.')}>Solicitar Parecer →</a>
            </div>
            <div className="prod-card">
              <div className="prod-number">02</div>
              <div className="prod-tag">Validação e Negociação</div>
              <div className="prod-name">Compra Blindada</div>
              <div className="prod-type">Da análise à assinatura</div>
              <div className="prod-divider"></div>
              <p className="prod-desc">Para quem já tem um imóvel em vista e quer negociação profissional com representação exclusiva. Avaliação técnica, negociação ativa e acompanhamento documental completo.</p>
              <div className="prod-price">R$10.000 <small>a partir de</small></div>
              <a href="#" className="btn btn-outline-dark btn-sm" onClick={(e) => ctaServico(e, 'Compra Blindada', 'Olá Marcus! Tenho interesse na *Compra Blindada* (Validação e Negociação). Gostaria de entender melhor como funciona e os próximos passos.')}>Blindar Minha Compra →</a>
            </div>
            <div className="prod-card" style={{ position: 'relative', border: '1px solid rgba(200,164,94,.25)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,var(--gold3),transparent)', opacity: 1 }}></div>
              <div className="prod-number">03</div>
              <div className="prod-tag">Busca Completa</div>
              <div className="prod-name">Prime Buyer Experience</div>
              <div className="prod-type">Jornada integral</div>
              <div className="prod-divider"></div>
              <p className="prod-desc">Assessoria integral para quem ainda está buscando. Curadoria ativa, visitas técnicas prévias, negociação blindada e suporte pós-compra. Você visita 5–8 imóveis, não 30–40.</p>
              <div style={{ background: 'rgba(200,164,94,.07)', border: '1px solid rgba(200,164,94,.2)', borderRadius: 2, padding: '14px 16px', marginBottom: 20 }}>
                <div style={{ fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--gold3)', marginBottom: 8 }}>Compromisso de lançamento</div>
                <p style={{ fontSize: 12.5, color: 'var(--txt-vel2)', lineHeight: 1.65 }}>Se a economia obtida na negociação não superar o valor contratado, <strong style={{ color: 'var(--txt-vel)' }}>você não paga.</strong> Sem cláusulas de escape. Sem letras miúdas.</p>
              </div>
              <div className="prod-price">Sob consulta</div>
              <a href="#" className="btn btn-outline-dark btn-sm" onClick={(e) => ctaServico(e, 'Prime Buyer Experience', 'Olá Marcus! Tenho interesse no *Prime Buyer Experience* (Busca Completa). Gostaria de entender melhor como funciona e os próximos passos.')}>Solicitar Proposta →</a>
            </div>
          </div>
          <p className="prod-note">O valor pago no Parecer é integralmente abatido na Compra Blindada. O valor da Compra Blindada é abatido no Prime Buyer Experience.</p>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="sec" style={{ background: 'var(--ink)', padding: '0 0 clamp(80px,10vw,120px)' }}>
        <div className="wrap">
          <div style={{ border: '1px solid rgba(200,164,94,.2)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ background: 'rgba(200,164,94,.06)', padding: 'clamp(28px,4vw,44px)', borderBottom: '1px solid rgba(200,164,94,.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' as const }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: 'var(--gold3)', marginBottom: 12 }}>Compromisso de lançamento — Prime Buyer Experience</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(22px,3.5vw,36px)', lineHeight: 1.15, color: 'var(--txt-ink)', letterSpacing: '-.01em' }}>Se você não economizar mais do que pagou, <em>você não paga.</em></h3>
              </div>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 64, height: 64, border: '1px solid rgba(200,164,94,.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 300, color: 'var(--gold)' }}>0</div>
                </div>
                <div style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--gold3)', marginTop: 8, textAlign: 'center' as const }}>risco</div>
              </div>
            </div>

            <div id="garantia-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              <div style={{ padding: 'clamp(28px,4vw,44px)', borderRight: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--txt-ink3)', marginBottom: 16 }}>Como funciona</div>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
                  {[
                    'Você contrata o Prime Buyer Experience. Definimos juntos o imóvel buscado e o orçamento disponível.',
                    'No momento da contratação, registramos formalmente o preço anunciado do imóvel que vier a ser adquirido. Esse valor é a referência contratual.',
                    'Conduzo a negociação. A economia é calculada como a diferença entre o preço anunciado e o valor final pago.',
                    <>Se a economia obtida for superior ao meu honorário, você paga normalmente. Se não for — <strong style={{ color: 'var(--txt-ink)' }}>não cobra nada</strong>.</>
                  ].map((text, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, border: '1px solid rgba(200,164,94,.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--gold3)', flexShrink: 0, marginTop: 2, fontFamily: 'var(--serif)' }}>{i + 1}</div>
                      <p style={{ fontSize: 13.5, color: 'var(--txt-ink2)', lineHeight: 1.7 }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: 'clamp(28px,4vw,44px)' }}>
                <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--txt-ink3)', marginBottom: 16 }}>A lógica por trás</div>
                <p style={{ fontSize: 14, color: 'var(--txt-ink2)', lineHeight: 1.85, marginBottom: 20 }}>Meu trabalho é negociar a seu favor. Se eu não conseguir uma economia superior ao que você me paga, não fiz meu trabalho — e não faz sentido cobrar por isso.</p>
                <p style={{ fontSize: 14, color: 'var(--txt-ink2)', lineHeight: 1.85, marginBottom: 28 }}>Esse compromisso existe porque estou construindo um modelo novo no Brasil — e a melhor forma de provar que ele funciona é eliminando completamente o risco financeiro de quem acredita primeiro.</p>
                <div style={{ background: 'rgba(200,164,94,.05)', borderLeft: '2px solid var(--gold3)', padding: '16px 20px', borderRadius: '0 2px 2px 0' }}>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontStyle: 'italic', color: 'rgba(200,164,94,.85)', lineHeight: 1.6 }}>Tudo isso estará formalizado em contrato antes de qualquer ação. Sem ambiguidades.</p>
                </div>
                <div style={{ marginTop: 24 }}>
                  <a href="#contato" className="btn btn-gold btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={handleAnchorClick}>Agendar Diagnóstico Gratuito</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="sec sec-ink3">
        <div className="wrap">
          <span className="overline" style={{ color: 'var(--gold3)', display: 'block', marginBottom: 20 }}>Quatro mudanças concretas</span>
          <h2 className="display display-md" style={{ color: 'var(--txt-ink)', marginBottom: 'clamp(40px,5vw,64px)' }}>O que muda na <em>sua compra</em></h2>
          <div className="ben-grid">
            <div className="ben-item"><div className="ben-num">01</div><div className="ben-title">Menos conflito de interesse</div><p className="ben-text">Trabalhamos exclusivamente para você. Sem comissão atrelada ao preço do imóvel.</p></div>
            <div className="ben-item"><div className="ben-num">02</div><div className="ben-title">Mais clareza na decisão</div><p className="ben-text">Cada imóvel avaliado com dados reais de mercado. Você decide com informação, não com pressão.</p></div>
            <div className="ben-item"><div className="ben-num">03</div><div className="ben-title">Proteção de capital</div><p className="ben-text">Identificamos riscos antes da compra — documentação, estrutura, histórico de preços.</p></div>
            <div className="ben-item"><div className="ben-num">04</div><div className="ben-title">Acesso qualificado ao mercado</div><p className="ben-text">Imóveis on e off-market. Você acessa oportunidades que não aparecem nos portais.</p></div>
          </div>
        </div>
      </section>

      {/* MARCUS */}
      <section className="sec sec-ink2" id="sobre">
        <div className="wrap">
          <div className="marcus-section">
            <div className="marcus-img-wrap">
              <div className="marcus-img-frame">
                <img className="marcus-img" src={marcusProfile} alt="Marcus Godoy — Personal Shopper Imobiliário" />
                <div className="marcus-caption">
                  <div className="marcus-caption-name">Marcus Godoy</div>
                  <div className="marcus-caption-title">Personal Shopper Imobiliário</div>
                </div>
              </div>
            </div>
            <div className="marcus-content">
              <span className="overline">Quem está do seu lado</span>
              <h2>A decisão de representar <em>exclusivamente compradores</em></h2>
              <p className="marcus-bio">Sou Marcus Godoy, corretor com CRECI ativo e Perito Avaliador credenciado pelo Tribunal de Justiça do Rio de Janeiro. Minha atuação é exclusiva para compradores de imóveis de alto padrão na Barra da Tijuca e Recreio.</p>
              <p className="marcus-bio">A decisão de não vender imóveis e representar apenas compradores foi intencional. O modelo tradicional cria um conflito de interesses estrutural que prejudica quem compra. A Godoy Prime Realty existe para eliminar esse conflito.</p>
              <div className="marcus-creds">
                <div className="marcus-cred"><div className="marcus-cred-dot"></div>CRECI/RJ: 80.199 PF | 11.841 PJ</div>
                <div className="marcus-cred"><div className="marcus-cred-dot"></div>Perito Avaliador — Tribunal de Justiça do Rio de Janeiro</div>
                <div className="marcus-cred"><div className="marcus-cred-dot"></div>Especialização em imóveis de alto padrão — Barra e Recreio</div>
                <div className="marcus-cred"><div className="marcus-cred-dot"></div>Modelo de representação exclusiva do comprador</div>
              </div>
              <div className="marcus-motto">"Meu trabalho não é vender imóveis. É garantir que você <strong>tome a decisão certa</strong> — com dados, sem pressão e sem conflito de interesses."</div>
            </div>
          </div>

          <div className="stats-strip">
            <div className="stat-block"><div className="stat-val">100%</div><div className="stat-lbl">Dedicação exclusiva ao comprador</div></div>
            <div className="stat-block"><div className="stat-val">Zero</div><div className="stat-lbl">Conflito de interesses</div></div>
            <div className="stat-block"><div className="stat-val">TJRJ</div><div className="stat-lbl">Perito Avaliador credenciado</div></div>
          </div>

          <div className="for-cols">
            <div>
              <span className="for-col-head">Para quem é</span>
              <ul className="for-list">
                <li className="for-item">Compradores de imóveis acima de R$1,5M na Barra da Tijuca e Recreio</li>
                <li className="for-item">Profissionais e executivos que valorizam seu tempo</li>
                <li className="for-item">Quem quer negociação profissional com dados reais</li>
                <li className="for-item">Compradores em relocação nacional ou internacional</li>
                <li className="for-item">Quem busca discrição total no processo de compra</li>
              </ul>
            </div>
            <div>
              <span className="for-col-head">Para quem não é</span>
              <ul className="for-list">
                <li className="for-item">Quem busca imóveis abaixo de R$1,5M</li>
                <li className="for-item">Investidores em volume que priorizam velocidade sobre análise</li>
                <li className="for-item">Quem prefere negociar sozinho sem suporte técnico</li>
                <li className="for-item">Compradores satisfeitos com o modelo tradicional de corretagem</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec sec-ink" id="faq">
        <div className="wrap">
          <span className="overline" style={{ color: 'var(--gold3)', display: 'block', marginBottom: 20 }}>Perguntas frequentes</span>
          <h2 className="display display-md" style={{ color: 'var(--txt-ink)', marginBottom: 'clamp(40px,5vw,64px)' }}>Respostas <em>diretas</em></h2>
          <div className="faq-wrap">
            {[
              { q: 'O que é um Personal Shopper Imobiliário?', a: 'É um profissional que representa exclusivamente o comprador. Meu trabalho é identificar o imóvel certo, analisar se o preço é justo, fazer due diligence técnica e negociar em seu nome. O modelo existe há décadas nos EUA, Austrália e Espanha. No Brasil, é uma categoria nova — e é exatamente o que diferencia minha atuação do corretor tradicional.' },
              { q: 'Qual a diferença para um corretor tradicional?', a: 'O corretor ganha uma porcentagem sobre o preço final: quanto mais caro você paga, mais ele recebe. Eu ganho sobre a economia gerada: quanto mais barato você compra, mais eu recebo. É uma diferença estrutural de incentivos que muda completamente como a negociação acontece.' },
              { q: 'Para quais imóveis o serviço é indicado?', a: 'Imóveis acima de R$1,5M na Barra da Tijuca, Recreio e região. Apartamentos, coberturas e casas em condomínio de alto padrão. Atuamos tanto em imóveis que você já identificou quanto na busca completa para quem ainda está pesquisando.' },
              { q: 'Como garantir que você está do meu lado?', a: 'Através de um contrato de representação exclusiva assinado antes de qualquer ação. Minha remuneração depende da sua economia real — não do fechamento. E com CRECI ativo e credenciamento como Perito Avaliador pelo TJRJ, respondo profissional e legalmente pelo trabalho.' },
              { q: 'Como iniciar?', a: 'Agende um Diagnóstico Estratégico Gratuito — sem compromisso e sem venda de imóveis. Em 30 minutos, entendemos suas necessidades, avaliamos seu momento de compra e explicamos como podemos atuar. Se fizer sentido para ambos, definimos os próximos passos.' }
            ].map((faq, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q"><span className="faq-q-text">{faq.q}</span><span className="faq-icon">+</span></summary>
                <p className="faq-a">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="sec sec-vellum2" id="contato">
        <div className="wrap">
          <div className="form-layout">
            <div className="form-intro">
              <span className="overline">Próximo passo</span>
              <h2>O próximo passo não é <em>visitar imóveis.</em></h2>
              <p>É entender o cenário. Preencha ao lado e entraremos em contato em até 24 horas para agendar seu Diagnóstico Estratégico Gratuito.</p>
              <div className="form-intro-motto">Nosso trabalho não é vender imóveis.<br/>É garantir que você tome a decisão certa.<br/><strong>Se não fizer sentido para você e pra mim, não seguimos.</strong></div>
            </div>
            <div>
              <div className="form-card">
                {!formSubmitted ? (
                  <form ref={formRef} onSubmit={handleFormSubmit}>
                    <div className="form-group"><label className="form-label" htmlFor="nome">Nome completo</label><input className="form-input" type="text" id="nome" name="nome" placeholder="Seu nome" required /></div>
                    <div className="form-group"><label className="form-label" htmlFor="whatsapp">WhatsApp</label><input className="form-input" type="tel" id="whatsapp" name="whatsapp" placeholder="(21) 9 0000-0000" required /></div>
                    <div className="form-group"><label className="form-label" htmlFor="email">E-mail</label><input className="form-input" type="email" id="email" name="email" placeholder="seu@email.com.br" required /></div>
                    <div className="form-group"><label className="form-label" htmlFor="orcamento">Faixa de investimento</label><select className="form-select" id="orcamento" name="orcamento" required defaultValue=""><option value="" disabled>Selecione</option><option>R$1,5M a R$2,5M</option><option>R$2,5M a R$5M</option><option>R$5M a R$10M</option><option>Acima de R$10M</option></select></div>
                    <div className="form-group"><label className="form-label" htmlFor="tipo">Tipo de imóvel</label><select className="form-select" id="tipo" name="tipo" defaultValue=""><option value="" disabled>Selecione</option><option>Apartamento</option><option>Cobertura</option><option>Casa em condomínio</option><option>Ainda estou definindo</option></select></div>
                    <div className="form-group"><label className="form-label" htmlFor="momento">Momento da compra</label><select className="form-select" id="momento" name="momento" defaultValue=""><option value="" disabled>Selecione</option><option>Imediato (até 3 meses)</option><option>Curto prazo (3–6 meses)</option><option>Médio prazo (6–12 meses)</option><option>Explorando opções</option></select></div>
                    <button type="submit" className="btn btn-gold form-submit">Solicitar Diagnóstico Estratégico</button>
                    <p className="form-note">Retorno em até 24 horas · Sem compromisso</p>
                  </form>
                ) : (
                  <div className="form-success" style={{ display: 'block' }}>
                    <h3>Solicitação recebida.</h3>
                    <p style={{ marginTop: 8 }}>Entraremos em contato em até 24 horas.</p>
                    <p style={{ marginTop: 16, fontSize: 11, color: 'var(--txt-vel3)' }}>Ou entre em contato diretamente:<br/><a href="https://wa.me/5521964075124" style={{ color: 'var(--gold3)' }}>WhatsApp (21) 96407-5124</a></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="footer-top">
            <div>
              <div className="footer-brand-row">
                <img src={godoyLogo} alt="Godoy Prime" />
                <span className="footer-brand-name">Godoy <span>Prime</span> Realty</span>
              </div>
              <p className="footer-desc">Marcus Godoy — Personal Shopper Imobiliário. Representação exclusiva do comprador em imóveis de alto padrão na Barra da Tijuca e Recreio.</p>
            </div>
            <div className="footer-contacts">
              <a href="tel:+552140400067">(21) 4040-0067</a>
              <a href="https://wa.me/5521964075124">WhatsApp (21) 96407-5124</a>
              <a href="mailto:marcus@godoyprime.com.br">marcus@godoyprime.com.br</a>
              <span>Barra da Tijuca, Rio de Janeiro</span>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 Godoy Prime Realty</span>
            <span className="footer-copy">CRECI/RJ: 11.841 PJ | 80.199 PF · Perito Avaliador TJRJ</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageV4;
