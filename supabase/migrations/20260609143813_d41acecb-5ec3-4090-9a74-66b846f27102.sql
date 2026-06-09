
CREATE TABLE public.blog_settings (
  id BOOLEAN PRIMARY KEY DEFAULT true CHECK (id = true), -- singleton
  cta_titulo TEXT NOT NULL DEFAULT 'Pronto para comprar com critério, não com pressa?',
  cta_subtitulo TEXT NOT NULL DEFAULT 'Agende uma conversa direta com Marcus Godoy e descubra como o Personal Shopper Imobiliário protege sua próxima decisão patrimonial.',
  cta_botao_texto TEXT NOT NULL DEFAULT 'Fale comigo no WhatsApp',
  whatsapp_url TEXT NOT NULL DEFAULT 'https://wa.me/5521964075124',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_settings TO anon;
GRANT SELECT, UPDATE ON public.blog_settings TO authenticated;
GRANT ALL ON public.blog_settings TO service_role;

ALTER TABLE public.blog_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read blog settings"
  ON public.blog_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins update blog settings"
  ON public.blog_settings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_blog_settings_updated_at
BEFORE UPDATE ON public.blog_settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.blog_settings (id) VALUES (true);
