import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { YamlFormatterTool } from "@/components/tools/yaml-formatter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("yaml-formatter")!;
const pageUrl = buildUrl("/yaml-formatter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "yaml formatter", "yaml validator", "yaml to json", "json to yaml",
    "yaml formatter online", "yaml beautifier", "yaml lint",
    "yaml to json converter", "json to yaml converter", "yaml parser online",
    "format yaml online", "validate yaml online",
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
    question: "What is YAML?",
    answer:
      "YAML (YAML Ain't Markup Language) is a human-readable data serialization format. It uses indentation to represent structure instead of brackets or tags, making it easy to read and write. YAML is commonly used for configuration files in Docker, Kubernetes, Ansible, GitHub Actions, and many other tools.",
  },
  {
    question: "How does YAML differ from JSON?",
    answer:
      "YAML uses indentation instead of braces and brackets, supports comments (lines starting with #), allows multi-line strings, and is generally more readable for configuration files. JSON is stricter, more widely supported in APIs, and easier for machines to parse. YAML is a superset of JSON, meaning valid JSON is also valid YAML.",
  },
  {
    question: "What are common YAML syntax errors?",
    answer:
      "The most common YAML errors are inconsistent indentation (mixing tabs and spaces), missing colons after keys, unquoted strings that contain special characters (like colons or at signs), incorrect list formatting (missing dash or space after dash), and duplicate keys in the same mapping.",
  },
  {
    question: "Should I use tabs or spaces in YAML?",
    answer:
      "Always use spaces. The YAML specification explicitly forbids tab characters for indentation. Most YAML parsers will reject files with tabs. Use 2 spaces per level (the most common convention) or 4 spaces if your team prefers it.",
  },
  {
    question: "Can I convert YAML to JSON and back?",
    answer:
      "Yes. This tool supports bidirectional conversion. YAML to JSON is lossless for data content. JSON to YAML preserves all data but adds YAML formatting. Note that YAML comments are lost during conversion because JSON does not support comments.",
  },
  {
    question: "Where is YAML used?",
    answer:
      "YAML is the standard configuration format for Docker Compose, Kubernetes manifests, Ansible playbooks, GitHub Actions workflows, GitLab CI, Travis CI, Swagger/OpenAPI specifications, Spring Boot (application.yml), Ruby on Rails, and many other DevOps and development tools.",
  },
  {
    question: "What does the minify option do?",
    answer:
      "Minify converts your YAML to the most compact JSON representation, removing all whitespace and comments. This is useful when you need to embed configuration data in an environment variable, API call, or single-line field where YAML formatting is not supported.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All formatting, validation, and conversion happens in your browser. Your YAML and JSON data never leave your device.",
  },
];

export default function YamlFormatterPage() {
  return (
    <>
      <WebAppSchema
        name="Free YAML Formatter & Validator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "YAML Formatter", href: "/yaml-formatter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">YAML Formatter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free YAML Formatter &amp; Validator
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-300">
          Format, validate, and convert YAML online. Includes YAML to JSON and JSON to
          YAML conversion, minification, and instant error detection. Free, no signup,
          works entirely in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <YamlFormatterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="yaml-formatter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Format and Validate YAML Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your mode.</strong> Format
              YAML to clean up indentation, Minify to compress, YAML to JSON for
              conversion, or JSON to YAML for the reverse direction.
            </p>
            <p>
              <strong className="text-neutral-200">2. Select indentation.</strong> Choose
              between 2 spaces (most common for YAML) or 4 spaces. YAML does not allow
              tabs for indentation.
            </p>
            <p>
              <strong className="text-neutral-200">3. Paste your data.</strong> The tool
              processes your input instantly. Valid YAML or JSON is formatted and
              displayed. Errors show a detailed message with the location of the problem.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click
              Copy to copy the formatted output to your clipboard, ready for your
              configuration file or API request.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            YAML in Modern Development Workflows
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              YAML has become the default configuration language for modern DevOps and
              cloud-native development. Its emphasis on human readability makes it ideal
              for configuration files that are frequently read and edited by developers,
              unlike JSON which prioritizes machine parsing. Understanding YAML syntax
              and being able to validate it quickly is essential for anyone working with
              containers, CI/CD pipelines, or infrastructure as code.
            </p>
            <p>
              <strong className="text-neutral-200">Kubernetes and Docker</strong> rely
              heavily on YAML. Kubernetes manifests define pods, services, deployments,
              and ingress rules in YAML files that can be hundreds of lines long. Docker
              Compose files describe multi-container applications with services, networks,
              and volumes. A single indentation error in these files can cause deployment
              failures that are difficult to diagnose without a validator.
            </p>
            <p>
              <strong className="text-neutral-200">CI/CD pipelines</strong> across every
              major platform use YAML. GitHub Actions workflows, GitLab CI configurations,
              CircleCI configs, and Azure DevOps pipelines are all defined in YAML. These
              files control your entire build, test, and deployment process, so syntax
              errors have immediate production impact.
            </p>
            <p>
              <strong className="text-neutral-200">YAML to JSON conversion</strong> is a
              frequent need because many APIs and tools accept only JSON. You might write
              your configuration in YAML for readability, then convert to JSON for an API
              call or environment variable. This tool handles both directions, making it
              easy to work with whichever format your current task requires.
            </p>
            <p>
              Common YAML pitfalls include mixing tabs and spaces (YAML forbids tabs),
              forgetting to quote strings that look like booleans (yes, no, true, false),
              and incorrect indentation depth. The Norway problem is a famous YAML quirk
              where the country code NO is interpreted as boolean false. This formatter
              validates your YAML against the full specification, catching these subtle
              issues before they cause problems in production.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="yaml-formatter" />

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
                <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="yaml-formatter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Format YAML here, then use our other tools for JSON, XML, CSV, and data
            conversion.
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
              <p className="mt-1 text-xs text-neutral-400">Beautify & minify XML with validation</p>
            </Link>
            <Link
              href="/csv-to-json"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📋</div>
              <div className="mt-1 text-sm font-semibold">CSV to JSON</div>
              <p className="mt-1 text-xs text-neutral-400">Convert between CSV and JSON formats</p>
            </Link>
            <Link
              href="/regex-tester"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">⚙️</div>
              <div className="mt-1 text-sm font-semibold">Regex Tester</div>
              <p className="mt-1 text-xs text-neutral-400">Test regular expressions with live matching</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
