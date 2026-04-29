/**
 * JSON-LD structured data components.
 * Server components — output <script type="application/ld+json"> tags.
 * Google uses these for rich snippets, knowledge panels, answer boxes.
 */
import {
  SITE_NAME,
  SITE_URL,
  AUTHOR_NAME,
  AUTHOR_URL,
  AUTHOR_JOB_TITLE,
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
 * Reusable author block — embedded inside WebApp/Article schemas.
 * Keeps Person identity consistent across the site for Google author resolution.
 */
function authorPerson() {
  return {
    "@type": "Person",
    name: AUTHOR_NAME,
    jobTitle: AUTHOR_JOB_TITLE,
    url: AUTHOR_URL,
  };
}

/**
 * Standalone Person schema — for the about page or any page that wants
 * to emit the named-author Person directly.
 */
export function PersonSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: AUTHOR_NAME,
        url: AUTHOR_URL,
        jobTitle: AUTHOR_JOB_TITLE,
        worksFor: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      }}
    />
  );
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
    author: authorPerson(),
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
 * Article schema — for blog posts.
 * Includes named-author Person + Organization publisher.
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
        author: authorPerson(),
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        ...(datePublished && { datePublished }),
        ...(dateModified && { dateModified }),
      }}
    />
  );
}

/**
 * WebSite schema — for the homepage.
 * Enables sitelinks searchbox in Google results.
 */
export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "Free online text conversion and formatting tools",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/tools?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
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
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "Free browser-based text tools for developers and writers. No signup, no limits.",
        sameAs: [
          "https://github.com/raiderj77/text-converter",
        ],
      }}
    />
  );
}
