"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "@/lib/utils";
import { toInverseCase, toSpongeBobCase } from "@/lib/conversions";
import { useTheme } from "@/components/layout/theme-provider";

export function ToggleCaseConverterTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [startWithUpper, setStartWithUpper] = useState(false);
  const [includeSpaces, setIncludeSpaces] = useState(true);

  // Load saved text on mount
  useEffect(() => {
    const saved = localStorage.getItem("fmc_toggle_text");
    if (saved) setText(saved);
  }, []);

  // Persist text changes
  useEffect(() => {
    localStorage.setItem("fmc_toggle_text", text);
  }, [text]);

  // Ctrl/Cmd+K focuses input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggleCase = useMemo(() => {
    if (!text.trim()) return "";

    let result = "";
    let flip = startWithUpper;

    for (const ch of text) {
      if (/[a-z]/i.test(ch)) {
        result += flip ? ch.toUpperCase() : ch.toLowerCase();
        flip = !flip;
      } else {
        result += ch;
        // Reset flip on spaces if includeSpaces is false
        if (!includeSpaces && /\s/.test(ch)) {
          flip = startWithUpper;
        }
      }
    }
    return result;
  }, [text, startWithUpper, includeSpaces]);

  const inverseCase = useMemo(() => toInverseCase(text), [text]);
  const spongebobCase = useMemo(() => toSpongeBobCase(text), [text]);

  const copyToClipboard = async (content: string, label: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setToast(`Copied ${label} to clipboard`);
      setTimeout(() => setToast(""), 2000);
    } catch {
      setToast("Failed to copy");
      setTimeout(() => setToast(""), 2000);
    }
  };

  const clearText = () => {
    setText("");
    inputRef.current?.focus();
  };

  const loadExample = () => {
    setText("Hello World! This is an example of toggle case text.");
    setStartWithUpper(false);
    setIncludeSpaces(true);
  };

  const conversions = [
    {
      id: "toggle",
      label: "Toggle Case",
      value: toggleCase,
      description: "Alternating uppercase and lowercase letters",
      emoji: "🔄",
    },
    {
      id: "inverse",
      label: "Inverse Case",
      value: inverseCase,
      description: "Swap uppercase to lowercase and vice versa",
      emoji: "↕️",
    },
    {
      id: "spongebob",
      label: "sPoNgEbOb Case",
      value: spongebobCase,
      description: "Mocking SpongeBob meme text (pseudo-random alternation)",
      emoji: "🧽",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      {/* Input section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="input" className="text-sm font-medium">
            Input Text
          </label>
          <div className="flex gap-2">
            <button
              onClick={loadExample}
              className="rounded-lg border border-white/10 px-3 py-1 text-xs hover:bg-white/5 transition-colors"
            >
              Load Example
            </button>
            <button
              onClick={clearText}
              className="rounded-lg border border-white/10 px-3 py-1 text-xs hover:bg-white/5 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          ref={inputRef}
          id="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className={cx(
            "min-h-[120px] w-full resize-y rounded-xl border border-white/10 bg-neutral-900 p-4 font-mono text-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
            isDark ? "text-white" : "text-black"
          )}
          autoFocus
        />
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>{text.length} characters</span>
          <span>{text.trim().split(/\s+/).filter(Boolean).length} words</span>
        </div>
      </div>

      {/* Options */}
      <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
        <h3 className="text-sm font-semibold">Toggle Case Options</h3>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={startWithUpper}
              onChange={(e) => setStartWithUpper(e.target.checked)}
              className="h-4 w-4 rounded border-white/10 bg-neutral-800 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm">Start with uppercase</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSpaces}
              onChange={(e) => setIncludeSpaces(e.target.checked)}
              className="h-4 w-4 rounded border-white/10 bg-neutral-800 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm">Continue sequence through spaces</span>
          </label>
        </div>
        <p className="mt-2 text-xs text-neutral-400">
          When &quot;Continue sequence through spaces&quot; is enabled, the alternating pattern continues
          across spaces (e.g., &quot;hElLo wOrLd&quot;). When disabled, each word starts fresh (e.g., &quot;hElLo WoRlD&quot;).
        </p>
      </div>

      {/* Output cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conversions.map((conv) => (
          <div
            key={conv.id}
            className="rounded-2xl border border-white/10 bg-neutral-900 p-4 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{conv.emoji}</span>
                <h3 className="text-sm font-semibold">{conv.label}</h3>
              </div>
              <button
                onClick={() => copyToClipboard(conv.value, conv.label)}
                disabled={!conv.value}
                className="rounded-lg border border-white/10 px-3 py-1 text-xs hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Copy
              </button>
            </div>
            <p className="mt-2 text-xs text-neutral-400">{conv.description}</p>
            <div className="mt-4 flex-1">
              <div
                className={cx(
                  "min-h-[80px] w-full rounded-lg border border-white/5 bg-neutral-950 p-3 font-mono text-sm overflow-auto",
                  isDark ? "text-white" : "text-black"
                )}
              >
                {conv.value || (
                  <span className="text-neutral-500">Converted text will appear here...</span>
                )}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
              <span>{conv.value.length} characters</span>
              {conv.id === "toggle" && (
                <button
                  onClick={() => {
                    setText(conv.value);
                    inputRef.current?.focus();
                  }}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Apply to Input
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick examples */}
      <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
        <h3 className="text-sm font-semibold">Quick Examples</h3>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { input: "hello world", toggle: "hElLo wOrLd", desc: "Basic toggle case" },
            { input: "Mocking SpongeBob", toggle: "mOcKiNg sPoNgEbOb", desc: "SpongeBob meme text" },
            { input: "ALTERNATING TEXT", toggle: "aLtErNaTiNg tExT", desc: "From uppercase" },
            { input: "code variable names", toggle: "cOdE vArIaBlE nAmEs", desc: "Programming example" },
          ].map((ex, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/5 bg-neutral-950 p-3 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => {
                setText(ex.input);
                setStartWithUpper(false);
                setIncludeSpaces(true);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setText(ex.input)}
            >
              <div className="text-xs text-neutral-400">{ex.desc}</div>
              <div className="mt-1 font-mono text-sm">{ex.toggle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
