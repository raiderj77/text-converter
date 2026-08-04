import type { Metadata } from "next";
import Link from "next/link";
import { PrivacyTestRunner } from "@/components/privacy-test-runner";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { SITE_URL } from "@/lib/config";
import {
  TOOL_INVENTORY_COUNTS,
  localStorageTools,
  pageMemoryTools,
  referenceGuides,
} from "@/lib/tool-inventory";

const pageUrl = `${SITE_URL}/privacy-and-testing`;

export const metadata: Metadata = {
  title: "Privacy & Test Center",
  description:
    "Review FlipMyCase tool and browser-storage boundaries, then run sampled checks against the site's current implementations.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Privacy & Test Center | FlipMyCase",
    description:
      "A transparent inventory of interactive tools, browser storage, privacy boundaries, and sampled implementation checks.",
    url: pageUrl,
    type: "website",
  },
};

function routeFor(slug: string) {
  return slug ? `/${slug}` : "/";
}

function InventoryList({
  entries,
  emptyLabel,
}: {
  entries: typeof localStorageTools;
  emptyLabel: string;
}) {
  if (entries.length === 0) return <p className="mt-3 text-sm text-neutral-300">{emptyLabel}</p>;

  return (
    <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <li key={entry.slug}>
          <Link
            href={routeFor(entry.slug)}
            className="flex min-h-11 flex-col justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <span className="font-medium text-white">{entry.name}</span>
            <span className="mt-0.5 font-mono text-xs text-neutral-400">{routeFor(entry.slug)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyAndTestingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy & Test Center", href: "/privacy-and-testing" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 text-neutral-300">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
            Reviewed August 3, 2026
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Privacy &amp; Test Center
          </h1>
          <p className="mt-4 text-base leading-8">
            This page makes two narrow parts of the current implementation inspectable: which
            public entries are interactive tools versus reference guides, and which interactive
            routes use localStorage versus page memory. It also provides user-triggered sample
            checks for a small set of deterministic functions.
          </p>
        </header>

        <section aria-labelledby="inventory-heading" className="mt-12">
          <h2 id="inventory-heading" className="text-2xl font-semibold text-white">
            Current public inventory
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [TOOL_INVENTORY_COUNTS.interactive, "Interactive tools"],
              [TOOL_INVENTORY_COUNTS.referenceGuides, "Reference guides"],
              [TOOL_INVENTORY_COUNTS.localStorage, "Tools using localStorage"],
              [TOOL_INVENTORY_COUNTS.pageMemory, "Tools using page memory"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-bold text-white">{value}</p>
                <p className="mt-1 text-sm text-neutral-300">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-7">
            Of the 75 interactive tools, 25 currently reference localStorage to remember recent
            input and/or settings on the visitor&apos;s device. The other 50 keep tool state in page
            memory for the current tab session. Theme and analytics-consent preferences also use
            localStorage, but they are site preferences and are not counted as tool routes.
          </p>

          <details className="mt-6 rounded-xl border border-white/10 bg-neutral-900 p-5">
            <summary className="cursor-pointer font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400">
              25 interactive routes that use localStorage
            </summary>
            <InventoryList entries={localStorageTools} emptyLabel="No localStorage routes found." />
          </details>

          <details className="mt-4 rounded-xl border border-white/10 bg-neutral-900 p-5">
            <summary className="cursor-pointer font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400">
              50 interactive routes that use page memory
            </summary>
            <InventoryList entries={pageMemoryTools} emptyLabel="No page-memory routes found." />
          </details>

          <details className="mt-4 rounded-xl border border-white/10 bg-neutral-900 p-5">
            <summary className="cursor-pointer font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400">
              3 reference guides
            </summary>
            <InventoryList entries={referenceGuides} emptyLabel="No reference guides found." />
          </details>
        </section>

        <section aria-labelledby="boundaries-heading" className="mt-12">
          <h2 id="boundaries-heading" className="text-2xl font-semibold text-white">
            Privacy and browser boundaries
          </h2>
          <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-[760px] w-full border-collapse text-left text-sm leading-6">
              <caption className="sr-only">Current FlipMyCase privacy and browser boundaries</caption>
              <thead className="bg-white/5 text-neutral-200">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Area</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Current boundary</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Tool processing",
                    "Interactive tool logic runs in the browser. FlipMyCase does not intentionally include entered tool content in application-server requests or analytics events.",
                  ],
                  [
                    "Browser storage",
                    "The inventory above distinguishes 25 tool routes that reference localStorage from 50 that keep tool state in page memory. Visitors can remove stored values through tool reset controls or browser site-data settings.",
                  ],
                  [
                    "Optional analytics",
                    "Google Analytics stays blocked unless a visitor allows it. If allowed, the site sends a page title and path without the query string, plus standard technical, device, engagement, cookie, and analytics-identifier data. Tool input and output are not intentionally included.",
                  ],
                  [
                    "Hosting logs",
                    "Vercel may process ordinary request information such as IP address, user agent, requested URL, timestamp, and security events when serving the site.",
                  ],
                  [
                    "Offline cache",
                    "The service worker keeps bounded caches for public pages and static assets. It skips page navigations that contain a query string. Visitors can remove these caches through browser site-data settings.",
                  ],
                  [
                    "Selected files",
                    "The hash tool reads a selected file into available browser memory with arrayBuffer. The current tool code does not intentionally submit selected file contents to FlipMyCase, but browser extensions and device software remain outside the site's control.",
                  ],
                  [
                    "Clipboard",
                    "Copy controls write only after a visitor activates them. Current tool code does not call clipboard read or readText methods; the browser can still apply permission and security rules.",
                  ],
                ].map(([area, boundary]) => (
                  <tr key={area} className="border-t border-white/10 align-top">
                    <th scope="row" className="px-4 py-3 font-semibold text-white">{area}</th>
                    <td className="px-4 py-3">{boundary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-7">
            For policy details and visitor choices, read the{" "}
            <Link href="/privacy" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/cookies" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">
              Cookie and Browser Storage Policy
            </Link>
            .
          </p>
        </section>

        <PrivacyTestRunner />

        <section aria-labelledby="case-study-heading" className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
            Engineering case study
          </p>
          <h2 id="case-study-heading" className="mt-2 text-2xl font-semibold text-white">
            Keeping file hashing byte-accurate
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7">
            <p>
              The{" "}
              <Link href="/hash-generator" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">
                Hash Generator
              </Link>{" "}
              reads a selected file once with <code>arrayBuffer()</code>, passes the resulting bytes
              to the MD5 implementation, and keeps a request-generation counter so an older file
              read cannot replace a newer result.
            </p>
            <p>
              Repository regression tests exercise the MD5 implementation with an empty string,
              <code>abc</code>, an emoji, an exact raw-byte vector, and HMAC-MD5 reference vectors.
              The sample runner above intentionally exposes only the deterministic <code>md5(&quot;abc&quot;)</code>
              check; it does not open or inspect a visitor&apos;s file.
            </p>
          </div>
        </section>

        <section aria-labelledby="limitations-heading" className="mt-12 max-w-4xl">
          <h2 id="limitations-heading" className="text-2xl font-semibold text-white">Limitations</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7">
            <li>The sample runner covers seven fixed function paths, not every tool, option, or interaction.</li>
            <li>It does not test layout, keyboard behavior, assistive technology, performance, or network failures.</li>
            <li>It is not a security, privacy, accessibility, or software-quality certification.</li>
            <li>No cross-browser or cross-device conclusion should be drawn from one page session.</li>
            <li>Implementation and storage behavior can change; the review date above identifies this snapshot.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
