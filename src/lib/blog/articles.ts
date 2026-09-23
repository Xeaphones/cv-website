import { useMemo } from "react";
import type {
  BlogPostsEn,
  BlogPostsFr,
  BlogWriteupsEn,
  BlogWriteupsFr,
} from "content-collections";
import {
  allBlogPostsEns,
  allBlogPostsFrs,
  allBlogWriteupsEns,
  allBlogWriteupsFrs,
} from "content-collections";

import { useContentLocale, type Locale } from "@/lib/content";

export type BlogSection = "posts" | "writeups";
export type BlogPost = BlogPostsFr | BlogPostsEn;
export type BlogWriteup = BlogWriteupsFr | BlogWriteupsEn;
export type BlogArticle = BlogPost | BlogWriteup;

type DatedContent = {
  date: Date;
  draft: boolean;
};

function sortByDate<T extends DatedContent>(items: T[]): T[] {
  return [...items]
    .filter((item) => !item.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  const posts = locale === "fr" ? allBlogPostsFrs : allBlogPostsEns;
  return sortByDate(posts);
}

export function getBlogWriteups(locale: Locale): BlogWriteup[] {
  const writeups = locale === "fr" ? allBlogWriteupsFrs : allBlogWriteupsEns;
  return sortByDate(writeups);
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | undefined {
  return getBlogPosts(locale).find((post) => post.slug === slug);
}

export function getBlogWriteup(locale: Locale, slug: string): BlogWriteup | undefined {
  return getBlogWriteups(locale).find((writeup) => writeup.slug === slug);
}

export function getBlogArticle(
  locale: Locale,
  section: BlogSection,
  slug: string,
): BlogArticle | undefined {
  return section === "writeups" ? getBlogWriteup(locale, slug) : getBlogPost(locale, slug);
}

export function getLocalizedBlogSlug(article: BlogArticle, locale: Locale): string {
  return locale === "fr" ? article.fr : article.en;
}

export function resolveBlogArticleForLanguageChange(
  currentLocale: Locale,
  nextLocale: Locale,
  section: BlogSection,
  slug: string,
): string | undefined {
  const article = getBlogArticle(currentLocale, section, slug);
  if (!article) return undefined;

  const targetSlug = getLocalizedBlogSlug(article, nextLocale);
  const targetArticle = getBlogArticle(nextLocale, section, targetSlug);
  if (!targetArticle) return undefined;

  return `/blog/${section}/${targetSlug}`;
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

export function getBlogTags(posts: BlogPost[], writeups: BlogWriteup[]): string[] {
  return [...new Set([...posts, ...writeups].flatMap((article) => article.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function useBlogPosts(): BlogPost[] {
  const locale = useContentLocale();
  return useMemo(() => getBlogPosts(locale), [locale]);
}

export function useBlogWriteups(): BlogWriteup[] {
  const locale = useContentLocale();
  return useMemo(() => getBlogWriteups(locale), [locale]);
}
