import type { ReactNode } from "react";

type PageShellProps = {
  id: string;
  children: ReactNode;
};

export function PageShell({ id, children }: PageShellProps) {
  return (
    <div className="page" id={id}>
      {children}
    </div>
  );
}
