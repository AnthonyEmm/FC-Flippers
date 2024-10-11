import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./translations/en.json";
import translationDE from "./translations/de.json";
import translationFR from "./translations/fr.json";
import translationES from "./translations/es.json";
import translationIT from "./translations/it.json";
import translationRU from "./translations/ru.json";

const resources = {
  en: { translation: translationEN },
  de: { translation: translationDE },
  fr: { translation: translationFR },
  es: { translation: translationES },
  it: { translation: translationIT },
  ru: { translation: translationRU },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    debug: true,
    detection: {
      order: ["queryString", "cookie"],
      cache: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
