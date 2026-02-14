"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type EncodingType = {
  id: string;
  label: string;
  encode: (s: string) => string;
  decode: (s: string) => string;
};

const ENCODINGS: EncodingType[] = [
  {
    id: "base64",
    label: "Base64",
    encode: (s) => {
      try {
        return btoa(unescape(encodeURIComponent(s)));
      } catch {
        return "[Error: cannot encode]";
      }
    },
    decode: (s) => {
      try {
        return decodeURIComponent(escape(atob(s.trim())));
      } catch {
        return "[Error: invalid Base64]";
      }
    },
  },
  {
    id: "url",
    label: "URL Encode",
    encode: (s) => {
      try {
        return encodeURIComponent(s);
      } catch {
        return "[Error: cannot encode]";
      }
    },
    decode: (s) => {
      try {
        return decodeURIComponent(s.trim());
      } catch {
        return "[Error: invalid URL encoding]";
      }
    },
  },
  {
    id: "url-full",
    label: "URL Encode (full)",
    encode: (s) => {
      try {
        return encodeURI(s);
      } catch {
        return "[Error: cannot encode]";
      }
    },
    decode: (s) => {
      try {
        return decodeURI(s.trim());
      } catch {
        return "[Error: invalid URL]";
      }
    },
  },
  {
    id: "html",
    label: "HTML Entities",
    encode: (s) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;"),
    decode: (s) =>
      s
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&amp;/g, "&"),
  },
  {
    id: "unicode",
    label: "Unicode Escape",
    encode: (s) =>
      Array.from(s)
        .map((c) => {
          const code = c.codePointAt(0)!;
          return code > 127
            ? "\\u" + code.toString(16).padStart(4, "0")
            : c;
        })
        .join(""),
    decode: (s) => {
      try {
        return s.replace(/\\u([0-9a-fA-F]{4,6})/g, (_, hex) =>
          String.fromCodePoint(parseInt(hex, 16))
        );
      } catch {
        return "[Error: invalid Unicode escape]";
      }
    },
  },
  {
    id: "hex",
    label: "Hex",
    encode: (s) =>
      Array.from(new TextEncoder().encode(s))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(" "),
    decode: (s) => {
      try {
        const bytes = s
          .trim()
          .split(/[\s,]+/)
          .filter((h) => h.length > 0)
          .map((h) => parseInt(h, 16));
        return new TextDecoder().decode(new Uint8Array(bytes));
      } catch {
        return "[Error: invalid hex]";
      }
    },
  },
  {
    id: "binary",
    label: "Binary (UTF-8)",
    encode: (s) =>
      Array.from(new TextEncoder().encode(s))
        .map((b) => b.toString(2).padStart(8, "0"))
        .join(" "),
    decode: (s) => {
      try {
        const bytes = s
          .trim()
          .split(/[\s,]+/)
          .filter((b) => b.length > 0)
          .map((b) => parseInt(b, 2));
        return new TextDecoder().decode(new Uint8Array(bytes));
      } catch {
        return "[Error: invalid binary]";
      }
    },
  },
];

type Direction = "encode" | "decode";

