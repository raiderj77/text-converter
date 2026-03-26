#!/usr/bin/env node
/**
 * fix-pages-cleanup.mjs — Fix awkward H2 expansions from the first pass.
 * Legal/info pages: revert H2 changes entirely.
 * Guide/comparison pages: use better contextual expansions.
 * Tool pages: replace "for X" pattern with natural 4+ word headings.
 */

import { readFileSync, writeFileSync } from "fs";

// Map of file → array of [bad, good] replacements
const fixes = {
  // ===== LEGAL / INFO PAGES — revert H2 changes =====
  "app/about/page.tsx": [
    ["What Is FlipMyCase? for About", "What Is FlipMyCase?"],
    ["Our Editorial Approach for About", "Our Editorial Approach"],
    ["Privacy Commitment for About", "Privacy Commitment"],
  ],
  "app/accessibility/page.tsx": [
    ["Our Commitment for Accessibility", "Our Commitment"],
    ["Measures Taken for Accessibility", "Measures Taken"],
    ["Areas for Improvement for Accessibility", "Areas for Improvement"],
    ["Feedback and Contact for Accessibility", "Feedback and Contact"],
    ["Technical Specifications for Accessibility", "Technical Specifications"],
    ["Assessment Approach for Accessibility", "Assessment Approach"],
    ["Formal Approval for Accessibility", "Formal Approval"],
    ["Date — Free Online Tool", "Date"],
  ],
  "app/blog/page.tsx": [
    ["Free Text Tools for Blog", "Free Text Tools"],
  ],
  "app/contact/page.tsx": [
    ["Privacy — Free Online Tool", "Privacy"],
  ],
  "app/cookies/page.tsx": [
    ["What are cookies? for Cookies", "What are cookies?"],
    ["Your cookie choices for Cookies", "Your cookie choices"],
    ["Third-party cookies for Cookies", "Third-party cookies"],
    ["Local Storage for Cookies", "Local Storage"],
    ["Contact us for Cookies", "Contact us"],
  ],
  "app/learn/page.tsx": [
    ["Quick Definitions for Learn", "Quick Definitions"],
    ["Common Writing Cases for Learn", "Common Writing Cases"],
    ["Developer Cases for Learn", "Developer Cases"],
    ["Common Questions for Learn", "Common Questions"],
    ["Try the Tools for Learn", "Try the Tools"],
  ],
  "app/privacy/page.tsx": [
    ["Information We Collect for Privacy", "Information We Collect"],
    ["Local Storage for Privacy", "Local Storage"],
    ["Analytics — Free Online Tool", "Analytics"],
    ["Advertising — Free Online Tool", "Advertising"],
    ["Third-Party Services for Privacy", "Third-Party Services"],
    ["Data Retention for Privacy", "Data Retention"],
    ["Data Security for Privacy", "Data Security"],
    ["Your Privacy Rights for Privacy", "Your Privacy Rights"],
    ["Contact — Free Online Tool", "Contact"],
  ],
  "app/terms/page.tsx": [
    ["No Warranty for Terms", "No Warranty"],
    ["Limitation of Liability for Terms", "Limitation of Liability"],
    ["Intellectual Property for Terms", "Intellectual Property"],
    ["Contact — Free Online Tool", "Contact"],
  ],

  // ===== GUIDE / COMPARISON PAGES — better expansions =====
  "app/camelcase-vs-snake-case/page.tsx": [
    ["What Is camelCase? for Camelcase Vs Snake Case", "What Is the camelCase Convention?"],
    ["What Is snake_case? for Camelcase Vs Snake Case", "What Is the snake_case Convention?"],
    ["What Is kebab-case? for Camelcase Vs Snake Case", "What Is the kebab-case Convention?"],
    ["Converting Between Cases for Camelcase Vs Snake Case", "Converting Between Different Case Styles"],
  ],
  "app/json-vs-yaml-vs-xml/page.tsx": [
    ["What Is JSON? for JSON Vs YAML Vs XML", "What Is JSON Data Format?"],
    ["What Is YAML? for JSON Vs YAML Vs XML", "What Is YAML Data Format?"],
    ["What Is XML? for JSON Vs YAML Vs XML", "What Is XML Data Format?"],
    ["Related Free Tools for JSON Vs YAML Vs XML", "Related Free Developer Tools"],
  ],
  "app/text-tools-for-developers/page.tsx": [
    ["Code Formatting Tools for Text Tools For Developers", "Free Code Formatting Tools"],
    ["Developer Utility Tools for Text Tools For Developers", "Free Developer Utility Tools"],
    ["Data Tools for Text Tools For Developers", "Developer Data Conversion Tools"],
    ["Why Browser-Based Tools? for Text Tools For Developers", "Why Use Browser-Based Developer Tools?"],
  ],

  // ===== TOOL PAGES — fix awkward "for X" expansions =====
  "app/add-prefix-suffix/page.tsx": [
    ["Common Prefix/Suffix Patterns for Add Prefix Suffix", "Common Prefix and Suffix Patterns"],
  ],
  "app/duplicate-line-remover/page.tsx": [
    ["Features — Free Online Tool", "Duplicate Remover Key Features"],
  ],
  "app/fancy-text-generator/page.tsx": [
    ["Available Unicode Styles for Fancy Text Generator", "All Available Unicode Text Styles"],
  ],
  "app/hash-generator/page.tsx": [
    ["Hash Algorithm Comparison for Hash Generator", "Hash Algorithm Comparison Table"],
  ],
  "app/password-generator/page.tsx": [
    ["Password Strength Guide for Password Generator", "Password Strength Assessment Guide"],
    ["More Free Tools for Password Generator", "More Free Online Tools"],
  ],
  "app/qr-code-generator/page.tsx": [
    ["Understanding QR Codes for QR Code Generator", "Understanding QR Code Technology"],
  ],
  "app/readability-analyzer/page.tsx": [
    ["Why Readability Matters for Readability Analyzer", "Why Readability Scores Matter"],
  ],
  "app/spongebob-case-converter/page.tsx": [
    ["SpongeBob Case Examples for Spongebob Case Converter", "SpongeBob Case Conversion Examples"],
  ],
  "app/string-encoder/page.tsx": [
    ["Supported Encoding Formats for String Encoder", "All Supported Encoding Formats"],
  ],
  "app/subscript-generator/page.tsx": [
    ["Subscript Character Reference for Subscript Generator", "Subscript Character Reference Table"],
  ],
  "app/superscript-generator/page.tsx": [
    ["Superscript Character Reference for Superscript Generator", "Superscript Character Reference Table"],
  ],
  "app/text-reverser/page.tsx": [
    ["Reversal Modes Explained for Text Reverser", "Text Reversal Modes Explained"],
  ],
  "app/text-sorter/page.tsx": [
    ["Sorting Algorithms Explained for Text Sorter", "Text Sorting Algorithms Explained"],
    ["Common Sorting Scenarios for Text Sorter", "Common Text Sorting Scenarios"],
  ],
  "app/underscore-conventions/page.tsx": [
    ["Language-Specific Underscore Conventions for Underscore Conventions", "Language-Specific Underscore Naming Conventions"],
  ],
};

let fixedCount = 0;

for (const [filePath, replacements] of Object.entries(fixes)) {
  let content = readFileSync(filePath, "utf8");
  const original = content;
  let changeCount = 0;

  for (const [bad, good] of replacements) {
    if (content.includes(bad)) {
      content = content.replace(bad, good);
      changeCount++;
    }
  }

  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    fixedCount++;
    console.log(`✓ Fixed ${filePath} (${changeCount} H2 corrections)`);
  }
}

console.log(`\n========================================`);
console.log(`Cleanup complete: ${fixedCount} files corrected`);
console.log(`========================================`);
