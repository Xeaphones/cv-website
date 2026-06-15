import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type {
  BlogPostsEn,
  BlogPostsFr,
  BlogWriteupsEn,
  BlogWriteupsFr,
  ExperiencesEn,
  ExperiencesFr,
  FormationsEn,
  FormationsFr,
  ProjectsEn,
  ProjectsFr,
} from "content-collections";
import {
  allBlogPostsEns,
  allBlogPostsFrs,
  allBlogWriteupsEns,
  allBlogWriteupsFrs,
  allExperiencesEns,
  allExperiencesFrs,
  allFormationsEns,
  allFormationsFrs,
  allProjectsEns,
  allProjectsFrs,
} from "content-collections";

export type Locale = "fr" | "en";
export type BlogSection = "posts" | "writeups";
export type BlogPost = BlogPostsFr | BlogPostsEn;
export type BlogWriteup = BlogWriteupsFr | BlogWriteupsEn;
export type BlogArticle = BlogPost | BlogWriteup;
export type Experience = ExperiencesFr | ExperiencesEn;
export type Formation = FormationsFr | FormationsEn;
export type Project = ProjectsFr | ProjectsEn;

type DatedContent = {
  date: Date;
  draft: boolean;
};

function sortByDate<T extends DatedContent>(items: T[]): T[] {
  return [...items]
    .filter((item) => !item.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getLocale(language: string): Locale {
  return language.startsWith("fr") ? "fr" : "en";
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

export function getExperiences(locale: Locale): Experience[] {
  const experiences = locale === "fr" ? allExperiencesFrs : allExperiencesEns;
  return [...experiences].sort((a, b) => a.order - b.order);
}

export function getProjects(locale: Locale): Project[] {
  const projects = locale === "fr" ? allProjectsFrs : allProjectsEns;
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getFormations(locale: Locale): Formation[] {
  const formations = locale === "fr" ? allFormationsFrs : allFormationsEns;
  return [...formations].sort((a, b) => a.order - b.order);
}

export function useContentLocale(): Locale {
  const { i18n } = useTranslation();
  return getLocale(i18n.language);
}

export function useBlogPosts(): BlogPost[] {
  const locale = useContentLocale();
  return useMemo(() => getBlogPosts(locale), [locale]);
}

export function useBlogWriteups(): BlogWriteup[] {
  const locale = useContentLocale();
  return useMemo(() => getBlogWriteups(locale), [locale]);
}

export function useExperiences(): Experience[] {
  const locale = useContentLocale();
  return useMemo(() => getExperiences(locale), [locale]);
}

export function useProjects(): Project[] {
  const locale = useContentLocale();
  return useMemo(() => getProjects(locale), [locale]);
}

export function useFormations(): Formation[] {
  const locale = useContentLocale();
  return useMemo(() => getFormations(locale), [locale]);
}
