"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Character sets ─── */
const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?/~`",
};
type CharSetKey = keyof typeof CHAR_SETS;

/* ─── Wordlist for passphrases (EFF short list subset — 1296 words) ─── */
const WORDS = [
  "acid","acme","aged","also","arch","area","army","away","baby","back","bail","bake","bald","ball",
  "band","bank","barn","base","bash","bath","bead","beam","bean","bear","beat","been","beer","bell",
  "belt","bend","best","bike","bind","bird","bite","blob","blog","blow","blue","blur","boat","body",
  "bold","bolt","bomb","bond","bone","book","boot","bore","born","boss","both","bowl","bulk","bull",
  "bump","burn","busy","buzz","cafe","cage","cake","call","calm","came","camp","cape","card","care",
  "cart","case","cash","cast","cave","chat","chef","chin","chip","chop","city","clad","clam","clap",
  "clay","clip","club","clue","coal","coat","code","coil","coin","cold","colt","come","cook","cool",
  "cope","copy","cord","core","cork","corn","cost","cozy","crew","crop","crow","cube","cult","cups",
  "curb","curl","cute","dare","dark","dart","dash","data","dawn","deal","dear","deck","deed","deem",
  "deep","deer","demo","deny","desk","dial","dice","diet","dime","dine","dirt","disc","dish","disk",
  "dock","dome","done","door","dose","down","drag","draw","drip","drop","drum","dual","dude","duel",
  "duke","dull","dumb","dump","dune","dusk","dust","duty","each","earn","ease","east","easy","edge",
  "edit","else","emit","ends","epic","euro","even","ever","evil","exam","exit","face","fact","fade",
  "fail","fair","fake","fall","fame","fang","fare","farm","fast","fate","fawn","fear","feat","feed",
  "feel","feet","fell","felt","fend","fern","file","fill","film","find","fine","fire","firm","fish",
  "fist","five","flag","flame","flap","flat","flaw","fled","flew","flip","flog","flow","foam","foil",
  "fold","folk","fond","font","food","fool","foot","ford","fore","fork","form","fort","foul","four",
  "free","frog","from","fuel","full","fund","fuse","fuss","fury","gait","gale","game","gang","gape",
  "garb","gate","gave","gaze","gear","gene","gift","gild","girl","give","glad","glee","glen","glow",
  "glue","goat","goes","gold","golf","gone","good","grab","gram","gray","grew","grid","grim","grin",
  "grip","grow","gulf","guru","gust","guts","hack","half","hall","halt","hand","hang","hare","harm",
  "harp","hash","hate","haul","have","haze","head","heal","heap","hear","heat","heavy","held","helm",
  "help","herb","herd","here","hero","hide","high","hike","hill","hint","hire","hold","hole","holy",
  "home","hood","hook","hope","horn","host","hour","howl","hubs","huge","hull","hung","hunt","hurl",
  "hurt","hush","hymn","icon","idea","idle","inch","info","iron","isle","item","ivory","jade","jail",
  "jams","jazz","jean","jest","jobs","jogs","join","joke","jump","june","jury","just","keen","keep",
  "kelp","kept","keys","kick","kids","kill","kind","king","kiss","kite","knee","knelt","knew","knit",
  "knob","knot","know","lace","lack","laid","lake","lamb","lamp","land","lane","laps","lark","last",
  "late","lawn","lead","leaf","lean","leap","left","lend","lens","less","lied","life","lift","like",
  "limb","lime","limp","line","link","lion","lips","list","live","load","loaf","loan","lock","logo",
  "lone","long","look","loop","lord","lore","lose","loss","lost","loud","love","luck","lump","lung",
  "lure","lurk","lush","made","maid","mail","main","make","male","mall","malt","mane","many","maps",
  "mare","mark","mars","mash","mask","mass","mast","mate","math","maze","meal","mean","meat","meet",
  "meld","melt","memo","mend","menu","mere","mesh","mess","mild","milk","mill","mind","mine","mint",
  "miss","mist","moan","moat","mock","mode","mold","mood","moon","more","moss","most","moth","move",
  "much","mule","muse","mush","must","myth","nail","name","navy","near","neat","neck","need","nest",
  "nets","news","next","nice","nine","node","none","noon","norm","nose","note","noun","nude","oath",
  "obey","odds","oils","okay","omen","once","only","onto","open","oral","orca","oven","over","owed",
  "pace","pack","pact","page","paid","pain","pair","pale","palm","pane","park","part","pass","past",
  "path","pave","peak","pear","peel","peer","pens","perk","pest","pick","pier","pile","pine","pink",
  "pipe","plan","play","plea","plot","ploy","plug","plum","plus","poem","poet","pole","poll","pond",
  "pool","poor","pope","pork","port","pose","post","pour","pray","prey","prop","pull","pulp","pump",
  "punk","pure","push","quit","quiz","race","rack","rage","raid","rail","rain","rake","ramp","rang",
  "rank","rare","rash","rate","rave","read","real","rear","reed","reef","reel","rein","rely","rent",
  "rest","rice","rich","ride","rift","rigs","rile","rim","ring","riot","ripe","rise","risk","road",
  "roam","roar","robe","rock","rode","role","roll","roof","room","root","rope","rose","rote","rout",
  "rude","ruin","rule","rung","rush","rust","sack","safe","sage","said","sail","sake","sale","salt",
  "same","sand","sane","sang","sank","save","scan","seal","seam","seed","seek","seem","seen","self",
  "sell","send","sent","sept","sewn","shed","shin","ship","shop","shot","show","shut","side","sift",
  "sigh","sign","silk","sing","sink","site","size","skip","skit","slab","slag","slam","slap","slew",
  "slid","slim","slip","slit","slot","slow","slug","snap","snip","snow","soak","soap","soar","sock",
  "sofa","soft","soil","sold","sole","some","song","soon","sore","sort","soul","sour","span","spar",
  "spec","sped","spin","spit","spot","spur","stab","star","stay","stem","step","stew","stir","stop",
  "stow","stub","stud","such","suit","sulk","surf","sure","swan","swap","swim","swum","sync","tabs",
  "tack","tact","tail","take","tale","talk","tall","tame","tang","tank","tape","taps","task","taxi",
  "teal","team","tear","tell","temp","tend","tent","term","test","text","than","that","them","then",
  "they","thin","this","tick","tide","tidy","tied","tier","tile","tilt","time","tint","tiny","tips",
  "tire","toad","toed","toil","told","toll","tomb","tone","took","tool","tops","tore","torn","toss",
  "tour","town","trap","tray","tree","trek","trim","trio","trip","trod","true","tube","tuck","tuna",
  "tune","turf","turn","twin","type","ugly","undo","unit","unto","upon","urge","used","user","vain",
  "vale","van","vary","vast","veil","vein","vent","verb","very","vest","veto","view","vine","visa",
  "void","volt","vote","wade","wage","wail","wait","wake","walk","wall","wand","want","ward","warm",
  "warn","warp","wary","wash","wasp","wave","wavy","waxy","weak","wean","wear","weed","week","weld",
  "well","went","were","west","what","when","whim","whom","wick","wide","wife","wild","will","wilt",
  "wily","wimp","wind","wine","wing","wink","wipe","wire","wise","wish","with","woke","womb","wood",
  "wool","word","wore","work","worm","worn","wrap","wren","yard","yarn","year","yell","your","zeal",
  "zero","zinc","zone","zoom",
];

/* ─── Password generation ─── */
function cryptoRand(max: number): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

function genPassword(length: number, sets: Record<CharSetKey, boolean>, exclude: string): string {
  let chars = "";
  for (const [key, enabled] of Object.entries(sets) as [CharSetKey, boolean][])
    if (enabled) chars += CHAR_SETS[key];
  if (exclude) { const ex = new Set(exclude); chars = [...chars].filter((c) => !ex.has(c)).join(""); }
  if (!chars) return "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (v) => chars[v % chars.length]).join("");
}

function genPassphrase(wordCount: number, separator: string, capitalize: boolean, includeNumber: boolean): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    let w = WORDS[cryptoRand(WORDS.length)];
    if (capitalize) w = w[0].toUpperCase() + w.slice(1);
    words.push(w);
  }
  let result = words.join(separator);
  if (includeNumber) {
    const pos = cryptoRand(words.length);
    const parts = result.split(separator);
    parts[pos] += cryptoRand(100).toString();
    result = parts.join(separator);
  }
  return result;
}

function genPin(length: number): string {
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (v) => (v % 10).toString()).join("");
}

/* ─── Strength / crack time ─── */
function calcStrength(pw: string, mode: Mode): { score: number; label: string; color: string; bits: number; crackTime: string } {
  let poolSize = 0;
  if (mode === "pin") {
    poolSize = 10;
  } else if (mode === "passphrase") {
    poolSize = WORDS.length;
    const wordCount = pw.split(/[-_.\s]/).filter(Boolean).length;
    const bits = Math.floor(wordCount * Math.log2(poolSize));
    return { ...strengthFromBits(bits), bits };
  } else {
    if (/[a-z]/.test(pw)) poolSize += 26;
    if (/[A-Z]/.test(pw)) poolSize += 26;
    if (/[0-9]/.test(pw)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pw)) poolSize += 30;
  }
  const bits = poolSize > 0 ? Math.floor(pw.length * Math.log2(poolSize)) : 0;
  return { ...strengthFromBits(bits), bits };
}

function strengthFromBits(bits: number): { score: number; label: string; color: string; crackTime: string } {
  // Assume 10 billion guesses/sec
  const combos = Math.pow(2, bits);
  const seconds = combos / 10_000_000_000;
  const crackTime = formatCrackTime(seconds);
  if (bits >= 128) return { score: 4, label: "Very Strong", color: "emerald", crackTime };
  if (bits >= 80) return { score: 3, label: "Strong", color: "green", crackTime };
  if (bits >= 50) return { score: 2, label: "Medium", color: "amber", crackTime };
  if (bits >= 30) return { score: 1, label: "Weak", color: "orange", crackTime };
  return { score: 0, label: "Very Weak", color: "red", crackTime };
}

function formatCrackTime(seconds: number): string {
  if (seconds < 0.001) return "Instant";
  if (seconds < 1) return "< 1 second";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 86400 * 365) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 86400 * 365 * 1000) return `${Math.round(seconds / (86400 * 365))} years`;
  if (seconds < 86400 * 365 * 1e6) return `${Math.round(seconds / (86400 * 365 * 1000))}k years`;
  if (seconds < 86400 * 365 * 1e9) return `${Math.round(seconds / (86400 * 365 * 1e6))}M years`;
  if (seconds < 86400 * 365 * 1e12) return `${Math.round(seconds / (86400 * 365 * 1e9))}B years`;
  return `${(seconds / (86400 * 365 * 1e12)).toExponential(1)} T years`;
}

type Mode = "password" | "passphrase" | "pin";

export function PasswordGeneratorTool() {
  const { isDark } = useTheme();
  const [mode, setMode] = useState<Mode>("password");

  // Password options
  const [length, setLength] = useState(20);
  const [sets, setSets] = useState<Record<CharSetKey, boolean>>({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [exclude, setExclude] = useState("");

  // Passphrase options
  const [wordCount, setWordCount] = useState(5);
  const [separator, setSeparator] = useState("-");
  const [capitalize, setCapitalize] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);

  // PIN options
  const [pinLength, setPinLength] = useState(6);

  // Shared
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [toast, setToast] = useState("");

  const generate = useCallback(() => {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      if (mode === "password") result.push(genPassword(length, sets, exclude));
      else if (mode === "passphrase") result.push(genPassphrase(wordCount, separator, capitalize, includeNumber));
      else result.push(genPin(pinLength));
    }
    setPasswords(result);
    setHistory((h) => [...result, ...h].slice(0, 50));
  }, [mode, length, sets, exclude, wordCount, separator, capitalize, includeNumber, pinLength, count]);

  useEffect(() => { generate(); }, [generate]);

  const strength = useMemo(() => passwords[0] ? calcStrength(passwords[0], mode) : null, [passwords, mode]);

  function toggleSet(key: CharSetKey) {
    const next = { ...sets, [key]: !sets[key] };
    if (Object.values(next).every((v) => !v)) return;
    setSets(next);
  }

  async function copyPw(pw: string) {
    try { await navigator.clipboard.writeText(pw); setToast("Copied!"); } catch { setToast("Failed"); }
    setTimeout(() => setToast(""), 1200);
  }

  async function copyAll() {
    try { await navigator.clipboard.writeText(passwords.join("\n")); setToast(`Copied ${passwords.length}!`); } catch { setToast("Failed"); }
    setTimeout(() => setToast(""), 1200);
  }

  const sColors: Record<string, { bg: string; bar: string; text: string }> = {
    red: { bg: isDark ? "bg-red-500/10" : "bg-red-50", bar: "bg-red-500", text: isDark ? "text-red-400" : "text-red-600" },
    orange: { bg: isDark ? "bg-orange-500/10" : "bg-orange-50", bar: "bg-orange-500", text: isDark ? "text-orange-400" : "text-orange-600" },
    amber: { bg: isDark ? "bg-amber-500/10" : "bg-amber-50", bar: "bg-amber-500", text: isDark ? "text-amber-400" : "text-amber-600" },
    green: { bg: isDark ? "bg-green-500/10" : "bg-green-50", bar: "bg-green-500", text: isDark ? "text-green-400" : "text-green-600" },
    emerald: { bg: isDark ? "bg-emerald-500/10" : "bg-emerald-50", bar: "bg-emerald-500", text: isDark ? "text-emerald-400" : "text-emerald-600" },
  };

  const Checkbox = ({ checked, toggle, label }: { checked: boolean; toggle: () => void; label: string }) => (
    <button type="button" onClick={toggle} className={cx(
      "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
      checked ? isDark ? "border-emerald-500/40 bg-emerald-500/10" : "border-emerald-500/40 bg-emerald-50" : isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
    )}>
      <div className={cx("w-4 h-4 rounded border flex items-center justify-center text-xs shrink-0", checked ? "bg-emerald-500 border-emerald-500 text-white" : isDark ? "border-white/20" : "border-black/20")}>
        {checked ? "✓" : ""}
      </div>
      {label}
    </button>
  );

  return (
    <div>
      {/* Mode tabs */}
      <div className="flex gap-2 mb-4">
        {([
          { m: "password" as Mode, icon: "🔑", label: "Password" },
          { m: "passphrase" as Mode, icon: "📝", label: "Passphrase" },
          { m: "pin" as Mode, icon: "🔢", label: "PIN" },
        ]).map(({ m, icon, label }) => (
          <button key={m} type="button" onClick={() => setMode(m)} className={cx(
            "flex-1 rounded-xl border px-3 py-3 text-sm font-medium transition-colors",
            mode === m
              ? isDark ? "border-emerald-500/40 bg-emerald-500/10" : "border-emerald-500/40 bg-emerald-50"
              : isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
          )}>{icon} {label}</button>
        ))}
      </div>

      {/* Controls */}
      <div className={cx("rounded-2xl border p-4 space-y-4", isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10")}>
        {mode === "password" && (
          <>
            {/* Length */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold">Password Length</label>
                <input type="number" min={4} max={128} value={length}
                  onChange={(e) => setLength(Math.max(4, Math.min(128, parseInt(e.target.value) || 4)))}
                  className={cx("w-16 rounded-lg border px-2 py-1 text-sm text-center font-mono", isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10")}
                />
              </div>
              <input type="range" min={4} max={128} value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full accent-emerald-500" />
              <div className={cx("flex justify-between text-xs mt-1", isDark ? "text-neutral-500" : "text-neutral-400")}><span>4</span><span>128</span></div>
            </div>
            {/* Character sets */}
            <div>
              <div className="text-sm font-semibold mb-2">Character Sets</div>
              <div className="flex flex-wrap gap-2">
                {([
                  { k: "uppercase" as CharSetKey, l: "A-Z" },
                  { k: "lowercase" as CharSetKey, l: "a-z" },
                  { k: "numbers" as CharSetKey, l: "0-9" },
                  { k: "symbols" as CharSetKey, l: "!@#$%" },
                ]).map(({ k, l }) => (
                  <Checkbox key={k} checked={sets[k]} toggle={() => toggleSet(k)} label={l} />
                ))}
              </div>
            </div>
            {/* Exclude */}
            <div>
              <label className="text-sm font-semibold block mb-1">Exclude Characters</label>
              <input type="text" value={exclude} onChange={(e) => setExclude(e.target.value)} placeholder="e.g. 0OlI1"
                className={cx("w-full rounded-xl border px-3 py-2 text-sm font-mono", isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10")} />
              <p className={cx("text-xs mt-1", isDark ? "text-neutral-500" : "text-neutral-400")}>Remove ambiguous characters (0/O, l/1/I) or restricted symbols</p>
            </div>
          </>
        )}

        {mode === "passphrase" && (
          <>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold">Number of Words</label>
                <div className="flex gap-1">
                  {[3, 4, 5, 6, 7, 8].map((n) => (
                    <button key={n} type="button" onClick={() => setWordCount(n)} className={cx(
                      "rounded-lg px-2.5 py-1 text-xs border transition-colors",
                      wordCount === n ? isDark ? "border-emerald-500/40 bg-emerald-500/10 font-semibold" : "border-emerald-500/40 bg-emerald-50 font-semibold" : isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
                    )}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Separator</div>
              <div className="flex flex-wrap gap-2">
                {[{ v: "-", l: "Hyphen ( - )" }, { v: ".", l: "Dot ( . )" }, { v: "_", l: "Underscore ( _ )" }, { v: " ", l: "Space" }].map(({ v, l }) => (
                  <button key={v} type="button" onClick={() => setSeparator(v)} className={cx(
                    "rounded-xl border px-3 py-2 text-sm transition-colors",
                    separator === v ? isDark ? "border-emerald-500/40 bg-emerald-500/10 font-semibold" : "border-emerald-500/40 bg-emerald-50 font-semibold" : isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
                  )}>{l}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Checkbox checked={capitalize} toggle={() => setCapitalize(!capitalize)} label="Capitalize words" />
              <Checkbox checked={includeNumber} toggle={() => setIncludeNumber(!includeNumber)} label="Include a number" />
            </div>
          </>
        )}

        {mode === "pin" && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold">PIN Length</label>
              <div className="flex gap-1">
                {[4, 6, 8, 10, 12].map((n) => (
                  <button key={n} type="button" onClick={() => setPinLength(n)} className={cx(
                    "rounded-lg px-2.5 py-1 text-xs border transition-colors",
                    pinLength === n ? isDark ? "border-emerald-500/40 bg-emerald-500/10 font-semibold" : "border-emerald-500/40 bg-emerald-50 font-semibold" : isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
                  )}>{n}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Count */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Generate Multiple</label>
            <div className="flex gap-1">
              {[1, 5, 10, 25].map((n) => (
                <button key={n} type="button" onClick={() => setCount(n)} className={cx(
                  "rounded-lg px-2.5 py-1 text-xs border transition-colors",
                  count === n ? isDark ? "border-blue-500/40 bg-blue-500/10 font-semibold" : "border-blue-500/40 bg-blue-50 font-semibold" : isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
                )}>{n}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate */}
        <button type="button" onClick={generate} className={cx(
          "w-full rounded-xl px-4 py-3 text-sm font-semibold border transition-colors",
          isDark ? "border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20" : "border-emerald-500/40 bg-emerald-50 hover:bg-emerald-100"
        )}>
          🔑 Generate {mode === "pin" ? "PIN" : mode === "passphrase" ? "Passphrase" : "Password"}{count > 1 ? `s (${count})` : ""}
        </button>
      </div>

      {/* Strength meter + crack time */}
      {strength && passwords[0] && (
        <div className={cx("mt-4 rounded-xl border p-3", isDark ? "border-white/10" : "border-black/10", sColors[strength.color].bg)}>
          <div className="flex items-center justify-between mb-2">
            <span className={cx("text-sm font-semibold", sColors[strength.color].text)}>{strength.label}</span>
            <span className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>{strength.bits} bits of entropy</span>
          </div>
          <div className={cx("h-2 rounded-full overflow-hidden", isDark ? "bg-neutral-800" : "bg-neutral-200")}>
            <div className={cx("h-full rounded-full transition-all", sColors[strength.color].bar)} style={{ width: `${Math.min(100, (strength.score + 1) * 20)}%` }} />
          </div>
          <div className={cx("mt-2 text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
            Estimated crack time at 10B guesses/sec: <span className={cx("font-medium", sColors[strength.color].text)}>{strength.crackTime}</span>
          </div>
        </div>
      )}

      {/* Password output */}
      {passwords.length > 0 && (
        <div className={cx("mt-4 rounded-2xl border shadow-sm", isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10")}>
          <div className={cx("flex items-center justify-between px-3 py-2 border-b", isDark ? "border-white/10" : "border-black/5")}>
            <div className="text-sm font-semibold">{passwords.length === 1 ? `Your ${mode === "pin" ? "PIN" : mode === "passphrase" ? "Passphrase" : "Password"}` : `${passwords.length} Results`}</div>
            <div className="flex items-center gap-2">
              {passwords.length > 1 && (
                <button type="button" onClick={copyAll} className={cx("text-xs rounded-xl px-3 py-1.5 border transition-colors", isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5")}>Copy All</button>
              )}
              <button type="button" onClick={() => setShowHistory(!showHistory)} className={cx("text-xs rounded-xl px-3 py-1.5 border transition-colors", showHistory ? isDark ? "border-blue-500/40 bg-blue-500/10" : "border-blue-500/40 bg-blue-50" : isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5")}>
                History ({history.length})
              </button>
            </div>
          </div>
          <div className="p-3 space-y-2">
            {(showHistory ? history : passwords).map((pw, i) => (
              <div key={`${pw}-${i}`} className="flex items-center gap-2">
                <code className={cx("flex-1 rounded-xl border px-3 py-2 text-sm font-mono break-all leading-6", isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10")}>
                  {pw}
                </code>
                <button type="button" onClick={() => copyPw(pw)} className={cx(
                  "shrink-0 rounded-xl px-3 py-2 text-sm border transition-colors",
                  isDark ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20" : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100"
                )}>Copy</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={cx("mt-3 text-xs text-center", isDark ? "text-neutral-500" : "text-neutral-400")}>
        Generated using crypto.getRandomValues() · Nothing leaves your browser · Ctrl/⌘ + L toggles theme
      </div>

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">{toast}</div>}
    </div>
  );
}
