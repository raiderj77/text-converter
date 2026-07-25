/**
 * @typedef {"text" | "tag" | "comment" | "cdata" | "processing" | "declaration"} MarkupTokenType
 * @typedef {{ type: MarkupTokenType, value: string }} MarkupToken
 */

/**
 * Find a markup delimiter while honoring quoted attribute values and, for
 * declarations such as DOCTYPE, an internal subset.
 *
 * @param {string} source
 * @param {number} start
 * @param {boolean} declaration
 * @returns {number}
 */
function findTagEnd(source, start, declaration) {
  let quote = "";
  let subsetDepth = 0;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (char === quote) quote = "";
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (declaration) {
      if (char === "[") subsetDepth += 1;
      if (char === "]") subsetDepth = Math.max(0, subsetDepth - 1);
    }

    if (char === ">" && subsetDepth === 0) return index + 1;
  }

  return -1;
}

/**
 * Split markup into inert text and structural tokens without asking the
 * browser to interpret user input as a DOM.
 *
 * @param {string} source
 * @returns {MarkupToken[]}
 */
export function tokenizeMarkup(source) {
  /** @type {MarkupToken[]} */
  const tokens = [];
  let cursor = 0;
  let textStart = 0;

  const pushText = (end) => {
    if (end > textStart) {
      tokens.push({ type: "text", value: source.slice(textStart, end) });
    }
  };

  while (cursor < source.length) {
    if (source[cursor] !== "<") {
      cursor += 1;
      continue;
    }

    /** @type {MarkupTokenType | ""} */
    let type = "";
    let end = -1;

    if (source.startsWith("<!--", cursor)) {
      const close = source.indexOf("-->", cursor + 4);
      if (close !== -1) {
        type = "comment";
        end = close + 3;
      }
    } else if (source.startsWith("<![CDATA[", cursor)) {
      const close = source.indexOf("]]>", cursor + 9);
      if (close !== -1) {
        type = "cdata";
        end = close + 3;
      }
    } else if (source.startsWith("<?", cursor)) {
      const close = source.indexOf("?>", cursor + 2);
      if (close !== -1) {
        type = "processing";
        end = close + 2;
      }
    } else if (source.startsWith("<!", cursor)) {
      type = "declaration";
      end = findTagEnd(source, cursor + 2, true);
    } else if (/^<\s*\/?\s*[A-Za-z_:]/.test(source.slice(cursor))) {
      type = "tag";
      end = findTagEnd(source, cursor + 1, false);
    }

    if (!type || end === -1) {
      cursor += 1;
      continue;
    }

    pushText(cursor);
    tokens.push({ type, value: source.slice(cursor, end) });
    cursor = end;
    textStart = end;
  }

  pushText(source.length);
  return tokens;
}

/**
 * @param {string} token
 * @returns {string}
 */
export function getMarkupTagName(token) {
  return token.match(/^<\s*\/?\s*([A-Za-z_:][A-Za-z0-9_.:-]*)/)?.[1] ?? "";
}

/**
 * Remove markup structurally. Returned content is still rendered by React as
 * text; this helper never creates HTML or a DOM from the input.
 *
 * @param {string} source
 * @param {string[]} [keepTags]
 * @returns {string}
 */
export function stripMarkupTags(source, keepTags = []) {
  const keep = new Set(keepTags.map((tag) => tag.toLowerCase()));

  return tokenizeMarkup(source)
    .map((token) => {
      if (token.type === "text") return token.value;
      if (token.type === "cdata") return token.value.slice(9, -3);
      if (token.type !== "tag") return "";

      const name = getMarkupTagName(token.value).toLowerCase();
      return keep.has(name) ? token.value : "";
    })
    .join("");
}

/**
 * @param {string} source
 * @returns {string}
 */
export function removeMarkupComments(source) {
  return tokenizeMarkup(source)
    .filter((token) => token.type !== "comment")
    .map((token) => token.value)
    .join("");
}

const HTML_ENTITIES = new Map([
  ["amp", "&"],
  ["apos", "'"],
  ["bull", "\u2022"],
  ["cent", "\u00A2"],
  ["copy", "\u00A9"],
  ["euro", "\u20AC"],
  ["gt", ">"],
  ["hellip", "\u2026"],
  ["laquo", "\u00AB"],
  ["lt", "<"],
  ["mdash", "\u2014"],
  ["nbsp", " "],
  ["ndash", "\u2013"],
  ["pound", "\u00A3"],
  ["quot", '"'],
  ["raquo", "\u00BB"],
  ["reg", "\u00AE"],
  ["trade", "\u2122"],
  ["yen", "\u00A5"],
]);

/**
 * Decode each entity once. A value such as `&amp;lt;` becomes `&lt;`, not
 * `<`, which prevents accidental double-decoding.
 *
 * @param {string} source
 * @returns {string}
 */
