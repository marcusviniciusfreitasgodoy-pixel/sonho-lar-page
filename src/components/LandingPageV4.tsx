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
    <div style="background:#161412;padding:24px 32px;border-bottom:2px solid #9E7B2A">
      <h2 style="color:#C4993A;font-weight:400;margin:0;font-size:20px">Novo lead — Godoy Prime Realty</h2>
    </div>
    <div style="padding:28px 32px;background:#fafaf8;border:1px solid #eee">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666;font-size:13px;width:140px">Serviço</td><td style="padding:8px 0;font-size:13px;font-weight:bold;color:#9E7B2A">${dados.servico || 'Diagnóstico Estratégico'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Nome</td><td style="padding:8px 0;font-size:13px">${dados.nome}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">WhatsApp</td><td style="padding:8px 0;font-size:13px">${dados.whatsapp || '-'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">E-mail</td><td style="padding:8px 0;font-size:13px">${dados.email || '-'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Faixa de investimento</td><td style="padding:8px 0;font-size:13px">${dados.orcamento || '-'}</td></tr>
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
    <div style="background:#161412;padding:24px 32px;border-bottom:2px solid #9E7B2A">
      <h2 style="color:#C4993A;font-weight:400;margin:0;font-size:20px">Godoy Prime Realty</h2>
    </div>
    <div style="padding:32px;background:#fafaf8;border:1px solid #eee">
      <p style="font-size:16px;color:#1a1a1a;margin-bottom:16px">Olá, <strong>${dados.nome}</strong>.</p>
      <p style="font-size:14px;color:#444;line-height:1.8;margin-bottom:20px">Sua solicitação referente ao <strong style="color:#9E7B2A">${servico}</strong> foi recebida.</p>
      <div style="background:#fff;border:1px solid #e0d8cc;border-left:3px solid #9E7B2A;padding:20px 24px;margin-bottom:24px">
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
      setMobileMenuOpen(false);
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

  const waLink = (servico: string, msg: string) =>
    `https://wa.me/${MARCUS_WA}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="landing-v4">
      {/* NAV */}
      <nav className={`${navSolid ? 'solid' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={handleAnchorClick}>
            <img src={godoyLogo} alt="" />
            <span className="nav-logo-text">Godoy <span>Prime</span> Realty</span>
          </a>
          <ul className="nav-menu">
            <li><a href="#conceito" onClick={handleAnchorClick}>Conceito</a></li>
            <li><a href="#processo" onClick={handleAnchorClick}>Processos</a></li>
            <li><a href="#servicos" onClick={handleAnchorClick}>Serviços</a></li>
            <li><a href="#sobre" onClick={handleAnchorClick}>Sobre</a></li>
            <li><a href="#faq" onClick={handleAnchorClick}>FAQ</a></li>
          </ul>
          <a href="#diagnostico" className="nav-cta" onClick={handleAnchorClick}>Diagnóstico Gratuito</a>
          <button className="nav-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#conceito" onClick={handleAnchorClick}>Conceito</a>
            <a href="#processo" onClick={handleAnchorClick}>Processos</a>
            <a href="#servicos" onClick={handleAnchorClick}>Serviços</a>
            <a href="#sobre" onClick={handleAnchorClick}>Sobre</a>
            <a href="#faq" onClick={handleAnchorClick}>FAQ</a>
            <a href="#diagnostico" className="mobile-menu-cta" onClick={handleAnchorClick}>Diagnóstico Gratuito</a>
          </div>
        )}
      </nav>

      {/* HERO — BACKGROUND IMAGE */}
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-left">
          <div className="hero-text">
            <div className="hero-eyebrow scroll-reveal" ref={reveal}>
              <span className="hero-eyebrow-text">PERSONAL SHOPPER IMOBILIÁRIO</span>
            </div>
            <h1 className="hero-h1 scroll-reveal" ref={reveal}>Comprar imóvel de alto padrão sem representação exclusiva é o <em>erro mais caro</em> do mercado.</h1>
            <p className="hero-sub scroll-reveal" ref={reveal}>Você é o único na negociação sem ninguém <em>realmente</em> do seu lado. Eu mudo essa equação.</p>
            <div className="hero-ctas scroll-reveal" ref={reveal}>
              <a href="#diagnostico" className="btn-gold" onClick={handleAnchorClick}>Agendar Diagnóstico Gratuito</a>
              <a href="#conceito" className="btn-outline-light" onClick={handleAnchorClick}>Ver como funciona</a>
            </div>
            <p className="hero-footnote scroll-reveal" ref={reveal}>Conversa direta · Sem compromisso · Sem venda de imóveis</p>
            <div className="hero-credentials scroll-reveal" ref={reveal}>
              <div className="hero-cred">
                <div className="hero-cred-val"><em>+</em> R$1,5M</div>
                <div className="hero-cred-label">Ticket mínimo<br/>dos imóveis representados</div>
              </div>
              <div className="hero-cred">
                <div className="hero-cred-val"><em>100%</em></div>
                <div className="hero-cred-label">Exclusivo<br/>para o comprador</div>
              </div>
              <div className="hero-cred">
                <div className="hero-cred-val">TJRJ</div>
                <div className="hero-cred-label">Perito Avaliador<br/>credenciado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT STRIP */}
      <div className="statement">
        <div className="statement-inner">
          <p className="statement-text scroll-reveal" ref={reveal}>"Corretor faz intermediação. Eu faço representação. A diferença não é de estilo, é de lado. <em>E na negociação mais cara da sua vida, o lado importa.</em>"</p>
          <span className="statement-attr scroll-reveal" ref={reveal}>Marcus Godoy · Godoy Prime Realty</span>
        </div>
      </div>

      {/* PROBLEMA */}
      <section className="sec sec-white" id="conceito">
        <div className="wrap">
          <div className="prob-header">
            <span className="prob-eyebrow">O problema</span>
            <h2 className="prob-h2">O mercado não foi desenhado <em>para o comprador.</em></h2>
          </div>
          <div className="prob-body">
            <div className="prob-body-text">
              <p>Você já sabe que algo está errado. Sente quando visita o décimo imóvel inadequado num sábado. Sente quando o corretor insiste que "o preço é justo" sem mostrar um único dado real.</p>
              <p>Esse desequilíbrio tem nome: <strong>Assimetria de Lealdade.</strong> O vendedor quer o maior preço possível. O corretor e a imobiliária recebem percentual do valor final: quanto mais caro, mais eles ganham.</p>
              <p>Você é o único beneficiado quando o preço cai. E o único sem ninguém pago para defender esse lado.</p>
            </div>
            <div className="prob-callout">
              <span className="prob-callout-label">A pergunta que todo comprador faz</span>
              <p className="prob-callout-q">"O corretor não me cobra nada." Simplesmente porque é pago pelo vendedor, para vender pelo maior preço possível. <em>Você está na negociação mais cara da sua vida sem ninguém realmente do seu lado.</em></p>
              <p className="prob-callout-a">O corretor não é seu inimigo. Mas o modelo no qual ele opera é estruturalmente contrário aos seus interesses como comprador.</p>
            </div>
          </div>
          <div className="prob-cards">
            <div className="prob-card scroll-reveal" ref={reveal}>
              <div className="prob-card-n">01</div>
              <div className="prob-card-title">Assimetria de informação</div>
              <p className="prob-card-text">No modelo tradicional, quem filtra as informações do imóvel é o mesmo profissional que tem incentivo de fechar a venda. Um único agente serve dois interesses opostos. O comprador não tem acesso independente.</p>
            </div>
            <div className="prob-card scroll-reveal" ref={reveal}>
              <div className="prob-card-n">02</div>
              <div className="prob-card-title">Pressão para decidir rápido</div>
              <p className="prob-card-text">Quanto mais rápido você decide, menos você analisa. A urgência apresentada no processo de compra quase sempre serve aos interesses de quem vende, não de quem compra.</p>
            </div>
            <div className="prob-card scroll-reveal" ref={reveal}>
              <div className="prob-card-n">03</div>
              <div className="prob-card-title">Portfólio estruturalmente limitado</div>
              <p className="prob-card-text">O corretor apresenta os imóveis da sua imobiliária e os de parceiros homologados. Imóveis fora dos portais ou de proprietários sem parceria ativa ficam fora do seu alcance operacional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODELO COMPARATIVO */}
      <section className="sec sec-dark" id="representacao">
        <div className="wrap">
          <span className="modelo-eyebrow">O modelo</span>
          <h2 className="modelo-h2">Aqui, o interesse é <em>um só: o seu.</em></h2>
          <p className="modelo-sub">Modelo consolidado nos EUA, Austrália e Espanha há décadas. Agora com estrutura formal no Rio de Janeiro. Não vendo imóveis. Represento compradores com contrato exclusivo, dados reais e alinhamento total de interesses.</p>

          <div className="compare-table">
            {/* Head */}
            <div className="compare-table-head">
              <div>
                <span className="compare-head-label">Corretor Tradicional</span>
                <span className="compare-head-pill pill-muted">Modelo atual</span>
              </div>
              <div>
                <span className="compare-head-label highlight">Personal Shopper — Godoy Prime</span>
                <span className="compare-head-pill pill-gold">Godoy Prime</span>
              </div>
            </div>

            {/* Rows */}
            {[
              { lbl: 'Vínculo contratual', neg: 'Contrato com o vendedor ou imobiliária. A obrigação legal é com quem assinou, não com você.', pos: 'Contrato exclusivo com você, o comprador. A obrigação legal é integralmente com seus interesses.' },
              { lbl: 'A quem representa', neg: 'Representa a transação. Atende comprador e vendedor ao mesmo tempo, interesses estruturalmente opostos.', pos: 'Representa <strong>exclusivamente você</strong>. Mandato único, sem exceção contratual possível.' },
              { lbl: 'Remuneração', neg: 'Percentual pago pelo vendedor sobre o preço final. Quanto mais caro o imóvel, mais ele ganha.', pos: 'Vinculada à sua economia real. <strong>Quanto mais você economiza, mais ganho.</strong>' },
              { lbl: 'Acesso ao mercado', neg: 'Portfólio próprio e parcerias homologadas. O mercado inteiro não está operacionalmente disponível.', pos: 'Busca ativa em todo o mercado: portais, off-market e rede direta de proprietários sem exposição pública.' },
              { lbl: 'Análise técnica', neg: 'Não realiza. Análise de valor independente não é parte do serviço prestado ao comprador.', pos: 'Parecer técnico com <strong>transações reais registradas</strong>. Você negocia com dados, não com intuição.' },
              { lbl: 'Conflito de interesse', neg: 'Estrutural e inevitável. Dois interesses opostos, um único profissional na mesa.', pos: '<strong>Zero conflito por definição contratual.</strong> Só o seu interesse está na mesa.' },
              { lbl: 'Negociação', neg: 'Para fechar pelo maior valor no menor tempo. É o que o contrato dele com o vendedor exige.', pos: 'Para obter o melhor preço e condições para você. É o que o <strong>contrato com você</strong> exige.' },
              { lbl: 'Acompanhamento', neg: 'Encerra na assinatura do contrato. A partir daí, você está sozinho.', pos: 'Acompanha <strong>até a transferência do imóvel</strong>: documentação, cartório e vistoria final.' }
            ].map((r, i) => (
              <div key={i} className="compare-table-row">
                <div><p>{r.neg}</p></div>
                <div><p dangerouslySetInnerHTML={{ __html: r.pos }} /></div>
              </div>
            ))}

            {/* Foot */}
            <div className="compare-table-foot">
              <div></div>
              <div>
                <p className="compare-foot-quote">"Você está na negociação mais cara da sua vida. O profissional na sala foi contratado pelo lado oposto ao seu. Em qualquer outro contexto, você chamaria isso de conflito de interesse."</p>
              </div>
              <div>
                <p className="compare-foot-cta-text">Antes de decidir como comprar, faça um Diagnóstico Estratégico Gratuito. 30 minutos. Sem compromisso.</p>
                <a href="#diagnostico" className="btn-gold" onClick={handleAnchorClick} style={{ display: 'block', textAlign: 'center' }}>Agendar Diagnóstico Gratuito</a>
              </div>
            </div>
          </div>

          <div className="intl scroll-reveal" ref={reveal}>
            <span className="intl-lbl">Modelo consolidado em</span>
            <div className="intl-list">
              <div><span className="intl-item-name">Estados Unidos</span><span className="intl-item-sub">Exclusive Buyer's Agent · NAEBA</span></div>
              <div><span className="intl-item-name">Austrália</span><span className="intl-item-sub">Buyer's Agent · REBAA</span></div>
              <div><span className="intl-item-name">Espanha</span><span className="intl-item-sub">Personal Shopper Inmobiliario</span></div>
              <div><span className="intl-item-name">Rio de Janeiro</span><span className="intl-item-sub">Personal Shopper Imobiliário · Godoy Prime Realty</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="sec sec-cream" id="processo">
        <div className="wrap">
          <div className="proc-header">
            <span className="proc-eyebrow scroll-reveal" ref={reveal}>Como trabalhamos</span>
            <h2 className="proc-h2 scroll-reveal" ref={reveal}>Cada etapa foi desenhada para proteger sua <em>decisão e seu investimento.</em></h2>
            <p className="proc-sub scroll-reveal" ref={reveal}>Usamos dados de transações reais e oficiais para determinar o que o imóvel realmente vale. Sem atalhos. Sem pressão.</p>
          </div>
          <div className="steps">
            {[
              { n: '01', title: 'Perfil Decodificado', text: 'Mapeamento do seu DNA de comprador: orçamento real, prioridades técnicas e prazo. Elimina 90% do mercado antes de perder um fim de semana.' },
              { n: '02', title: 'Rastreio On e Off-Market', text: 'Analisamos imóveis anunciados e imóveis que nunca chegam aos portais, reservados para compradores com representante confiável.' },
              { n: '03', title: 'Vistoria Técnica e Documental', text: 'Vistoria presencial com fotos antes da sua visita. Evita perda de tempo com imóveis fora do padrão ou com problemas ocultos.' },
              { n: '04', title: 'Due Diligence', text: 'Infiltrações, histórico de manutenção, ações judiciais, débitos ocultos. Só fazemos uma proposta no imóvel que já passou no crivo técnico completo.' },
              { n: '05', title: 'Matemática Inversa', text: 'Negociação conduzida com dados de transações reais. Argumentos baseados em registros oficiais que derrubam o preço inflado sem confronto emocional.' },
              { n: '06', title: 'Escritura Blindada', text: 'Fechamento completo com acompanhamento documental até a transferência. Você assina com a certeza de quem comprou com dados, não com esperança.' }
            ].map((s, i) => (
              <div key={i} className="step scroll-reveal" ref={reveal}>
                <div className="step-n">{s.n}</div>
                <div className="step-title">{s.title}</div>
                <p className="step-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SERVIÇOS */}
      <section className="sec sec-white" id="servicos">
        <div className="wrap">
          <div className="serv-header">
            <span className="serv-eyebrow scroll-reveal" ref={reveal}>Serviços</span>
            <h2 className="serv-h2 scroll-reveal" ref={reveal}>Três pontos de entrada. Uma única missão: <em>proteger sua decisão e seu capital.</em></h2>
            <p className="serv-sub scroll-reveal" ref={reveal}>Dependendo de onde você está na jornada de compra, o ponto de entrada muda. O valor de cada etapa é abatido no próximo nível.</p>
          </div>
          <div className="serv-grid">
            {/* Card 1 */}
            <div className="serv-card scroll-reveal" ref={reveal}>
              <span className="serv-tag tag-neutral">Validação Independente</span>
              <div className="serv-num">01</div>
              <h3 className="serv-name">Parecer Godoy Prime</h3>
              <p className="serv-desc serv-desc-italic">Para quem já tem um imóvel em vista e precisa saber se o preço é justo antes de negociar.</p>
              <p className="serv-desc">Inclui análise comparativa com transações reais e oficiais registradas na região, parecer técnico de valor com recomendação de oferta, vistoria técnica presencial com laudo fotográfico e identificação de passivos documentais. Entrega em até 5 dias úteis.</p>
              <div className="serv-roi">
                <p>Em um imóvel de R$2M, um único argumento técnico baseado em dados reais pode gerar redução de R$50.000 a R$150.000 no preço final. O Parecer custa R$4.900. A relação é de até 30 para 1.</p>
              </div>
              <div className="serv-price">R$ 4.900</div>
              <div className="serv-price-note">A partir de · Entrega em até 7 dias úteis</div>
              <a href={waLink('Parecer Godoy Prime', 'Olá Marcus, vim pelo site da Godoy Prime Realty.\n\nQuero solicitar o *Parecer Godoy Prime* para análise de um imóvel que estou avaliando.\n\nPoderia me informar os próximos passos?')} className="btn-serv-dark" target="_blank" rel="noopener noreferrer">Solicitar via WhatsApp</a>
            </div>
            {/* Card 2 */}
            <div className="serv-card scroll-reveal" ref={reveal}>
              <span className="serv-tag tag-gold">Da Análise à Assinatura</span>
              <div className="serv-num">02</div>
              <h3 className="serv-name">Compra Blindada</h3>
              <p className="serv-desc serv-desc-italic">Para quem já identificou o imóvel e quer conduzir a negociação com representação exclusiva.</p>
              <p className="serv-desc">Inclui tudo do Parecer Godoy Prime, acrescido de condução integral da negociação em seu nome com base em dados reais, due diligence documental completa e acompanhamento até a assinatura do contrato.</p>
              <div className="serv-roi">
                <p>A parte fixa cobre análise e estrutura da negociação. A parte variável só existe se houver resultado concreto. Na prática, o serviço é financiado pela economia que gera, não pelo seu bolso.</p>
              </div>
              <div className="serv-price">R$ 10.000</div>
              <div className="serv-price-note">A partir de · Sujeito à disponibilidade</div>
              <a href={waLink('Compra Blindada', 'Olá Marcus, vim pelo site da Godoy Prime Realty.\n\nTenho interesse no serviço *Compra Blindada*. Já tenho um imóvel em vista e preciso de representação exclusiva para a negociação.\n\nQual é a disponibilidade atual?')} className="btn-serv-dark" target="_blank" rel="noopener noreferrer">Falar com Marcus</a>
            </div>
            {/* Card 3 — featured */}
            <div className="serv-card featured scroll-reveal" ref={reveal}>
              <span className="serv-tag tag-gold-dark">Jornada Integral</span>
              <div className="serv-num">03</div>
              <h3 className="serv-name">Prime Buyer Experience</h3>
              <p className="serv-desc serv-desc-italic" style={{ color: 'var(--light2)' }}>Para quem ainda está na fase de busca e quer delegar o processo inteiro a um representante exclusivo.</p>
              <p className="serv-desc">Inclui busca ativa on e off-market, curadoria com vistoria técnica prévia à sua visita, análise comparativa de valor, condução da negociação e acompanhamento documental até a transferência do imóvel. Você visita 5 a 8 imóveis qualificados, não 30 a 40.</p>
              <div className="serv-price">Sob consulta</div>
              <div className="serv-price-note">Proposta personalizada</div>
              <a href={waLink('Prime Buyer Experience', 'Olá Marcus, vim pelo site da Godoy Prime Realty.\n\nTenho interesse no *Prime Buyer Experience*. Ainda estou na fase de busca e quero delegar o processo completo a um representante exclusivo.\n\nPoderia me enviar uma proposta?')} className="btn-serv-gold" target="_blank" rel="noopener noreferrer">Solicitar Proposta</a>
            </div>
          </div>

          <div className="serv-upsell scroll-reveal" ref={reveal}>
            <p><span>Parecer Godoy Prime</span> → <span>Compra Blindada</span> → <span>Prime Buyer Experience</span><br/>O valor de cada etapa é integralmente abatido no próximo nível.</p>
          </div>

          <div className="serv-capacity scroll-reveal" ref={reveal}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div className="serv-capacity-label">Capacidade limitada</div>
              <p>Atendo no máximo <strong>4 clientes por mês</strong> para garantir dedicação exclusiva a cada processo. Quando há vagas disponíveis, o Diagnóstico é o primeiro passo.</p>
            </div>
            <a href="#diagnostico" className="btn-gold" onClick={handleAnchorClick} style={{ flexShrink: 0 }}>Verificar Disponibilidade</a>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="sec sec-cream" id="sobre">
        <div className="wrap">
          <div className="sobre-grid">
            <div className="sobre-photo-col scroll-reveal" ref={reveal}>
              <img className="sobre-photo" src={marcusProfile} alt="Marcus Godoy — Personal Shopper Imobiliário" />
              <div className="sobre-badge">
                <div className="sobre-badge-dot"></div>
                <span className="sobre-badge-text">CRECI/RJ 80.199 PF · Perito Avaliador TJRJ</span>
              </div>
            </div>
            <div>
              <span className="sobre-eyebrow">Sobre</span>
              <h2 className="sobre-h2">O defensor que o mercado <em>não quer que você encontre.</em></h2>
              <div className="sobre-text">
                <p>Sou Marcus Godoy. Trabalhei dentro do mercado imobiliário tradicional tempo suficiente para entender exatamente como ele funciona e por que ele opera estruturalmente contra o comprador.</p>
                <p>A decisão de representar exclusivamente compradores foi a estratégia de posicionamento que me permitiu oferecer um serviço diferenciado, justo e qualificado para o Comprador de Alto Padrão.</p>
                <p>Minha remuneração está contratualmente vinculada à sua economia real.</p>
                <p><strong>Quando você paga menos, eu ganho mais.</strong></p>
                <p>Esse alinhamento não é promessa. É matemática contratual auditável, documentada, irrevogável.</p>
              </div>
              <blockquote className="sobre-quote">"O modelo tradicional cria um conflito estrutural. Existimos para eliminá-lo."</blockquote>
              <div className="sobre-creds">
                <div className="cred"><div className="cred-dot"></div><span className="cred-text">Perito Avaliador credenciado pelo TJRJ</span></div>
                <div className="cred"><div className="cred-dot"></div><span className="cred-text">CRECI/RJ: 80.199 PF | 11.841 PJ</span></div>
                <div className="cred"><div className="cred-dot"></div><span className="cred-text">Especializado em imóveis de alto padrão — Barra da Tijuca e Recreio</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec sec-white" id="faq">
        <div className="wrap">
          <div className="faq-header">
            <span className="faq-eyebrow">Perguntas frequentes</span>
            <h2 className="faq-h2">As perguntas que todo comprador faz, respondidas com <em>dados, não com promessas.</em></h2>
          </div>
          <div className="faq-list">
            {[
              { q: 'Quanto custa o serviço e quando é cobrado?', a: 'Depende do momento da sua jornada de compra. O Parecer Godoy Prime começa em R$4.900 e é cobrado antes da análise. A Compra Blindada começa em R$10.000, com parte fixa e parte vinculada à economia gerada. O Prime Buyer Experience tem um adiantamento inicial de R$10.000 para cobertura de despesas operacionais, valor que é integralmente abatido da remuneração final, que por sua vez é vinculada ao resultado. No Diagnóstico Estratégico Gratuito você entende qual serviço se aplica ao seu caso e a estrutura exata de investimento. Sem surpresas.' },
              { q: 'Minha busca e negociação são confidenciais?', a: 'Sim, integralmente. O contrato inclui cláusula de confidencialidade com penalidade definida. Nenhuma informação sobre sua busca, orçamento, prazo ou identidade é compartilhada com vendedores, corretores ou terceiros sem sua autorização expressa. Para compradores de alto padrão que preferem não expor publicamente uma aquisição relevante, esse sigilo é parte estrutural do serviço, não um acessório.' },
              { q: 'Já tenho um corretor que me mostra imóveis. Posso te contratar assim mesmo?', a: 'Sim. Os dois serviços não são excludentes. O corretor representa o vendedor e tem acesso ao portfólio dele. Eu represento você com contrato exclusivo e acesso ao mercado inteiro. Se o imóvel que o corretor te mostrou for o certo, posso fazer a análise técnica independente, conduzir a negociação e proteger sua decisão sem interferir no relacionamento que você já tem. O Parecer Godoy Prime e a Compra Blindada foram desenhados exatamente para esse cenário.' },
              { q: 'O que acontece se eu não economizar nada?', a: 'No Prime Buyer Experience, se a economia gerada na negociação não superar o valor do honorário contratado, você não paga a parte variável. Esse compromisso está no contrato, não é promessa verbal. A estrutura foi desenhada para garantir que meu interesse e o seu sejam matematicamente idênticos: só faço sentido para você se gerar resultado concreto e mensurável.' },
              { q: 'Qual é o custo total da operação?', a: 'Além do valor do imóvel e do meu honorário, uma compra acima de R$1,5M no Rio de Janeiro envolve custos de transação que variam entre 4% e 6% do valor negociado. Isso inclui ITBI, escritura pública, registro em cartório e eventuais certidões. Em uma compra de R$3M, esses custos somam entre R$120k e R$180k. No Diagnóstico Estratégico Gratuito apresento a projeção completa para o seu caso antes de qualquer compromisso.' },
              { q: 'Quanto tempo leva o processo?', a: 'Depende da complexidade do imóvel e da sua disponibilidade para tomar decisões com dados. Clientes com critérios bem definidos fecham em média entre 30 e 90 dias após o início da representação. Para comparação, a média de quem busca sem representação no mercado tradicional é de 6 a 12 meses, com resultados incertos e sem validação técnica de valor real.' },
              { q: 'E se eu já encontrei um imóvel que me interessa?', a: 'Esse é exatamente o caso de uso do Parecer Godoy Prime. Você tem o imóvel. Eu faço a análise técnica e documental independente antes de qualquer negociação, revelando o valor real, os riscos ocultos e o espaço de negociação que o vendedor não quer que você conheça. Você entra na negociação com dados. O vendedor entra com o preço de vitrine. A diferença é sua.' }
            ].map((faq, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q"><span className="faq-q-text">{faq.q}</span><span className="faq-icon">+</span></summary>
                <div className="faq-a"><p>{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className="sec sec-dark" id="diagnostico">
        <div className="wrap">
          <div className="form-grid">
            <div>
              <span className="form-l-eyebrow">Próximo passo</span>
              <h2 className="form-l-h2">O próximo passo não é visitar um imóvel. Em apenas 30 minutos <em>tudo ficará mais claro e seguro para você.</em></h2>
              
              <div className="form-l-note">Conversa direta com Marcus Godoy. Sem equipe. Sem roteiro de fechamento. Você sai sabendo se faz sentido avançar, ou não.</div>
              <div className="form-l-highlight">
                <p>Cada semana pesquisando sem uma assessoria como essa, é uma semana negociando no escuro. O mercado não espera, e o vendedor já tem as informações que você não tem.</p>
              </div>
            </div>
            <div>
              <div className="form-r">
                {!formSubmitted ? (
                  <form ref={formRef} onSubmit={handleFormSubmit}>
                    <div className="form-group"><label className="form-lbl" htmlFor="nome">Nome completo</label><input className="form-input" type="text" id="nome" name="nome" placeholder="Seu nome" required /></div>
                    <div className="form-group"><label className="form-lbl" htmlFor="whatsapp">WhatsApp</label><input className="form-input" type="tel" id="whatsapp" name="whatsapp" placeholder="(21) 9 0000-0000" required /></div>
                    <div className="form-group"><label className="form-lbl" htmlFor="email">E-mail</label><input className="form-input" type="email" id="email" name="email" placeholder="seu@email.com" required /></div>
                    <div className="form-group">
                      <label className="form-lbl" htmlFor="orcamento">Faixa de investimento</label>
                      <select className="form-input form-select" id="orcamento" name="orcamento" required defaultValue="">
                        <option value="" disabled>Selecione</option>
                        <option>R$ 1,5M a R$ 2,5M</option>
                        <option>R$ 2,5M a R$ 4M</option>
                        <option>R$ 4M a R$ 6M</option>
                        <option>Acima de R$ 6M</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-lbl" htmlFor="momento">Momento da compra</label>
                      <select className="form-input form-select" id="momento" name="momento" required defaultValue="">
                        <option value="" disabled>Selecione</option>
                        <option>Quero comprar nos próximos 30 dias</option>
                        <option>Estou pesquisando (1–3 meses)</option>
                        <option>Planejando para os próximos 6 meses</option>
                        <option>Apenas explorando opções (mais de 6 meses)</option>
                      </select>
                    </div>
                    <div className="form-group"><label className="form-lbl" htmlFor="mensagem">Mensagem <span style={{ fontWeight: 300, color: 'var(--light3)' }}>(opcional)</span></label><textarea className="form-input form-textarea" id="mensagem" name="mensagem" placeholder="Conte brevemente o que está buscando" rows={3}></textarea></div>
                    <div className="form-consent">
                      <input type="checkbox" id="consent" required />
                      <label htmlFor="consent">Li e concordo com a <a href="/privacidade">Política de Privacidade</a> e os <a href="/lgpd">Termos de Uso</a>. Autorizo o contato por WhatsApp e e-mail para o Diagnóstico Estratégico solicitado.</label>
                    </div>
                    <button type="submit" className="form-submit" style={{ marginTop: 16 }}>Agendar Diagnóstico Estratégico Gratuito</button>
                    <p className="form-note">Retorno em até 24 horas · Sem compromisso</p>
                  </form>
                ) : (
                  <div className="form-success" style={{ display: 'block' }}>
                    <div className="form-success-icon">✦</div>
                    <h3>Solicitação recebida.</h3>
                    <p>Entraremos em contato em até 24 horas.<br/>WhatsApp direto: <strong><a href={`https://wa.me/${MARCUS_WA}`}>(21) 96407-5124</a></strong></p>
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
          <div className="footer-grid">
            <div>
              <div className="footer-brand-row">
                <img src={godoyLogo} alt="" />
                <span className="footer-brand-name">Godoy <span>Prime</span> Realty</span>
              </div>
              <p className="footer-desc">Personal Shopper Imobiliário — Representação Exclusiva do Comprador<br/>Barra da Tijuca e Recreio · Rio de Janeiro</p>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Contato</span>
              <a href="tel:+552140400067">(21) 4040-0067</a>
              <a href={`https://wa.me/${MARCUS_WA}`}>WhatsApp (21) 96407-5124</a>
              <a href={`mailto:${MARCUS_EMAIL}`}>marcus@godoyprime.com.br</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Serviços</span>
              <a href="#servicos" onClick={handleAnchorClick}>Parecer Godoy Prime</a>
              <a href="#servicos" onClick={handleAnchorClick}>Compra Blindada</a>
              <a href="#servicos" onClick={handleAnchorClick}>Prime Buyer Experience</a>
              <a href="#diagnostico" onClick={handleAnchorClick}>Diagnóstico Gratuito</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© {new Date().getFullYear()} Godoy Prime Realty. Todos os direitos reservados.</span>
            <div className="footer-legal">
              <a href="/privacidade">Privacidade</a>
              <a href="/lgpd">Termos de Uso</a>
            </div>
            <span className="footer-creci">CRECI/RJ 80.199 PF · 11.841 PJ · Perito Avaliador TJRJ · CNPJ 58.409.058/0001-73</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageV4;
