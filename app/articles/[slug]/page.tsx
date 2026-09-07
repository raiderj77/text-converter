import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, getPublishedArticles } from '@/lib/articles';
import { SITE_URL } from '@/lib/config';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/schema';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPublishedArticles().map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return {
    title: article.title, description: article.description,
    alternates: { canonical: `${SITE_URL}/articles/${article.slug}` },
    openGraph: { title: article.title, description: article.description, url: `${SITE_URL}/articles/${article.slug}`, type: 'article', publishedTime: article.publishedAt, modifiedTime: article.reviewedAt },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const url = `${SITE_URL}/articles/${article.slug}`;
  return <article className="mx-auto max-w-3xl px-4 py-10 break-words">
    <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Articles', href: '/articles' }, { name: article.title, href: `/articles/${article.slug}` }]} />
    <ArticleSchema title={article.title} description={article.description} url={url} datePublished={article.publishedAt} dateModified={article.reviewedAt} />
    <p className="mb-4"><Link href="/articles" className="underline">All articles</Link></p>
    <h1 className="text-3xl font-bold tracking-tight">{article.title}</h1>
    <p className="mt-3 text-sm">By <Link href="/about" className="underline">FlipMyCase</Link> · Published <time dateTime={article.publishedAt}>{article.publishedAt}</time> · Reviewed <time dateTime={article.reviewedAt}>{article.reviewedAt}</time></p>
    <p className="mt-6 text-lg leading-8">{article.answer}</p>
    <p className="mt-4"><Link href="/" className="inline-flex min-h-11 items-center underline font-semibold">Try the case converter</Link></p>
    {article.sections.map((section) => <section key={section.heading} className="mt-8">
      <h2 className="text-xl font-semibold">{section.heading}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 leading-7 text-neutral-300">{paragraph}</p>)}
    </section>)}
    <section className="mt-8">
      <h2 className="text-xl font-semibold">Tested input and output</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="mb-3 text-left">Examples checked against the case converter. An empty result is labeled explicitly.</caption>
          <thead><tr>{['Format', 'Input', 'Output'].map((heading) => <th key={heading} scope="col" className="p-2 border-b border-neutral-500">{heading}</th>)}</tr></thead>
          <tbody>{article.examples.map((example, index) => <tr key={index}>
            <td className="p-2 border-b border-neutral-500">{example.conversion}</td>
            <td className="p-2 border-b border-neutral-500"><code>{example.input}</code></td>
            <td className="p-2 border-b border-neutral-500"><code>{example.output || '(empty result)'}</code></td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>
    <section className="mt-8">
      <h2 className="text-xl font-semibold">Sources and review</h2>
      <ul className="mt-3 space-y-4">{article.sources.map((source) => <li key={source.url}>
        <a href={source.url} className="underline">{source.title}</a>
        <p className="mt-1 text-neutral-300">{source.supports} Accessed {source.accessedAt}.</p>
      </li>)}</ul>
      <p className="mt-5 text-sm leading-6 text-neutral-300">{article.reviewNote}</p>
      <p className="mt-3"><Link href="/editorial-policy" className="underline">Editorial policy</Link> · <Link href="/contact" className="underline">Report a correction</Link></p>
    </section>
  </article>;
}
