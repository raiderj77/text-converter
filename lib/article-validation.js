// Shared by the build gate and the server-only article loader.
export function validateArticles(articles, today = new Date().toISOString().slice(0, 10)) {
  const errors = [];
  const slugs = new Set();
  const titles = new Set();
  const dateOK = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  const textOK = (value) => typeof value === 'string' && value.trim().length > 0;
  for (const article of articles) {
    const fail = (message) => errors.push(`${article.slug ?? '(missing slug)'}: ${message}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug ?? '') || slugs.has(article.slug)) fail('unique, safe slug required');
    slugs.add(article.slug);
    if (!['draft', 'published'].includes(article.status)) fail('status must be draft or published');
    if (article.status !== 'published') continue;
    for (const field of ['title', 'description', 'answer', 'reviewNote']) {
      if (!textOK(article[field])) fail(`${field} required`);
    }
    const title = article.title?.trim().toLowerCase();
    if (titles.has(title)) fail('duplicate published title');
    titles.add(title);
    if (article.reviewed !== true) fail('editorial review required');
    if (!dateOK(article.publishedAt) || !dateOK(article.reviewedAt)
      || article.publishedAt > today || article.reviewedAt > today
      || article.reviewedAt < article.publishedAt) fail('valid, nonfuture publication and review dates required');
    if (!Array.isArray(article.sections) || !article.sections.length) fail('substantive sections required');
    for (const section of article.sections ?? []) {
      if (!textOK(section.heading) || !section.paragraphs?.length || !section.paragraphs.every(textOK)) fail('section heading and paragraphs required');
    }
    if (!article.sources?.length) fail('sources required');
    for (const source of article.sources ?? []) {
      try {
        const url = new URL(source.url);
        if (url.protocol !== 'https:' || url.username || url.password) fail('sources must use public HTTPS URLs');
      } catch { fail('invalid source URL'); }
      if (!textOK(source.title) || !textOK(source.supports) || !dateOK(source.accessedAt) || source.accessedAt > article.reviewedAt) fail('source title, supported claim and access date required');
    }
    if (!article.examples?.length) fail('reproducible examples required');
    for (const example of article.examples ?? []) {
      if (!textOK(example.conversion) || typeof example.input !== 'string' || typeof example.output !== 'string') fail('example conversion, input and output required');
    }
  }
  return errors;
}

export function selectPublishedArticles(articles) {
  const errors = validateArticles(articles);
  if (errors.length) throw new Error(`Article validation failed:\n${errors.join('\n')}`);
  return articles.filter((article) => article.status === 'published')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
