"use client";

import { useState, useEffect } from "react";
import { cx } from "@/lib/utils";

type SortOrder = "asc" | "desc" | "random";
type SortType = "alphabetical" | "numerical" | "length";

export function TextSorterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [sortType, setSortType] = useState<SortType>("alphabetical");
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [emptyLines, setEmptyLines] = useState("keep"); // "keep", "remove", "separate"

  // Sort functions
  const sortText = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let lines = input.split("\n");
    
    // Apply preprocessing
    if (trimLines) {
      lines = lines.map(line => line.trim());
    }
    
    if (emptyLines === "remove") {
      lines = lines.filter(line => line.length > 0);
    } else if (emptyLines === "separate") {
      // Keep empty lines but they'll sort to top/bottom
    }
    
    if (removeDuplicates) {
      const seen = new Set();
      lines = lines.filter(line => {
        const key = ignoreCase ? line.toLowerCase() : line;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    
    // Sort based on type and order
    let sortedLines = [...lines];
    
    if (sortOrder === "random") {
      // Fisher-Yates shuffle
      for (let i = sortedLines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sortedLines[i], sortedLines[j]] = [sortedLines[j], sortedLines[i]];
      }
    } else {
      sortedLines.sort((a, b) => {
        let compareA = a;
        let compareB = b;
        
        if (ignoreCase) {
          compareA = a.toLowerCase();
          compareB = b.toLowerCase();
        }
        
        if (sortType === "numerical") {
          const numA = parseFloat(compareA.replace(/[^0-9.-]/g, ""));
          const numB = parseFloat(compareB.replace(/[^0-9.-]/g, ""));
          if (!isNaN(numA) && !isNaN(numB)) {
            return sortOrder === "asc" ? numA - numB : numB - numA;
          }
          // Fall back to alphabetical for non-numeric
        }
        
        if (sortType === "length") {
          return sortOrder === "asc" 
            ? compareA.length - compareB.length
            : compareB.length - compareA.length;
        }
        
        // Alphabetical
        if (compareA < compareB) return sortOrder === "asc" ? -1 : 1;
        if (compareA > compareB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    
    // Handle empty lines separation
    if (emptyLines === "separate") {
      const nonEmpty = sortedLines.filter(line => line.length > 0);
      const empty = sortedLines.filter(line => line.length === 0);
      sortedLines = sortOrder === "asc" 
        ? [...nonEmpty, ...empty] 
        : [...empty, ...nonEmpty];
    }
    
    setOutput(sortedLines.join("\n"));
  };

  // Auto-sort when input or options change
  useEffect(() => {
    const timeout = setTimeout(sortText, 300);
    return () => clearTimeout(timeout);
  }, [input, sortOrder, sortType, removeDuplicates, trimLines, ignoreCase, emptyLines]);

  const handleExample = () => {
    const example = `Apple
banana
Cherry
date
Elderberry
fig
Grapefruit
apple
BANANA
cherry`;
    setInput(example);
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
    lines: input ? input.split("\n").length : 0,
    unique: input ? new Set(input.split("\n").map(l => ignoreCase ? l.trim().toLowerCase() : l.trim())).size : 0,
    sortedLines: output ? output.split("\n").length : 0,
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
                Load Example
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
            placeholder="Paste your text here, one item per line..."
            className="w-full min-h-[300px] font-mono text-sm rounded-xl border border-white/10 bg-neutral-900 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>{stats.lines} lines • {stats.unique} unique</span>
            <span>{input.length} characters</span>
          </div>
        </div>

        {/* Output section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Sorted Text</h3>
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
            placeholder="Sorted text will appear here..."
            className="w-full min-h-[300px] font-mono text-sm rounded-xl border border-white/10 bg-neutral-900/50 p-4 resize-y focus:outline-none"
          />
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>{stats.sortedLines} lines</span>
            <span>{output.length} characters</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium">Sort Order</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">Ascending (A→Z, 0→9)</option>
              <option value="desc">Descending (Z→A, 9→0)</option>
              <option value="random">Random Shuffle</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">Sort By</label>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value as SortType)}
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="numerical">Numerical</option>
              <option value="length">Line Length</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">Empty Lines</label>
            <select
              value={emptyLines}
              onChange={(e) => setEmptyLines(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="keep">Keep in place</option>
              <option value="remove">Remove all</option>
              <option value="separate">Group at end</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">Actions</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={sortText}
                className="w-full rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
              >
                Sort Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className="rounded border-white/10 bg-neutral-800"
            />
            <span className="text-sm">Remove duplicates</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="rounded border-white/10 bg-neutral-800"
            />
            <span className="text-sm">Trim lines</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="rounded border-white/10 bg-neutral-800"
            />
            <span className="text-sm">Ignore case</span>
          </label>
          <button
            type="button"
            onClick={() => {
              if (output) {
                const reversed = output.split("\n").reverse().join("\n");
                setOutput(reversed);
              }
            }}
            className="text-sm hover:text-blue-400 transition-colors"
          >
            Reverse output
          </button>
        </div>
      </div>

      {/* Stats and info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-3">
          <div className="text-xs text-neutral-400">Input Lines</div>
          <div className="text-lg font-semibold">{stats.lines}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-3">
          <div className="text-xs text-neutral-400">Unique Items</div>
          <div className="text-lg font-semibold">{stats.unique}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-3">
          <div className="text-xs text-neutral-400">Output Lines</div>
          <div className="text-lg font-semibold">{stats.sortedLines}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-3">
          <div className="text-xs text-neutral-400">Reduction</div>
          <div className="text-lg font-semibold">
            {stats.lines > 0 ? Math.round((1 - stats.sortedLines / stats.lines) * 100) : 0}%
          </div>
        </div>
      </div>
    </div>
  );
}