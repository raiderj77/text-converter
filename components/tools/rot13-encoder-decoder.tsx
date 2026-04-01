"use client";

import { useCallback, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type CipherMode = "rot13" | "rot5" | "rot47" | "caesar";
type CaesarDirection = "encode" | "decode";

function rot13(text: string): string {
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

function rot5(text: string): string {
  return text.replace(/[0-9]/g, (c) => {
    return String.fromCharCode(((c.charCodeAt(0) - 48 + 5) % 10) + 48);
  });
}

function rot47(text: string): string {
  return text.replace(/[!-~]/g, (c) => {
    return String.fromCharCode(((c.charCodeAt(0) - 33 + 47) % 94) + 33);
  });
}

function caesarCipher(text: string, shift: number, direction: CaesarDirection): string {
  const effectiveShift = direction === "decode" ? 26 - (shift % 26) : shift % 26;
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + effectiveShift) % 26) + base);
  });
}

function applyCipher(text: string, mode: CipherMode, caesarShift: number, caesarDir: CaesarDirection): string {
  switch (mode) {
    case "rot13": return rot13(text);
    case "rot5": return rot5(text);
    case "rot47": return rot47(text);
    case "caesar": return caesarCipher(text, caesarShift, caesarDir);
  }
}

const MODE_LABELS: Record<CipherMode, string> = {
  rot13: "ROT13 (Letters)",
  rot5: "ROT5 (Numbers)",
  rot47: "ROT47 (All ASCII)",
  caesar: "Caesar Cipher",
};

export function Rot13EncoderDecoderTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<CipherMode>("rot13");
  const [caesarShift, setCaesarShift] = useState(3);
  const [caesarDir, setCaesarDir] = useState<CaesarDirection>("encode");
  const [copied, setCopied] = useState(false);

  const output = input ? applyCipher(input, mode, caesarShift, caesarDir) : "";

  const copyText = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  return (
    <div className="space-y-4">
      {/* Mode selection */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MODE_LABELS) as CipherMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", mode === m ? btnActive : btnBase)}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
        <button
          onClick={() => { setInput(""); setCopied(false); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Caesar cipher controls */}
      {mode === "caesar" && (
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="caesar-shift" className="text-sm font-semibold block mb-2">
                Rotation: {caesarShift}
              </label>
              <input
                id="caesar-shift"
                type="range"
                min={1}
                max={25}
                value={caesarShift}
                onChange={(e) => setCaesarShift(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between mt-1">
                <span className={cx("text-xs", muted)}>1</span>
                <span className={cx("text-xs", muted)}>25</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCaesarDir("encode")}
                className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", caesarDir === "encode" ? btnActive : btnBase)}
              >
                Encode
              </button>
              <button
                onClick={() => setCaesarDir("decode")}
                className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", caesarDir === "decode" ? btnActive : btnBase)}
              >
                Decode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="cipher-input" className="text-sm font-semibold block mb-2">
          Input Text
        </label>
        <textarea
          id="cipher-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to encode/decode..."
          rows={5}
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y min-h-[44px]",
            inputBase
          )}
          spellCheck={false}
        />
        <span className={cx("text-xs mt-1 block", muted)}>
          {input.length} character{input.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">
              {mode === "caesar"
                ? `Caesar Cipher (shift ${caesarShift}, ${caesarDir})`
                : MODE_LABELS[mode]} Output
            </h3>
            <button
              onClick={() => copyText(output)}
              className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px] min-w-[44px]", btnBase)}
              aria-label="Copy output"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className={cx(
            "rounded-lg border p-3 font-mono text-sm break-all leading-relaxed whitespace-pre-wrap select-all",
            isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50"
          )}>
            {output}
          </div>
        </div>
      )}

      {/* Quick info */}
      <div className={cx("text-xs text-center", muted)}>
        {mode === "rot13" && "ROT13 shifts each letter by 13 positions. Apply twice to get the original text."}
        {mode === "rot5" && "ROT5 shifts each digit by 5 positions. Apply twice to get the original number."}
        {mode === "rot47" && "ROT47 shifts all printable ASCII characters (! through ~) by 47 positions."}
        {mode === "caesar" && `Shifting letters by ${caesarShift} position${caesarShift !== 1 ? "s" : ""}. ${caesarDir === "encode" ? "Encoding" : "Decoding"} mode.`}
      </div>
    </div>
  );
}
