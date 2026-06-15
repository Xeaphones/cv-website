export const SITE_NAME = "Yohan Velay";

export const SITE_EMAIL = "yohan.velay@free.fr";

export const SITE_LINKS = {
  linkedin: "https://fr.linkedin.com/in/yohan-velay",
  github: "https://github.com/Xeaphones",
} as const;

export const OG_IMAGE_PATH = "/og-image.jpg";

export function getSiteOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL;
  if (configured) {
    return configured.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}

export function getAbsoluteUrl(path: string): string {
  const origin = getSiteOrigin();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return origin ? `${origin}${normalized}` : normalized;
}
