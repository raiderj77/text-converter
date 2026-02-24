"use client";

import { useState, useEffect } from "react";
import { cx } from "@/lib/utils";

type ReverseMode = "characters" | "words" | "lines" | "mirror";

export function TextReverserTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<ReverseMode>("characters");
  const [preserveSpacing, setPreserveSpacing] = useState(true);
  const [preserveLineBreaks, setPreserveLineBreaks] = useState(true);
  const [preservePunctuation, setPreservePunctuation] = useState(true);

  // Reverse functions
  const reverseText = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let result = input;
    
    switch (mode) {
      case "characters":
        // Reverse all characters
        if (preserveLineBreaks) {
          // Reverse each line separately
          result = input.split("\n").map(line => {
            if (preserveSpacing) {
              return line.split("").reverse().join("");
            } else {
              // Remove spaces, reverse, then add spaces back in original positions
              const chars = line.split("");
              const spaceIndices = chars.map((c, i) => c === " " ? i : -1).filter(i => i !== -1);
              const nonSpaceChars = chars.filter(c => c !== " ");
              const reversed = nonSpaceChars.reverse();
              spaceIndices.forEach(idx => reversed.splice(idx, 0, " "));
              return reversed.join("");
            }
          }).join("\n");
        } else {
          // Reverse entire text as one block
          if (preserveSpacing) {
            result = input.split("").reverse().join("");
          } else {
            const chars = input.split("");
            const spaceIndices = chars.map((c, i) => c === " " ? i : -1).filter(i => i !== -1);
            const nonSpaceChars = chars.filter(c => c !== " ");
            const reversed = nonSpaceChars.reverse();
            spaceIndices.forEach(idx => reversed.splice(idx, 0, " "));
            result = reversed.join("");
          }
        }
        break;
        
      case "words":
        // Reverse word order
        if (preserveLineBreaks) {
          result = input.split("\n").map(line => {
            const words = line.split(/(\s+)/);
            const reversedWords = [];
            let currentWord = "";
            
            for (const segment of words) {
              if (/\s+/.test(segment)) {
                if (currentWord) {
                  reversedWords.unshift(currentWord);
                  currentWord = "";
                }
                reversedWords.unshift(segment);
              } else {
                currentWord = segment;
              }
            }
            
            if (currentWord) {
              reversedWords.unshift(currentWord);
            }
            
            return reversedWords.join("");
          }).join("\n");
        } else {
          const words = input.split(/(\s+)/);
          const reversedWords = [];
          let currentWord = "";
          
          for (const segment of words) {
            if (/\s+/.test(segment)) {
              if (currentWord) {
                reversedWords.unshift(currentWord);
                currentWord = "";
              }
              reversedWords.unshift(segment);
            } else {
              currentWord = segment;
            }
          }
          
          if (currentWord) {
            reversedWords.unshift(currentWord);
          }
          
          result = reversedWords.join("");
        }
        break;
        
      case "lines":
        // Reverse line order
        result = input.split("\n").reverse().join("\n");
        break;
        
      case "mirror":
        // Mirror text (palindrome style)
        if (preserveLineBreaks) {
          result = input.split("\n").map(line => {
            const reversed = line.split("").reverse().join("");
            return preservePunctuation 
              ? line + " | " + reversed
              : line.replace(/[^\w\s]/g, '') + " | " + reversed.replace(/[^\w\s]/g, '');
          }).join("\n");
        } else {
          const reversed = input.split("").reverse().join("");
          result = preservePunctuation
            ? input + " | " + reversed
            : input.replace(/[^\w\s]/g, '') + " | " + reversed.replace(/[^\w\s]/g, '');
        }
        break;
    }
    
    setOutput(result);
  };

  // Auto-reverse when input or options change
  useEffect(() => {
    const timeout = setTimeout(reverseText, 300);
    return () => clearTimeout(timeout);
  }, [input, mode, preserveSpacing, preserveLineBreaks, preservePunctuation]);

  const handleExample = () => {
    const example = `Hello world!
This is a test.
Reverse me please.
Text tools are fun.`;
    setInput(example);
  };

  const handlePalindrome = () => {
    const palindrome = `A man a plan a canal Panama
Never odd or even
Race car
Madam I'm Adam`;
    setInput(palindrome);
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
    reversedCharacters: output.length,
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
                onClick={handlePalindrome}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5 transition-colors"
              >
                Palindromes
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
            placeholder="Paste your text here to reverse it..."
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
            <h3 className="text-sm font-semibold">Reversed Text</h3>
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
            placeholder="Reversed text will appear here..."
            className="w-full min-h-[300px] font-mono text-sm rounded-xl border border-white/10 bg-neutral-900/50 p-4 resize-y focus:outline-none"
          />
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>{output ? output.split("\n").length : 0} lines</span>
            <span>{stats.reversedCharacters} characters</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium">Reverse Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as ReverseMode)}
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="characters">Characters (backwards)</option>
              <option value="words">Word Order</option>
              <option value="lines">Line Order</option>
              <option value="mirror">Mirror Text</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">Quick Actions</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={reverseText}
                className="w-full rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
              >
                Reverse Now
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
            <label className="text-xs font-medium">Preserve</label>
            <div className="flex gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preserveSpacing}
                  onChange={(e) => setPreserveSpacing(e.target.checked)}
                  className="rounded border-white/10 bg-neutral-800"
                />
                <span className="text-sm">Spacing</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preserveLineBreaks}
                  onChange={(e) => setPreserveLineBreaks(e.target.checked)}
                  className="rounded border-white/10 bg-neutral-800"
                />
                <span className="text-sm">Line Breaks</span>
              </label>
            </div>
          </div>
        </div>

        {mode === "mirror" && (
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preservePunctuation}
                onChange={(e) => setPreservePunctuation(e.target.checked)}
                className="rounded border-white/10 bg-neutral-800"
              />
              <span className="text-sm">Preserve punctuation in mirror mode</span>
            </label>
          </div>
        )}
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
          <div className="text-lg font-semibold">{stats.reversedCharacters}</div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3">Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
            <div className="text-xs text-neutral-400 mb-2">Character Reversal</div>
            <div className="text-sm">
              <div className="font-mono">"Hello" → "olleH"</div>
              <div className="font-mono mt-1">"Hello world" → "dlrow olleH"</div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
            <div className="text-xs text-neutral-400 mb-2">Word Reversal</div>
            <div className="text-sm">
              <div className="font-mono">"Hello world" → "world Hello"</div>
              <div className="font-mono mt-1">"The quick brown fox" → "fox brown quick The"</div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
            <div className="text-xs text-neutral-400 mb-2">Line Reversal</div>
            <div className="text-sm">
              <div className="font-mono">Line 1 → Line 3</div>
              <div className="font-mono">Line 2 → Line 2</div>
              <div className="font-mono">Line 3 → Line 1</div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
            <div className="text-xs text-neutral-400 mb-2">Mirror Text</div>
            <div className="text-sm">
              <div className="font-mono">"ABC" → "ABC | CBA"</div>
              <div className="font-mono mt-1">"Hello" → "Hello | olleH"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}