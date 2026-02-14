/**
 * Shared utility functions.
 * Import from here instead of redefining in every file.
 */

/** Conditional class name joiner. Filters out falsy values. */
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Format a number with commas: 1234567 → "1,234,567"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Estimate reading time in minutes.
 * Average adult reads ~238 words per minute.
 */
export function readingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 238));
}

/**
 * Estimate speaking time in minutes.
 * Average speaking rate ~150 words per minute.
 */
export function speakingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 150));
}
