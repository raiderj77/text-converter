---
title: "CONSTANT_CASE (Screaming Snake Case) — When to Use All-Caps Underscored Names"
description: "Complete guide to CONSTANT_CASE (SCREAMING_SNAKE_CASE): when to use all-caps underscored names for constants, environment variables, and configuration values across programming languages."
date: "2026-03-18"
keywords: ["CONSTANT_CASE guide", "SCREAMING_SNAKE_CASE", "UPPER_SNAKE_CASE", "constant naming convention", "environment variable naming", "all caps variable names", "constant case converter", "screaming snake case examples", "immutable variable naming", "configuration constant naming"]
toolSlug: "constant-case"
---

# CONSTANT_CASE (Screaming Snake Case) — When to Use All-Caps Underscored Names

CONSTANT_CASE tells every developer who reads your code the same thing: this value does not change. It is the universal signal for constants, environment variables, and configuration values across nearly every programming language.

## What Is CONSTANT_CASE

CONSTANT_CASE (also called SCREAMING_SNAKE_CASE or UPPER_SNAKE_CASE) writes every letter in uppercase with underscores separating words. `MAX_RETRIES`, `API_BASE_URL`, `DATABASE_CONNECTION_TIMEOUT`.

The convention serves a single purpose: marking values as immutable. When you see `MAX_RETRIES = 3`, you immediately know this value is fixed and should not be reassigned. Compare that to `maxRetries = 3`, which looks like a regular variable that might change later in the function.

CONSTANT_CASE is standard for:

- **Constants** in JavaScript, Python, Java, C, C++, Rust, and PHP
- **Environment variables** (`DATABASE_URL`, `NODE_ENV`, `AWS_ACCESS_KEY_ID`)
- **Enum values** in many languages
- **Preprocessor macros** in C/C++ (`#define MAX_BUFFER_SIZE 1024`)
- **Configuration keys** in `.env` files and config maps

## Rules and Conventions

**Rule 1: All letters uppercase.** Every alphabetic character is capitalized. No exceptions.

**Rule 2: Underscores separate words.** One underscore between each word: `MAX_RETRY_COUNT`, not `MAXRETRYCOUNT` or `MAX__RETRY__COUNT`.

**Rule 3: No leading or trailing underscores.** Leading underscores carry different meanings in many languages — `_private` in Python, `__dunder__` methods, `_` as an unused variable convention. `_MAX_RETRIES` looks like a private constant, which may or may not be your intent.

**Rule 4: Numbers are fine anywhere.** `SHA256_HASH`, `MAX_RETRY_3`, `HTTP_200_OK` — numbers can appear at any position within CONSTANT_CASE identifiers.

**Rule 5: Use for truly constant values only.** Not every `const` declaration deserves CONSTANT_CASE. In JavaScript, `const user = getUser()` is a constant binding, but the value is determined at runtime and is specific to a scope. Reserve CONSTANT_CASE for module-level or global values that are fixed for the entire application lifetime: `const MAX_FILE_SIZE = 10485760`.

## How FlipMyCase Helps

