"use client";

import { useState, useCallback, useEffect } from "react";

const PRESETS = [
  { label: "URL Slug", separator: "-", lowercase: true, maxLength: 80 },
  { label: "File Name", separator: "_", lowercase: true, maxLength: 255 },
  { label: "CSS Class", separator: "-", lowercase: true, maxLength: 100 },
  { label: "Python Variable", separator: "_", lowercase: true, maxLength: 100 },
  { label: "Constant", separator: "_", lowercase: false, maxLength: 100, uppercase: true },
];

function generateSlug(text, options = {}) {
  const { separator = "-", lowercase = true, uppercase = false, maxLength = 80 } = options;
  
  let slug = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, separator)
    .replace(new RegExp(`^${separator === "-" ? "\\-" : separator}+|${separator === "-" ? "\\-" : separator}+$`, "g"), "");

  if (uppercase) slug = slug.toUpperCase();
  else if (lowercase) slug = slug.toLowerCase();

  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    const lastSep = slug.lastIndexOf(separator);
    if (lastSep > maxLength * 0.6) slug = slug.substring(0, lastSep);
  }

  return slug;
}

function getTextStats(text) {
  if (!text.trim()) return { chars: 0, charsNoSpace: 0, words: 0, sentences: 0, paragraphs: 0, readingTime: "0 sec" };
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
  const minutes = Math.floor(words / 238);
  const seconds = Math.round(((words % 238) / 238) * 60);
  const readingTime = minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;
  return { chars, charsNoSpace, words, sentences, paragraphs, readingTime };
}

