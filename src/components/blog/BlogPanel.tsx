import type { ReactNode } from "react";
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
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <Link to={allLinkTo} className="text-sm text-muted-foreground hover:text-foreground">
          {allLinkLabel}
        </Link>
      </div>
      {hasChildren ? <div>{children}</div> : <p className="text-sm text-muted-foreground">{emptyLabel}</p>}
    </section>
  );
}
