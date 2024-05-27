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
          <div class="d-flex align-center justify-center">
            <v-text-field
              hide-details="auto"
              placeholder="Kasra@gmail.com"
              type="email"
              class="text-input"
              variant="solo"
              density="compact"
            />
            <v-btn class="main-btn ml-2 py-5" rounded="lg">{{
              t("joinTheWaitlist")
            }}</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div ref="container" class="keen-slider mt-16">
      <div class="keen-slider__slide number-slide1">
        <div class="card-slide mr-4 pa-6 rounded-xl border border-white">
          <div class="d-flex align-center">
            <img src="/p1.svg" alt="" />
            <span class="ml-2 font-weight-medium">Brandon Septimus</span>
          </div>
          <div class="my-6">
            <div
              class="docs-status px-4 py-1 bg-warningLight border border-warning rounded-pill"
            >
              {{ t("idNotVerified") }}
            </div>
            <div
              class="docs-status px-4 py-1 bg-warningLight my-2 border border-warning rounded-pill"
            >
              {{ t("paystubsNotVerified") }}
            </div>
            <div
              class="docs-status px-4 py-1 bg-infoLight border border-info rounded-pill"
            >
              596 {{ t("creditScore") }}
            </div>
          </div>
          <v-btn class="secondary-btn mt-2 w-100 py-6" flat rounded="lg">{{
            t("sendToLandlord")
          }}</v-btn>
        </div>
      </div>
      <div class="keen-slider__slide number-slide2">
        <div class="card-slide mr-4 pa-6 rounded-xl border border-white">
          <div class="d-flex align-center">
            <img src="/p2.svg" alt="" />
            <span class="ml-2 font-weight-medium">Jaylon Philips</span>
          </div>
          <div class="my-6">
            <div
              class="docs-status px-4 py-1 bg-successLight border border-success rounded-pill"
            >
              {{ t("idVerfied") }}
            </div>
            <div
              class="docs-status px-4 py-1 bg-successLight my-2 border border-success rounded-pill"
            >
              {{ t("paystubsVerified") }}
            </div>
            <div
              class="docs-status px-4 py-1 bg-successLight border border-success rounded-pill"
            >
              782 {{ t("creditScore") }}
            </div>
          </div>
          <v-btn class="secondary-btn mt-2 w-100 py-6" flat rounded="lg">{{
            t("sendToLandlord")
          }}</v-btn>
        </div>
      </div>
      <div class="keen-slider__slide number-slide3">
        <div class="card-slide mr-4 pa-6 rounded-xl border border-white">
          <div class="d-flex align-center">
            <img src="/p3.svg" alt="" />
            <span class="ml-2 font-weight-medium">Ann Schleifer</span>
          </div>
          <div class="my-6">
            <div
              class="docs-status px-4 py-1 bg-successLight border border-success rounded-pill"
            >
              {{ t("idVerfied") }}
            </div>
            <div
              class="docs-status px-4 py-1 bg-pendingLight my-2 border border-pending rounded-pill"
            >
              {{ t("waitingOnPaystubs") }}
            </div>
            <div
              class="docs-status px-4 py-1 bg-pendingLight border border-pending rounded-pill"
            >
              {{ t("waitingOnCreditScore") }}
            </div>
          </div>
          <v-btn class="secondary-btn mt-2 w-100 py-6" flat rounded="lg">{{
            t("sendToLandlord")
          }}</v-btn>
        </div>
      </div>
      <div class="keen-slider__slide number-slide4">
        <div class="card-slide mr-4 pa-6 rounded-xl border border-white">
          <div class="d-flex align-center">
            <img src="/p4.svg" alt="" />
            <span class="ml-2 font-weight-medium">Dulce Vaccaro</span>
          </div>
          <div class="my-6">
            <div
              class="docs-status px-4 py-1 bg-successLight border border-success rounded-pill"
            >
              {{ t("idVerfied") }}
            </div>
            <div
              class="docs-status px-4 py-1 bg-pendingLight my-2 border border-pending rounded-pill"
            >
              {{ t("waitingOnPaystubs") }}
            </div>
            <div
              class="docs-status px-4 py-1 bg-infoLight border border-info rounded-pill"
            >
              602 {{ t("creditScore") }}
            </div>
          </div>
          <v-btn class="secondary-btn mt-2 w-100 py-6" flat rounded="lg">{{
            t("sendToLandlord")
          }}</v-btn>
        </div>
      </div>
      <div class="keen-slider__slide number-slide5">
        <div class="card-slide mr-4 pa-6 rounded-xl border border-white">
          <div class="d-flex align-center">
            <img src="/p2.svg" alt="" />
            <span class="ml-2 font-weight-medium">Jaylon Philips</span>
          </div>
          <div class="my-6">
            <div
              class="docs-status px-4 py-1 bg-successLight border border-success rounded-pill"
            >
              {{ t("idVerfied") }}
            </div>
            <div
              class="docs-status px-4 py-1 bg-successLight my-2 border border-success rounded-pill"
            >
              {{ t("paystubsVerified") }}
            </div>
            <div
              class="docs-status px-4 py-1 bg-successLight border border-success rounded-pill"
            >
              782 {{ t("creditScore") }}
            </div>
          </div>
          <v-btn class="secondary-btn mt-2 w-100 py-6" flat rounded="lg">{{
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
}
.text-input {
  max-width: 450px;
}
.card-slide {
  background: rgba(var(--v-theme-white), 0.5) !important;
}
.docs-status {
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  display: table;
}
</style>
