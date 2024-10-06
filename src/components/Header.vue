<!--
Summary: Display the header section of the landing page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the Header component.
@author Kasra Jannati
-->

<script setup lang="ts">
import { usePropertyStore } from "@/stores/useProperty";
import { useUserStore } from "@/stores/useUser";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { t } = useI18n();
const router = useRouter();

/* Store */
const userStore = useUserStore();
const propertyStore = usePropertyStore();
const user: any = computed(() => userStore.user);

// Example of authentication state (replace with your actual implementation)
const isLoggedIn = ref(!!localStorage.getItem("token"));
console.log(localStorage.getItem("token"), "fix it!");
console.log(isLoggedIn.value, "isLoggedIn");

// Log out the user
const logout = async () => {
  isLoggedIn.value = false;
  localStorage.removeItem("token");
  userStore.$reset();
  propertyStore.$reset();
  router.push("/");
};

const emit = defineEmits(["resetPropertyFlag"]);
// const handleDashboardClick = () => {
//   emit("resetPropertyFlag");
//   router.push("/dashboard");
// };

const handleLogoClick = async () => {
  emit("resetPropertyFlag");
  if (isLoggedIn.value) {
    if (router.currentRoute.value.fullPath === "/") {
      await router.push("/");
    } else {
      if (user.value.role === "tenant") {
        await router.push("/tenant");
      } else {
        await router.push("/dashboard");
      }
    }
  } else {
    await router.push("/");
  }
};
</script>

<template>
  <div class="stickyNav bg-white">
    <v-container class="py-2">
      <v-row>
        <v-col cols="12">
          <header class="d-flex align-center justify-space-between">
            <h4>
              <RouterLink
                to="#"
                class="text-indigo"
                @click.prevent="handleLogoClick"
              >
                {{ t("centrSeal") }}
              </RouterLink>
            </h4>
            <nav>
              <RouterLink to="/faq" class="mr-4"> {{ t("FAQ") }}</RouterLink>
              <RouterLink to="/signin" v-if="!isLoggedIn">
                <v-btn
                  class="main-btn ml-sm-2 ml-0 w-sm-auto w-100"
                  type="button"
                  >{{ t("Sign In") }}
                </v-btn></RouterLink
              >
              <v-menu v-if="isLoggedIn">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" class="menuDropdown">
                    <inline-svg src="/user.svg" class="mr-2" />
                    {{ user?.firstName }} {{ user?.lastName }}
                  </v-btn>
                </template>
                <v-list class="dropDown">
                  <!-- <v-list-item
                    to="/dashboard"
                    @click.prevent="handleDashboardClick"
                  >
                    <v-list-item-title>
                      {{ t("Dashboard") }}
                    </v-list-item-title>
                  </v-list-item> -->
                  <v-list-item>
                    <v-list-item-title class="d-flex align-center">
                      <inline-svg src="/changePassword.svg" class="mr-2" />
                      <span>{{ t("header.changePassword") }}</span>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item class="borderItem">
                    <v-list-item-title class="d-flex align-center">
                      <inline-svg src="/billing.svg" class="mr-2" />
                      <span>{{ t("header.billing") }}</span>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click.prevent="logout">
                    <v-list-item-title class="d-flex align-center">
                      <inline-svg src="/logout.svg" class="mr-2" />
                      <span>
                        {{ t("header.logOut") }}
                      </span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </nav>
          </header>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.stickyNav {
  position: sticky;
  top: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.6) !important;
  backdrop-filter: blur(25px) !important;
}
nav a {
  color: var(--Grey-grey-900, #1d1d1d);
  font-size: 18px;
}
a {
  font-weight: 500 !important;
  text-decoration: none;
}
.main-btn {
  padding: 10px 20px;
  height: 52px !important;
}
.menuDropdown {
  color: var(--Grey-grey-900, #1d1d1d);
  font-size: 18px;
  background-color: transparent;
  box-shadow: none;
  :deep(.v-btn__content) {
    font-weight: 700 !important;
  }
  :deep(.v-btn:hover > .v-btn__overlay) {
    opacity: 0 !important;
  }
}
.borderItem {
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
}
.dropDown {
  border-radius: 8px !important;
  border: 1px solid #fff !important;
  background: rgba(255, 255, 255, 0.5) !important;
  box-shadow:
    0px 16px 16px 0px rgba(4, 3, 36, 0.03),
    0px 20px 40px 0px rgba(65, 61, 255, 0.08) !important;
  backdrop-filter: blur(10px) !important;
  margin-top: 20px;
  // overflow: unset !important;
}
// .dropDown:after {
//   content: "";
//   border: 1px solid #fff !important;
//   background: rgba(255, 255, 255, 0.5) !important;
//   width: 20px;
//   height: 20px;
//   position: absolute;
//   top: -10px;
//   right: 20px;
//   z-index: 999999;
//   rotate: 45deg;
//   border-radius: 2px;
// }
/* To remove hover from items */
:deep(.v-list-item:hover > .v-list-item__overlay) {
  // opacity: 0 !important;
}
</style>
