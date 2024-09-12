import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/landingpage/index.vue";
import Signin from "../views/signin/index.vue";
import Dashboard from "../views/dashboard/dashboard.vue";
import Tenant from "../views/tenant/tenant.vue";
import Faq from "../views/faq/faq.vue";
import Error from "../views/error/error.vue";
import VerifyDocs from "../views/tenant/verifyDocs.vue";
import Sample1 from "../views/marketing/Sample1.vue";

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
      path: "/xyszmnjqkbbrkaq",
      name: "marketing",
      component: Sample1,
    },
    {
      path: "/tenant",
      name: "tenant",
      component: Tenant,
      meta: { requiresAuth: true },
      // children: [
      //   {
      //     path: "verify", // Notice that the path is relative to the parent path
      //     name: "verifyDocs",
      //     component: VerifyDocs,
      //     meta: { requiresAuth: true },
      //   },
      // ],
      // add <router-view />  in tenant page
    },
    {
      path: "/tenant/verify", // Add the new route here
      name: "verifyDocs",
      component: VerifyDocs,
      meta: { requiresAuth: true },
    },
    {
      path: "/faq",
      name: "faq",
      component: Faq,
    },
    {
      path: "/error",
      name: "ErrorPage",
      component: Error,
      props: (route) => ({
        title: route.query.title || "Default Title",
        subtitle: route.query.subtitle || "Default Subtitle",
        btnText: route.query.btnText,
        btnUrl: route.query.btnUrl,
      }),
    },
    {
      path: "/:uniqueUrl",
      name: "PropertyDetail",
      component: Signin,
      props: true,
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
