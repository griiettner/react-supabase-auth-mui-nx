import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// import { en } from '@locales';

const resources = {
  en: {
    translation: {},
  },
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
