import catalog from '@/content/articles.json';
import { selectPublishedArticles } from './article-validation.js';

export interface Article {
  slug: string;
  status: 'published';
  reviewed: true;
  title: string;
  description: string;
  answer: string;
  publishedAt: string;
  reviewedAt: string;
  reviewNote: string;
  sections: { heading: string; paragraphs: string[] }[];
  examples: { conversion: string; input: string; output: string }[];
  sources: { title: string; url: string; accessedAt: string; supports: string }[];
}

export function getPublishedArticles(): Article[] {
  return selectPublishedArticles(catalog);
}

export function getArticle(slug: string): Article | undefined {
  return getPublishedArticles().find((article) => article.slug === slug);
}
