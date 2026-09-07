# FlipMyCase maintenance and publishing

## Current baseline

This file records the September 7, 2026 publishing workflow. Older Claude and
portfolio documents contain historical SEO advice and conflicting requirements.
Use the current implementation, regression tests and verified primary sources to
resolve discrepancies. Do not resurrect retired behavior just to satisfy an old
SEO checklist. User instructions always take precedence.

- Verify repository `raiderj77/text-converter`, branch, changes and provider state.
- Work on a `codex/` branch; preserve unrelated work and open PRs.
- Keep tool input browser-local. Preserve consent, storage restrictions, bounded
  offline caches and existing security headers. Advertising stays disabled.
- Do not invent personal credentials, reviewers, usage numbers, ratings or claims
  of universal accuracy. Attribute public articles to FlipMyCase.

## Articles

Read `docs/PUBLISHING.md` before creating or changing an article. New articles use
`content/articles.json` and `/articles/[slug]`. The historical `content/blog`
corpus remains quarantined; `/blog` redirects are not a publication mechanism.
Add one substantive article per reader task, with primary sources, reproducible
examples, limitations and an honest review note. Do not generate keyword variants
or refresh dates without substantive work. Check duplication against all public
pages, not just the article catalog. Improve an existing page when appropriate.

Drafts must remain `status: "draft"`; marking `reviewed: true` requires actual
source and example review. Automated checks enforce records and replay converter
examples, but cannot prove originality, truthfulness or editorial quality.

## Verification and releases

Run `npm run lint`, `npm run build`, and `npm audit` before release. Build includes
the predeploy, content, quality and regression gates. With a production build
running locally, run `node scripts/site-audit.mjs http://localhost:3107` (or the
actual port). Check changed interactions and mobile layout in a browser.

Review the exact PR diff and required checks. Distinguish a local change, pushed
branch, preview, merge, deployment and directly verified production. After an
authorized release, run the HTTP audit against production and exercise the
changed workflow there. Do not claim all tool behavior is verified from a crawl.

## SEO, GEO and AEO TRUTHMODE

Prioritize useful tasks, crawlable HTML, canonical URLs, clear internal links,
accurate metadata and schema matching visible content. `llms.txt` is a directory,
not a Google ranking lever. Do not promise search ranking, AI citations or traffic.
Do not present FAQ schema as a Google rich-result tactic. Verify changing search
provider guidance and account settings directly.

Report Search Console clicks/impressions, Google AI impressions and Bing citations
separately with dates. Missing access or insufficient data means UNKNOWN, not zero
or passed. Avoid infrastructure redesigns without evidence of a problem.
