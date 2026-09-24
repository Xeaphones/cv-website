import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getLocale, type Locale } from "@/lib/content";
import { resolveBlogArticleForLanguageChange } from "@/lib/blog";
import { setLocalePreference, stripLocalePrefix, withLocalePrefix } from "@/lib/locale";

const BLOG_ARTICLE_PATH = /^\/blog\/(?:posts|writeups)\/([^/]+)$/;

export function useLanguageAwareNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const changeLanguage = (nextLanguage: string) => {
    const nextLocale = getLocale(nextLanguage) as Locale;
    const currentLocale = getLocale(i18n.language) as Locale;
    const barePath = stripLocalePrefix(location.pathname);

    let nextBare = barePath;
    const match = barePath.match(BLOG_ARTICLE_PATH);

    if (match && currentLocale !== nextLocale) {
      const [, slug] = match;
      const resolved = resolveBlogArticleForLanguageChange(currentLocale, nextLocale, slug);
      nextBare = resolved ?? "/blog";
    }

    setLocalePreference(nextLocale);
    navigate(`${withLocalePrefix(nextBare, nextLocale)}${location.search}${location.hash}`);
  };

  return { changeLanguage };
}
