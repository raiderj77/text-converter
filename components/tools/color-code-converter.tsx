"use client";

import { useCallback, useEffect, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ── Color conversion helpers ─────────────────────────────── */

interface RGB { r: number; g: number; b: number }
interface HSL { h: number; s: number; l: number }
interface CMYK { c: number; m: number; y: number; k: number }

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function hexToRgb(hex: string): RGB | null {
  const m = hex.replace(/^#/, "").match(/^([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
}

function rgbToHex(rgb: RGB): string {
  const toHex = (v: number) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360, s = hsl.s / 100, l = hsl.l / 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

function rgbToCmyk(rgb: RGB): CMYK {
  const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

function cmykToRgb(cmyk: CMYK): RGB {
  const c = cmyk.c / 100, m = cmyk.m / 100, y = cmyk.y / 100, k = cmyk.k / 100;
  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k)),
  };
}

/* ── Contrast helpers (WCAG 2.1) ─────────────────────────── */

function relativeLuminance(rgb: RGB): number {
  const srgb = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(rgb1: RGB, rgb2: RGB): number {
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function wcagLabel(ratio: number, level: "AA" | "AAA", size: "normal" | "large"): boolean {
  if (level === "AA") return size === "normal" ? ratio >= 4.5 : ratio >= 3;
  return size === "normal" ? ratio >= 7 : ratio >= 4.5;
}

/* ── Component ────────────────────────────────────────────── */

const STORAGE_KEY = "fmc_color_converter";

export function ColorCodeConverterTool() {
  const { isDark } = useTheme();

  const [rgb, setRgb] = useState<RGB>({ r: 59, g: 130, b: 246 });
  const [hexInput, setHexInput] = useState("#3b82f6");
  const [rgbInput, setRgbInput] = useState("59, 130, 246");
  const [hslInput, setHslInput] = useState("217, 91%, 60%");
  const [cmykInput, setCmykInput] = useState("76, 47, 0, 4");
  const [copied, setCopied] = useState("");

  // Persist to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as RGB;
        if (typeof parsed.r === "number") {
          updateFromRgb(parsed);
        }
      }
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(rgb)); } catch { /* ignore */ }
  }, [rgb]);

  const updateFromRgb = useCallback((newRgb: RGB) => {
    const clamped: RGB = {
      r: clamp(Math.round(newRgb.r), 0, 255),
      g: clamp(Math.round(newRgb.g), 0, 255),
      b: clamp(Math.round(newRgb.b), 0, 255),
    };
    setRgb(clamped);
    setHexInput(rgbToHex(clamped));
    setRgbInput(`${clamped.r}, ${clamped.g}, ${clamped.b}`);
    const hsl = rgbToHsl(clamped);
    setHslInput(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
    const cmyk = rgbToCmyk(clamped);
    setCmykInput(`${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`);
  }, []);

  const handleHexChange = (val: string) => {
    setHexInput(val);
    const parsed = hexToRgb(val);
    if (parsed) updateFromRgb(parsed);
  };

  const handleRgbChange = (val: string) => {
    setRgbInput(val);
    const parts = val.split(",").map((s) => parseInt(s.trim()));
    if (parts.length === 3 && parts.every((n) => !isNaN(n) && n >= 0 && n <= 255)) {
      updateFromRgb({ r: parts[0], g: parts[1], b: parts[2] });
    }
  };

  const handleHslChange = (val: string) => {
    setHslInput(val);
    const clean = val.replace(/%/g, "");
    const parts = clean.split(",").map((s) => parseFloat(s.trim()));
    if (parts.length === 3 && parts.every((n) => !isNaN(n))) {
      const h = clamp(Math.round(parts[0]), 0, 360);
      const s = clamp(Math.round(parts[1]), 0, 100);
      const l = clamp(Math.round(parts[2]), 0, 100);
      const newRgb = hslToRgb({ h, s, l });
      setRgb(newRgb);
      setHexInput(rgbToHex(newRgb));
      setRgbInput(`${newRgb.r}, ${newRgb.g}, ${newRgb.b}`);
      const cmyk = rgbToCmyk(newRgb);
      setCmykInput(`${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`);
    }
  };

  const handleCmykChange = (val: string) => {
    setCmykInput(val);
    const parts = val.split(",").map((s) => parseFloat(s.trim()));
    if (parts.length === 4 && parts.every((n) => !isNaN(n) && n >= 0 && n <= 100)) {
      const newRgb = cmykToRgb({ c: parts[0], m: parts[1], y: parts[2], k: parts[3] });
      setRgb(newRgb);
      setHexInput(rgbToHex(newRgb));
      setRgbInput(`${newRgb.r}, ${newRgb.g}, ${newRgb.b}`);
      const hsl = rgbToHsl(newRgb);
      setHslInput(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
    }
  };

  const handlePickerChange = (val: string) => {
    const parsed = hexToRgb(val);
    if (parsed) updateFromRgb(parsed);
  };

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  // Contrast ratios
  const white: RGB = { r: 255, g: 255, b: 255 };
  const black: RGB = { r: 0, g: 0, b: 0 };
  const ratioWhite = contrastRatio(rgb, white);
  const ratioBlack = contrastRatio(rgb, black);

  // Theme styles
  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  const PassBadge = ({ pass }: { pass: boolean }) => (
    <span className={cx(
      "inline-block rounded px-1.5 py-0.5 text-xs font-bold",
      pass
        ? isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"
        : isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700"
    )}>
      {pass ? "Pass" : "Fail"}
    </span>
  );

  const CopyBtn = ({ value, label }: { value: string; label: string }) => (
    <button
      onClick={() => copyText(value, label)}
      className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px] min-w-[44px] shrink-0", btnBase)}
      aria-label={`Copy ${label}`}
    >
      {copied === label ? "Copied!" : "Copy"}
    </button>
  );

  return (
    <div className="space-y-4" aria-live="polite">
      {/* Color picker + swatch */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label htmlFor="color-picker" className="text-sm font-semibold block mb-2">
              Pick a Color
            </label>
            <input
              id="color-picker"
              type="color"
              value={rgbToHex(rgb)}
              onChange={(e) => handlePickerChange(e.target.value)}
              className="w-16 h-12 rounded-lg border-0 cursor-pointer min-h-[44px]"
            />
          </div>
          <div
            className="w-24 h-24 rounded-xl border border-white/10 shadow-inner"
            style={{ backgroundColor: rgbToHex(rgb) }}
            aria-label={`Color swatch: ${rgbToHex(rgb)}`}
          />
          <div className="flex-1 min-w-[200px] space-y-1">
            <div className="flex items-center gap-2 rounded-lg p-2" style={{ backgroundColor: rgbToHex(rgb), color: ratioWhite >= ratioBlack ? "#fff" : "#000" }}>
              <span className="text-sm font-semibold">Sample Text on Color</span>
            </div>
            <div className={cx("text-xs", muted)}>
              {rgbToHex(rgb).toUpperCase()} &middot; rgb({rgb.r}, {rgb.g}, {rgb.b})
            </div>
          </div>
        </div>
      </div>

      {/* Format inputs */}
      <div className={cx("rounded-xl border p-4 space-y-3", base)}>
        <h3 className="text-sm font-semibold">Color Codes</h3>

        {/* HEX */}
        <div className="flex items-center gap-2">
          <label htmlFor="hex-input" className="text-xs font-semibold w-12 shrink-0">HEX</label>
          <input
            id="hex-input"
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            className={cx("flex-1 rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            placeholder="#3b82f6"
          />
          <CopyBtn value={hexInput.toUpperCase()} label="hex" />
        </div>

        {/* RGB */}
        <div className="flex items-center gap-2">
          <label htmlFor="rgb-input" className="text-xs font-semibold w-12 shrink-0">RGB</label>
          <input
            id="rgb-input"
            type="text"
            value={rgbInput}
            onChange={(e) => handleRgbChange(e.target.value)}
            className={cx("flex-1 rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            placeholder="59, 130, 246"
          />
          <CopyBtn value={`rgb(${rgbInput})`} label="rgb" />
        </div>

        {/* HSL */}
        <div className="flex items-center gap-2">
          <label htmlFor="hsl-input" className="text-xs font-semibold w-12 shrink-0">HSL</label>
          <input
            id="hsl-input"
            type="text"
            value={hslInput}
            onChange={(e) => handleHslChange(e.target.value)}
            className={cx("flex-1 rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            placeholder="217, 91%, 60%"
          />
          <CopyBtn value={`hsl(${hslInput})`} label="hsl" />
        </div>

        {/* CMYK */}
        <div className="flex items-center gap-2">
          <label htmlFor="cmyk-input" className="text-xs font-semibold w-12 shrink-0">CMYK</label>
          <input
            id="cmyk-input"
            type="text"
            value={cmykInput}
            onChange={(e) => handleCmykChange(e.target.value)}
            className={cx("flex-1 rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            placeholder="76, 47, 0, 4"
          />
          <CopyBtn value={`cmyk(${cmykInput})`} label="cmyk" />
        </div>
      </div>

      {/* Contrast checker */}
      <div className={cx("rounded-xl border p-4", base)}>
        <h3 className="text-sm font-semibold mb-3">Contrast Checker (WCAG 2.1)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* vs White */}
          <div className={cx("rounded-lg border p-3", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-white border border-black/10" />
              <span className="text-sm font-semibold">vs White</span>
              <span className={cx("ml-auto text-sm font-mono font-bold", isDark ? "text-emerald-400" : "text-emerald-600")}>
                {ratioWhite.toFixed(2)}:1
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className={muted}>AA Normal</span>
                <PassBadge pass={wcagLabel(ratioWhite, "AA", "normal")} />
              </div>
              <div className="flex items-center justify-between">
                <span className={muted}>AA Large</span>
                <PassBadge pass={wcagLabel(ratioWhite, "AA", "large")} />
              </div>
              <div className="flex items-center justify-between">
                <span className={muted}>AAA Normal</span>
                <PassBadge pass={wcagLabel(ratioWhite, "AAA", "normal")} />
              </div>
              <div className="flex items-center justify-between">
                <span className={muted}>AAA Large</span>
                <PassBadge pass={wcagLabel(ratioWhite, "AAA", "large")} />
              </div>
            </div>
          </div>
          {/* vs Black */}
          <div className={cx("rounded-lg border p-3", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-black border border-white/10" />
              <span className="text-sm font-semibold">vs Black</span>
              <span className={cx("ml-auto text-sm font-mono font-bold", isDark ? "text-emerald-400" : "text-emerald-600")}>
                {ratioBlack.toFixed(2)}:1
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className={muted}>AA Normal</span>
                <PassBadge pass={wcagLabel(ratioBlack, "AA", "normal")} />
              </div>
              <div className="flex items-center justify-between">
                <span className={muted}>AA Large</span>
                <PassBadge pass={wcagLabel(ratioBlack, "AA", "large")} />
              </div>
              <div className="flex items-center justify-between">
                <span className={muted}>AAA Normal</span>
                <PassBadge pass={wcagLabel(ratioBlack, "AAA", "normal")} />
              </div>
              <div className="flex items-center justify-between">
                <span className={muted}>AAA Large</span>
                <PassBadge pass={wcagLabel(ratioBlack, "AAA", "large")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
