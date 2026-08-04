"use client";

import { useState } from "react";
import { toCamelCase, toSlug, toUpperCase } from "@/lib/conversions";
import { md5 } from "@/lib/md5.js";
import {
  decodeHtmlEntitiesOnce,
  stripMarkupTags,
  validateXml,
} from "@/lib/markup-text.js";

type SampleStatus = "Not run" | "Passed" | "Review";

type SampleResult = {
  id: string;
  check: string;
  implementation: string;
  input: string;
  expected: string;
  actual: string;
  status: SampleStatus;
};

type Sample = Omit<SampleResult, "actual" | "status"> & {
  execute: () => string;
};

const samples: Sample[] = [
  {
    id: "uppercase",
    check: "Uppercase conversion",
    implementation: "toUpperCase",
    input: "Flip my case",
    expected: "FLIP MY CASE",
    execute: () => toUpperCase("Flip my case"),
  },
  {
    id: "camel-case",
    check: "camelCase conversion",
    implementation: "toCamelCase",
    input: "Flip my case",
    expected: "flipMyCase",
    execute: () => toCamelCase("Flip my case"),
  },
  {
    id: "slug",
    check: "URL slug conversion",
    implementation: "toSlug",
    input: "  Hello, World!  ",
    expected: "hello-world",
    execute: () => toSlug("  Hello, World!  "),
  },
  {
    id: "md5",
    check: "MD5 reference vector",
    implementation: "md5",
    input: "abc",
    expected: "900150983cd24fb0d6963f7d28e17f72",
    execute: () => md5("abc"),
  },
  {
    id: "markup",
    check: "Markup removal",
    implementation: "stripMarkupTags",
    input: "<p>Hello <strong>world</strong>.</p>",
    expected: "Hello world.",
    execute: () => stripMarkupTags("<p>Hello <strong>world</strong>.</p>"),
  },
  {
    id: "entities",
    check: "HTML entity decoding",
    implementation: "decodeHtmlEntitiesOnce",
    input: "&amp;lt; &copy; &#x1F600;",
    expected: "&lt; © 😀",
    execute: () => decodeHtmlEntitiesOnce("&amp;lt; &copy; &#x1F600;"),
  },
  {
    id: "xml",
    check: "Well-formed XML validation",
    implementation: "validateXml",
    input: '<root><item id="1">ok</item></root>',
    expected: "No validation error",
    execute: () =>
      validateXml('<root><item id="1">ok</item></root>') ?? "No validation error",
  },
];

const initialResults: SampleResult[] = samples.map((sample) => ({
  id: sample.id,
  check: sample.check,
  implementation: sample.implementation,
  input: sample.input,
  expected: sample.expected,
  actual: "Run the samples to see this result.",
  status: "Not run",
}));

export function PrivacyTestRunner() {
  const [results, setResults] = useState<SampleResult[]>(initialResults);
  const [announcement, setAnnouncement] = useState(
    "Samples have not been run in this page session.",
  );

  function runSamples() {
    const nextResults = samples.map(({ execute, ...sample }) => {
      try {
        const actual = execute();
        return {
          ...sample,
          actual,
          status: actual === sample.expected ? "Passed" : "Review",
        } satisfies SampleResult;
      } catch (error) {
        return {
          ...sample,
          actual: error instanceof Error ? `Error: ${error.message}` : "Unexpected error",
          status: "Review",
        } satisfies SampleResult;
      }
    });

    setResults(nextResults);
    setAnnouncement("Sample checks completed. Review each result in the table.");
  }

  return (
    <section aria-labelledby="sample-checks-heading" className="mt-12">
      <h2 id="sample-checks-heading" className="text-2xl font-semibold text-white">
        Run sampled implementation checks
      </h2>
      <p id="sample-checks-limit" className="mt-3 max-w-3xl text-sm leading-7 text-neutral-300">
        This button runs seven fixed examples against exported functions already used by the site.
        Results stay in this page&apos;s React state. The runner does not call a network API, write to
        localStorage, select a file, or use the clipboard.
      </p>
      <button
        type="button"
        onClick={runSamples}
        aria-describedby="sample-checks-limit"
        className="mt-5 min-h-11 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-neutral-950"
      >
        Run sampled checks
      </button>
      <p className="mt-3 text-sm text-neutral-300" role="status" aria-live="polite">
        {announcement}
      </p>

      <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-[900px] w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Status and exact results for the user-triggered sample checks
          </caption>
          <thead className="bg-white/5 text-neutral-200">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Check</th>
              <th scope="col" className="px-4 py-3 font-semibold">Implementation</th>
              <th scope="col" className="px-4 py-3 font-semibold">Input</th>
              <th scope="col" className="px-4 py-3 font-semibold">Expected</th>
              <th scope="col" className="px-4 py-3 font-semibold">Actual</th>
              <th scope="col" className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-t border-white/10 align-top">
                <th scope="row" className="px-4 py-3 font-medium text-white">
                  {result.check}
                </th>
                <td className="px-4 py-3"><code>{result.implementation}</code></td>
                <td className="px-4 py-3"><code className="break-all">{result.input}</code></td>
                <td className="px-4 py-3"><code className="break-all">{result.expected}</code></td>
                <td className="px-4 py-3"><code className="break-all">{result.actual}</code></td>
                <td className="px-4 py-3">
                  <span
                    className={
                      result.status === "Passed"
                        ? "font-semibold text-emerald-400"
                        : result.status === "Review"
                          ? "font-semibold text-amber-400"
                          : "text-neutral-400"
                    }
                  >
                    {result.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
