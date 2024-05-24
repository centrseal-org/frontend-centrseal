<script setup lang="ts">
import PresentTenants from "./components/presentTenants.vue";
import JoinTheWaitlist from "./components/JoinTheWaitlist.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import FocusOnTenants from "./components/FocusOnTenants.vue";
</script>

<template>
  <main>
    <Header />
    <Main />
    <FocusOnTenants />
    <PresentTenants />
    <JoinTheWaitlist />
    <Footer />
  </main>
</template>
