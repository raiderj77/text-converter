---
title: "File naming conventions across JavaScript, Python, and Go"
date: "2026-05-23"
slug: "file-naming-conventions-across-javascript-python-and-go"
description: ""
status: published
author: "Jason Ramirez"
reviewer: "Jason Ramirez, CADC-II"
---

# File Naming Conventions Across JavaScript, Python, and Go

> **Quick answer:** JavaScript has no single enforced standard -- files follow the framework or toolchain. Python uses `snake_case` for modules and packages per PEP 8. Go uses flat `lowercase` (no separators) for files and packages. Mixing these up causes real bugs: case-sensitive filesystems, broken imports, and failed CI on Linux boxes that work fine on macOS.

---

## Why does file naming even break things?

macOS and Windows use case-insensitive filesystems by default. Linux does not. A file named `UserService.js` and `userservice.js` are the same file on your Mac and two different files on your Ubuntu CI server. This is one of the most common causes of "works locally, fails in CI" bugs in JavaScript projects.

Beyond filesystem issues, language tooling often derives meaning from the filename itself. Go's compiler enforces that the filename's base directory maps to the package name. Python's module system treats the filename as the importable identifier. Getting the casing wrong is not a style problem -- it is a correctness problem.

---

## What does Python actually require for file names?

[PEP 8](https://peps.python.org/pep-0008/#package-and-module-names) says: "Modules should have short, all-lowercase names. Underscores can be used in the module name if it improves readability." Packages (directories with `__init__.py`) follow the same rule but PEP 8 discourages underscores there.

In practice this means:

```
# Good
user_service.py
auth_utils.py
db_connection.py

# Bad -- not importable the way you think
UserService.py
authUtils.py
DBConnection.py
```

When you do `import user_service`, Python is literally looking for a file called `user_service.py` on the path. If you named it `UserService.py` and you're on Linux, that import fails. The [Python docs on the import system](https://docs.python.org/3/reference/import.html) confirm the filesystem lookup behavior.

Class names inside those files still use `PascalCase`. The file name and the class name do not have to match, unlike Java. `user_service.py` can contain `class UserService`. This trips up developers coming from Java or C# constantly.

---

## What does Go enforce about file names?

Go does not enforce a specific file naming convention in its spec, but the [Go team's own code review comments](https://github.com/golang/go/wiki/CodeReviewComments#package-names) and the standard library use flat lowercase with no separators. The `gofmt` tool does not touch filenames, but the convention is consistent enough to be treated as a rule.

```
# Standard library examples
net/http/server.go
net/http/transport.go
encoding/json/decode.go
encoding/json/encode.go
```

No underscores. No camelCase. Just lowercase words. When a file contains tests, you append `_test.go` -- that is the one exception the Go toolchain actually enforces. Files ending in `_test.go` are [only compiled during `go test`](https://pkg.go.dev/cmd/go#hdr-Test_packages), not in regular builds.

```
server.go
server_test.go
transport.go
transport_test.go
```

Platform-specific build constraints use suffixes like `_linux.go`, `_darwin.go`, `_windows.go`. The Go build system [reads these suffixes](https://pkg.go.dev/cmd/go#hdr-Build_constraints) and includes or excludes files automatically. If you name a file `userService_linux.go`, the build system will still process the `_linux` suffix correctly, but you are violating the naming convention and making the codebase harder to read.

---

## What about JavaScript -- is there actually a standard?

No enforced standard exists for JavaScript filenames. Airbnb's style guide ties filename casing to the export type, PascalCase for classes and components, camelCase for default functions. In practice, React projects lean PascalCase for components and kebab-case for everything else, so follow whatever your framework or team already uses consistently.


No single enforced standard exists. The ecosystem is fragmented, and the right answer depends on what you are building.

[Airbnb's style guide](https://github.com/airbnb/javascript#naming--filename-matches-export) says: "Use camelCase when you export a default function. Your filename should be identical to your function's name." It also says to use PascalCase when you export a constructor, class, or singleton.

```js
// PascalCase for components and classes
UserService.js
AuthProvider.jsx
Button.tsx

// [camelCase for utilities and helpers](/blog/the-relationship-between-code-readability-and-the-use-of-cam/)
formatDate.js
parseQuery.js
httpClient.js

// kebab-case in some ecosystems (Next.js pages, npm packages)
user-profile.js
auth-callback.js
```

[Next.js](https://nextjs.org/docs/app/building-your-application/routing) uses [kebab-case for route segments and encourages it for page files](/blog/kebab-case-in-css-urls-and-cli-flags-the-readability-case/). The npm package registry is case-insensitive but [strongly recommends lowercase with hyphens](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name) for package names. React projects often use PascalCase for component files because the component name and filename match, and tooling like ESLint's `react/jsx-filename-extension` rule assumes this.

The actual risk here: if your team has [no agreed convention, you end up with a mix of](/blog/evaluating-the-effectiveness-of-camel-case-and-snake-case-in/) `UserService.js`, `user-service.js`, and `userService.js` in the same repo. Refactoring tools, barrel file generators, and import sorters all behave inconsistently across these styles.

---

## How do these conventions interact with imports?

File naming directly controls whether imports resolve. In Python, the filename is the module name, so `from user_service import UserService` requires `user_service.py` on disk. Go imports use directory paths, not filenames, so casing mismatches there are rarer. JavaScript bundlers are usually case-insensitive locally but CI on Linux will break on mismatches.


This is where the rubber meets the road.

In Python, the import name is the filename without the extension. `from user_service import UserService` works because the file is `user_service.py`. Rename the file to `UserService.py` on a case-sensitive system and the import breaks.

In Go, the import path is the directory path, not the filename. Multiple files in the same directory share a package name. The [Go spec](https://go.dev/ref/spec#ImportDecl) requires all non-test files in a directory to declare the same package name. File naming does not affect imports directly, but it affects how quickly you can find code.

In JavaScript, the import path is explicit and literal:

```js
import { UserService } from './UserService';     // must match exactly
import { UserService } from './user-service';    // different file
import { formatDate } from './formatDate';
```

Bundlers like webpack and Vite resolve these paths at build time. On case-insensitive filesystems, `./userservice` and `./UserService` resolve to the same file. On Linux, they do not. Tools like [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) with `import/no-unresolved` can catch these mismatches before they reach CI.

---

## Quick reference

Python uses snake_case for files and packages, Go uses lowercase with no separators, and JavaScript varies by context but kebab-case dominates npm packages while PascalCase is standard for React components. Test files follow predictable suffixes: `test_module.py`, `file_test.go`, and `file.test.js`. When in doubt, avoid uppercase in filenames entirely.


| Language | Files | Packages/Modules | Test files |
|---|---|---|---|
| Python | `snake_case.py` | `snake_case` | `test_module.py` |
| Go | `lowercase.go` | `lowercase` | `file_test.go` |
| JavaScript | Varies (PascalCase, camelCase, kebab-case) | kebab-case (npm) | `file.test.js` |

The safest cross-platform bet in any language is to avoid uppercase entirely in filenames. Uppercase is never required by any of these three languages, and it is the direct cause of case-sensitivity bugs. Pick one convention per project, lint for it, and stop thinking about it.

## Frequently asked questions

### What file naming convention should I use in JavaScript projects?
JavaScript projects typically use **camelCase** for files containing functions or utilities (e.g., `getUserData.js`) and **PascalCase** for component files, especially in React (e.g., `UserProfile.jsx`). Configuration files and general scripts often use **kebab-case** (e.g., `webpack-config.js`). The convention varies by framework and team preference, but consistency within a project matters most. Tools like ESLint can help enforce your chosen standard automatically.

### Does Python have an official file naming convention?
Yes, Python's official style guide (PEP 8) recommends **snake_case** for all module and file names (e.g., `user_profile.py`, `data_parser.py`). Names should be short, lowercase, and use underscores to separate words. Avoid hyphens, as they prevent files from being imported as modules. Following PEP 8 ensures compatibility with Python tooling and makes your codebase immediately recognizable to other Python developers.

### How does Go handle file naming compared to Python and JavaScript?
Go uses **snake_case** for file names (e.g., `http_handler.go`), similar to Python but without the flexibility seen in JavaScript. Go also has special naming rules: files ending in `_test.go` are treated as test files, and suffixes like `_linux.go` or `_amd64.go` enable platform-specific builds. These conventions are enforced by the Go toolchain itself, making consistency less of a manual concern.

### Why does file naming convention affect code readability and maintainability?
Consistent file naming makes a codebase easier to navigate, especially for new team members. When file names match the language's standard convention, developers can instantly recognize the file's role and expected contents. Mismatched conventions—such as mixing kebab-case and PascalCase in one project—create cognitive friction, slow down onboarding, and can even cause import errors in case-sensitive operating systems like Linux.

### Can I use a tool to convert file names between naming conventions?
Yes, text case conversion tools like **flipmycase.com** let you quickly convert file names between camelCase, PascalCase, snake_case, and kebab-case. This is especially useful when migrating a project between languages or aligning a codebase to a new style guide. Simply paste your file name, select the target convention, and copy the result—saving time and reducing the risk of manual typos during bulk renaming tasks.


<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What file naming convention should I use in JavaScript projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JavaScript projects typically use **camelCase** for files containing functions or utilities (e.g., `getUserData.js`) and **PascalCase** for component files, especially in React (e.g., `UserProfile.jsx`). Configuration files and general scripts often use **kebab-case** (e.g., `webpack-config.js`). The convention varies by framework and team preference, but consistency within a project matters most. Tools like ESLint can help enforce your chosen standard automatically."
      }
    },
    {
      "@type": "Question",
      "name": "Does Python have an official file naming convention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Python's official style guide (PEP 8) recommends **snake_case** for all module and file names (e.g., `user_profile.py`, `data_parser.py`). Names should be short, lowercase, and use underscores to separate words. Avoid hyphens, as they prevent files from being imported as modules. Following PEP 8 ensures compatibility with Python tooling and makes your codebase immediately recognizable to other Python developers."
      }
    },
    {
      "@type": "Question",
      "name": "How does Go handle file naming compared to Python and JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Go uses **snake_case** for file names (e.g., `http_handler.go`), similar to Python but without the flexibility seen in JavaScript. Go also has special naming rules: files ending in `_test.go` are treated as test files, and suffixes like `_linux.go` or `_amd64.go` enable platform-specific builds. These conventions are enforced by the Go toolchain itself, making consistency less of a manual concern."
      }
    },
    {
      "@type": "Question",
      "name": "Why does file naming convention affect code readability and maintainability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consistent file naming makes a codebase easier to navigate, especially for new team members. When file names match the language's standard convention, developers can instantly recognize the file's role and expected contents. Mismatched conventions\u2014such as mixing kebab-case and PascalCase in one project\u2014create cognitive friction, slow down onboarding, and can even cause import errors in case-sensitive operating systems like Linux."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use a tool to convert file names between naming conventions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, text case conversion tools like **flipmycase.com** let you quickly convert file names between camelCase, PascalCase, snake_case, and kebab-case. This is especially useful when migrating a project between languages or aligning a codebase to a new style guide. Simply paste your file name, select the target convention, and copy the result\u2014saving time and reducing the risk of manual typos during bulk renaming tasks."
      }
    }
  ]
}
</script>
