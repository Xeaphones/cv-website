import { cn } from "@/lib/utils";

type TagCloudProps = {
  tags: string[];
  activeTag?: string | null;
  onTagClick: (tag: string) => void;
};

export function TagCloud({ tags, activeTag, onTagClick }: TagCloudProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = activeTag === tag;

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onTagClick(tag)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              isActive
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
