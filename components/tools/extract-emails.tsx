"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Helpers ─────────────────────────────────────────────────── */
const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

/* ─── Main Component ──────────────────────────────────────────── */
export function ExtractEmailsTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [deduplicate, setDeduplicate] = useState(true);
  const [sortAlpha, setSortAlpha] = useState(false);
  const [copied, setCopied] = useState("");

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  const emails = useMemo(() => {
    if (!input) return [];

    const matches = input.match(EMAIL_REGEX) || [];
    let result = [...matches];

    if (deduplicate) {
      const seen = new Set<string>();
      result = result.filter((email) => {
        const lower = email.toLowerCase();
        if (seen.has(lower)) return false;
        seen.add(lower);
        return true;
      });
    }

    if (sortAlpha) {
      result.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    }

    return result;
  }, [input, deduplicate, sortAlpha]);

  const newlineSeparated = emails.join("\n");
  const commaSeparated = emails.join(", ");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const handleExample = () => {
    setInput(`Contact us at support@example.com or sales@example.com for inquiries.
You can also reach john.doe@company.org and jane+test@company.org.
Duplicates: support@example.com appears again, and SUPPORT@EXAMPLE.COM in caps.
Invalid: not-an-email, @missinguser.com, user@.com
More contacts: info@startup.io, hello@world.co.uk, admin@test-domain.net`);
  };

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleExample}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Load Example
        </button>
        <button
          onClick={() => { setInput(""); setCopied(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Options */}
      <div className={cx("rounded-xl border p-4", base)}>
        <h3 className="text-sm font-semibold mb-3">Options</h3>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={deduplicate}
              onChange={(e) => setDeduplicate(e.target.checked)}
              className="rounded border-white/10 bg-neutral-800"
            />
            <span className="text-sm">Deduplicate (case-insensitive)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={sortAlpha}
              onChange={(e) => setSortAlpha(e.target.checked)}
              className="rounded border-white/10 bg-neutral-800"
            />
            <span className="text-sm">Sort alphabetically</span>
          </label>
        </div>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="extract-emails-input" className="text-sm font-semibold block mb-2">
          Input Text
        </label>
        <textarea
          id="extract-emails-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text containing email addresses here..."
          rows={8}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          style={{ minHeight: "150px" }}
          spellCheck={false}
        />
        <div className={cx("mt-2 text-xs", muted)}>
          {input.length} character{input.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Output */}
      {emails.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">
              {emails.length} email{emails.length !== 1 ? "s" : ""} found
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => copyText(newlineSeparated, "newline")}
                className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
                aria-label="Copy as newline-separated list"
              >
                {copied === "newline" ? "Copied!" : "Copy (newline)"}
              </button>
              <button
                onClick={() => copyText(commaSeparated, "comma")}
                className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
                aria-label="Copy as comma-separated list"
              >
                {copied === "comma" ? "Copied!" : "Copy (comma)"}
              </button>
            </div>
          </div>
          <pre className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono overflow-x-auto whitespace-pre", inputBase)}>
            {newlineSeparated}
          </pre>
        </div>
      )}

      {input && emails.length === 0 && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <p className={cx("text-sm", muted)}>No email addresses found in the input text.</p>
        </div>
      )}
    </div>
  );
}
