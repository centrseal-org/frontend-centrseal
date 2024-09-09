<!--
Summary: Index of the tenant page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the tenant component.
@author Kasra Jannati
-->
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/useUser";
import { useI18n } from "vue-i18n";
import httpHelper from "@/helpers/httpHelpers";
import Header from "@/components/Header.vue";
import Upload from "./components/Upload.vue";
import Bank from "./components/Bank.vue";
import Ready from "./components/Ready.vue";

const { t } = useI18n();
const userStore = useUserStore();
const user = computed(() => userStore.user);
const property = ref();
const files = ref();
const transactions = ref();
const maxFiles = 2;
const _uploadedFiles = ref(false);
const _connectedBank = ref(false);

const uploadedFiles = (filesEmit: any) => {
  if (filesEmit.length === maxFiles) {
    _uploadedFiles.value = true;
    files.value = filesEmit;
    return;
  }
  _uploadedFiles.value = false;
};

const connectedBank = (transactionsEmit: any) => {
  if (transactionsEmit.length) {
    _connectedBank.value = true;
    transactions.value = transactionsEmit;
    return;
  }
  _connectedBank.value = false;
};

onMounted(async () => {
  try {
    console.log(userStore.user?.tenant, "userStore.user?.tenant");
    const response = await httpHelper.get(
      `property/${userStore.user?.tenant.property.uniqueUrl}`
    );
    if (response && response.data) {
      property.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching property data:", error);
  }
});
</script>

<template>
  <main>
    <Header />
    <div class="position-relative bg-offWhite overflow-hidden tenant-page">
      <v-container>
        <v-row class="mt-4">
          <v-col cols="12">
            <section>
              <h4 class="text-blackText">
                {{
                  t("tenant.hi", {
                    firstName: user?.firstName,
                  })
                }}
              </h4>
              <h6 class="text-blackText mt-2">
                <span>
                  {{ t("tenant.youHaveBeenInvited") }}
                </span>
              </h6>
            </section>
          </v-col>
          <v-col cols="12">
            <section class="d-flex align-center justify-space-between">
              <div class="d-flex my-10 flex-sm-row flex-column">
                <img src="/uploadfile.png" class="imgProperty" />
                <div
                  class="d-flex flex-column justify-space-between ml-sm-4 ml-0"
                >
                  <div v-if="property?.address.data.properties">
                    <div class="body1">
                      {{ property.address.data.properties?.address_line1 }}
                    </div>
                    <div class="body3 mt-sm-2 mt-0">
                      {{ property.address.data.properties?.address_line2 }}
                    </div>
                  </div>
                  <div>
                    <span
                      v-if="property?.paystub"
                      class="px-6 py-2 rounded-pill border bg-successLight border-success d-flex align-center font-weight-medium mt-2 mt-sm-0"
                    >
                      <inline-svg src="/paystub.svg" class="mr-2" />
                      {{ t("tenant.requiresPaystubs") }}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </v-col>
        </v-row>
        <Upload @uploadedFiles="uploadedFiles" v-if="!_uploadedFiles" />
        <Bank
          @connectedBank="connectedBank"
          v-if="_uploadedFiles && !_connectedBank"
        />
        <Ready
          :files="files"
          :transactions="transactions"
          v-if="_connectedBank && _uploadedFiles"
        />
      </v-container>
    </div>
  </main>
</template>

<style scoped lang="scss">
.tenant-page {
  min-height: calc(100vh - 57px);
}
</style>
