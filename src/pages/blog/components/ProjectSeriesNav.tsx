import { Link } from "react-router-dom";

import type { BlogPost } from "@/lib/blog";
import { useLocalePath } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type ProjectSeriesNavProps = {
  project: string;
  posts: BlogPost[];
  currentSlug: string;
  className?: string;
};

export function ProjectSeriesNav({
  project,
  posts,
  currentSlug,
  className,
}: ProjectSeriesNavProps) {
  const localize = useLocalePath();

  if (posts.length === 0) return null;

  return (
    <nav aria-label={project} className={cn("font-sans", className)}>
      <p className="mb-4 text-base font-semibold text-foreground">{project}</p>
      <ul className="flex flex-col gap-2.5">
        {posts.map((post) => {
          const isActive = post.slug === currentSlug;

          return (
            <li key={post.slug}>
              <Link
                to={localize(`/blog/posts/${post.slug}`)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block border-l-2 py-0.5 pl-3 text-sm leading-snug transition-colors",
                  isActive
                    ? "border-primary font-medium text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** @deprecated Use ProjectSeriesNav */
export const WriteupProjectNav = ProjectSeriesNav;
