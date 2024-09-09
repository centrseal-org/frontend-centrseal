<!--
Summary: Index of the verify documents page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the verifyDocs component.
@author Kasra Jannati
-->
<script setup lang="ts">
import { onMounted } from "vue";
import { useVerificationStore } from "@/stores/verificationStore";
import Header from "@/components/Header.vue";
import httpHelper from "@/helpers/httpHelpers";
import { useUserStore } from "@/stores/useUser";
import { useRouter } from "vue-router";

const store = useVerificationStore();
const userStore = useUserStore();
const router = useRouter();
const files = store.files;
const transactions = store.transactions;
const property = userStore.user.tenant.property;

const uploadFiles = async () => {
  const formData = new FormData();
  // Append the files to the formData
  files.forEach(({ file }) => {
    formData.append("files", file);
  });
  formData.append("property", JSON.stringify(property));
  try {
    await httpHelper.post("files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    router.push("/tenant");
  }
};
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
const OpenAI = async () => {
  for (const fileObj of files) {
    const file = fileObj.file || fileObj._custom?.value?.file;
    if (file) {
      const base64Image = await convertToBase64(file);
      const response = await httpHelper.post("openai/analyze-image", {
        base64Image: base64Image,
      });
      if (response.data) {
        await testPurpose();
        const result = await httpHelper.post("files/compare", {
          transactions: transactions,
          visionResults: response.data,
        });
        if (result.data) {
          console.log(result, "verifieddd");
        } else {
          console.log(result, "NotVerfiedddddd");
          return;
        }
      } else {
        router.push({
          name: "ErrorPage",
          query: {
            title: "Whoops! Something is wrong!",
            subtitle: "Please try again",
            btnText: "Try Again",
            btnUrl: "/tenant",
          },
        });
        console.log(response.data, "Something is wrong!");
        return;
      }
    } else {
      console.warn("No file found in object:", fileObj);
    }
  }
};

const testPurpose = async () => {
  // New transaction object with fake values for the other fields
  const newTransaction = {
    account_id: "fakeAccountId12345",
    account_owner: null,
    amount: "2023.25",
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
  // Add the new transaction to the array
  transactions.push(newTransaction);
};

onMounted(async () => {
  await uploadFiles();
  await OpenAI();
});
</script>

<template>
  <main>
    <Header />
    <div class="position-relative bg-offWhite overflow-hidden verifyDocs-page">
      <section class="contentVerify">
        <img src="/loadingGif.gif" alt="Loading" />
        <h4 class="text-center">We're verifying everything!</h4>
        <!-- TODO: Add API to get the fun facts -->
        <!-- <div class="text-center">Fun Fact: Did you know...</div> -->
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
.verifyDocs-page {
  min-height: calc(100vh - 57px);
  .contentVerify {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      max-width: 350px;
    }
  }
}
</style>
