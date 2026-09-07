import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';
import { BreadcrumbSchema } from '@/components/seo/schema';

export const metadata: Metadata = {
  title: 'Editorial Policy and Article Review',
  description: 'How FlipMyCase prepares articles, checks examples, cites sources, explains limitations and handles corrections.',
  alternates: { canonical: `${SITE_URL}/editorial-policy` },
  openGraph: { title: 'Editorial Policy | FlipMyCase', description: 'Our approach to sources, tested examples and corrections.', url: `${SITE_URL}/editorial-policy`, type: 'website' },
};
export default function EditorialPolicy() {
  return <div className="mx-auto max-w-3xl px-4 py-10 space-y-6 leading-7">
    <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Editorial policy', href: '/editorial-policy' }]} />
    <h1 className="text-3xl font-bold">Editorial Policy</h1>
    <p>Last reviewed: <time dateTime="2026-09-07">September 7, 2026</time></p>
    <p>FlipMyCase articles help readers complete specific text-processing tasks. We aim to explain what a tool does, show reproducible examples, and make limitations visible.</p>
    <h2 className="text-xl font-semibold">Sources and examples</h2>
    <p>Technical claims should link to the relevant standard or first-party documentation. Tool-specific examples are checked against the implementation. These checks cover the listed examples; they do not establish correctness for every input, language or browser.</p>
    <h2 className="text-xl font-semibold">Authorship and AI assistance</h2>
    <p>Articles are attributed to FlipMyCase. AI may assist with research, drafting and code review. Each article describes the checks actually performed. We do not invent human reviewers, qualifications, experiments, statistics or endorsements.</p>
    <h2 className="text-xl font-semibold">Publication and corrections</h2>
    <p>New articles need a distinct reader task, checked sources, reproducible examples and a review record before publication. Drafts are excluded from public article pages and the sitemap. The older blog archive remains unpublished pending individual review.</p>
    <p>Publication and review dates reflect work on that article; they are not refreshed automatically. Corrections to substantive claims or examples require another review. <Link href="/contact" className="underline">Report an error</Link> with the page URL and a synthetic example that demonstrates it.</p>
    <h2 className="text-xl font-semibold">Search visibility</h2>
    <p>Clear answers and descriptive metadata help readers and search systems understand the content. We do not promise rankings, traffic, inclusion in AI answers or citations.</p>
    <p><Link href="/articles" className="underline">Read the articles</Link></p>
  </div>;
}