function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button
      onClick={handleCopy}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
        copied
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
          : text
          ? "bg-slate-800 text-emerald-400 hover:bg-slate-700 border border-slate-600 hover:border-emerald-500/50"
          : "bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-700"
      }`}
      disabled={!text}
    >
      {copied ? "✓ Copied!" : label}
    </button>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 text-center">
      <div className="text-2xl font-bold text-emerald-400 font-mono">{value}</div>
      <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const [activePreset, setActivePreset] = useState(0);
  const [customSeparator, setCustomSeparator] = useState("-");
  const [customMaxLen, setCustomMaxLen] = useState(80);
  const [showCustom, setShowCustom] = useState(false);

  const preset = PRESETS[activePreset];
  const options = showCustom
    ? { separator: customSeparator, lowercase: true, maxLength: customMaxLen }
    : preset;

  const slug = generateSlug(input, options);
  const stats = getTextStats(input);

  const sampleTexts = [
    "How to Build a Programmatic SEO Strategy in 2026",
    "10 Best Crochet Patterns for Beginners — Easy & Free!",
    "¿Cómo cancelar tu suscripción de Netflix? (Guía Completa)",
    "The Developer's Guide to URL Slugs & SEO-Friendly URLs",
  ];

  const [sampleIndex, setSampleIndex] = useState(0);
  const trySample = () => {
    setInput(sampleTexts[sampleIndex % sampleTexts.length]);
    setSampleIndex(sampleIndex + 1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #0b1120 0%, #0f172a 40%, #0b1628 100%)",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .heading-font { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        .mono-font { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
        textarea:focus, input:focus, button:focus { outline: none; }
        .glow-border:focus-within { box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.3), 0 0 20px rgba(52, 211, 153, 0.1); }
        .slug-output { word-break: break-all; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease-out; }
        .preset-btn { transition: all 0.15s ease; }
        .preset-btn:hover { transform: translateY(-1px); }
        .preset-btn.active { transform: translateY(0); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1e293b; border-radius: 3px; }
        ::-webkit-scrollbar-thumb { background: #475569; border-radius: 3px; }
      `}</style>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px 60px" }}>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase heading-font">Free Tool</span>
          </div>
          <h1 className="heading-font text-4xl font-extrabold text-white mb-3" style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            URL Slug Generator
          </h1>
          <p className="heading-font text-slate-400 text-base max-w-lg mx-auto leading-relaxed">
            Transform any text into clean, SEO-friendly URL slugs. Handles accents, special characters, and multiple formats.
          </p>
        </div>

        {/* Input Area */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="heading-font text-sm font-semibold text-slate-300">Your Text</label>
            <button
              onClick={trySample}
              className="heading-font text-xs text-emerald-400/70 hover:text-emerald-400 transition-colors"
            >
              Try a sample →
            </button>
          </div>
          <div className="rounded-xl border border-slate-700/80 bg-slate-900/80 glow-border transition-all duration-200">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or paste your title, heading, or any text..."
              rows={3}
              className="w-full bg-transparent text-white placeholder-slate-600 p-4 rounded-xl resize-none text-base mono-font"
              style={{ lineHeight: 1.6 }}
            />
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <label className="heading-font text-sm font-semibold text-slate-300">Format</label>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => { setActivePreset(i); setShowCustom(false); }}
                className={`preset-btn heading-font text-xs font-semibold px-4 py-2 rounded-lg border transition-all ${
                  !showCustom && activePreset === i
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 active"
                    : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                }`}
              >
                {p.label}
              </button>
            ))}
            <button
              onClick={() => setShowCustom(!showCustom)}
              className={`preset-btn heading-font text-xs font-semibold px-4 py-2 rounded-lg border transition-all ${
                showCustom
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 active"
                  : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              Custom
            </button>
          </div>

          {showCustom && (
            <div className="flex gap-4 mt-3 fade-in">
              <div>
                <label className="heading-font text-xs text-slate-500 mb-1 block">Separator</label>
                <input
                  value={customSeparator}
                  onChange={(e) => setCustomSeparator(e.target.value.slice(0, 1))}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-center w-16 mono-font"
                  maxLength={1}
                />
              </div>
              <div>
                <label className="heading-font text-xs text-slate-500 mb-1 block">Max Length</label>
                <input
                  type="number"
                  value={customMaxLen}
                  onChange={(e) => setCustomMaxLen(Number(e.target.value) || 80)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white w-20 mono-font"
                  min={10}
                  max={500}
                />
              </div>
            </div>
          )}
        </div>

        {/* Output Area */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="heading-font text-sm font-semibold text-slate-300">
              {showCustom ? "Custom Output" : preset.label}
            </label>
            <CopyButton text={slug} />
          </div>
          <div
            className="rounded-xl border border-slate-700/80 bg-slate-900/80 p-4 min-h-16 flex items-center"
            style={{ minHeight: 64 }}
          >
            {slug ? (
              <span className="slug-output text-emerald-400 text-base mono-font font-medium break-all">
                {slug}
              </span>
            ) : (
              <span className="text-slate-600 text-sm mono-font">Your slug will appear here...</span>
            )}
          </div>
          {slug && (
            <div className="flex items-center gap-4 mt-2 fade-in">
              <span className="text-xs text-slate-500 mono-font">{slug.length} chars</span>
              {slug.length > 60 && (
                <span className="text-xs text-amber-400/80 mono-font">⚠ Consider shorter for SEO (60 chars ideal)</span>
              )}
              {slug.length <= 60 && (
                <span className="text-xs text-emerald-500/80 mono-font">✓ Great length for SEO</span>
              )}
            </div>
          )}
        </div>

        {/* URL Preview */}
        {slug && (
          <div className="mb-8 fade-in">
            <label className="heading-font text-sm font-semibold text-slate-300 mb-2 block">URL Preview</label>
            <div className="rounded-xl border border-slate-700/80 bg-slate-900/80 p-4 flex items-center gap-0 overflow-x-auto">
              <span className="text-slate-500 text-sm mono-font whitespace-nowrap">https://yoursite.com/</span>
              <span className="text-emerald-400 text-sm mono-font font-medium">{slug}</span>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-slate-800 my-8" />

        {/* Text Stats */}
        <div>
          <h2 className="heading-font text-lg font-bold text-white mb-4">Text Statistics</h2>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <StatBox label="Words" value={stats.words} />
            <StatBox label="Characters" value={stats.chars} />
            <StatBox label="No Spaces" value={stats.charsNoSpace} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <StatBox label="Sentences" value={stats.sentences} />
            <StatBox label="Paragraphs" value={stats.paragraphs} />
            <StatBox label="Read Time" value={stats.readingTime} />
          </div>
        </div>

        {/* SEO Tips */}
        {input && (
          <div className="mt-8 fade-in">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-5">
              <h3 className="heading-font text-sm font-bold text-slate-300 mb-3">💡 SEO Slug Tips</h3>
              <ul className="space-y-2">
                <li className="heading-font text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  Keep slugs under 60 characters for best search engine results
                </li>
                <li className="heading-font text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  Remove stop words (the, a, an, is, for) to keep it concise
                </li>
                <li className="heading-font text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  Include your target keyword in the slug when possible
                </li>
                <li className="heading-font text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  Use hyphens, not underscores — Google treats hyphens as word separators
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="heading-font text-xs text-slate-600">
            Built with ♠ by FlipMyCase.com — Free text tools for developers, writers & SEO pros
          </p>
        </div>
      </div>
    </div>
  );
}
