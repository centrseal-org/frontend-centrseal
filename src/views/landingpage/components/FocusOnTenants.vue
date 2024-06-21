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
const snackbar = ref(false);
const text = ref(
  "I'll be using CentrSeal to verify my Tenants soon. Check it out: https://centrseal.com"
);
const selectedPaystubs = ref<string>("1");
const selectedCreditScore = ref<string>("700");

// Function to ensure the input is numeric and at most 3 characters long
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  // Remove non-digit characters
  value = value.replace(/\D/g, "");

  // Limit to 3 characters
  if (value.length > 3) {
    value = value.slice(0, 3);
  }

  selectedCreditScore.value = value;
};
// Handler to set default value if input is empty on blur
const onBlur = () => {
  if (selectedCreditScore.value === "") {
    selectedCreditScore.value = "700";
  }
};

const copyFn = async () => {
  try {
    await toClipboard(text.value);
    snackbar.value = true;
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <v-container class="py-16">
    <div v-intersect="'animate__fadeInUp'">
      <v-row class="mb-12">
        <v-col cols="12">
          <h2
            class="text-center mb-6 gradient-text"
            v-safe-html="t('focusOnTheRightTenants')"
          ></h2>
          <h5 class="text-center text-blackText">
            {{ t("multipleScreenings") }}
          </h5>
        </v-col>
      </v-row>
    </div>
    <div class="lgScreenWidth">
      <v-row class="my-8" v-intersect="'animate__fadeInUp'">
        <v-col cols="12" md="6" class="d-flex align-center">
          <div>
            <h3 class="text-blackText">{{ t("chooseYourCriteria") }}</h3>
            <h6 class="text-blackText mt-2">{{ t("pickChecks") }}</h6>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex flex-column align-baseline">
            <div
              class="d-flex align-center px-4 rounded-pill switch-card"
              v-intersect="'animate__fadeInUp'"
            >
              <v-switch inset hide-details color="indigo" :model-value="true" />
              <h6 class="ml-4 text-blackText">{{ t("verifyTheirID") }}</h6>
            </div>

            <div
              class="d-flex align-center px-4 rounded-pill switch-card my-6"
              v-intersect="'animate__fadeInUp'"
            >
              <v-switch inset hide-details color="indigo" />
              <span class="ml-4 d-flex align-center">
                <h6 class="text-blackText">{{ t("last") }}</h6>
                <v-select
                  v-model="selectedPaystubs"
                  :items="['1', '2', '3']"
                  class="mx-2 select-drop-down"
                  hide-details
                  variant="solo"
                  density="compact"
                >
                  <template #append-inner>
                    <inline-svg src="/arrow-down.svg" />
                  </template>
                </v-select>
                <h6 class="text-blackText">{{ t("paystubs") }}</h6>
              </span>
            </div>

            <div
              class="d-flex align-center px-4 rounded-pill switch-card"
              v-intersect="'animate__fadeInUp'"
            >
              <v-switch inset hide-details color="indigo" :model-value="true" />
              <div class="ml-4 d-flex align-center">
                <h6 class="text-blackText">
                  {{ t("creditReportVerifyItsOver") }}
                </h6>
                <v-text-field
                  v-model="selectedCreditScore"
                  hide-details="auto"
                  type="text"
                  class="text-input ml-2"
                  variant="solo"
                  density="compact"
                  @input="onInput"
                  @blur="onBlur"
                />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="my-16 py-16" v-intersect="'animate__fadeInUp'">
        <v-col cols="12" md="6" class="d-flex align-center order-md-0 order-1">
          <div class="d-flex flex-column align-baseline">
            <div
              class="d-flex align-center px-4 py-3 rounded-pill switch-card cursor-pointer hoverStyle"
              @click="copyFn"
            >
              <span>
                <span class="text-gray font-weight-medium"
                  >https://centrseal.com/</span
                >jk9420kd
              </span>
              <span class="ml-4 d-flex">
                <inline-svg src="/copy-double.svg" />
              </span>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center0">
          <div>
            <h3 class="text-blackText">{{ t("shareAsecureLink") }}</h3>
            <h6 class="text-blackText mt-2">
              {{ t("generateAuniqueLink") }}
            </h6>
          </div>
        </v-col>
      </v-row>
      <v-row class="my-8" v-intersect="'animate__fadeInUp'">
        <v-col cols="12" md="6" class="d-flex align-center">
          <div>
            <h3 class="text-blackText">{{ t("getAreportOfYourLeads") }}</h3>
            <h6 class="text-blackText mt-2">{{ t("seeHowLeadsQualify") }}</h6>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex flex-column align-baseline">
            <div
              class="d-flex align-center px-4 py-2 rounded-pill switch-card"
              v-intersect="'animate__fadeInUp'"
            >
              <div class="d-flex align-center">
                <img src="/p1.svg" alt="" />
                <h6 class="ml-2 mr-6">Chance Workman</h6>
                <inline-svg src="/dot.svg" />
                <span class="ml-2 body1 text-verified">{{
                  t("verified")
                }}</span>
              </div>
            </div>
            <div
              class="d-flex align-center px-4 py-2 rounded-pill switch-card my-4"
              v-intersect="'animate__fadeInUp'"
            >
              <div class="d-flex align-center">
                <img src="/p4.svg" alt="" />
                <h6 class="ml-2 mr-6">Dulce Vaccaro</h6>
                <inline-svg src="/dot.svg" class="svg-pending" />
                <span class="ml-2 body1 text-gray">{{ t("waitingOn") }}</span>
              </div>
            </div>
            <div
              class="d-flex align-center px-4 py-2 rounded-pill switch-card"
              v-intersect="'animate__fadeInUp'"
            >
              <div class="d-flex align-center">
                <img src="/p3.svg" alt="" />
                <h6 class="ml-2 mr-6">Ann Schleifer</h6>
                <inline-svg src="/dot.svg" />
                <span class="ml-2 body1 text-verified">{{
                  t("verified")
                }}</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <v-snackbar v-model="snackbar" :timeout="5000">
    {{ t("copied") }}
  </v-snackbar>
</template>

<style scoped lang="scss">
.text-input {
  width: 65px;
}
.switch-card {
  box-shadow: 0px 20px 40px 0px rgba(var(--v-theme-indigo), 0.08);
}
.lgScreenWidth {
  max-width: 1200px;
  margin: 0 auto;
}
.hoverStyle {
  transition: all ease 0.3s;
}
.hoverStyle:hover,
.hoverStyle:focus {
  transform: scale(1.02);
  box-shadow: 0px 20px 40px 0px rgba(var(--v-theme-indigo), 0.13);
}
</style>
