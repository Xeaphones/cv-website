import { useCallback } from "react";
import { useLocation } from "react-router-dom";

import type { Locale } from "@/lib/content";
import { localeFromPathname, withLocalePrefix } from "@/lib/locale";

export function useLocale(): Locale {
  const { pathname } = useLocation();
  return localeFromPathname(pathname);
}

/** Build a locale-aware path for Links / navigate (FR unprefixed, EN under /en). */
export function useLocalePath(path?: string) {
  const locale = useLocale();

  const localize = useCallback(
    (target: string) => withLocalePrefix(target, locale),
    [locale],
  );

  if (path !== undefined) {
    return localize(path);
  }

  return localize;
}
