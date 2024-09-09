<!--
Summary: Display the all information to submit documents
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the Ready component.
@author Kasra Jannati
-->
<script setup lang="ts">
import { useRouter } from "vue-router";
import { truncate } from "@/helpers/truncate";
import { useVerificationStore } from "@/stores/verificationStore";
import { useI18n } from "vue-i18n";

const props = defineProps({
  transactions: {
    type: Array as () => Array<any>,
    required: true,
  },
  files: {
    type: Array as () => Array<any>,
    required: true,
  },
});

const { t } = useI18n();
const router = useRouter();
const store = useVerificationStore();

const submit = () => {
  store.setTransactions(props.transactions);
  store.setFiles(props.files);
  router.push("/tenant/verify");
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <section>
        <h5 class="text-electricBlue">
          {{ t("tenant.youAreAllSetToGetVerified") }}
        </h5>
        <div class="body2 mt-2">
          <span>
            {{ t("tenant.pleaseCheckWeHaveTheRightInfoHere") }}
          </span>
        </div>
      </section>
    </v-col>
    <v-col cols="12">
      <div class="listFiles">
        <ul>
          <li
            v-for="file in files"
            :key="file.file.name"
            class="pa-2 px-4 rounded-lg my-4 d-flex align-center justify-space-between"
          >
            <section class="d-flex align-center">
              <inline-svg src="/pdf.svg" class="mr-4" />
              <div>
                <div>{{ truncate(file.file.name, 40) }}</div>
                <div class="d-flex align-center">
                  <span class="text-lightGray body3">
                    {{ (file.file.size / 1024).toFixed(2) }}
                    {{ t("tenant.kb") }}
                  </span>
                </div>
              </div>
            </section>
          </li>
          <li
            class="pa-2 px-4 rounded-lg my-4 d-flex align-center justify-space-between"
          >
            <section class="d-flex align-center">
              <inline-svg src="/bank.svg" class="mr-4" />
              <div>
                <!-- TODO: Get this value from Plaid -->
                <div>CIBC Chequing ••••2124</div>
                <div class="d-flex align-center">
                  <span class="text-lightGray body3">
                    {{ t("tenant.connected") }}
                  </span>
                </div>
              </div>
            </section>
          </li>
        </ul>
      </div>
    </v-col>
    <v-col cols="12">
      <button
        class="main-btn submit text-white py-3 px-4 d-flex align-center justify-space-between"
        type="button"
        @click="submit"
      >
        <span class="font-weight-medium">{{ t("tenant.submit") }}</span>
        <inline-svg src="/arrowRight.svg" />
      </button>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.listFiles {
  ul {
    list-style-type: none;
    li {
      background: white;
      max-width: 600px;
    }
  }
}
.main-btn.submit {
  max-width: 600px !important;
  width: 100%;
}
</style>
