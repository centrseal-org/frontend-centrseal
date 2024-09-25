<!--
Summary: Display the bank information of the tenant
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the Bank component.
@author Kasra Jannati
-->
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  usePlaidLink,
  type PlaidLinkOnSuccess,
  type PlaidLinkOptions,
} from "@jcss/vue-plaid-link";
import httpHelper from "@/helpers/httpHelpers";

const { t } = useI18n();
const emit = defineEmits(["connectedBank"]);
const data = ref<{ link_token: string } | null>(null);
const accessToken = ref();
const transactions = ref();
const token = computed(() => {
  return data.value?.link_token || "";
});

/* connect to Bank */
const onSuccess: PlaidLinkOnSuccess = async (publicToken, metadata) => {
  try {
    const response = await httpHelper.post<{ access_token: string }>(
      "plaid/exchange-public-token",
      {
        public_token: publicToken,
      }
    );
    if (response.data) {
      accessToken.value = response.data.access_token;
      await fetchTransactions();
    }
  } catch (error) {
    console.error("Error exchanging public token:", error);
  }
};
const config: any = computed(() => {
  const config: PlaidLinkOptions = {
    token: token.value,
    onSuccess,
  };
  return config;
});
const { open, ready } = usePlaidLink(config);

const fetchTransactions = async () => {
  if (accessToken.value) {
    const today = new Date();
    const endDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    // Calculate start date (3 months before today)
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    const startDate = threeMonthsAgo.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    try {
      const response: any = await httpHelper.post("plaid/get-transactions", {
        access_token: accessToken.value,
        start_date: startDate,
        end_date: endDate,
      });
      if (response.data) {
        transactions.value = response.data.transactions;
      }
      // Emit events to the parent component
      emit("connectedBank", transactions.value);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  } else {
    console.error("No access token available");
  }
};

onMounted(() => {
  httpHelper
    .post<{ link_token: string }>("plaid/create-link-token")
    .then((response) => {
      data.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching link token:", error);
    });
});
</script>

<template>
  <v-row class="mb-10">
    <v-col cols="12">
      <section>
        <h5 class="text-electricBlue">
          {{ t("tenant.connectYourBankAccount") }}
        </h5>
        <div class="body2 mt-2">
          <span v-safe-html="t('tenant.weConnectToYourBankSecurely')"></span>
        </div>
      </section>
    </v-col>
    <v-col cols="12">
      <button
        class="main-btn connect text-white py-3 px-4 d-flex align-center justify-space-between"
        type="button"
        :disabled="!ready"
        @click="open"
      >
        <span class="font-weight-medium">
          {{ t("tenant.connectYourBank") }}
        </span>
        <inline-svg src="/arrowRight.svg" />
      </button>
    </v-col>
    <v-col cols="12">
      <section class="d-flex">
        <img src="/plaid.png" class="mr-4 plaidLogo" />
        <div
          class="body3"
          v-safe-html="t('tenant.weConnectToYourBankSecurely')"
        ></div>
      </section>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.main-btn.connect {
  max-width: 600px !important;
  width: 100%;
}
.plaidLogo {
  max-width: 200px;
  object-fit: contain;
}
</style>
