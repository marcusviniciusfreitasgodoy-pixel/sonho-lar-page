DROP POLICY IF EXISTS "Public can read approved comments" ON public.artigo_comentarios;
CREATE POLICY "Public can read approved comments"
  ON public.artigo_comentarios
  FOR SELECT
  TO anon
  USING (status = 'aprovado'::comentario_status);