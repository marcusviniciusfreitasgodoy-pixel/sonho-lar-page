ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS dateahome_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS dateahome_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS dateahome_last_attempt_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS dateahome_response jsonb;

CREATE INDEX IF NOT EXISTS leads_dateahome_status_idx ON public.leads (dateahome_status);