<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/vue";

const animation = { duration: 50000, easing: (t: any) => t };

const [container] = useKeenSlider({
  loop: true,
  renderMode: "performance",
  drag: false,
  slides: {
    perView: () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        return 5;
      } else if (width >= 992) {
        return 4;
      } else if (width >= 768) {
        return 3;
      } else {
        return 2;
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
  <div class="bg-primary py-16">
    <h2 class="text-center mb-3 gradient-text">
      {{ t("Qualify Tenants for Your Listings") }}
    </h2>
    <div class="text-center">
      A single place to have all tenant documents verified and save time
    </div>
    <v-container>
      <div class="d-flex align-center justify-center">
        <v-text-field
          hide-details="auto"
          label="Email address"
          placeholder="johndoe@gmail.com"
          type="email"
          class="join-input"
          variant="solo"
          density="compact"
        />
        <v-btn class="main-btn ml-2">{{ t("Join the Waitlist") }}</v-btn>
      </div>
    </v-container>

    <div ref="container" class="keen-slider">
      <div class="keen-slider__slide number-slide1">
        <div class="card-slide mr-4">
          <div class="d-flex align-center">
            <img src="/p1.svg" alt="" />
            <span class="ml-2">Jaylon Philips1</span>
          </div>
          <div class="my-6">
            <div class="verfiy-info">ID Verfied</div>
            <div class="verfiy-info my-2">Paystubs Verified</div>
            <div class="verfiy-info">782 Credit Score</div>
          </div>
          <v-btn class="secondary-btn">{{ t("send to landlord") }}</v-btn>
        </div>
      </div>
      <div class="keen-slider__slide number-slide2">
        <div class="card-slide mr-4">
          <div class="d-flex align-center">
            <img src="/p1.svg" alt="" />
            <span class="ml-2">Jaylon Philips2</span>
          </div>
          <div class="my-6">
            <div class="verfiy-info">ID Verfied</div>
            <div class="verfiy-info my-2">Paystubs Verified</div>
            <div class="verfiy-info">782 Credit Score</div>
          </div>
          <v-btn class="secondary-btn">{{ t("send to landlord") }}</v-btn>
        </div>
      </div>
      <div class="keen-slider__slide number-slide3">
        <div class="card-slide mr-4">
          <div class="d-flex align-center">
            <img src="/p1.svg" alt="" />
            <span class="ml-2">Jaylon Philips3</span>
          </div>
          <div class="my-6">
            <div class="verfiy-info">ID Verfied</div>
            <div class="verfiy-info my-2">Paystubs Verified</div>
            <div class="verfiy-info">782 Credit Score</div>
          </div>
          <v-btn class="secondary-btn">{{ t("send to landlord") }}</v-btn>
        </div>
      </div>
      <div class="keen-slider__slide number-slide4">
        <div class="card-slide mr-4">
          <div class="d-flex align-center">
            <img src="/p1.svg" alt="" />
            <span class="ml-2">Jaylon Philips4</span>
          </div>
          <div class="my-6">
            <div class="verfiy-info">ID Verfied</div>
            <div class="verfiy-info my-2">Paystubs Verified</div>
            <div class="verfiy-info">782 Credit Score</div>
          </div>
          <v-btn class="secondary-btn">{{ t("send to landlord") }}</v-btn>
        </div>
      </div>
      <div class="keen-slider__slide number-slide5">
        <div class="card-slide mr-4">
          <div class="d-flex align-center">
            <img src="/p1.svg" alt="" />
            <span class="ml-2">Jaylon Philips5</span>
          </div>
          <div class="my-6">
            <div class="verfiy-info">ID Verfied</div>
            <div class="verfiy-info my-2">Paystubs Verified</div>
            <div class="verfiy-info">782 Credit Score</div>
          </div>
          <v-btn class="secondary-btn">{{ t("send to landlord") }}</v-btn>
        </div>
      </div>
      <div class="keen-slider__slide number-slide6">
        <div class="card-slide mr-4">
          <div class="d-flex align-center">
            <img src="/p1.svg" alt="" />
            <span class="ml-2">Jaylon Philips6</span>
          </div>
          <div class="my-6">
            <div class="verfiy-info">ID Verfied</div>
            <div class="verfiy-info my-2">Paystubs Verified</div>
            <div class="verfiy-info">782 Credit Score</div>
          </div>
          <v-btn class="secondary-btn">{{ t("send to landlord") }}</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card-slide {
  border-radius: 32px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 24px;
}
.verfiy-info {
  border-radius: 30px;
  border: 1px solid #a0d9a2;
  background: #e2f5e3;
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-weight: 500;
  padding: 2px 8px;
  display: table;
}
</style>
