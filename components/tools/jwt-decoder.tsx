"use client";

import { useCallback, useEffect, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  headerRaw: string;
  payloadRaw: string;
  signatureRaw: string;
}

function base64UrlDecode(str: string): string {
  // Replace base64url characters with base64 equivalents
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // Pad with = if needed
  const pad = base64.length % 4;
  if (pad) base64 += "=".repeat(4 - pad);
  return atob(base64);
}

function decodeJwt(token: string): DecodedJwt | null {
  try {
    const parts = token.trim().split(".");
    if (parts.length !== 3) return null;

    const headerRaw = base64UrlDecode(parts[0]);
    const payloadRaw = base64UrlDecode(parts[1]);

    const header = JSON.parse(headerRaw);
    const payload = JSON.parse(payloadRaw);

    return {
      header,
      payload,
      headerRaw: JSON.stringify(header, null, 2),
      payloadRaw: JSON.stringify(payload, null, 2),
      signatureRaw: parts[2],
    };
  } catch {
    return null;
  }
}

function formatTimestamp(ts: number): string {
  // JWT timestamps are in seconds
  const date = new Date(ts * 1000);
  return date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
}

function getExpirationStatus(exp: number): { label: string; color: "green" | "red" | "yellow" } {
  const now = Math.floor(Date.now() / 1000);
  const diff = exp - now;

  if (diff < 0) {
    const ago = Math.abs(diff);
    if (ago < 60) return { label: `EXPIRED ${ago}s ago`, color: "red" };
    if (ago < 3600) return { label: `EXPIRED ${Math.floor(ago / 60)}m ago`, color: "red" };
    if (ago < 86400) return { label: `EXPIRED ${Math.floor(ago / 3600)}h ago`, color: "red" };
    return { label: `EXPIRED ${Math.floor(ago / 86400)}d ago`, color: "red" };
  }

  if (diff < 3600) {
    if (diff < 60) return { label: `Expires in ${diff}s`, color: "yellow" };
    return { label: `Expires in ${Math.floor(diff / 60)}m`, color: "yellow" };
  }

  if (diff < 86400) return { label: `Expires in ${Math.floor(diff / 3600)}h`, color: "green" };
  return { label: `Expires in ${Math.floor(diff / 86400)}d`, color: "green" };
}

export function JwtDecoderTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const handleDecode = useCallback((value: string) => {
    setInput(value);
    if (!value.trim()) {
      setDecoded(null);
      setError("");
      return;
    }
    const result = decodeJwt(value);
    if (result) {
      setDecoded(result);
      setError("");
    } else {
      setDecoded(null);
      setError("Invalid JWT. A JWT must have three Base64URL-encoded parts separated by dots.");
    }
  }, []);

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("fmc_jwt_input");
    if (saved) handleDecode(saved);
  }, [handleDecode]);

  useEffect(() => {
    localStorage.setItem("fmc_jwt_input", input);
  }, [input]);

  // Refresh expiration status every 30s
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(timer);
  }, []);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnPrimary = isDark ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500" : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const accent = isDark ? "text-emerald-400" : "text-emerald-600";

  const alg = decoded?.header?.alg as string | undefined;
  const typ = decoded?.header?.typ as string | undefined;
  const iat = decoded?.payload?.iat as number | undefined;
  const exp = decoded?.payload?.exp as number | undefined;
  const nbf = decoded?.payload?.nbf as number | undefined;

  const expStatus = exp ? getExpirationStatus(exp) : null;

  const statusColors = {
    green: isDark ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" : "text-emerald-700 bg-emerald-500/10 border-emerald-500/30",
    red: isDark ? "text-red-400 bg-red-500/10 border-red-500/30" : "text-red-700 bg-red-500/10 border-red-500/30",
    yellow: isDark ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/30" : "text-yellow-700 bg-yellow-500/10 border-yellow-500/30",
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="jwt-input" className="text-sm font-semibold block mb-2">
          Paste JWT Token
        </label>
        <textarea
          id="jwt-input"
          value={input}
          onChange={(e) => handleDecode(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          rows={4}
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
            inputBase
          )}
        />
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleDecode("")}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className={cx("rounded-xl border p-4 text-sm", statusColors.red)} aria-live="polite">
          {error}
        </div>
      )}

      {/* Disclaimer */}
      <div className={cx("rounded-xl border p-3 text-xs", isDark ? "border-yellow-500/30 bg-yellow-500/5 text-yellow-300" : "border-yellow-500/30 bg-yellow-50 text-yellow-800")}>
        This tool decodes only. It does not verify the signature.
      </div>

      {/* Decoded Output */}
      {decoded && (
        <div className="space-y-4" aria-live="polite">
          {/* Token Summary */}
          <div className={cx("rounded-xl border p-4", base)}>
            <h3 className="text-sm font-semibold mb-3">Token Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {alg && (
                <div>
                  <span className={cx("text-xs block", muted)}>Algorithm</span>
                  <span className={cx("text-sm font-mono font-semibold", accent)}>{alg}</span>
                </div>
              )}
              {typ && (
                <div>
                  <span className={cx("text-xs block", muted)}>Type</span>
                  <span className="text-sm font-mono font-semibold">{typ}</span>
                </div>
              )}
              {iat !== undefined && (
                <div>
                  <span className={cx("text-xs block", muted)}>Issued At (iat)</span>
                  <span className="text-sm font-mono">{formatTimestamp(iat)}</span>
                </div>
              )}
              {nbf !== undefined && (
                <div>
                  <span className={cx("text-xs block", muted)}>Not Before (nbf)</span>
                  <span className="text-sm font-mono">{formatTimestamp(nbf)}</span>
                </div>
              )}
              {exp !== undefined && expStatus && (
                <div className="sm:col-span-2">
                  <span className={cx("text-xs block", muted)}>Expiration (exp)</span>
                  <span className="text-sm font-mono">{formatTimestamp(exp)}</span>
                  <span className={cx("ml-2 inline-block rounded-md border px-2 py-0.5 text-xs font-semibold", statusColors[expStatus.color])}>
                    {expStatus.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Header */}
          <div className={cx("rounded-xl border p-4", base)}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Header</h3>
              <button
                onClick={() => copyText(decoded.headerRaw, "header")}
                className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
              >
                {copied === "header" ? "Copied!" : "Copy Header"}
              </button>
            </div>
            <output aria-live="polite" className={cx("block rounded-lg border p-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all", isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10")}>
              {decoded.headerRaw}
            </output>
          </div>

          {/* Payload */}
          <div className={cx("rounded-xl border p-4", base)}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Payload</h3>
              <button
                onClick={() => copyText(decoded.payloadRaw, "payload")}
                className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
              >
                {copied === "payload" ? "Copied!" : "Copy Payload"}
              </button>
            </div>
            <output aria-live="polite" className={cx("block rounded-lg border p-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all", isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10")}>
              {decoded.payloadRaw}
            </output>
          </div>

          {/* Copy Full Decoded */}
          <div className="flex justify-center">
            <button
              onClick={() => copyText(`// Header\n${decoded.headerRaw}\n\n// Payload\n${decoded.payloadRaw}`, "full")}
              className={cx("rounded-lg border px-5 py-2 text-sm font-semibold transition-colors min-h-[44px]", btnPrimary)}
            >
              {copied === "full" ? "Copied!" : "Copy Full Decoded"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
