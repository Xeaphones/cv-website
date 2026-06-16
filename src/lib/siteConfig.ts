export const SITE_NAME = "Yohan Velay";

export const SITE_EMAIL = "yohan.velay@free.fr";

export const SITE_LINKS = {
  linkedin: "https://fr.linkedin.com/in/yohan-velay",
  github: "https://github.com/Xeaphones",
} as const;

export const OG_IMAGE_PATH = "/og-image.jpg";

export const DEFAULT_SITE_ORIGIN = "https://yohanvelay.nybtech.fr";

export function getRssFeedPath(language: string): string {
  return language.startsWith("fr") ? "/rss/fr.xml" : "/rss/en.xml";
}

export function getSiteOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL;
  if (configured) {
    return configured.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return DEFAULT_SITE_ORIGIN;
}

export function getAbsoluteUrl(path: string): string {
  const origin = getSiteOrigin();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return origin ? `${origin}${normalized}` : normalized;
}
