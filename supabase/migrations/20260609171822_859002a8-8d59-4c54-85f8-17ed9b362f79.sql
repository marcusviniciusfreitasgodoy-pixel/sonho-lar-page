
-- 1) Remove artigo_comentarios from realtime publication (email leak via channel)
ALTER PUBLICATION supabase_realtime DROP TABLE public.artigo_comentarios;

-- 2) Public view that omits email
DROP POLICY IF EXISTS "Public can read approved comments" ON public.artigo_comentarios;

CREATE OR REPLACE VIEW public.artigo_comentarios_publicos
WITH (security_invoker = false) AS
SELECT id, artigo_id, nome, mensagem, created_at
FROM public.artigo_comentarios
WHERE status = 'aprovado';

GRANT SELECT ON public.artigo_comentarios_publicos TO anon, authenticated;

-- 3) Newsletter: tighten WITH CHECK (true)
DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON public.newsletter_assinantes;
CREATE POLICY "Public can subscribe to newsletter"
ON public.newsletter_assinantes
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 5 AND 254
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

-- 4) Public read on artigos-capas storage bucket
DROP POLICY IF EXISTS "Public read artigos-capas" ON storage.objects;
CREATE POLICY "Public read artigos-capas"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'artigos-capas');
