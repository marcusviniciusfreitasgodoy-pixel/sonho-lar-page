
CREATE TABLE public.artigos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  imagem_capa TEXT,
  resumo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  data_publicacao TIMESTAMPTZ NOT NULL DEFAULT now(),
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.artigos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.artigos TO authenticated;
GRANT ALL ON public.artigos TO service_role;

ALTER TABLE public.artigos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active articles"
ON public.artigos FOR SELECT
USING (ativo = true);

CREATE POLICY "Admins read all articles"
ON public.artigos FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert articles"
ON public.artigos FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update articles"
ON public.artigos FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete articles"
ON public.artigos FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER artigos_set_updated_at
BEFORE UPDATE ON public.artigos
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_artigos_data_pub ON public.artigos (data_publicacao DESC) WHERE ativo = true;
