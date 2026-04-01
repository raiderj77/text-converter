"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const STORAGE_KEY = "fmc_fancy_text";

/* ── upside-down map ── */
const upsideDownMap: Record<string, string> = {
  a: "\u0250", b: "q", c: "\u0254", d: "p", e: "\u01DD", f: "\u025F",
  g: "\u0183", h: "\u0265", i: "\u1D09", j: "\u027E", k: "\u029E",
  l: "l", m: "\u026F", n: "u", o: "o", p: "d", q: "b", r: "\u0279",
  s: "s", t: "\u0287", u: "n", v: "\u028C", w: "\u028D", x: "x",
  y: "\u028E", z: "z",
  A: "\u2200", B: "\uA4ED", C: "\u2183", D: "\uA4F7", E: "\u018E",
  F: "\u2132", G: "\u2141", H: "H", I: "I", J: "\u027E", K: "\uA4D8",
  L: "\u2143", M: "W", N: "N", O: "O", P: "\u0500", Q: "\uA779",
  R: "\uA4E4", S: "S", T: "\u22A5", U: "\u2229", V: "\u039B",
  W: "M", X: "X", Y: "\u2144", Z: "Z",
  ".": "\u02D9", ",": "\u2018", "?": "\u00BF", "!": "\u00A1",
  "'": ",", '"': "\u201E", "(": ")", ")": "(", "[": "]", "]": "[",
  "{": "}", "}": "{", "<": ">", ">": "<", "_": "\u203E", "&": "\u214B",
};

/* ── small caps map ── */
const smallCapsMap: Record<string, string> = {
  a: "\u1D00", b: "\u0299", c: "\u1D04", d: "\u1D05", e: "\u1D07",
  f: "\uA730", g: "\u0262", h: "\u029C", i: "\u026A", j: "\u1D0A",
  k: "\u1D0B", l: "\u029F", m: "\u1D0D", n: "\u0274", o: "\u1D0F",
  p: "\u1D18", q: "\u01EB", r: "\u0280", s: "\u0455", t: "\u1D1B",
  u: "\u1D1C", v: "\u1D20", w: "\u1D21", x: "x", y: "\u028F", z: "\u1D22",
};

/* ── superscript map ── */
const superscriptMap: Record<string, string> = {
  a: "\u1D43", b: "\u1D47", c: "\u1D9C", d: "\u1D48", e: "\u1D49",
  f: "\u1DA0", g: "\u1D4D", h: "\u02B0", i: "\u2071", j: "\u02B2",
  k: "\u1D4F", l: "\u02E1", m: "\u1D50", n: "\u207F", o: "\u1D52",
  p: "\u1D56", q: "\u146B", r: "\u02B3", s: "\u02E2", t: "\u1D57",
  u: "\u1D58", v: "\u1D5B", w: "\u02B7", x: "\u02E3", y: "\u02B8",
  z: "\u1DBB",
  A: "\u1D2C", B: "\u1D2E", C: "\u1D9C", D: "\u1D30", E: "\u1D31",
  F: "\u1DA0", G: "\u1D33", H: "\u1D34", I: "\u1D35", J: "\u1D36",
  K: "\u1D37", L: "\u1D38", M: "\u1D39", N: "\u1D3A", O: "\u1D3C",
  P: "\u1D3E", Q: "\u146B", R: "\u1D3F", S: "\u02E2", T: "\u1D40",
  U: "\u1D41", V: "\u2C7D", W: "\u02B7", X: "\u02E3", Y: "\u02B8",
  Z: "\u1DBB",
  "0": "\u2070", "1": "\u00B9", "2": "\u00B2", "3": "\u00B3",
  "4": "\u2074", "5": "\u2075", "6": "\u2076", "7": "\u2077",
  "8": "\u2078", "9": "\u2079",
};

/* ── bubble / circled map ── */
const bubbleMap: Record<string, string> = {};
for (let i = 0; i < 26; i++) {
  bubbleMap[String.fromCharCode(65 + i)] = String.fromCharCode(0x24B6 + i); // A-Z
  bubbleMap[String.fromCharCode(97 + i)] = String.fromCharCode(0x24D2 + i); // a-z
}
for (let i = 1; i <= 9; i++) {
  bubbleMap[String(i)] = String.fromCharCode(0x2460 + i - 1); // 1-9
}
bubbleMap["0"] = "\u24EA"; // circled 0

/* ── conversion functions ── */

function mathBold(text: string): string {
  return [...text].map((ch) => {
    const c = ch.codePointAt(0)!;
    if (c >= 65 && c <= 90) return String.fromCodePoint(0x1D400 + (c - 65));
    if (c >= 97 && c <= 122) return String.fromCodePoint(0x1D41A + (c - 97));
    if (c >= 48 && c <= 57) return String.fromCodePoint(0x1D7CE + (c - 48));
    return ch;
  }).join("");
}

function mathItalic(text: string): string {
  return [...text].map((ch) => {
    const c = ch.codePointAt(0)!;
    if (c >= 65 && c <= 90) return String.fromCodePoint(0x1D434 + (c - 65));
    if (c >= 97 && c <= 122) {
      // h is special: italic h is U+210E
      if (c === 104) return "\u210E";
      const offset = c < 104 ? c - 97 : c - 97 - 1;
      return String.fromCodePoint(0x1D44E + (c < 104 ? c - 97 : c - 97));
    }
    return ch;
  }).join("");
}

