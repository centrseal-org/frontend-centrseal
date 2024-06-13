<!--
Summary: Index of the landing page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the index component.
@author Kasra Jannati
-->

<script setup lang="ts">
import PresentTenants from "./components/PresentTenants.vue";
import JoinTheWaitlist from "./components/JoinTheWaitlist.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import FocusOnTenants from "./components/FocusOnTenants.vue";
</script>

<template>
  <main>
    <Header />
    <div class="position-relative bg-offWhite overflow-hidden">
      <img src="/s1.svg" class="shadow1" alt="" />
      <img src="/s2.svg" class="shadow2" alt="" />
      <Hero />
      <FocusOnTenants />
    </div>
    <div class="slope" />
    <div class="position-relative bg-lavender overflow-hidden">
      <img src="/s1.svg" class="shadow-b1" alt="" />
      <img src="/s2.svg" class="shadow-b2" alt="" />
      <PresentTenants />
      <JoinTheWaitlist />
    </div>
    <Footer />
  </main>
</template>

<style scoped lang="scss">
@keyframes moveLeft {
  0% {
    right: 0px;
    top: 0px;
  }
  25% {
    right: 20%;
    top: 20%;
  }
  50% {
    right: 50%;
    top: 20%;
  }
  75% {
    right: 80%;
    top: 25%;
  }
  100% {
    right: 0;
    top: 0;
  }
}
@keyframes moveRight {
  0% {
    left: 0px;
    top: 20%;
  }
  25% {
    left: 20%;
    top: 5%;
  }
  50% {
    left: 80%;
    top: 25%;
  }
  75% {
    left: 40;
    top: 0;
  }
  100% {
    left: 0px;
    top: 20%;
  }
}
.shadow1 {
  position: absolute;
  top: 0;
  right: 0;
  animation-name: moveLeft;
  animation-duration: 300s;
  animation-iteration-count: infinite;
  pointer-events: none;
}
.shadow2 {
  position: absolute;
  left: 0;
  top: 20%;
  animation-name: moveRight;
  animation-duration: 300s;
  animation-iteration-count: infinite;
  pointer-events: none;
}
.vector {
  position: absolute;
}
.shadow-b1,
.shadow-b2 {
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  pointer-events: none;
}
.slope {
  background: rgb(var(--v-theme-offWhite));
  width: 100%;
  height: 50px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    clip-path: polygon(0 0, 0 0, 100% 100%, 0 100%);
    background: rgb(var(--v-theme-lavender));
  }
}
</style>
