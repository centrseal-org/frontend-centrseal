<!--
Summary: Display the hero section of the landing page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the Hero component.
@author Kasra Jannati
-->

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useKeenSlider } from "keen-slider/vue";
import "keen-slider/keen-slider.min.css";

const { t } = useI18n();

const slides = [
  {
    id: "1",
    name: "Jaylon Philips",
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
    name: "Jaylon Philips",
    idCard: true,
    payStubs: null,
    creditScore: 0,
    image: "p1",
  },
  {
    id: "4",
    name: "Jaylon Philips",
    idCard: true,
    payStubs: false,
    creditScore: 650,
    image: "p4",
  },
  {
    id: "5",
    name: "Jaylon Philips",
    idCard: true,
    payStubs: true,
    creditScore: 710,
    image: "p4",
  },
];

/* Slideshow */
const animation = { duration: 70000, easing: (t: number) => t };
const [container] = useKeenSlider({
  loop: true,
  renderMode: "performance",
  drag: false,
  slides: {
    perView: () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        return 4;
      } else if (width >= 992) {
        return 3;
      } else if (width >= 768) {
        return 2;
      } else {
        return 1;
      }
    },
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
        <v-col cols="12">
          <h2 class="text-center mb-2 gradient-text font-weight-medium">
            {{ t("qualifyTenants") }}
          </h2>
          <div class="text-center font-weight-medium">
            {{ t("aSinglePlace") }}
          </div>
        </v-col>
        <v-col cols="12">
          <div
            class="d-flex align-center justify-center flex-column flex-sm-row"
          >
            <v-text-field
              hide-details="auto"
              placeholder="Kasra@gmail.com"
              type="email"
              class="text-input mb-2 mb-sm-0 w-sm-auto w-100"
              variant="solo"
              density="compact"
            />
            <v-btn
              class="main-btn ml-sm-2 py-5 ml-0 w-sm-auto w-100"
              rounded="lg"
              >{{ t("joinTheWaitlist") }}
              <inline-svg src="/arrowRight.svg" class="ml-2"
            /></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div ref="container" class="keen-slider mt-16">
      <div v-for="slide in slides" :key="slide.id" class="keen-slider__slide">
        <div class="card-slide mr-4 pa-6 rounded-xl border border-white">
          <div class="d-flex align-center">
            <img :src="`/${slide.image}.svg`" :alt="slide.image" />
            <span class="ml-2 font-weight-medium">{{ slide.name }}</span>
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
          <v-btn
            class="secondary-btn mt-2 w-100 py-6"
            flat
            rounded="lg"
            readonly
            >{{ t("sendToLandlord") }}</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  min-height: calc(100vh - 67.2px);
}
.text-input {
  max-width: 450px;
}
.card-slide {
  background: rgba(var(--v-theme-white), 0.5) !important;
}
.docs-status {
  display: flex;
  align-items: center;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  width: fit-content;
}
</style>
