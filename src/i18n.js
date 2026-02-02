import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all language files
import en from './Translations/en.json';
import es from './Translations/es.json';
import fr from './Translations/fr.json';
import ja from './Translations/ja.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      ja: { translation: ja }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    supportedLngs: ['en', 'es', 'fr', 'ja']
  });

export default i18n;
