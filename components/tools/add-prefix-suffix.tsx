"use client";

import { useState, useEffect, useCallback } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const STORAGE_KEY = "fmc_add_prefix_suffix";

type Preset = {
  label: string;
  prefix: string;
  suffix: string;
};

const presets: Preset[] = [
  { label: 'Wrap in "quotes"', prefix: '"', suffix: '"' },
  { label: "Wrap in (parens)", prefix: "(", suffix: ")" },
  { label: "HTML <li> tags", prefix: "<li>", suffix: "</li>" },
  { label: "Add bullet point", prefix: "\u2022 ", suffix: "" },
  { label: "Add comma at end", prefix: "", suffix: "," },
];

export function AddPrefixSuffixTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [copied, setCopied] = useState(false);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.input) setInput(parsed.input);
        if (parsed.prefix) setPrefix(parsed.prefix);
        if (parsed.suffix) setSuffix(parsed.suffix);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ input, prefix, suffix }));
    } catch {
      // ignore
    }
  }, [input, prefix, suffix]);

  const output = (() => {
    if (!input) return "";
    const lines = input.split("\n");
    return lines
      .map((line) => {
        if (line.trim() === "") return line;
        return `${prefix}${line}${suffix}`;
      })
      .join("\n");
  })();

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [output]);

  const applyPreset = (preset: Preset) => {
    setPrefix(preset.prefix);
    setSuffix(preset.suffix);
  };

  const clearAll = () => {
    setInput("");
    setPrefix("");
    setSuffix("");
  };

  const handleExample = () => {
    setInput("Apple\nBanana\nCherry\nDate\nElderberry");
    setPrefix("- ");
    setSuffix("");
  };

  const stats = {
    inputLines: input ? input.split("\n").length : 0,
    outputLines: output ? output.split("\n").length : 0,
    inputChars: input.length,
    outputChars: output.length,
  };

  return (
    <div className="space-y-4">
      {/* Prefix / Suffix inputs */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="prefix-input" className="text-sm font-semibold block">
              Prefix (added before each line)
            </label>
            <input
              id="prefix-input"
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder='e.g. "  or  <li>'
              className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="suffix-input" className="text-sm font-semibold block">
              Suffix (added after each line)
            </label>
            <input
              id="suffix-input"
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder='e.g. "  or  </li>'
              className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
            />
          </div>
        </div>

        {/* Preset buttons */}
        <div className="mt-4">
          <span className={cx("text-xs font-medium block mb-2", muted)}>Presets</span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
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
        {output && (
          <button
            type="button"
            onClick={copyToClipboard}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
          >
            {copied ? "Copied!" : "Copy Output"}
          </button>
        )}
      </div>

      {/* Input / Output panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className={cx("rounded-xl border p-4", base)}>
          <label htmlFor="text-input" className="text-sm font-semibold block mb-2">
            Input Text (one item per line)
          </label>
          <textarea
            id="text-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Paste your text here, one item per line...\n\nApple\nBanana\nCherry"}
            className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
            style={{ minHeight: "280px" }}
          />
          <div className={cx("mt-2 text-xs", muted)}>
            {stats.inputLines} line{stats.inputLines !== 1 ? "s" : ""} · {stats.inputChars} char{stats.inputChars !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Output */}
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Output Preview</h3>
            {output && (
              <button
                type="button"
                onClick={copyToClipboard}
                className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div
            aria-live="polite"
            className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono whitespace-pre-wrap break-words overflow-auto", inputBase)}
            style={{ minHeight: "280px" }}
          >
            {output || (
              <span className={cx("text-sm", muted)}>
                Output appears here as you type...
              </span>
            )}
          </div>
          <div className={cx("mt-2 text-xs", muted)}>
            {stats.outputLines} line{stats.outputLines !== 1 ? "s" : ""} · {stats.outputChars} char{stats.outputChars !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={cx("rounded-xl border p-3", base)}>
          <div className={cx("text-xs", muted)}>Input Lines</div>
          <div className="text-lg font-semibold">{stats.inputLines}</div>
        </div>
        <div className={cx("rounded-xl border p-3", base)}>
          <div className={cx("text-xs", muted)}>Output Lines</div>
          <div className="text-lg font-semibold">{stats.outputLines}</div>
        </div>
        <div className={cx("rounded-xl border p-3", base)}>
          <div className={cx("text-xs", muted)}>Prefix Length</div>
          <div className="text-lg font-semibold">{prefix.length}</div>
        </div>
        <div className={cx("rounded-xl border p-3", base)}>
          <div className={cx("text-xs", muted)}>Suffix Length</div>
          <div className="text-lg font-semibold">{suffix.length}</div>
        </div>
      </div>
    </div>
  );
}
