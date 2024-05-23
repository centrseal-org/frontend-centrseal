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
