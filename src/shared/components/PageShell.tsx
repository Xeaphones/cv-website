import type { ReactNode } from "react";

type PageShellProps = {
  id: string;
  children: ReactNode;
};

export function PageShell({ id, children }: PageShellProps) {
  return (
    <main id="main-content" className="page" tabIndex={-1}>
      <div id={id}>{children}</div>
    </main>
  );
}
