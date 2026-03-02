"use client";

import { useState, useEffect } from "react";
import { toSpongeBobCase, toToggleCase, toRandomCase } from "@/lib/conversions";
import { useTheme } from "@/components/layout/theme-provider";

type CaseMode = "spongebob" | "toggle" | "random";

export function SpongeBobCaseConverterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<CaseMode>("spongebob");

  // Conversion functions
  const convertText = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let result = input;
    
    switch (mode) {
      case "spongebob":
        result = toSpongeBobCase(input);
        break;
      case "toggle":
        result = toToggleCase(input);
        break;
      case "random":
        result = toRandomCase(input);
        break;
    }
    
    setOutput(result);
  };

  // Auto-convert when input or options change
  useEffect(() => {
    const timeout = setTimeout(convertText, 300);
    return () => clearTimeout(timeout);
  }, [input, mode]);

  const handleSpongeBobExample = () => {
    const example = `how original
what an amazing idea
nobody has ever done that before
wow so creative`;
    setInput(example);
  };

  const handleMemeExample = () => {
    const meme = `Mocking SpongeBob
Sarcastic text
Ironic commentary
Meme culture`;
    setInput(meme);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      // Could show a toast here
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearInput = () => {
    setInput("");
  };

  const stats = {
    characters: input.length,
    words: input.trim() ? input.trim().split(/\s+/).length : 0,
    lines: input ? input.split("\n").length : 0,
    convertedCharacters: output.length,
  };

  const modeDescriptions = {
    spongebob: "Mocking SpongeBob meme text: sPoNgEbOb CaSe",
    toggle: "Strict alternating starting lowercase: tOgGlE cAsE",
    random: "Truly random uppercase/lowercase: rAnDoM cAsE",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Input Text</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSpongeBobExample}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5 transition-colors"
              >
                SpongeBob Examples
              </button>
              <button
                type="button"
                onClick={handleMemeExample}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5 transition-colors"
              >
                Meme Text
              </button>
              <button
                type="button"
                onClick={clearInput}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here to convert to SpongeBob case..."
            className="w-full min-h-[300px] font-mono text-sm rounded-xl border border-white/10 bg-neutral-900 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>{stats.words} words • {stats.lines} lines</span>
            <span>{stats.characters} characters</span>
          </div>
        </div>

        {/* Output section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">SpongeBob Case Text</h3>
            <button
              type="button"
              onClick={copyToClipboard}
              disabled={!output}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="SpongeBob case text will appear here..."
            className="w-full min-h-[300px] font-mono text-sm rounded-xl border border-white/10 bg-neutral-900/50 p-4 resize-y focus:outline-none"
          />
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>{output ? output.split("\n").length : 0} lines</span>
            <span>{stats.convertedCharacters} characters</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium">Case Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as CaseMode)}
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="spongebob">SpongeBob Case (sPoNgEbOb)</option>
              <option value="toggle">Toggle Case (tOgGlE)</option>
              <option value="random">Random Case (rAnDoM)</option>
            </select>
            <p className="text-xs text-neutral-400">{modeDescriptions[mode]}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">Quick Actions</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={convertText}
                className="w-full rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
              >
                Convert Now
              </button>
              <button
                type="button"
                onClick={() => {
                  if (output) {
                    setInput(output);
                    setOutput(input);
                  }
                }}
                className="w-full rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
              >
                Swap ↔
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">Transform</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  if (input) {
                    const uppercased = input.toUpperCase();
                    setInput(uppercased);
                  }
                }}
                className="w-full rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
              >
                UPPERCASE
              </button>
              <button
                type="button"
                onClick={() => {
                  if (input) {
                    const lowercased = input.toLowerCase();
                    setInput(lowercased);
                  }
                }}
                className="w-full rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
              >
                lowercase
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Stats and info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-3">
          <div className="text-xs text-neutral-400">Input Characters</div>
          <div className="text-lg font-semibold">{stats.characters}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-3">
          <div className="text-xs text-neutral-400">Input Words</div>
          <div className="text-lg font-semibold">{stats.words}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-3">
          <div className="text-xs text-neutral-400">Input Lines</div>
          <div className="text-lg font-semibold">{stats.lines}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-3">
          <div className="text-xs text-neutral-400">Output Characters</div>
          <div className="text-lg font-semibold">{stats.convertedCharacters}</div>
        </div>
      </div>

      {/* SpongeBob Meme Examples */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3">Classic SpongeBob Meme Phrases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              phrase: "how original",
              meaning: "Sarcastic response to unoriginal ideas",
              usage: "When someone states the obvious or repeats common knowledge",
            },
            {
              phrase: "what an amazing idea",
              meaning: "Mocking praise for ridiculous suggestions",
              usage: "Responding to impractical or silly proposals",
            },
            {
              phrase: "nobody has ever done that before",
              meaning: "Ironic comment on common actions",
              usage: "When someone does something everyone does",
            },
            {
              phrase: "wow so creative",
              meaning: "Mocking lack of creativity",
              usage: "Responding to derivative or copied content",
            },
            {
              phrase: "you must be so proud",
              meaning: "Sarcastic congratulations",
              usage: "When someone boasts about minor achievements",
            },
            {
              phrase: "truly groundbreaking",
              meaning: "Mocking innovation claims",
              usage: "Responding to exaggerated claims of novelty",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-neutral-900 p-4"
            >
              <div className="text-xs text-neutral-400 mb-1">Meme Phrase:</div>
              <div className="font-mono text-sm font-semibold mb-2">{toSpongeBobCase(item.phrase)}</div>
              <div className="text-xs text-neutral-400 mb-1">Meaning:</div>
              <p className="text-sm mb-2">{item.meaning}</p>
              <div className="text-xs text-neutral-400 mb-1">When to use:</div>
              <p className="text-sm">{item.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meme Usage Guide */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3">How to Use SpongeBob Case for Memes</h3>
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                step: "1. Choose your text",
                desc: "Pick a phrase that deserves sarcasm or mockery. Short, punchy phrases work best (2-5 words).",
                example: "Original: 'that's so deep'\nSpongeBob: 'tHaT's So DeEp'",
              },
              {
                step: "2. Convert to SpongeBob case",
                desc: "Use this tool to instantly convert your text to the signature alternating case style.",
                example: "Input: 'genius idea'\nOutput: 'gEnIuS iDeA'",
              },
              {
                step: "3. Add the image",
                desc: "Pair your text with the Mocking SpongeBob meme image for maximum impact.",
                example: "Combine: sPoNgEbOb TeXt + Mocking SpongeBob image",
              },
              {
                step: "4. Post strategically",
                desc: "Share on platforms where the meme is recognized (Twitter, Reddit, Instagram, Discord).",
                example: "Perfect for: Twitter threads, Reddit comments, Instagram captions",
              },
              {
                step: "5. Engage with responses",
                desc: "Expect playful banter and similar sarcastic responses. Engage in the meme culture.",
                example: "Response might be: 'tHaNkS fOr ThE aDvIcE'",
              },
              {
                step: "6. Know when to stop",
                desc: "SpongeBob case loses impact if overused. Save it for genuinely sarcastic moments.",
                example: "Good: occasional mockery\nBad: every single comment",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-2">
                <div className="text-sm font-semibold">{item.step}</div>
                <p className="text-xs text-neutral-400">{item.desc}</p>
                <div className="font-mono text-xs bg-neutral-800 p-2 rounded whitespace-pre-line">{item.example}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}