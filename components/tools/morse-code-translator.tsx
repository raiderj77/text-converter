"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type Direction = "text-to-morse" | "morse-to-text";

const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.",
  "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
  "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-",
  "+": ".-.-.", "-": "-....-", "_": "..--.-", '"': ".-..-.",
  "$": "...-..-", "@": ".--.-.",
};

const REVERSE_MORSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((ch) => {
      if (ch === " ") return "/";
      return MORSE_MAP[ch] ?? "";
    })
    .filter(Boolean)
    .join(" ");
}

function morseToText(morse: string): string {
  return morse
    .trim()
    .split(/\s*\/\s*/)
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((code) => REVERSE_MORSE[code] ?? "?")
        .join("")
    )
    .join(" ");
}

const REFERENCE_CHARS = [
  ...Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
  ...Array.from("0123456789"),
];

export function MorseCodeTranslatorTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<Direction>("text-to-morse");
  const [wpm, setWpm] = useState(15);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef(false);

  // localStorage persistence
  useEffect(() => {
    const saved = localStorage.getItem("fmc_morse_input");
    if (saved) setInput(saved);
    const savedDir = localStorage.getItem("fmc_morse_direction");
    if (savedDir === "text-to-morse" || savedDir === "morse-to-text") setDirection(savedDir);
  }, []);

  useEffect(() => {
    localStorage.setItem("fmc_morse_input", input);
  }, [input]);

  useEffect(() => {
    localStorage.setItem("fmc_morse_direction", direction);
  }, [direction]);

  const output =
    direction === "text-to-morse"
      ? textToMorse(input)
      : morseToText(input);

  const morseForAudio = direction === "text-to-morse" ? output : input;

  const copyOutput = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const playAudio = useCallback(async () => {
    if (isPlaying || !morseForAudio.trim()) return;

    stopRef.current = false;
    setIsPlaying(true);

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;

    const ditDuration = 1.2 / wpm; // PARIS standard
    const dahDuration = ditDuration * 3;
    const symbolGap = ditDuration;
    const letterGap = ditDuration * 3;
    const wordGap = ditDuration * 7;

    const beep = (duration: number, startTime: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 600;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    let time = ctx.currentTime + 0.05;
    const tokens = morseForAudio.split(" ");

    for (let i = 0; i < tokens.length; i++) {
      if (stopRef.current) break;
      const token = tokens[i];
      if (token === "/") {
        time += wordGap;
        continue;
      }
      for (let j = 0; j < token.length; j++) {
        if (stopRef.current) break;
        const ch = token[j];
        if (ch === ".") {
          beep(ditDuration, time);
          time += ditDuration + symbolGap;
        } else if (ch === "-") {
          beep(dahDuration, time);
          time += dahDuration + symbolGap;
        }
      }
      time += letterGap - symbolGap;
    }

    const totalMs = (time - ctx.currentTime) * 1000;
    await new Promise((resolve) => setTimeout(resolve, totalMs));
    setIsPlaying(false);
  }, [morseForAudio, wpm, isPlaying]);

  const stopAudio = useCallback(() => {
    stopRef.current = true;
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const base = isDark
    ? "bg-neutral-900 border-white/10 text-neutral-100"
    : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark
    ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600"
    : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark
    ? "bg-white/10 hover:bg-white/15 border-white/10"
    : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark
    ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
    : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const accent = isDark ? "text-emerald-400" : "text-emerald-600";

  return (
    <div className="space-y-4">
      {/* Direction tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setDirection("text-to-morse"); setInput(""); }}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            direction === "text-to-morse" ? btnActive : btnBase
          )}
        >
          Text to Morse
        </button>
        <button
          onClick={() => { setDirection("morse-to-text"); setInput(""); }}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            direction === "morse-to-text" ? btnActive : btnBase
          )}
        >
          Morse to Text
        </button>
        <button
          onClick={() => { setInput(""); setCopied(false); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="morse-input" className="text-sm font-semibold block mb-2">
          {direction === "text-to-morse" ? "Enter Text" : "Enter Morse Code"}
        </label>
        <textarea
          id="morse-input"
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            direction === "text-to-morse"
              ? "e.g. Hello World"
              : "e.g. .... . .-.. .-.. --- / .-- --- .-. .-.. -.."
          }
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px] resize-y",
            inputBase
          )}
          spellCheck={false}
          autoComplete="off"
        />
        <div className={cx("mt-1 text-xs", muted)}>
          {direction === "morse-to-text"
            ? "Use spaces between letters, / between words"
            : `${input.length} character${input.length !== 1 ? "s" : ""}`}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">
              {direction === "text-to-morse" ? "Morse Code Output" : "Text Output"}
            </h3>
            <button
              onClick={copyOutput}
              className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px] min-w-[44px]", btnBase)}
              aria-label="Copy output"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {direction === "text-to-morse" ? (
            <div className="font-mono text-lg leading-relaxed select-all break-all" aria-label="Morse code output">
              {output.split("").map((ch, i) => {
                if (ch === ".") {
                  return (
                    <span
                      key={i}
                      className={cx("inline-block w-2 h-2 rounded-full mx-0.5 align-middle", isDark ? "bg-emerald-400" : "bg-emerald-600")}
                      aria-label="dit"
                    />
                  );
                }
                if (ch === "-") {
                  return (
                    <span
                      key={i}
                      className={cx("inline-block w-5 h-2 rounded-full mx-0.5 align-middle", isDark ? "bg-emerald-400" : "bg-emerald-600")}
                      aria-label="dah"
                    />
                  );
                }
                if (ch === "/") {
                  return (
                    <span key={i} className="inline-block w-4" aria-label="word separator" />
                  );
                }
                if (ch === " ") {
                  return (
                    <span key={i} className="inline-block w-2" aria-label="letter separator" />
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <div className="font-mono text-lg leading-relaxed select-all break-all">
              {output}
            </div>
          )}

          {/* Text representation below visual */}
          {direction === "text-to-morse" && (
            <div className={cx("mt-2 text-sm font-mono break-all select-all", muted)}>
              {output}
            </div>
          )}
        </div>
      )}

      {/* Audio controls */}
      <div className={cx("rounded-xl border p-4", base)}>
        <h3 className="text-sm font-semibold mb-3">Audio Playback</h3>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={isPlaying ? stopAudio : playAudio}
            disabled={!morseForAudio.trim()}
            className={cx(
              "rounded-lg border px-4 py-1.5 text-xs font-semibold transition-colors min-h-[44px]",
              isPlaying ? "bg-red-500/20 border-red-400/40 text-red-300" : btnActive,
              !morseForAudio.trim() && "opacity-50 cursor-not-allowed"
            )}
          >
            {isPlaying ? "Stop" : "Play"}
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <label htmlFor="wpm-slider" className={cx("text-xs whitespace-nowrap", muted)}>
              Speed:
            </label>
            <input
              id="wpm-slider"
              type="range"
              min={5}
              max={30}
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              className="flex-1 accent-emerald-500"
              aria-label="Words per minute"
            />
            <span className={cx("text-xs font-mono w-14 text-right", accent)}>
              {wpm} WPM
            </span>
          </div>
        </div>
      </div>

      {/* Reference chart */}
      <details className={cx("rounded-xl border p-4", base)}>
        <summary className="text-sm font-semibold cursor-pointer select-none">
          Morse Code Reference Chart
        </summary>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {REFERENCE_CHARS.map((ch) => (
            <div
              key={ch}
              className={cx(
                "rounded-lg border p-2 text-center",
                isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50"
              )}
            >
              <div className="text-sm font-bold">{ch}</div>
              <div className={cx("text-xs font-mono mt-1", muted)}>
                {MORSE_MAP[ch]}
              </div>
              <div className="mt-1 flex items-center justify-center gap-0.5">
                {MORSE_MAP[ch].split("").map((s, i) =>
                  s === "." ? (
                    <span
                      key={i}
                      className={cx("inline-block w-1.5 h-1.5 rounded-full", isDark ? "bg-emerald-400" : "bg-emerald-600")}
                    />
                  ) : (
                    <span
                      key={i}
                      className={cx("inline-block w-4 h-1.5 rounded-full", isDark ? "bg-emerald-400" : "bg-emerald-600")}
                    />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </details>

      <div className={cx("text-xs text-center", muted)}>
        Use dots (.) for dit, dashes (-) for dah, spaces between letters, and / between words.
      </div>
    </div>
  );
}
