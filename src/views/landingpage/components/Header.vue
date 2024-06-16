<!--
Summary: Display teh header section of the landing page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the Header component.
@author Kasra Jannati
-->

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div class="stickyNav bg-white">
    <v-container class="py-2">
      <v-row>
        <v-col cols="12">
          <header class="d-flex align-center justify-space-between">
            <h4>
              <RouterLink to="/" class="text-indigo">
                {{ t("centrSeal") }}</RouterLink
              >
            </h4>
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
}
a {
  font-weight: 500 !important;
  text-decoration: none;
}
</style>
