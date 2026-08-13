import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import ts from "typescript";
import {
  decodeHtmlEntitiesOnce,
  removeMarkupComments,
  stripMarkupTags,
  tokenizeMarkup,
  validateXml,
} from "../lib/markup-text.js";
import {
  deferStorageHydration,
  persistAfterStorageHydration,
  safeGetLocalStorage,
  safeRemoveLocalStorage,
} from "../lib/storage-hydration.js";
import { hmacMd5, md5 } from "../lib/md5.js";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("advertising remains fail-closed until external readiness gates are verified", () => {
  const adSlot = read("components/ui/ad-slot.tsx");
  const adsTxt = read("public/ads.txt");
  const standards = read("EMPIRE_BUILD_STANDARDS.md");
  const readiness = read("docs/ADSENSE_READINESS.md");

  assert.match(adSlot, /return null/);
  assert.doesNotMatch(adSlot, /NEXT_PUBLIC_|adsbygoogle|pagead2/);
  assert.match(adsTxt, /^google\.com, pub-7171402107622932, DIRECT, f08c47fec0942fa0$/m);
  assert.match(adsTxt, /^OWNERDOMAIN=flipmycase\.com$/m);
  assert.doesNotMatch(adsTxt, /^MANAGERDOMAIN=/m);
  assert.doesNotMatch(standards, /Include `OWNERDOMAIN` and `MANAGERDOMAIN`/);
  assert.match(readiness, /AdSense lists `flipmycase\.com` as \*\*Ready\*\*/);
  assert.match(readiness, /Google-certified CMP/);
  assert.match(readiness, /strict-CSP implementation/);
});

