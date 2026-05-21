CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT,
  whatsapp TEXT,
  servico TEXT,
  orcamento TEXT,
  momento TEXT,
  mensagem TEXT,
  origem TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referrer TEXT,
  landing_path TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  crm_status TEXT NOT NULL DEFAULT 'pending',
  crm_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_leads_crm_status ON public.leads (crm_status);
CREATE INDEX idx_leads_email ON public.leads (email);