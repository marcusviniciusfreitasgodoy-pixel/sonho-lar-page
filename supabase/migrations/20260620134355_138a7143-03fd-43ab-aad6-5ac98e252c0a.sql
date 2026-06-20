REVOKE SELECT ON public.artigo_comentarios FROM anon;
GRANT SELECT (id, artigo_id, nome, mensagem, status, created_at, updated_at) ON public.artigo_comentarios TO anon;