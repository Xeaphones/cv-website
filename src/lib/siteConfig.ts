function envString(key: keyof ImportMetaEnv, fallback: string): string {
  const value = import.meta.env[key];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

export const SITE_NAME = envString("VITE_SITE_NAME", "Yohan Velay");

export const SITE_EMAIL = envString("VITE_SITE_EMAIL", "yohan2003@free.fr");

/** Prefixed to contact-form mailto subjects, e.g. "[CV] Hello". */
export const EMAIL_PRE_SUBJECT = envString("VITE_EMAIL_PRE_SUBJECT", "[CV]");

export const SITE_PHONE = envString("VITE_SITE_PHONE", "+33781072178");

export const SITE_LINKS = {
  linkedin: envString("VITE_LINKEDIN_URL", "https://fr.linkedin.com/in/yohan-velay"),
  github: envString("VITE_GITHUB_URL", "https://github.com/Xeaphones"),
} as const;

export const OG_IMAGE_PATH = "/og-image.jpg";

const FALLBACK_SITE_ORIGIN = envString("VITE_FALLBACK_URL", "https://willowfox.dev");

/** Display form for FR mobiles stored as +33… */
export function formatPhoneDisplay(phone: string = SITE_PHONE): string {
  const digits = phone.replace(/\s+/g, "");
  if (digits.startsWith("+33") && digits.length === 12) {
    const national = `0${digits.slice(3)}`;
    return national.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  }
  return phone;
}

export function getRssFeedPath(language: string): string {
  return language.startsWith("fr") ? "/rss/fr.xml" : "/rss/en.xml";
}

export function getSiteOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL;
  if (typeof configured === "string" && configured.trim()) {
    return configured.trim().replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return FALLBACK_SITE_ORIGIN.replace(/\/$/, "");
}

export function getAbsoluteUrl(path: string): string {
  const origin = getSiteOrigin();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return origin ? `${origin}${normalized}` : normalized;
}
