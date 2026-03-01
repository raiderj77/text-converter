"use client";

import { useState } from "react";

const PRESETS = [
  { label: "URL Slug", separator: "-", lowercase: true, maxLength: 80 },
  { label: "File Name", separator: "_", lowercase: true, maxLength: 255 },
  { label: "CSS Class", separator: "-", lowercase: true, maxLength: 100 },
  { label: "Python Variable", separator: "_", lowercase: true, maxLength: 100 },
  { label: "Constant", separator: "_", lowercase: false, maxLength: 100, uppercase: true },
];

function generateSlug(text: string, options: any = {}) {
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

function getTextStats(text: string) {
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

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
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
        copied ? "bg-emerald-500 text-white" : text ? "bg-slate-800 text-emerald-400 hover:bg-slate-700 border border-slate-600" : "bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-700"
      }`}
      disabled={!text}
    >
      {copied ? "✓ Copied!" : label}
    </button>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 text-center">
      <div className="text-2xl font-bold text-emerald-400 font-mono">{value}</div>
      <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export function SlugGeneratorTool() {
  const [input, setInput] = useState("");
  const [activePreset, setActivePreset] = useState(0);
  const [customSeparator, setCustomSeparator] = useState("-");
  const [customMaxLen, setCustomMaxLen] = useState(80);
  const [showCustom, setShowCustom] = useState(false);
  const [sampleIndex, setSampleIndex] = useState(0);

  const preset = PRESETS[activePreset];
  const options = showCustom ? { separator: customSeparator, lowercase: true, maxLength: customMaxLen } : preset;
  const slug = generateSlug(input, options);
  const stats = getTextStats(input);

  const sampleTexts = [
    "How to Build a Programmatic SEO Strategy in 2026",
    "10 Best Crochet Patterns for Beginners — Easy & Free!",
    "The Developer's Guide to URL Slugs & SEO-Friendly URLs",
  ];

  return (
    <div style={{ background: "linear-gradient(145deg, #0b1120 0%, #0f172a 40%, #0b1628 100%)", borderRadius: "1rem" }}>
      <div style={{ padding: "32px 24px 40px" }}>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-slate-300">Your Text</label>
            <button onClick={() => { setInput(sampleTexts[sampleIndex % sampleTexts.length]); setSampleIndex(sampleIndex + 1); }} className="text-xs text-emerald-400/70 hover:text-emerald-400 transition-colors">Try a sample →</button>
          </div>
          <div className="rounded-xl border border-slate-700/80 bg-slate-900/80">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste your title, heading, or any text..." rows={3} className="w-full bg-transparent text-white placeholder-slate-600 p-4 rounded-xl resize-none text-base" style={{ lineHeight: 1.6, outline: "none", fontFamily: "monospace" }} />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold text-slate-300 block mb-2">Format</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button key={p.label} onClick={() => { setActivePreset(i); setShowCustom(false); }} className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-all ${!showCustom && activePreset === i ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400" : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-300"}`}>{p.label}</button>
            ))}
            <button onClick={() => setShowCustom(!showCustom)} className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-all ${showCustom ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400" : "bg-slate-800/60 border-slate-700/60 text-slate-400"}`}>Custom</button>
          </div>
          {showCustom && (
            <div className="flex gap-4 mt-3">
              <div><label className="text-xs text-slate-500 mb-1 block">Separator</label><input value={customSeparator} onChange={(e) => setCustomSeparator(e.target.value.slice(0, 1))} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-center w-16" style={{ outline: "none" }} maxLength={1} /></div>
              <div><label className="text-xs text-slate-500 mb-1 block">Max Length</label><input type="number" value={customMaxLen} onChange={(e) => setCustomMaxLen(Number(e.target.value) || 80)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white w-20" style={{ outline: "none" }} min={10} max={500} /></div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-slate-300">{showCustom ? "Custom Output" : preset.label}</label>
            <CopyButton text={slug} />
          </div>
          <div className="rounded-xl border border-slate-700/80 bg-slate-900/80 p-4 flex items-center" style={{ minHeight: 64 }}>
            {slug ? <span className="text-emerald-400 text-base font-medium break-all" style={{ fontFamily: "monospace" }}>{slug}</span> : <span className="text-slate-600 text-sm">Your slug will appear here...</span>}
          </div>
          {slug && <div className="flex items-center gap-4 mt-2"><span className="text-xs text-slate-500">{slug.length} chars</span>{slug.length > 60 ? <span className="text-xs text-amber-400/80">⚠ Consider shorter for SEO</span> : <span className="text-xs text-emerald-500/80">✓ Great length for SEO</span>}</div>}
        </div>

        {slug && (
          <div className="mb-8">
            <label className="text-sm font-semibold text-slate-300 mb-2 block">URL Preview</label>
            <div className="rounded-xl border border-slate-700/80 bg-slate-900/80 p-4 flex items-center overflow-x-auto">
              <span className="text-slate-500 text-sm whitespace-nowrap" style={{ fontFamily: "monospace" }}>https://yoursite.com/</span>
              <span className="text-emerald-400 text-sm font-medium" style={{ fontFamily: "monospace" }}>{slug}</span>
            </div>
          </div>
        )}

        <div className="border-t border-slate-800 my-8" />
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Text Statistics</h2>
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
      </div>
    </div>
  );
}