function mathBoldItalic(text: string): string {
  return [...text].map((ch) => {
    const c = ch.codePointAt(0)!;
    if (c >= 65 && c <= 90) return String.fromCodePoint(0x1D468 + (c - 65));
    if (c >= 97 && c <= 122) return String.fromCodePoint(0x1D482 + (c - 97));
    return ch;
  }).join("");
}

function withCombining(text: string, combiner: string): string {
  return [...text].map((ch) => ch + combiner).join("");
}

function mapChars(text: string, map: Record<string, string>): string {
  return [...text].map((ch) => map[ch] ?? ch).join("");
}

function toUpsideDown(text: string): string {
  return [...text].map((ch) => upsideDownMap[ch] ?? ch).reverse().join("");
}

function sansSerifBold(text: string): string {
  return [...text].map((ch) => {
    const c = ch.codePointAt(0)!;
    if (c >= 65 && c <= 90) return String.fromCodePoint(0x1D5D4 + (c - 65));
    if (c >= 97 && c <= 122) return String.fromCodePoint(0x1D5EE + (c - 97));
    if (c >= 48 && c <= 57) return String.fromCodePoint(0x1D7EC + (c - 48));
    return ch;
  }).join("");
}

function monospace(text: string): string {
  return [...text].map((ch) => {
    const c = ch.codePointAt(0)!;
    if (c >= 65 && c <= 90) return String.fromCodePoint(0x1D670 + (c - 65));
    if (c >= 97 && c <= 122) return String.fromCodePoint(0x1D68A + (c - 97));
    if (c >= 48 && c <= 57) return String.fromCodePoint(0x1D7F6 + (c - 48));
    return ch;
  }).join("");
}

function fullwidth(text: string): string {
  return [...text].map((ch) => {
    const c = ch.codePointAt(0)!;
    // Printable ASCII range 0x21 (!) to 0x7E (~) maps to fullwidth 0xFF01+
    if (c >= 0x21 && c <= 0x7E) return String.fromCodePoint(0xFF01 + (c - 0x21));
    if (c === 0x20) return "\u3000"; // fullwidth space
    return ch;
  }).join("");
}

type StyleDef = {
  name: string;
  convert: (text: string) => string;
  link?: string;
};

const styles: StyleDef[] = [
  { name: "Bold", convert: mathBold, link: "/bold-text-generator" },
  { name: "Italic", convert: mathItalic, link: "/italic-text-generator" },
  { name: "Bold Italic", convert: mathBoldItalic, link: "/bold-italic-text-generator" },
  { name: "Underline", convert: (t) => withCombining(t, "\u0332"), link: "/underline-text-generator" },
  { name: "Strikethrough", convert: (t) => withCombining(t, "\u0336") },
  { name: "Small Caps", convert: (t) => mapChars(t, smallCapsMap) },
  { name: "Superscript", convert: (t) => mapChars(t, superscriptMap) },
  { name: "Bubble / Circled", convert: (t) => mapChars(t, bubbleMap) },
  { name: "Wide / Fullwidth", convert: fullwidth },
  { name: "Upside Down", convert: toUpsideDown, link: "/upside-down-text-generator" },
  { name: "Sans-Serif Bold", convert: sansSerifBold },
  { name: "Monospace", convert: monospace },
];

export function FancyTextGeneratorTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const base = isDark
    ? "bg-neutral-900 border-white/10 text-neutral-100"
    : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark
    ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600"
    : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark
    ? "bg-white/10 hover:bg-white/15 border-white/10"
    : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.input) setInput(parsed.input);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ input }));
    } catch {
      // ignore
    }
  }, [input]);

  const copyStyle = useCallback(async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const clearAll = () => setInput("");

  const handleExample = () => {
    setInput("Hello World! The quick brown fox jumps over the lazy dog.");
  };

  return (
    <div className="space-y-4">
      {/* Input area */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="fancy-text-input" className="text-sm font-semibold block mb-2">
          Your Text
        </label>
        <textarea
          id="fancy-text-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here to see all styles..."
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
            inputBase
          )}
          style={{ minHeight: "120px" }}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleExample}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
          >
            Load Example
          </button>
          <button
            type="button"
            onClick={clearAll}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Style grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-live="polite">
        {styles.map((style, idx) => {
          const converted = input ? style.convert(input) : "";
          return (
            <div key={style.name} className={cx("rounded-xl border p-4", base)}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">{style.name}</h3>
                <div className="flex items-center gap-2">
                  {style.link && (
                    <Link
                      href={style.link}
                      className={cx("rounded-lg border px-2 py-1 text-xs transition-colors min-h-[44px] flex items-center", btnBase)}
                    >
                      Open Tool
                    </Link>
                  )}
                  {converted && (
                    <button
                      type="button"
                      onClick={() => copyStyle(converted, idx)}
                      className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
                    >
                      {copiedIdx === idx ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
              </div>
              <div
                className={cx(
                  "rounded-lg border px-3 py-2 text-sm break-words overflow-auto whitespace-pre-wrap",
                  inputBase
                )}
                style={{ minHeight: "60px" }}
              >
                {converted || (
                  <span className={cx("text-sm", muted)}>
                    Preview appears here...
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