Converting phrases to CONSTANT_CASE by hand is simple for one name but tedious when you need to generate dozens of constants from a spec document or convert between conventions. The case converter at [FlipMyCase](https://flipmycase.com) supports CONSTANT_CASE as a built-in conversion target.

Paste any text — a sentence, a camelCase variable, a kebab-case slug — and convert it to CONSTANT_CASE instantly. The tool handles multi-line input, strips special characters, and produces clean output ready to paste into your code.

Use [flipmycase.com](https://flipmycase.com) when scaffolding configuration files, generating enum values, or converting between naming conventions across languages.

## Language-Specific Usage

**JavaScript / TypeScript:**
```javascript
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_TIMEOUT_MS = 5000;
```
Use CONSTANT_CASE for module-level constants. Regular `const` bindings in function scope stay in camelCase.

**Python:**
```python
MAX_RETRIES = 3
DATABASE_URL = os.environ.get("DATABASE_URL")
DEFAULT_PAGE_SIZE = 25
```
Python has no `const` keyword. CONSTANT_CASE is a convention only — the interpreter does not enforce immutability. Module-level constants use this style per PEP 8.

**Java:**
```java
public static final int MAX_RETRIES = 3;
public static final String API_BASE_URL = "https://api.example.com";
```
Java's `static final` fields are true compile-time constants. CONSTANT_CASE is mandatory for these by convention.

**C / C++:**
```c
#define MAX_BUFFER_SIZE 1024
#define ERROR_CODE_NOT_FOUND 404
```
Preprocessor macros universally use CONSTANT_CASE. This is one of the oldest and most consistent uses of the convention.

**Rust:**
```rust
const MAX_RETRIES: u32 = 3;
static API_VERSION: &str = "v2";
```
Rust enforces SCREAMING_SNAKE_CASE for `const` and `static` items at the compiler level — using camelCase for a constant produces a compiler warning.

**Go — the exception:**
```go
const MaxRetries = 3  // exported constant: PascalCase
const maxRetries = 3  // unexported constant: camelCase
```
Go does not use CONSTANT_CASE. Exported constants use PascalCase, unexported use camelCase. Visibility is determined by the first letter's case.

## Real-World Examples

Common phrases converted to CONSTANT_CASE:

| Original | CONSTANT_CASE |
|---|---|
| maximum retry count | `MAXIMUM_RETRY_COUNT` |
| api base url | `API_BASE_URL` |
| default page size | `DEFAULT_PAGE_SIZE` |
| session timeout seconds | `SESSION_TIMEOUT_SECONDS` |
| database connection string | `DATABASE_CONNECTION_STRING` |
| minimum password length | `MINIMUM_PASSWORD_LENGTH` |

**Environment variables (`.env` file):**
```
DATABASE_URL=postgres://localhost:5432/myapp
REDIS_HOST=127.0.0.1
NODE_ENV=production
AWS_ACCESS_KEY_ID=AKIA...
JWT_SECRET=your-secret-here
LOG_LEVEL=info
```

Every environment variable uses CONSTANT_CASE by universal convention. This applies across all operating systems, cloud platforms, and container orchestrators.

## Frequently Asked Questions

### What is the difference between CONSTANT_CASE and snake_case?

Both use underscores to separate words. The difference is letter casing: CONSTANT_CASE uses all uppercase letters (`MAX_RETRIES`), while snake_case uses all lowercase (`max_retries`). CONSTANT_CASE signals an immutable value — a configuration constant, enum member, or environment variable. snake_case signals a regular variable or function, most commonly in Python and Ruby.

### Should all constants use SCREAMING_SNAKE_CASE?

No. Reserve CONSTANT_CASE for module-level or global values that represent fixed configuration: `MAX_RETRIES`, `API_TIMEOUT`, `DEFAULT_LOCALE`. Local `const` bindings in JavaScript or `final` variables in a Java method should use camelCase because they are scoped values, not application-wide constants. The distinction is between "constant by nature" and "constant by assignment."

### Why are environment variables in CONSTANT_CASE?

Environment variables adopted CONSTANT_CASE from Unix conventions established in the 1970s. Shell variables were uppercase by convention, and system variables like `PATH`, `HOME`, and `USER` set the standard. When application configuration moved to environment variables (popularized by the Twelve-Factor App methodology), the convention carried over. Today it is universal across Linux, macOS, Windows, Docker, and every cloud platform.

### How do I convert text to CONSTANT_CASE?

Use [FlipMyCase](https://flipmycase.com) to convert any text to CONSTANT_CASE with one click. The tool accepts plain English, camelCase, kebab-case, or any format and produces clean SCREAMING_SNAKE_CASE output. For programmatic conversion, split on word boundaries (spaces, hyphens, case transitions), uppercase each segment, and join with underscores.

## When NOT to Use CONSTANT_CASE

**JavaScript `const` bindings.** Not every `const` deserves CONSTANT_CASE. `const user = getUser()` is a constant binding — the variable cannot be reassigned — but the value is computed at runtime. Reserve CONSTANT_CASE for values that are truly fixed: `const MAX_FILE_SIZE = 10485760`, `const API_VERSION = 'v2'`.

**Object and array constants.** A `const` object or array in JavaScript is mutable — you can still add, remove, or modify properties. `const CONFIG = { timeout: 5000 }` allows `CONFIG.timeout = 10000`. The CONSTANT_CASE name is misleading unless the object is frozen with `Object.freeze()`.

**Enum members that are strings.** In TypeScript, string enums can use either PascalCase or CONSTANT_CASE: `UserRole.Admin` vs `UserRole.ADMIN`. Teams split on this — TypeScript's own docs use PascalCase for enum members, while Java conventions use CONSTANT_CASE.

**Go identifiers.** Go does not use CONSTANT_CASE at all. Exported constants use PascalCase, unexported use camelCase. Writing `MAX_RETRIES` in Go code immediately marks you as someone coming from another language.

**CSS custom properties.** CSS variables use kebab-case: `--primary-color`, not `--PRIMARY_COLOR`. CONSTANT_CASE would violate the language convention even though custom properties are constant-like.

## CONSTANT_CASE in Configuration Systems

Beyond source code, CONSTANT_CASE dominates configuration:

**Docker and Kubernetes:** Environment variables in Dockerfiles (`ENV DATABASE_URL=...`), docker-compose files, and Kubernetes ConfigMaps all use CONSTANT_CASE. This extends to build arguments (`ARG NODE_VERSION=18`) and secrets.

**CI/CD pipelines:** GitHub Actions, GitLab CI, CircleCI, and Jenkins all use CONSTANT_CASE for environment variables and secrets: `GITHUB_TOKEN`, `CI_COMMIT_SHA`, `AWS_ACCESS_KEY_ID`.

**Shell scripting:** Bash and shell scripts follow the Unix convention — all environment and configuration variables in CONSTANT_CASE. Local function variables sometimes use lowercase, but exported variables are always uppercase.

**Infrastructure as Code:** Terraform variables, Ansible facts, and CloudFormation parameters commonly use CONSTANT_CASE or snake_case depending on the tool.

## Conclusion

CONSTANT_CASE is one of the most consistent conventions in programming — uppercase letters, underscore separators, reserved for immutable values. Whether you are defining environment variables, module constants, or enum members, the convention signals "this does not change" across every major language except Go.

Convert any text to CONSTANT_CASE at [FlipMyCase](https://flipmycase.com), alongside camelCase, PascalCase, snake_case, and every other naming convention.
