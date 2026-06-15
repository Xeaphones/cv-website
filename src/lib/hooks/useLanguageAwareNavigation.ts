import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getLocale, resolveBlogArticleForLanguageChange, type BlogSection } from "@/lib/content";

const BLOG_ARTICLE_PATH = /^\/blog\/(posts|writeups)\/([^/]+)$/;

export function useLanguageAwareNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const changeLanguage = (nextLanguage: string) => {
    const currentLocale = getLocale(i18n.language);
    const nextLocale = getLocale(nextLanguage);

    i18n.changeLanguage(nextLanguage);
    localStorage.setItem("lang", nextLanguage);
    document.documentElement.lang = nextLanguage;

    if (currentLocale === nextLocale) return;

    const match = location.pathname.match(BLOG_ARTICLE_PATH);
    if (!match) return;

    const [, section, slug] = match;
    const nextPath = resolveBlogArticleForLanguageChange(
      currentLocale,
      nextLocale,
      section as BlogSection,
      slug,
    );

    navigate(nextPath ? `${nextPath}${location.search}` : `/blog${location.search}`);
  };

  return { changeLanguage };
}
