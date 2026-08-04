# FlipMyCase

FlipMyCase is a Next.js utility site with 75 interactive text, formatting,
encoding, analysis, and developer tools plus 3 reference guides. Production:
<https://flipmycase.com>.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

## Required validation

Run these before proposing a release:

```bash
npm test
npm run lint
npm run lint:content
npm run lint:predeploy
npm run build
npm audit --omit=dev
```

`npm run build` also runs the predeploy, content, and product-quality gates.

## Privacy and monetization boundaries

- Tool input is processed in the browser. Do not introduce transmission,
  analytics capture, or persistent storage without updating the tool UI, tests,
  and public privacy notices.
- Optional Google Analytics is opt-in and receives a sanitized page path, not
  query strings or tool input.
- Advertising is intentionally disabled in code. Follow
  [docs/ADSENSE_READINESS.md](docs/ADSENSE_READINESS.md) before adding any ad tag
  or activation switch.
- The former scaled blog archive is quarantined and redirects to the reviewed
  tool directory. Do not republish it without source, duplication, accuracy,
  and editorial review.

## Production safeguards

Security headers are duplicated in `next.config.ts` and `vercel.json`; keep the
two policies synchronized. Discovery files live in `public/robots.txt`,
`public/llms.txt`, and `public/ads.txt`. The service worker deliberately avoids
caching query-string navigations and keeps bounded local caches.
