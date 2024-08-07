<!--
Summary: Display teh header section of the landing page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the Header component.
@author Kasra Jannati
-->

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { t } = useI18n();
const router = useRouter();

// Example of authentication state (replace with your actual implementation)
const isLoggedIn = ref(!!localStorage.getItem("token"));
console.log(localStorage.getItem("token"), "fix it!");

// Log out the user
const logout = () => {
  isLoggedIn.value = false;
  localStorage.removeItem("token");
  router.push("/");
};

const emit = defineEmits(["resetPropertyFlag"]);
const handleDashboardClick = () => {
  emit("resetPropertyFlag");
  router.push("/dashboard");
};
</script>

<template>
  <div class="stickyNav bg-white">
    <v-container class="py-2">
      <v-row>
        <v-col cols="12">
          <header class="d-flex align-center justify-space-between">
            <h4>
              <RouterLink to="/" class="text-indigo">
                {{ t("centrSeal") }}
              </RouterLink>
            </h4>
            <nav>
              <RouterLink to="/faq" class="mr-2"> {{ t("FAQ") }}</RouterLink>
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
                    <i class="hgi-stroke hgi-user-circle-02" />
                    Kasra Jannati
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    to="/dashboard"
                    @click.prevent="handleDashboardClick"
                  >
                    <v-list-item-title>
                      {{ t("Dashboard") }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click.prevent="logout">
                    <v-list-item-title>
                      {{ t("Log Out") }}
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
</style>
