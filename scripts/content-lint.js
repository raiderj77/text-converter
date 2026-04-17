/**
 * content-lint.js — Content compliance linter for flipmycase.com
 * Scans content/**\/*.{md,mdx} and app/components/lib/**\/*.{tsx,ts} for:
 *   - Personal name exposure (site owner)
 * Exit code 1 on failure, 0 on pass.
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

let failures = 0;

function fail(file, line, msg) {
  const rel = relative(ROOT, file);
  console.error(`  ❌ ${rel}:${line} — ${msg}`);
  failures++;
}

function getFiles(dir, extensions) {
  const results = [];
  if (!existsSync(dir)) return results;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getFiles(fullPath, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

/**
 * Check for personal name exposure.
 * The site owner's name must never appear in public content or code.
 */
function checkPersonalName(file, lines) {
  // About pages exempt — real name required for AdSense E-E-A-T compliance per April 2026 decision.
  const PERSONAL_NAME_EXEMPT = [
    'app/about/page.tsx',
    'app/about/jason-ramirez/page.tsx'
  ];
  if (PERSONAL_NAME_EXEMPT.some(p => file.replaceAll('\\', '/').includes(p))) return;

  const namePattern = /\bJason\s+Ramirez\b/i;
  for (let i = 0; i < lines.length; i++) {
    if (namePattern.test(lines[i])) {
      fail(file, i + 1, "Personal name detected — never expose site owner's name");
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log("🔤 flipmycase.com content lint\n");

const contentFiles = getFiles(resolve(ROOT, "content"), [".md", ".mdx"]);
const srcFiles = [
  ...getFiles(resolve(ROOT, "app"), [".tsx", ".ts"]),
  ...getFiles(resolve(ROOT, "components"), [".tsx", ".ts"]),
  ...getFiles(resolve(ROOT, "lib"), [".tsx", ".ts"]),
];
const allFiles = [...contentFiles, ...srcFiles];

console.log(`  Scanning ${contentFiles.length} content files and ${srcFiles.length} source files...\n`);

for (const file of allFiles) {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n");

  checkPersonalName(file, lines);
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log("\n" + "=".repeat(50));
if (failures > 0) {
  console.error(`\n💥 ${failures} content issue(s) found — fix before deploying.\n`);
  process.exit(1);
} else {
  console.log("\n🎉 All content checks passed.\n");
  process.exit(0);
}
