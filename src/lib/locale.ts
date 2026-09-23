import type { Locale } from "@/lib/content";

export const SUPPORTED_LOCALES = ["fr", "en"] as const;
export const DEFAULT_LOCALE: Locale = "fr";

/** Set only when the user explicitly picks a language in the UI. */
const LOCALE_PREFERENCE_KEY = "lang-preference";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "fr" || value === "en";
}

/** Strip leading `/{locale}` from a pathname. */
export function stripLocalePrefix(pathname: string): string {
  const match = pathname.match(/^\/(fr|en)(?=\/|$)/);
  if (!match) return pathname || "/";
  const rest = pathname.slice(match[0].length);
  return rest === "" ? "/" : rest;
}

/**
 * Build a localized path.
 * - `fr` (default): no prefix → `/`, `/blog`, …
 * - `en`: `/en`, `/en/blog`, …
 * - `fr` with optional prefix is still accepted when reading URLs, but links stay unprefixed.
 */
export function withLocalePrefix(path: string, locale: Locale): string {
  const hashIndex = path.indexOf("#");
  const searchIndex = path.indexOf("?");
  let cut = path.length;
  if (hashIndex >= 0) cut = Math.min(cut, hashIndex);
  if (searchIndex >= 0) cut = Math.min(cut, searchIndex);

  const pathname = path.slice(0, cut) || "/";
  const suffix = path.slice(cut);
  const bare = stripLocalePrefix(pathname);

  if (locale === DEFAULT_LOCALE) {
    return `${bare === "/" ? "/" : bare}${suffix}`;
  }

  const localized = bare === "/" ? `/${locale}` : `/${locale}${bare}`;
  return `${localized}${suffix}`;
}

/** Locale from URL: `/en/...` → en, `/fr/...` → fr, bare `/...` → fr. */
export function localeFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment === "en") return "en";
  if (segment === "fr") return "fr";
  return DEFAULT_LOCALE;
}

export function getStoredLocalePreference(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(LOCALE_PREFERENCE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

/** Persist an explicit UI language choice. */
export function setLocalePreference(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCALE_PREFERENCE_KEY, locale);
    localStorage.setItem("lang", locale);
  } catch {
    /* ignore */
  }
}

export function detectPreferredLocale(): Locale {
  return getStoredLocalePreference() ?? DEFAULT_LOCALE;
}
