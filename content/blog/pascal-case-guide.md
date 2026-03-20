---
title: "PascalCase — The Naming Convention for Classes, Components, and Types"
description: "Complete guide to PascalCase naming convention: rules, usage for classes, React components, and TypeScript types, comparison with camelCase, and when PascalCase is required."
date: "2026-03-18"
keywords: ["PascalCase naming convention", "PascalCase guide", "PascalCase vs camelCase", "PascalCase classes", "PascalCase React components", "UpperCamelCase", "PascalCase TypeScript", "PascalCase examples", "PascalCase converter", "class naming convention"]
toolSlug: "pascal-case"
---

# PascalCase — The Naming Convention for Classes, Components, and Types

PascalCase is what you reach for when naming the important things in code — classes, components, interfaces, and types. Every major programming language uses it for at least one category of identifier, and getting it wrong in a code review is an easy way to look like you haven't read the style guide.

## What Is PascalCase and When to Use It

PascalCase capitalizes the first letter of every word in an identifier, with no separators between words. Unlike camelCase, the very first letter is also uppercase: `UserAccount`, `HttpRequestHandler`, `ShoppingCart`.

The name comes from the Pascal programming language, where this convention was standard. It is also called UpperCamelCase, since it follows the same hump pattern as camelCase but starts with a capital letter.

PascalCase is the standard for:

