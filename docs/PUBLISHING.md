# Publishing articles without redesigning the site

Updated September 7, 2026. Audience: FlipMyCase's maintainer and article writer.

## One stable publishing path

Add article records to `content/articles.json`. The shared renderer supplies the
article page, canonical URL, Article and breadcrumb schema, dates, examples,
sources and correction links. Published records automatically enter `/articles`
and `sitemap.xml`. No new page component or paid CMS is needed for each article.
The old `content/blog` archive stays quarantined.

Start with `{ "slug": "a-distinct-task", "status": "draft" }`. Draft records are
excluded from public routes and the sitemap. Complete the fields shown by the
first published article before changing status. Draft status is not a secrecy
boundary: this repository is public, so do not commit private drafts or secrets.

## Editorial release checklist

1. Define one reader task and the useful outcome. Search existing tool pages,
   reference guides and article records for duplication. Expand an existing page
   when the new query is substantially the same task.
2. Open primary sources. Record exact URLs, titles, access dates and which claims
   they support. Add nearby attribution in prose when a claim needs it. Label
   product observations and editorial recommendations as such.
3. Write an answer that works without reading the rest of the page. Explain the
   workflow, examples, failure cases and what the tool does not establish. Add
   only sections needed for the task; no word-count quotas or filler FAQs.
4. Put case-converter vectors in `examples` with the conversion ID from
   `lib/conversions.ts`, input and expected output. `npm test` replays them. For
   a different tool family, extend the example-test dispatcher to call that
   implementation before publication; do not substitute irrelevant vectors.
5. Review facts, sources, duplication and examples. Set `reviewed: true` only
   after doing this work. Describe the actual process and AI assistance in
   `reviewNote`; do not imply a human reviewer or credential that was not present.
6. Use real `publishedAt` and `reviewedAt` dates in YYYY-MM-DD format. Publication
   dates stay fixed. Advance the review date after a substantive review; dates
   cannot be in the future. Publish by setting `status: "published"` in a PR.
7. Run lint, build and dependency audit. Inspect the rendered page on desktop and
   mobile, example outputs, source links and schema. Check the PR and production
   release as described in `AGENTS.md`.

The machine gate rejects missing evidence fields, unsafe or duplicate slugs,
duplicate titles, missing review, future/invalid dates and failed converter
examples. It does not establish that a source supports a claim or that an article
is original. The writer/reviewer still has to check that.

## Initial content decisions

- Published example: converting existing identifiers while preserving word
  boundaries. This demonstrates a specific workflow, tested edge cases and
  limits beyond the existing case-style comparison page.
- Next candidate: hidden Unicode characters in pasted text, tied to the Unicode
  lookup and text cleaner. First inspect their actual behavior and demonstrate
  real synthetic cases. Search Console exposed a small `check unicode` signal;
  this is a topic lead, not keyword-volume proof.
- Improve `/underscore-conventions` before creating another general Python
  underscore article. Search Console already shows related queries; another
  broad page could duplicate its purpose.
- After that, choose a specific JSON/CSV cleanup workflow only after testing
  parsing, escaping and error handling. Avoid resurrecting old guide variants.

## Search rules backed by primary sources

- [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
  says normal SEO remains relevant; no special AI schema or llms.txt optimization
  is needed. Clear task answers and original examples are our editorial approach,
  not a guaranteed citation formula.
- [Google's helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
  supports original value, reliable sourcing and honest information about creation.
- [Article schema guidance](https://developers.google.com/search/docs/appearance/structured-data/article)
  supports accurate article identity and dates; structured data does not guarantee
  enhanced results. Use a relevant image only if one genuinely helps the article.
- [Google's documentation updates](https://developers.google.com/search/updates)
  record the end of FAQ rich results on May 7, 2026. Visible FAQs can still help
  readers; do not add them as a schema-growth trick.
- [Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
  calls for preferred canonical URLs and truthful significant-modification dates.

## Measurement and maintenance

Compare the same 28-day windows after search systems have had time to process
new pages. Track Google web impressions/clicks, [Google AI impressions](https://support.google.com/webmasters/answer/16984139?hl=en),
and [Bing AI citations](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
separately. Neither citations nor impressions prove click traffic or revenue.
Check [Google AI inclusion](https://support.google.com/webmasters/answer/16908024)
and parent-property inheritance when diagnosing missing AI visibility.

Review dependency/security alerts when they arise and rerun the checks after
changes. Revisit factual pages when their sources or implementations change.
This is a stable publishing foundation, not a promise of zero future maintenance.
Do not create scheduled tasks, paid services or external outreach without the
user requesting those actions.
