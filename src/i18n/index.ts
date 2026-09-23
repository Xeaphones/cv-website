import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LOCALE, localeFromPathname } from "@/lib/locale";

import { en } from "./en";
import { fr } from "./fr";

const getCurrentLang = () => {
  if (typeof window !== "undefined") {
    const fromPath = localeFromPathname(window.location.pathname);
    document.documentElement.lang = fromPath;
    return fromPath;
  }
  document.documentElement.lang = DEFAULT_LOCALE;
  return DEFAULT_LOCALE;
};

i18n.use(initReactI18next).init({
  lng: getCurrentLang(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
});

export default i18n;
