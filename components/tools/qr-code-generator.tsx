"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ── Types ──────────────────────────────────────────── */

type InputType = "url" | "text" | "email" | "phone" | "wifi";
type ErrorLevel = "L" | "M" | "Q" | "H";
type QRSize = 128 | 256 | 512;

const STORAGE_KEY = "fmc_qr_code";

/* ── QR Code generation via CDN library ─────────────── */

let qrLibLoaded = false;
let qrLibLoading = false;
let qrLibCallbacks: (() => void)[] = [];

function loadQRLib(): Promise<void> {
  return new Promise((resolve) => {
    if (qrLibLoaded) { resolve(); return; }
    qrLibCallbacks.push(resolve);
    if (qrLibLoading) return;
    qrLibLoading = true;
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    script.onload = () => {
      qrLibLoaded = true;
      qrLibCallbacks.forEach((cb) => cb());
      qrLibCallbacks = [];
    };
    script.onerror = () => {
      qrLibLoading = false;
      qrLibCallbacks.forEach((cb) => cb());
      qrLibCallbacks = [];
    };
    document.head.appendChild(script);
  });
}

function buildPayload(type: InputType, fields: Record<string, string>): string {
  switch (type) {
    case "url":
      return fields.url || "";
    case "text":
      return fields.text || "";
    case "email":
      return fields.email ? `mailto:${fields.email}` : "";
    case "phone":
      return fields.phone ? `tel:${fields.phone}` : "";
    case "wifi": {
      const ssid = fields.ssid || "";
      const password = fields.password || "";
      const security = fields.security || "WPA";
      return `WIFI:T:${security};S:${ssid};P:${password};;`;
    }
    default:
      return "";
  }
}

const ERROR_LEVELS: Record<ErrorLevel, number> = { L: 1, M: 0, Q: 3, H: 2 };

