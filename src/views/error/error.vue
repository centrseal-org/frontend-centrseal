<!--
Summary: Index of the error page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the error component.
@author Kasra Jannati
-->
<script setup lang="ts">
import { onMounted } from "vue";
import Header from "@/components/Header.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  btnText: {
    type: String,
  },
  btnUrl: {
    type: String,
  },
});

const router = useRouter();

const submit = () => {
  router.push(props.btnUrl as string);
};
</script>

<template>
  <main>
    <Header />
    <div class="position-relative bg-offWhite overflow-hidden error-page">
      <section class="contentError">
        <h4 class="text-center">{{ props.title }}</h4>
        <h6 class="text-center">{{ props.subtitle }}</h6>
        <img src="/error.gif" alt="Loading" />
        <button
          class="main-btn submit text-white py-3 px-4"
          type="button"
          @click="submit"
          v-if="props.btnText"
        >
          <span class="font-weight-medium">
            {{ props.btnText }}
          </span>
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
