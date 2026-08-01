"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";
import { deferStorageHydration, persistAfterStorageHydration, safeGetLocalStorage, useStorageHydrationGate } from "@/lib/storage-hydration";

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
const DOW_DESCRIPTION_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const PRESETS: { label: string; expression: string }[] = [
  { label: "Every Minute", expression: "* * * * *" },
  { label: "Every Hour", expression: "0 * * * *" },
  { label: "Daily at Midnight", expression: "0 0 * * *" },
  { label: "Every Weekday", expression: "0 9 * * 1-5" },
  { label: "Every Monday", expression: "0 9 * * 1" },
  { label: "First of Month", expression: "0 0 1 * *" },
];

export const CRON_PREVIEW_YEARS = 32;

const MONTH_DESCRIPTION_NAMES = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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

function clampFieldValue(value: number, min: number, max: number, fallback = min): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

export function normalizeRange(
  start: number,
  end: number,
  min: number,
  max: number,
): [number, number] {
  const first = clampFieldValue(start, min, max);
  const second = clampFieldValue(end, min, max, max);
  return first <= second ? [first, second] : [second, first];
}

export function fieldToExpression(
  field: FieldState,
  fieldMin: number,
  fieldMax: number,
): string {
  switch (field.mode) {
    case "every":
      return "*";
    case "specific": {
      const values = [...new Set(
        field.specific.map((value) => clampFieldValue(value, fieldMin, fieldMax)),
      )].sort((a, b) => a - b);
      return (values.length > 0 ? values : [fieldMin]).join(",");
    }
    case "range": {
      const [start, end] = normalizeRange(
        field.rangeStart,
        field.rangeEnd,
        fieldMin,
        fieldMax,
      );
      return `${start}-${end}`;
    }
    case "step": {
      const stepBase = clampFieldValue(field.stepBase, fieldMin, fieldMax);
      const stepInterval = Math.max(1, Math.trunc(field.stepInterval) || 1);
      return stepBase === fieldMin
        ? `*/${stepInterval}`
        : `${stepBase}-${fieldMax}/${stepInterval}`;
    }
  }
}

export function parseExpressionField(
  part: string,
  def: (typeof FIELD_DEFS)[number],
): FieldState {
  const base = defaultField(def);
  const value = part.trim();
  if (value === "*") return { ...base, mode: "every" };

  const stepMatch = /^(\*|\d+|\d+-\d+)\/(\d+)$/.exec(value);
  if (stepMatch) {
    const [, stepRange, intervalText] = stepMatch;
    const stepInterval = Math.max(1, Number(intervalText));
    if (stepRange === "*") {
      return { ...base, mode: "step", stepBase: def.min, stepInterval };
    }

    if (stepRange.includes("-")) {
      const [rawStart, rawEnd] = stepRange.split("-").map(Number);
      const [stepBase, stepEnd] = normalizeRange(rawStart, rawEnd, def.min, def.max);
      if (stepEnd === def.max) {
        return { ...base, mode: "step", stepBase, stepInterval };
      }

      // The visual step control always runs through the field maximum. Preserve
      // a shorter imported range/step exactly by representing its expanded set.
      const specific = expandCronField(
        `${stepBase}-${stepEnd}/${stepInterval}`,
        def.min,
        def.max,
      );
      return specific.length > 0
        ? { ...base, mode: "specific", specific }
        : base;
    }

    // Accept legacy persisted values such as 3/10, then reserialize them as
    // the portable range/step form 3-59/10.
    return {
      ...base,
      mode: "step",
      stepBase: clampFieldValue(Number(stepRange), def.min, def.max),
      stepInterval,
    };
  }

  const rangeMatch = /^(\d+)-(\d+)$/.exec(value);
  if (rangeMatch) {
    const [rangeStart, rangeEnd] = normalizeRange(
      Number(rangeMatch[1]),
      Number(rangeMatch[2]),
      def.min,
      def.max,
    );
    return { ...base, mode: "range", rangeStart, rangeEnd };
  }

  if (/^\d+(?:,\d+)*$/.test(value)) {
    const specific = [...new Set(
      value
        .split(",")
        .map(Number)
        .filter((item) => item >= def.min && item <= def.max),
    )].sort((left, right) => left - right);
    if (specific.length > 0) return { ...base, mode: "specific", specific };
  }

  return base;
}

