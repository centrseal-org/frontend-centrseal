import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/landingpage/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPage,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: ViewHero,
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

export default router;
