import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { Locale } from "@/lib/content";

type LocaleLayoutProps = {
  locale: Locale;
};

/** Syncs i18n + document lang from the active locale branch. */
export function LocaleLayout({ locale }: LocaleLayoutProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale;
  }, [i18n, locale]);

  return <Outlet />;
}
