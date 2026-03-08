"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type FieldMode = "every" | "specific" | "range" | "step";

interface FieldState {
  mode: FieldMode;
  specific: number[];
  rangeStart: number;
  rangeEnd: number;
  stepBase: number;
  stepInterval: number;
}

const FIELD_DEFS = [
  { key: "minute", label: "Minute", min: 0, max: 59 },
  { key: "hour", label: "Hour", min: 0, max: 23 },
  { key: "dom", label: "Day of Month", min: 1, max: 31 },
  { key: "month", label: "Month", min: 1, max: 12 },
  { key: "dow", label: "Day of Week", min: 0, max: 6 },
] as const;

const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PRESETS: { label: string; expression: string }[] = [
  { label: "Every Minute", expression: "* * * * *" },
  { label: "Every Hour", expression: "0 * * * *" },
  { label: "Daily at Midnight", expression: "0 0 * * *" },
  { label: "Every Weekday", expression: "0 9 * * 1-5" },
  { label: "Every Monday", expression: "0 9 * * 1" },
  { label: "First of Month", expression: "0 0 1 * *" },
];

function defaultField(def: (typeof FIELD_DEFS)[number]): FieldState {
  return {
    mode: "every",
    specific: [def.min],
    rangeStart: def.min,
    rangeEnd: def.max,
    stepBase: def.min,
    stepInterval: 1,
  };
}

function fieldToExpression(field: FieldState): string {
  switch (field.mode) {
    case "every":
      return "*";
    case "specific":
      return field.specific.sort((a, b) => a - b).join(",");
    case "range":
      return `${field.rangeStart}-${field.rangeEnd}`;
    case "step":
      return field.stepBase === 0 || field.stepBase === 1
        ? `*/${field.stepInterval}`
        : `${field.stepBase}/${field.stepInterval}`;
  }
}

function parseExpressionField(part: string, def: (typeof FIELD_DEFS)[number]): FieldState {
  const base = defaultField(def);
  if (part === "*") return { ...base, mode: "every" };
  if (part.includes("/")) {
    const [left, right] = part.split("/");
    const interval = parseInt(right) || 1;
    const stepBase = left === "*" ? def.min : parseInt(left) || def.min;
    return { ...base, mode: "step", stepBase, stepInterval: interval };
  }
  if (part.includes("-")) {
    const [start, end] = part.split("-").map(Number);
    return { ...base, mode: "range", rangeStart: start, rangeEnd: end };
  }
  if (part.includes(",")) {
    return { ...base, mode: "specific", specific: part.split(",").map(Number) };
  }
  return { ...base, mode: "specific", specific: [parseInt(part) || def.min] };
}

function describeExpression(parts: string[]): string {
  if (parts.length !== 5) return "Invalid cron expression";
  const [min, hour, dom, month, dow] = parts;

  // Common patterns
  if (min === "*" && hour === "*" && dom === "*" && month === "*" && dow === "*")
    return "Runs every minute";
  if (min === "0" && hour === "*" && dom === "*" && month === "*" && dow === "*")
    return "Runs every hour at minute 0";
  if (min === "0" && hour === "0" && dom === "*" && month === "*" && dow === "*")
    return "Runs every day at midnight";
  if (min === "0" && hour === "0" && dom === "1" && month === "*" && dow === "*")
    return "Runs at midnight on the 1st of every month";

  let desc = "Runs ";

  // Minute
  if (min === "*") desc += "every minute";
  else if (min.includes("/")) {
    const [, step] = min.split("/");
    desc += `every ${step} minute${step === "1" ? "" : "s"}`;
  } else desc += `at minute ${min}`;

  // Hour
  if (hour === "*") desc += " of every hour";
  else if (hour.includes("/")) {
    const [, step] = hour.split("/");
    desc += ` every ${step} hour${step === "1" ? "" : "s"}`;
  } else {
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const m = min === "*" ? "" : `:${min.padStart(2, "0")}`;
    desc = `Runs at ${h12}${m} ${ampm}`;
  }

  // Day of week
  if (dow !== "*") {
    if (dow.includes("-")) {
      const [start, end] = dow.split("-").map(Number);
      desc += ` ${DOW_NAMES[start]} through ${DOW_NAMES[end]}`;
    } else if (dow.includes(",")) {
      const days = dow.split(",").map((d) => DOW_NAMES[parseInt(d)]);
      desc += ` on ${days.join(", ")}`;
    } else {
      desc += ` every ${DOW_NAMES[parseInt(dow)]}`;
    }
  }

  // Day of month
  if (dom !== "*") {
    if (dom.includes(",") || dom.includes("-")) {
      desc += ` on day ${dom} of the month`;
    } else {
      const d = parseInt(dom);
      const suffix = d === 1 || d === 21 || d === 31 ? "st" : d === 2 || d === 22 ? "nd" : d === 3 || d === 23 ? "rd" : "th";
      desc += ` on the ${d}${suffix}`;
    }
  }

  // Month
  if (month !== "*") {
    if (month.includes(",")) {
      const months = month.split(",").map((m) => MONTH_NAMES[parseInt(m)]);
      desc += ` in ${months.join(", ")}`;
    } else if (month.includes("-")) {
      const [start, end] = month.split("-").map(Number);
      desc += ` from ${MONTH_NAMES[start]} to ${MONTH_NAMES[end]}`;
    } else {
      desc += ` in ${MONTH_NAMES[parseInt(month)]}`;
    }
  }

  return desc;
}