type CronFieldShape =
  | { kind: "every"; start: number; end: number }
  | { kind: "values"; values: number[] }
  | { kind: "range"; start: number; end: number }
  | { kind: "step"; start: number; end: number; step: number };

function parseFieldShape(part: string, min: number, max: number): CronFieldShape | null {
  const values = expandCronField(part, min, max);
  if (values.length === 0) return null;
  if (part === "*") return { kind: "every", start: min, end: max };

  const stepMatch = /^(\*|\d+|\d+-\d+)\/(\d+)$/.exec(part);
  if (stepMatch) {
    const base = stepMatch[1];
    const step = Number(stepMatch[2]);
    if (base === "*") return { kind: "step", start: min, end: max, step };
    if (base.includes("-")) {
      const [start, end] = base.split("-").map(Number);
      return { kind: "step", start, end, step };
    }
    return { kind: "step", start: Number(base), end: max, step };
  }

  const rangeMatch = /^(\d+)-(\d+)$/.exec(part);
  if (rangeMatch) {
    return { kind: "range", start: Number(rangeMatch[1]), end: Number(rangeMatch[2]) };
  }

  return { kind: "values", values };
}

function joinNatural(values: string[]): string {
  if (values.length <= 1) return values[0] ?? "";
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(", ")}, and ${values.at(-1)}`;
}

function plural(value: number, singular: string): string {
  return value === 1 ? singular : `${singular}s`;
}

function formatHour(hour: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const normalized = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${normalized} ${period}`;
}

