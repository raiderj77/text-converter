---
title: "kebab-case in CSS, URLs, and CLI flags: the readability case"
date: "2026-05-16"
slug: "kebab-case-in-css-urls-and-cli-flags-the-readability-case"
description: ""
status: published
author: "Jason Ramirez"
reviewer: "Jason Ramirez, CADC-II"
---

# kebab-case in CSS, URLs, and CLI Flags: The Readability Case

> **Short answer:** kebab-case is the dominant convention in CSS properties, URL slugs, and CLI flags because hyphens are word separators that survive context switches -- no shift key, no ambiguity at word boundaries, and no conflicts with language syntax. Use it by default in these three domains and override only when a spec forces your hand.

---

## Why does kebab-case keep showing up in these three specific places?

They share a constraint: spaces are illegal or meaningful, and underscores carry baggage. A hyphen is the neutral separator that reads like a space, costs nothing to type, and doesn't collide with operator syntax in any of the three contexts.

CSS properties have used hyphens since the beginning -- `font-size`, `background-color`, `border-top-left-radius`. URLs treat underscores as part of a word token in some parsers, which breaks word-boundary matching. CLI tools inherited Unix conventions where flags like `--dry-run` and `--output-file` have been standard since the early days of GNU getopt.

The pattern isn't a coincidence. It's the same readability constraint solved three times independently, arriving at the same answer.

---

## Does Google actually care whether your URL uses hyphens or underscores?

