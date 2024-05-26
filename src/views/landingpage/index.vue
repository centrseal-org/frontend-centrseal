<!--
Summary: Index of the landing page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the index component.
@author Kasra Jannati
-->

<script setup lang="ts">
import PresentTenants from "./components/presentTenants.vue";
import JoinTheWaitlist from "./components/JoinTheWaitlist.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import FocusOnTenants from "./components/FocusOnTenants.vue";
</script>

<template>
  <main>
    <Header />
    <div class="position-relative">
      <img src="/s1.svg" class="shadow1" alt="" />
      <img src="/s2.svg" class="shadow2" alt="" />
      <Hero />
      <FocusOnTenants />
    </div>
    <PresentTenants />
    <JoinTheWaitlist />
    <Footer />
  </main>
</template>

<style scoped lang="scss">
@keyframes move {
  0% {
    left: 0px;
    top: 0px;
  }
  25% {
    left: 100px;
    top: 50px;
  }
  50% {
    left: 200px;
    top: 100px;
  }
  75% {
    left: 250px;
    top: 200px;
  }
  100% {
    left: 0px;
    top: 0px;
  }
}

.shadow1 {
  position: absolute;
  border: 1px solid red;
  top: 0;

  animation-name: move;
  animation-duration: 10s;
  animation-iteration-count: infinite;
}
.shadow2 {
  position: absolute;

  animation-name: move;
  animation-duration: 20s;
  animation-iteration-count: infinite;
}
</style>
