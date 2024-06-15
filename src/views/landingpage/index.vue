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
      <img src="/s1.svg" class="shadow3" alt="" />
      <img src="/s2.svg" class="shadow4" alt="" />
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
@keyframes circleMove {
  0% {
    top: 0;
    right: 0;
  }
  25% {
    top: 0;
    right: calc(100% - 700px);
  }
  50% {
    top: 500px;
    right: calc(100% - 700px);
  }
  75% {
    top: 500px;
    right: 0;
  }
  100% {
    top: 0;
    right: 0;
  }
}
@keyframes circleMove2 {
  0% {
    top: 40vh;
    left: 0;
  }
  25% {
    top: 40vh;
    left: calc(100% - 700px);
  }
  50% {
    top: 0;
    left: calc(100% - 700px);
  }
  75% {
    top: 0;
    left: 0;
  }
  100% {
    top: 40vh;
    left: 0;
  }
}

.shadow1 {
  position: absolute;
  right: 0;
  top: 0;
  width: 700px;
  animation: circleMove 300s infinite; /* Apply animation */
  pointer-events: none;
}
.shadow2 {
  position: absolute;
  right: 0;
  top: 0;
  width: 700px;
  animation: circleMove 300s infinite; /* Apply animation */
  pointer-events: none;
}
.shadow3 {
  position: absolute;
  left: 0;
  top: 40vh;
  width: 700px;
  animation: circleMove2 300s infinite; /* Apply animation */
  transform: rotate(45deg);
  pointer-events: none;
}
.shadow4 {
  position: absolute;
  left: 0;
  top: 40vh;
  width: 700px;
  animation: circleMove2 300s infinite; /* Apply animation */
  transform: rotate(80deg);
  pointer-events: none;
}
.vector {
  position: absolute;
}
.shadow-b1,
.shadow-b2 {
  position: absolute;
  right: 0;
  bottom: -150px;
  pointer-events: none;
  width: 700px;
  rotate: 140deg;
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
