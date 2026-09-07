import Link from 'next/link';
import type { Metadata } from 'next';
import { getPublishedArticles } from '@/lib/articles';
import { SITE_URL } from '@/lib/config';
import { BreadcrumbSchema } from '@/components/seo/schema';

export const metadata: Metadata = {
  title: 'Text Conversion Articles and Tested Examples',
  description: 'Practical text conversion articles with reproducible examples, sources and limitations. Learn a workflow, then try the relevant free tool.',
  alternates: { canonical: `${SITE_URL}/articles` },
  openGraph: { title: 'Text Conversion Articles | FlipMyCase', description: 'Practical workflows with tested examples, sources and limitations.', url: `${SITE_URL}/articles`, type: 'website' },
};

export default function ArticlesPage() {
  return <div className="mx-auto max-w-3xl px-4 py-10">
    <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Articles', href: '/articles' }]} />
    <h1 className="text-3xl font-bold">Text Conversion Articles</h1>
    <p className="mt-4 text-neutral-300">Practical workflows with reproducible examples, supporting sources and clear limitations. Each article links to a tool you can try.</p>
    <p className="mt-3"><Link href="/editorial-policy" className="underline">How articles are prepared and checked</Link></p>
    <ul className="mt-8 space-y-6">
      {getPublishedArticles().map((article) => <li key={article.slug} className="rounded-xl border border-neutral-500 p-5">
        <h2 className="text-xl font-semibold"><Link href={`/articles/${article.slug}`} className="underline">{article.title}</Link></h2>
        <p className="mt-2 text-neutral-300">{article.description}</p>
        <p className="mt-3 text-sm">Reviewed <time dateTime={article.reviewedAt}>{article.reviewedAt}</time></p>
      </li>)}
    </ul>
  </div>;
}
