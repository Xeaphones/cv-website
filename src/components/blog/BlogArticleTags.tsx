import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

type BlogArticleTagsProps = {
  tags: string[];
  className?: string;
};

export function BlogArticleTags({ tags, className }: BlogArticleTagsProps) {
  if (tags.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            to={`/blog?tag=${encodeURIComponent(tag)}`}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
