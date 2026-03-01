import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";
import { SlugGeneratorTool } from "@/components/tools/slug-generator";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";

export const metadata: Metadata = {
  title: "Free URL Slug Generator — SEO-Friendly Slugs from Any Text Online",
  description: "Convert any title or text into clean, SEO-friendly URL slugs instantly. Supports URL, filename, CSS class, Python variable, and constant formats. Free, no signup.",
  alternates: { canonical: `${SITE_URL}/slug-generator` },
  keywords: ["url slug generator", "slug generator online", "seo slug", "url slug maker", "title to slug converter"],
  openGraph: {
    title: "Free URL Slug Generator — SEO-Friendly Slugs from Any Text Online",
    description: "Convert any title or text into clean, SEO-friendly URL slugs instantly. Free, no signup.",
    url: `${SITE_URL}/slug-generator`,
    type: "website",
  },
};

const faqItems = [
  { question: "What is a URL slug?", answer: "A URL slug is the part of a web address that identifies a specific page. For example, in 'example.com/my-blog-post', the slug is 'my-blog-post'. Slugs use lowercase letters, numbers, and hyphens — no spaces or special characters." },
  { question: "Why are URL slugs important for SEO?", answer: "Search engines use slugs to understand what a page is about. A clean, keyword-rich slug like 'best-crochet-patterns' performs better than 'page?id=123'. Short, descriptive slugs also get more clicks in search results." },
  { question: "How long should a URL slug be?", answer: "Keep slugs under 60 characters. Shorter is better — include only the most important keywords and remove stop words like the, a, an, is, and for. Google truncates long URLs in search results." },
  { question: "Should I use hyphens or underscores in slugs?", answer: "Always use hyphens. Google treats hyphens as word separators, so 'my-blog-post' is read as three separate words. Underscores join words together, so 'my_blog_post' is read as one word, which hurts SEO." },
  { question: "What is the difference between a URL slug and a filename?", answer: "A URL slug uses hyphens and is optimized for web addresses. A filename uses underscores and is optimized for file systems. This tool supports both formats, plus CSS class names, Python variables, and constants." },
  { question: "Does this tool handle accented characters?", answer: "Yes. The slug generator automatically converts accented characters to their plain ASCII equivalents. For example, café becomes cafe and Cómo becomes como." },
];

export default function SlugGeneratorPage() {
  return (
    <>
      <WebAppSchema name="Free URL Slug Generator" description="Convert any title or text into clean, SEO-friendly URL slugs instantly." url={`${SITE_URL}/slug-generator`} />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Slug Generator", href: "/slug-generator" }]} />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Free URL Slug Generator</h1>
        <p className="mt-2 text-sm text-neutral-400">Convert any title or text into a clean, SEO-friendly URL slug instantly. Handles accents, special characters, and multiple formats. No signup, works entirely in your browser.</p>

        <div className="mt-6"><SlugGeneratorTool /></div>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">How to Generate a URL Slug</h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p><strong className="text-neutral-200">1. Paste your title or text</strong> into the input box above. The tool works with blog post titles, product names, headings, or any text you want to turn into a URL.</p>
            <p><strong className="text-neutral-200">2. Choose your format.</strong> Select URL Slug for web addresses, File Name for downloads, CSS Class for stylesheets, Python Variable for code, or Constant for environment variables.</p>
            <p><strong className="text-neutral-200">3. Copy the result.</strong> Click the Copy button to copy your slug to the clipboard. The tool shows a live URL preview and warns you if your slug is too long for SEO.</p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">When to Use a Slug Generator</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: "Blog & CMS", body: "Generate clean slugs for WordPress, Ghost, Webflow, and other CMS platforms. Turn long post titles into short, keyword-rich URLs." },
              { title: "E-commerce", body: "Create SEO-friendly product URLs for Shopify, WooCommerce, and custom stores. Clean URLs improve click-through rates from search results." },
              { title: "Web Development", body: "Convert variable names between snake_case, kebab-case, CSS classes, and Python variables when working across multiple languages." },
              { title: "Programmatic SEO", body: "Generate hundreds of consistent slugs from a spreadsheet of titles. Consistent slug formatting improves site structure and crawlability." },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                <div className="text-sm font-semibold">{c.title}</div>
                <p className="mt-1 text-xs text-neutral-400">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Frequently Asked Questions</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqItems.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { href: "/", label: "🔄 Case Converter" },
              { href: "/word-counter", label: "📊 Word Counter" },
              { href: "/text-cleaner", label: "🧹 Text Cleaner" },
              { href: "/json-formatter", label: "{ } JSON Formatter" },
              { href: "/string-encoder", label: "🔐 String Encoder" },
              { href: "/hash-generator", label: "#️⃣ Hash Generator" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors">{l.label}</a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
