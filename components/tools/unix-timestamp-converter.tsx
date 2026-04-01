"use client";

import { useCallback, useEffect, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

function formatDate(d: Date): string {
  return d.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function formatISO(d: Date): string {
  return d.toISOString();
}

function formatUTC(d: Date): string {
  return d.toUTCString();
}

function toLocalDatetimeValue(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${y}-${m}-${day}T${h}:${min}:${s}`;
}

export function UnixTimestampConverterTool() {
  const { isDark } = useTheme();
  const [now, setNow] = useState<number>(Math.floor(Date.now() / 1000));
  const [timestampInput, setTimestampInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");
  const [copied, setCopied] = useState("");

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  // Timestamp → Date conversion
  const parsedFromTimestamp = (() => {
    if (!timestampInput.trim()) return null;
    const num = Number(timestampInput.trim());
    if (isNaN(num)) return null;
    const ms = unit === "seconds" ? num * 1000 : num;
    if (ms < -8640000000000000 || ms > 8640000000000000) return null;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;
    return d;
  })();

  // Date → Timestamp conversion
  const parsedFromDate = (() => {
    if (!dateInput) return null;
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return null;
    return d;
  })();

  const dateToTimestamp = parsedFromDate
    ? unit === "seconds"
      ? Math.floor(parsedFromDate.getTime() / 1000)
      : parsedFromDate.getTime()
    : null;

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const accent = isDark ? "text-emerald-400" : "text-emerald-600";

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="space-y-4">
      {/* Live clock */}
      <div className={cx("rounded-xl border p-4 text-center", base)}>
        <div className={cx("text-xs font-semibold mb-1", accent)}>Current Unix Timestamp</div>
        <div className="font-mono text-3xl sm:text-4xl font-bold tracking-tight tabular-nums">
          {now}
        </div>
        <div className={cx("text-xs mt-1", muted)}>
          {formatDate(new Date(now * 1000))} ({tz})
        </div>
        <button
          onClick={() => copyText(String(now), "now")}
          className={cx("mt-2 rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          {copied === "now" ? "Copied!" : "Copy Timestamp"}
        </button>
      </div>

      {/* Unit toggle */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setUnit("seconds")}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", unit === "seconds" ? btnActive : btnBase)}
        >
          Seconds
        </button>
        <button
          onClick={() => setUnit("milliseconds")}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", unit === "milliseconds" ? btnActive : btnBase)}
        >
          Milliseconds
        </button>
      </div>

      {/* Timestamp → Date */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="ts-input" className="text-sm font-semibold block mb-2">
          Timestamp to Date
        </label>
        <div className="flex gap-2">
          <input
            id="ts-input"
            type="text"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            placeholder={unit === "seconds" ? "e.g. 1709683200" : "e.g. 1709683200000"}
            className={cx("flex-1 rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            spellCheck={false}
            autoComplete="off"
          />
          <button
            onClick={() => {
              setTimestampInput(unit === "seconds" ? String(now) : String(now * 1000));
            }}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px] shrink-0", btnBase)}
          >
            Now
          </button>
        </div>

        {timestampInput.trim() && !parsedFromTimestamp && (
          <p className="mt-2 text-xs text-red-400">Invalid timestamp</p>
        )}

        {parsedFromTimestamp && (
          <div className="mt-3 space-y-2" aria-live="polite">
            {[
              { label: "Local", value: formatDate(parsedFromTimestamp), key: "ts-local" },
              { label: "UTC", value: formatUTC(parsedFromTimestamp), key: "ts-utc" },
              { label: "ISO 8601", value: formatISO(parsedFromTimestamp), key: "ts-iso" },
              { label: "Timezone", value: tz, key: "ts-tz" },
            ].map((row) => (
              <div key={row.key} className={cx("flex items-center justify-between rounded-lg border p-2 gap-2", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
                <div className="min-w-0">
                  <span className={cx("text-xs font-semibold", accent)}>{row.label}</span>
                  <div className="font-mono text-xs break-all">{row.value}</div>
                </div>
                <button
                  onClick={() => copyText(row.value, row.key)}
                  className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px] min-w-[44px] shrink-0", btnBase)}
                  aria-label={`Copy ${row.label}`}
                >
                  {copied === row.key ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Date → Timestamp */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="date-input" className="text-sm font-semibold block mb-2">
          Date to Timestamp
        </label>
        <div className="flex gap-2">
          <input
            id="date-input"
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className={cx("flex-1 rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
          />
          <button
            onClick={() => setDateInput(toLocalDatetimeValue(new Date()))}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px] shrink-0", btnBase)}
          >
            Now
          </button>
        </div>

        {dateToTimestamp !== null && (
          <div className="mt-3" aria-live="polite">
            <div className={cx("flex items-center justify-between rounded-lg border p-3", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
              <div>
                <span className={cx("text-xs font-semibold", accent)}>
                  Unix Timestamp ({unit})
                </span>
                <div className="font-mono text-lg font-bold">{dateToTimestamp}</div>
              </div>
              <button
                onClick={() => copyText(String(dateToTimestamp), "d2t")}
                className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px] min-w-[44px] shrink-0", btnBase)}
                aria-label="Copy timestamp"
              >
                {copied === "d2t" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notable timestamps */}
      <details className={cx("rounded-xl border p-4", base)}>
        <summary className="text-sm font-semibold cursor-pointer select-none">
          Notable Unix Timestamps
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className={cx("border-b", isDark ? "border-white/10" : "border-black/10")}>
                <th className="text-left py-2 px-2 font-semibold">Timestamp</th>
                <th className="text-left py-2 px-2 font-semibold">Date (UTC)</th>
                <th className="text-left py-2 px-2 font-semibold">Event</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ts: "0", date: "Jan 1, 1970 00:00:00", event: "Unix Epoch" },
                { ts: "1000000000", date: "Sep 9, 2001 01:46:40", event: "1 billion seconds" },
                { ts: "1234567890", date: "Feb 13, 2009 23:31:30", event: "Sequential digits" },
                { ts: "1700000000", date: "Nov 14, 2023 22:13:20", event: "1.7 billion seconds" },
                { ts: "2000000000", date: "May 18, 2033 03:33:20", event: "2 billion seconds" },
                { ts: "2147483647", date: "Jan 19, 2038 03:14:07", event: "Y2K38 (32-bit overflow)" },
              ].map((row) => (
                <tr key={row.ts} className={cx("border-b", isDark ? "border-white/5" : "border-black/5")}>
                  <td className="py-1.5 px-2">{row.ts}</td>
                  <td className="py-1.5 px-2">{row.date}</td>
                  <td className={cx("py-1.5 px-2", muted)}>{row.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      {/* Keyboard shortcut hint */}
      <div className={cx("text-xs text-center", muted)}>
        Press <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>Ctrl</kbd> + <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>K</kbd> to focus input
      </div>
    </div>
  );
}
