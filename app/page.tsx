"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "light" | "dark";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

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

function toSnake(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function toKebab(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toCamel(input: string) {
  const cleaned = input
    .trim()
    .replace(/[_-]/g, " ")
    .replace(/[^a-zA-Z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "";

  const parts = cleaned.split(" ");
  const first = parts[0].toLowerCase();
  const rest = parts
    .slice(1)
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1).toLowerCase() : ""))
    .join("");

  const merged = (first + rest).replace(/[^a-zA-Z0-9]/g, "");
  return merged ? merged[0].toLowerCase() + merged.slice(1) : "";
}

function toPascal(input: string) {
  const camel = toCamel(input);
  return camel ? camel[0].toUpperCase() + camel.slice(1) : "";
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
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
          "flex items-center justify-between px-3 py-2 border-b",
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

      <div className="p-3">
        <pre className="whitespace-pre-wrap break-words text-sm leading-6">
          {props.value || ""}
        </pre>
      </div>
    </div>
  );
}

function SectionCard(props: {
  mode: Mode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const isDark = props.mode === "dark";

  return (
    <section
      className={cx(
        "mt-6 rounded-2xl border shadow-sm",
        isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
      )}
    >
      <div
        className={cx(
          "px-4 py-3 border-b",
          isDark ? "border-white/10" : "border-black/5"
        )}
      >
        <h2 className="text-base sm:text-lg font-semibold">{props.title}</h2>
        {props.description ? (
          <p className={cx("mt-1 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
            {props.description}
          </p>
        ) : null}
      </div>
      <div className="p-4">{props.children}</div>
    </section>
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
    return [
      { label: "UPPERCASE", value: text.toUpperCase() },
      { label: "lowercase", value: text.toLowerCase() },
      { label: "Title Case", value: toTitleCase(text) },
      { label: "Sentence case", value: toSentenceCase(text) },
      { label: "camelCase", value: toCamel(text) },
      { label: "PascalCase", value: toPascal(text) },
      { label: "snake_case", value: toSnake(text) },
      { label: "kebab-case (for URLs)", value: toKebab(text) },
      { label: "aLtErNaTiNg", value: toAlternatingCase(text) },
      { label: "slug (url-friendly)", value: toSlug(text) },
    ];
  }, [text]);

  const common = outputs.slice(0, 4);
  const dev = outputs.slice(4);

  async function doCopy(label: string, value: string) {
    await copyToClipboard(value || "");
    setToast(`Copied: ${label}`);
    window.setTimeout(() => setToast(""), 1100);
  }

  function clearAll() {
    setText("");
    inputRef.current?.focus();
  }

  const exampleInput = "hello world from TEXT case converter";
  const exampleOutputTitle = toTitleCase(exampleInput);
  const exampleOutputSnake = toSnake(exampleInput);
  const exampleOutputSlug = toSlug(exampleInput);

  return (
    <main
      className={cx(
        "min-h-screen pb-24",
        isDark ? "bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Text Case Converter
            </h1>
            <p className={cx("mt-1 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
              Paste text once. Copy clean formats fast. Ctrl or Cmd plus K focuses input. Ctrl or Cmd plus L toggles theme.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cx(
                "rounded-xl px-3 py-2 text-sm border",
                isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
              )}
              onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
            >
              {isDark ? "Light" : "Dark"}
            </button>

            <button
              type="button"
              className={cx(
                "rounded-xl px-3 py-2 text-sm border",
                isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
              )}
              onClick={clearAll}
            >
              Clear
            </button>
          </div>
        </div>

        <div
          className={cx(
            "mt-4 rounded-2xl border shadow-sm",
            isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
          )}
        >
          <div
            className={cx(
              "px-3 py-2 border-b text-sm font-semibold",
              isDark ? "border-white/10" : "border-black/5"
            )}
          >
            Input
          </div>
          <div className="p-3">
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Paste or type text here..."
              className={cx(
                "w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none",
                isDark
                  ? "border-white/10 bg-neutral-950 focus:ring-2 focus:ring-white/10"
                  : "border-black/10 bg-neutral-50 focus:ring-2 focus:ring-black/10"
              )}
            />
          </div>
        </div>

        <div className="mt-4">
          <div className={cx("text-xs uppercase tracking-wide", isDark ? "text-neutral-400" : "text-neutral-500")}>
            Common
          </div>

          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {common.map((o) => (
              <Card
                key={o.label}
                label={o.label}
                value={o.value}
                mode={mode}
                onCopy={() => doCopy(o.label, o.value)}
              />
            ))}
          </div>

          <div className={cx("mt-4 text-xs uppercase tracking-wide", isDark ? "text-neutral-400" : "text-neutral-500")}>
            Developer and other formats
          </div>

          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {dev.map((o) => (
              <Card
                key={o.label}
                label={o.label}
                value={o.value}
                mode={mode}
                onCopy={() => doCopy(o.label, o.value)}
              />
            ))}
          </div>

          <SectionCard
            mode={mode}
            title="How to use this tool"
            description="One paste. Multiple outputs. One-click copy."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <div
                className={cx(
                  "rounded-2xl border p-4",
                  isDark ? "border-white/10 bg-neutral-950" : "border-black/10 bg-neutral-50"
                )}
              >
                <h3 className="text-sm font-semibold">Example input</h3>
                <div className={cx("mt-2 text-sm", isDark ? "text-neutral-200" : "text-neutral-700")}>
                  Paste:
                </div>
                <pre
                  className={cx(
                    "mt-2 rounded-2xl border px-3 py-2 text-sm whitespace-pre-wrap break-words",
                    isDark ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white"
                  )}
                >
                  {exampleInput}
                </pre>
              </div>

              <div
                className={cx(
                  "rounded-2xl border p-4",
                  isDark ? "border-white/10 bg-neutral-950" : "border-black/10 bg-neutral-50"
                )}
              >
                <h3 className="text-sm font-semibold">Example outputs</h3>
                <div className="mt-3 grid gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className={cx("text-xs uppercase tracking-wide", isDark ? "text-neutral-400" : "text-neutral-500")}>
                        Title Case
                      </div>
                      <div className={cx("mt-1 text-sm", isDark ? "text-neutral-200" : "text-neutral-700")}>
                        {exampleOutputTitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className={cx("text-xs uppercase tracking-wide", isDark ? "text-neutral-400" : "text-neutral-500")}>
                        snake_case
                      </div>
                      <div className={cx("mt-1 text-sm", isDark ? "text-neutral-200" : "text-neutral-700")}>
                        {exampleOutputSnake}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className={cx("text-xs uppercase tracking-wide", isDark ? "text-neutral-400" : "text-neutral-500")}>
                        slug
                      </div>
                      <div className={cx("mt-1 text-sm", isDark ? "text-neutral-200" : "text-neutral-700")}>
                        {exampleOutputSlug}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={cx("mt-4 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
                  Tips: Ctrl or Cmd plus K focuses input. Copy buttons live on every output card.
                </div>
              </div>
            </div>
          </SectionCard>

          <section
            className={cx(
              "mt-6 rounded-2xl border p-5",
              isDark ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Learn the formats</h2>
                <p className={cx("mt-1 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
                  Short explanations and use cases.
                </p>
              </div>
              <a
                href="/learn"
                className={cx(
                  "rounded-xl border px-3 py-2 text-sm",
                  isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
                )}
              >
                Open Learn
              </a>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div
                className={cx(
                  "rounded-2xl border p-4",
                  isDark ? "border-white/10 bg-neutral-950" : "border-black/10 bg-neutral-50"
                )}
              >
                <h3 className="text-sm font-semibold">Common writing cases</h3>
                <p className={cx("mt-2 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
                  Headings, documents, and readability.
                </p>

                <ul className={cx("mt-3 space-y-2 text-sm", isDark ? "text-neutral-200" : "text-neutral-700")}>
                  <li><span className="font-semibold">UPPERCASE</span> for labels and emphasis.</li>
                  <li><span className="font-semibold">lowercase</span> for normalization.</li>
                  <li><span className="font-semibold">Title Case</span> for headings and titles.</li>
                  <li><span className="font-semibold">Sentence case</span> for normal writing.</li>
                </ul>
              </div>

              <div
                className={cx(
                  "rounded-2xl border p-4",
                  isDark ? "border-white/10 bg-neutral-950" : "border-black/10 bg-neutral-50"
                )}
              >
                <h3 className="text-sm font-semibold">Developer formats</h3>
                <p className={cx("mt-2 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
                  Variables, file names, and URLs.
                </p>

                <ul className={cx("mt-3 space-y-2 text-sm", isDark ? "text-neutral-200" : "text-neutral-700")}>
                  <li><span className="font-semibold">camelCase</span> for JavaScript variables.</li>
                  <li><span className="font-semibold">PascalCase</span> for components and classes.</li>
                  <li><span className="font-semibold">snake_case</span> for Python and databases.</li>
                  <li><span className="font-semibold">kebab-case</span> for URLs and file paths.</li>
                  <li><span className="font-semibold">slug</span> for URL-friendly page names.</li>
                </ul>
              </div>
            </div>

            <div
              className={cx(
                "mt-4 rounded-2xl border p-4",
                isDark ? "border-white/10 bg-neutral-950" : "border-black/10 bg-neutral-50"
              )}
            >
              <h3 className="text-sm font-semibold">Why it saves time</h3>
              <div className={cx("mt-2 grid gap-2 text-sm lg:grid-cols-2", isDark ? "text-neutral-200" : "text-neutral-700")}>
                <p>Paste once. Outputs update instantly.</p>
                <p>Copy output with one click.</p>
                <p>Fewer manual edits and fewer mistakes.</p>
                <p>Fast slugs for posts and products.</p>
              </div>

              <div className={cx("mt-3 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
                For deeper examples, open the Learn page.
              </div>
            </div>
          </section>

          <SectionCard
            mode={mode}
            title="FAQ"
            description="Quick answers to common questions."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <div
                className={cx(
                  "rounded-2xl border p-4",
                  isDark ? "border-white/10 bg-neutral-950" : "border-black/10 bg-neutral-50"
                )}
              >
                <h3 className="text-sm font-semibold">Does this tool store my text?</h3>
                <p className={cx("mt-2 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
                  The page processes text in your browser. The tool saves input locally so refresh does not wipe it.
                </p>
              </div>

              <div
                className={cx(
                  "rounded-2xl border p-4",
                  isDark ? "border-white/10 bg-neutral-950" : "border-black/10 bg-neutral-50"
                )}
              >
                <h3 className="text-sm font-semibold">Why does sentence case only change the first letter?</h3>
                <p className={cx("mt-2 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
                  Sentence case here standardizes the start of the text. For multi-sentence punctuation rules, use a writing tool.
                </p>
              </div>

              <div
                className={cx(
                  "rounded-2xl border p-4",
                  isDark ? "border-white/10 bg-neutral-950" : "border-black/10 bg-neutral-50"
                )}
              >
                <h3 className="text-sm font-semibold">What is a slug?</h3>
                <p className={cx("mt-2 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
                  A slug is the URL-safe part of a page address. It uses lowercase letters, numbers, and hyphens.
                </p>
              </div>

              <div
                className={cx(
                  "rounded-2xl border p-4",
                  isDark ? "border-white/10 bg-neutral-950" : "border-black/10 bg-neutral-50"
                )}
              >
                <h3 className="text-sm font-semibold">Why do camelCase and PascalCase drop symbols?</h3>
                <p className={cx("mt-2 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}>
                  Those formats target identifiers. Symbols and extra separators get removed so the result stays valid for code.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <div
        className={cx(
          "fixed bottom-0 left-0 right-0 border-t",
          isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-3">
          <div className={cx("text-xs", isDark ? "text-neutral-300" : "text-neutral-600")}>
            Support keeps this tool free.
          </div>
          <div
            className={cx(
              "text-xs px-3 py-1 rounded-xl border",
              isDark ? "border-white/10 text-neutral-300" : "border-black/10 text-neutral-600"
            )}
          >
            Thanks for using it.
          </div>
        </div>
      </div>

      {toast ? (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      ) : null}
    </main>
  );
}
