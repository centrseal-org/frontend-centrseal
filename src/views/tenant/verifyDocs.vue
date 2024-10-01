<!--
Summary: Index of the verify paystubs page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the verifyDocs component.
@author Kasra Jannati
-->
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useVerificationStore } from "@/stores/useVerificationStore";
import { useNavigateTo } from "@/composables/useNavigateTo";
import { useUserStore } from "@/stores/useUser";
import Header from "@/components/Header.vue";
import httpHelper from "@/helpers/httpHelpers";
import PaystubCard from "@/components/PaystubCard.vue";
import confetti from "canvas-confetti";

const { navigateTo } = useNavigateTo();
const verificationStore = useVerificationStore();
const userStore = useUserStore();
const paystubs = verificationStore.paystubs;
const transactions = verificationStore.transactions;
const isVerified = ref<boolean | null>(null);
const confettiButton = ref<HTMLElement | null>(null);
const user = computed(() => userStore.user);
const verificationResults = ref();

const testPurpose = async () => {
  const newTransaction = {
    account_id: "fakeAccountId12345",
    account_owner: null,
    amount: 2023.25,
    authorized_date: null,
    authorized_datetime: null,
    category: ["Business", "Healthcare"],
    category_id: "10001000",
    check_number: null,
    counterparties: [],
    date: "2022/09/15",
    datetime: null,
    iso_currency_code: "USD",
    location: {
      address: "123 Fake St",
      city: "FakeCity",
      country: "US",
      lat: null,
      lon: null,
      postal_code: "12345",
      region: "CA",
      store_number: null,
    },
    logo_url: null,
    merchant_entity_id: null,
    merchant_name: "Reliq Health Technologies Inc",
    name: "Reliq Health Technologies Inc",
    payment_channel: "online",
    payment_meta: {
      by_order_of: null,
      payee: null,
      payer: null,
      payment_method: "credit",
      payment_processor: "FakeProcessor",
      ppd_id: "123456789",
      reason: "Payment for services",
      reference_number: "REF123456789",
    },
    pending: false,
    pending_transaction_id: null,
    personal_finance_category: {
      confidence_level: "HIGH",
      detailed: "BUSINESS_HEALTHCARE",
      primary: "BUSINESS",
    },
    personal_finance_category_icon_url:
      "https://plaid-category-icons.plaid.com/PFC_BUSINESS.png",
    transaction_code: "12345ABCDE",
    transaction_id: "newTransactionId12345",
    transaction_type: "place",
    unofficial_currency_code: null,
    website: "https://reliqhealth.com",
  };
  transactions.push(newTransaction);
  const newTransaction2 = {
    account_id: "fakeAccountId12345",
    account_owner: null,
    amount: 1127.71,
    authorized_date: null,
    authorized_datetime: null,
    category: ["Business", "Healthcare"],
    category_id: "10001000",
    check_number: null,
    counterparties: [],
    date: "2022/09/15",
    datetime: null,
    iso_currency_code: "USD",
    location: {
      address: "123 Fake St",
      city: "FakeCity",
      country: "US",
      lat: null,
      lon: null,
      postal_code: "12345",
      region: "CA",
      store_number: null,
    },
    logo_url: null,
    merchant_entity_id: null,
    merchant_name: "Reliq Health Technologies Inc22",
    name: "Reliq Health Technologies Inc22",
    payment_channel: "online",
    payment_meta: {
      by_order_of: null,
      payee: null,
      payer: null,
      payment_method: "credit",
      payment_processor: "FakeProcessor",
      ppd_id: "123456789",
      reason: "Payment for services",
      reference_number: "REF123456789",
    },
    pending: false,
    pending_transaction_id: null,
    personal_finance_category: {
      confidence_level: "HIGH",
      detailed: "BUSINESS_HEALTHCARE",
      primary: "BUSINESS",
    },
    personal_finance_category_icon_url:
      "https://plaid-category-icons.plaid.com/PFC_BUSINESS.png",
    transaction_code: "12345ABCDE",
    transaction_id: "newTransactionId12345",
    transaction_type: "place",
    unofficial_currency_code: null,
    website: "https://reliqhealth.com",
  };
  transactions.push(newTransaction2);
};

