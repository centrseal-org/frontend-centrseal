<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
</script>

<template>
  <div class="bg-primary py-5">
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

    <carousel
      :items-to-show="4"
      wrapAround
      :autoplay="1"
      :transition="10000"
      class="my-6"
    >
      <slide :key="1">
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
      </slide>
      <slide :key="2">
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
      </slide>
      <slide :key="2">
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
      </slide>
      <slide :key="4">
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
      </slide>
      <slide :key="5">
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
      </slide>
      <slide :key="6">
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
      </slide>
      <slide :key="7">
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
      </slide>
      <slide :key="8">
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
      </slide>
      <template #addons>
        <!-- <navigation /> -->
        <!-- <pagination /> -->
      </template>
    </carousel>
  </div>
</template>
<style scoped lang="scss">
.card-slide {
  width: 350px;
  border-radius: 32px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 20px 40px 0px rgba(65, 61, 255, 0.08);
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
