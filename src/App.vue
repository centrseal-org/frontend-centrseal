<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import { useTheme } from "vuetify";
const theme = useTheme();
const userPrefs = ref({
  theme: "lightMode",
});
onMounted(async () => {
  theme.global.name.value =
    userPrefs.value.theme === "darkMode" ? "dark" : "light";
});
</script>

<template>
  <RouterView />
</template>
<!-- TODO 
Create layout
Add header for each file
Add animation in global scss file
Fix translation file
If user sign up and doen't verify his account after 24h we should remove his user
Resend link, check the action after clicking
If user is verified, the resend link shouldn't work
-->
