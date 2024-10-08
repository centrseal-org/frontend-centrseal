import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/landingpage/index.vue";
import Signin from "../views/signin/index.vue";
import Dashboard from "../views/dashboard/dashboard.vue";
import Tenant from "../views/tenant/tenant.vue";
import Faq from "../views/faq/faq.vue";
import Error from "../views/error/error.vue";
import VerifyDocs from "../views/tenant/verifyDocs.vue";
import Paystub from "../views/tenant/paystub.vue";
import Sample1 from "../views/marketing/Sample1.vue";
import PrivacyPolicy from "@/views/privacyPolicy/privacyPolicy.vue";
import TermsOfService from "@/views/termsOfService/termsOfService.vue";
import NotFound from "@/views/error/404.vue";

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
      path: "/privacy-policy",
      name: "privacyPolicy",
      component: PrivacyPolicy,
    },
    {
      path: "/terms-of-service",
      name: "termsOfService",
      component: TermsOfService,
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
      path: "/tenant/verify",
      name: "verifyDocs",
      component: VerifyDocs,
      meta: { requiresAuth: true },
    },
    {
      path: "/tenant/paystub",
      name: "paystub",
      component: Paystub,
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
        title: route.query.title || "Somthing is wrong!",
        subtitle: route.query.subtitle || "Please try again",
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
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
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
      next({
        name: "NotFound", // Show 404 page
        params: { pathMatch: to.path.substring(1).split("/") }, // Keep the original URL
        replace: true, // Replace the navigation history, so the URL stays the same
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
