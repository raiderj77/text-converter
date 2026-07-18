import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { SqlFormatterTool } from "@/components/tools/sql-formatter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
const tool = getToolBySlug("sql-formatter")!;
const pageUrl = buildUrl("/sql-formatter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "sql formatter", "sql beautifier", "sql formatter online", "sql pretty print",
    "format sql online", "sql indent", "sql minifier", "minify sql",
    "sql beautify online", "sql uppercase keywords", "sql query formatter",
    "free sql formatter",
  ],
  openGraph: {
    title: tool.title,
    description: tool.description,
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What does a SQL formatter do?",
    answer:
      "A SQL formatter takes a raw SQL query and reformats it with proper indentation, uppercase keywords, and line breaks so the structure is easy to read. It separates clauses like SELECT, FROM, WHERE, and JOIN onto their own lines and indents sub-clauses like AND and OR.",
  },
  {
    question: "Why should I uppercase SQL keywords?",
    answer:
      "Uppercasing SQL keywords like SELECT, FROM, and WHERE is a widely adopted convention that makes queries easier to scan. It creates a clear visual distinction between keywords and identifiers (table names, column names). While SQL is case-insensitive for keywords, uppercase improves readability, especially in long queries with many joins and conditions.",
  },
  {
    question: "What is the difference between formatting and minifying SQL?",
    answer:
      "Formatting adds indentation and line breaks to make SQL human-readable. Minifying removes all unnecessary whitespace and collapses the query to the smallest possible string. Use formatting during development and code review. Use minifying when embedding SQL in application code, logs, or URLs where space matters.",
  },
  {
    question: "Does this tool validate SQL syntax?",
    answer:
      "This tool focuses on formatting and does not validate SQL syntax against a specific database engine. It uppercases recognized keywords and adds structural indentation, but it does not check whether your table names, column names, or SQL dialect-specific syntax are correct. For syntax validation, use your database client or a dedicated SQL linter.",
  },
  {
    question: "What SQL dialects does this support?",
    answer:
      "The formatter works with standard SQL keywords used across all major databases including MySQL, PostgreSQL, SQLite, SQL Server, Oracle, and MariaDB. It uppercases common keywords like SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, HAVING, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, UNION, LIMIT, OFFSET, CASE, and WHEN.",
  },
  {
    question: "Is my SQL data sent to a server?",
    answer:
      "No. All formatting and minification happens entirely in your browser using JavaScript. Your SQL queries never leave your device. There is no server-side processing, no logging, and no data storage.",
  },
  {
    question: "Can I format multiple SQL statements?",
    answer:
      "Yes. You can paste multiple SQL statements separated by semicolons. The formatter processes the entire input as a single block, uppercasing keywords and adding line breaks before major clauses throughout the text.",
  },
  {
    question: "Why do some developers prefer lowercase SQL keywords?",
    answer:
      "Some teams prefer lowercase keywords to match their ORM-generated queries or to reduce visual noise in code editors with syntax highlighting. Both conventions are valid. The important thing is consistency within a project. This formatter defaults to uppercase because it is the most widely used convention in SQL style guides.",
  },
  {
    question: "Can the formatter handle complex queries?",
    answer:
      "Yes. The SQL formatter handles subqueries, CTEs (WITH clauses), window functions, CASE expressions, multiple JOINs, and nested conditions. Each clause gets proper indentation regardless of query complexity.",
  },
  {
    question: "Does formatting change how a query executes?",
    answer:
      "No. SQL formatting is purely cosmetic — whitespace and line breaks have no effect on query execution or performance. A minified query and a beautifully formatted query produce identical results in any SQL database.",
  },
];

