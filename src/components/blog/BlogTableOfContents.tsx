import { cn } from "@/lib/utils";
import type { MarkdownHeading } from "@/lib/markdown";

type BlogTableOfContentsProps = {
  headings: MarkdownHeading[];
  activeId?: string;
  className?: string;
  title?: string;
};

export function BlogTableOfContents({ headings, activeId, className, title }: BlogTableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={className}>
      {title && (
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
      )}
      <ul className="flex flex-col gap-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block text-sm leading-snug transition-colors hover:text-primary",
                  heading.level === 2 && "pl-2",
                  heading.level === 3 && "pl-4",
                  isActive
                    ? "font-medium text-primary"
                    : heading.level === 3
                      ? "text-muted-foreground"
                      : "text-foreground",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
