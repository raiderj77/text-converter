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
} from "../lib/storage-hydration.js";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

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
