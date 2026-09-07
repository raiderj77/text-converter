// Read-only HTTP audit of the sitemap and its public pages; no provider credentials.
// Usage: node scripts/site-audit.mjs http://localhost:3107
import assert from 'node:assert/strict';
const origin = new URL(process.argv[2] ?? 'http://localhost:3107').origin;
const canonicalOrigin = 'https://flipmycase.com';
const get = (url, options = {}) => fetch(url, { signal: AbortSignal.timeout(25000), ...options });
const xmlResponse = await get(`${origin}/sitemap.xml`);
assert.equal(xmlResponse.status, 200);
const xml = await xmlResponse.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.ok(urls.length > 75);
assert.equal(new Set(urls).size, urls.length, 'duplicate sitemap URL');
const issues = [];
const titles = new Map();
const internalLinks = new Set();
let index = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (index < urls.length) {
    const url = urls[index++];
    const route = new URL(url).pathname;
    try {
      const response = await get(`${origin}${route}`, { redirect: 'manual' });
      const html = await response.text();
      const fail = (reason) => issues.push({ route, reason });
      if (response.status !== 200) fail(`HTTP ${response.status}`);
      const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
      if (!title) fail('missing title');
      if (titles.has(title)) fail(`duplicate title with ${titles.get(title)}`);
      titles.set(title, route);
      if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1) fail('expected one H1');
      const canonical = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
      if (canonical.length !== 1 || !canonical[0][0].includes(`href="${url}"`)) fail('canonical mismatch');
      if (!/<meta name="description" content="[^"]+"/.test(html)) fail('missing description');
      if (/<meta name="robots" content="[^"]*noindex/.test(html)) fail('sitemap contains noindex page');
      for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(match[1]);
      for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
        const target = new URL(match[1].replaceAll('&amp;', '&'), url);
        if (target.origin === canonicalOrigin) internalLinks.add(target.pathname);
      }
      for (const header of ['content-security-policy', 'x-content-type-options', 'strict-transport-security']) if (!response.headers.get(header)) fail(`missing ${header}`);
    } catch (error) { issues.push({ route, reason: error.message }); }
  }
}));
const paths = new Set(urls.map((url) => new URL(url).pathname));
for (const route of internalLinks) {
  if (paths.has(route)) continue;
  const response = await get(`${origin}${route}`, { redirect: 'manual' });
  if (response.status >= 400) issues.push({ route, reason: `internal link HTTP ${response.status}` });
}
const missing = await get(`${origin}/articles/this-article-does-not-exist`, { redirect: 'manual' });
if (missing.status !== 404) issues.push({ route: '/articles/this-article-does-not-exist', reason: `expected 404, got ${missing.status}` });
const legacy = await get(`${origin}/blog`, { redirect: 'manual' });
if (![307, 308].includes(legacy.status) || !legacy.headers.get('location')?.endsWith('/tools')) issues.push({ route: '/blog', reason: 'legacy archive quarantine changed' });
console.log(JSON.stringify({ origin, checkedAt: new Date().toISOString(), sitemapPages: urls.length, internalLinkPaths: internalLinks.size, issues }, null, 2));
if (issues.length) process.exitCode = 1;
