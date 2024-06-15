<!--
Summary: Display the 'Join the Waitlist' section of the landing page.
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the JoinTheWaitlist component.
@author Kasra Jannati
-->

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { mailchimp } from "../../../composables/mailchimp";

const { t } = useI18n();
const { addAudience } = mailchimp();

const email = ref("");
const submit = ref();
// TODO: change style of the email rules
const emailRules = [
  (value: any) => {
    if (value) return true;
    return "E-mail is required.";
  },
  (value: any) => {
    if (/.+@.+\..+/.test(value)) return true;
    return "E-mail must be valid.";
  },
];

const submitForm = async () => {
  for (const rule of emailRules) {
    const result = rule(email.value);
    if (result !== true) {
      return;
    }
  }
  submit.value = await addAudience(email.value);
};
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12">
        <h3 class="text-blackText mb-2">{{ t("joinTheWaitlist") }}</h3>
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
        <v-form @submit.prevent="submitForm">
          <div
            class="d-flex align-start justify-center flex-column flex-sm-row"
          >
            <!-- :rules="emailRules" -->
            <v-text-field
              v-model="email"
              hide-details="auto"
              placeholder="Kasra@gmail.com"
              type="email"
              class="text-input mb-2 mb-sm-0 w-100"
              variant="solo"
              density="compact"
              required
            />
            <v-btn class="main-btn ml-sm-2 ml-0 w-sm-auto w-100" type="submit"
              >{{ t("joinTheWaitlist") }}
              <inline-svg src="/arrowRight.svg" class="ml-2"
            /></v-btn>
          </div>
          <div v-if="submit" class="body1 text-left pt-4">
            <span class="text-electricBlue">You're on the list!</span> We'll
            keep you posted!"
          </div>
          <div v-if="submit === false" class="body1 text-left">
            <span class="text-error">Whoops!</span> Something went wrong there.
            Please try again."
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.text-input {
  width: 450px !important;
  :deep(input) {
    padding: 17px !important;
  }
}
.main-btn {
  height: auto;
  padding: 16px 32px;
}
@media (max-width: 959px) {
  .text-input {
    width: 100% !important;
  }
}
</style>
