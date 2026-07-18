import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

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