export function QrCodeGeneratorTool() {
  const { isDark } = useTheme();

  const [inputType, setInputType] = useState<InputType>("url");
  const [fields, setFields] = useState<Record<string, string>>({ url: "", text: "", email: "", phone: "", ssid: "", password: "", security: "WPA" });
  const [size, setSize] = useState<QRSize>(256);
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>("M");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [libReady, setLibReady] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<unknown>(null);

  // Load lib on mount
  useEffect(() => {
    loadQRLib().then(() => setLibReady(true));
  }, []);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (typeof data.inputType === "string") setInputType(data.inputType);
        if (typeof data.size === "number") setSize(data.size as QRSize);
        if (typeof data.errorLevel === "string") setErrorLevel(data.errorLevel);
        if (data.fields && typeof data.fields === "object") setFields((prev) => ({ ...prev, ...data.fields }));
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ inputType, size, errorLevel, fields }));
    } catch { /* ignore */ }
  }, [inputType, size, errorLevel, fields]);

  const updateField = useCallback((key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  }, []);

  const generateQR = useCallback(() => {
    if (!qrRef.current || !libReady) return;
    const payload = buildPayload(inputType, fields);
    if (!payload.trim()) return;

    // Clear previous
    qrRef.current.innerHTML = "";

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const QRCode = (window as any).QRCode;
      if (!QRCode) return;

      qrInstance.current = new QRCode(qrRef.current, {
        text: payload,
        width: size,
        height: size,
        correctLevel: ERROR_LEVELS[errorLevel],
        colorDark: "#000000",
        colorLight: "#ffffff",
      });
      setGenerated(true);
      setCopied(false);
    } catch {
      if (qrRef.current) qrRef.current.innerHTML = "<p class='text-red-400 text-sm'>Failed to generate QR code. Input may be too long.</p>";
    }
  }, [inputType, fields, size, errorLevel, libReady]);

  const downloadPNG = useCallback(() => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `qrcode-${size}px.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [size]);

  const copyImage = useCallback(async () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback: copy data URL as text
      navigator.clipboard.writeText(canvas.toDataURL("image/png"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  // Theme styles
  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const btnPrimary = isDark ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500" : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const selectBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100" : "bg-neutral-50 border-black/10 text-neutral-900";

  const payload = buildPayload(inputType, fields);
  const canGenerate = payload.trim().length > 0 && libReady;

  return (
    <div className="space-y-4">
      {/* Input type selector */}
      <div className="flex flex-wrap gap-2">
        {(["url", "text", "email", "phone", "wifi"] as InputType[]).map((t) => (
          <button
            key={t}
            onClick={() => setInputType(t)}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px] capitalize", inputType === t ? btnActive : btnBase)}
          >
            {t === "wifi" ? "WiFi" : t === "url" ? "URL" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Input fields */}
      <div className={cx("rounded-xl border p-4", base)}>
        {inputType === "url" && (
          <div>
            <label htmlFor="qr-url" className="text-sm font-semibold block mb-2">URL</label>
            <input
              id="qr-url"
              type="url"
              value={fields.url}
              onChange={(e) => updateField("url", e.target.value)}
              placeholder="https://example.com"
              className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            />
          </div>
        )}
        {inputType === "text" && (
          <div>
            <label htmlFor="qr-text" className="text-sm font-semibold block mb-2">Text</label>
            <textarea
              id="qr-text"
              value={fields.text}
              onChange={(e) => updateField("text", e.target.value)}
              placeholder="Enter any text..."
              rows={3}
              className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y", inputBase)}
            />
          </div>
        )}
        {inputType === "email" && (
          <div>
            <label htmlFor="qr-email" className="text-sm font-semibold block mb-2">Email Address</label>
            <input
              id="qr-email"
              type="email"
              value={fields.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="user@example.com"
              className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            />
          </div>
        )}
        {inputType === "phone" && (
          <div>
            <label htmlFor="qr-phone" className="text-sm font-semibold block mb-2">Phone Number</label>
            <input
              id="qr-phone"
              type="tel"
              value={fields.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            />
          </div>
        )}
        {inputType === "wifi" && (
          <div className="space-y-3">
            <div>
              <label htmlFor="qr-ssid" className="text-sm font-semibold block mb-2">Network Name (SSID)</label>
              <input
                id="qr-ssid"
                type="text"
                value={fields.ssid}
                onChange={(e) => updateField("ssid", e.target.value)}
                placeholder="MyWiFi"
                className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
              />
            </div>
            <div>
              <label htmlFor="qr-password" className="text-sm font-semibold block mb-2">Password</label>
              <input
                id="qr-password"
                type="text"
                value={fields.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="WiFi password"
                className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
              />
            </div>
            <div>
              <label htmlFor="qr-security" className="text-sm font-semibold block mb-2">Security</label>
              <select
                id="qr-security"
                value={fields.security}
                onChange={(e) => updateField("security", e.target.value)}
                className={cx("w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", selectBase)}
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None (Open)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="qr-size" className="text-sm font-semibold block mb-2">Size</label>
            <select
              id="qr-size"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value) as QRSize)}
              className={cx("w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", selectBase)}
            >
              <option value={128}>128 x 128</option>
              <option value={256}>256 x 256</option>
              <option value={512}>512 x 512</option>
            </select>
          </div>
          <div>
            <label htmlFor="qr-error" className="text-sm font-semibold block mb-2">Error Correction</label>
            <select
              id="qr-error"
              value={errorLevel}
              onChange={(e) => setErrorLevel(e.target.value as ErrorLevel)}
              className={cx("w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", selectBase)}
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </div>
          <div className="flex items-end col-span-2 sm:col-span-1">
            <button
              onClick={generateQR}
              disabled={!canGenerate}
              className={cx(
                "w-full rounded-lg border px-5 py-2 text-sm font-semibold transition-colors min-h-[44px]",
                canGenerate ? btnPrimary : "opacity-50 cursor-not-allowed bg-neutral-600 border-neutral-600 text-neutral-300"
              )}
            >
              {libReady ? "Generate QR Code" : "Loading..."}
            </button>
          </div>
        </div>
      </div>

      {/* QR Output */}
      <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">QR Code</h3>
          {generated && (
            <div className="flex gap-2">
              <button
                onClick={copyImage}
                className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", copied ? btnPrimary : btnBase)}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={downloadPNG}
                className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
              >
                Download PNG
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <div
            ref={qrRef}
            className={cx(
              "inline-flex items-center justify-center rounded-lg p-4",
              !generated && muted
            )}
            style={{ minHeight: generated ? undefined : 128 }}
          >
            {!generated && (
              <span className="text-sm">Enter content and click Generate</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
