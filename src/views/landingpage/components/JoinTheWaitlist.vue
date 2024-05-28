<!--
Summary: Display the 'Join the Waitlist' section of the landing page.
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the JoinTheWaitlist component.
@author Kasra Jannati
-->

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12">
        <h3>{{ t("joinTheWaitlist") }}</h3>
        <span>{{ t("WeWillLetYouKnowOnce") }}</span>
        <span class="text-gray pl-2">{{ t("noSpamPinkyPromise") }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-flex align-cente flex-column flex-md-row"
      >
        <v-text-field
          hide-details="auto"
          placeholder="Kasra@gmail.com"
          type="email"
          class="text-input mb-2 mb-md-0 w-md-auto w-100"
          variant="solo"
          density="compact"
        />
        <v-btn class="main-btn ml-md-2 ml-0 py-5" rounded="lg"
          >{{ t("joinTheWaitlist")
          }}<inline-svg src="/arrowRight.svg" class="ml-2"
        /></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss"></style>