- **Class names** in virtually every language (Java, Python, JavaScript, C#, Ruby, Go, Rust)
- **React components** (`UserProfile`, `NavigationBar`, `CheckoutForm`)
- **TypeScript interfaces and type aliases** (`ApiResponse`, `UserSettings`)
- **C# methods and properties** (`GetUserById`, `FirstName`)
- **Go exported identifiers** (any identifier starting with uppercase is public)

## Step-by-Step Rules for PascalCase

**Rule 1: Capitalize the first letter of every word.** No exceptions for the first word (that would be camelCase). `UserProfile` not `userProfile`.

**Rule 2: No separators.** No underscores, hyphens, or spaces between words. `ShoppingCart` not `Shopping_Cart` or `Shopping-Cart`.

**Rule 3: Handle acronyms as words.** Modern style guides recommend `HttpClient`, `JsonParser`, `XmlDocument` rather than `HTTPClient`, `JSONParser`, `XMLDocument`. The word-style approach keeps boundaries readable. Microsoft's .NET guidelines specifically recommend this for acronyms longer than two letters.

**Rule 4: Numbers can appear after the first character.** `Vector2D`, `Sha256Hash`, `Base64Encoder` are all valid. Avoid starting with a number.

**Rule 5: Single-letter words are just capitalized.** A class modeling an X coordinate could be `XCoordinate`. Short words like "a" or "I" follow the same rule: capitalize the first letter, which for single letters means the entire word is uppercase.

## How FlipMyCase Helps

Converting multi-word descriptions to PascalCase by hand is straightforward for a single name, but it gets tedious when you are renaming dozens of classes, generating types from database tables, or converting between conventions. The case converter at [FlipMyCase](https://flipmycase.com) handles this instantly.

Paste a list of snake_case database columns, plain English descriptions, or kebab-case CSS names, and convert them all to PascalCase in one click. The tool correctly handles acronyms, strips special characters, and processes bulk input. Useful when scaffolding TypeScript interfaces from API documentation or generating C# model classes from a spec.

Bookmark [flipmycase.com](https://flipmycase.com) — it handles camelCase, snake_case, kebab-case, CONSTANT_CASE, and PascalCase conversions with zero setup.

## Tips, Variations, and Common Mistakes

**PascalCase vs camelCase.** The only structural difference is the first letter. `UserProfile` is PascalCase, `userProfile` is camelCase. Both capitalize subsequent words. In most languages, PascalCase signals a type or class, while camelCase signals a variable or function. Mixing them up is a common beginner mistake that breaks convention expectations.

**StUdLyCaPs is not PascalCase.** Random capitalization like `uSeRpRoFiLe` is sometimes called studly caps or mixed case. It has no place in professional code.

**When NOT to use PascalCase.** JavaScript variables and functions use camelCase, not PascalCase. Python functions and variables use snake_case. Using PascalCase for a regular variable in JavaScript (`const UserName = "Jason"`) is misleading because it implies `UserName` is a class or constructor.

**Common mistake: inconsistent acronym treatment.** Decide as a team whether acronyms are fully uppercase or treated as words. `HTTPSConnection` vs `HttpsConnection` — pick one and stick with it project-wide. Linters can enforce this.

**Common mistake: PascalCase for filenames.** Some projects use PascalCase filenames for component files (`UserProfile.tsx`), while others use kebab-case (`user-profile.tsx`). Both are valid, but mixing them in one project creates confusion. React projects commonly use PascalCase filenames to match component names.

## Real-World Examples

Converting plain English to PascalCase:

| Original | PascalCase |
|---|---|
| user account settings | `UserAccountSettings` |
| http request handler | `HttpRequestHandler` |
| shopping cart item | `ShoppingCartItem` |
| database connection pool | `DatabaseConnectionPool` |
| json web token | `JsonWebToken` |
| api response error | `ApiResponseError` |

**C# class definition:**

```csharp
public class UserAccountService    // class: PascalCase
{
    public string FirstName { get; set; }    // property: PascalCase
    public int GetAccountBalance() {}        // method: PascalCase
    private int accountId;                   // field: camelCase
}
```

**React component:**

```tsx
function UserProfileCard({ userId }: UserProfileProps) {
    // Component name: PascalCase
    // Props interface: PascalCase
    // Parameter: camelCase
    return <div className="user-profile-card">...</div>;
}
```

**TypeScript interface:**

```typescript
interface ApiResponse<T> {
    data: T;
    statusCode: number;
    errorMessage: string | null;
}
```

## Frequently Asked Questions

### What is the difference between PascalCase and camelCase?

PascalCase capitalizes the first letter of every word including the first (`UserProfile`), while camelCase leaves the first word lowercase (`userProfile`). In most languages, PascalCase is reserved for classes, types, and components, while camelCase is used for variables, functions, and parameters. The distinction signals whether an identifier represents a type or an instance.

### Why is it called PascalCase?

The convention is named after the Pascal programming language, created by Niklaus Wirth in 1970. Pascal used this capitalization style for type and program names. The term "PascalCase" became widespread in the 1990s as developers needed a way to distinguish it from camelCase. Some style guides call it UpperCamelCase instead, treating it as a variant of the camelCase family.

### Which languages use PascalCase for function names?

C# uses PascalCase for all public methods and properties — this is the most notable language where functions are PascalCase. Go uses PascalCase for any exported (public) function or variable. Most other languages — JavaScript, Python, Java, Ruby — reserve PascalCase for class and type names only, using camelCase or snake_case for function names.

### How do I convert text to PascalCase?

Use [FlipMyCase](https://flipmycase.com) to paste any text and convert it to PascalCase instantly. The tool handles snake_case, kebab-case, camelCase, and plain English input. For programmatic conversion, Lodash provides `_.upperFirst(_.camelCase(str))` in JavaScript. In Python, you can split on underscores or spaces and capitalize each word with `''.join(word.capitalize() for word in text.split())`.

## PascalCase in Popular Frameworks and Tools

**React and Next.js:** Every React component must start with an uppercase letter — this is how React distinguishes components from HTML elements. `<UserProfile />` renders a component. `<userProfile />` would be interpreted as an unknown HTML element. File names often match: `UserProfile.tsx`.

**Angular:** Classes, decorators, interfaces, and modules all use PascalCase. Services are `UserService`, components are `UserProfileComponent`, modules are `AppModule`.

**C# and .NET:** PascalCase is the convention for nearly everything public — classes, methods, properties, events, namespaces, and enum values. Only private fields and local variables use camelCase. This is the language where PascalCase is most pervasive.

**TypeScript:** Interfaces (`UserProfile`), type aliases (`ApiResponse`), enums (`UserRole`), and classes all use PascalCase. The convention extends to generic type parameters: `T`, `TKey`, `TValue`.

**Database ORMs:** Many ORMs map PascalCase class names to snake_case table names automatically. Entity Framework (C#) maps `UserAccount` to `user_accounts`. Django maps `UserProfile` to `app_userprofile`. Understanding both conventions matters when debugging SQL queries generated by an ORM.

**Design Systems:** Component libraries like Material UI, Chakra UI, and Ant Design export PascalCase component names: `<Button>`, `<TextField>`, `<DatePicker>`. This is universal in the React ecosystem.

## Conclusion

PascalCase is the universal signal for types, classes, and components across programming languages. The rules are simple — capitalize every word, no separators — but consistency requires team alignment on edge cases like acronyms and filenames.

Convert text to PascalCase instantly at [FlipMyCase](https://flipmycase.com), alongside camelCase, snake_case, kebab-case, and every other naming convention you need.
