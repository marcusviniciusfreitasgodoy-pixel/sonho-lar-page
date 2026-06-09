ALTER TABLE public.artigos
  ADD COLUMN IF NOT EXISTS visualizacoes INTEGER NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.increment_artigo_views(p_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.artigos
     SET visualizacoes = visualizacoes + 1
   WHERE id = p_id
     AND ativo = true;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_artigo_views(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_artigo_views(uuid) TO anon, authenticated;