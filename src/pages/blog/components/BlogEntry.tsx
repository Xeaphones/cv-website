import { Link } from "react-router-dom";

import { useLocalePath } from "@/lib/hooks";
import type { BlogArticle } from "@/lib/blog";

type BlogEntryProps = {
  article: BlogArticle;
  locale: string;
};

export function BlogEntry({ article, locale }: BlogEntryProps) {
  const localize = useLocalePath();
  const date = article.date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="border-b border-border/60 py-5 last:border-b-0 last:pb-0 first:pt-0">
      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <Link
            to={localize(`/blog/posts/${article.slug}`)}
            className="text-base font-semibold text-foreground transition-colors hover:text-primary"
          >
            {article.title}
          </Link>
          {article.project ? (
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
              {article.project}
            </p>
          ) : null}
        </div>
        <time className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground/70">{date}</time>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground/80">{article.summary}</p>
    </article>
  );
}
