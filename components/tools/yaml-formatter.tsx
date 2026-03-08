"use client";

import { useCallback, useMemo, useState } from "react";
import yaml from "js-yaml";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type Mode = "format" | "minify" | "yaml-to-json" | "json-to-yaml";
type IndentStyle = "2" | "4";

const MODE_LABELS: Record<Mode, string> = {
  format: "Format YAML",
  minify: "Minify YAML",
  "yaml-to-json": "YAML to JSON",
  "json-to-yaml": "JSON to YAML",
};

function processInput(input: string, mode: Mode, indent: IndentStyle): { result: string; error: string | null } {
  const spaces = Number(indent);

  try {
    if (mode === "json-to-yaml") {
      const parsed = JSON.parse(input);
      const result = yaml.dump(parsed, { indent: spaces, lineWidth: -1, noRefs: true });
      return { result: result.trimEnd(), error: null };
    }

    // All other modes expect YAML input
    const parsed = yaml.load(input);

    if (mode === "yaml-to-json") {
      return { result: JSON.stringify(parsed, null, spaces), error: null };
    }

    if (mode === "minify") {
      return { result: JSON.stringify(parsed), error: null };
    }

    // format
    const result = yaml.dump(parsed, { indent: spaces, lineWidth: -1, noRefs: true });
    return { result: result.trimEnd(), error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid input";
    return { result: "", error: msg };
  }
}

export function YamlFormatterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("format");
  const [indent, setIndent] = useState<IndentStyle>("2");
  const [copied, setCopied] = useState("");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const output = useMemo(() => {
    if (!input.trim()) return null;
    return processInput(input, mode, indent);
  }, [input, mode, indent]);

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const lineCount = output?.result ? output.result.split("\n").length : 0;

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  const isJsonInput = mode === "json-to-yaml";
  const isJsonOutput = mode === "yaml-to-json" || mode === "minify";

  return (
    <div className="space-y-4">
      {/* Mode buttons */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput(""); setCopied(""); }}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", mode === m ? btnActive : btnBase)}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
        <select
          value={indent}
          onChange={(e) => setIndent(e.target.value as IndentStyle)}
          className={cx("rounded-lg border px-2 py-1 text-xs min-h-[44px]", inputBase)}
          aria-label="Indentation"
        >
          <option value="2">2 Spaces</option>
          <option value="4">4 Spaces</option>
        </select>
        <button
          onClick={() => { setInput(""); setCopied(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="yaml-input" className="text-sm font-semibold block mb-2">
          {isJsonInput ? "Paste JSON" : "Paste YAML"}
        </label>
        <textarea
          id="yaml-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isJsonInput
              ? '{\n  "name": "FlipMyCase",\n  "version": "1.0",\n  "features": ["convert", "format"]\n}'
              : "name: FlipMyCase\nversion: \"1.0\"\nfeatures:\n  - convert\n  - format"
          }
          rows={10}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          style={{ minHeight: "150px" }}
          spellCheck={false}
        />
        <div className={cx("mt-2 text-xs", muted)}>
          {wordCount} word{wordCount !== 1 ? "s" : ""} · {input.length} char{input.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">
                {output.error
                  ? "Validation Error"
                  : isJsonOutput
                    ? "JSON Output"
                    : "YAML Output"}
              </h3>
              {output.result && !output.error && (
                <span className={cx("text-xs", muted)}>
                  {output.result.length} char{output.result.length !== 1 ? "s" : ""}
                  {mode !== "minify" && ` · ${lineCount} line${lineCount !== 1 ? "s" : ""}`}
                </span>
              )}
            </div>
            {output.result && !output.error && (
              <button
                onClick={() => copyText(output.result, "output")}
                className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
                aria-label="Copy output"
              >
                {copied === "output" ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          {output.error ? (
            <div className={cx("rounded-lg border p-3 text-xs font-mono whitespace-pre-wrap", isDark ? "border-red-500/30 bg-red-950/30 text-red-300" : "border-red-500/30 bg-red-50 text-red-700")}>
              {output.error}
            </div>
          ) : (
            <pre className={cx("rounded-lg border p-3 text-xs font-mono overflow-x-auto whitespace-pre", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
              {output.result}
            </pre>
          )}
        </div>
      )}

      {/* Keyboard shortcut hint */}
      <div className={cx("text-xs text-center", muted)}>
        Press <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>Ctrl</kbd> + <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>K</kbd> to focus input
      </div>
    </div>
  );
}
