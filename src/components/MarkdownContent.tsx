import type { ComponentType, SVGProps } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

import { slugifyHeading } from "@/lib/markdown";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

function childrenToText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return childrenToText((children as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

const markdownComponents: Components = {
  h1: ({ children }) => {
    const id = slugifyHeading(childrenToText(children));
    return (
      <h1 id={id} className="scroll-mt-24">
        {children}
      </h1>
    );
  },
  h2: ({ children }) => {
    const id = slugifyHeading(childrenToText(children));
    return (
      <h2 id={id} className="scroll-mt-24">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugifyHeading(childrenToText(children));
    return (
      <h3 id={id} className="scroll-mt-24">
        {children}
      </h3>
    );
  },
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
  );
}

export function TechnologyIcons({
  technologies,
  iconMap,
}: {
  technologies: string[];
  iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>>;
}) {
  return (
    <div className="flex h-[3rem]">
      {technologies.map((tech) => {
        const Icon = iconMap[tech];
        if (!Icon) return null;
        return <Icon key={tech} />;
      })}
    </div>
  );
}