export default function SqlFormatterPage() {
  return (
    <>
      <WebAppSchema
        name="Free SQL Formatter & Beautifier"
        description={tool.description}
        url={pageUrl}
        dateModified={"2026-07-12"}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "SQL Formatter", href: "/sql-formatter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">SQL Formatter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free SQL Formatter &amp; Beautifier
        </h1>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          An SQL formatter and beautifier formats SQL queries with proper indentation, uppercase keywords, and readable structure. Paste your SQL below to format or minify it instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <SqlFormatterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="sql-formatter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">What Is SQL Formatting?</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              SQL formatting takes a compact or messy query and adds consistent indentation, line
              breaks, and keyword casing to make it human-readable. Each major clause (SELECT, FROM,
              WHERE, JOIN, GROUP BY, ORDER BY) starts on its own line. Subqueries are indented.
              Keywords are uppercased. The result is a query you can read, debug, and review in
              seconds instead of parsing a wall of text.
            </p>
            <p>
              You would use SQL formatting when debugging queries from application logs, reviewing
              database migrations, writing documentation with SQL examples, standardizing team
              code style, and preparing queries for code review.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Code Examples for SQL Formatting</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <div>
              <h3 className="text-base font-semibold">JavaScript (sql-formatter package)</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-javascript">{`// npm install sql-formatter
const { format } = require('sql-formatter');

const ugly = 'SELECT u.id,u.name,o.total FROM users u ' +
  'INNER JOIN orders o ON u.id=o.user_id ' +
  'WHERE o.created_at>2024-01-01 AND u.active=true ' +
  'ORDER BY o.total DESC LIMIT 10';

const formatted = format(ugly, {
  language: 'postgresql',
  keywordCase: 'upper',
  indentStyle: 'standard',
  tabWidth: 2,
});
console.log(formatted);`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Python (sqlparse)</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-python">{`# pip install sqlparse
import sqlparse

ugly = "SELECT u.id,u.name FROM users u INNER JOIN orders o ON u.id=o.user_id WHERE u.active=true LIMIT 10"

formatted = sqlparse.format(
    ugly,
    reindent=True,
    keyword_case='upper',
    indent_width=2,
)
print(formatted)

# Parse and analyze SQL tokens
parsed = sqlparse.parse("SELECT id FROM users WHERE active = true")[0]
for token in parsed.tokens:
    if not token.is_whitespace:
        print(f'{token.ttype}: {token}')`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Go</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-go">{`package main

import (
    "fmt"
    "strings"
)

func uppercaseKeywords(sql string) string {
    keywords := []string{
        "SELECT", "FROM", "WHERE", "AND", "OR",
        "INNER JOIN", "LEFT JOIN", "ORDER BY", "GROUP BY",
        "HAVING", "LIMIT", "INSERT INTO", "UPDATE", "SET",
    }
    result := sql
    for _, kw := range keywords {
        result = strings.ReplaceAll(
            result,
            strings.ToLower(kw),
            kw,
        )
    }
    return result
}

func main() {
    sql := "select id, name from users where active = true order by name limit 10"
    fmt.Println(uppercaseKeywords(sql))
}`}</code></pre>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Format SQL Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your mode.</strong> Click
              Format / Beautify to add proper indentation and uppercase keywords, or
              Minify to compress your SQL into a single line with minimal whitespace.
            </p>
            <p>
              <strong className="text-neutral-200">2. Paste your SQL.</strong> Drop
              your query into the input box. The formatter processes it in real time,
              uppercasing keywords like SELECT, FROM, WHERE, and JOIN while adding
              line breaks before each major clause.
            </p>
            <p>
              <strong className="text-neutral-200">3. Review the output.</strong> The
              formatted SQL appears below with proper indentation. Sub-clauses like
              AND and OR are indented under their parent clause for clarity.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click
              Copy to copy the formatted or minified SQL to your clipboard.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why SQL Formatting Matters for Developers
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              SQL is the universal language of relational databases, powering everything
              from small SQLite files to massive PostgreSQL and Oracle data warehouses.
              Despite its ubiquity, SQL formatting is often an afterthought. Queries
              get written as single lines, copied from logs without formatting, or
              auto-generated by ORMs with no regard for readability. A SQL formatter
              solves this by enforcing consistent structure automatically.
            </p>
            <p>
              <strong className="text-neutral-200">Readability speeds up debugging.</strong> A
              well-formatted query with each clause on its own line makes it immediately
              clear which tables are being joined, what filters are applied in the WHERE
              clause, and how results are ordered or grouped. When a query returns
              unexpected results, formatted SQL lets you isolate the problem clause in
              seconds instead of parsing a wall of text.
            </p>
            <p>
              <strong className="text-neutral-200">Code reviews benefit from consistency.</strong> When
              every developer on a team formats SQL differently, pull request diffs
              become noisy with formatting changes mixed in with logic changes. A
              standardized format eliminates this noise. Reviewers can focus on what
              the query does rather than how it looks.
            </p>
            <p>
              <strong className="text-neutral-200">Uppercase keywords are a convention, not a requirement.</strong> SQL
              keywords are case-insensitive in every major database engine. Writing
              SELECT or select produces the same result. However, the uppercase
              convention dates back to the earliest SQL style guides and remains the
              most widely adopted standard. It creates a visual hierarchy that
              separates structural keywords from user-defined identifiers like table
              and column names.
            </p>
            <p>
              <strong className="text-neutral-200">Minification has its place.</strong> While
              readable SQL is essential during development, minified SQL is useful
              when embedding queries in application code, URL parameters, or compact
              log entries. Removing whitespace reduces payload size and prevents
              multi-line string issues in some programming languages.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="sql-formatter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About SQL Formatter
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqItems.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4"
              >
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="sql-formatter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Format SQL here, then use our other tools for JSON, XML, and data conversion.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/json-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">{"{ }"}</div>
              <div className="mt-1 text-sm font-semibold">JSON Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & beautify JSON data</p>
            </Link>
            <Link
              href="/xml-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📄</div>
              <div className="mt-1 text-sm font-semibold">XML Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, beautify & minify XML data</p>
            </Link>
            <Link
              href="/html-to-markdown"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📝</div>
              <div className="mt-1 text-sm font-semibold">HTML to Markdown</div>
              <p className="mt-1 text-xs text-neutral-400">Convert between HTML and Markdown</p>
            </Link>
            <Link
              href="/regex-tester"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">⚙️</div>
              <div className="mt-1 text-sm font-semibold">Regex Tester</div>
              <p className="mt-1 text-xs text-neutral-400">Test regular expressions with live highlighting</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
