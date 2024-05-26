<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div class="bg-lightPurple py-6">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h3>{{ t("Join the Waitlist") }}</h3>
          <span>{{
            t(
              "We'll let you know once we launch and occasionally send updates (no spam, pinky promise)"
            )
          }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="d-flex align-center">
          <v-text-field
            hide-details="auto"
            placeholder="Kasra@gmail.com"
            type="email"
            class="join-input"
            variant="solo"
            density="compact"
          />
          <v-btn class="main-btn ml-2 py-6" rounded="lg">{{
            t("joinTheWaitlist")
          }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped lang="scss"></style>
