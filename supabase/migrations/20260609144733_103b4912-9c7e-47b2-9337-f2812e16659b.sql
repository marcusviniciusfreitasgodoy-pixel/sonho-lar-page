CREATE TABLE public.newsletter_assinantes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT,
  email TEXT NOT NULL UNIQUE,
  data_cadastro TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.newsletter_assinantes TO authenticated;
GRANT INSERT ON public.newsletter_assinantes TO anon;
GRANT ALL ON public.newsletter_assinantes TO service_role;

ALTER TABLE public.newsletter_assinantes ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe
CREATE POLICY "Public can subscribe to newsletter"
  ON public.newsletter_assinantes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can read
CREATE POLICY "Admins can view subscribers"
  ON public.newsletter_assinantes
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete subscribers"
  ON public.newsletter_assinantes
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));