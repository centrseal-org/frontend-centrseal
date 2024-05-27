<!--
Summary: Display the bottom section of the landing page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the PresentTenants component.
@author Kasra Jannati
-->

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const presentTenants = [
  {
    title:
      "Spend <mark><b>0 minutes</b></mark> sending repeat questions to leads",
    text: "Our tenant verification app asks the right questions and gives you a summary of leads who are in the pipeline for your lease properties.",
  },
  {
    title: "<b>1 in 4 submitted</b> documents are fake",
    text: "That's why we run the checks and give you a seal of approval on the qualified tenants, so you can focus on what you do best, closing deals.",
  },
  {
    title: "A <b>Seamless process</b> for tenants & landlords",
    text: "Leads can add their information and complete a screening in minutes. When you have the right tenant, sending them to the landlord takes 10 seconds.",
  },
];
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12">
        <h2 class="text-center mb-2 gradient-text font-weight-medium">
          {{ t("presentTenantsWithConfidence") }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="presentTenant in presentTenants" cols="12" sm="4">
        <v-card class="pa-5 rounded-lg">
          <v-card-item>
            <v-card-title class="text-wrap" v-safe-html="presentTenant.title" />
          </v-card-item>
          <v-card-text>
            {{ presentTenant.text }}
          </v-card-text>
          <v-card-actions>
            <v-btn class="main-btn">{{ t("joinTheWaitlist") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss"></style>
