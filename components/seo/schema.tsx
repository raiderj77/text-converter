/**
 * JSON-LD structured data components.
 * Server components — output <script type="application/ld+json"> tags.
 * Google uses these for rich snippets, knowledge panels, answer boxes.
 */

import { SITE_NAME, SITE_URL } from "@/lib/config";

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
 * WebApplication schema — for tool pages.
 * Tells Google this page is a web app, not just a blog post.
 */
export function WebAppSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url,
        applicationCategory: "UtilityApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        browserRequirements: "Requires JavaScript",
        softwareHelp: {
          "@type": "CreativeWork",
          url: `${SITE_URL}/learn`,
        },
      }}
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
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${SITE_URL}${item.href}`,
        })),
      }}
    />
  );
}

/**
 * Article schema — for blog posts.
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
          "Free online text tools. Convert case, count words, clean text, and more.",
      }}
    />
  );
}
