<!--
Summary: Display the footer section of the landing page.
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the Footer component.
@author Kasra Jannati
-->

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <v-container class="py-8">
    <v-row>
      <v-col cols="12">
        <div
          class="d-flex align-sm-center justify-space-between flex-column flex-sm-row"
        >
          <h4 class="text-indigo">{{ t("centrSeal") }}</h4>
          <span class="text-gray"
            >Copyright © {{ new Date().getFullYear() }} | All Rights Reserved
          </span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss"></style>
