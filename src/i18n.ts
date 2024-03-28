import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const getCurrentLang = () => {
    const lng = localStorage.getItem("lang") || "fr";
    document.documentElement.lang = lng;
    return lng
}

i18n.use(initReactI18next).init({
    lng: getCurrentLang(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                home: "Home",
                more: "More",
                projects: "Projects",
                contact: "Contact"
            }
        },
        fr: {
            translation: {
                home: "Accueil",
                more: "Plus",
                projects: "Projets",
                contact: "Contact"
            }
        }
    },
  });

export default i18n;