CREATE POLICY "Admin can upload artigo covers"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'artigos-capas' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can update artigo covers"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'artigos-capas' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete artigo covers"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'artigos-capas' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can read artigo covers"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'artigos-capas' AND public.has_role(auth.uid(), 'admin'));