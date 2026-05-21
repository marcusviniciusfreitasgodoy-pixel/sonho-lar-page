-- ============== Auth + Roles ==============
CREATE TYPE public.app_role AS ENUM ('admin', 'viewer');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profile + auto-admin trigger on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));

  -- Auto-assign admin role to Marcus
  IF NEW.email = 'marcus@godoyprime.com.br' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS Policies: profiles
CREATE POLICY "Users read own profile" ON public.profiles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users update own profile" ON public.profiles
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins read all profiles" ON public.profiles
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies: user_roles
CREATE POLICY "Users read own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins manage all roles" ON public.user_roles
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============== Leads: dedup + retry columns ==============
ALTER TABLE public.leads
  ADD COLUMN is_duplicate BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN duplicate_of UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  ADD COLUMN dedupe_key TEXT,
  ADD COLUMN crm_attempts INT NOT NULL DEFAULT 0,
  ADD COLUMN crm_last_attempt_at TIMESTAMPTZ;

CREATE INDEX idx_leads_dedupe_key ON public.leads (dedupe_key, created_at DESC);
CREATE INDEX idx_leads_retry ON public.leads (crm_status, crm_attempts, crm_last_attempt_at);

-- Dedup trigger: BEFORE INSERT
CREATE OR REPLACE FUNCTION public.leads_dedupe()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_key TEXT;
  v_existing UUID;
BEGIN
  v_key := lower(coalesce(NEW.email,'')) || '|' || regexp_replace(coalesce(NEW.whatsapp,''), '\D', '', 'g');
  NEW.dedupe_key := v_key;

  IF v_key <> '|' THEN
    SELECT id INTO v_existing
    FROM public.leads
    WHERE dedupe_key = v_key
      AND created_at > (now() - interval '24 hours')
    ORDER BY created_at ASC
    LIMIT 1;

    IF v_existing IS NOT NULL THEN
      NEW.is_duplicate := true;
      NEW.duplicate_of := v_existing;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_leads_dedupe
BEFORE INSERT ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.leads_dedupe();

-- RLS Policies: leads (only admins read/update; inserts via service role from edge function)
CREATE POLICY "Admins read leads" ON public.leads
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update leads" ON public.leads
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));