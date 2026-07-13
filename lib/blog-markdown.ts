export interface MarkdownPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  keywords: string[];
  toolSlug?: string;
  noindex?: boolean;
  faq: { question: string; answer: string }[];
  related: string[];
  excerpt: string;
}

export interface MarkdownPostWithContent extends MarkdownPost {
  htmlContent: string;
}

// The former scaled article corpus is quarantined. Restore a slug only after
// source, duplication, accuracy, and editorial review.
export function getAllMarkdownPosts(): MarkdownPost[] {
  return [];
}

export async function getMarkdownPost(
  slug: string
): Promise<MarkdownPostWithContent | null> {
  void slug;
  return null;
}
