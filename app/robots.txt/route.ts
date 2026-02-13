export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: https://text-case-converter-beta.vercel.app/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
