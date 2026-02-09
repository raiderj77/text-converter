"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "light" | "dark";

function toSentenceCase(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return "";
  const lower = trimmed.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function toTitleCase(input: string) {
  return input.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase());
}

function toAlternatingCase(input: string) {
  let out = "";
  let flip = false;
  for (const ch of input) {
    if (/[a-z]/i.test(ch)) {
      out += flip ? ch.toUpperCase() : ch.toLowerCase();
      flip = !flip;
    } else {
      out += ch;
    }
  }
  return out;
}

function toSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Card(props: {
  label: string;
  value: string;
  mode: Mode;
  onCopy: () => void;
}) {
  const isDark = props.mode === "dark";

  return (
    <div
      className={cx(
        "rounded-2xl border shadow-sm",
        isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
      )}
    >
      <div
        className={cx(
          "flex items-center justify-between px-4 py-3 border-b",
          isDark ? "border-white/10" : "border-black/5"
        )}
      >
        <div className="text-sm font-semibold">{props.label}</div>
        <button
          className={cx(
            "text-sm rounded-xl px-3 py-1.5 border",
            isDark
              ? "border-white/10 hover:bg-white/10"
              : "border-black/10 hover:bg-black/5"
          )}
          onClick={props.onCopy}
          type="button"
        >
          Copy
        </button>
      </div>
      <div className="p-4">
        <pre className="whitespace-pre-wrap break-words text-sm leading-6">
          {props.value || ""}
        </pre>
      </div>
    </div>
  );
}

export default function Page() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("dark");
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const isDark = mode === "dark";

  useEffect(() => {
    const savedText = localStorage.getItem("tcc_text");
    if (savedText) setText(savedText);

    const savedMode = localStorage.getItem("tcc_mode") as Mode | null;
    if (savedMode === "dark" || savedMode === "light") setMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("tcc_text", text);
  }, [text]);

  useEffect(() => {
    localStorage.setItem("tcc_mode", mode);
  }, [mode]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const meta = e.metaKey || e.ctrlKey;

      if (meta && key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (meta && key === "l") {
        e.preventDefault();
        setMode((m) => (m === "dark" ? "light" : "dark"));
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const outputs = useMemo(() => {
    const upper = text.toUpperCase();
    const lower = text.toLowerCase();
    const title = toTitleCase(text);
    const sentence = toSentenceCase(text);

    const camel = text
      .toLowerCase()
      .replace(/[^a-z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase())
      .replace(/[^a-z0-9]/g, "");

    const pascal = camel ? camel.charAt(0).toUpperCase() + camel.slice(1) : "";

    const snake = text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

    const kebab = text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const alternating = toAlternatingCase(text);
    const slug = toSlug(text);

    return [
      { label: "UPPERCASE", value: upper },
      { label: "lowercase", value: lower },
      { label: "Title Case", value: title },
      { label: "Sentence case", value: sentence },
      { label: "camelCase", value: camel },
      { label: "PascalCase", value: pascal },
      { label: "snake_case", value: snake },
      { label: "kebab-case", value: kebab },
      { label: "aLtErNaTiNg", value: alternating },
      { label: "slug", value: slug },
    ];
  }, [text]);

  async function doCopy(label: string, value: string) {
    await copyToClipboard(value || "");
    setToast(`Copied: ${label}`);
    window.setTimeout(() => setToast(""), 1200);
  }

  function clearAll() {
    setText("");
    inputRef.current?.focus();
  }

  return (
    <main
      className={cx(
        "min-h-screen",
        isDark ? "bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Text Case Converter
            </h1>
            <p
              className={cx(
                "mt-2 text-sm",
                isDark ? "text-neutral-300" : "text-neutral-600"
              )}
            >
              Type once. Get every case instantly. Ctrl or Cmd plus K focuses the
              box. Ctrl or Cmd plus L toggles theme.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cx(
                "rounded-xl px-3 py-2 text-sm border",
                isDark
                  ? "border-white/10 hover:bg-white/10"
                  : "border-black/10 hover:bg-black/5"
              )}
              onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
            >
              {isDark ? "Light" : "Dark"}
            </button>
            <button
              type="button"
              className={cx(
                "rounded-xl px-3 py-2 text-sm border",
                isDark
                  ? "border-white/10 hover:bg-white/10"
                  : "border-black/10 hover:bg-black/5"
              )}
              onClick={clearAll}
            >
              Clear
            </button>
          </div>
        </div>

        <div
          className={cx(
            "mt-6 rounded-2xl border shadow-sm",
            isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
          )}
        >
          <div
            className={cx(
              "px-4 py-3 border-b text-sm font-semibold",
              isDark ? "border-white/10" : "border-black/5"
            )}
          >
            Input
          </div>
          <div className="p-4">
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="Paste or type text here..."
              className={cx(
                "w-full resize-y rounded-2xl border px-4 py-3 text-sm leading-6 outline-none",
                isDark
                  ? "border-white/10 bg-neutral-950 focus:ring-2 focus:ring-white/10"
                  : "border-black/10 bg-neutral-50 focus:ring-2 focus:ring-black/10"
              )}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {outputs.map((o) => (
            <Card
              key={o.label}
              label={o.label}
              value={o.value}
              mode={mode}
              onCopy={() => doCopy(o.label, o.value)}
            />
          ))}
        </div>

        <div
          className={cx(
            "mt-8 rounded-2xl border shadow-sm",
            isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
          )}
        >
          <div
            className={cx(
              "px-4 py-3 border-b text-sm font-semibold",
              isDark ? "border-white/10" : "border-black/5"
            )}
          >
            Ad slot
          </div>
          <div className={cx("p-4 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
            Place one clean banner here after AdSense approval.
          </div>
        </div>
      </div>

      {toast ? (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      ) : null}
    </main>
  );
}