export function StringEncoderTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [selected, setSelected] = useState("base64");
  const [direction, setDirection] = useState<Direction>("encode");
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Load saved text
  useEffect(() => {
    const saved = localStorage.getItem("fmc_se_text");
    if (saved) setText(saved);
  }, []);

  // Persist text
  useEffect(() => {
    localStorage.setItem("fmc_se_text", text);
  }, [text]);

  // Ctrl/Cmd+K focuses input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const encoding = ENCODINGS.find((e) => e.id === selected)!;

  const output = useMemo(() => {
    if (!text) return "";
    return direction === "encode"
      ? encoding.encode(text)
      : encoding.decode(text);
  }, [text, selected, direction, encoding]);

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setToast("Copied!");
    } catch {
      setToast("Copy failed");
    }
    window.setTimeout(() => setToast(""), 1200);
  }

  function swapDirection() {
    setDirection((d) => (d === "encode" ? "decode" : "encode"));
    setText(output);
  }

  function clearAll() {
    setText("");
    inputRef.current?.focus();
  }

  return (
    <div>
      {/* Direction toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setDirection("encode")}
          className={cx(
            "rounded-xl px-4 py-2 text-sm border transition-colors",
            direction === "encode"
              ? isDark
                ? "border-emerald-500/40 bg-emerald-500/10 font-semibold"
                : "border-emerald-500/40 bg-emerald-50 font-semibold"
              : isDark
                ? "border-white/10 hover:bg-white/5"
                : "border-black/10 hover:bg-black/5"
          )}
        >
          Encode
        </button>
        <button
          type="button"
          onClick={swapDirection}
          className={cx(
            "rounded-xl px-3 py-2 text-sm border transition-colors",
            isDark
              ? "border-white/10 hover:bg-white/10"
              : "border-black/10 hover:bg-black/5"
          )}
          title="Swap input and output"
        >
          ⇄
        </button>
        <button
          type="button"
          onClick={() => setDirection("decode")}
          className={cx(
            "rounded-xl px-4 py-2 text-sm border transition-colors",
            direction === "decode"
              ? isDark
                ? "border-emerald-500/40 bg-emerald-500/10 font-semibold"
                : "border-emerald-500/40 bg-emerald-50 font-semibold"
              : isDark
                ? "border-white/10 hover:bg-white/5"
                : "border-black/10 hover:bg-black/5"
          )}
        >
          Decode
        </button>
      </div>

      {/* Encoding type selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {ENCODINGS.map((enc) => (
          <button
            key={enc.id}
            type="button"
            onClick={() => setSelected(enc.id)}
            className={cx(
              "rounded-xl px-3 py-1.5 text-sm border transition-colors",
              selected === enc.id
                ? isDark
                  ? "border-blue-500/40 bg-blue-500/10 font-semibold"
                  : "border-blue-500/40 bg-blue-50 font-semibold"
                : isDark
                  ? "border-white/10 hover:bg-white/5"
                  : "border-black/10 hover:bg-black/5"
            )}
          >
            {enc.label}
          </button>
        ))}
      </div>

      {/* Input */}
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
          <div className="text-sm font-semibold">
            {direction === "encode" ? "Plain Text" : "Encoded Text"}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cx(
                "text-xs tabular-nums",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              {formatNumber(text.length)} chars
            </span>
            <button
              type="button"
              onClick={clearAll}
              className={cx(
                "text-sm rounded-xl px-3 py-1.5 border transition-colors",
                isDark
                  ? "border-white/10 hover:bg-white/10"
                  : "border-black/10 hover:bg-black/5"
              )}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="p-3">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder={
              direction === "encode"
                ? "Type or paste text to encode..."
                : "Paste encoded text to decode..."
            }
            className={cx(
              "w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none font-mono",
              isDark
                ? "border-white/10 bg-neutral-950 focus:ring-2 focus:ring-white/10"
                : "border-black/10 bg-neutral-50 focus:ring-2 focus:ring-black/10"
            )}
          />
        </div>
      </div>

      {/* Output */}
      <div
        className={cx(
          "mt-4 rounded-2xl border shadow-sm",
          isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
        )}
      >
        <div
          className={cx(
            "flex items-center justify-between px-3 py-2 border-b",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          <div className="text-sm font-semibold">
            {direction === "encode" ? `${encoding.label} Encoded` : "Decoded Text"}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cx(
                "text-xs tabular-nums",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              {formatNumber(output.length)} chars
            </span>
            <button
              type="button"
              onClick={copyOutput}
              className={cx(
                "text-sm rounded-xl px-3 py-1.5 border transition-colors",
                isDark
                  ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                  : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100"
              )}
            >
              Copy
            </button>
          </div>
        </div>
        <div className="p-3">
          <pre
            className={cx(
              "whitespace-pre-wrap break-all text-sm leading-6 font-mono min-h-[80px]",
              isDark ? "text-neutral-200" : "text-neutral-700"
            )}
          >
            {output || "\u00A0"}
          </pre>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div
        className={cx(
          "mt-3 text-xs text-center",
          isDark ? "text-neutral-500" : "text-neutral-400"
        )}
      >
        Ctrl/⌘ + K focuses input · Ctrl/⌘ + L toggles theme
      </div>

      {/* Toast */}
      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
