import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.vue";
import router from "./router";
import axios from "axios";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

const i18n = createI18n({
  locale: "fr",
  fallbackLocale: "en",
  messages: {
    en,
    fr,
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(axios);
app.use(i18n);
app.mount("#app");
