function xml(urls: { loc: string; lastmod?: string }[]) {
  const items = urls
    .map((u) => {
      const lastmod = u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : "";
      return `<url><loc>${u.loc}</loc>${lastmod}</url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;
}

export function GET() {
  const base = "https://text-case-converter-beta.vercel.app";
  const today = new Date().toISOString().slice(0, 10);

  const urls = [{ loc: `${base}/`, lastmod: today }];

  return new Response(xml(urls), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
