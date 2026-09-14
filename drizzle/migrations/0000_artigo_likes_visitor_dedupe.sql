ALTER TABLE public.artigo_likes ADD COLUMN IF NOT EXISTS visitor_id text;

UPDATE public.artigo_likes SET visitor_id = 'legacy-' || id::text WHERE visitor_id IS NULL;

ALTER TABLE public.artigo_likes ALTER COLUMN visitor_id SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.artigo_likes'::regclass AND conname='artigo_likes_artigo_visitor_unique') THEN
    ALTER TABLE public.artigo_likes ADD CONSTRAINT artigo_likes_artigo_visitor_unique UNIQUE (artigo_id, visitor_id);
  END IF;
END $$;

ALTER TABLE public.artigo_likes ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE p record;
BEGIN
  FOR p IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename='artigo_likes' LOOP
    EXECUTE format('DROP POLICY %I ON public.artigo_likes', p.policyname);
  END LOOP;
END $$;

CREATE POLICY "Anyone can register one like per article" ON public.artigo_likes FOR INSERT TO anon, authenticated WITH CHECK (visitor_id IS NOT NULL AND char_length(visitor_id) BETWEEN 16 AND 64 AND visitor_id ~ '^[A-Za-z0-9._-]+$');

CREATE POLICY "Likes are publicly countable" ON public.artigo_likes FOR SELECT TO anon, authenticated USING (true);

GRANT SELECT, INSERT ON public.artigo_likes TO anon, authenticated;
GRANT ALL ON public.artigo_likes TO service_role;