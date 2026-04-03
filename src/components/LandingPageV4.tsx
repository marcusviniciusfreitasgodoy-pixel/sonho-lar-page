import { useEffect, useRef, useState, useCallback, type RefCallback } from 'react';
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

// Scroll-reveal hook
function useScrollReveal(): RefCallback<HTMLElement> {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pendingNodesRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      pendingNodesRef.current.forEach((node) => node.classList.add('revealed'));
      pendingNodesRef.current.clear();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observerRef.current = observer;
    pendingNodesRef.current.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, []);

  return useCallback((node: HTMLElement | null) => {
    if (!node) return;

    pendingNodesRef.current.add(node);

    if (observerRef.current) {
      observerRef.current.observe(node);
    }
  }, []);
}

const LandingPageV4 = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const reveal = useScrollReveal();

  useEffect(() => {
    const handler = () => setNavSolid(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

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
    if (typeof (window as any).fbq !== 'undefined') (window as any).fbq('track', 'Lead', { currency: 'BRL', value: 10000 });
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
    {
      btn: 'Executivo com prazo',
      av: 'RM', name: 'Ricardo M. — Diretor Executivo',
      detail: '52 anos · Barra da Tijuca · R$3,2M',
      situacao: 'Tinha 90 dias para fechar. Visitou 4 imóveis sem conseguir comparar tecnicamente o preço por m² variava 40% sem explicação.',
      results: [{ val: 'R$340k', label: 'Economia na negociação' }, { val: 'R$180k', label: 'Risco evitado (vistoria)' }, { val: '6', label: 'Imóveis avaliados' }]
    },
    {
      btn: 'Profissional que quase errou',
      av: 'CS', name: 'Carla S. — Sócia de escritório jurídico',
      detail: '45 anos · Leblon → Barra · R$2,1M',
      situacao: 'Recebeu indicação de um corretor que também representava o vendedor. Preço 18% acima da mediana real. Ata de assembleia revelou ação judicial por infiltrações.',
      results: [{ val: 'R$250k', label: 'Economia no imóvel certo' }, { val: 'Zero', label: 'Risco jurídico' }, { val: '1', label: 'Visita até fechar' }]
    },
    {
      btn: 'Empresário, ticket maior',
      av: 'FP', name: 'Fernando P. — Empresário',
      detail: '58 anos · Recreio · R$4,8M',
      situacao: 'Corretor dizia que "não existe parâmetro de preço em condomínio fechado". Existia — registrado em cartório. Tempo de revenda: 18+ meses.',
      results: [{ val: 'R$420k', label: 'Redução no preço final' }, { val: 'Revelado', label: 'Risco de liquidez' }, { val: 'Dados', label: 'Onde havia feeling' }]
    }
  ];

  return (
    <div className="landing-v4">
      {/* NAV */}
      <nav className={`${navSolid ? 'solid' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={handleAnchorClick}>
            <img src={godoyLogo} alt="Godoy Prime Realty" />
            <span className="nav-logo-text">Godoy <span>Prime</span> <span className="nav-logo-sub">Realty</span></span>
          </a>
          <ul className="nav-menu">
            <li><a href="#conceito" onClick={handleAnchorClick}>Conceito</a></li>
            <li><a href="#como-funciona" onClick={handleAnchorClick}>Processo</a></li>
            <li><a href="#servicos" onClick={handleAnchorClick}>Serviços</a></li>
            <li><a href="#sobre" onClick={handleAnchorClick}>Sobre</a></li>
            <li><a href="#faq" onClick={handleAnchorClick}>FAQ</a></li>
          </ul>
          <a href="#contato" className="nav-cta" onClick={handleAnchorClick}>Diagnóstico Gratuito</a>
          <button className="nav-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#conceito" onClick={(e) => { handleAnchorClick(e); setMobileMenuOpen(false); }}>Conceito</a>
            <a href="#como-funciona" onClick={(e) => { handleAnchorClick(e); setMobileMenuOpen(false); }}>Processo</a>
            <a href="#servicos" onClick={(e) => { handleAnchorClick(e); setMobileMenuOpen(false); }}>Serviços</a>
            <a href="#sobre" onClick={(e) => { handleAnchorClick(e); setMobileMenuOpen(false); }}>Sobre</a>
            <a href="#faq" onClick={(e) => { handleAnchorClick(e); setMobileMenuOpen(false); }}>FAQ</a>
            <a href="#contato" className="mobile-menu-cta" onClick={(e) => { handleAnchorClick(e); setMobileMenuOpen(false); }}>Diagnóstico Gratuito</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-img" style={{ backgroundImage: `url(${heroImage})` }}></div>
        <div className="hero-gradient"></div>
        <div className="hero-gradient2"></div>
        <div className="hero-content">
          <h1 className="hero-headline">Comprar imóvel de alto padrão sem representação exclusiva é o <em>erro mais caro</em> do mercado imobiliário.</h1>
          <p className="hero-sub">Eu represento compradores exigentes usando dados de transações reais da região, curadoria técnica e negociação profissional. Sem conflito de interesses.</p>
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

      {/* 2. O PROBLEMA + POR QUE PAGAR (merged) */}
      <section ref={reveal} className="sec sec-vellum scroll-reveal" id="conceito">
        <div className="wrap">
          <span className="overline" style={{ color: 'var(--gold3)', display: 'block', marginBottom: 20 }}>O problema</span>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(28px,4.5vw,46px)', lineHeight: 1.1, color: 'var(--txt-vel)', letterSpacing: '-.01em', marginBottom: 32 }}>
            O mercado não foi desenhado <em>para o comprador.</em>
          </h2>

          <div className="problem-bullets">
            <div className="problem-bullet">
              <span className="problem-bullet-icon">⚠️</span>
              <p><strong>Conflito de interesse:</strong> quanto mais caro você paga, mais o corretor ganha.</p>
            </div>
            <div className="problem-bullet">
              <span className="problem-bullet-icon">💸</span>
              <p><strong>Preços sem critério:</strong> sem acesso a transações reais, você negocia no escuro.</p>
            </div>
            <div className="problem-bullet">
              <span className="problem-bullet-icon">⏱️</span>
              <p><strong>Tempo desperdiçado:</strong> 30–40 visitas desnecessárias em 2–3 meses.</p>
            </div>
            <div className="problem-bullet">
              <span className="problem-bullet-icon">🚨</span>
              <p><strong>Riscos invisíveis:</strong> problemas estruturais, documentação irregular, condomínio em litígio.</p>
            </div>
          </div>

          {/* Callout "por que pagar" */}
          <div className="prob-callout" style={{ marginTop: 32 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold3)', marginBottom: 8 }}>A pergunta que todo comprador faz</p>
              <p className="prob-callout-text">"O corretor não me cobra nada"  porque é pago pelo <strong>vendedor</strong>, para vender pelo maior preço possível. <em>Você está na negociação mais cara da sua vida sem ninguém do seu lado.</em></p>
            </div>
            <a href="#contato" className="btn btn-outline-dark btn-sm" onClick={handleAnchorClick}>→ Diagnóstico Gratuito</a>
          </div>
        </div>
      </section>

      {/* 3. O MODELO (condensed mission) */}
      <section ref={reveal} className="sec sec-ink scroll-reveal" id="representacao">
        <div className="wrap">
          <span className="overline" style={{ color: 'var(--gold3)', display: 'block', marginBottom: 20 }}>O modelo</span>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(28px,4.5vw,46px)', lineHeight: 1.1, color: 'var(--txt-ink)', letterSpacing: '-.01em', marginBottom: 16 }}>
            Aqui, o interesse é <em>um só: o seu.</em>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--txt-ink2)', lineHeight: 1.8, maxWidth: 600, marginBottom: 12 }}>
            Modelo consolidado nos EUA, Austrália e Espanha há décadas. Agora no Rio de Janeiro.
          </p>
          <p style={{ fontSize: 14, color: 'var(--txt-ink3)', lineHeight: 1.75, maxWidth: 600, marginBottom: 48 }}>
            Não vendo imóveis. Represento compradores com contrato exclusivo, dados reais e alinhamento total de interesses.
          </p>

          {/* Comparação simplificada */}
          <div className="compare-wrap">
            <div className="compare-heads">
              <div className="compare-head">
                <span className="compare-head-label">Corretor Tradicional</span>
                <span className="compare-pill pill-muted">Modelo atual</span>
              </div>
              <div className="compare-head">
                <span className="compare-head-label highlight">Personal Shopper</span>
                <span className="compare-pill pill-gold">Godoy Prime</span>
              </div>
            </div>
            {[
              { lbl: 'Para quem trabalha', neg: 'Para o vendedor. Contrato com quem quer vender pelo maior preço.', pos: 'Para você. Contrato com quem quer comprar pelo melhor preço.' },
              { lbl: 'Remuneração', neg: '% sobre o preço final — quanto mais caro, mais ganha.', pos: '% sobre a economia — quanto mais você economiza, mais ganho.' },
              { lbl: 'Imóveis', neg: 'Apenas portfólio próprio.', pos: 'Mercado inteiro — portais, off-market e rede direta.' },
              { lbl: 'Vistoria técnica', neg: 'Não realiza.', pos: 'Antes de você visitar. Infiltrações, documentação, histórico.' },
              { lbl: 'Negociação', neg: 'Para fechar rápido.', pos: 'Para obter o melhor preço com dados.' }
            ].map((r, i) => (
              <div key={i} className="compare-row">
                <div className="compare-cell cell-neg">
                  <div className="cc-lbl">{r.lbl}</div>
                  <span className="cc-source-tag tag-muted">Corretor Tradicional</span>
                  <div className="cc-val neg">{r.neg}</div>
                </div>
                <div className="compare-cell cell-pos">
                  <div className="cc-lbl">{r.lbl}</div>
                  <span className="cc-source-tag tag-gold">Godoy Prime</span>
                  <div className="cc-val pos">{r.pos}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section ref={reveal} className="sec sec-vellum2 scroll-reveal" id="como-funciona">
        <div className="wrap">
          <div className="steps-intro">
            <div>
              <span className="overline">Como trabalhamos</span>
              <h2>Dados de transações reais — não anúncios — para determinar o <em>valor justo.</em></h2>
            </div>
            <p>Cada etapa protege sua decisão e seu capital. Sem atalhos, sem pressão.</p>
          </div>
          <div className="steps-list">
            {[
              { n: '01', title: 'Entendimento', text: 'Perfil, orçamento, prioridades e prazo antes de qualquer busca.' },
              { n: '02', title: 'Leitura de Mercado', text: 'Transações reais da região para identificar o valor justo.' },
              { n: '03', title: 'Curadoria', text: 'Visitamos e filtramos. Você vê apenas o que faz sentido.' },
              { n: '04', title: 'Análise Comparativa', text: 'Metodologia técnica: estrutura, documentação, m².' },
              { n: '05', title: 'Até a Assinatura', text: 'Negociação em seu nome até o fechamento.' }
            ].map((s, i) => (
              <div key={i} className="step-card"><div className="step-card-n">{s.n}</div><div className="step-card-title">{s.title}</div><div className="step-card-text">{s.text}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NA PRÁTICA (3 scenarios, shortened) */}
      <section ref={reveal} className="sec sec-ink2 scroll-reveal" id="na-pratica">
        <div className="wrap">
          <div className="sc-header">
            <span className="overline">Na prática</span>
            <h2>O que muda quando há <em>alguém do seu lado</em></h2>
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
                    <div className="sc-av">{s.av}</div>
                    <div><div className="sc-name">{s.name}</div><div className="sc-detail">{s.detail}</div></div>
                  </div>
                  <span className="sc-badge">Cenário Ilustrativo</span>
                </div>
                <div className="sc-body-compact">
                  <p className="sc-sit-text">{s.situacao}</p>
                </div>
                <div className="sc-results">
                  {s.results.map((r, ri) => (
                    <div key={ri} className="sc-res-item"><div className="sc-res-val">{r.val}</div><div className="sc-res-label">{r.label}</div></div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <p className="sc-footer-note">Cenários ilustrativos baseados na dinâmica real do mercado de alto padrão da Barra da Tijuca e Recreio. Valores representam o tipo de análise conduzida — não casos individuais identificáveis.</p>
        </div>
      </section>

      {/* 6. SERVIÇOS + GARANTIA (integrated) */}
      <section ref={reveal} className="sec sec-vellum scroll-reveal" id="servicos">
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
              <p className="prod-desc">Análise técnica para validar o valor real de um imóvel que você já identificou. Transações reais, histórico de valorização e recomendação de oferta.</p>
              <div className="prod-price">R$4.900 <small>a partir de</small></div>
              <a href="#" className="btn btn-outline-dark btn-sm" onClick={(e) => ctaServico(e, 'Parecer Godoy Prime', 'Olá Marcus! Tenho interesse no *Parecer Godoy Prime*. Gostaria de entender melhor como funciona.')}>Solicitar Parecer →</a>
            </div>
            <div className="prod-card">
              <div className="prod-number">02</div>
              <div className="prod-tag">Validação e Negociação</div>
              <div className="prod-name">Compra Blindada</div>
              <div className="prod-type">Da análise à assinatura</div>
              <div className="prod-divider"></div>
              <p className="prod-desc">Para quem já tem um imóvel em vista. Avaliação técnica, negociação ativa e acompanhamento documental completo.</p>
              <div className="prod-price">R$10.000 <small>a partir de</small></div>
              <a href="#" className="btn btn-outline-dark btn-sm" onClick={(e) => ctaServico(e, 'Compra Blindada', 'Olá Marcus! Tenho interesse na *Compra Blindada*. Gostaria de entender melhor como funciona.')}>Blindar Minha Compra →</a>
            </div>
            <div className="prod-card" style={{ position: 'relative', border: '1px solid rgba(200,164,94,.25)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,var(--gold3),transparent)', opacity: 1 }}></div>
              <div className="prod-number">03</div>
              <div className="prod-tag">Busca Completa</div>
              <div className="prod-name">Prime Buyer Experience</div>
              <div className="prod-type">Jornada integral</div>
              <div className="prod-divider"></div>
              <p className="prod-desc">Curadoria ativa, visitas técnicas, negociação blindada e suporte pós-compra. Você visita 5–8 imóveis, não 30–40.</p>
              <div style={{ background: 'rgba(200,164,94,.07)', border: '1px solid rgba(200,164,94,.2)', borderRadius: 2, padding: '14px 16px', marginBottom: 20 }}>
                <div style={{ fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--gold3)', marginBottom: 6 }}>Compromisso</div>
                <p style={{ fontSize: 12.5, color: 'var(--txt-vel2)', lineHeight: 1.65 }}>Se a economia não superar o honorário, <strong style={{ color: 'var(--txt-vel)' }}>você não paga.</strong></p>
              </div>
              <div className="prod-price">Sob consulta</div>
              <a href="#" className="btn btn-outline-dark btn-sm" onClick={(e) => ctaServico(e, 'Prime Buyer Experience', 'Olá Marcus! Tenho interesse no *Prime Buyer Experience*. Gostaria de entender melhor como funciona.')}>Solicitar Proposta →</a>
            </div>
          </div>
          <p className="prod-note">O valor do Parecer é abatido na Compra Blindada. O valor da Compra Blindada é abatido no Prime Buyer Experience.</p>
        </div>
      </section>

      {/* 7. MARCUS (shortened) */}
      <section ref={reveal} className="sec sec-ink2 scroll-reveal" id="sobre">
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
              <p className="marcus-bio">Corretor com CRECI ativo e Perito Avaliador credenciado pelo TJRJ. Atuação exclusiva para compradores de imóveis de alto padrão na Barra da Tijuca e Recreio. O modelo tradicional cria um conflito estrutural — a Godoy Prime existe para eliminá-lo.</p>
              <div className="marcus-creds">
                <div className="marcus-cred"><div className="marcus-cred-dot"></div>CRECI/RJ: 80.199 PF | 11.841 PJ</div>
                <div className="marcus-cred"><div className="marcus-cred-dot"></div>Perito Avaliador — TJRJ</div>
                <div className="marcus-cred"><div className="marcus-cred-dot"></div>Especialização em alto padrão — Barra e Recreio</div>
              </div>
              <div className="marcus-motto">"Meu trabalho não é vender imóveis. É garantir que você <strong>tome a decisão certa</strong> — com dados, sem pressão."</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section ref={reveal} className="sec sec-ink scroll-reveal" id="faq">
        <div className="wrap">
          <span className="overline" style={{ color: 'var(--gold3)', display: 'block', marginBottom: 20 }}>Perguntas frequentes</span>
          <h2 className="display display-md" style={{ color: 'var(--txt-ink)', marginBottom: 'clamp(40px,5vw,64px)' }}>Respostas <em>diretas</em></h2>
          <div className="faq-wrap">
            {[
              { q: 'O que é um Personal Shopper Imobiliário?', a: 'Um profissional que representa exclusivamente o comprador — identificando o imóvel certo, analisando preço justo, fazendo due diligence e negociando em seu nome. Modelo consolidado há décadas nos EUA, Austrália e Espanha.' },
              { q: 'Qual a diferença para um corretor?', a: 'O corretor ganha % sobre o preço final: quanto mais caro, mais ele recebe. Eu ganho sobre a economia: quanto mais barato você compra, mais eu recebo.' },
              { q: 'Para quais imóveis?', a: 'Acima de R$1,5M na Barra da Tijuca, Recreio e região. Apartamentos, coberturas e casas em condomínio de alto padrão.' },
              { q: 'Como garantir que está do meu lado?', a: 'Contrato de representação exclusiva assinado antes de qualquer ação. Remuneração vinculada à sua economia real. CRECI ativo e credenciamento como Perito Avaliador pelo TJRJ.' },
              { q: 'Como iniciar?', a: 'Agende um Diagnóstico Estratégico Gratuito — sem compromisso. Em 30 minutos avaliamos seu momento de compra e definimos se faz sentido seguir.' }
            ].map((faq, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q"><span className="faq-q-text">{faq.q}</span><span className="faq-icon">+</span></summary>
                <p className="faq-a">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FORM */}
      <section ref={reveal} className="sec sec-vellum2 scroll-reveal" id="contato">
        <div className="wrap">
          <div className="form-layout">
            <div className="form-intro">
              <span className="overline">Próximo passo</span>
              <h2>O próximo passo não é <em>visitar imóveis.</em></h2>
              <p>Preencha ao lado e entraremos em contato em até 24 horas para agendar seu Diagnóstico Estratégico Gratuito.</p>
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
              <p className="footer-desc">Marcus Godoy — Personal Shopper Imobiliário. Representação exclusiva do comprador na Barra da Tijuca e Recreio.</p>
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
