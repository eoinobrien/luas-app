import i18n from "i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(Backend)
    .init(
        {
            backend: {
                loadPath: '/locales/{{lng}}/{{ns}}.json'
            },
            debug: true,

            detection: {
                order: ['path', 'localStorage', 'navigator', 'htmlTag']
            },

            fallbackLng: "en",
            whitelist: ["en", "ga"],
            ns: ['translation', 'error'],
            checkWhitelist: true,

            keySeparator: '.',

            interpolation: {
                escapeValue: false
            }
        }
    );

export default i18n;
