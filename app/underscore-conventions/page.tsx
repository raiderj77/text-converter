import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { UnderscoreConventionsTool } from "@/components/tools/underscore-conventions";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("underscore-conventions")!;
const pageUrl = buildUrl("/underscore-conventions");

export const metadata: Metadata = {
  title: "Why Programmers Use Underscores in Variable Names — Complete Guide to _private, __dunder & snake_case",
  description: "Learn why programmers use underscores in variable names. Complete guide to _private, __dunder, snake_case, and trailing underscores. Examples for Python, JavaScript, and other languages. Free online guide.",
  alternates: { canonical: pageUrl },
  keywords: [
    "why programmers use underscores", "underscore in variable names", "_private variable meaning",
    "__dunder methods python", "snake_case naming convention", "trailing underscore variable",
    "python underscore conventions", "javascript underscore usage", "private variables underscore",
    "double underscore methods", "name mangling python", "single underscore variable",
    "programming naming conventions", "underscore prefix meaning", "underscore suffix meaning",
    "protected variables underscore", "magic methods python", "reserved names underscore",
    "code style underscore rules", "underscore best practices programming",
  ],
  openGraph: {
    title: "Why Programmers Use Underscores in Variable Names — Complete Guide to _private, __dunder & snake_case",
    description: "Learn why programmers use underscores in variable names. Complete guide to _private, __dunder, snake_case, and trailing underscores. Examples for Python, JavaScript, and other languages.",
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What does a single underscore prefix mean (_variable)?",
    answer:
      "A single underscore prefix (like `_variable`) conventionally indicates a 'protected' or 'internal use' variable. It's a hint to other developers that this variable is intended for internal use within the module/class and shouldn't be accessed directly from outside. Python doesn't enforce this, but linters and IDEs treat it specially.",
  },
  {
    question: "What are double underscore (dunder) methods (__init__)?",
    answer:
      "Double underscore methods (like `__init__`, `__str__`, `__len__`) are Python's 'magic methods' or 'dunder' (double underscore) methods. They define special behavior for classes, such as initialization, string representation, length, etc. These are called automatically by Python in specific contexts.",
  },
  {
    question: "What is name mangling in Python?",
    answer:
      "When a variable starts with double underscores (like `__private`), Python performs 'name mangling' — it renames the variable to `_ClassName__private` internally. This prevents accidental overriding in subclasses but isn't true privacy (it's still accessible if you know the mangled name).",
  },
  {
    question: "What does a trailing underscore mean (variable_)?",
    answer:
      "A trailing underscore (like `class_` or `type_`) is used when you need to use a Python keyword as a variable name. For example, `class` is a keyword, so you'd use `class_` instead. It's also used to avoid shadowing built-in names like `list_`, `dict_`, etc.",
  },
  {
    question: "What is snake_case and when is it used?",
    answer:
      "snake_case uses underscores between words (like `user_profile_picture`). It's the standard naming convention in Python for variables, functions, and methods. Other languages like Ruby and PHP also use snake_case. It's preferred for readability, especially with longer names.",
  },
  {
    question: "Do other languages use underscores differently?",
    answer:
      "Yes. JavaScript typically uses camelCase for variables/functions, but underscores appear in CONSTANTS (UPPER_SNAKE_CASE) and sometimes for private fields (though modern JS uses `#` for true privacy). C++ uses `m_` prefix for member variables. Each language community has its own conventions.",
  },
  {
    question: "Are underscores required for private variables?",
    answer:
      "In most languages, no — underscores are conventions, not enforcement. Python's `_private` is just a convention. Java uses `private` keyword. JavaScript now has `#` for true private fields. The underscore tells humans 'this is internal,' while access modifiers tell the compiler.",
  },
  {
    question: "When should I NOT use underscores?",
    answer:
      "Avoid underscores: 1) In JavaScript variable/function names (use camelCase), 2) In CSS class names (use kebab-case), 3) In URLs (use hyphens), 4) When it conflicts with team/style guide conventions. Always follow the dominant convention of the language/framework you're using.",
  },
];

