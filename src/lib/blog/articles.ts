import { useMemo } from "react";
import type { BlogPostsEn, BlogPostsFr } from "content-collections";
import { allBlogPostsEns, allBlogPostsFrs } from "content-collections";

import { useContentLocale, type Locale } from "@/lib/content";

export type BlogPost = BlogPostsFr | BlogPostsEn;
/** @deprecated Use BlogPost — writeups live under posts with optional `project`. */
export type BlogWriteup = BlogPost;
export type BlogArticle = BlogPost;

type DatedContent = {
  date: Date;
  draft: boolean;
};

function sortByDateDesc<T extends DatedContent>(items: T[]): T[] {
  return [...items]
    .filter((item) => !item.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

function allPostsRaw(locale: Locale): BlogPost[] {
  return locale === "fr" ? allBlogPostsFrs : allBlogPostsEns;
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  return sortByDateDesc(allPostsRaw(locale));
}

/** Direct URL lookup — includes drafts so unpublished articles remain previewable. */
export function getBlogPost(locale: Locale, slug: string): BlogPost | undefined {
  return allPostsRaw(locale).find((post) => post.slug === slug);
}

/**
 * Posts sharing a `project` value, oldest-first (series reading order).
 * Published only, plus `includeSlug` when that article is a draft being previewed.
 */
export function getPostsByProject(
  locale: Locale,
  project: string,
  options?: { includeSlug?: string },
): BlogPost[] {
  return allPostsRaw(locale)
    .filter(
      (post) =>
        post.project === project && (!post.draft || post.slug === options?.includeSlug),
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** @deprecated Use getPostsByProject */
export const getWriteupsByProject = getPostsByProject;

export function getLocalizedBlogSlug(article: BlogArticle, locale: Locale): string {
  return locale === "fr" ? article.fr : article.en;
}

export function resolveBlogArticleForLanguageChange(
  currentLocale: Locale,
  nextLocale: Locale,
  slug: string,
): string | undefined {
  const article = getBlogPost(currentLocale, slug);
  if (!article) return undefined;

  const targetSlug = getLocalizedBlogSlug(article, nextLocale);
  const targetArticle = getBlogPost(nextLocale, targetSlug);
  if (!targetArticle) return undefined;

  return `/blog/posts/${targetSlug}`;
}

type TaggableArticle = {
  tags: string[];
};

export function filterBlogByTag<T extends TaggableArticle>(articles: T[], tag?: string | null): T[] {
  if (!tag) return articles;
  return articles.filter((article) => article.tags.includes(tag));
}

type SearchableArticle = {
  title: string;
  summary: string;
  tags: string[];
};

export function filterBlogBySearch<T extends SearchableArticle>(
  articles: T[],
  query?: string | null,
): T[] {
  const normalized = query?.trim().toLowerCase();
  if (!normalized) return articles;

  return articles.filter((article) => {
    const haystack = [article.title, article.summary, ...article.tags].join(" ").toLowerCase();
    return haystack.includes(normalized);
  });
}

export function getBlogTags(posts: BlogPost[]): string[] {
  return [...new Set(posts.flatMap((article) => article.tags))].sort((a, b) => a.localeCompare(b));
}

export function useBlogPosts(): BlogPost[] {
  const locale = useContentLocale();
  return useMemo(() => getBlogPosts(locale), [locale]);
}