function formatClock(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const normalized = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${normalized}:${String(minute).padStart(2, "0")} ${period}`;
}

function ordinal(value: number): string {
  const modulo100 = value % 100;
  const suffix = modulo100 >= 11 && modulo100 <= 13
    ? "th"
    : value % 10 === 1
      ? "st"
      : value % 10 === 2
        ? "nd"
        : value % 10 === 3
          ? "rd"
          : "th";
  return `${value}${suffix}`;
}

function describeMinute(shape: CronFieldShape): string {
  switch (shape.kind) {
    case "every":
      return "every minute";
    case "values":
      return shape.values.length === 1
        ? `at minute ${shape.values[0]}`
        : `at minutes ${joinNatural(shape.values.map(String))}`;
    case "range":
      return `at every minute from ${shape.start} through ${shape.end}`;
    case "step":
      return shape.start === 0 && shape.end === 59
        ? `every ${shape.step} ${plural(shape.step, "minute")}`
        : `every ${shape.step} ${plural(shape.step, "minute")} from minute ${shape.start} through ${shape.end}`;
  }
}

function describeHour(shape: CronFieldShape): string {
  switch (shape.kind) {
    case "every":
      return "of every hour";
    case "values":
      return shape.values.length === 1
        ? `during the ${formatHour(shape.values[0])} hour`
        : `during the ${joinNatural(shape.values.map(formatHour))} hours`;
    case "range":
      return `during every hour from ${formatHour(shape.start)} through ${formatHour(shape.end)}`;
    case "step":
      return shape.start === 0 && shape.end === 23
        ? `during every ${shape.step} ${plural(shape.step, "hour")} of the day starting at midnight`
        : `during every ${shape.step} ${plural(shape.step, "hour")} of the day from ${formatHour(shape.start)} through ${formatHour(shape.end)}`;
  }
}

function describeDayOfMonth(shape: CronFieldShape): string {
  switch (shape.kind) {
    case "every":
      return "on every day of the month";
    case "values":
      return shape.values.length === 1
        ? `on the ${ordinal(shape.values[0])} day of the month`
        : `on the ${joinNatural(shape.values.map(ordinal))} days of the month`;
    case "range":
      return `on every day of the month from the ${ordinal(shape.start)} through the ${ordinal(shape.end)}`;
    case "step":
      return `on every ${shape.step} ${plural(shape.step, "day")} of the month from the ${ordinal(shape.start)} through the ${ordinal(shape.end)}`;
  }
}

function describeDayOfWeek(shape: CronFieldShape): string {
  switch (shape.kind) {
    case "every":
      return "on every day of the week";
    case "values":
      return shape.values.length === 1
        ? `on ${DOW_DESCRIPTION_NAMES[shape.values[0]]}`
        : `on ${joinNatural(shape.values.map((value) => DOW_DESCRIPTION_NAMES[value]))}`;
    case "range":
      return `on every day from ${DOW_DESCRIPTION_NAMES[shape.start]} through ${DOW_DESCRIPTION_NAMES[shape.end]}`;
    case "step":
      return `on every ${shape.step} ${plural(shape.step, "day")} of the week from ${DOW_DESCRIPTION_NAMES[shape.start]} through ${DOW_DESCRIPTION_NAMES[shape.end]}`;
  }
}

function describeMonth(shape: CronFieldShape): string {
  switch (shape.kind) {
    case "every":
      return "in every month";
    case "values":
      return `in ${joinNatural(shape.values.map((value) => MONTH_DESCRIPTION_NAMES[value]))}`;
    case "range":
      return `from ${MONTH_DESCRIPTION_NAMES[shape.start]} through ${MONTH_DESCRIPTION_NAMES[shape.end]}`;
    case "step":
      return `in every ${shape.step} ${plural(shape.step, "month")} from ${MONTH_DESCRIPTION_NAMES[shape.start]} through ${MONTH_DESCRIPTION_NAMES[shape.end]}`;
  }
}

export function describeExpression(parts: string[]): string {
  if (parts.length !== 5) return "Invalid cron expression";
  const [minutePart, hourPart, dayOfMonthPart, monthPart, dayOfWeekPart] = parts;
  const minute = parseFieldShape(minutePart, 0, 59);
  const hour = parseFieldShape(hourPart, 0, 23);
  const dayOfMonth = parseFieldShape(dayOfMonthPart, 1, 31);
  const month = parseFieldShape(monthPart, 1, 12);
  const dayOfWeek = parseFieldShape(dayOfWeekPart, 0, 6);
  if (!minute || !hour || !dayOfMonth || !month || !dayOfWeek) {
    return "Invalid cron expression";
  }

  if (parts.every((part) => part === "*")) return "Runs every minute";
  if (minutePart === "0" && hourPart === "*" && parts.slice(2).every((part) => part === "*")) {
    return "Runs every hour at minute 0";
  }
  if (minutePart === "0" && hourPart === "0" && parts.slice(2).every((part) => part === "*")) {
    return "Runs every day at midnight";
  }
  if (
    minutePart === "0" &&
    hourPart === "0" &&
    dayOfMonthPart === "1" &&
    monthPart === "*" &&
    dayOfWeekPart === "*"
  ) {
    return "Runs at midnight on the 1st day of every month";
  }

  const singleMinute = minute.kind === "values" && minute.values.length === 1;
  const singleHour = hour.kind === "values" && hour.values.length === 1;
  let description = singleMinute && singleHour
    ? `Runs at ${formatClock(hour.values[0], minute.values[0])}`
    : `Runs ${describeMinute(minute)} ${describeHour(hour)}`;

  const dayClauses: string[] = [];
  if (dayOfMonthPart !== "*") dayClauses.push(describeDayOfMonth(dayOfMonth));
  if (dayOfWeekPart !== "*") dayClauses.push(describeDayOfWeek(dayOfWeek));
  if (dayClauses.length === 0) {
    description += " every day";
  } else if (dayClauses.length === 1) {
    description += ` ${dayClauses[0]}`;
  } else {
    const connector = isDayFieldRestricted(dayOfMonthPart) && isDayFieldRestricted(dayOfWeekPart)
      ? " or "
      : " and ";
    description += ` ${dayClauses.join(connector)}`;
  }

  if (monthPart !== "*") description += ` ${describeMonth(month)}`;
  return description;
}

function isDayFieldRestricted(part: string): boolean {
  // Traditional Unix cron treats a day field that contains "*" (including
  // step forms such as */2) as wildcard-based for DOM/DOW combination rules.
  return !part.includes("*");
}

export function expandCronField(part: string, min: number, max: number): number[] {
  if (!part || !Number.isInteger(min) || !Number.isInteger(max) || min > max) return [];

  const values = new Set<number>();
  for (const item of part.split(",")) {
    const stepParts = item.split("/");
    if (stepParts.length > 2) return [];

    const [base, stepText] = stepParts;
    const step = stepText === undefined ? 1 : Number(stepText);
    if (!Number.isInteger(step) || step < 1) return [];

    let start: number;
    let end: number;
    if (base === "*") {
      start = min;
      end = max;
    } else if (base.includes("-")) {
      const range = base.split("-");
      if (range.length !== 2 || !range.every((value) => /^\d+$/.test(value))) return [];
      [start, end] = range.map(Number);
    } else {
      if (!/^\d+$/.test(base)) return [];
      start = Number(base);
      end = stepText === undefined ? start : max;
    }

    if (start < min || end > max || start > end) return [];
    for (let value = start; value <= end; value += step) values.add(value);
  }

  return [...values].sort((left, right) => left - right);
}

interface ParsedCronExpression {
  minutes: number[];
  hours: number[];
  daysOfMonth: Set<number>;
  months: Set<number>;
  daysOfWeek: Set<number>;
  dayOfMonthRestricted: boolean;
  dayOfWeekRestricted: boolean;
}

function parseCronExpression(parts: string[]): ParsedCronExpression | null {
  if (parts.length !== 5) return null;
  const [minutePart, hourPart, dayOfMonthPart, monthPart, dayOfWeekPart] = parts;
  const minutes = expandCronField(minutePart, 0, 59);
  const hours = expandCronField(hourPart, 0, 23);
  const daysOfMonth = expandCronField(dayOfMonthPart, 1, 31);
  const months = expandCronField(monthPart, 1, 12);
  const daysOfWeek = expandCronField(dayOfWeekPart, 0, 6);
  if ([minutes, hours, daysOfMonth, months, daysOfWeek].some((values) => values.length === 0)) {
    return null;
  }

  return {
    minutes,
    hours,
    daysOfMonth: new Set(daysOfMonth),
    months: new Set(months),
    daysOfWeek: new Set(daysOfWeek),
    dayOfMonthRestricted: isDayFieldRestricted(dayOfMonthPart),
    dayOfWeekRestricted: isDayFieldRestricted(dayOfWeekPart),
  };
}

function matchesParsedDay(date: Date, parsed: ParsedCronExpression): boolean {
  const dayOfMonthMatches = parsed.daysOfMonth.has(date.getDate());
  const dayOfWeekMatches = parsed.daysOfWeek.has(date.getDay());
  return parsed.dayOfMonthRestricted && parsed.dayOfWeekRestricted
    ? dayOfMonthMatches || dayOfWeekMatches
    : dayOfMonthMatches && dayOfWeekMatches;
}

export function matchesField(value: number, part: string, min: number, max: number): boolean {
  return expandCronField(part, min, max).includes(value);
}

export function matchesCron(date: Date, parts: string[]): boolean {
  if (Number.isNaN(date.getTime())) return false;
  const parsed = parseCronExpression(parts);
  if (!parsed) return false;

  return (
    parsed.minutes.includes(date.getMinutes()) &&
    parsed.hours.includes(date.getHours()) &&
    parsed.months.has(date.getMonth() + 1) &&
    matchesParsedDay(date, parsed)
  );
}

export function getLocalTimeCandidates(
  year: number,
  month: number,
  dayOfMonth: number,
  hour: number,
  minute: number,
): Date[] {
  const wallClockTimestamp = Date.UTC(year, month, dayOfMonth, hour, minute, 0, 0);
  const offsetSamples = [
    new Date(year, month, dayOfMonth - 1, 12),
    new Date(year, month, dayOfMonth, 0),
    new Date(year, month, dayOfMonth, 12),
    new Date(year, month, dayOfMonth + 1, 0),
    new Date(year, month, dayOfMonth + 1, 12),
  ];
  const offsets = new Set(offsetSamples.map((date) => date.getTimezoneOffset()));
  const candidates = new Map<number, Date>();

  for (const offset of offsets) {
    // getTimezoneOffset is UTC minus local time, so adding it to the desired
    // wall-clock timestamp produces the corresponding absolute instant.
    const candidate = new Date(wallClockTimestamp + offset * 60_000);
    if (
      candidate.getFullYear() === year &&
      candidate.getMonth() === month &&
      candidate.getDate() === dayOfMonth &&
      candidate.getHours() === hour &&
      candidate.getMinutes() === minute &&
      candidate.getTimezoneOffset() === offset
    ) {
      candidates.set(candidate.getTime(), candidate);
    }
  }

  return [...candidates.values()].sort((left, right) => left.getTime() - right.getTime());
}

export function getNextExecutions(
  expression: string,
  count: number,
  fromDate: Date = new Date(),
): Date[] {
  if (!Number.isInteger(count) || count < 1 || Number.isNaN(fromDate.getTime())) return [];

  const parts = expression.trim().split(/\s+/);
  const parsed = parseCronExpression(parts);
  if (!parsed) return [];

  // Advance by absolute time. Local setters can jump over the repeated hour
  // when daylight saving time ends.
  const earliest = new Date(Math.floor(fromDate.getTime() / 60_000) * 60_000 + 60_000);

  const horizon = new Date(earliest);
  horizon.setFullYear(horizon.getFullYear() + CRON_PREVIEW_YEARS);
  horizon.setHours(23, 59, 59, 999);

  const results: Date[] = [];
  // Noon is stable when advancing calendar days across daylight-saving changes.
  const day = new Date(
    earliest.getFullYear(),
    earliest.getMonth(),
    earliest.getDate(),
    12,
  );

  while (day.getTime() <= horizon.getTime() && results.length < count) {
    if (parsed.months.has(day.getMonth() + 1) && matchesParsedDay(day, parsed)) {
      const year = day.getFullYear();
      const month = day.getMonth();
      const dayOfMonth = day.getDate();
      const dayCandidates = new Map<number, Date>();
      for (const hour of parsed.hours) {
        for (const minute of parsed.minutes) {
          for (const candidate of getLocalTimeCandidates(
            year,
            month,
            dayOfMonth,
            hour,
            minute,
          )) {
            dayCandidates.set(candidate.getTime(), candidate);
          }
        }
      }

      // Sorting the whole local day keeps repeated fall-back times in absolute
      // order (for example, 1:30 EDT precedes the repeated 1:00 EST).
      const sortedCandidates = [...dayCandidates.values()].sort(
        (left, right) => left.getTime() - right.getTime(),
      );
      for (const candidate of sortedCandidates) {
        if (candidate.getTime() < earliest.getTime() || candidate.getTime() > horizon.getTime()) {
          continue;
        }
        results.push(candidate);
        if (results.length === count) return results;
      }
    }
    day.setDate(day.getDate() + 1);
  }

  return results;
}

export function CronExpressionBuilderTool() {
  const { isDark } = useTheme();

  const [fields, setFields] = useState<FieldState[]>(
    FIELD_DEFS.map((def) => defaultField(def))
  );
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [nextRuns, setNextRuns] = useState<Date[]>([]);
  const [previewReady, setPreviewReady] = useState(false);
  const storageHydration = useStorageHydrationGate();

  const expression = useMemo(
    () => fields
      .map((field, index) => fieldToExpression(
        field,
        FIELD_DEFS[index].min,
        FIELD_DEFS[index].max,
      ))
      .join(" "),
    [fields]
  );

  const parts = useMemo(() => expression.split(" "), [expression]);
  const description = useMemo(() => describeExpression(parts), [parts]);
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setNextRuns(getNextExecutions(expression, 5));
      setPreviewReady(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [expression]);

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

  const copyExpression = useCallback(async () => {
    let nextStatus: "copied" | "failed";
    try {
      await navigator.clipboard.writeText(expression);
      nextStatus = "copied";
    } catch {
      nextStatus = "failed";
    }
    setCopyStatus(nextStatus);
    window.setTimeout(() => {
      setCopyStatus((current) => current === nextStatus ? "idle" : current);
    }, 2000);
  }, [expression]);

  // Persist to localStorage
  useEffect(() => {
    const saved = safeGetLocalStorage("fmc_cron_expression");
    return deferStorageHydration(storageHydration, () => {
      try {
        if (saved) {
          const p = saved.split(" ");
          if (p.length === 5) {
            setFields(FIELD_DEFS.map((def, i) => parseExpressionField(p[i], def)));
          }
        }
      } catch { /* ignore */ }
    });
  }, [storageHydration]);

  useEffect(() => {
    persistAfterStorageHydration(storageHydration, () => localStorage.setItem("fmc_cron_expression", expression));
  }, [expression, storageHydration]);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const btnPrimary = isDark ? "bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-600" : "bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-700";
  const muted = isDark ? "text-neutral-400" : "text-neutral-600";
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
                  onChange={(event) => {
                    const rangeStart = clampFieldValue(
                      event.currentTarget.valueAsNumber,
                      def.min,
                      def.max,
                    );
                    updateField(i, {
                      rangeStart,
                      rangeEnd: Math.max(rangeStart, field.rangeEnd),
                    });
                  }}
                  className={cx("w-20 rounded-lg border px-2 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
                />
                <label className="text-xs">to</label>
                <input
                  type="number"
                  min={def.min}
                  max={def.max}
                  value={field.rangeEnd}
                  onChange={(event) => {
                    const rangeEnd = clampFieldValue(
                      event.currentTarget.valueAsNumber,
                      def.min,
                      def.max,
                      def.max,
                    );
                    updateField(i, {
                      rangeStart: Math.min(field.rangeStart, rangeEnd),
                      rangeEnd,
                    });
                  }}
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
                  onChange={(event) => updateField(i, {
                    stepBase: clampFieldValue(
                      event.currentTarget.valueAsNumber,
                      def.min,
                      def.max,
                    ),
                  })}
                  className={cx("w-20 rounded-lg border px-2 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
                />
                <label className="text-xs">every</label>
                <input
                  type="number"
                  min={1}
                  max={def.max}
                  value={field.stepInterval}
                  onChange={(event) => updateField(i, {
                    stepInterval: Math.max(1, Math.trunc(event.currentTarget.valueAsNumber) || 1),
                  })}
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
            onClick={() => void copyExpression()}
            className={cx("rounded-lg border px-4 py-2 text-sm font-semibold transition-colors min-h-[44px]", btnPrimary)}
          >
            {copyStatus === "copied" ? "Copied!" : copyStatus === "failed" ? "Copy failed" : "Copy"}
          </button>
        </div>
        {copyStatus === "failed" && (
          <p className="mt-2 text-sm text-red-500" role="alert">
            Clipboard access failed. Select the expression and copy it manually.
          </p>
        )}
        <p className={cx("mt-3 text-sm", accent)}>{description}</p>
      </div>

      {/* Next 5 Execution Times */}
      {previewReady && (
        <div className={cx("rounded-xl border p-4", base)}>
          <h3 className="text-sm font-semibold mb-3">Next 5 Execution Times</h3>
          {nextRuns.length > 0 ? (
            <ul className="space-y-1.5">
              {nextRuns.map((date, i) => (
                <li
                  key={date.getTime()}
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
                      timeZoneName: "short",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={cx("text-sm", muted)}>
              No matching execution time was found in the next {CRON_PREVIEW_YEARS} years.
            </p>
          )}
          <p className={cx("mt-3 text-xs", muted)}>
            Previewed in your browser&apos;s local time across the next {CRON_PREVIEW_YEARS} years.
            Repeated times when daylight saving time ends appear twice with their timezone.
          </p>
        </div>
      )}
    </div>
  );
}
