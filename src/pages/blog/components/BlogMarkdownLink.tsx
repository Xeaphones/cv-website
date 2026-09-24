import { useState, type AnchorHTMLAttributes, type ReactNode } from "react";

import {
  parseBlogLinkMeta,
  selfhstIconUrl,
  selfhstThemedSlug,
  simpleIconUrl,
  siteFaviconCandidates,
} from "@/lib/blog/blogLinkMeta";
import { useResolvedTheme } from "@/lib/hooks/useResolvedTheme";
import { cn } from "@/lib/utils";

type BlogMarkdownLinkProps = {
  href?: string;
  title?: string | null;
  className?: string;
  children?: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "title" | "children" | "className">;

function BlogLinkIcon({
  candidates,
  className,
}: {
  candidates: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const src = candidates[index];

  if (!src) return null;

  return (
    <img
      src={src}
      alt=""
      width={16}
      height={16}
      loading="lazy"
      decoding="async"
      className={cn("blog-link-icon", className)}
      onError={() => setIndex((current) => current + 1)}
    />
  );
}

export function BlogMarkdownLink({
  href,
  title,
  className,
  children,
  ...props
}: BlogMarkdownLinkProps) {
  const theme = useResolvedTheme();
  const isExternal = href?.startsWith("http");
  const linkMeta = parseBlogLinkMeta(title);

  let iconCandidates: string[] = [];
  let iconClassName: string | undefined;

  if (linkMeta.showIcon) {
    if (linkMeta.kind === "simple" && linkMeta.packSlug) {
      const color = linkMeta.simpleColor ?? (theme === "dark" ? "white" : null);
      iconCandidates = [simpleIconUrl(linkMeta.packSlug, color)];
      iconClassName = "blog-link-icon--si";
    } else if (linkMeta.kind === "selfhst" && linkMeta.packSlug) {
      const slug = selfhstThemedSlug(linkMeta.packSlug, theme);
      iconCandidates = [
        selfhstIconUrl(slug),
        selfhstIconUrl(linkMeta.packSlug),
      ];
      iconClassName = "blog-link-icon--sh";
    } else if (linkMeta.kind === "url" && linkMeta.iconSrc) {
      iconCandidates = [linkMeta.iconSrc];
    } else if (linkMeta.kind === "favicon") {
      iconCandidates = siteFaviconCandidates(href);
    }
  }

  const showIcon = iconCandidates.length > 0;

  return (
    <a
      href={href}
      {...props}
      {...(linkMeta.title ? { title: linkMeta.title } : {})}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(className, showIcon && "blog-link-with-icon")}
    >
      {showIcon ? (
        <BlogLinkIcon
          key={iconCandidates.join("|")}
          candidates={iconCandidates}
          className={iconClassName}
        />
      ) : null}
      {children}
    </a>
  );
}
