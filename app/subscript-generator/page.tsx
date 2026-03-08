import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { SubscriptGeneratorTool } from "@/components/tools/subscript-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("subscript-generator")!;
const pageUrl = buildUrl("/subscript-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "subscript text generator", "subscript unicode", "copy paste subscript",
    "subscript letters", "subscript numbers", "unicode subscript converter",
    "subscript text online", "free subscript generator", "subscript symbols",
    "small text below baseline", "chemical formula text", "subscript font",
    "subscript copy paste", "math subscript text", "unicode subscript tool",
    "H2O subscript", "CO2 subscript", "subscript text maker",
  ],
  openGraph: {
    title: tool.title,
    description: tool.description,
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is subscript text?",
    answer:
      "Subscript text consists of small characters positioned below the normal text baseline. This tool uses Unicode subscript characters — not HTML tags — so the output works anywhere you can paste text: social media, messaging apps, bios, emails, and documents.",
  },
  {
    question: "Which characters can be converted to subscript?",
    answer:
      "Available letters: a, e, h, i, j, k, l, m, n, o, p, r, s, t, u, v, x. All digits 0-9 and the symbols + - = ( ) are also supported. Letters b, c, d, f, g, q, w, y, z have no Unicode subscript equivalent and pass through unchanged.",
  },
  {
    question: "Why are some letters missing from subscript?",
    answer:
      "The Unicode standard only includes subscript forms for letters commonly used in scientific and mathematical notation. Letters like b, c, d, f, g, q, w, y, and z were not included because they rarely appear in subscript form in academic publishing.",
  },
  {
    question: "Can I use subscript for chemical formulas?",
    answer:
      "Yes — subscript is ideal for chemical formulas. Type H2O and the 2 becomes a subscript ₂. Works for CO₂, H₂SO₄, C₆H₁₂O₆, and more. Note that element letters (like H, C, O) will pass through as normal text since they are uppercase.",
  },
  {
    question: "Is this the same as HTML subscript?",
    answer:
      "No. HTML <sub> tags only work in web pages and require a browser to render. This tool generates Unicode characters that look like subscript everywhere — no HTML needed. The characters are actual Unicode code points, not formatting tags.",
  },
  {
    question: "Where can I use subscript text?",
    answer:
      "Subscript Unicode text works on most platforms that support Unicode: Twitter/X, Instagram bios, Facebook, Reddit, Discord, Telegram, WhatsApp, emails, and documents. It may not render perfectly in all fonts but is widely supported on modern devices.",
  },
];

export default function SubscriptGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Subscript Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Subscript Generator", href: "/subscript-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Subscript Text Generator
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-300">
          Convert regular text to Unicode subscript characters you can copy and paste anywhere.
          Perfect for chemical formulas, math notation, and stylistic text. Free, no signup.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <SubscriptGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="subscript-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Subscript Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into the input
              box on the left. The subscript conversion happens live as you type — no submit button
              needed.
            </p>
            <p>
              <strong className="text-neutral-200">2. View the subscript output</strong> in the right
              panel. Supported characters are replaced with their Unicode subscript equivalents.
              Characters without subscript forms pass through unchanged.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the result</strong> by clicking the Copy
              button. The subscript text is on your clipboard, ready to paste into social media,
              documents, emails, or any application that supports Unicode.
            </p>
            <p>
              <strong className="text-neutral-200">4. Try the example</strong> by clicking Load
              Example to see a chemical formula converted with subscript numbers. Use Clear All to
              reset both panels.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Unicode Subscript Characters
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">What makes subscript text special:</strong>{" "}
              Unlike HTML &lt;sub&gt; tags that only work in browsers, Unicode subscript characters are
              real characters in the Unicode standard. They render as small, lowered text on any
              platform that supports Unicode — which includes virtually every modern device.
            </p>
            <p>
              <strong className="text-neutral-200">Scientific notation:</strong> Subscript characters
              are essential in chemistry (H&#8322;O, CO&#8322;), physics (v&#8320;, x&#8321;), and
              mathematics (a&#8321; + a&#8322; + ... + a&#8345;). Unicode subscript lets you write
              these formulas in plain text without any special editor or markup language.
            </p>
            <p>
              <strong className="text-neutral-200">Limited character set:</strong> Unlike superscript
              which covers most letters, Unicode subscript only includes 17 letters (a, e, h, i, j,
              k, l, m, n, o, p, r, s, t, u, v, x). This reflects historical typographic usage —
              subscript letters are less common in academic publishing than subscript numbers.
            </p>
            <p>
              <strong className="text-neutral-200">Full digit support:</strong> All digits 0-9 have
              subscript equivalents, making this tool excellent for numbering, indexing, and scientific
              notation. Mathematical symbols + - = ( ) are also available, allowing complete subscript
              expressions.
            </p>
            <p>
              <strong className="text-neutral-200">Platform compatibility:</strong> Subscript Unicode
              characters display correctly on iOS, Android, Windows, macOS, and Linux. They work in
              Twitter/X, Instagram, Facebook, Reddit, Discord, Slack, WhatsApp, Telegram, email
              clients, and word processors.
            </p>
            <p>
              <strong className="text-neutral-200">Subscript vs. superscript:</strong> Subscript
              characters appear below the baseline (like chemical formula numbers), while superscript
              characters appear above (like exponents). Both use dedicated Unicode code points. Check
              out the Superscript Generator for above-baseline text.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="subscript-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Subscript Character Reference
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Available Letters",
                desc: "a→ₐ e→ₑ h→ₕ i→ᵢ j→ⱼ k→ₖ l→ₗ m→ₘ n→ₙ o→ₒ p→ₚ r→ᵣ s→ₛ t→ₜ u→ᵤ v→ᵥ x→ₓ. These 17 letters cover most scientific notation needs.",
              },
              {
                title: "Missing Letters",
                desc: "b, c, d, f, g, q, w, y, z have no Unicode subscript form. These letters pass through unchanged in the output.",
              },
              {
                title: "Digits (0-9)",
                desc: "0→₀ 1→₁ 2→₂ 3→₃ 4→₄ 5→₅ 6→₆ 7→₇ 8→₈ 9→₉. Full digit coverage for chemical formulas and indexes.",
              },
              {
                title: "Symbols",
                desc: "+→₊ -→₋ =→₌ (→₍ )→₎. Write complete subscript expressions with math operators and grouping.",
              },
              {
                title: "Chemical Formulas",
                desc: "H₂O, CO₂, NaCl, H₂SO₄, C₆H₁₂O₆ — subscript digits make chemical formulas readable anywhere.",
              },
              {
                title: "Math Indexing",
                desc: "Use subscript for sequence notation: a₁, a₂, aₙ, xᵢ, yⱼ. Perfect for variables with index subscripts.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-neutral-900 p-3"
              >
                <div className="text-sm font-semibold">{item.title}</div>
                <p className="mt-1 text-xs text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="subscript-generator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqItems.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4"
              >
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            FlipMyCase offers a suite of free browser-based text tools. Generate subscript text
            here, then explore more Unicode and text conversion tools.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/superscript-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              &#x02E2; Superscript Generator
            </Link>
            <Link
              href="/bubble-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              &#9399; Bubble Text
            </Link>
            <Link
              href="/wide-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              &#65335; Wide Text
            </Link>
            <Link
              href="/bold-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              &#x1D401; Bold Text
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
