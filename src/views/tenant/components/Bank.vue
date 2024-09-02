<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  usePlaidLink,
  type PlaidLinkOnSuccess,
  type PlaidLinkOptions,
} from "@jcss/vue-plaid-link";
import { useFetch } from "@vueuse/core";
import httpHelper from "@/helpers/httpHelpers";

const data = ref<{ link_token: string } | null>(null);
const accessToken = ref<string | null>(null); ////
const transactions = ref<any[]>([]); ////

const token = computed(() => {
  return data.value?.link_token || "";
});

/////
const fetchTransactions = async () => {
  console.log("Fetching transactions...");

  if (accessToken.value) {
    try {
      const response = await httpHelper.post("plaid/get-transactions", {
        access_token: accessToken.value,
        start_date: "2024-08-01",
        end_date: "2024-09-01",
      });
      transactions.value = response?.data?.transactions;
      console.log("Transactions:", transactions.value);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  } else {
    console.error("No access token available");
  }
};

/////
const onSuccess: PlaidLinkOnSuccess = async (publicToken, metadata) => {
  console.log("onSuccessonSuccessonSuccess");
  try {
    const response = await httpHelper.post<{ access_token: string }>(
      "plaid/exchange-public-token",
      {
        public_token: publicToken,
      }
    );
    accessToken.value = response.data.access_token;
    console.log("Access Token:", accessToken.value);
    await fetchTransactions();
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
  {{ token }}
  <v-row class="mb-10">
    <v-col cols="12">
      <section>
        <h5 class="text-electricBlue">Connect Your Bank Account</h5>
        <div class="body2 mt-2">
          <span>
            We connect to your bank securely via <strong>Plaid</strong> to
            verify your income. Please connect<br />
            the same bank account where you receive your income.
          </span>
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
        <span class="font-weight-medium">Connect Your Bank</span>
        <inline-svg src="/arrowRight.svg" />
      </button>
    </v-col>
    <v-col cols="12">
      <section class="d-flex">
        <img src="/plaid.png" class="mr-4" />
        <div class="body3">
          <strong>Interesting fact about Plaid:</strong> 1 in 3 US adults has
          connected a<br />
          financial account to an app with Plaid
        </div>
      </section>
    </v-col>
    <!-- new -->
    <v-col cols="12">
      <div v-if="transactions?.length">
        <h5>Transactions:</h5>
        <ul>
          <li
            v-for="transaction in transactions"
            :key="transaction.transaction_id"
          >
            {{ transaction.name }} - {{ transaction.amount }} USD
          </li>
        </ul>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.main-btn.connect {
  max-width: 600px !important;
  width: 100%;
}
</style>
