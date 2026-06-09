
-- =========================================================
-- LIKES
-- =========================================================
CREATE TABLE public.artigo_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artigo_id UUID NOT NULL REFERENCES public.artigos(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_artigo_likes_artigo ON public.artigo_likes(artigo_id);

GRANT SELECT, INSERT ON public.artigo_likes TO anon;
GRANT SELECT, INSERT ON public.artigo_likes TO authenticated;
GRANT ALL ON public.artigo_likes TO service_role;

ALTER TABLE public.artigo_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read likes"
  ON public.artigo_likes FOR SELECT
  USING (true);

CREATE POLICY "Public can insert likes"
  ON public.artigo_likes FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.artigos a WHERE a.id = artigo_id AND a.ativo = true)
  );

-- =========================================================
-- COMENTARIOS
-- =========================================================
CREATE TYPE public.comentario_status AS ENUM ('pendente', 'aprovado', 'rejeitado');

CREATE TABLE public.artigo_comentarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artigo_id UUID NOT NULL REFERENCES public.artigos(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  status public.comentario_status NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT artigo_comentarios_nome_chk     CHECK (char_length(nome) BETWEEN 2 AND 80),
  CONSTRAINT artigo_comentarios_email_chk    CHECK (char_length(email) BETWEEN 5 AND 160),
  CONSTRAINT artigo_comentarios_mensagem_chk CHECK (char_length(mensagem) BETWEEN 3 AND 2000)
);
CREATE INDEX idx_artigo_comentarios_artigo ON public.artigo_comentarios(artigo_id, status, created_at DESC);

GRANT SELECT, INSERT ON public.artigo_comentarios TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.artigo_comentarios TO authenticated;
GRANT ALL ON public.artigo_comentarios TO service_role;

ALTER TABLE public.artigo_comentarios ENABLE ROW LEVEL SECURITY;

-- Público só vê aprovados
CREATE POLICY "Public can read approved comments"
  ON public.artigo_comentarios FOR SELECT
  USING (status = 'aprovado');

-- Admins veem tudo
CREATE POLICY "Admins read all comments"
  ON public.artigo_comentarios FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Público pode inserir, mas SEMPRE como 'pendente' (trigger garante)
CREATE POLICY "Public can submit comments"
  ON public.artigo_comentarios FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.artigos a WHERE a.id = artigo_id AND a.ativo = true)
  );

-- Admins moderam (update/delete)
CREATE POLICY "Admins update comments"
  ON public.artigo_comentarios FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete comments"
  ON public.artigo_comentarios FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger: força status pendente em inserts vindos do público
CREATE OR REPLACE FUNCTION public.artigo_comentarios_force_pending()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    NEW.status := 'pendente';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_artigo_comentarios_force_pending
BEFORE INSERT ON public.artigo_comentarios
FOR EACH ROW EXECUTE FUNCTION public.artigo_comentarios_force_pending();

CREATE TRIGGER trg_artigo_comentarios_updated_at
BEFORE UPDATE ON public.artigo_comentarios
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================================================
-- REALTIME
-- =========================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.artigo_likes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.artigo_comentarios;
