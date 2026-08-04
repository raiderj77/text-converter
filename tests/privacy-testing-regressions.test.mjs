import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";
import { md5 } from "../lib/md5.js";
import {
  decodeHtmlEntitiesOnce,
  stripMarkupTags,
  validateXml,
} from "../lib/markup-text.js";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

function extractStringArray(source, name) {
  const match = source.match(
    new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`),
  );
  assert.ok(match, `${name} must remain an explicit readonly array`);
  return [...match[1].matchAll(/"([^"]+)"/g)].map((entry) => entry[1]);
}

function loadConversionExports() {
  const output = ts.transpileModule(read("lib/conversions.ts"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const testModule = { exports: {} };
  new Function("module", "exports", output)(testModule, testModule.exports);
  return testModule.exports;
}

test("tool inventory matches the live registry and actual localStorage usage", () => {
  const config = read("lib/config.ts");
  const registry = config.slice(
    config.indexOf("export const tools"),
    config.indexOf("/** Category display order"),
  );
  const liveSlugs = [...registry.matchAll(/\bslug:\s*"([^"]*)"/g)].map(
    (entry) => entry[1],
  );
  assert.equal((registry.match(/\blive:\s*true/g) ?? []).length, liveSlugs.length);

  const inventory = read("lib/tool-inventory.ts");
  const referenceGuideSlugs = extractStringArray(inventory, "REFERENCE_GUIDE_SLUGS");
  const localStorageSlugs = extractStringArray(inventory, "LOCAL_STORAGE_TOOL_SLUGS");
  const interactiveSlugs = liveSlugs.filter((slug) => !referenceGuideSlugs.includes(slug));
  const pageMemorySlugs = interactiveSlugs.filter((slug) => !localStorageSlugs.includes(slug));

  assert.deepEqual(referenceGuideSlugs, [
    "camelcase-vs-snake-case",
    "text-tools-for-developers",
    "json-vs-yaml-vs-xml",
  ]);
  assert.equal(liveSlugs.length, 78);
  assert.equal(interactiveSlugs.length, 75);
  assert.equal(referenceGuideSlugs.length, 3);
  assert.equal(localStorageSlugs.length, 25);
  assert.equal(pageMemorySlugs.length, 50);
  assert.equal(new Set(localStorageSlugs).size, localStorageSlugs.length);
  assert.ok(localStorageSlugs.every((slug) => interactiveSlugs.includes(slug)));

  const actualLocalStorageSlugs = interactiveSlugs.filter((slug) => {
    const page = read(slug ? `app/${slug}/page.tsx` : "app/page.tsx");
    const componentImports = [
      ...page.matchAll(/@\/components\/tools\/([^"']+)/g),
    ].map((entry) => entry[1]);
    assert.ok(componentImports.length > 0, `${slug || "/"} must import an interactive component`);

    return componentImports.some((component) => {
      const componentPath = `components/tools/${component}.tsx`;
      assert.ok(fs.existsSync(path.join(root, componentPath)), `${componentPath} must exist`);
      return /\blocalStorage\b/.test(read(componentPath));
    });
  });

  assert.deepEqual(
    [...actualLocalStorageSlugs].sort(),
    [...localStorageSlugs].sort(),
    "the public storage classification must follow the route's current component code",
  );
});

test("privacy center samples use exact deterministic implementation vectors", () => {
  const { toCamelCase, toSlug, toUpperCase } = loadConversionExports();

  assert.equal(toUpperCase("Flip my case"), "FLIP MY CASE");
  assert.equal(toCamelCase("Flip my case"), "flipMyCase");
  assert.equal(toSlug("  Hello, World!  "), "hello-world");
  assert.equal(md5("abc"), "900150983cd24fb0d6963f7d28e17f72");
  assert.equal(
    stripMarkupTags("<p>Hello <strong>world</strong>.</p>"),
    "Hello world.",
  );
  assert.equal(decodeHtmlEntitiesOnce("&amp;lt; &copy; &#x1F600;"), "&lt; © 😀");
  assert.equal(validateXml('<root><item id="1">ok</item></root>'), null);

  const runner = read("components/privacy-test-runner.tsx");
  for (const implementation of [
    "toUpperCase",
    "toCamelCase",
    "toSlug",
    "md5",
    "stripMarkupTags",
    "decodeHtmlEntitiesOnce",
    "validateXml",
  ]) {
    assert.match(runner, new RegExp(`execute: \\(\\) =>[\\s\\S]{0,120}${implementation}\\(`));
  }
  assert.match(runner, /type="button"/);
  assert.match(runner, /role="status" aria-live="polite"/);
  assert.match(runner, /<caption className="sr-only">/);
  assert.doesNotMatch(runner, /useEffect|localStorage\.|fetch\(|navigator\.clipboard/);
});

test("privacy center is discoverable and avoids unsupported assurance claims", () => {
  const page = read("app/privacy-and-testing/page.tsx");
  const discovery = [
    read("components/layout/footer.tsx"),
    read("app/privacy/page.tsx"),
    read("app/terms/page.tsx"),
    read("app/sitemap.ts"),
    read("public/llms.txt"),
  ];

  assert.match(page, /alternates: \{ canonical: pageUrl \}/);
  assert.match(page, /<BreadcrumbSchema/);
  assert.doesNotMatch(page, /FaqSchema|WebAppSchema|SoftwareApplication|FAQPage/);
  assert.doesNotMatch(
    page,
    /(?:100\s*%|test percentage|all tools (?:are )?verified|zero data|no server|never uploaded)/i,
  );
  for (const source of discovery) {
    assert.match(source, /privacy-and-testing/);
  }
});
