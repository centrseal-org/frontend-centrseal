import "vuetify/styles";
import "animate.css";
import "./assets/main.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import VueSafeHTML from "vue-safe-html";
import i18n from "@/locales/i18n";
import InlineSvg from "vue-inline-svg";
import animateIntersect from "./views/landingpage/components/v-intersect";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(i18n);
app.use(VueSafeHTML, {
  allowedTags: [
    "strong",
    "em",
    "i",
    "u",
    "h1",
    "h2",
    "h3",
    "ul",
    "ol",
    "li",
    "p",
    "br",
    "b",
    "mark",
  ],
});
app.component("InlineSvg", InlineSvg);
app.directive("intersect", animateIntersect);

app.mount("#app");
