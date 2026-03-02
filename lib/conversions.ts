/**
 * Text conversion functions.
 * Pure functions, no React dependencies.
 * Used by the case converter tool and potentially other tools.
 */

export function toUpperCase(input: string): string {
  return input.toUpperCase();
}

export function toLowerCase(input: string): string {
  return input.toLowerCase();
}

export function toSentenceCase(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  // Handle multiple sentences: capitalize first letter after . ! ?
  return trimmed
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s+\w)/g, (m) => m.toUpperCase());
}

export function toTitleCase(input: string): string {
  // Minor words that stay lowercase unless they're the first word
  const minorWords = new Set([
    "a", "an", "the", "and", "but", "or", "nor", "for", "yet", "so",
    "in", "on", "at", "to", "by", "of", "up", "as", "is", "it",
  ]);

  return input
    .toLowerCase()
    .replace(/\b\w+/g, (word, index) => {
      if (index === 0 || !minorWords.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    });
}

export function toAlternatingCase(input: string): string {
  let out = "";
  let flip = false;
  for (const ch of input) {
    if (/[a-z]/i.test(ch)) {
      out += flip ? ch.toUpperCase() : ch.toLowerCase();
      flip = !flip;
    } else {
      out += ch;
    }
  }
  return out;
}

export const toToggleCase = toAlternatingCase;

export function toSpongeBobCase(input: string): string {
  let out = "";
  // Seed for pseudo-random but deterministic output
  let seed = 0;
  for (const ch of input) {
    if (/[a-z]/i.test(ch)) {
      // Simple deterministic "random" based on position
      seed = (seed + 1) * 31;
      const random = Math.abs(Math.sin(seed)) * 100;
      out += random % 2 < 1 ? ch.toUpperCase() : ch.toLowerCase();
    } else {
      out += ch;
    }
  }
  return out;
}

export function toRandomCase(input: string): string {
  let out = "";
  for (const ch of input) {
    if (/[a-z]/i.test(ch)) {
      out += Math.random() < 0.5 ? ch.toUpperCase() : ch.toLowerCase();
    } else {
      out += ch;
    }
  }
  return out;
}

export function toInverseCase(input: string): string {
  let out = "";
  for (const ch of input) {
    if (ch === ch.toUpperCase()) {
      out += ch.toLowerCase();
    } else {
      out += ch.toUpperCase();
    }
  }
  return out;
}

export function toSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toSnakeCase(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function toKebabCase(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toCamelCase(input: string): string {
  const cleaned = input
    .trim()
    .replace(/[_-]/g, " ")
    .replace(/[^a-zA-Z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "";

  const parts = cleaned.split(" ");
  const first = parts[0].toLowerCase();
  const rest = parts
    .slice(1)
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1).toLowerCase() : ""))
    .join("");

  const merged = (first + rest).replace(/[^a-zA-Z0-9]/g, "");
  return merged ? merged[0].toLowerCase() + merged.slice(1) : "";
}

export function toPascalCase(input: string): string {
  const camel = toCamelCase(input);
  return camel ? camel[0].toUpperCase() + camel.slice(1) : "";
}

export function toDotCase(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
}

export function toConstantCase(input: string): string {
  return input
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * All available case conversions.
 * Used to generate output cards and for blog/SEO content.
 */
export type Conversion = {
  id: string;
  label: string;
  fn: (input: string) => string;
  category: "common" | "developer" | "other";
  description: string;
};

export const conversions: Conversion[] = [
  {
    id: "uppercase",
    label: "UPPERCASE",
    fn: toUpperCase,
    category: "common",
    description: "Converts all letters to capital letters.",
  },
  {
    id: "lowercase",
    label: "lowercase",
    fn: toLowerCase,
    category: "common",
    description: "Converts all letters to small letters.",
  },
  {
    id: "title-case",
    label: "Title Case",
    fn: toTitleCase,
    category: "common",
    description: "Capitalizes the first letter of each major word.",
  },
  {
    id: "sentence-case",
    label: "Sentence case",
    fn: toSentenceCase,
    category: "common",
    description: "Capitalizes the first letter of each sentence.",
  },
  {
    id: "camel-case",
    label: "camelCase",
    fn: toCamelCase,
    category: "developer",
    description: "First word lowercase, subsequent words capitalized, no separators.",
  },
  {
    id: "pascal-case",
    label: "PascalCase",
    fn: toPascalCase,
    category: "developer",
    description: "Every word capitalized, no separators.",
  },
  {
    id: "snake-case",
    label: "snake_case",
    fn: toSnakeCase,
    category: "developer",
    description: "All lowercase with underscores between words.",
  },
  {
    id: "kebab-case",
    label: "kebab-case",
    fn: toKebabCase,
    category: "developer",
    description: "All lowercase with hyphens between words. Common in URLs.",
  },
  {
    id: "constant-case",
    label: "CONSTANT_CASE",
    fn: toConstantCase,
    category: "developer",
    description: "All uppercase with underscores. Used for constants in code.",
  },
  {
    id: "dot-case",
    label: "dot.case",
    fn: toDotCase,
    category: "developer",
    description: "All lowercase with dots between words.",
  },
  {
    id: "alternating",
    label: "aLtErNaTiNg",
    fn: toAlternatingCase,
    category: "other",
    description: "Alternates between lowercase and uppercase letters.",
  },
  {
    id: "toggle",
    label: "tOgGlE cAsE",
    fn: toToggleCase,
    category: "other",
    description: "Starts with lowercase, alternates each letter (toggle style).",
  },
  {
    id: "spongebob",
    label: "sPoNgEbOb CaSe",
    fn: toSpongeBobCase,
    category: "other",
    description: "Random-looking alternating case like the SpongeBob meme.",
  },
  {
    id: "random",
    label: "rAnDoM cAsE",
    fn: toRandomCase,
    category: "other",
    description: "Truly random uppercase/lowercase for each letter.",
  },
  {
    id: "inverse",
    label: "iNVERSE cASE",
    fn: toInverseCase,
    category: "other",
    description: "Swaps uppercase to lowercase and vice versa.",
  },
  {
    id: "slug",
    label: "slug",
    fn: toSlug,
    category: "developer",
    description: "URL-friendly format with hyphens, no special characters.",
  },
];

export function getCommonConversions() {
  return conversions.filter((c) => c.category === "common");
}

export function getDeveloperConversions() {
  return conversions.filter((c) => c.category === "developer");
}

export function getOtherConversions() {
  return conversions.filter((c) => c.category === "other");
}
