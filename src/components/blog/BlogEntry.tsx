import { Link } from "react-router-dom";

import type { BlogArticle, BlogSection } from "@/lib/content";

type BlogEntryProps = {
  article: BlogArticle;
  section: BlogSection;
  locale: string;
};

export function BlogEntry({ article, section, locale }: BlogEntryProps) {
  const date = article.date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="border-b border-border/60 py-5 last:border-b-0 last:pb-0 first:pt-0">
      <div className="flex items-start justify-between gap-4">
        <Link
          to={`/blog/${section}/${article.slug}`}
          className="font-mono text-base font-semibold text-foreground hover:text-primary"
        >
          {article.title}
        </Link>
        <time className="shrink-0 font-mono text-sm text-muted-foreground">{date}</time>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.summary}</p>
    </article>
  );
}