const updatePaystub = async (paystubId: number, verified: boolean) => {
  try {
    // Add the current date as the verificationDate
    const verificationDate = new Date().toISOString();
    const response = await httpHelper.patch(`paystub/${paystubId}`, {
      isVerified: verified,
      verificationDate,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating paystub:", error);
    return null;
  }
};

const addSignedUrls = async () => {
  // For each property, fetch paystubs and merge them
  for (const [index, re] of verificationResults.value.entries()) {
    try {
      const response: any = await httpHelper.post("paystub/signed-url", {
        paystubUrl: re.paystubUrl,
      });
      verificationResults.value[index].preSignedUrl = response.data;
    } catch (error) {
      console.error(`Error fetching paystubs for property :`, error);
    }
  }
};

const performVerification = async () => {
  const results: any = await Promise.all(
    paystubs.map(async (ps) => {
      console.log(transactions, "111");
      console.log(ps.paystub, "222");
      const result = await httpHelper.post("paystub/verify", {
        transactions: transactions,
        paystub: ps.paystub,
      });
      const isVerified = result.data ? true : false;
      const updateResult: any = await updatePaystub(
        ps.paystub.paystubId,
        isVerified
      );
      return updateResult;
    })
  );
  verificationResults.value = results;
  isVerified.value = results.every((result: any) => result.isVerified === true);
};

const tryAgainBtn = async () => {
  const propertyId = verificationResults.value[0].propertyId;
  try {
    const response: any = await httpHelper.get(`property/id/${propertyId}`);
    if (response.data) {
      const uniqueUrl = response.data.uniqueUrl;
      navigateTo(`/tenant/paystub?uniqueUrl=${uniqueUrl}`);
    } else {
      navigateTo("/tenant");
    }
  } catch (error) {
    console.error("Error fetching property data:", error);
  }
};

onMounted(async () => {
  if (paystubs.length === 0 || transactions.length === 0) {
    navigateTo("/tenant");
  }
  await testPurpose();
  await new Promise((resolve) => {
    setTimeout(async () => {
      await performVerification();
      resolve(true);
    }, 3000);
  });
  if (verificationResults.value) {
    await addSignedUrls();
  }
});

watch([isVerified, confettiButton], ([verified, button]) => {
  // Run confetti: Trigger confetti when `isVerified` is true and `confettiButton` is available
  if (verified && button) {
    const rect = button.getBoundingClientRect();
    const x = (rect.left + rect.right) / 2 / window.innerWidth;
    const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: x, y: y },
    });
  }
});
</script>

<template>
  <main>
    <Header />
    <div
      class="position-relative bg-offWhite overflow-hidden verifyDocs-page main-content"
    >
      <section class="contentVerify">
        <img src="/loadingGif.gif" alt="Loading" v-if="isVerified === null" />
        <h4 class="text-center" v-if="isVerified === null">
          We're verifying everything!
        </h4>
        <section v-else-if="isVerified === true">
          <h4 class="text-center">You're Verified!</h4>
          <p class="text-center mt-2" ref="confettiButton">
            Feel free to close this window or go back home to view your
            submitted verification.
          </p>
          <div class="d-flex align-center justify-center ma-4">
            <PaystubCard
              :fullname="`${user?.firstName} ${user?.lastName}`"
              earn="-"
              period="-"
              :statusDate="verificationResults[0].verificationDate"
              status="verified"
              :paystubs="verificationResults"
            />
          </div>
          <button
            class="main-btn mx-auto text-white py-3 px-4 d-flex align-center justify-space-between"
            type="button"
            :ripple="false"
            @click="navigateTo('/tenant')"
          >
            <span class="font-weight-medium">Return Home</span>
            <inline-svg src="/arrowRight.svg" />
          </button>
        </section>

        <section v-else-if="isVerified === false">
          <h4 class="text-center">We Couldn't Verify You!</h4>
          <p class="text-center mt-2">
            Feel free to go back to try uploading your documents and try again.
          </p>
          <div class="d-flex align-center justify-center ma-4">
            <PaystubCard
              :fullname="`${user?.firstName} ${user?.lastName}`"
              earn="-"
              period="-"
              :statusDate="verificationResults[0].verificationDate"
              status="unverified"
              :paystubs="verificationResults"
            />
          </div>
          <button
            class="main-btn mx-auto text-white py-3 px-4 d-flex align-center justify-space-between"
            type="button"
            :ripple="false"
            @click="tryAgainBtn()"
          >
            <span class="font-weight-medium">Try Again!</span>
            <inline-svg src="/arrowRight.svg" />
          </button>
        </section>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
.verifyDocs-page {
  .contentVerify {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      max-width: 350px;
    }
    .main-btn {
      max-width: 360px;
      width: 360px;
    }
  }
}
</style>
