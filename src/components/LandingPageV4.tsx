import { useEffect, useRef, useState, useCallback, type RefCallback } from 'react';
import '@/styles/landing-v4.css';
import heroImage from '@/assets/barra-hero-new.jpg';
import marcusProfile from '@/assets/marcus-profile.jpg';
import godoyLogo from '@/assets/godoy-logo.png';

const MARCUS_EMAIL = 'marcus@godoyprime.com.br';
const MARCUS_WA = '5521964075124';
const BACKEND_URL = import.meta.env.VITE_SUPABASE_URL;
const BACKEND_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type BackendClient = (typeof import('@/integrations/supabase/client'))['supabase'];

let backendClientPromise: Promise<BackendClient> | null = null;

async function getBackendClient() {
  if (!BACKEND_URL || !BACKEND_PUBLISHABLE_KEY) return null;
  if (!backendClientPromise) {
    backendClientPromise = import('@/integrations/supabase/client').then(({ supabase }) => supabase);
  }
  return backendClientPromise;
}

async function sendEmail(to: string, _toName: string, subject: string, htmlBody: string) {
  try {
    const client = await getBackendClient();
    if (!client) { console.warn('Email send skipped: backend client env not available.'); return; }
    const { error } = await client.functions.invoke('send-email', { body: { to, subject, html: htmlBody } });
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
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Faixa de investimento</td><td style="padding:8px 0;font-size:13px">${dados.orcamento || '-'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Tipo de imóvel</td><td style="padding:8px 0;font-size:13px">${dados.tipoImovel || '-'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Momento da compra</td><td style="padding:8px 0;font-size:13px">${dados.momento || '-'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Mensagem</td><td style="padding:8px 0;font-size:13px">${dados.mensagem || '-'}</td></tr>
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
          if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observerRef.current = observer;
    pendingNodesRef.current.forEach((node) => observer.observe(node));
    return () => { observer.disconnect(); observerRef.current = null; };
  }, []);

  return useCallback((node: HTMLElement | null) => {
    if (!node) return;
    pendingNodesRef.current.add(node);
    if (observerRef.current) observerRef.current.observe(node);
  }, []);
}

const LandingPageV4 = () => {
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
      tipoImovel: (form.querySelector('#tipo-imovel') as HTMLSelectElement).value,
      momento: (form.querySelector('#momento') as HTMLSelectElement).value,
      mensagem: (form.querySelector('#mensagem') as HTMLTextAreaElement).value,
      servico: 'Diagnóstico Estratégico',
      origem: 'formulario_principal',
      data: new Date().toLocaleString('pt-BR')
    };
    if (typeof (window as any).fbq !== 'undefined') (window as any).fbq('track', 'Lead', { currency: 'BRL', value: 10000 });
    sendEmail(MARCUS_EMAIL, 'Marcus Godoy', '🏠 Novo lead — ' + dados.nome + ' | ' + dados.servico, emailParaMarcus(dados));
    setFormSubmitted(true);
  };

  const ctaServico = (e: React.MouseEvent, servico: string, msgWa: string) => {
    e.preventDefault();
    window.open('https://wa.me/' + MARCUS_WA + '?text=' + encodeURIComponent(msgWa), '_blank');
    const dados = { nome: 'Lead via CTA', whatsapp: '-', servico, origem: 'cta_servico', data: new Date().toLocaleString('pt-BR') };
    sendEmail(MARCUS_EMAIL, 'Marcus Godoy', '🏠 Interesse em ' + servico + ' — clique via CTA', emailParaMarcus(dados));
    if (typeof (window as any).fbq !== 'undefined') (window as any).fbq('track', 'InitiateCheckout', { content_name: servico });
  };

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
          <h1 className="hero-headline text-3xl">Comprar imóvel de alto padrão sem representation exclusiva é o <em>erro mais caro</em> do mercado imobiliário.</h1>
          <div className="hero-sub-wrap">
            <p className="hero-sub">No mercado tradicional, três pessoas ganham mais quando você paga mais caro: o vendedor, o corretor e a imobiliária. Você é o único sem ninguém realmente do seu lado.</p>
            <p className="hero-sub">Eu mudo essa equação. Represento exclusivamente o comprador e meus honorários crescem quando sua economia cresce.</p>
          </div>
          <div className="hero-actions">
            <a href="#contato" className="btn btn-gold" onClick={handleAnchorClick}>Agendar Diagnóstico Estratégico Gratuito</a>
            <a href="#conceito" className="btn btn-outline" onClick={handleAnchorClick}>Entender o conceito</a>
          </div>
          <p className="hero-note">Conversa direta · Sem compromisso · Sem venda de imóveis</p>
        </div>
      </section>

      {/* 2. O PROBLEMA */}
      <section ref={reveal} className="sec sec-vellum scroll-reveal" id="conceito">
        <div className="wrap">
          <span className="overline" style={{ color: 'var(--gold3)', display: 'block', marginBottom: 20 }}>O problema</span>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(28px,4.5vw,46px)', lineHeight: 1.1, color: 'var(--txt-vel)', letterSpacing: '-.01em', marginBottom: 32 }}>
            O mercado não foi desenhado <em>para o comprador.</em>
          </h2>

          <div className="problem-text-block">
            <p>Você já sabe que algo está errado. Sente quando visita o décimo imóvel inadequado num sábado. Sente quando o corretor insiste que "o preço é justo" sem mostrar um único dado real ou justificativa lógica baseada em fatos e dados. Sente quando percebe que todos na mesa ganham mais se você aceitar o valor pedido.</p>
            <p style={{ marginTop: 20 }}>Esse desequilíbrio tem nome: <strong>Assimetria de Lealdade.</strong></p>
            <div className="problem-list">
              <p>— O vendedor quer o maior preço possível.</p>
              <p>— O corretor e a imobiliária recebem percentual do valor final: quanto mais caro, mais eles ganham.</p>
            </div>
            <p style={{ marginTop: 20 }}>Você é o único beneficiado quando o preço cai. E o único sem ninguém pago para defender esse lado.</p>
            <p style={{ marginTop: 16 }}>Não é desconfiança irracional. É percepção técnica correta de um sistema estruturalmente viciado contra seus interesses.</p>
          </div>

          <div className="prob-callout" style={{ marginTop: 32 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold3)', marginBottom: 8 }}>A pergunta que todo comprador faz</p>
              <p className="prob-callout-text">"O corretor não me cobra nada." Simplesmente porque é pago pelo vendedor, para vender pelo maior preço possível. <em>Você provavelmente está na negociação mais cara da sua vida sem ninguém REALMENTE do seu lado.</em></p>
            </div>
            <a href="#contato" className="btn btn-outline-dark btn-sm" onClick={handleAnchorClick}>→ Diagnóstico Estratégico Gratuito</a>
          </div>
        </div>
      </section>

      {/* 3. O MODELO */}
      <section ref={reveal} className="sec sec-ink scroll-reveal" id="representacao">
        <div className="wrap">
          <span className="overline" style={{ color: 'var(--gold3)', display: 'block', marginBottom: 20 }}>O modelo</span>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(28px,4.5vw,46px)', lineHeight: 1.1, color: 'var(--txt-ink)', letterSpacing: '-.01em', marginBottom: 16 }}>
            Aqui, o interesse é <em>um só: o seu.</em>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--txt-ink2)', lineHeight: 1.8, maxWidth: 600, marginBottom: 12 }}>
            Modelo consolidado nos EUA, Austrália e Espanha há décadas. Agora no Rio de Janeiro.
          </p>
          <p style={{ fontSize: 14, color: 'var(--txt-ink3)', lineHeight: 1.75, maxWidth: 600, marginBottom: 16 }}>
            Não vendo imóveis. Represento compradores com contrato exclusivo, dados reais e alinhamento total de interesses.
          </p>
          <p style={{ fontSize: 14, color: 'var(--txt-ink3)', lineHeight: 1.75, maxWidth: 700, marginBottom: 48 }}>
            Veja a diferença estrutural lado a lado. Não é questão de qualidade profissional — é questão de para quem cada modelo foi desenhado para servir:
          </p>

          <div className="compare-wrap">
            <div className="compare-heads">
              <div className="compare-head">
                <span className="compare-head-label">Corretor Tradicional</span>
                <span className="compare-pill pill-muted">Modelo atual</span>
              </div>
              <div className="compare-head">
                <span className="compare-head-label highlight">Personal Shopper — Godoy Prime</span>
                <span className="compare-pill pill-gold">Godoy Prime</span>
              </div>
            </div>
            {[
              { lbl: 'Para quem trabalha', neg: 'Para o vendedor. Contrato com quem quer vender pelo maior preço.', pos: 'Para você. Contrato com quem quer comprar pelo melhor preço.' },
              { lbl: 'Remuneração', neg: '% sobre o preço final. Quanto mais caro, mais ganha.', pos: 'Vinculada à sua economia. Quanto mais você economiza, mais ganho.' },
              { lbl: 'Imóveis disponíveis', neg: 'Apenas portfólio próprio ou de quem faz parceria.', pos: 'Mercado inteiro: portais, off-market e rede direta.' },
              { lbl: 'Vistoria técnica', neg: 'Não realiza.', pos: 'Antes de você visitar. Infiltrações, documentação, histórico.' },
              { lbl: 'Negociação', neg: 'Para fechar rápido pelo maior valor.', pos: 'Para obter o melhor preço com dados de transações reais.' },
              { lbl: 'Quem assume o risco', neg: 'Você. Se pagar caro, o prejuízo é seu.', pos: 'Eu. Se você não economizar, quase não recebo.' }
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

      {/* 4. COMO TRABALHAMOS */}
      <section ref={reveal} className="sec sec-vellum2 scroll-reveal" id="como-funciona">
        <div className="wrap">
          <div className="steps-intro">
            <div>
              <span className="overline">Como trabalhamos</span>
              <h2>Cada etapa foi desenhada para proteger sua <em>decisão e seu investimento.</em></h2>
            </div>
            <p>Usamos dados de transações reais e oficiais, não anúncios inflados com preços "emocionais" para determinar o que o imóvel realmente vale. Sem atalhos. Sem pressão.</p>
          </div>
          <div className="steps-list">
            {[
              { n: '01', title: 'Perfil Decodificado', text: 'Mapeamento do seu DNA de comprador: orçamento real, prioridades técnicas e prazo. Elimina 90% do mercado antes que você perca um fim de semana.' },
              { n: '02', title: 'Rastreio On e Off-Market', text: 'Analisamos imóveis anunciados e imóveis que nunca chegam aos portais públicos, reservados para compradores com representante confiável que fecha com segurança.' },
              { n: '03', title: 'Vistoria Técnica e Documental', text: 'Vistoria presencial com fotos antes da sua visita. Isso evita a perda de tempo com visitas improdutivas e fora do seu padrão definido.' },
              { n: '04', title: 'Matemática Inversa', text: 'Negociação conduzida com dados de transações reais da região e não com intuição. Argumentos baseados em dados oficiais que derrubam o preço inflado sem confronto emocional.' },
              { n: '05', title: 'Due Diligence', text: 'Infiltrações, histórico de manutenção, ações judiciais, débitos ocultos. Só fazemos uma proposta no imóvel que já passou no crivo técnico.' },
              { n: '06', title: 'Escritura Blindada', text: 'Fechamento completo com acompanhamento documental até a transferência do imóvel. Você assina com a certeza de quem comprou com dados, não com esperança.' }
            ].map((s, i) => (
              <div key={i} className="step-card"><div className="step-card-n">{s.n}</div><div className="step-card-title">{s.title}</div><div className="step-card-text">{s.text}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NA PRÁTICA */}
      <section ref={reveal} className="sec sec-ink2 scroll-reveal" id="na-pratica">
        <div className="wrap">
          <div className="sc-header">
            <span className="overline">Na prática</span>
            <h2>O que os dados do mercado revelam sobre compradores <em>sem representação exclusiva</em></h2>
            <p style={{ fontSize: 14, color: 'var(--txt-ink2)', lineHeight: 1.8, maxWidth: 700, marginTop: 16 }}>O mercado de alto padrão da Barra da Tijuca e Recreio tem padrões documentados em transações reais. Estes são os cenários mais recorrentes e o que muda quando há alguém tecnicamente do seu lado:</p>
          </div>

          {/* Perfil A */}
          <div className="profile-card">
            <div className="profile-card-header">
              <span className="profile-badge">Perfil A</span>
              <span className="profile-title">Executivo com prazo definido (ticket R$2,5M–R$4M)</span>
            </div>
            <div className="profile-card-body">
              <p>Sem acesso a dados reais, o preço por m² varia até 40% dentro do mesmo condomínio sem nenhuma explicação técnica. O comprador desprotegido não tem como saber se está pagando na baixa ou na alta da curva de preços.</p>
              <p style={{ marginTop: 16 }}>Análise comparativa com transações reais identifica, em média, um espaço real de negociação que o corretor tradicional não tem incentivo algum para revelar, porque revelar esse dado reduz a comissão dele.</p>
              <div className="profile-changes">
                <p className="profile-changes-title">O que muda com representação exclusiva:</p>
                <p>→ Acesso ao valor real por m² baseado em fechamentos registrados e não somente em anúncios e "achismos"</p>
                <p>→ Negociação conduzida com dados irrefutáveis e não com intuição ou pressão emocional</p>
                <p>→ Decisão tomada em semanas, não em meses de paralisia</p>
              </div>
            </div>
          </div>

          {/* Perfil B */}
          <div className="profile-card" style={{ marginTop: 24 }}>
            <div className="profile-card-header">
              <span className="profile-badge">Perfil B</span>
              <span className="profile-title">Ticket acima de R$4M em condomínio fechado</span>
            </div>
            <div className="profile-card-body">
              <p>O argumento de que "não existe parâmetro de preço nesse segmento" é o mais comum e o mais conveniente para quem vende. Existe parâmetro, desde que seja feita uma vistoria e um estudo de mercado completo. Dados reais de transações realizadas mostram imóveis com e sem liquidez comprovada e o tempo médio de revenda nessa faixa de preço.</p>
              <div className="profile-changes">
                <p className="profile-changes-title">O que muda com representação exclusiva:</p>
                <p>→ Análise de liquidez real baseada em histórico de transações e não em promessas do vendedor</p>
                <p>→ Valuation independente que destrói o argumento de "preço sem parâmetro"</p>
                <p>→ Decisão patrimonial tomada com inteligência de mercado e não com fé de que a informação é real</p>
              </div>
            </div>
          </div>

          <p className="sc-footer-note">Estes cenários refletem padrões documentados em transações reais da Barra da Tijuca e Recreio. Não são casos de clientes identificáveis, são o retrato do que o mercado faz sistematicamente com compradores desprotegidos.</p>
        </div>
      </section>

      {/* 6. SERVIÇOS */}
      <section ref={reveal} className="sec sec-vellum scroll-reveal" id="servicos">
        <div className="wrap">
          <div className="prod-header">
            <span className="overline">Serviços</span>
            <h2>Três pontos de entrada. Uma única missão: <em>proteger sua decisão e seu capital.</em></h2>
            <p style={{ fontSize: 14, color: 'var(--txt-vel2)', lineHeight: 1.85, maxWidth: 600, marginTop: 16 }}>Dependendo de onde você está na jornada de compra, o ponto de entrada muda. Os três serviços foram desenhados para se encaixar no seu momento — e cada investimento anterior é abatido no próximo nível.</p>
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
          <p className="prod-note">Parecer Godoy Prime → Compra Blindada → Prime Buyer Experience™ — O valor de cada etapa é abatido na próxima.</p>
        </div>
      </section>

      {/* 7. SOBRE MARCUS */}
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
              <span className="overline">Sobre</span>
              <h2>O defensor que o mercado <em>não quer que você encontre.</em></h2>
              <p className="marcus-bio">Sou Marcus Godoy. Trabalhei dentro do mercado imobiliário tradicional tempo suficiente para entender exatamente como ele funciona e por que ele opera estruturalmente contra o comprador.</p>
              <p className="marcus-bio">A decisão de representar exclusivamente compradores foi a estratégia de posicionamento que me permitiu oferecer um serviço diferenciado, justo e qualificado para o Comprador de Alto Padrão.</p>
              <p className="marcus-bio">Minha remuneração está contratualmente vinculada à sua economia real.</p>
              <p className="marcus-bio"><strong>Quando você paga menos, eu ganho mais.</strong></p>
              <p className="marcus-bio">Esse alinhamento não é promessa. É matemática contratual auditável, documentada, irrevogável.</p>
              <p className="marcus-bio">O modelo tradicional cria um conflito estrutural. Existimos para eliminá-lo.</p>
              <div className="marcus-creds">
                <div className="marcus-cred"><div className="marcus-cred-dot"></div>Perito Avaliador credenciado pelo TJRJ</div>
                <div className="marcus-cred"><div className="marcus-cred-dot"></div>CRECI/RJ: 80.199 PF | 11.841 PJ</div>
                <div className="marcus-cred"><div className="marcus-cred-dot"></div>Especializado em imóveis de alto padrão — Barra da Tijuca e Recreio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section ref={reveal} className="sec sec-ink scroll-reveal" id="faq">
        <div className="wrap">
          <span className="overline" style={{ color: 'var(--gold3)', display: 'block', marginBottom: 20 }}>Perguntas frequentes</span>
          <h2 className="display display-md" style={{ color: 'var(--txt-ink)', marginBottom: 'clamp(40px,5vw,64px)' }}>As perguntas que todo comprador de alto padrão faz, respondidas com <em>dados, não com promessas.</em></h2>
          <div className="faq-wrap">
            {[
              {
                q: 'Quanto custa o serviço e quando é cobrado?',
                a: 'Depende do nível de representação que faz sentido para o seu momento. O Parecer Godoy Prime começa em R$ 4.900 e é cobrado antes da análise. A Compra Blindada e o Prime Buyer Experience™ têm estrutura de honorários vinculada à sua economia real — parte fixa, parte variável sobre o resultado.\n\nNo Diagnóstico Estratégico Gratuito, você entende exatamente qual serviço se aplica ao seu caso e qual é a estrutura completa de investimento. Sem surpresas.'
              },
              {
                q: 'Você tem acesso a imóveis que não estão nos portais?',
                a: 'Sim. Proprietários de alto padrão frequentemente não querem exposição pública — fotos na internet, visitas de curiosos, negociação aberta. Os melhores imóveis nessa faixa de preço circulam em rede fechada, entre profissionais com histórico de fechamentos sérios.\n\nParte do valor da representação exclusiva é exatamente esse acesso — não apenas ao que está anunciado, mas ao que está disponível.'
              },
              {
                q: 'Como funciona a negociação? Você fala diretamente com o vendedor?',
                a: 'Sim. Conduzo a negociação como seu representante exclusivo, com dados de transações reais como base técnica. Não negocio com intuição ou pressão emocional — negocio com argumentos que o vendedor não consegue refutar porque estão documentados em registro público.\n\nVocê acompanha cada etapa. Nenhuma proposta é feita sem sua aprovação.'
              },
              {
                q: 'Como garantir que você está do meu lado?',
                a: 'Três mecanismos estruturais — não promessas verbais:\n\n1. Contrato antes de qualquer ação. Antes de visitar um único imóvel, você tem documento assinado estabelecendo que represento exclusivamente seus interesses.\n\n2. Remuneração vinculada à sua economia. Meus honorários crescem quando o preço cai. Se você pagar o valor pedido sem redução, meu ganho é mínimo. Esse incentivo financeiro é auditável no contrato.\n\n3. Credencial técnica independente. Sou Perito Avaliador credenciado pelo TJRJ — o mesmo tribunal que avalia imóveis em disputas judiciais de alto valor.'
              },
              {
                q: 'Quanto tempo leva o processo?',
                a: 'Depende da complexidade do imóvel e da sua disponibilidade para tomar decisões com dados. Em média, clientes com critérios bem definidos fecham entre 30 e 90 dias após o início da representação.\n\nPara comparação: a média de quem busca sozinho no mercado tradicional é de 6 a 12 meses — com resultados incertos e sem validação técnica de valor real.'
              },
              {
                q: 'E se eu já encontrei um imóvel que me interessa?',
                a: 'Esse é exatamente o caso de uso do Parecer Godoy Prime. Você tem o imóvel. Eu faço a análise técnica e documental independente antes de qualquer negociação — revelando o valor real, os riscos ocultos e o espaço de negociação que o vendedor não quer que você conheça.\n\nVocê entra na negociação com dados. O vendedor entra com o preço de vitrine. A diferença é sua.'
              }
            ].map((faq, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q"><span className="faq-q-text">{faq.q}</span><span className="faq-icon">+</span></summary>
                <div className="faq-a">{faq.a.split('\n\n').map((p, pi) => <p key={pi} style={{ marginBottom: pi < faq.a.split('\n\n').length - 1 ? 12 : 0 }}>{p}</p>)}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FORMULÁRIO */}
      <section ref={reveal} className="sec sec-vellum2 scroll-reveal" id="contato">
        <div className="wrap">
          <div className="form-layout">
            <div className="form-intro">
              <span className="overline">Próximo passo</span>
              <h2>O próximo passo é entender o que o mercado <em>esconde sobre o imóvel que você quer comprar.</em></h2>
              <p>Em 30 minutos de Diagnóstico Estratégico Gratuito, você sai com:</p>
              <div className="form-intro-bullets">
                <p>→ Uma leitura real do seu momento de compra — baseada em dados, não em impressões</p>
                <p>→ Os dados que o mercado não te mostra e que definem se o preço pedido é tecnicamente justificável</p>
                <p>→ Clareza sobre se faz sentido avançar juntos — sem compromisso, sem pressão de venda</p>
              </div>
              <p style={{ marginTop: 20, fontSize: 13, color: 'var(--txt-vel2)' }}>Conversa direta com Marcus Godoy. Sem equipe de vendas. Sem roteiro de fechamento.</p>
            </div>
            <div>
              <div className="form-card">
                {!formSubmitted ? (
                  <form ref={formRef} onSubmit={handleFormSubmit}>
                    <div className="form-group"><label className="form-label" htmlFor="nome">Nome completo</label><input className="form-input" type="text" id="nome" name="nome" placeholder="Seu nome completo" required /></div>
                    <div className="form-group"><label className="form-label" htmlFor="whatsapp">WhatsApp</label><input className="form-input" type="tel" id="whatsapp" name="whatsapp" placeholder="(21) 9 0000-0000" required /></div>
                    <div className="form-group"><label className="form-label" htmlFor="email">E-mail</label><input className="form-input" type="email" id="email" name="email" placeholder="seu@email.com" required /></div>
                    <div className="form-group"><label className="form-label" htmlFor="orcamento">Faixa de investimento</label><select className="form-select" id="orcamento" name="orcamento" required defaultValue=""><option value="" disabled>Selecione</option><option>R$1,5M a R$2,5M</option><option>R$2,5M a R$5M</option><option>R$5M a R$10M</option><option>Acima de R$10M</option></select></div>
                    <div className="form-group"><label className="form-label" htmlFor="tipo-imovel">Tipo de imóvel</label><select className="form-select" id="tipo-imovel" name="tipo-imovel" required defaultValue=""><option value="" disabled>Selecione</option><option>Apartamento</option><option>Cobertura</option><option>Casa / Mansão</option><option>Terreno / Lote</option><option>Sala Comercial</option><option>Outro</option></select></div>
                    <div className="form-group"><label className="form-label" htmlFor="momento">Momento da compra</label><select className="form-select" id="momento" name="momento" required defaultValue=""><option value="" disabled>Selecione</option><option>Quero comprar nos próximos 30 dias</option><option>Estou pesquisando (1–3 meses)</option><option>Planejando para os próximos 6 meses</option><option>Apenas explorando opções</option></select></div>
                    <div className="form-group"><label className="form-label" htmlFor="mensagem">Mensagem <span style={{ fontWeight: 400, color: 'var(--txt-vel3)' }}>(opcional)</span></label><textarea className="form-input form-textarea" id="mensagem" name="mensagem" placeholder="Conte brevemente o que procura..." rows={3}></textarea></div>
                    <button type="submit" className="btn btn-gold form-submit">Agendar Diagnóstico Estratégico Gratuito</button>
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
              <p className="footer-desc">Personal Shopper Imobiliário — Representação Exclusiva do Comprador<br/>Barra da Tijuca e Recreio · Rio de Janeiro</p>
            </div>
            <div className="footer-contacts">
              <a href="tel:+552140400067">(21) 4040-0067</a>
              <a href="https://wa.me/5521964075124">WhatsApp (21) 96407-5124</a>
              <a href="mailto:marcus@godoyprime.com.br">marcus@godoyprime.com.br</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 Godoy Prime Realty. Todos os direitos reservados.</span>
            <span className="footer-copy">CRECI/RJ 80.199 PF | 11.841 PJ · Perito Avaliador TJRJ</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageV4;
