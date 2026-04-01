"use client";

import { useEffect, useMemo, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/**
 * Content style definitions.
 * Each style has a word pool and an optional classic opener.
 */
type ContentStyle = {
  id: string;
  label: string;
  words: string[];
  opener: string;
};

const STYLES: ContentStyle[] = [
  {
    id: "lorem",
    label: "Classic Lorem",
    opener: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    words: [
      "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
      "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
      "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
      "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
      "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
      "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
      "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
      "deserunt", "mollit", "anim", "id", "est", "laborum", "ac", "accumsan",
      "aliquet", "ante", "arcu", "at", "auctor", "augue", "bibendum", "blandit",
      "condimentum", "congue", "consequat", "cras", "curabitur", "cursus",
      "dapibus", "diam", "dictum", "dignissim", "donec", "efficitur", "egestas",
      "elementum", "eleifend", "eros", "etiam", "eu", "euismod", "facilisi",
      "faucibus", "felis", "fermentum", "finibus", "fringilla", "fusce",
      "gravida", "habitant", "hendrerit", "iaculis", "imperdiet", "integer",
      "interdum", "justo", "lacinia", "lacus", "laoreet", "lectus", "leo",
      "libero", "ligula", "lobortis", "luctus", "maecenas", "massa", "mattis",
      "mauris", "maximus", "metus", "mi", "morbi", "nam", "nec", "neque",
      "nibh", "nunc", "odio", "orci", "ornare", "pellentesque", "pharetra",
      "placerat", "porta", "posuere", "potenti", "praesent", "pretium", "proin",
      "pulvinar", "purus", "quam", "quisque", "rhoncus", "risus", "rutrum",
      "sagittis", "sapien", "scelerisque", "semper", "senectus", "sodales",
      "sollicitudin", "suscipit", "suspendisse", "tellus", "tincidunt", "tortor",
      "tristique", "turpis", "ultrices", "ultricies", "urna", "varius",
      "vehicula", "vel", "vestibulum", "vitae", "vivamus", "viverra", "volutpat",
      "vulputate",
    ],
  },
  {
    id: "hipster",
    label: "Hipster",
    opener: "Craft beer artisan pour-over, sustainable single-origin coffee aesthetic.",
    words: [
      "artisan", "craft", "beer", "pour-over", "sustainable", "single-origin", "coffee",
      "aesthetic", "vinyl", "fixie", "kombucha", "avocado", "toast", "brunch",
      "organic", "farm-to-table", "cold-pressed", "juice", "matcha", "latte",
      "sourdough", "fermented", "kimchi", "sriracha", "umami", "truffle",
      "micro-batch", "small-batch", "handcrafted", "bespoke", "curated", "vintage",
      "retro", "thrift", "upcycled", "reclaimed", "edison", "bulb", "exposed",
      "brick", "minimalist", "industrial", "loft", "coworking", "nomad",
      "bushwick", "williamsburg", "shoreditch", "portland", "brooklyn",
      "typewriter", "polaroid", "letterpress", "screenprint", "zine",
      "taxidermy", "terrarium", "succulent", "macrame", "wabi-sabi",
      "hygge", "kinfolk", "slow-living", "mindful", "intentional",
      "ethically-sourced", "fair-trade", "locally-grown", "pasture-raised",
      "gluten-free", "plant-based", "adaptogenic", "probiotic", "superfood",
      "acai", "goji", "turmeric", "oat-milk", "almond-butter",
      "flannel", "beanie", "raw-denim", "selvage", "heritage",
      "gastropub", "speakeasy", "mixology", "bitters", "infused",
      "charcuterie", "artisanal", "foraged", "heirloom", "seasonal",
      "beard", "mustache", "man-bun", "tattooed", "pierced",
      "conscious", "authentic", "narrative", "storytelling", "curation",
      "vegan", "cruelty-free", "biodegradable", "compostable", "zero-waste",
    ],
  },
  {
    id: "office",
    label: "Office",
    opener: "Let's circle back on the synergy deliverables and leverage our core competencies.",
    words: [
      "synergy", "leverage", "pivot", "disrupt", "scalable", "bandwidth", "paradigm",
      "stakeholder", "deliverables", "action-items", "circle-back", "deep-dive",
      "low-hanging-fruit", "move-the-needle", "drill-down", "take-offline",
      "core-competency", "best-practice", "value-add", "touch-base",
      "alignment", "optics", "cadence", "runway", "north-star",
      "ecosystem", "pipeline", "vertical", "horizontal", "cross-functional",
      "boil-the-ocean", "bleeding-edge", "thought-leader", "game-changer",
      "proactive", "holistic", "robust", "granular", "agile",
      "sprint", "standup", "retro", "backlog", "velocity",
      "KPI", "OKR", "ROI", "SLA", "EOD",
      "ping", "loop-in", "sync", "async", "slack",
      "deck", "one-pager", "whiteboard", "brainstorm", "ideate",
      "unpack", "double-click", "peel-back", "net-net", "bottom-line",
      "tiger-team", "war-room", "all-hands", "town-hall", "skip-level",
      "empower", "champion", "evangelize", "socialize", "operationalize",
      "optimize", "streamline", "onboard", "ramp-up", "offboard",
      "buy-in", "pushback", "blockers", "headwinds", "tailwinds",
      "guardrails", "table-stakes", "secret-sauce", "special-sauce", "wheelhouse",
      "capacity", "bandwidth", "throughput", "bottleneck", "workaround",
      "right-size", "future-proof", "sunset", "deprecate", "greenfield",
      "silo", "swim-lane", "parking-lot", "boilerplate", "template",
    ],
  },
  {
    id: "pirate",
    label: "Pirate",
    opener: "Ahoy matey, hoist the sails and set course for the seven seas, ye scallywag!",
    words: [
      "ahoy", "matey", "avast", "ye", "scallywag", "buccaneer", "corsair",
      "plunder", "pillage", "booty", "treasure", "doubloons", "pieces-of-eight",
      "galleon", "brigantine", "frigate", "sloop", "schooner", "vessel",
      "anchor", "bow", "stern", "port", "starboard", "mast", "rigging",
      "sail", "jib", "mainsail", "crow's-nest", "quarterdeck", "gangplank",
      "plank", "barnacle", "bilge", "brig", "fo'c'sle", "hull", "keel",
      "cannon", "cutlass", "musket", "flintlock", "broadside", "cannonball",
      "jolly-roger", "skull-and-crossbones", "black-flag", "colors", "ensign",
      "captain", "first-mate", "bosun", "helmsman", "swashbuckler",
      "privateer", "freebooter", "sea-dog", "landlubber", "scurvy",
      "grog", "rum", "tankard", "galley", "hardtack", "weevils",
      "kraken", "siren", "mermaid", "leviathan", "davy-jones",
      "maroon", "keelhaul", "walk-the-plank", "mutiny", "parley",
      "shiver-me-timbers", "yo-ho-ho", "arrr", "blimey", "aye-aye",
      "compass", "sextant", "spyglass", "chart", "horizon",
      "island", "cove", "lagoon", "reef", "whirlpool",
      "typhoon", "squall", "tempest", "doldrums", "trade-winds",
      "loot", "bounty", "ransom", "swag", "haul",
      "harbor", "port", "dock", "pier", "jetty",
    ],
  },
  {
    id: "cat",
    label: "Cat",
    opener: "Meow purr purr knock things off the table, then nap in a sunbeam all afternoon.",
    words: [
      "meow", "purr", "hiss", "chirp", "trill", "yowl", "mrow", "mew",
      "nap", "sleep", "snooze", "doze", "loaf", "stretch", "yawn", "curl-up",
      "pounce", "stalk", "hunt", "swat", "bat", "chase", "ambush", "attack",
      "sunbeam", "windowsill", "cardboard-box", "paper-bag", "laundry-basket",
      "keyboard", "laptop", "warm-spot", "radiator", "blanket-fort",
      "scratch", "knead", "biscuits", "claw", "sharpen", "shred",
      "catnip", "treats", "kibble", "wet-food", "tuna", "salmon", "chicken",
      "whiskers", "toe-beans", "belly", "floof", "tail", "ears", "nose-boop",
      "litter-box", "hairball", "groom", "lick", "bathe", "flick",
      "zoomies", "midnight-zoomies", "sprint", "dash", "parkour", "leap",
      "knock-over", "push-off-table", "ignore", "judge", "stare", "glare",
      "headbutt", "rub", "nuzzle", "cuddle", "snuggle", "purrito",
      "laser-pointer", "feather-toy", "string", "crinkle-ball", "mouse-toy",
      "cattitude", "sass", "diva", "demanding", "regal", "majestic",
      "tabby", "calico", "tuxedo", "siamese", "persian", "sphinx",
      "kitten", "kitty", "fluffball", "furbaby", "chonk", "smol",
      "sit-on-face", "3am-concert", "bread-loaf", "sploot", "blep",
      "zoom", "scatter", "tumble", "wrestle", "hide", "disappear",
    ],
  },
];

function randomWordFromPool(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateSentence(words: string[], minWords: number = 6, maxWords: number = 16): string {
  const len = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
  const result: string[] = [];
  for (let i = 0; i < len; i++) {
    result.push(randomWordFromPool(words));
  }
  // Add a comma somewhere in longer sentences
  if (len > 8) {
    const commaPos = 3 + Math.floor(Math.random() * (len - 6));
    result[commaPos] = result[commaPos] + ",";
  }
  return capitalize(result.join(" ")) + ".";
}

function generateParagraph(words: string[], minSentences: number = 4, maxSentences: number = 8): string {
  const len = minSentences + Math.floor(Math.random() * (maxSentences - minSentences + 1));
  const sentences: string[] = [];
  for (let i = 0; i < len; i++) {
    sentences.push(generateSentence(words));
  }
  return sentences.join(" ");
}

type GenMode = "paragraphs" | "sentences" | "words";

function generateText(
  style: ContentStyle,
  mode: GenMode,
  count: number,
  startWithOpener: boolean
): string {
  if (count <= 0) return "";

  const { words, opener } = style;

  if (mode === "words") {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(randomWordFromPool(words));
    }
    let text = result.join(" ");
    if (startWithOpener) {
      const openerWords = opener.replace(/[.,!?]/g, "").toLowerCase().split(/\s+/);
      const replaceCount = Math.min(openerWords.length, count);
      const textWords = text.split(" ");
      for (let i = 0; i < replaceCount; i++) {
        textWords[i] = openerWords[i];
      }
      text = textWords.join(" ");
    }
    return capitalize(text) + ".";
  }

  if (mode === "sentences") {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) {
      sentences.push(generateSentence(words));
    }
    let text = sentences.join(" ");
    if (startWithOpener) {
      text = opener + " " + sentences.slice(1).join(" ");
    }
    return text;
  }

  // paragraphs
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateParagraph(words));
  }
  if (startWithOpener) {
    paragraphs[0] = opener + " " + paragraphs[0].split(". ").slice(1).join(". ");
  }
  return paragraphs.join("\n\n");
}

