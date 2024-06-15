<!--
Summary: Display the hero section of the landing page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the Hero component.
@author Kasra Jannati
-->

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useKeenSlider } from "keen-slider/vue";
import "keen-slider/keen-slider.min.css";
import { mailchimp } from "../../../composables/mailchimp";

const { addAudience } = mailchimp();
const { t } = useI18n();

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

const slides = [
  {
    id: "1",
    name: "Brandon Septimus",
    idCard: true,
    payStubs: true,
    creditScore: 596,
    image: "p1",
  },
  {
    id: "2",
    name: "Jaylon Philips",
    idCard: false,
    payStubs: null,
    creditScore: 782,
    image: "p2",
  },
  {
    id: "3",
    name: "Ann Schleifer",
    idCard: true,
    payStubs: null,
    creditScore: 0,
    image: "p3",
  },
  {
    id: "4",
    name: "Dulce Vaccaro",
    idCard: true,
    payStubs: false,
    creditScore: 650,
    image: "p4",
  },
  {
    id: "5",
    name: "Chance Workman",
    idCard: true,
    payStubs: true,
    creditScore: 802,
    image: "p5",
  },
  {
    id: "6",
    name: "Dulce George",
    idCard: true,
    payStubs: false,
    creditScore: 752,
    image: "p6",
  },
];

/* Slideshow */
const animation = { duration: 70000, easing: (t: number) => t };
const [container] = useKeenSlider({
  loop: true,
  renderMode: "performance",
  drag: false,
  slides: {
    perView: () => "auto",
    spacing: 32,
  },
  created(s) {
    s.moveToIdx(5, true, animation);
  },
  updated(s) {
    s.moveToIdx(s.track.details.abs + 5, true, animation);
  },
  animationEnded(s) {
    s.moveToIdx(s.track.details.abs + 5, true, animation);
  },
});
</script>

<template>
  <div class="py-16 hero">
    <v-container>
      <v-row>
        <v-col cols="12" class="py-4">
          <h1 class="text-center mb-6 gradient-text">
            {{ t("qualifyTenants") }}
          </h1>
          <h5 class="text-center text-blackText">
            {{ t("aSinglePlace") }}
          </h5>
        </v-col>
        <v-col cols="12" class="py-4">
          <v-form @submit.prevent="submitForm">
            <div
              class="d-flex align-start justify-center flex-column flex-sm-row"
              v-if="!submit"
            >
              <!-- :rules="emailRules" -->
              <v-text-field
                v-model="email"
                hide-details="auto"
                placeholder="Kasra@gmail.com"
                type="email"
                class="text-input mb-2 mb-sm-0 w-sm-auto w-100"
                variant="solo"
                density="compact"
                required
              />
              <v-btn class="main-btn ml-sm-2 ml-0 w-sm-auto w-100" type="submit"
                >{{ t("joinTheWaitlist") }}
                <inline-svg src="/arrowRight.svg" class="ml-2"
              /></v-btn>
            </div>
            <div v-if="submit" class="body1 text-center pt-4">
              <span class="text-electricBlue">You're on the list!</span> We'll
              keep you posted!
            </div>
            <div v-if="submit === false" class="body1 text-center">
              <span class="text-error">Whoops!</span> Something went wrong
              there. Please try again.
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <div ref="container" class="keen-slider mt-16">
      <div v-for="slide in slides" :key="slide.id" class="keen-slider__slide">
        <div class="card-slide mr-4 pa-6 border border-white">
          <div class="d-flex align-center">
            <img :src="`/${slide.image}.svg`" :alt="slide.image" />
            <h5 class="ml-2">{{ slide.name }}</h5>
          </div>
          <div class="my-6 d-flex flex-column">
            <div
              class="docs-status px-4 py-2 rounded-pill border"
              :class="{
                'bg-successLight border-success': slide.idCard === true,
                'bg-warningLight border-warning': slide.idCard === false,
                'bg-pendingLight border-pending': slide.idCard === null,
              }"
            >
              <inline-svg src="/id-card.svg" class="mr-2" />
              {{
                slide.idCard === true
                  ? t("idVerified")
                  : slide.idCard === false
                    ? t("idNotVerified")
                    : t("waitingOnIdCard")
              }}
            </div>
            <div
              class="docs-status px-4 py-2 my-2 rounded-pill border"
              :class="{
                'bg-successLight border-success': slide.payStubs === true,
                'bg-warningLight border-warning': slide.payStubs === false,
                'bg-pendingLight border-pending': slide.payStubs === null,
              }"
            >
              <inline-svg src="/paystub.svg" class="mr-2" />
              {{
                slide.payStubs === true
                  ? t("paystubsVerified")
                  : slide.payStubs === false
                    ? t("paystubsNotVerified")
                    : t("waitingOnPaystubs")
              }}
            </div>
            <div
              class="docs-status px-4 py-2 rounded-pill border"
              :class="{
                'bg-successLight border-success': slide.creditScore > 700,
                'bg-infoLight border-info':
                  slide.creditScore < 700 && slide.creditScore !== 0,
                'bg-pendingLight border-pending': slide.creditScore === 0,
              }"
            >
              <inline-svg src="/check-read.svg" class="mr-2" />
              {{
                slide.creditScore !== 0
                  ? `${slide.creditScore} ${t("creditScore")}`
                  : t("waitingOnCreditScore")
              }}
            </div>
          </div>
          <v-btn class="secondary-btn mt-2 w-100 py-6" flat readonly>{{
            t("sendToLandlord")
          }}</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  min-height: calc(100vh - 67.2px);
  z-index: 1;
  position: relative;
}
.text-input {
  max-width: 450px;
  :deep(input) {
    padding: 17px !important;
  }
}
.main-btn {
  height: auto;
  padding: 16px 32px;
}
.card-slide {
  background: rgba(var(--v-theme-white), 0.5) !important;
  border-radius: 32px !important;
  width: 350px;
  height: 350px;
  backdrop-filter: blur(10px);
}
.keen-slider__slide {
  min-width: 350px !important;
  min-height: 350px !important;
}
.docs-status {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  width: fit-content;
}
@media (max-width: 959px) {
  .text-input {
    max-width: 100% !important;
  }
}
</style>
