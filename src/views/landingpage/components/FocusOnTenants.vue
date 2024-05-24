<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div class="bg-primary py-6">
    <h2 class="text-center mb-3 gradient-text">
      {{ t("Focus on the Right Tenants") }}
    </h2>
    <div class="text-center">
      Multiple screenings that ensures you're not wasting time with unqualified
      leads
    </div>

    <v-container>
      <v-row class="my-8">
        <v-col cols="6" class="d-flex align-center">
          <div>
            <h3>{{ t("Choose Your Criteria") }}</h3>
            <span
              >Pick checks that fit your needs for each property you're
              leasing</span
            >
          </div>
        </v-col>
        <v-col cols="6">
          <div class="d-flex flex-column align-baseline">
            <div class="d-flex align-center main-bg px-4 rounded-pill">
              <v-switch inset hide-details color="red"></v-switch>
              <span class="ml-4">Verify their ID</span>
            </div>
            <div
              class="d-inline-flex align-center main-bg px-4 rounded-pill my-4"
            >
              <v-switch inset hide-details color="red"></v-switch>
              <span class="ml-4">Verify their ID Verify their ID</span>
            </div>
            <div class="d-inline-flex align-center main-bg px-4 rounded-pill">
              <v-switch inset hide-details color="red"></v-switch>
              <span class="ml-4"
                >Verify their ID Verify their ID Verify their ID</span
              >
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row class="my-16">
        <v-col cols="6">
          <div class="d-flex flex-column align-baseline">
            <div
              class="d-inline-flex align-center main-bg px-4 rounded-pill my-4"
            >
              <span class="pa-3">https://centrseal.com/jk9420kd</span>
            </div>
          </div>
        </v-col>
        <v-col cols="6" class="d-flex align-center">
          <div>
            <h3>{{ t("Share a Secure Link") }}</h3>
            <span
              >Generate a unique link to send to leads to qualify
              themselves</span
            >
          </div>
        </v-col>
      </v-row>

      <v-row class="my-8">
        <v-col cols="6" class="d-flex align-center">
          <div>
            <h3>{{ t("Get a Report of Your Leads") }}</h3>
            <span
              >See how leads qualify against your set criteria for the
              property</span
            >
          </div>
        </v-col>
        <v-col cols="6">
          <div class="d-flex flex-column align-baseline">
            <div class="d-flex align-center main-bg px-4 rounded-pill">
              <v-switch inset hide-details color="red"></v-switch>
              <span class="ml-4">Verify their ID</span>
            </div>
            <div
              class="d-inline-flex align-center main-bg px-4 rounded-pill my-4"
            >
              <v-switch inset hide-details color="red"></v-switch>
              <span class="ml-4">Verify their ID Verify their ID</span>
            </div>
            <div class="d-inline-flex align-center main-bg px-4 rounded-pill">
              <v-switch inset hide-details color="red"></v-switch>
              <span class="ml-4"
                >Verify their ID Verify their ID Verify their ID</span
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped lang="scss"></style>