function getNextExecutions(expression: string, count: number): Date[] {
  const parts = expression.split(" ");
  if (parts.length !== 5) return [];

  const results: Date[] = [];
  const now = new Date();
  const candidate = new Date(now);
  candidate.setSeconds(0, 0);
  candidate.setMinutes(candidate.getMinutes() + 1);

  const maxIterations = 525600; // 1 year of minutes

  for (let i = 0; i < maxIterations && results.length < count; i++) {
    if (matchesCron(candidate, parts)) {
      results.push(new Date(candidate));
    }
    candidate.setMinutes(candidate.getMinutes() + 1);
  }

  return results;
}

function matchesCron(date: Date, parts: string[]): boolean {
  const [minPart, hourPart, domPart, monthPart, dowPart] = parts;
  const minute = date.getMinutes();
  const hour = date.getHours();
  const dom = date.getDate();
  const month = date.getMonth() + 1;
  const dow = date.getDay();

  return (
    matchesField(minute, minPart) &&
    matchesField(hour, hourPart) &&
    matchesField(dom, domPart) &&
    matchesField(month, monthPart) &&
    matchesField(dow, dowPart)
  );
}

function matchesField(value: number, part: string): boolean {
  if (part === "*") return true;
  if (part.includes("/")) {
    const [base, step] = part.split("/");
    const stepN = parseInt(step);
    const baseN = base === "*" ? 0 : parseInt(base);
    return (value - baseN) % stepN === 0 && value >= baseN;
  }
  if (part.includes(",")) {
    return part.split(",").map(Number).includes(value);
  }
  if (part.includes("-")) {
    const [start, end] = part.split("-").map(Number);
    return value >= start && value <= end;
  }
  return value === parseInt(part);
}

