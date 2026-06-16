import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";

import { CodeBlock } from "@/components/blog/CodeBlock";
import { parseBlogImageMeta } from "@/lib/blogImageMeta";
import { parseCodeFenceMeta } from "@/lib/codeFenceMeta";
import { remarkCodeFenceMeta } from "@/lib/remarkCodeFenceMeta";
import { slugifyHeading } from "@/lib/markdown";
import { cn } from "@/lib/utils";

type BlogMarkdownContentProps = {
  content: string;
  className?: string;
};

type HeadingLevel = 1 | 2 | 3;

function childrenToText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return childrenToText((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function Pre({ children }: ComponentPropsWithoutRef<"pre">) {
  const child = Array.isArray(children) ? children[0] : children;

  if (child && typeof child === "object" && "props" in child) {
    const codeProps = child as {
      props: {
        className?: string;
        children?: ReactNode;
        "data-fence-meta"?: string;
      };
    };
    const { language, title, highlights, isTerminal, noTitle } = parseCodeFenceMeta(
      codeProps.props.className,
      codeProps.props["data-fence-meta"],
    );
    const code = childrenToText(codeProps.props.children).replace(/\n$/, "");

    return (
      <CodeBlock
        code={code}
        language={language}
        title={title}
        highlights={highlights}
        isTerminal={isTerminal}
        noTitle={noTitle}
      />
    );
  }

  return <pre>{children}</pre>;
}

async function copyHeadingUrl(id: string) {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  try {
    await navigator.clipboard.writeText(url);
    window.history.replaceState(null, "", `#${id}`);
  } catch {
    window.location.hash = id;
  }
}

function renderHeading(level: HeadingLevel, children: ReactNode) {
  const id = slugifyHeading(childrenToText(children));
  const HeadingTag = `h${level}` as const;

  return (
    <HeadingTag id={id} className="group scroll-mt-24">
      <span>{children}</span>
      <a
        href={`#${id}`}
        aria-label={`Copy link to ${childrenToText(children)}`}
        title="Copy section link"
        onClick={(event) => {
          event.preventDefault();
          void copyHeadingUrl(id);
        }}
        className="ml-2 align-middle text-muted-foreground no-underline opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        #
      </a>
    </HeadingTag>
  );
}

const blogMarkdownComponents: Components = {
  h1: ({ children }) => renderHeading(1, children),
  h2: ({ children }) => renderHeading(2, children),
  h3: ({ children }) => renderHeading(3, children),
  pre: Pre,
  code: ({ className, children, ...props }) => {
    const isInline = !className;

    if (isInline) {
      return (
        <code className="inline-code-highlight" {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");

    return (
      <a
        href={href}
        {...props}
        {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto">
      <table {...props}>{children}</table>
    </div>
  ),
  img: ({ src, alt, title, ...props }) => {
    const { size, noBackground, caption } = parseBlogImageMeta(title);

    return (
      <figure className={cn("blog-image", `blog-image--size-${size}`)}>
        <div
          className={cn(
            "blog-image-frame",
            noBackground && "blog-image-frame--no-background",
            caption && "blog-image-frame--has-caption",
          )}
        >
          <div className="blog-image-media">
            <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" {...props} />
          </div>
          {caption ? <figcaption className="blog-image-caption">{caption}</figcaption> : null}
        </div>
      </figure>
    );
  },
};

export function BlogMarkdownContent({ content, className }: BlogMarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkAlert, remarkCodeFenceMeta]}
        components={blogMarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
