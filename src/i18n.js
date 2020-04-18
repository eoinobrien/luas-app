import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
   .use(LanguageDetector)
   .init(
      {
         resources: {},
         debug: false,
         detection: {
            order: ['path', 'localStorage', 'navigator', 'htmlTag']
         },

         backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json'
         },

         fallbackLng: "en",
         whitelist: ["en", "ga"],
         checkWhitelist: true,

         keySeparator: '.',

         interpolation: {
            escapeValue: false
         }
      }
   );

export default i18n;
