export const metadata = {
  title: "Learn Text Case Styles",
  description:
    "Examples and use cases for uppercase, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and URL slugs.",
};

function Ex({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
      <div className="text-sm font-semibold">{label}</div>
      <div className="mt-2 text-sm opacity-80 break-words">{value}</div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Learn text case styles</h1>
        <p className="mt-3 text-sm opacity-80">
          This page explains when each text case is used. If you write code, create content, or
          format titles for documents, these patterns show up daily.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Common writing cases</h2>
        <p className="mt-2 text-sm opacity-80">
          Use these formats for documents, emails, headings, and readability.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3">
          <Ex label="UPPERCASE" value="Useful for emphasis in labels. Example: WARNING, IMPORTANT, READ ME." />
          <Ex label="lowercase" value="Useful for casual text and normalization. Example: keep consistent casing." />
          <Ex label="Title Case" value="Useful for headings. Example: How To Format A Blog Post Title." />
          <Ex
            label="Sentence case"
            value="Useful for normal sentences and UI labels. Example: This is a sentence."
          />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Developer cases</h2>
        <p className="mt-2 text-sm opacity-80">
          These formats are used for variables, file names, and URLs.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3">
          <Ex
            label="camelCase"
            value="Common in JavaScript and many APIs. Example: userName, totalPrice, isLoggedIn."
          />
          <Ex
            label="PascalCase"
            value="Common for class names and React components. Example: UserProfile, CheckoutForm."
          />
          <Ex
            label="snake_case"
            value="Common in Python and SQL. Example: user_name, total_price, created_at."
          />
          <Ex
            label="kebab-case"
            value="Common for URLs and file names. Example: text-case-converter, my-blog-post."
          />
          <Ex
            label="slug"
            value="A URL-friendly string. Example: how-to-format-text, json-formatter-online."
          />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Why a converter helps</h2>
        <ul className="mt-3 list-disc pl-5 text-sm opacity-80 space-y-2">
          <li>You copy text once and reuse it across tools.</li>
          <li>You avoid manual edits that introduce mistakes.</li>
          <li>You normalize casing for data cleanup and consistent naming.</li>
          <li>You create URL slugs fast for posts, products, and docs.</li>
        </ul>

        <div className="mt-10">
          <a className="text-sm underline" href="/">
            Back to the converter
          </a>
        </div>
      </div>
    </main>
  );
}