Yes, and they've been explicit about it. [Google's John Mueller confirmed in 2016](https://www.youtube.com/watch?v=AQpqVvxoTAM) that Google treats hyphens as word separators in URLs and underscores as word joiners. So `/web-performance-tips` gets parsed as three separate words. `/web_performance_tips` gets parsed as one token: `webperformancetips`.

That distinction affects how your pages surface for individual keyword queries. If someone searches "performance tips," the hyphenated slug is a closer match. The underscore version essentially hides the word boundary from the crawler.

```
# Slug comparison for a post about image optimization

Good:  /blog/image-optimization-guide
Bad:   /blog/image_optimization_guide
Worse: /blog/imageOptimizationGuide   (breaks in some routers, ugly in print)
```

The practical delta is small for high-authority domains, but there's no upside to the underscore version, so the choice is obvious.

---

## Are CSS custom properties supposed to use kebab-case too?

By convention, yes. The [CSS spec itself](https://www.w3.org/TR/css-variables-1/#defining-variables) uses hyphens in all examples, and every major design system -- Tailwind, Bootstrap, Material -- follows suit.

```css
/* Standard pattern */
:root {
  --color-primary: #0070f3;
  --font-size-base: 1rem;
  --spacing-4: 1rem;
}

/* What you don't want */
:root {
  --colorPrimary: #0070f3;    /* camelCase -- feels wrong in CSS */
  --color_primary: #0070f3;  /* underscore -- just unusual enough to slow you down */
}
```

The double-hyphen prefix `--` already signals "custom property," so the name after it should follow the same rules as built-in properties. Mixing conventions inside a single stylesheet creates a scanning cost every time someone reads the file.

One real exception: if you're auto-generating CSS variables from a JavaScript object using a tool like [style-dictionary](https://amzn.github.io/style-dictionary/), the output format is configurable and you should match whatever the consuming context expects. But the default output for CSS targets is kebab-case.

---

## What's the actual convention for CLI flags, and does it matter?

The POSIX and GNU conventions both use hyphens for long-form flags. The [GNU Coding Standards](https://www.gnu.org/prep/standards/html_node/Command_002dLine-Interfaces.html) document this explicitly. Look at any mature CLI tool:

```bash
# Standard Unix tooling
tar --extract --verbose --file archive.tar.gz
curl --output file.html --silent --max-time 30

# Modern tooling follows the same pattern
docker build --no-cache --build-arg NODE_ENV=production .
git commit --allow-empty --message "chore: initial commit"
npm install --save-dev --legacy-peer-deps
```

The consistency matters because users tab-complete, copy from docs, and run flags from memory. `--dry-run` is two words you already know. `--dryRun` requires you to remember capitalization. `--dry_run` exists in some Python tools (argparse defaults to underscores) and it's always slightly jarring to switch.

If you're building a CLI in Node, [yargs](https://yargs.js.org/) and [commander](https://github.com/tj/commander.js) both accept kebab-case flags and can alias camelCase equivalents for the JavaScript side automatically:

```js
// yargs: kebab-case in the shell, camelCase in your code
const argv = yargs(process.argv.slice(2))
  .option('output-file', {
    alias: 'o',
    type: 'string',
    description: 'Path to write output'
  })
  .parse();

// argv.outputFile is available in JS -- yargs handles the conversion
console.log(argv.outputFile);
```

You get the right convention on both sides without manual mapping.

---

## When is kebab-case actually the wrong choice?

Three clear cases:

**Environment variables.** The convention is `SCREAMING_SNAKE_CASE`. `MY_APP_PORT`, not `my-app-port`. Shells handle hyphens in variable names inconsistently -- bash allows them in some contexts but not others, and `export MY-VAR=1` fails in bash while working in zsh. Don't fight this one.

**Python package names on PyPI.** [PEP 8](https://peps.python.org/pep-0008/#package-and-module-names) recommends short, all-lowercase names. PyPI normalizes hyphens and underscores to the same package (per [PEP 503](https://peps.python.org/pep-0503/)), but the import name inside Python must be a valid identifier, which means no hyphens. `my-library` on PyPI installs as `import my_library`.

**HTTP headers.** Technically kebab-case (`Content-Type`, `X-Request-Id`), but with title case on each segment. This is its own micro-convention and tools handle it for you -- don't manually construct header strings unless you have to.

---

## How do you enforce this in a real project?

Linting. Not code review comments.

For CSS: [stylelint](https://stylelint.io/) with the `custom-property-pattern` rule:

```json
{
  "rules": {
    "custom-property-pattern": "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$"
  }
}
```

For URLs in a Next.js or similar project: file-system routing enforces it if you name your files in kebab-case. A pre-commit hook with a simple grep catches stragglers.

For CLI flags: if you're using yargs or commander, document the convention in your contributing guide and add a test that parses `--help` output against a regex. Sounds excessive until someone adds `--outputDir` and breaks the pattern.

The point isn't rigid enforcement for its own sake. It's that every deviation from the local convention is a small tax on every future reader. Kebab-case in CSS, URLs, and CLI flags isn't a style preference -- it's the load-bearing convention in each of those contexts, and ignoring it has measurable costs.

## Frequently asked questions

### Why is kebab-case used in CSS class names instead of camelCase or underscores?
CSS property names like `font-size` and `background-color` already use hyphens, so kebab-case keeps your class names visually consistent with the language itself. Browsers are also case-insensitive for HTML attributes, making camelCase unreliable. Underscores work but feel out of place alongside native CSS syntax. Adopting kebab-case throughout your stylesheet creates a uniform, scannable naming pattern that reduces cognitive switching when reading or writing styles.

### Does kebab-case in URLs actually improve SEO?
Yes, search engines like Google officially recommend hyphens over underscores in URLs because hyphens are treated as word separators. A URL like `/web-design-tips` is parsed as three distinct words, while `/web_design_tips` may be read as one token. This affects keyword recognition and ranking. Beyond SEO, hyphenated URLs are easier for humans to read at a glance, improving click-through rates and reducing copy-paste errors when sharing links.

### What is the difference between kebab-case and snake_case for CLI flags?
Kebab-case uses hyphens (`--output-file`) while snake_case uses underscores (`--output_file`). Most Unix-style CLI tools default to kebab-case for multi-word flags, following conventions set by tools like Git, npm, and Docker. Snake_case is more common in Python ecosystems. Kebab-case flags tend to feel more natural to type in a terminal context and align with the broader POSIX convention, making them the safer default for cross-platform developer tooling.

### Can I convert class names or identifiers to kebab-case automatically?
Yes, tools like the converter on flipmycase.com let you paste any text and instantly output clean kebab-case. This is useful when migrating a codebase from camelCase or snake_case naming, renaming CSS classes in bulk, or standardizing URL slugs. Automating the conversion eliminates manual typos and inconsistencies, especially in large projects where dozens of identifiers need reformatting at once.

### Is kebab-case valid inside JavaScript variable names?
No, hyphens are not valid in JavaScript variable or function names because the parser interprets the hyphen as a subtraction operator. Kebab-case is therefore limited to contexts like CSS class names, HTML attributes, URL slugs, and CLI flags. In JavaScript, camelCase is the standard convention. However, you can safely store kebab-case strings as values or object keys using bracket notation, such as `obj["my-key"]`, without any parsing issues.


<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why is kebab-case used in CSS class names instead of camelCase or underscores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CSS property names like `font-size` and `background-color` already use hyphens, so kebab-case keeps your class names visually consistent with the language itself. Browsers are also case-insensitive for HTML attributes, making camelCase unreliable. Underscores work but feel out of place alongside native CSS syntax. Adopting kebab-case throughout your stylesheet creates a uniform, scannable naming pattern that reduces cognitive switching when reading or writing styles."
      }
    },
    {
      "@type": "Question",
      "name": "Does kebab-case in URLs actually improve SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, search engines like Google officially recommend hyphens over underscores in URLs because hyphens are treated as word separators. A URL like `/web-design-tips` is parsed as three distinct words, while `/web_design_tips` may be read as one token. This affects keyword recognition and ranking. Beyond SEO, hyphenated URLs are easier for humans to read at a glance, improving click-through rates and reducing copy-paste errors when sharing links."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between kebab-case and snake_case for CLI flags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kebab-case uses hyphens (`--output-file`) while snake_case uses underscores (`--output_file`). Most Unix-style CLI tools default to kebab-case for multi-word flags, following conventions set by tools like Git, npm, and Docker. Snake_case is more common in Python ecosystems. Kebab-case flags tend to feel more natural to type in a terminal context and align with the broader POSIX convention, making them the safer default for cross-platform developer tooling."
      }
    },
    {
      "@type": "Question",
      "name": "Can I convert class names or identifiers to kebab-case automatically?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, tools like the converter on flipmycase.com let you paste any text and instantly output clean kebab-case. This is useful when migrating a codebase from camelCase or snake_case naming, renaming CSS classes in bulk, or standardizing URL slugs. Automating the conversion eliminates manual typos and inconsistencies, especially in large projects where dozens of identifiers need reformatting at once."
      }
    },
    {
      "@type": "Question",
      "name": "Is kebab-case valid inside JavaScript variable names?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, hyphens are not valid in JavaScript variable or function names because the parser interprets the hyphen as a subtraction operator. Kebab-case is therefore limited to contexts like CSS class names, HTML attributes, URL slugs, and CLI flags. In JavaScript, camelCase is the standard convention. However, you can safely store kebab-case strings as values or object keys using bracket notation, such as `obj[\"my-key\"]`, without any parsing issues."
      }
    }
  ]
}
</script>
