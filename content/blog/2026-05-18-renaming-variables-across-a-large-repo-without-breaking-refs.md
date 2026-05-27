---
title: "Renaming variables across a large repo without breaking refs"
date: "2026-05-18"
slug: "renaming-variables-across-a-large-repo-without-breaking-refs"
description: ""
status: published
---

# Renaming Variables Across a Large Repo Without Breaking Refs

**The short answer:** Use your language server's rename symbol command (F2 in VS Code, `R` in Neovim with LSP), not find-and-replace. For cross-file renames at scale, combine LSP-driven tooling with AST-based codemods. Manual regex is the last resort, not the first.

---

## Why does find-and-replace keep breaking things?

[Regex doesn't understand scope. It matches strings, not symbols](/blog/evaluating-the-effectiveness-of-camel-case-and-snake-case-in/), so `userId` in a comment, a string literal, and a variable declaration all look identical to it.

The classic failure mode: you rename `count` to `itemCount` across 200 files, and three months later a runtime error surfaces because `count` inside an unrelated SQL template string got rewritten too. Or you miss a shadowed variable in a nested closure that happened to share the name. Regex has no concept of either. The [Language Server Protocol spec](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_rename) defines `textDocument/rename` precisely because this problem needed a structured solution.

---

## What's the safest rename path for a single language project?

LSP rename is the safest default. Press F2 in VS Code to trigger a textDocument/rename request, and the language server returns a WorkspaceEdit covering every file and range before anything is written to disk. It resolves imports, re-exports, and type aliases automatically, so you avoid the partial renames that manual find-and-replace produces.


LSP rename is the right default. It resolves references through imports, re-exports, and type aliases before touching a single byte.

In VS Code, place your cursor on the symbol and press `F2`. The editor sends a `textDocument/rename` request to the language server, which returns a `WorkspaceEdit` containing every file and range that needs updating. The server has already resolved the full reference graph. In Neovim with `nvim-lspconfig`, the equivalent is `vim.lsp.buf.rename()`, usually bound to `<leader>rn` or `R` in normal mode.

```lua
-- Neovim LSP rename binding
vim.keymap.set("n", "<leader>rn", vim.lsp.buf.rename, { desc = "LSP Rename" })
```

For TypeScript specifically, `tsserver` handles re-exports correctly. If you have:

```typescript
// utils/index.ts
export { getUserId } from "./auth";

// components/Header.tsx
import { getUserId } from "../utils";
```

Renaming `getUserId` to `fetchUserId` via LSP updates both the source declaration and every import site. Find-and-replace would require you to know about every re-export chain manually.

---

## When does LSP rename fall short?

LSP rename breaks down at language boundaries and generated code. A Python language server has no visibility into the TypeScript client consuming that field over REST, and code generators regenerate from a schema the server never reads. Any rename touching a cross-language contract needs a coordinated, multi-tool approach rather than a single F2 press.


When the rename crosses language boundaries or involves generated code. LSP operates within one language server's knowledge graph.

If your Python backend exports a field name that your TypeScript frontend consumes via a REST contract, `pyright` doesn't know about the TypeScript side. Same problem with GraphQL schema field names consumed in multiple client languages, or database column names referenced in both ORM models and raw SQL strings. In those cases you need a broader strategy.

For GraphQL, [graphql-inspector](https://the-guild.dev/graphql/inspector) can detect breaking changes when you rename a field. For database columns, tools like [Flyway](https://flywaydb.org/) or [Liquibase](https://www.liquibase.org/) track schema changes explicitly rather than relying on text search.

---

## What are AST-based codemods and when should I reach for them?

Codemods rewrite source code by manipulating the syntax tree, not the text. They're the right tool when you need to rename a symbol and simultaneously change how it's used, or when LSP isn't available for your language.

[jscodeshift](https://github.com/facebook/jscodeshift) is the standard for JavaScript and TypeScript. It uses [recast](https://github.com/benjamn/recast) under the hood to parse code into an AST, let you mutate nodes, and then print the result back while preserving original formatting as much as possible.

A minimal codemod that renames an imported function:

```javascript
// rename-get-user.js
module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Rename the import specifier
  root
    .find(j.ImportSpecifier, { imported: { name: "getUserId" } })
    .forEach(path => {
      path.node.imported.name = "fetchUserId";
      if (path.node.local.name === "getUserId") {
        path.node.local.name = "fetchUserId";
      }
    });

  // Rename all call sites
  root
    .find(j.Identifier, { name: "getUserId" })
    .forEach(path => {
      path.node.name = "fetchUserId";
    });

  return root.toSource();
};
```

Run it across the repo:

```bash
npx jscodeshift -t rename-get-user.js src/ --extensions=ts,tsx
```

For Python, [LibCST](https://libcst.readthedocs.io/) provides a concrete syntax tree that preserves whitespace and comments, which matters when you care about diff noise. The [Rope](https://github.com/python-rope/rope) library also handles Python renames with full scope awareness and integrates with editors like PyCharm and pylsp.

---

## How do I handle string-based references that ASTs can't catch?

Run a targeted grep after the automated rename and fix the remaining hits manually. ASTs only see syntax, so reflection calls, dynamic requires, fixture JSON, and log strings are invisible to LSP and codemods. Use git grep -n "oldName" to surface every surviving string reference before you commit.


Audit them explicitly with targeted grep after the automated rename. Accept that you'll have some manual work.

Common sources of string-based refs: reflection (`getattr(obj, "user_id")`), dynamic imports (`require(\`./handlers/${name}\`)`), serialized config files, test fixture JSON, and log messages. After running your LSP or codemod rename, run:

```bash
git grep -n "oldVariableName" -- '*.py' '*.ts' '*.json' '*.yaml'
```

The `-n` flag gives you line numbers. Pipe through `grep -v` to exclude binary files or generated directories:

```bash
git grep -n "getUserId" | grep -v "node_modules\|dist\|\.lock"
```

Review each hit manually. String refs in reflection code need case-by-case judgment. Log messages are usually safe to update or leave. Config keys that cross a serialization boundary need coordinated changes on both sides.

---

## What's a practical checklist for a large rename?

Branch first, rename from the declaration site not a usage site, run your test suite immediately after, then grep for the old name and confirm zero results. Each step catches a different failure class: isolation, reference completeness, runtime breakage, and leftover string literals that automated tooling silently skipped.


1. **Branch first.** Obvious, but the rename should be an isolated commit or PR, not bundled with feature work.
2. **Run LSP rename** from the declaration site, not a usage site, to get the full reference graph.
3. **Run your test suite** before committing. A passing test suite after LSP rename is strong evidence the reference graph was complete.
4. **Run `git grep`** on the old name. Zero results in source files is the goal. Investigate any hits.
5. **Check generated files.** Build artifacts, protobuf outputs, OpenAPI specs, and migration files may need separate handling.
6. **Update documentation.** `docs/` directories and README files won't be in the LSP graph.

For a repo with 50+ files affected, [GitHub's code search](https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax) can give you a pre-rename count of references so you can verify the post-rename grep comes back clean.

---

## Does the case format of the new name matter for tooling?

No, the tooling doesn't care whether you're going from `getUserId` to `fetchUserId` or `get_user_id` to `fetch_user_id`. What matters is that the rename is symbol-aware, not text-aware.

That said, if you're changing case convention at the same time (say, migrating a Python codebase from camelCase to snake_case across the board), codemods are the only viable path. A tool like [pyupgrade](https://github.com/asottile/pyupgrade) handles some convention migrations, or you write a LibCST transform that applies a naming rule to every identifier in scope. LSP rename handles one symbol at a time; batch convention changes need batch tooling.

## Frequently asked questions

### How do I safely rename a variable across an entire codebase without breaking references?
Use your IDE's built-in refactoring tool (such as "Rename Symbol" in VS Code or IntelliJ) rather than a plain find-and-replace. These tools understand scope and syntax, so they update only true references to that variable — not unrelated strings that happen to share the same name. After renaming, run your full test suite and search for any dynamic references like `eval()` or string-based lookups that automated tools may have missed.

### What is the difference between find-and-replace and refactor rename when renaming variables?
Refactor rename is scope-aware, while find-and-replace is purely text-based. A blind find-and-replace will change every matching string in your repo — including comments, unrelated variable names, and string literals — potentially introducing silent bugs. Refactor rename tools parse the abstract syntax tree (AST), meaning they only touch the specific binding and its references, leaving everything else untouched.

### Should I convert variable naming conventions (camelCase, snake_case) when renaming across a large repo?
Yes, but do it consistently and all at once using a dedicated case-conversion tool. Mixing conventions mid-rename creates inconsistency that hurts readability and onboarding. Tools like flipmycase.com let you quickly convert names between camelCase, snake_case, PascalCase, and others before you commit the new name. Agree on the target convention with your team first, then apply the rename in a single, well-described commit.

### How do I handle dynamic variable references like eval or reflection when renaming variables?
Search your codebase explicitly for string occurrences of the old variable name after the automated rename completes. Dynamic references — such as `eval("myVar")`, `getattr(obj, "my_var")`, or database-stored field names — are invisible to refactoring tools because they exist as strings, not code symbols. Grep for the old name in string literals, configuration files, and external documentation, then update each occurrence manually to match the new name.

### What naming convention should I use when renaming variables for better code readability?
Choose the convention that matches your language's community standard — camelCase for JavaScript, snake_case for Python, PascalCase for C# classes. Consistency matters more than personal preference; a uniform convention reduces cognitive load when reading unfamiliar code. If your existing codebase mixes conventions, a large-scale rename is a good opportunity to standardise everything. Use a case-conversion tool to generate correctly formatted names quickly before applying the rename across your repo.


<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I safely rename a variable across an entire codebase without breaking references?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use your IDE's built-in refactoring tool (such as \"Rename Symbol\" in VS Code or IntelliJ) rather than a plain find-and-replace. These tools understand scope and syntax, so they update only true references to that variable \u2014 not unrelated strings that happen to share the same name. After renaming, run your full test suite and search for any dynamic references like `eval()` or string-based lookups that automated tools may have missed."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between find-and-replace and refactor rename when renaming variables?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Refactor rename is scope-aware, while find-and-replace is purely text-based. A blind find-and-replace will change every matching string in your repo \u2014 including comments, unrelated variable names, and string literals \u2014 potentially introducing silent bugs. Refactor rename tools parse the abstract syntax tree (AST), meaning they only touch the specific binding and its references, leaving everything else untouched."
      }
    },
    {
      "@type": "Question",
      "name": "Should I convert variable naming conventions (camelCase, snake_case) when renaming across a large repo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but do it consistently and all at once using a dedicated case-conversion tool. Mixing conventions mid-rename creates inconsistency that hurts readability and onboarding. Tools like flipmycase.com let you quickly convert names between camelCase, snake_case, PascalCase, and others before you commit the new name. Agree on the target convention with your team first, then apply the rename in a single, well-described commit."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle dynamic variable references like eval or reflection when renaming variables?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Search your codebase explicitly for string occurrences of the old variable name after the automated rename completes. Dynamic references \u2014 such as `eval(\"myVar\")`, `getattr(obj, \"my_var\")`, or database-stored field names \u2014 are invisible to refactoring tools because they exist as strings, not code symbols. Grep for the old name in string literals, configuration files, and external documentation, then update each occurrence manually to match the new name."
      }
    },
    {
      "@type": "Question",
      "name": "What naming convention should I use when renaming variables for better code readability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose the convention that matches your language's community standard \u2014 camelCase for JavaScript, snake_case for Python, PascalCase for C# classes. Consistency matters more than personal preference; a uniform convention reduces cognitive load when reading unfamiliar code. If your existing codebase mixes conventions, a large-scale rename is a good opportunity to standardise everything. Use a case-conversion tool to generate correctly formatted names quickly before applying the rename across your repo."
      }
    }
  ]
}
</script>
