export const metadata = {
  title: "Learn Text Case Styles",
  description:
    "Clear examples and use cases for uppercase, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and URL slugs.",
};

function Ex(props: { label: string; useFor: string; example: string; notes?: string }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
      <div className="text-sm font-semibold">{props.label}</div>
      <div className="mt-2 text-sm opacity-80">{props.useFor}</div>
      <div className="mt-3 rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm break-words">
        {props.example}
      </div>
      {props.notes ? (
        <div className="mt-2 text-xs opacity-70">{props.notes}</div>
      ) : null}
    </div>
  );
}

function MiniFaq(props: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
      <div className="text-sm font-semibold">{props.q}</div>
      <div className="mt-2 text-sm opacity-80">{props.a}</div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Learn text case styles</h1>

        <p className="mt-3 text-sm opacity-80">
          Text casing shows up everywhere. Headings, emails, spreadsheets, code variables, file names, and URLs.
          This guide explains what each case is, where it is used, and how to avoid common mistakes.
        </p>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Quick definitions</h2>
          <div className="mt-3 grid gap-3">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
              <div className="text-sm font-semibold">Case</div>
              <p className="mt-2 text-sm opacity-80">
                A “case style” is a consistent way to format letters, word boundaries, and separators. The goal is clarity and consistency.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
              <div className="text-sm font-semibold">Separators</div>
              <p className="mt-2 text-sm opacity-80">
                Some formats use separators such as underscores or hyphens. Others remove separators and use capital letters to mark word boundaries.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Common writing cases</h2>
          <p className="mt-2 text-sm opacity-80">
            Use these formats for documents, emails, headings, and general readability.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <Ex
              label="UPPERCASE"
              useFor="Labels, warnings, and short emphasis."
              example="WARNING. DO NOT SHARE PASSWORDS."
              notes="Avoid long all-caps paragraphs. They reduce readability."
            />
            <Ex
              label="lowercase"
              useFor="Normalization, consistency, and casual writing."
              example="normalize product names to lowercase before comparing."
              notes="Lowercase is common for tags, identifiers, and cleanup steps."
            />
            <Ex
              label="Title Case"
              useFor="Headings, titles, and navigation labels."
              example="How To Convert Text Case"
              notes="Different style guides treat small words differently. This tool uses a simple word-start capitalization rule."
            />
            <Ex
              label="Sentence case"
              useFor="Normal writing, UI labels, and short descriptions."
              example="This is a sentence."
              notes="In this tool, sentence case standardizes the first character and lowercases the rest."
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Developer cases</h2>
          <p className="mt-2 text-sm opacity-80">
            These formats are used for variables, file names, and URLs.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <Ex
              label="camelCase"
              useFor="JavaScript variables, JSON keys, and many APIs."
              example="userName, totalPrice, isLoggedIn"
              notes="First word starts lowercase. Each next word starts uppercase."
            />
            <Ex
              label="PascalCase"
              useFor="Class names, types, and React components."
              example="UserProfile, CheckoutForm, PaymentStatus"
              notes="Same as camelCase but first word starts uppercase."
            />
            <Ex
              label="snake_case"
              useFor="Python variables, database fields, and ETL pipelines."
              example="user_name, total_price, created_at"
              notes="Words separated by underscores. Simple and readable."
            />
            <Ex
              label="kebab-case"
              useFor="URLs and file paths."
              example="text-case-converter, my-blog-post, docs/getting-started"
              notes="Words separated by hyphens. Common for web-friendly strings."
            />
            <Ex
              label="slug"
              useFor="URL-friendly page names and product pages."
              example="how-to-format-text, json-formatter-online"
              notes="Typically lowercase with hyphens. Symbols are removed."
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Common mistakes</h2>
          <div className="mt-3 grid gap-3">
            <MiniFaq
              q="Why do symbols disappear in camelCase and PascalCase?"
              a="Those formats are used for identifiers. Symbols and extra separators are removed so the result stays valid for code."
            />
            <MiniFaq
              q="Why do URLs prefer kebab-case?"
              a="Hyphens are widely supported, easy to read, and commonly used by publishing platforms and documentation sites."
            />
            <MiniFaq
              q="What is the difference between kebab-case and slug?"
              a="They look similar. A slug usually applies extra cleanup like removing quotes and trimming repeated separators."
            />
            <MiniFaq
              q="Do I need Title Case or Sentence case for headings?"
              a="Pick one style and be consistent. Title Case is common for blog titles. Sentence case is common in modern app UI."
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Why a converter helps</h2>
          <ul className="mt-3 list-disc pl-5 text-sm opacity-80 space-y-2">
            <li>You paste text once and reuse it across tools.</li>
            <li>You avoid manual edits that introduce mistakes.</li>
            <li>You normalize casing for data cleanup and consistent naming.</li>
            <li>You create URL slugs fast for posts, products, and docs.</li>
          </ul>
        </section>

        <div className="mt-10">
          <a className="text-sm underline" href="/">
            Back to the converter
          </a>
        </div>
      </div>
    </main>
  );
}
