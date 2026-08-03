import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const toolPath = path.join(root, "components/tools/password-generator.tsx");
const toolSource = fs.readFileSync(toolPath, "utf8");
const pageSource = fs.readFileSync(path.join(root, "app/password-generator/page.tsx"), "utf8");

function loadToolExports() {
  const output = ts.transpileModule(toolSource, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const testModule = { exports: {} };
  const requireFromSource = createRequire(toolPath);
  const localRequire = (specifier) => {
    if (specifier === "@/lib/utils") return { cx: (...values) => values.filter(Boolean).join(" ") };
    if (specifier === "@/components/layout/theme-provider") return { useTheme: () => ({ isDark: true }) };
    if (specifier === "@/lib/secure-random") return { secureRandomInt: (minimum) => minimum };
    return requireFromSource(specifier);
  };

  new Function("require", "module", "exports", output)(
    localRequire,
    testModule,
    testModule.exports,
  );
  return testModule.exports;
}

const {
  calculateStrength,
  generatePassword,
  passwordCharacterPool,
  passwordsForSettings,
  passwordsForView,
} = loadToolExports();

const allSets = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};

test("the 91-character password pool cannot silently generate a blank password", () => {
  const fullPool = passwordCharacterPool(allSets, "");
  assert.equal(fullPool.length, 91);
  assert.equal(new Set(fullPool).size, 91);
  assert.equal(passwordCharacterPool(allSets, fullPool), "");
  assert.throws(
    () => generatePassword(20, allSets, fullPool),
    /At least one character must remain after exclusions/,
  );

  assert.match(toolSource, /disabled=\{passwordPoolEmpty\}/);
  assert.match(toolSource, /All enabled characters are excluded/);
  assert.match(toolSource, /role=\{passwordPoolEmpty \? "alert" : undefined\}/);
});

test("generated output is hidden as soon as its settings become stale", () => {
  const batch = { passwords: ["old-result"], settingsKey: "old-settings" };
  assert.deepEqual(passwordsForSettings(batch, "old-settings"), ["old-result"]);
  assert.deepEqual(passwordsForSettings(batch, "new-settings"), []);
  assert.deepEqual(passwordsForSettings(null, "new-settings"), []);

  assert.match(toolSource, /autoGenerationId\.current !== generationId/);
  assert.match(toolSource, /manualGenerationKey\.current === settingsKey/);
  assert.doesNotMatch(toolSource, /setPasswords\(/);
});

test("history view consistently drives rows, count, copy payload, and strength visibility", () => {
  const current = ["current-a", "current-b"];
  const history = ["history-a", "history-b", "history-c"];
  assert.deepEqual(passwordsForView(false, current, history), current);
  assert.deepEqual(passwordsForView(true, current, history), history);

  assert.match(toolSource, /const displayedPasswords = passwordsForView\(showHistory, passwords, history\)/);
  assert.match(toolSource, /writeText\(displayedPasswords\.join\("\\n"\)\)/);
  assert.match(toolSource, /Copied \$\{displayedPasswords\.length\}/);
  assert.match(toolSource, /!showHistory && strength && passwords\[0\]/);
  assert.match(toolSource, /History \(\$\{history\.length\}\)/);
  assert.doesNotMatch(toolSource, /\(showHistory \? history : passwords\)\.map/);
});

test("strength estimates use the exact 91-character pool at 10B guesses per second", () => {
  const expected = [
    { length: 8, bits: 52, crackTime: "5.4 days" },
    { length: 12, bits: 78, crackTime: "1 million years" },
    { length: 16, bits: 104, crackTime: "70 trillion years" },
    { length: 20, bits: 130, crackTime: "4.8 sextillion years" },
  ];

  for (const row of expected) {
    const result = calculateStrength("password", {
      passwordLength: row.length,
      passwordPoolSize: 91,
      passphraseWordCount: 5,
      passphraseIncludesNumber: true,
      pinLength: 6,
    });
    assert.equal(result.bits, row.bits, `entropy for length ${row.length}`);
    assert.equal(result.crackTime, row.crackTime, `crack time for length ${row.length}`);
  }

  for (const copy of ["~5.4 days", "~1.0 million years", "~70 trillion years", "~4.8 sextillion years"]) {
    assert.match(pageSource, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("public security copy is qualified and matches current standards", () => {
  assert.match(pageSource, /cryptographically strong pseudorandom values/);
  assert.match(pageSource, /NIST SP 800-63B-4/);
  assert.match(pageSource, /single authentication factor to be at least 15 characters/);
  assert.match(pageSource, /required minimum may be 8 characters/);
  assert.doesNotMatch(pageSource, /truly random/i);
  assert.doesNotMatch(pageSource, /same (?:randomness source|cryptographic randomness|Web Crypto API used by password managers)/i);

  assert.match(pageSource, /automatic previews created after settings change are not added/);
  assert.match(pageSource, /Do not substitute this output for system-issued API tokens/);
  assert.doesNotMatch(pageSource, /suitable for JWT secrets|Best for:.*encryption keys/i);
});