export default function UnderscoreConventionsPage() {
  return (
    <>
      <WebAppSchema
        name="Underscore Conventions Guide"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Underscore Conventions Guide", href: "/underscore-conventions" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Why Programmers Use Underscores in Variable Names
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Complete guide to underscore conventions in programming: _private variables, __dunder methods,
          snake_case naming, trailing underscores, and language-specific patterns. Learn when and why
          programmers use underscores with real code examples.
        </p>

        <div className="mt-4">
          <UnderscoreConventionsTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="underscore-conventions" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            The 5 Types of Underscore Usage in Programming
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Single underscore prefix (`_variable`)</strong> —
              Conventionally indicates 'protected' or 'internal use only' variables. In Python, names
              starting with `_` aren't imported by `from module import *`. It's a soft warning to
              other developers: "This is for internal implementation, don't touch it directly."
            </p>
            <p>
              <strong className="text-neutral-200">2. Double underscore prefix (`__private`)</strong> —
              Triggers Python's name mangling. The variable is renamed to `_ClassName__private` to
              prevent accidental overriding in subclasses. Not true privacy (can still be accessed
              with the mangled name), but prevents naming collisions in inheritance hierarchies.
            </p>
            <p>
              <strong className="text-neutral-200">3. Double underscore surround (`__init__`)</strong> —
              'Dunder' (double underscore) methods in Python. These are special methods that Python
              calls automatically in specific contexts. `__init__` initializes objects, `__str__`
              provides string representation, `__len__` enables `len()` support, etc.
            </p>
            <p>
              <strong className="text-neutral-200">4. Trailing underscore (`class_`, `type_`)</strong> —
              Used to avoid naming conflicts with Python keywords or built-in functions. When you
              need a variable named 'class' (a keyword), use `class_` instead. Also used for
              avoiding shadowing: `list_` instead of `list` (which would shadow the built-in `list`).
            </p>
            <p>
              <strong className="text-neutral-200">5. Snake_case (`user_profile_picture`)</strong> —
              The standard naming convention in Python for variables, functions, and methods.
              Uses underscores between words for readability. Much clearer than camelCase for
              longer, descriptive names common in Python codebases.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Language-Specific Underscore Conventions
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                language: "Python",
                conventions: [
                  "`_variable` — protected/internal",
                  "`__private` — name mangling",
                  "`__init__` — dunder methods",
                  "`variable_` — avoid keywords",
                  "snake_case — standard naming",
                ],
              },
              {
                language: "JavaScript",
                conventions: [
                  "`CONSTANT_NAME` — constants",
                  "`_private` — convention only",
                  "`#private` — true private (ES2022+)",
                  "camelCase — standard naming",
                  "No dunder methods",
                ],
              },
              {
                language: "C++",
                conventions: [
                  "`m_variable` — member variables",
                  "`_variable` — avoid (reserved)",
                  "`g_variable` — global variables",
                  "camelCase or snake_case",
                  "Leading underscore reserved",
                ],
              },
              {
                language: "Java",
                conventions: [
                  "`mVariable` — member variables",
                  "`CONSTANT_NAME` — constants",
                  "`_variable` — uncommon",
                  "camelCase — standard naming",
                  "`private` keyword for privacy",
                ],
              },
              {
                language: "Ruby",
                conventions: [
                  "`@variable` — instance variable",
                  "`@@variable` — class variable",
                  "`$variable` — global variable",
                  "`_variable` — unused param",
                  "snake_case — standard naming",
                ],
              },
              {
                language: "PHP",
                conventions: [
                  "`$_variable` — superglobals",
                  "`$variable_name` — snake_case",
                  "`CONSTANT_NAME` — constants",
                  "`__METHOD__` — magic constants",
                  "Mixed conventions historically",
                ],
              },
            ].map((lang) => (
              <div
                key={lang.language}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4"
              >
                <div className="text-sm font-semibold">{lang.language}</div>
                <ul className="mt-2 space-y-1">
                  {lang.conventions.map((conv, idx) => (
                    <li key={idx} className="text-xs text-neutral-400">
                      • {conv}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="mid-content" page="underscore-conventions" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Real-World Examples of Underscore Usage
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Python class with all underscore types:</strong>
            </p>
            <pre className="mt-2 p-3 bg-neutral-950 rounded-lg text-xs font-mono overflow-x-auto">
{`class UserAccount:
    def __init__(self, username, class_):  # trailing underscore avoids 'class' keyword
        self.username = username
        self._protected_data = {}          # single underscore: internal use
        self.__private_key = hash(username) # double underscore: name mangling
        self.class_type = class_           # trailing underscore in variable name
    
    def __str__(self):                     # dunder method
        return f"User: {self.username}"
    
    def get_public_info(self):             # snake_case method name
        return {"username": self.username}`}
            </pre>
            <p className="mt-4">
              <strong className="text-neutral-200">JavaScript with modern and legacy conventions:</strong>
            </p>
            <pre className="mt-2 p-3 bg-neutral-950 rounded-lg text-xs font-mono overflow-x-auto">
{`// Modern JavaScript (ES2022+)
class UserAccount {
    #privateBalance = 0;          // True private field
    _legacyPrivate = 0;           // Convention-only private
    PUBLIC_CONSTANT = "USER";     // Constant in UPPER_SNAKE_CASE
    
    constructor(username) {
        this.username = username; // Public property (camelCase)
    }
    
    // Public method (camelCase)
    getPublicInfo() {
        return {
            username: this.username,
            constant: this.PUBLIC_CONSTANT
        };
    }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Best Practices for Using Underscores
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Follow the language's dominant convention.</strong>
              Python uses snake_case and `_private`. JavaScript uses camelCase and `#private`.
              Ruby uses snake_case and `@instance_variable`. Don't mix conventions within a project.
            </p>
            <p>
              <strong className="text-neutral-200">Use underscores for clarity, not obfuscation.</strong>
              The goal is to communicate intent to other developers. `_internal_data` says "this is
              for internal use." `__mangled_name` says "don't override this in subclasses."
            </p>
            <p>
              <strong className="text-neutral-200">Be consistent within your codebase.</strong>
              If you start using `_prefix` for internal methods, use it everywhere. If you use
              `CONSTANTS` for configuration values, don't mix with `regularVariables`.
            </p>
            <p>
              <strong className="text-neutral-200">Understand the actual behavior.</strong>
              Python's `__private` causes name mangling. JavaScript's `#private` is truly private.
              C's `_variable` is reserved. Know what the underscores actually do in your language.
            </p>
            <p>
              <strong className="text-neutral-200">When in doubt, look at popular projects.</strong>
              Check how major open-source projects in your language use underscores. Django (Python),
              React (JavaScript), Rails (Ruby) — these establish community conventions.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqItems.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4"
              >
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="underscore-conventions" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Learn about underscore conventions here, then use our other tools for text conversion,
            cleaning, and analysis.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
            </Link>
            <Link
              href="/snake-kebab-converter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🐍 Snake vs Kebab
            </Link>
            <Link
              href="/toggle-case-converter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Toggle Case
            </Link>
            <Link
              href="/word-counter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Word Counter
            </Link>
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧹 Text Cleaner
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
