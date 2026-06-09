// Generates public/sitemap.xml from static routes + active blog articles.
// Runs via predev/prebuild npm scripts.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://personalshopperimobiliario.godoyprime.com.br";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://kufrldjlrudnnjeipfjx.supabase.co";
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1ZnJsZGpscnVkbm5qZWlwZmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNTQwNjUsImV4cCI6MjA5MDczMDA2NX0.KXEG6-MM_Tjmd7UOwG_dowYXA7GbwH47MaeedcvWfoM";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
interface Entry {
  path: string;
  lastmod?: string;
  changefreq?: ChangeFreq;
  priority?: string;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

async function fetchArtigos(): Promise<{ slug: string; updated_at: string | null; data_publicacao: string | null }[]> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/artigos?select=slug,updated_at,data_publicacao&ativo=eq.true&order=data_publicacao.desc`;
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (!res.ok) {
      console.warn(`[sitemap] failed to fetch artigos (${res.status})`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.warn("[sitemap] error fetching artigos:", err);
    return [];
  }
}

function buildXml(entries: Entry[]) {
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

async function main() {
  const now = today();
  const artigos = await fetchArtigos();

  const entries: Entry[] = [
    { path: "/", lastmod: now, changefreq: "daily", priority: "1.0" },
    { path: "/artigos", lastmod: now, changefreq: "weekly", priority: "0.8" },
    { path: "/privacidade", lastmod: now, changefreq: "monthly", priority: "0.3" },
    { path: "/lgpd", lastmod: now, changefreq: "monthly", priority: "0.3" },
    ...artigos.map<Entry>((a) => ({
      path: `/artigos/${a.slug}`,
      lastmod: (a.updated_at ?? a.data_publicacao ?? now).slice(0, 10),
      changefreq: "monthly",
      priority: "0.6",
    })),
  ];

  writeFileSync(resolve("public/sitemap.xml"), buildXml(entries));
  console.log(`sitemap.xml written (${entries.length} entries, ${artigos.length} artigos)`);
}

main();