"use client";

import { useCallback, useEffect, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type JoinMode = "space" | "comma" | "custom";

const STORAGE_KEY = "fmc_list_to_text";

function stripBullets(text: string): string[] {
  return text
    .split("\n")
    .map((line) => {
      let trimmed = line.trim();
      if (!trimmed) return "";
      // Strip numbered formats: "1." "2." "1)" "2)" "10." "10)"
      trimmed = trimmed.replace(/^\d+[.)]\s*/, "");
      // Strip bullet characters: •, -, *, –, —, >, ▪, ▸, ►, ●, ○, ◦, ■, □
      trimmed = trimmed.replace(/^[•\-*–—>▪▸►●○◦■□]\s*/, "");
      return trimmed;
    })
    .filter((line) => line.length > 0);
}

function joinLines(lines: string[], mode: JoinMode, custom: string): string {
  if (mode === "space") return lines.join(" ");
  if (mode === "comma") return lines.join(", ");
  return lines.join(custom);
}

export function ListToTextTool() {
  const { isDark } = useTheme();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [joinMode, setJoinMode] = useState<JoinMode>("space");
  const [customSep, setCustomSep] = useState("; ");
  const [copied, setCopied] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (typeof data.input === "string") setInput(data.input);
        if (typeof data.joinMode === "string") setJoinMode(data.joinMode);
        if (typeof data.customSep === "string") setCustomSep(data.customSep);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ input, joinMode, customSep }));
    } catch { /* ignore */ }
  }, [input, joinMode, customSep]);

  // Convert on input/settings change
  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    const lines = stripBullets(input);
    setOutput(joinLines(lines, joinMode, customSep));
  }, [input, joinMode, customSep]);

  const copyOutput = useCallback(() => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
    setCopied(false);
  }, []);

  // Theme styles
  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const btnPrimary = isDark ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500" : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  const lineCount = input.trim() ? input.trim().split("\n").filter((l) => l.trim()).length : 0;

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="ltt-input" className="text-sm font-semibold">
            Paste Your List
          </label>
          <span className={cx("text-xs", muted)}>
            {lineCount} line{lineCount !== 1 ? "s" : ""}
          </span>
        </div>
        <textarea
          id="ltt-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"• First item\n• Second item\n• Third item\n\n1. Numbered item\n2. Another item\n3. Last item"}
          rows={8}
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y",
            inputBase
          )}
        />
      </div>

      {/* Join Options */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className={cx("text-xs font-semibold", muted)}>Join with:</span>
        <button
          onClick={() => setJoinMode("space")}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            joinMode === "space" ? btnActive : btnBase
          )}
        >
          Space
        </button>
        <button
          onClick={() => setJoinMode("comma")}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            joinMode === "comma" ? btnActive : btnBase
          )}
        >
          Comma + Space
        </button>
        <button
          onClick={() => setJoinMode("custom")}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            joinMode === "custom" ? btnActive : btnBase
          )}
        >
          Custom
        </button>
        {joinMode === "custom" && (
          <input
            type="text"
            value={customSep}
            onChange={(e) => setCustomSep(e.target.value)}
            placeholder="Separator"
            className={cx(
              "rounded-lg border px-3 py-1.5 text-xs w-24 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]",
              inputBase
            )}
          />
        )}
        {input.trim() && (
          <button
            onClick={clear}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px] ml-auto", btnBase)}
          >
            Clear
          </button>
        )}
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Result</h3>
            <button
              onClick={copyOutput}
              className={cx(
                "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
                copied ? btnPrimary : btnBase
              )}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <output
            aria-live="polite"
            className={cx(
              "block rounded-lg border p-3 text-sm whitespace-pre-wrap break-words font-mono",
              inputBase
            )}
          >
            {output}
          </output>
          <p className={cx("mt-2 text-xs", muted)}>
            {output.length.toLocaleString()} character{output.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
}
