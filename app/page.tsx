"use client";

import { useMemo, useState } from "react";

function toTitleCase(input: string) {
  return input.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase());
}

function toSentenceCase(input: string) {
  const t = input.trim().toLowerCase();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : "";
}

function toSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Page() {
  const [text, setText] = useState("");

  const outputs = useMemo(() => {
    return {
      upper: text.toUpperCase(),
      lower: text.toLowerCase(),
      title: toTitleCase(text),
      sentence: toSentenceCase(text),
      camel: text
        .toLowerCase()
        .replace(/[^a-z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase())
        .replace(/[^a-z0-9]/g, ""),
      snake: text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, ""),
      kebab: text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
      slug: toSlug(text),
    };
  }, [text]);

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1>Text Case Converter</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ width: "100%", marginTop: 16, padding: 12 }}
        placeholder="Paste text here"
      />

      <div style={{ marginTop: 24 }}>
        <h3>Common</h3>
        <pre>{outputs.upper}</pre>
        <pre>{outputs.lower}</pre>
        <pre>{outputs.title}</pre>
        <pre>{outputs.sentence}</pre>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3>Developer</h3>
        <pre>{outputs.camel}</pre>
        <pre>{outputs.snake}</pre>
        <pre>{outputs.kebab}</pre>
        <pre>{outputs.slug}</pre>
      </div>

      <div style={{ marginTop: 32 }}>
        <h4>How to use</h4>
        <p>Paste or type text into the input box. All formats update instantly.</p>
        <p>Copy any result and reuse it anywhere.</p>
        <p>
          Need detailed explanations? Visit <a href="/learn">Learn</a>.
        </p>
      </div>
    </main>
  );
}
