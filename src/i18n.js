import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      lines: {
        line: "line",
        red: {
          colour: "Red",
          inbound: "Eastbound",
          outbound: "Westbound"
        },
        green: {
          colour: "Green",
          inbound: "Northbound",
          outbound: "Southbound"
        }
      },
      station: "station",
      favouriteStations: "favourite stations",
      loading: "Loading...",
      updating: {
        now: "Updating...",
        in: "Updating in {{count}} seconds",
        in_1: "Updating in {{count}} second",
      },
      days: {
        weekdays: "Weekdays",
        saturday: "Saturday",
        sunday: "Sunday",
      },
      servicesFinished: "Services will resume in this direction at {{startTime}}a.m. in morning ",
      noTramsForecast: "No trams forecast"
    }
  },
  ga: {
    translation: {
      lines: {
        line: "líne",
        red: {
          colour: "Dearg",
          inbound: "Ag dul soir",
          outbound: "Ag dul siar"
        },
        green: {
          colour: "Glas",
          inbound: "Ag dul ó thuaidh",
          outbound: "Ag dul ó dheas"
        }
      },
      station: "stáisiún",
      favouriteStations: "stáisiúin is fearr leat",
      loading: "Ag Lódáil...",
      updating: {
        now: "Ag Uasdátú...",
        in: "Ag nuashonrú i gceann {{count}} soicind",
        in_1: "Ag nuashonrú i soicind amháin",
      },
      days: {
        weekdays: "Laethanta na seachtaine",
        saturday: "Satharn",
        sunday: "Domhnach"
      }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ga",

    keySeparator: '.',

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
