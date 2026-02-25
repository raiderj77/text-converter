"use client";

import { useState, useEffect } from "react";
import { cx } from "@/lib/utils";
import { toToggleCase, toSpongeBobCase, toRandomCase, toAlternatingCase } from "@/lib/conversions";

type CaseMode = "toggle" | "spongebob" | "random" | "alternating";

export function ToggleCaseConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<CaseMode>("toggle");
  const [preserveFormatting, setPreserveFormatting] = useState(true);

  // Conversion functions
  const convertText = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let result = input;
    
    switch (mode) {
      case "toggle":
        result = toToggleCase(input);
        break;
      case "spongebob":
        result = toSpongeBobCase(input);
        break;
      case "random":
        result = toRandomCase(input);
        break;
      case "alternating":
        result = toAlternatingCase(input);
        break;
    }
    
    setOutput(result);
  };

  // Auto-convert when input or options change
  useEffect(() => {
    const timeout = setTimeout(convertText, 300);
    return () => clearTimeout(timeout);
  }, [input, mode, preserveFormatting]);

  const handleExample = () => {
    const example = `Hello world!
This is a toggle case example.
Convert me to fun text!
Social media ready.`;
    setInput(example);
  };

  const handleMemeExample = () => {
    const meme = `Mocking SpongeBob
How original
What an amazing idea
Nobody has ever done that before`;
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
    toggle: "Starts lowercase, alternates each letter: tOgGlE cAsE",
    spongebob: "Random-looking alternating: sPoNgEbOb mEmE tExT",
    random: "Truly random uppercase/lowercase: rAnDoM cAsE",
    alternating: "Classic alternating starting with case of first letter: aLtErNaTiNg",
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
                onClick={handleExample}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5 transition-colors"
              >
                Example
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
            placeholder="Paste your text here to convert to toggle case..."
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
            <h3 className="text-sm font-semibold">Converted Text</h3>
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
            placeholder="Converted text will appear here..."
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
              <option value="toggle">Toggle Case (tOgGlE)</option>
              <option value="spongebob">SpongeBob Case (sPoNgEbOb)</option>
              <option value="random">Random Case (rAnDoM)</option>
              <option value="alternating">Alternating Case (aLtErNaTiNg)</option>
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
          
          <div className="space-y-2">
            <label className="text-xs font-medium">Options</label>
            <div className="flex gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preserveFormatting}
                  onChange={(e) => setPreserveFormatting(e.target.checked)}
                  className="rounded border-white/10 bg-neutral-800"
                />
                <span className="text-sm">Preserve line breaks</span>
              </label>
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

      {/* Examples */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3">Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
            <div className="text-xs text-neutral-400 mb-2">Toggle Case</div>
            <div className="text-sm">
              <div className="font-mono">"hello" → "hElLo"</div>
              <div className="font-mono mt-1">"toggle case" → "tOgGlE cAsE"</div>
              <div className="font-mono mt-1">"MEME TEXT" → "mEmE tExT"</div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
            <div className="text-xs text-neutral-400 mb-2">SpongeBob Case</div>
            <div className="text-sm">
              <div className="font-mono">"hello" → "hElLo" or "HeLlO"</div>
              <div className="font-mono mt-1">"mocking spongebob" → "mOcKiNg sPoNgEbOb"</div>
              <div className="font-mono mt-1">"how original" → "hOw OrIgInAl"</div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
            <div className="text-xs text-neutral-400 mb-2">Random Case</div>
            <div className="text-sm">
              <div className="font-mono">"hello" → "HeLLo" or "hElLO"</div>
              <div className="font-mono mt-1">"random text" → "RaNdOm tExT"</div>
              <div className="font-mono mt-1">"different each time" → "DiFfErEnT EaCh TiMe"</div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
            <div className="text-xs text-neutral-400 mb-2">Alternating Case</div>
            <div className="text-sm">
              <div className="font-mono">"hello" → "hElLo"</div>
              <div className="font-mono mt-1">"alternating" → "aLtErNaTiNg"</div>
              <div className="font-mono mt-1">"text case" → "tExT cAsE"</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Comparison */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3">Mode Comparison</h3>
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                mode: "Toggle Case",
                desc: "Consistent pattern starting lowercase. Predictable output every time. Best for branding and consistent styling.",
                example: "tOgGlE cAsE",
              },
              {
                mode: "SpongeBob Case",
                desc: "Pseudo-random alternating pattern. Looks random but same input produces same output. Perfect for meme text.",
                example: "sPoNgEbOb CaSe",
              },
              {
                mode: "Random Case",
                desc: "Truly random uppercase/lowercase. Different each time even with same input. Great for unique usernames.",
                example: "rAnDoM cAsE",
              },
              {
                mode: "Alternating Case",
                desc: "Classic alternating starting with original case of first letter. More flexible than toggle case.",
                example: "aLtErNaTiNg",
              },
            ].map((item) => (
              <div key={item.mode} className="space-y-2">
                <div className="text-sm font-semibold">{item.mode}</div>
                <div className="font-mono text-sm bg-neutral-800 p-2 rounded">{item.example}</div>
                <p className="text-xs text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}