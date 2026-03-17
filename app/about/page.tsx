import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";
import { BreadcrumbSchema, OrganizationSchema } from "@/components/seo/schema";

export const metadata: Metadata = {
  title: "About FlipMyCase — Free Text Conversion Tools",
  description:
    "FlipMyCase offers 73+ free browser-based text tools for developers, writers, and content creators. All processing happens client-side — your text never leaves your device.",
  alternates: { canonical: `${SITE_URL}/about` },
  keywords: [
    "about flipmycase", "free text tools", "online text converter",
    "browser-based text tools", "developer text tools",
  ],
  openGraph: {
    title: "About FlipMyCase — Free Text Conversion Tools",
    description:
      "73+ free browser-based text tools for developers, writers, and content creators. No signup, no data collection.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <OrganizationSchema />
      <main className="mx-auto max-w-3xl px-4 py-8" style={{ lineHeight: 1.7 }}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">About FlipMyCase</h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>

        <div className="mt-3 text-sm text-neutral-300 space-y-3">
          <p>
            FlipMyCase is a free suite of 73+ browser-based text transformation tools built for
            developers, writers, content creators, and anyone who works with text for a living.
          </p>
          <p>
            Every tool on this site does one thing: takes text you paste in and instantly gives you
            back what you need — reformatted, cleaned, encoded, analyzed, or generated — with a
            single click. No signup. No account. No text sent to a server. Everything runs in your
            browser.
          </p>
        </div>

        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">Why FlipMyCase Exists</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-3">
            <p>
              Most text tools online are either buried inside bloated productivity apps you have to
              pay for, scattered across five different websites, or so poorly designed that finding
              the right option takes longer than just doing it manually.
            </p>
            <p>
              FlipMyCase was built to fix that. One site, every common text operation, fast and free.
            </p>
            <p>
              The suite covers case conversion (UPPERCASE, lowercase, Title Case, camelCase,
              snake_case, kebab-case, and a dozen others), text cleaning, encoding and decoding,
              developer formatters (JSON, YAML, XML, SQL, CSS, HTML, JavaScript), analysis tools
              (word counter, readability, text diff, AI writing analyzer), and generators (Lorem
              Ipsum, password, UUID, QR code, and more).
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">How Your Text Is Handled</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-3">
            <p>
              All processing happens in your browser using JavaScript. Your text is never sent to a
              server, never logged, and never stored anywhere outside your own device. The site uses
              localStorage to preserve your input across page refreshes — that data stays on your
              machine.
            </p>
            <p>
              FlipMyCase uses standard analytics (page views, device types, traffic sources) to
              understand how tools are being used and improve them over time. No personally
              identifiable information is collected.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">Who Built This</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-3">
            <p>
              FlipMyCase is an independent tool site built and maintained by an experienced web
              developer. It launched in 2024 and is actively updated — new tools are added based on
              what people actually search for and request.
            </p>
            <p>
              If you have a feature request, found a bug, or want a format that isn{"'"}t here yet,
              use the{" "}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                Contact page
              </Link>
              . Include an example input and the output you expected.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">The Tools</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-3">
            <p>FlipMyCase currently includes 73+ tools across six categories:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-neutral-200">Text &amp; Case</strong> — case converters,
                text cleaners, sorters, reversers, and line tools
              </li>
              <li>
                <strong className="text-neutral-200">Analysis</strong> — word counter, readability
                analyzer, text diff, word frequency, AI writing detector
              </li>
              <li>
                <strong className="text-neutral-200">Font Styles</strong> — bold, italic,
                strikethrough, small caps, bubble text, wide text, and Unicode styles
              </li>
              <li>
                <strong className="text-neutral-200">Developer</strong> — JSON, YAML, XML, SQL, CSS,
                HTML, and JavaScript formatters; regex tester; hash generator; JWT decoder; cron
                builder
              </li>
              <li>
                <strong className="text-neutral-200">Encoding</strong> — Base64, URL encoding, HTML
                entities, binary, hex, Morse code, ROT13, NATO phonetic
              </li>
              <li>
                <strong className="text-neutral-200">Generators</strong> — Lorem ipsum, password
                generator, UUID, QR code, Unix timestamp, Roman numerals, emoji picker
              </li>
            </ul>
            <p>All tools are free with no usage limits.</p>
          </div>
        </section>

        <p className="mt-8 text-xs text-neutral-500">
          For full privacy details, see our{" "}
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
            Privacy Policy
          </Link>
          .
        </p>
      </main>
    </>
  );
}
