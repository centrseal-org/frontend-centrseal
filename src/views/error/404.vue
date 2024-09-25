<!--
Summary: Index of the 404 page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the 404 component.
@author Kasra Jannati
-->
<script setup lang="ts">
import Header from "@/components/Header.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const submit = () => {
  router.push("/");
};
</script>

<template>
  <main>
    <Header />
    <div class="position-relative bg-offWhite overflow-hidden error-page">
      <section class="contentError">
        <h4 class="text-center">Nothing to See Here</h4>
        <h6 class="text-center">
          This link doesn't exist (or maybe it did and got deleted). Anyways,
          feel free to go to our homepage (more to see there).
        </h6>
        <img src="/404.gif" alt="404" />
        <button
          class="main-btn submit text-white py-3 px-4"
          type="button"
          @click="submit"
        >
          <span class="font-weight-medium"> Go back Home </span>
        </button>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
.error-page {
  min-height: calc(100vh - 57px);
  .contentError {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      max-width: 250px;
      margin: 0 auto;
      display: block;
    }
  }
  .main-btn.submit {
    display: block;
    margin: 0 auto;
  }
}
</style>