test("sitewide navigation avoids reciprocal portfolio links", () => {
  const footer = read("components/layout/footer.tsx");
  const predeploy = read("scripts/predeploy-check.js");

  assert.doesNotMatch(footer, /https?:\/\//i);
  assert.doesNotMatch(predeploy, /sisterSites|Missing cross-site link/);
  for (const route of ["/tools", "/about", "/privacy", "/accessibility"]) {
    assert.ok(footer.includes(`href=\"${route}\"`), `footer is missing ${route}`);
  }
});

test("the non-home Creator Revenue link is nofollow", () => {
  const about = read("app/about/page.tsx");
  const creatorLink = about.match(
    /<a\s+[^>]*href="https:\/\/creatorrevenuecalculator\.com"[^>]*>/s
  );

  assert.ok(creatorLink, "the About page Creator Revenue link is missing");
  assert.match(creatorLink[0], /\brel="nofollow"/);
  assert.doesNotMatch(creatorLink[0], /\bsponsored\b/);
});

test("offline caches are bounded and never retain query-string navigations", () => {
  const worker = read("public/sw.js");

  assert.match(worker, /STATIC_CACHE_LIMIT = 80/);
  assert.match(worker, /PAGE_CACHE_LIMIT = 20/);
  assert.match(worker, /request\.mode === "navigate"/);
  assert.match(worker, /if \(url\.search\)/);
  assert.match(worker, /event\.respondWith\(fetch\(request\)\)/);
});

test("saved browser values are restored before persistence is allowed", async () => {
  const gate = { current: false };
  let browserValue = "saved value";
  let restoredValue = "default value";
  const capturedValue = browserValue;

  deferStorageHydration(gate, () => {
    restoredValue = capturedValue;
  });

  const wroteDefault = persistAfterStorageHydration(gate, () => {
    browserValue = restoredValue;
  });
  assert.equal(wroteDefault, false);
  assert.equal(browserValue, "saved value");

  await new Promise((resolve) => setTimeout(resolve, 5));
  assert.equal(gate.current, true);
  assert.equal(restoredValue, "saved value");

  const wroteUserChange = persistAfterStorageHydration(gate, () => {
    browserValue = "new user value";
  });
  assert.equal(wroteUserChange, true);
  assert.equal(browserValue, "new user value");
});

test("unavailable browser storage is treated as having no saved value", () => {
  assert.equal(
    safeGetLocalStorage("saved-key", () => ({ getItem: () => "saved value" })),
    "saved value"
  );
  assert.equal(
    safeGetLocalStorage("blocked-key", () => {
      throw new DOMException("Storage is blocked", "SecurityError");
    }),
    null
  );
  assert.equal(
    safeGetLocalStorage("blocked-key", () => ({
      getItem: () => {
        throw new DOMException("Storage is blocked", "SecurityError");
      },
    })),
    null
  );

  const blockedStorage = {
    getItem: () => null,
    removeItem: () => {
      throw new DOMException("Storage is blocked", "SecurityError");
    },
  };
  assert.equal(safeRemoveLocalStorage("retired-key", () => blockedStorage), false);

  const openStorage = new Map([["retired-key", "saved value"]]);
  assert.equal(
    safeRemoveLocalStorage("retired-key", () => ({
      removeItem: (key) => openStorage.delete(key),
    })),
    true
  );
  assert.equal(openStorage.has("retired-key"), false);
});

test("blocked browser-storage writes fall back without throwing", () => {
  const gate = { current: true };
  assert.equal(
    persistAfterStorageHydration(gate, () => {
      throw new DOMException("Storage quota exceeded", "QuotaExceededError");
    }),
    false
  );

  const cleanup = read("components/privacy-storage-cleanup.tsx");
  assert.match(cleanup, /safeRemoveLocalStorage\(key\)/);
  assert.doesNotMatch(cleanup, /localStorage\.removeItem/);
});

test("persisted components use the hydration gate for reads and writes", () => {
  const persistedComponents = [
    "components/layout/theme-provider.tsx",
    "components/tools/add-prefix-suffix.tsx",
    "components/tools/bold-italic-text-generator.tsx",
    "components/tools/bold-text-generator.tsx",
    "components/tools/bubble-text-generator.tsx",
    "components/tools/color-code-converter.tsx",
    "components/tools/cron-expression-builder.tsx",
    "components/tools/duplicate-remover.tsx",
    "components/tools/fancy-text-generator.tsx",
    "components/tools/italic-text-generator.tsx",
    "components/tools/list-to-text.tsx",
    "components/tools/morse-code-translator.tsx",
    "components/tools/random-number-generator.tsx",
    "components/tools/roman-numeral-converter.tsx",
    "components/tools/small-caps-generator.tsx",
    "components/tools/smart-quotes-converter.tsx",
    "components/tools/snake-kebab-converter.tsx",
    "components/tools/strikethrough-text-generator.tsx",
    "components/tools/subscript-generator.tsx",
    "components/tools/superscript-generator.tsx",
    "components/tools/text-repeater.tsx",
    "components/tools/toggle-case-converter.tsx",
    "components/tools/underline-text-generator.tsx",
    "components/tools/upside-down-text-generator.tsx",
    "components/tools/wide-text-generator.tsx",
    "components/tools/word-counter.tsx",
  ];
  for (const file of persistedComponents) {
    const source = read(file);
    assert.match(source, /deferStorageHydration\(storageHydration,/);
    assert.match(source, /persistAfterStorageHydration\(storageHydration,/);
    assert.match(source, /safeGetLocalStorage\(/);
  }
});

test("password generation is unbiased and entropy copy matches its settings", () => {
  const tool = read("components/tools/password-generator.tsx");
  const page = read("app/password-generator/page.tsx");

  assert.match(tool, /import \{ secureRandomInt \} from "@\/lib\/secure-random"/);
  assert.match(tool, /passwordCharacterPool\(sets, exclude\)\.length/);
  assert.match(tool, /passphraseWordCount \* Math\.log2\(WORDS\.length\)/);
  assert.doesNotMatch(tool, /cryptoRand|% chars\.length|% 10/);
  assert.match(page, /928-word list/);
  assert.match(page, /about 49 bits of entropy/);
  assert.doesNotMatch(page, /1,000\+ word list|over 50 bits of entropy/);
});

test("MD5 and HMAC-MD5 preserve UTF-8 and raw file bytes", () => {
  assert.equal(md5(""), "d41d8cd98f00b204e9800998ecf8427e");
  assert.equal(md5("abc"), "900150983cd24fb0d6963f7d28e17f72");
  assert.equal(md5("\u{1f600}"), "2a02eac39d716a70ecf37579185927b6");
  assert.equal(
    md5(Uint8Array.from([0xff, 0x00, 0x80, 0x41])),
    "6033ea5290a344c63a4ce59caad33de9"
  );

  // RFC 2202 HMAC-MD5 vectors, including a key longer than one MD5 block.
  assert.equal(
    hmacMd5(Uint8Array.from({ length: 16 }, () => 0x0b), "Hi There"),
    "9294727a3638bb1c13f48ef8158bfc9d"
  );
  assert.equal(
    hmacMd5("Jefe", "what do ya want for nothing?"),
    "750c783e6ab0b503eaa86e310a5db738"
  );
  assert.equal(
    hmacMd5(
      Uint8Array.from({ length: 80 }, () => 0xaa),
      "Test Using Larger Than Block-Size Key - Hash Key First"
    ),
    "6b1ab7fe4bd7bf8f0b62e6ce61b9d0cd"
  );

  const tool = read("components/tools/hash-generator.tsx");
  assert.match(tool, /md5\(new Uint8Array\(buffer\)\)/);
  assert.doesNotMatch(tool, /String\.fromCharCode\(bytes\[i\]\)/);
});

test("file hashing only commits the latest active request", () => {
  const tool = read("components/tools/hash-generator.tsx");
  const page = read("app/hash-generator/page.tsx");
  const handleFile = tool.slice(
    tool.indexOf("const handleFile"),
    tool.indexOf("const onDrop")
  );
  const clearAll = tool.slice(
    tool.indexOf("const clearAll"),
    tool.indexOf("const onDrop")
  );

  assert.match(tool, /const fileRequestGeneration = useRef\(0\)/);
  assert.match(handleFile, /const requestId = \+\+fileRequestGeneration\.current/);
  assert.equal((handleFile.match(/file\.arrayBuffer\(\)/g) ?? []).length, 1);
  assert.match(handleFile, /hashBytes\(algo, buffer, activeHmacKey\)/);
  assert.match(handleFile, /if \(requestId !== fileRequestGeneration\.current\) return/);
  assert.match(
    handleFile,
    /if \(requestId === fileRequestGeneration\.current\) \{\s+setFileHashes\(results\)/
  );
  assert.match(
    handleFile,
    /if \(requestId === fileRequestGeneration\.current\) \{\s+setHashing\(false\)/
  );
  assert.match(clearAll, /fileRequestGeneration\.current \+= 1/);
  assert.match(clearAll, /setFileHashes\(\{\}\)/);
  assert.match(clearAll, /setHashing\(false\)/);
  assert.match(clearAll, /setFileError\(""\)/);
  assert.match(tool, /role="alert"/);
  assert.doesNotMatch(page, /No file size limit|any format, any size|1 GB\+|hundred(?:s)? of MB in seconds/i);
});

test("hash comparison keeps text and file matches distinct", () => {
  const source = read("components/tools/hash-generator.tsx");
  const snippet = source.slice(
    source.indexOf("type Algorithm"),
    source.indexOf("function arrayBufferToHex")
  );
  const output = ts.transpileModule(snippet, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const testModule = { exports: {} };
  new Function("module", "exports", output)(testModule, testModule.exports);
  const { findHashMatches } = testModule.exports;

  const textMd5 = "900150983cd24fb0d6963f7d28e17f72";
  const fileMd5 = "9dd4e461268c8034f5c8564e155c67a6";
  assert.deepEqual(
    findHashMatches(textMd5.toUpperCase(), { MD5: textMd5 }, { MD5: fileMd5 }),
    ["Text MD5"]
  );
  assert.deepEqual(
    findHashMatches(textMd5, { MD5: textMd5 }, { MD5: textMd5 }),
    ["Text MD5", "File MD5"]
  );
  assert.deepEqual(
    findHashMatches(fileMd5, { MD5: textMd5 }, { MD5: fileMd5 }),
    ["File MD5"]
  );
  assert.doesNotMatch(source, /const allHashes = \{ \.\.\.hashes, \.\.\.fileHashes \}/);
  assert.match(source, /compareMatches\.join\(", "\)/);
});

function loadTsxExports(file) {
  const filePath = path.join(root, file);
  const output = ts.transpileModule(fs.readFileSync(filePath, "utf8"), {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const testModule = { exports: {} };
  const requireFromSource = createRequire(filePath);
  new Function("require", "module", "exports", output)(
    requireFromSource,
    testModule,
    testModule.exports
  );
  return testModule.exports;
}

test("slug generation safely handles empty and regex-special separators", () => {
  const { generateSlug } = loadTsxExports("components/tools/slug-generator.tsx");

  assert.equal(generateSlug("  H\u00e9llo, World!  ", { separator: "-" }), "hello-world");
  assert.equal(generateSlug("  Hello  World  ", { separator: "" }), "helloworld");
  assert.equal(generateSlug("abcdefghijk", { separator: "", maxLength: 5 }), "abcde");

  for (const separator of [".", "*", "+", "?", "^", "$", "{", "}", "(", ")", "|", "[", "]", "\\"]) {
    assert.equal(
      generateSlug("  Hello  World  ", { separator }),
      `hello${separator}world`,
      `separator ${JSON.stringify(separator)} should be treated literally`
    );
  }

  assert.equal(
    generateSlug("Hello World", { separator: "_", lowercase: false, uppercase: true }),
    "HELLO_WORLD"
  );
});

test("time and random output are stable during initial hydration", () => {
  const lorem = read("components/tools/lorem-ipsum.tsx");
  const unix = read("components/tools/unix-timestamp-converter.tsx");
  const cron = read("components/tools/cron-expression-builder.tsx");

  assert.match(lorem, /function seededRandom/);
  assert.match(lorem, /generateText\(activeStyle, mode, count, startWithOpener, seed\)/);
  assert.doesNotMatch(lorem, /Math\.random\(\)/);
  assert.match(unix, /useState<number \| null>\(null\)/);
  assert.match(unix, /now === null \? "Loading current time…"/);
  assert.match(cron, /const \[nextRuns, setNextRuns\] = useState<Date\[]>\(\[\]\)/);
  assert.match(cron, /setNextRuns\(getNextExecutions\(expression, 5\)\)/);
});

test("fields flagged by the rendered audit have accessible names", () => {
  const expectations = new Map([
    ["components/tools/case-converter.tsx", ["Text to convert"]],
    ["components/tools/word-counter.tsx", ["Text to count"]],
    ["components/tools/duplicate-remover.tsx", ["Lines to deduplicate"]],
    ["components/tools/string-encoder.tsx", ["Text to encode", "Text to decode"]],
    ["components/tools/json-formatter.tsx", ["JSON input"]],
    ["components/tools/text-diff.tsx", ["aria-label={box.label}"]],
    ["components/tools/password-generator.tsx", ["Characters to exclude"]],
    ["components/tools/regex-tester.tsx", ["Regular expression pattern", "Test string"]],
    ["components/tools/hash-generator.tsx", ["Text to hash"]],
    ["components/tools/text-sorter.tsx", ["Text to sort", "Sorted text output"]],
    ["components/tools/text-reverser.tsx", ["Text to reverse", "Reversed text output"]],
    ["components/tools/spongebob-case-converter.tsx", ["Text to convert to SpongeBob case", "SpongeBob case output"]],
    ["components/tools/slug-generator.tsx", ["Text to convert to a URL slug"]],
    ["components/tools/plain-text-converter.tsx", ["Rich text to convert to plain text"]],
    ["components/tools/find-and-replace.tsx", ["Text to search", "Text to find", "Replacement text"]],
    ["components/tools/extract-urls.tsx", ["Text containing URLs"]],
    ["components/tools/remove-html-tags.tsx", ["HTML content", "HTML tags to keep"]],
    ["components/tools/text-to-list.tsx", ["Text to convert to a list"]],
    ["components/tools/smart-quotes-converter.tsx", ["Text with quotes to convert"]],
    ["components/tools/unicode-lookup.tsx", ["Search Unicode characters"]],
    ["components/tools/underscore-conventions.tsx", ["Text to convert between underscore conventions"]],
  ]);

  for (const [file, names] of expectations) {
    const source = read(file);
    for (const name of names) assert.ok(source.includes(name), `${file} is missing ${name}`);
  }
});

test("markup removal handles quoted delimiters and malformed nested tag text", () => {
  const source =
    '<div title="1 > 0">Hello <strong>world</strong><!-- hidden --><scr<script>ipt>alert(1)</script></div>';

  assert.equal(stripMarkupTags(source), "Hello worldipt>alert(1)");
  assert.equal(
    stripMarkupTags('<p>Hello <strong data-label="1 > 0">world</strong></p>', ["strong"]),
    'Hello <strong data-label="1 > 0">world</strong>'
  );
  assert.equal(removeMarkupComments("before<!-- private -->after"), "beforeafter");
  assert.equal(tokenizeMarkup('<a title="1 > 0">x</a>').filter((token) => token.type === "tag").length, 2);
});

test("HTML entities are decoded exactly once", () => {
  assert.equal(decodeHtmlEntitiesOnce("&lt;b&gt;"), "<b>");
  assert.equal(decodeHtmlEntitiesOnce("&amp;lt;b&amp;gt;"), "&lt;b&gt;");
  assert.equal(decodeHtmlEntitiesOnce("&#60;b&#x3e;"), "<b>");
});

test("XML validation is structural and does not create a browser DOM", () => {
  assert.equal(validateXml('<?xml version="1.0"?><root label="1 > 0"><item /></root>'), null);
  assert.equal(validateXml("<root><![CDATA[<safe>]]><item>value</item></root>"), null);
  assert.match(validateXml("<root><item></root>"), /Expected <\/item>/);
  assert.match(validateXml("<one /><two />"), /exactly one root element/);
  assert.match(validateXml("<root attr=nope />"), /must use quotes/);
  assert.match(validateXml("<root>1 < 2</root>"), /unescaped/);
});
