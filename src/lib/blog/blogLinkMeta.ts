export type BlogLinkIconKind = "favicon" | "simple" | "selfhst" | "url";

export type BlogLinkMeta = {
  showIcon: boolean;
  kind: BlogLinkIconKind | null;
  /** Explicit URL for kind "url", or null. */
  iconSrc: string | null;
  /** Pack slug for "simple" (Simple Icons) or "selfhst". */
  packSlug: string | null;
  /** Optional Simple Icons color (hex or named). */
  simpleColor: string | null;
  /** Remaining title used as the native tooltip (null = omit title). */
  title: string | null;
};

const ICON_TOKEN = "icon";
const ICON_PREFIX = "icon:";
const SIMPLE_PREFIX = "si/";
const SELFHST_PREFIX = "sh/";

const EMPTY: BlogLinkMeta = {
  showIcon: false,
  kind: null,
  iconSrc: null,
  packSlug: null,
  simpleColor: null,
  title: null,
};

/** Site icons first, then Google s2, then DuckDuckGo. */
export function siteFaviconCandidates(href?: string | null): string[] {
  if (!href) return [];

  try {
    const url = new URL(href);
    const { origin, hostname } = url;
    return [
      `${origin}/icon.svg`,
      `${origin}/favicon.ico`,
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=32`,
      `https://icons.duckduckgo.com/ip3/${hostname}.ico`,
    ];
  } catch {
    return [];
  }
}

export function simpleIconUrl(slug: string, color?: string | null): string {
  const base = `https://cdn.simpleicons.org/${encodeURIComponent(slug)}`;
  return color ? `${base}/${encodeURIComponent(color)}` : base;
}

/** selfh.st/icons via jsDelivr. Pass a themed slug like `rybbit-dark`. */
export function selfhstIconUrl(slug: string): string {
  return `https://cdn.jsdelivr.net/gh/selfhst/icons/svg/${encodeURIComponent(slug)}.svg`;
}

/**
 * Resolve a selfh.st base slug to a theme variant when no -dark/-light suffix is set.
 * Suffix describes the glyph color: `-light` on dark UI, `-dark` on light UI.
 */
export function selfhstThemedSlug(
  slug: string,
  theme: "light" | "dark",
): string {
  if (/-(dark|light)$/i.test(slug)) return slug;
  return `${slug}-${theme === "dark" ? "light" : "dark"}`;
}

function parsePackSlug(rest: string): { slug: string; suffix: string | null } {
  const slash = rest.indexOf("/");
  if (slash === -1) {
    return { slug: rest.trim(), suffix: null };
  }
  return {
    slug: rest.slice(0, slash).trim(),
    suffix: rest.slice(slash + 1).trim() || null,
  };
}

/**
 * Optional link title tags (same idea as blog image titles):
 * - `"icon"` → `/icon.svg` → `/favicon.ico` → Google s2 → DuckDuckGo
 * - `"icon: si/github"` → Simple Icons slug
 * - `"icon: si/github/white"` → Simple Icons with color
 * - `"icon: sh/rybbit"` → selfh.st/icons (theme -dark/-light)
 * - `"icon: sh/rybbit-dark"` → exact selfh.st slug
 * - `"icon: /path.svg"` or `"icon:https://…"` → custom URL
 */
export function parseBlogLinkMeta(title?: string | null): BlogLinkMeta {
  const raw = title?.trim() ?? "";

  if (!raw) return EMPTY;

  const lower = raw.toLowerCase();

  if (lower === ICON_TOKEN) {
    return { ...EMPTY, showIcon: true, kind: "favicon" };
  }

  if (!lower.startsWith(ICON_PREFIX)) {
    return { ...EMPTY, title: raw };
  }

  const value = raw.slice(ICON_PREFIX.length).trim();
  if (!value) return EMPTY;

  const valueLower = value.toLowerCase();

  if (valueLower.startsWith(SIMPLE_PREFIX)) {
    const { slug, suffix: color } = parsePackSlug(value.slice(SIMPLE_PREFIX.length));
    if (!slug) return EMPTY;

    return {
      ...EMPTY,
      showIcon: true,
      kind: "simple",
      packSlug: slug,
      simpleColor: color,
    };
  }

  if (valueLower.startsWith(SELFHST_PREFIX)) {
    const { slug } = parsePackSlug(value.slice(SELFHST_PREFIX.length));
    if (!slug) return EMPTY;

    return {
      ...EMPTY,
      showIcon: true,
      kind: "selfhst",
      packSlug: slug,
    };
  }

  return {
    ...EMPTY,
    showIcon: true,
    kind: "url",
    iconSrc: value,
  };
}
