import { TOOL_CATEGORIES, tools } from "@/lib/config";

/**
 * Registry classifications reviewed against the public routes and their tool
 * component imports on August 3, 2026. Keep these lists explicit: the
 * regression suite compares them with the registry and actual localStorage
 * references so a storage change cannot silently make this inventory stale.
 */
export const REFERENCE_GUIDE_SLUGS = [
  "camelcase-vs-snake-case",
  "text-tools-for-developers",
  "json-vs-yaml-vs-xml",
] as const;

export const LOCAL_STORAGE_TOOL_SLUGS = [
  "word-counter",
  "duplicate-line-remover",
  "toggle-case-converter",
  "snake-kebab-converter",
  "text-repeater",
  "add-prefix-suffix",
  "bold-text-generator",
  "bold-italic-text-generator",
  "italic-text-generator",
  "superscript-generator",
  "strikethrough-text-generator",
  "underline-text-generator",
  "upside-down-text-generator",
  "small-caps-generator",
  "subscript-generator",
  "fancy-text-generator",
  "bubble-text-generator",
  "wide-text-generator",
  "color-code-converter",
  "random-number-generator",
  "morse-code-translator",
  "cron-expression-builder",
  "list-to-text",
  "roman-numeral-converter",
  "smart-quotes-converter",
] as const;

const referenceGuideSlugs = new Set<string>(REFERENCE_GUIDE_SLUGS);
const localStorageToolSlugs = new Set<string>(LOCAL_STORAGE_TOOL_SLUGS);

export const referenceGuides = tools.filter(
  (entry) => entry.live && referenceGuideSlugs.has(entry.slug),
);

export const interactiveTools = tools.filter(
  (entry) => entry.live && !referenceGuideSlugs.has(entry.slug),
);

export const localStorageTools = interactiveTools.filter((entry) =>
  localStorageToolSlugs.has(entry.slug),
);

export const pageMemoryTools = interactiveTools.filter(
  (entry) => !localStorageToolSlugs.has(entry.slug),
);

export const interactiveToolsByCategory = TOOL_CATEGORIES.map((category) => ({
  ...category,
  tools: interactiveTools.filter((entry) => entry.category === category.name),
}));

export const TOOL_INVENTORY_COUNTS = {
  interactive: interactiveTools.length,
  referenceGuides: referenceGuides.length,
  localStorage: localStorageTools.length,
  pageMemory: pageMemoryTools.length,
} as const;