export function LoremIpsumTool() {
  const { isDark } = useTheme();
  const [styleId, setStyleId] = useState("lorem");
  const [mode, setMode] = useState<GenMode>("paragraphs");
  const [count, setCount] = useState(5);
  const [startWithOpener, setStartWithOpener] = useState(true);
  const [toast, setToast] = useState("");
  const [seed, setSeed] = useState(0);

  const activeStyle = STYLES.find((s) => s.id === styleId) || STYLES[0];

  const output = useMemo(
    () => generateText(activeStyle, mode, count, startWithOpener),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [styleId, mode, count, startWithOpener, seed]
  );

  // Stats
  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;
  const charCount = output.length;

  function regenerate() {
    setSeed((s) => s + 1);
  }

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setToast("Copied!");
    } catch {
      setToast("Copy failed");
    }
    window.setTimeout(() => setToast(""), 1200);
  }

  return (
    <div>
      {/* Controls */}
      <div
        className={cx(
          "rounded-2xl border shadow-sm",
          isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
        )}
      >
        <div
          className={cx(
            "px-3 py-2 border-b",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          <div className="text-sm font-semibold">Generator Settings</div>
        </div>
        <div className="p-4 space-y-4">
          {/* Style selector */}
          <div>
            <div
              className={cx(
                "text-xs uppercase tracking-wide mb-2",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              Content Style
            </div>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setStyleId(s.id);
                    setSeed((prev) => prev + 1);
                  }}
                  className={cx(
                    "rounded-xl px-4 py-2 text-sm border transition-colors",
                    styleId === s.id
                      ? isDark
                        ? "border-emerald-500/40 bg-emerald-500/10 font-semibold"
                        : "border-emerald-500/40 bg-emerald-50 font-semibold"
                      : isDark
                        ? "border-white/10 hover:bg-white/5"
                        : "border-black/10 hover:bg-black/5"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode selector */}
          <div>
            <div
              className={cx(
                "text-xs uppercase tracking-wide mb-2",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              Generate by
            </div>
            <div className="flex gap-2">
              {(["paragraphs", "sentences", "words"] as GenMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMode(m);
                    if (m === "words" && count < 10) setCount(50);
                    if (m === "sentences" && count > 50) setCount(10);
                    if (m === "paragraphs" && count > 20) setCount(5);
                  }}
                  className={cx(
                    "rounded-xl px-4 py-2 text-sm border transition-colors capitalize",
                    mode === m
                      ? isDark
                        ? "border-emerald-500/40 bg-emerald-500/10 font-semibold"
                        : "border-emerald-500/40 bg-emerald-50 font-semibold"
                      : isDark
                        ? "border-white/10 hover:bg-white/5"
                        : "border-black/10 hover:bg-black/5"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div>
            <div
              className={cx(
                "text-xs uppercase tracking-wide mb-2",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              Number of {mode}: {count}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={mode === "words" ? 5 : 1}
                max={mode === "words" ? 500 : mode === "sentences" ? 50 : 20}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="flex-1"
              />
              <input
                type="number"
                min={1}
                max={mode === "words" ? 500 : mode === "sentences" ? 50 : 20}
                value={count}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  if (!isNaN(v) && v > 0) setCount(v);
                }}
                className={cx(
                  "w-20 rounded-xl border px-3 py-1.5 text-sm text-center outline-none",
                  isDark
                    ? "border-white/10 bg-neutral-950"
                    : "border-black/10 bg-neutral-50"
                )}
              />
            </div>
          </div>

          {/* Start with opener */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStartWithOpener(!startWithOpener)}
              className={cx(
                "w-5 h-5 rounded border flex items-center justify-center text-xs shrink-0",
                startWithOpener
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : isDark
                    ? "border-white/20"
                    : "border-black/20"
              )}
            >
              {startWithOpener ? "\u2713" : ""}
            </button>
            <div
              className={cx(
                "text-sm",
                isDark ? "text-neutral-200" : "text-neutral-700"
              )}
            >
              Start with classic opener
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={regenerate}
              className={cx(
                "rounded-xl px-4 py-2 text-sm border transition-colors",
                isDark
                  ? "border-white/10 hover:bg-white/10"
                  : "border-black/10 hover:bg-black/5"
              )}
            >
              Regenerate
            </button>
            <button
              type="button"
              onClick={copyOutput}
              className={cx(
                "rounded-xl px-4 py-2 text-sm border transition-colors",
                isDark
                  ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                  : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100"
              )}
            >
              Copy Text
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className={cx(
          "mt-3 flex items-center gap-4 px-1",
          isDark ? "text-neutral-400" : "text-neutral-500"
        )}
      >
        <span className="text-xs">{formatNumber(wordCount)} words</span>
        <span className="text-xs">{formatNumber(charCount)} characters</span>
        <span className="text-xs">{count} {mode}</span>
      </div>

      {/* Output */}
      <div
        className={cx(
          "mt-3 rounded-2xl border shadow-sm",
          isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
        )}
      >
        <div
          className={cx(
            "flex items-center justify-between px-3 py-2 border-b",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          <div className="text-sm font-semibold">Generated Text</div>
          <button
            type="button"
            onClick={copyOutput}
            className={cx(
              "text-sm rounded-xl px-3 py-1.5 border transition-colors",
              isDark
                ? "border-white/10 hover:bg-white/10"
                : "border-black/10 hover:bg-black/5"
            )}
          >
            Copy
          </button>
        </div>
        <div className="p-4">
          <div
            className={cx(
              "whitespace-pre-wrap text-sm leading-7",
              isDark ? "text-neutral-200" : "text-neutral-700"
            )}
          >
            {output || "\u00A0"}
          </div>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div
        className={cx(
          "mt-3 text-xs text-center",
          isDark ? "text-neutral-500" : "text-neutral-400"
        )}
      >
        Ctrl/Cmd + L toggles theme
      </div>

      {/* Toast */}
      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
