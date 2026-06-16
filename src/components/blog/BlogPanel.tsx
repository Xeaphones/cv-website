import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type BlogPanelProps = {
  title: string;
  allLinkLabel: string;
  allLinkTo: string;
  emptyLabel: string;
  children: ReactNode;
};

export function BlogPanel({ title, allLinkLabel, allLinkTo, emptyLabel, children }: BlogPanelProps) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : Boolean(children);

  return (
    <section className="rounded-xl border border-border/80 bg-card/30 p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</h2>
        <Link
          to={allLinkTo}
          className="inline-flex shrink-0 items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          {allLinkLabel}
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
      {hasChildren ? <div>{children}</div> : <p className="text-sm text-muted-foreground">{emptyLabel}</p>}
    </section>
  );
}
