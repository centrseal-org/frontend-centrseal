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
    id: "1",
    title:
      "Spend <mark><b>0 minutes</b></mark> sending repeat questions to leads",
    text: "Our tenant verification app asks the right questions and gives you a summary of leads who are in the pipeline for your properties.",
  },
  {
    id: "2",
    title: "No more second guessing if documents are real or fake",
    text: "We run the checks and give you a seal of approval on the qualified tenants, so you can focus on doing more important things.",
  },
  {
    id: "3",
    title: "A seamless process for property managers & landlords",
    text: "Adding properties is quick. Leads add their information and complete a screening in minutes, helping you qualify tenants easily.",
  },
];
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12" class="position-relative">
        <inline-svg src="/centreseal.svg" class="centreseal-pattern" />
        <div class="zindexHelper">
          <div v-intersect="'animate__fadeInUp'">
            <h2 class="text-center mb-6 gradient-text position-relative">
              {{ t("chooseTheRightTenantsWithConfidence") }}
            </h2>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row v-intersect="'animate__fadeInUp'">
      <v-col
        v-for="(presentTenant, index) in presentTenants"
        :key="presentTenant.id"
        cols="12"
        md="4"
        class="position-relative"
      >
        <inline-svg src="/x-pattern.svg" v-if="index === 0" class="x-pattern" />
        <inline-svg
          src="/arrow-pattern.svg"
          v-if="index === 2"
          class="arrow-pattern"
        />
        <v-card class="pa-5 rounded-lg fill-height">
          <v-card-item>
            <v-card-title class="kasraa">
              <h4 class="text-blackText" v-safe-html="presentTenant.title" />
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <h6 class="text-blackText">{{ presentTenant.text }}</h6>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.x-pattern {
  position: absolute;
  transform: translate(-50%, -80%);
}
.arrow-pattern {
  position: absolute;
  right: -50px;
  bottom: 0;
}
.centreseal-pattern {
  position: absolute;
  right: 20%;
  top: -20%;
}
.zindexHelper {
  z-index: 1;
  position: relative;
}
</style>
