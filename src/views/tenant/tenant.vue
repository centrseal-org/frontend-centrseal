<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/useUser";
import httpHelper from "../../helpers/httpHelpers";
import Header from "../../components/Header.vue";
import Upload from "./components/Upload.vue";
import Bank from "./components/Bank.vue";
import Ready from "./components/Ready.vue";

const userStore = useUserStore();
const user: any = computed(() => userStore.user);
const property = ref();
const _uploadedFiles = ref(false);
const _connectedBank = ref(false);
const files = ref();
const transactions = ref();

const uploadedFiles = (filesEmit: any) => {
  console.log(filesEmit, "filesEmit");
  if (filesEmit.length === 2) {
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
    const response = await httpHelper.get(
      `property/${userStore.user?.tenant.uniqueUrl}`
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
              <h4 class="text-blackText">Hi, {{ user?.firstName }}!</h4>
              <h6 class="text-blackText mt-2">
                <span>
                  You've been invited to submit your paystubs and verify your
                  income.
                </span>
              </h6>
            </section>
          </v-col>
          <v-col cols="12">
            <section class="d-flex align-center justify-space-between">
              <div class="d-flex my-10">
                <img src="/uploadfile.png" class="imgProperty" />
                <div class="d-flex flex-column justify-space-between ml-4">
                  <div>
                    <div class="body1">
                      {{ property?.address?.data?.properties?.address_line1 }}
                    </div>
                    <div class="body3 mt-2">
                      {{ property?.address?.data?.properties?.address_line2 }}
                    </div>
                  </div>
                  <div>
                    <span
                      v-if="property?.paystub"
                      class="px-4 py-2 rounded-pill border bg-successLight border-success d-flex align-center"
                    >
                      <inline-svg src="/paystub.svg" class="mr-2" />
                      Requires Paystubs
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
