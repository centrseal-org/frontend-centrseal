<!--
Summary: Display the middle section of the landing page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the FocusOnTenants component.
@author Kasra Jannati
-->

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import useClipboard from "vue-clipboard3";

const { t } = useI18n();
const { toClipboard } = useClipboard();
const text = ref("https://centrseal.com/jk9420kd");
const selectedPaystubs = ref<string>("1");
const selectedCreditScore = ref<string>("700");

const copyFn = async () => {
  try {
    await toClipboard(text.value);
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12">
        <h2
          class="text-center mb-2 gradient-text font-weight-medium"
          v-safe-html="t('focusOnTheRightTenants')"
        ></h2>
        <div class="text-center font-weight-medium">
          {{ t("multipleScreenings") }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-8">
      <v-col cols="6" class="d-flex align-center">
        <div>
          <h3>{{ t("chooseYourCriteria") }}</h3>
          <span>{{ t("pickChecks") }}</span>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="d-flex flex-column align-baseline">
          <div class="d-flex align-center px-4 rounded-pill switch-card">
            <v-switch inset hide-details color="indigo" :model-value="true" />
            <span class="ml-4 font-weight-medium">{{
              t("verifyTheirID")
            }}</span>
          </div>

          <div class="d-flex align-center px-4 rounded-pill switch-card my-4">
            <v-switch inset hide-details color="indigo" />
            <span class="ml-4 d-flex align-center">
              <span class="font-weight-medium">{{ t("last") }}</span>
              <v-select
                v-model="selectedPaystubs"
                :items="['1', '2', '3']"
                class="mx-2 select-drop-down"
                hide-details
                variant="solo"
                density="compact"
              />
              <span class="font-weight-medium">{{ t("paystubs") }}</span>
            </span>
          </div>

          <div class="d-flex align-center px-4 rounded-pill switch-card">
            <v-switch inset hide-details color="indigo" :model-value="true" />
            <span class="ml-4 font-weight-medium d-flex align-center"
              >{{ t("creditReportVerifyItsOver") }}
              <v-text-field
                v-model="selectedCreditScore"
                readonly
                hide-details="auto"
                type="text"
                class="text-input ml-2"
                variant="solo"
                density="compact"
              />
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="my-16">
      <v-col cols="6" class="d-flex align-center">
        <div class="d-flex flex-column align-baseline">
          <div class="d-flex align-center px-4 py-3 rounded-pill switch-card">
            <span>
              <span class="text-gray">https://centrseal.com/</span>jk9420kd
            </span>
            <span @click="copyFn" class="ml-4"> click </span>
          </div>
        </div>
      </v-col>
      <v-col cols="6" class="d-flex align-center">
        <div>
          <h3>{{ t("shareAsecureLink") }}</h3>
          <span>{{ t("generateAuniqueLink") }}</span>
        </div>
      </v-col>
    </v-row>
    <v-row class="my-8">
      <v-col cols="6" class="d-flex align-center">
        <div>
          <h3>{{ t("getAreportOfYourLeads") }}</h3>
          <span>{{ t("seeHowLeadsQualify") }}</span>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="d-flex flex-column align-baseline">
          <div class="d-flex align-center px-4 py-2 rounded-pill switch-card">
            <div class="d-flex align-center">
              <img src="/p1.svg" alt="" />
              <span class="ml-2 mr-4 font-weight-medium">Chance Workman</span>
              <span class="ml-2 font-weight-medium text-verified">{{
                t("Verified")
              }}</span>
            </div>
          </div>
          <div
            class="d-flex align-center px-4 py-2 rounded-pill switch-card my-4"
          >
            <div class="d-flex align-center">
              <img src="/p4.svg" alt="" />
              <span class="ml-2 mr-4 font-weight-medium">Dulce Vaccaro</span>
              <span class="ml-2 font-weight-medium text-gray">{{
                t("waitingOn")
              }}</span>
            </div>
          </div>
          <div class="d-flex align-center px-4 py-2 rounded-pill switch-card">
            <div class="d-flex align-center">
              <img src="/p3.svg" alt="" />
              <span class="ml-2 mr-4 font-weight-medium">Ann Schleifer</span>
              <span class="ml-2 font-weight-medium text-verified">{{
                t("Verified")
              }}</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
:deep(.text-input) {
  width: 50px;
}
.switch-card {
  box-shadow: 0px 20px 40px 0px rgba(var(--v-theme-indigo), 0.08);
}
</style>
