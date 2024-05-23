import { createI18n } from "vue-i18n";

import enLocale from "@/locales/en.json";
import esLocale from "@/locales/es.json";

const messages = {
  en: {
    ...enLocale,
  },
  es: {
    ...esLocale,
  },
};

export default createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: "en",
  fallbackLocale: "en",
  messages,
});
