#!/usr/bin/env node
/**
 * fix-pages.mjs — Site-wide audit fix for ISSUES 2, 3, 4
 *
 * ISSUE 2: Add/update "Last updated: March 16, 2026" on all pages
 * ISSUE 3: Add sr-only H2 block to tool pages missing one + expand short H2s
 * ISSUE 4: Expand homepage short H2s (covered by ISSUE 3 logic)
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname, relative } from "path";

const APP_DIR = "app";
const TARGET_DATE = "March 16, 2026";
const LAST_UPDATED_LINE = `<p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: ${TARGET_DATE}</p>`;

// Abbreviation map for proper casing of slug words
const ABBR = {
  json: "JSON", csv: "CSV", xml: "XML", yaml: "YAML", html: "HTML",
  url: "URL", uuid: "UUID", jwt: "JWT", sql: "SQL", css: "CSS",
  ai: "AI", qr: "QR", nato: "NATO", rot13: "ROT13", js: "JS",
  ip: "IP", api: "API", seo: "SEO",
};

function slugToTitle(slug) {
  if (!slug || slug === "." || slug === "") return "Text Case Converter";
  return slug
    .split("-")
    .map((w) => ABBR[w.toLowerCase()] || w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function findPages(dir) {
  let results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results = results.concat(findPages(full));
    } else if (entry === "page.tsx") {
      results.push(full);
    }
  }
  return results;
}

function countWords(text) {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

const pages = findPages(APP_DIR);
let updatedCount = 0;
const changeLog = [];

for (const filePath of pages) {
  let content = readFileSync(filePath, "utf8");
  const original = content;
  const fileChanges = [];

  // Get slug from path
  const relDir = relative(APP_DIR, dirname(filePath)).replace(/\\/g, "/");
  const slug = relDir === "." || relDir === "" ? "" : relDir;
  const toolName = slugToTitle(slug);

  // Skip dynamic route pages like blog/[slug]
  if (slug.includes("[")) {
    continue;
  }

  // ===== ISSUE 2: Last updated date =====
  if (content.includes(TARGET_DATE)) {
    // Already has correct date — no change needed
  } else if (/<p[^>]*>Last updated:[^<]*<\/p>/.test(content)) {
    // Has a "Last updated" line but wrong date/format — replace it
    content = content.replace(
      /<p[^>]*>Last updated:[^<]*<\/p>/,
      LAST_UPDATED_LINE
    );
    fileChanges.push("updated date format");
  } else if (content.includes("</h1>")) {
    // No "Last updated" line at all — add after H1
    const h1End = content.indexOf("</h1>");
    const afterH1 = h1End + "</h1>".length;
    // Detect indentation from the H1 line
    const lineStart = content.lastIndexOf("\n", h1End) + 1;
    const lineContent = content.slice(lineStart, h1End);
    const indentMatch = lineContent.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : "        ";
    content =
      content.slice(0, afterH1) +
      "\n" +
      indent +
      LAST_UPDATED_LINE +
      content.slice(afterH1);
    fileChanges.push("added last updated date");
  }

  // ===== ISSUE 3a: sr-only H2 block for tool pages =====
  const hasToolImport = /@\/components\/tools\//.test(content);
  const hasSrOnlyH2 = /sr-only[\s\S]{0,500}<h2/.test(content);

  if (hasToolImport && !hasSrOnlyH2) {
    // Find the tool component's wrapping div: <div className="mt-4">\n  <XxxTool
    const toolDivRegex = /(\n(\s*))<div className="mt-4">\s*\n\s*<\w+Tool/;
    const toolDivMatch = content.match(toolDivRegex);

    if (toolDivMatch) {
      const indent = toolDivMatch[2]; // indentation of the div
      const srOnlyBlock = [
        "",
        `${indent}{/* Descriptive headings for screen readers */}`,
        `${indent}<div className="sr-only">`,
        `${indent}  <h2>How to Use the ${toolName} Tool</h2>`,
        `${indent}  <h2>${toolName} Features and Options</h2>`,
        `${indent}  <h2>About the Free Online ${toolName}</h2>`,
        `${indent}</div>`,
        "",
      ].join("\n");

      // Insert right before the tool's wrapping div
      const insertPoint = content.indexOf(toolDivMatch[0]);
      content =
        content.slice(0, insertPoint) +
        srOnlyBlock +
        content.slice(insertPoint);
      fileChanges.push("added sr-only H2 block");
    }
  }

  // ===== ISSUE 3b & 4: Expand short visible H2s =====
  // Match H2 elements — handles both single-line and multi-line
  const h2Regex = /(<h2[^>]*>)\s*([\s\S]*?)\s*(<\/h2>)/g;
  let match;
  const h2Replacements = [];

  while ((match = h2Regex.exec(content)) !== null) {
    const fullMatch = match[0];
    const text = match[2].trim();

    // Skip JSX expressions
    if (text.includes("{") || text.includes("}")) continue;

    // Skip if inside sr-only div (look backwards for sr-only within 500 chars)
    const lookback = content.slice(Math.max(0, match.index - 500), match.index);
    // Check if we're inside an open sr-only div that hasn't been closed
    const lastSrOnly = lookback.lastIndexOf("sr-only");
    if (lastSrOnly !== -1) {
      const afterSrOnly = lookback.slice(lastSrOnly);
      // If there's an sr-only but no closing </div> after it, we're inside it
      const closingDivs = (afterSrOnly.match(/<\/div>/g) || []).length;
      const openingDivs = (afterSrOnly.match(/<div/g) || []).length;
      if (openingDivs > closingDivs) continue;
    }

    const words = countWords(text);
    if (words >= 4) continue;

    // Determine expansion
    let expanded = text;

    if (text === "Related Tools") {
      expanded = "Related Free Online Tools";
    } else if (text === "Frequently Asked Questions") {
      expanded = `Frequently Asked Questions About ${toolName}`;
    } else if (text === "More Free Text Tools") {
      // Already 4 words — skip
      continue;
    } else if (text === "More Free Developer Tools") {
      // Already 4 words — skip
      continue;
    } else if (text === "Internal Linking") {
      expanded = "Internal Links and Resources";
    } else if (words === 1) {
      expanded = `${text} — Free Online Tool`;
    } else if (words === 2) {
      expanded = `${text} for ${toolName}`;
    } else if (words === 3) {
      // 3 words — try to expand to 4+
      expanded = `${text} for ${toolName}`;
    }

    if (expanded !== text && countWords(expanded) >= 4) {
      h2Replacements.push({ original: fullMatch, text, expanded });
    }
  }

  // Apply H2 replacements (use simple string replace — each fullMatch should be unique)
  for (const rep of h2Replacements) {
    const newH2 = rep.original.replace(rep.text, rep.expanded);
    content = content.replace(rep.original, newH2);
    fileChanges.push(`expanded H2: "${rep.text}" → "${rep.expanded}"`);
  }

  // Write if changed
  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    updatedCount++;
    changeLog.push({ file: filePath, changes: fileChanges });
    console.log(`✓ ${filePath} (${fileChanges.length} changes)`);
    for (const c of fileChanges) {
      console.log(`    - ${c}`);
    }
  }
}

console.log(`\n========================================`);
console.log(`Total files updated: ${updatedCount}`);
console.log(`========================================`);
