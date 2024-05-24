<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const presentTenants = [
  {
    title:
      "Spend <mark><b>0 minutes</b></mark> sending repeat questions to leads",
    text: "Our tenant verification app asks the right questions and gives you a summary of leads who are in the pipeline for your lease properties.",
  },
  {
    title: "<b>1 in 4 submitted</b> documents are fake",
    text: "That's why we run the checks and give you a seal of approval on the qualified tenants, so you can focus on what you do best, closing deals.",
  },
  {
    title: "A <b>Seamless process</b> for tenants & landlords",
    text: "Leads can add their information and complete a screening in minutes. When you have the right tenant, sending them to the landlord takes 10 seconds.",
  },
];
</script>

<template>
  <div class="bg-lightPurple py-6">
    <h2 class="text-center mb-3 gradient-text">
      {{ t("Present Tenants with Confidence") }}
    </h2>
    <v-container>
      <v-row>
        <v-col v-for="presentTenant in presentTenants" cols="12" sm="4">
          <v-card class="pa-5">
            <v-card-item>
              <v-card-title class="text-wrap" v-html="presentTenant.title" />
            </v-card-item>
            <v-card-text>
              {{ presentTenant.text }}
            </v-card-text>
            <v-card-actions>
              <v-btn class="main-btn">{{ t("Join the Waitlist") }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped lang="scss"></style>