export function CronExpressionBuilderTool() {
  const { isDark } = useTheme();

  const [fields, setFields] = useState<FieldState[]>(
    FIELD_DEFS.map((def) => defaultField(def))
  );
  const [copied, setCopied] = useState(false);

  const expression = useMemo(
    () => fields.map((f) => fieldToExpression(f)).join(" "),
    [fields]
  );

  const parts = useMemo(() => expression.split(" "), [expression]);
  const description = useMemo(() => describeExpression(parts), [parts]);
  const nextRuns = useMemo(() => getNextExecutions(expression, 5), [expression]);

  const updateField = useCallback((index: number, update: Partial<FieldState>) => {
    setFields((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...update };
      return next;
    });
  }, []);

  const applyPreset = useCallback((expr: string) => {
    const p = expr.split(" ");
    setFields(FIELD_DEFS.map((def, i) => parseExpressionField(p[i], def)));
  }, []);

  const copyExpression = useCallback(() => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [expression]);

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("fmc_cron_expression");
    if (saved) {
      try {
        const p = saved.split(" ");
        if (p.length === 5) {
          setFields(FIELD_DEFS.map((def, i) => parseExpressionField(p[i], def)));
        }
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fmc_cron_expression", expression);
  }, [expression]);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const btnPrimary = isDark ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500" : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const accent = isDark ? "text-emerald-400" : "text-emerald-600";

  const modes: FieldMode[] = ["every", "specific", "range", "step"];

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div className={cx("rounded-xl border p-4", base)}>
        <h3 className="text-sm font-semibold mb-3">Presets</h3>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset.expression)}
              className={cx(
                "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
                expression === preset.expression ? btnActive : btnBase
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Field Editors */}
      {FIELD_DEFS.map((def, i) => {
        const field = fields[i];
        return (
          <div key={def.key} className={cx("rounded-xl border p-4", base)}>
            <h3 className="text-sm font-semibold mb-3">
              {def.label}{" "}
              <span className={cx("font-normal text-xs", muted)}>
                ({def.min}–{def.max}{def.key === "dow" ? `, ${DOW_NAMES.join("/")}` : ""})
              </span>
            </h3>

            {/* Mode selector */}
            <div className="flex flex-wrap gap-2 mb-3">
              {modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => updateField(i, { mode })}
                  className={cx(
                    "rounded-lg border px-3 py-1.5 text-xs capitalize transition-colors min-h-[44px]",
                    field.mode === mode ? btnActive : btnBase
                  )}
                >
                  {mode === "every" ? "Every (*)" : mode === "specific" ? "Specific" : mode === "range" ? "Range" : "Step (/)" }
                </button>
              ))}
            </div>

            {/* Mode-specific inputs */}
            {field.mode === "specific" && (
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: def.max - def.min + 1 }, (_, j) => {
                  const val = def.min + j;
                  const selected = field.specific.includes(val);
                  let label = String(val);
                  if (def.key === "month") label = MONTH_NAMES[val];
                  if (def.key === "dow") label = DOW_NAMES[val];
                  return (
                    <button
                      key={val}
                      onClick={() => {
                        const next = selected
                          ? field.specific.filter((v) => v !== val)
                          : [...field.specific, val];
                        if (next.length > 0) updateField(i, { specific: next });
                      }}
                      className={cx(
                        "rounded-md border px-2 py-1 text-xs transition-colors min-h-[36px] min-w-[36px]",
                        selected ? btnActive : btnBase
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            {field.mode === "range" && (
              <div className="flex items-center gap-2">
                <label className="text-xs">From</label>
                <input
                  type="number"
                  min={def.min}
                  max={def.max}
                  value={field.rangeStart}
                  onChange={(e) => updateField(i, { rangeStart: Math.max(def.min, Math.min(def.max, parseInt(e.target.value) || def.min)) })}
                  className={cx("w-20 rounded-lg border px-2 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
                />
                <label className="text-xs">to</label>
                <input
                  type="number"
                  min={def.min}
                  max={def.max}
                  value={field.rangeEnd}
                  onChange={(e) => updateField(i, { rangeEnd: Math.max(def.min, Math.min(def.max, parseInt(e.target.value) || def.max)) })}
                  className={cx("w-20 rounded-lg border px-2 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
                />
              </div>
            )}

            {field.mode === "step" && (
              <div className="flex items-center gap-2">
                <label className="text-xs">Starting at</label>
                <input
                  type="number"
                  min={def.min}
                  max={def.max}
                  value={field.stepBase}
                  onChange={(e) => updateField(i, { stepBase: Math.max(def.min, Math.min(def.max, parseInt(e.target.value) || def.min)) })}
                  className={cx("w-20 rounded-lg border px-2 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
                />
                <label className="text-xs">every</label>
                <input
                  type="number"
                  min={1}
                  max={def.max}
                  value={field.stepInterval}
                  onChange={(e) => updateField(i, { stepInterval: Math.max(1, parseInt(e.target.value) || 1) })}
                  className={cx("w-20 rounded-lg border px-2 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* Output */}
      <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
        <h3 className="text-sm font-semibold mb-3">Cron Expression</h3>
        <div className="flex items-center gap-3 flex-wrap">
          <code className={cx("font-mono text-lg px-4 py-2 rounded-lg border", isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10")}>
            {expression}
          </code>
          <button
            onClick={copyExpression}
            className={cx("rounded-lg border px-4 py-2 text-sm font-semibold transition-colors min-h-[44px]", btnPrimary)}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className={cx("mt-3 text-sm", accent)}>{description}</p>
      </div>

      {/* Next 5 Execution Times */}
      {nextRuns.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)}>
          <h3 className="text-sm font-semibold mb-3">Next 5 Execution Times</h3>
          <ul className="space-y-1.5">
            {nextRuns.map((date, i) => (
              <li
                key={i}
                className={cx("text-sm font-mono flex items-center gap-2", muted)}
              >
                <span className={accent}>{i + 1}.</span>
                <span>
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  {date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
