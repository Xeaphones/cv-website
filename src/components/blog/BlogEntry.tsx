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
      <div className="flex items-baseline justify-between gap-4">
        <Link
          to={`/blog/${section}/${article.slug}`}
          className="text-base font-semibold text-foreground transition-colors hover:text-primary"
        >
          {article.title}
        </Link>
        <time className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground/70">{date}</time>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground/80">{article.summary}</p>
    </article>
  );
}
