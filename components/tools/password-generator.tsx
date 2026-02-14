"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Character sets ─── */

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?/~`",
};

type CharSetKey = keyof typeof CHAR_SETS;

/* ─── Strength calculation ─── */

function calcStrength(password: string): { score: number; label: string; color: string; bits: number } {
  const pool = new Set<string>();
  let hasLower = false;
  let hasUpper = false;
  let hasNum = false;
  let hasSym = false;

  for (const ch of password) {
    if (/[a-z]/.test(ch)) hasLower = true;
    else if (/[A-Z]/.test(ch)) hasUpper = true;
    else if (/[0-9]/.test(ch)) hasNum = true;
    else hasSym = true;
  }

  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNum) poolSize += 10;
  if (hasSym) poolSize += 30;

  const bits = poolSize > 0 ? Math.floor(password.length * Math.log2(poolSize)) : 0;

  if (bits >= 128) return { score: 4, label: "Very Strong", color: "emerald", bits };
  if (bits >= 80) return { score: 3, label: "Strong", color: "green", bits };
  if (bits >= 50) return { score: 2, label: "Medium", color: "amber", bits };
  if (bits >= 30) return { score: 1, label: "Weak", color: "orange", bits };
  return { score: 0, label: "Very Weak", color: "red", bits };
}

function generatePassword(
  length: number,
  sets: Record<CharSetKey, boolean>,
  exclude: string,
): string {
  let chars = "";
  for (const [key, enabled] of Object.entries(sets) as [CharSetKey, boolean][]) {
    if (enabled) chars += CHAR_SETS[key];
  }
  // remove excluded characters
  if (exclude) {
    const excSet = new Set(exclude);
    chars = chars.split("").filter((c) => !excSet.has(c)).join("");
  }
  if (chars.length === 0) return "";

  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (v) => chars[v % chars.length]).join("");
}

export function PasswordGeneratorTool() {
  const { isDark } = useTheme();
  const [length, setLength] = useState(20);
  const [sets, setSets] = useState<Record<CharSetKey, boolean>>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [exclude, setExclude] = useState("");
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  const generate = useCallback(() => {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(generatePassword(length, sets, exclude));
    }
    setPasswords(result);
  }, [length, sets, exclude, count]);

  // Generate on mount and when settings change
  useEffect(() => {
    generate();
  }, [generate]);

  const strength = useMemo(() => {
    return passwords.length > 0 ? calcStrength(passwords[0]) : null;
  }, [passwords]);

  function toggleSet(key: CharSetKey) {
    const next = { ...sets, [key]: !sets[key] };
    // ensure at least one is enabled
    if (Object.values(next).every((v) => !v)) return;
    setSets(next);
  }

  async function copyPassword(pw: string) {
    try {
      await navigator.clipboard.writeText(pw);
      setToast("Copied!");
    } catch {
      setToast("Copy failed");
    }
    window.setTimeout(() => setToast(""), 1200);
  }

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(passwords.join("\n"));
      setToast(`Copied ${passwords.length} passwords!`);
    } catch {
      setToast("Copy failed");
    }
    window.setTimeout(() => setToast(""), 1200);
  }

  const strengthColors: Record<string, { bg: string; bar: string; text: string }> = {
    red: {
      bg: isDark ? "bg-red-500/10" : "bg-red-50",
      bar: "bg-red-500",
      text: isDark ? "text-red-400" : "text-red-600",
    },
    orange: {
      bg: isDark ? "bg-orange-500/10" : "bg-orange-50",
      bar: "bg-orange-500",
      text: isDark ? "text-orange-400" : "text-orange-600",
    },
    amber: {
      bg: isDark ? "bg-amber-500/10" : "bg-amber-50",
      bar: "bg-amber-500",
      text: isDark ? "text-amber-400" : "text-amber-600",
    },
    green: {
      bg: isDark ? "bg-green-500/10" : "bg-green-50",
      bar: "bg-green-500",
      text: isDark ? "text-green-400" : "text-green-600",
    },
    emerald: {
      bg: isDark ? "bg-emerald-500/10" : "bg-emerald-50",
      bar: "bg-emerald-500",
      text: isDark ? "text-emerald-400" : "text-emerald-600",
    },
  };

  return (
    <div>
      {/* Controls */}
      <div className={cx("rounded-2xl border p-4 space-y-4", isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10")}>
        {/* Length */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">Password Length</label>
            <input
              type="number"
              min={4}
              max={128}
              value={length}
              onChange={(e) => setLength(Math.max(4, Math.min(128, parseInt(e.target.value) || 4)))}
              className={cx("w-16 rounded-lg border px-2 py-1 text-sm text-center font-mono", isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10")}
            />
          </div>
          <input
            type="range"
            min={4}
            max={128}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full accent-emerald-500"
          />
          <div className={cx("flex justify-between text-xs mt-1", isDark ? "text-neutral-500" : "text-neutral-400")}>
            <span>4</span>
            <span>128</span>
          </div>
        </div>

        {/* Character sets */}
        <div>
          <div className="text-sm font-semibold mb-2">Character Sets</div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(CHAR_SETS) as CharSetKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleSet(key)}
                className={cx(
                  "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors capitalize",
                  sets[key]
                    ? isDark ? "border-emerald-500/40 bg-emerald-500/10" : "border-emerald-500/40 bg-emerald-50"
                    : isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
                )}
              >
                <div className={cx(
                  "w-4 h-4 rounded border flex items-center justify-center text-xs shrink-0",
                  sets[key] ? "bg-emerald-500 border-emerald-500 text-white" : isDark ? "border-white/20" : "border-black/20"
                )}>
                  {sets[key] ? "✓" : ""}
                </div>
                {key === "uppercase" ? "A-Z" : key === "lowercase" ? "a-z" : key === "numbers" ? "0-9" : "!@#$%"}
              </button>
            ))}
          </div>
        </div>

        {/* Exclude characters */}
        <div>
          <label className="text-sm font-semibold block mb-1">Exclude Characters</label>
          <input
            type="text"
            value={exclude}
            onChange={(e) => setExclude(e.target.value)}
            placeholder="e.g. 0OlI1"
            className={cx("w-full rounded-xl border px-3 py-2 text-sm font-mono", isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10")}
          />
          <p className={cx("text-xs mt-1", isDark ? "text-neutral-500" : "text-neutral-400")}>
            Remove ambiguous characters like 0/O, l/1/I, or specific symbols
          </p>
        </div>

        {/* Count */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Generate Multiple</label>
            <div className="flex items-center gap-2">
              {[1, 5, 10, 25].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className={cx(
                    "rounded-lg px-2.5 py-1 text-xs border transition-colors",
                    count === n
                      ? isDark ? "border-blue-500/40 bg-blue-500/10 font-semibold" : "border-blue-500/40 bg-blue-50 font-semibold"
                      : isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate button */}
        <button
          type="button"
          onClick={generate}
          className={cx(
            "w-full rounded-xl px-4 py-3 text-sm font-semibold border transition-colors",
            isDark
              ? "border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20"
              : "border-emerald-500/40 bg-emerald-50 hover:bg-emerald-100"
          )}
        >
          🔑 Generate {count > 1 ? `${count} Passwords` : "Password"}
        </button>
      </div>

      {/* Strength meter */}
      {strength && passwords[0] && (
        <div className={cx("mt-4 rounded-xl border p-3", isDark ? "border-white/10" : "border-black/10", strengthColors[strength.color].bg)}>
          <div className="flex items-center justify-between mb-2">
            <span className={cx("text-sm font-semibold", strengthColors[strength.color].text)}>
              {strength.label}
            </span>
            <span className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
              {strength.bits} bits of entropy
            </span>
          </div>
          <div className={cx("h-2 rounded-full overflow-hidden", isDark ? "bg-neutral-800" : "bg-neutral-200")}>
            <div
              className={cx("h-full rounded-full transition-all", strengthColors[strength.color].bar)}
              style={{ width: `${Math.min(100, (strength.score + 1) * 20)}%` }}
            />
          </div>
        </div>
      )}

      {/* Password output */}
      {passwords.length > 0 && (
        <div className={cx("mt-4 rounded-2xl border shadow-sm", isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10")}>
          <div className={cx("flex items-center justify-between px-3 py-2 border-b", isDark ? "border-white/10" : "border-black/5")}>
            <div className="text-sm font-semibold">
              {passwords.length === 1 ? "Your Password" : `${passwords.length} Passwords`}
            </div>
            {passwords.length > 1 && (
              <button
                type="button"
                onClick={copyAll}
                className={cx("text-sm rounded-xl px-3 py-1.5 border transition-colors", isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5")}
              >
                Copy All
              </button>
            )}
          </div>
          <div className="p-3 space-y-2">
            {passwords.map((pw, i) => (
              <div key={i} className="flex items-center gap-2">
                <code className={cx(
                  "flex-1 rounded-xl border px-3 py-2 text-sm font-mono break-all leading-6",
                  isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10"
                )}>
                  {pw}
                </code>
                <button
                  type="button"
                  onClick={() => copyPassword(pw)}
                  className={cx(
                    "shrink-0 rounded-xl px-3 py-2 text-sm border transition-colors",
                    isDark
                      ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                      : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100"
                  )}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shortcut hint */}
      <div className={cx("mt-3 text-xs text-center", isDark ? "text-neutral-500" : "text-neutral-400")}>
        Passwords generated using crypto.getRandomValues() · Never sent to a server
      </div>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
