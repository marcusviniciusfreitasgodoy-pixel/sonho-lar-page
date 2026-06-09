
-- Switch view to security invoker
ALTER VIEW public.artigo_comentarios_publicos SET (security_invoker = true);

-- Re-add public read policy on base table (RLS allows reading approved rows)
DROP POLICY IF EXISTS "Public can read approved comments" ON public.artigo_comentarios;
CREATE POLICY "Public can read approved comments"
ON public.artigo_comentarios
FOR SELECT
TO anon, authenticated
USING (status = 'aprovado');

-- Restrict email column from anon so public cannot read it directly
REVOKE SELECT ON public.artigo_comentarios FROM anon;
GRANT SELECT (id, artigo_id, nome, mensagem, status, created_at, updated_at)
  ON public.artigo_comentarios TO anon;
