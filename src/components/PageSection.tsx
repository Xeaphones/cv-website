import type { ReactNode } from "react";

type PageSectionProps = {
  id: string;
  title?: string;
  headingClassName?: string;
  className?: string;
  children: ReactNode;
};

export function PageSection({
  id,
  title,
  headingClassName = "text-3xl my-3",
  className,
  children,
}: PageSectionProps) {
  const sectionClassName = ["font-mono", "m-8", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={sectionClassName}>
      {title && <h2 className={headingClassName}>{title}</h2>}
      {children}
    </section>
  );
}
