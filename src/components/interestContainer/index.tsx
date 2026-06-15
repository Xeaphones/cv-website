import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type InterestCardProps = {
  icon: ReactNode;
  title: string;
  className?: string;
};

export function InterestCard({ icon, title, className }: InterestCardProps) {
  return (
    <div
      className={cn(
        "group flex min-w-0 flex-col items-center gap-3 rounded-lg border border-border/60",
        "bg-card/30 p-4 shadow-sm transition-colors hover:border-primary/40 sm:gap-4 sm:p-5",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center text-primary transition-colors",
          "group-hover:text-primary/80 sm:h-12 sm:w-12",
          "[&_svg]:h-full [&_svg]:w-full [&_svg]:fill-current",
        )}
      >
        {icon}
      </div>
      <p className="w-full break-words text-center text-sm font-medium leading-snug text-foreground">
        {title}
      </p>
    </div>
  );
}

export default InterestCard;
