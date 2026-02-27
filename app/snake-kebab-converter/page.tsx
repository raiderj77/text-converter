import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { SnakeKebabConverterTool } from "@/components/tools/snake-kebab-converter";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("snake-kebab-converter")!;
const pageUrl = buildUrl("/snake-kebab-converter");

export const metadata: Metadata = {
  title: "Snake_case vs Kebab-case Converter: Naming Convention Tool",
  description: "Convert between snake_case and kebab-case instantly. Compare naming conventions, generate proper code formatting, and learn when to use each style. Free online tool.",
  alternates: { canonical: pageUrl },
  keywords: [
    "snake_case vs kebab-case converter", "snake case converter online", "kebab case converter tool",
    "snake_case to kebab-case converter", "underscore to hyphen converter", "naming convention converter",
    "snake case kebab case difference tool", "programming naming conventions converter", "code style converter online",
    "snake_case generator free", "kebab-case generator tool", "url slug converter online",
    "python naming convention converter", "javascript naming convention tool", "css class name converter",
    "database column naming converter", "api endpoint naming tool", "file naming convention converter",
    "snake case examples generator", "kebab case examples tool", "naming convention best practices guide",
  ],
  openGraph: {
    title: "Snake_case vs Kebab-case Converter: Naming Convention Tool",
    description: "Convert between snake_case and kebab-case instantly. Compare naming conventions, generate proper code formatting, and learn when to use each style.",
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What's the difference between snake_case and kebab-case?",
    answer:
      "snake_case uses underscores (_) between words (user_profile_picture), while kebab-case uses hyphens (-) between words (user-profile-picture). Both are lowercase by convention. snake_case is common in Python/Ruby code, while kebab-case is used for URLs and CSS classes.",
  },
  {
    question: "When should I use snake_case vs kebab-case?",
    answer:
      "Use snake_case for: Python/Ruby code, database column names, Unix filenames. Use kebab-case for: URLs, CSS class names, npm package names, HTML data-* attributes, command-line arguments. The choice often depends on the technology stack and community conventions.",
  },
  {
    question: "Can I preserve the original capitalization?",
    answer:
      "Yes. Enable the 'Preserve original case' option to keep words in their original capitalization (e.g., 'UserAuth' → 'User_Auth'). By default, both formats convert everything to lowercase for consistency with standard conventions.",
  },
  {
    question: "Which programming languages use snake_case?",
    answer:
      "Python (variables, functions), Ruby (methods, variables), PHP (sometimes), C (macros), and many others. snake_case is also common in database design (PostgreSQL, MySQL column names) and configuration files.",
  },
  {
    question: "Which technologies use kebab-case?",
    answer:
      "URLs and URL slugs, CSS class names and IDs, npm package names, HTML attributes (especially data-*), command-line tools and arguments, XML tags, and some programming languages like Lisp and Clojure.",
  },
  {
    question: "What about camelCase and PascalCase?",
    answer:
      "camelCase (userProfilePicture) is standard for JavaScript/Java variables. PascalCase (UserProfilePicture) is used for classes in many languages. This tool converts to all major naming conventions so you can compare them side by side.",
  },
  {
    question: "Is there a character limit?",
    answer:
      "No. The tool processes text entirely in your browser, so it can handle thousands of characters. Very long texts may be slow depending on your device, but there's no hard limit.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
];

export default function SnakeKebabConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Snake_case vs Kebab-case Converter"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Snake vs Kebab Converter", href: "/snake-kebab-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Snake_case vs Kebab-case Converter: Naming Convention Tool
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Convert between snake_case and kebab-case instantly. Compare naming conventions side by side,
          view practical examples, and select the appropriate format for your code. Free tool,
          no signup required, works entirely in your browser.
        </p>

        <div className="mt-4">
          <SnakeKebabConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="snake-kebab-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Snake_case vs Kebab-case: Which Should You Use?
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">snake_case</strong> (with underscores) and{" "}
              <strong>kebab-case</strong> (with hyphens) are two of the most common separator-based
              naming conventions in programming. Both serve the same purpose — making multi-word
              identifiers readable — but they're used in different contexts.
            </p>
            <p>
              The choice between them isn't arbitrary. Different technologies and communities have
              established conventions based on technical constraints, readability, and tradition.
              Using the wrong convention can make your code look out of place or even cause
              technical issues (like broken URLs or CSS selectors).
            </p>
            <p>
              This tool helps you convert between conventions instantly, compare them side by side,
              and understand when to use each based on real-world examples and best practices from
              major programming communities.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use Snake_case (Underscores)
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Python programming:</strong> The official
              Python style guide (PEP 8) recommends snake_case for variable names, function names,
              and method names. Example: <code>calculate_user_score</code>,{" "}
              <code>is_valid_email</code>.
            </p>
            <p>
              <strong className="text-neutral-200">Ruby programming:</strong> Ruby uses snake_case
              for method names and variable names. Example: <code>find_user_by_email</code>,{" "}
              <code>maximum_retry_count</code>.
            </p>
            <p>
              <strong className="text-neutral-200">Database design:</strong> SQL databases
              (PostgreSQL, MySQL) commonly use snake_case for table and column names. Example:{" "}
              <code>user_profile</code> table with <code>created_at</code> column.
            </p>
            <p>
              <strong className="text-neutral-200">Unix/Linux filenames:</strong> While not
              required, snake_case is common for script and configuration filenames. Example:{" "}
              <code>setup_database.sh</code>, <code>config_settings.yaml</code>.
            </p>
            <p>
              <strong className="text-neutral-200">Configuration files:</strong> Many config
              formats (YAML, TOML, .env files) use snake_case for keys. Example:{" "}
              <code>api_base_url</code>, <code>max_connection_pool</code>.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use Kebab-case (Hyphens)
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">URLs and URL slugs:</strong> Hyphens are
              URL-safe and recommended by Google for SEO. Example:{" "}
              <code>https://example.com/user-profile-picture</code>.
            </p>
            <p>
              <strong className="text-neutral-200">CSS class names and IDs:</strong> The CSS
              specification allows hyphens but treats underscores as part of the identifier name.
              Example: <code>.user-profile-picture</code>, <code>#main-navigation</code>.
            </p>
            <p>
              <strong className="text-neutral-200">npm package names:</strong> The npm registry
              requires lowercase names and recommends kebab-case. Example:{" "}
              <code>react-router-dom</code>, <code>express-validator</code>.
            </p>
            <p>
              <strong className="text-neutral-200">HTML attributes:</strong> Custom data
              attributes must use kebab-case. Example:{" "}
              <code>data-user-profile-id</code>, <code>aria-describedby</code>.
            </p>
            <p>
              <strong className="text-neutral-200">Command-line tools:</strong> Many CLI tools
              use kebab-case for commands and options. Example:{" "}
              <code>git commit --amend</code>, <code>docker-compose up</code>.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="snake-kebab-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Comparison Table: Naming Conventions Across Technologies
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-3 text-left font-semibold">Technology</th>
                  <th className="p-3 text-left font-semibold">Recommended Convention</th>
                  <th className="p-3 text-left font-semibold">Example</th>
                  <th className="p-3 text-left font-semibold">Why This Convention?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  {
                    tech: "Python",
                    convention: "snake_case",
                    example: "calculate_total_price",
                    reason: "PEP 8 style guide, community standard",
                  },
                  {
                    tech: "JavaScript/TypeScript",
                    convention: "camelCase (vars), PascalCase (classes)",
                    example: "calculateTotalPrice, UserService",
                    reason: "ECMAScript standard, matches browser APIs",
                  },
                  {
                    tech: "URLs / SEO",
                    convention: "kebab-case",
                    example: "blog-post-title-2025",
                    reason: "Hyphens are URL-safe, Google recommends for SEO",
                  },
                  {
                    tech: "CSS",
                    convention: "kebab-case",
                    example: ".primary-button, #main-header",
                    reason: "Hyphens work in selectors, underscores don't",
                  },
                  {
                    tech: "Java",
                    convention: "camelCase (vars), PascalCase (classes)",
                    example: "calculateTotalPrice, UserService",
                    reason: "Official Java Code Conventions",
                  },
                  {
                    tech: "Ruby",
                    convention: "snake_case",
                    example: "calculate_total_price",
                    reason: "Community style guide, matches Rails conventions",
                  },
                  {
                    tech: "Database (SQL)",
                    convention: "snake_case",
                    example: "user_accounts table, created_at column",
                    reason: "Readability in queries, common practice",
                  },
                  {
                    tech: "npm packages",
                    convention: "kebab-case",
                    example: "react-router-dom",
                    reason: "npm naming requirements, easier to type",
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5">
                    <td className="p-3 font-medium">{row.tech}</td>
                    <td className="p-3 font-mono">{row.convention}</td>
                    <td className="p-3 font-mono text-neutral-300">{row.example}</td>
                    <td className="p-3 text-neutral-400">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Best Practices for Choosing Naming Conventions
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Follow the language/framework conventions.</strong>
              When in Rome, do as the Romans do. If you're writing Python, use snake_case. If you're
              writing CSS, use kebab-case. Consistency with the ecosystem matters more than personal preference.
            </p>
            <p>
              <strong className="text-neutral-200">2. Consider technical constraints.</strong>
              Some systems have hard requirements: CSS selectors work with hyphens, URLs should use
              hyphens for SEO, some databases are case-insensitive.
            </p>
            <p>
              <strong className="text-neutral-200">3. Be consistent within your project.</strong>
              Pick one convention per context (e.g., snake_case for Python code, kebab-case for URLs)
              and stick to it throughout the project. Mixed conventions create confusion.
            </p>
            <p>
              <strong className="text-neutral-200">4. Think about readability.</strong>
              The whole point of these conventions is to make multi-word names readable. Choose the
              convention that makes your code most readable for your team and tools.
            </p>
            <p>
              <strong className="text-neutral-200">5. Document your choices.</strong>
              If your project uses non-standard conventions (like camelCase in Python), document why
              in your README or contributing guidelines to help new developers.
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

        <AdSlot slot="before-footer" page="snake-kebab-converter" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Convert between naming conventions here, then use our other tools for different
            case styles, text cleaning, or code formatting.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
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
              href="/json-formatter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              {`{ }`} JSON Formatter
            </Link>
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔐 String Encoder
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