export function decodeHtmlEntitiesOnce(source) {
  return source.replace(/&(?:#[0-9]+|#x[0-9a-f]+|[a-z][a-z0-9]+);/gi, (entity) => {
    const body = entity.slice(1, -1);

    if (body[0] === "#") {
      const hexadecimal = body[1]?.toLowerCase() === "x";
      const value = Number.parseInt(body.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
      return Number.isInteger(value) && value > 0 && value <= 0x10ffff
        ? String.fromCodePoint(value)
        : entity;
    }

    return HTML_ENTITIES.get(body.toLowerCase()) ?? entity;
  });
}

/**
 * @param {string} token
 * @returns {{ name: string, closing: boolean, selfClosing: boolean, error: string | null }}
 */
function parseXmlTag(token) {
  const closing = /^<\s*\//.test(token);
  const selfClosing = /\/\s*>$/.test(token);
  const inner = token
    .slice(1, -1)
    .replace(/^\s*\//, "")
    .replace(/\/\s*$/, "")
    .trim();
  const nameMatch = inner.match(/^([A-Za-z_:][A-Za-z0-9_.:-]*)/);

  if (!nameMatch) {
    return { name: "", closing, selfClosing, error: "Invalid XML tag name." };
  }

  const name = nameMatch[1];
  let cursor = name.length;

  if (closing) {
    return inner.slice(cursor).trim()
      ? { name, closing, selfClosing, error: `Closing tag </${name}> contains unexpected content.` }
      : { name, closing, selfClosing, error: null };
  }

  while (cursor < inner.length) {
    while (/\s/.test(inner[cursor] ?? "")) cursor += 1;
    if (cursor >= inner.length) break;

    const attribute = inner.slice(cursor).match(/^([A-Za-z_:][A-Za-z0-9_.:-]*)/);
    if (!attribute) {
      return { name, closing, selfClosing, error: `Invalid attribute syntax in <${name}>.` };
    }
    cursor += attribute[1].length;
    while (/\s/.test(inner[cursor] ?? "")) cursor += 1;

    if (inner[cursor] !== "=") {
      return { name, closing, selfClosing, error: `Attribute ${attribute[1]} must have a value.` };
    }
    cursor += 1;
    while (/\s/.test(inner[cursor] ?? "")) cursor += 1;

    const quote = inner[cursor];
    if (quote !== '"' && quote !== "'") {
      return { name, closing, selfClosing, error: `Attribute ${attribute[1]} must use quotes.` };
    }
    const end = inner.indexOf(quote, cursor + 1);
    if (end === -1 || inner.slice(cursor + 1, end).includes("<")) {
      return { name, closing, selfClosing, error: `Invalid value for attribute ${attribute[1]}.` };
    }
    cursor = end + 1;
  }

  return { name, closing, selfClosing, error: null };
}

/**
 * Validate the well-formed structure required by the formatter. This is not a
 * schema validator and deliberately does not resolve external entities.
 *
 * @param {string} source
 * @returns {string | null}
 */
export function validateXml(source) {
  if (!source.trim()) return "Enter XML to validate.";

  const stack = [];
  let roots = 0;

  for (const token of tokenizeMarkup(source)) {
    if (token.type === "text") {
      if (token.value.includes("<")) return "XML contains an unescaped < character.";
      if (stack.length === 0 && token.value.trim()) {
        return "XML cannot contain text outside the root element.";
      }
      continue;
    }

    if (token.type === "cdata") {
      if (stack.length === 0) return "CDATA must be inside the root element.";
      continue;
    }

    if (token.type === "declaration") {
      if (!/^<!DOCTYPE\b/i.test(token.value) || roots > 0 || stack.length > 0) {
        return "XML declarations must appear before the root element.";
      }
      continue;
    }

    if (token.type === "processing") {
      if (/^<\?xml\b/i.test(token.value) && (roots > 0 || stack.length > 0)) {
        return "The XML declaration must appear before the root element.";
      }
      continue;
    }

    if (token.type !== "tag") continue;

    const parsed = parseXmlTag(token.value);
    if (parsed.error) return parsed.error;

    if (parsed.closing) {
      const expected = stack.pop();
      if (!expected) return `Unexpected closing tag </${parsed.name}>.`;
      if (expected !== parsed.name) {
        return `Expected </${expected}> but found </${parsed.name}>.`;
      }
      continue;
    }

    if (stack.length === 0) {
      roots += 1;
      if (roots > 1) return "XML must contain exactly one root element.";
    }

    if (!parsed.selfClosing) stack.push(parsed.name);
  }

  if (stack.length > 0) return `Missing closing tag for <${stack.at(-1)}>.`;
  if (roots !== 1) return "XML must contain exactly one root element.";
  return null;
}
