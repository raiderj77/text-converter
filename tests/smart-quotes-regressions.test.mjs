import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const componentPath = path.join(root, "components/tools/smart-quotes-converter.tsx");
const source = fs.readFileSync(componentPath, "utf8");

function loadConversionHelpers() {
  const snippet = source.slice(
    source.indexOf("export function straighten"),
    source.indexOf("export function SmartQuotesConverterTool")
  );
  const output = ts.transpileModule(snippet, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const testModule = { exports: {} };
  new Function("module", "exports", output)(testModule, testModule.exports);
  return testModule.exports;
}

const { straighten, typeset } = loadConversionHelpers();

test("typeset keeps nested single quotations balanced", () => {
  assert.equal(
    typeset('"She said \'hello\'."').result,
    "\u201cShe said \u2018hello\u2019.\u201d"
  );
  assert.equal(
    typeset('"He said, \'don\'t stop.\'"').result,
    "\u201cHe said, \u2018don\u2019t stop.\u2019\u201d"
  );
  assert.equal(
    typeset('"She said \'hello\'"').result,
    "\u201cShe said \u2018hello\u2019\u201d"
  );
  assert.equal(typeset('"one" "two"').result, "\u201cone\u201d \u201ctwo\u201d");
});

test("typeset uses right apostrophes for common leading elisions", () => {
  assert.equal(
    typeset("'tis the '90s; rock 'n' roll; class of '24").result,
    "\u2019tis the \u201990s; rock \u2019n\u2019 roll; class of \u201924"
  );
  assert.equal(typeset("we're ready; James' book").result, "we\u2019re ready; James\u2019 book");
});

test("typeset converts common feet-and-inches measurements to prime marks", () => {
  assert.equal(typeset("He is 6'2\" tall.").result, "He is 6\u20322\u2033 tall.");
  assert.equal(typeset("The opening is 6' 2\" high.").result, "The opening is 6\u2032 2\u2033 high.");
  assert.equal(typeset('The answer was "6".').result, "The answer was \u201c6\u201d.");
  assert.equal(straighten("He is 6\u20322\u2033 tall.").result, "He is 6'2\" tall.");
});

test("implementation and public copy describe deterministic heuristics", () => {
  const page = fs.readFileSync(
    path.join(root, "app/smart-quotes-converter/page.tsx"),
    "utf8"
  );

  assert.doesNotMatch(source, /let openDouble = true/);
  assert.doesNotMatch(source, /Better approach|Determine based on position/);
  assert.doesNotMatch(page, /publication-ready text|intelligently converted/);
  assert.match(page, /Ambiguous or language-specific quote styles may still need editorial review/);
});
