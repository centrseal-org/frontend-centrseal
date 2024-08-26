import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/landingpage/index.vue";
import Signin from "../views/signin/index.vue";
import Dashboard from "../views/dashboard/dashboard.vue";
import Faq from "../views/faq/faq.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landingpage",
      component: LandingPage,
    },

    {
      path: "/signin",
      name: "signin",
      component: Signin,
    },
    {
      path: "/signup/profile",
      name: "profile",
      component: () => import("@/views/signin/profile.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: "/faq",
      name: "faq",
      component: Faq,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");
    if (!token) {
      next({ name: "landingpage" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
