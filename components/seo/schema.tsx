/**
 * JSON-LD structured data components.
 * Server components — output <script type="application/ld+json"> tags.
 * Google uses these for rich snippets, knowledge panels, answer boxes.
 */
import {
  SITE_NAME,
  SITE_URL,
  getToolBySlug,
  buildUrl,
} from "@/lib/config";

type SchemaProps = {
  data: Record<string, unknown>;
};

function JsonLd({ data }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Reusable site-author block for product and reference schema.
 */
function siteOrganization() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  };
}

/**
 * WebApplication + SoftwareApplication graph — for tool pages.
 *
 * Emits a single JSON-LD `@graph` containing both schema types so Google's
 * AI Overviews and SERP rich results can pick the most appropriate match.
 * `applicationCategory: "UtilitiesApplication"` and `operatingSystem: "Any"`
 * are the schema.org-canonical enum values (the prior `UtilityApplication`
 * / `All` were close-but-non-canonical).
 */
export function WebAppSchema({
  name,
  description,
  url,
  dateModified,
}: {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  const offers = {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  } as const;

  const sharedAppFields = {
    name,
    description,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    author: siteOrganization(),
    offers,
    browserRequirements: "Requires JavaScript",
    softwareHelp: {
      "@type": "CreativeWork",
      url: `${SITE_URL}/learn`,
    },
    ...(dateModified && { dateModified }),
  };

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebApplication",
            "@id": `${url}#webapp`,
            ...sharedAppFields,
          },
          {
            "@type": "SoftwareApplication",
            "@id": `${url}#softwareapp`,
            ...sharedAppFields,
          },
        ],
      }}
    />
  );
}

/**
 * Slug-driven convenience wrapper.
 *
 * Reads the tool's title/description from the central `tools` registry in
 * `lib/config.ts` and emits the WebApplication + SoftwareApplication graph.
 * Use this on any tool route to guarantee schema fields stay in sync with
 * the registry — no per-page copy-paste of name/description strings.
 *
 * Usage: `<ToolSchema slug="bold-text-generator" />`
 */
export function ToolSchema({
  slug,
  dateModified,
}: {
  slug: string;
  dateModified?: string;
}) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;
  const url = buildUrl(slug === "" ? "/" : `/${slug}`);
  return (
    <WebAppSchema
      name={tool.title}
      description={tool.description}
      url={url}
      dateModified={dateModified}
    />
  );
}

/**
 * FAQ schema — for pages with Q&A sections.
 * Enables FAQ rich snippets in search results.
 */
export function FaqSchema({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  if (!items.length) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

/**
 * Breadcrumb schema — for navigation context in search results.
 */
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; href: string }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => {
          const entry: Record<string, unknown> = {
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
          };
          if (i < items.length - 1) {
            entry.item = `${SITE_URL}${item.href}`;
          }
          return entry;
        }),
      }}
    />
  );
}

/**
 * Article schema — for reviewed reference content.
 * Uses the same site organization identity as the product schema.
 */
export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        mainEntityOfPage: url,
        author: siteOrganization(),
        publisher: siteOrganization(),
        ...(datePublished && { datePublished }),
        ...(dateModified && { dateModified }),
      }}
    />
  );
}

/**
 * WebSite schema — for the homepage.
 * Describes the site without claiming a public search endpoint.
 */
export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}#organization` },
        description:
          "Free online text conversion and formatting tools",
      }}
    />
  );
}

/**
 * Organization schema — for the site-wide identity.
 * Added once in the root layout.
 */
export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "Free browser-based text tools for developers and writers. No signup, no limits.",
      }}
    />
  );
}
