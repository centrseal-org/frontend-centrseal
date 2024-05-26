<!--
Summary: Display header of the landing page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the Header component.
@author Kasra Jannati
-->

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <v-container class="py-2">
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between">
          <span class="logo-text">{{ t("CentrSeal") }}</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss"></style>
