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
  headingClassName = "mb-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
  className,
  children,
}: PageSectionProps) {
  const sectionClassName = ["font-sans", "mx-4 my-8 sm:m-8", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={sectionClassName}>
      {title && <h2 className={headingClassName}>{title}</h2>}
      {children}
    </section>
  );
}
