<script setup lang="ts">
import { ref, onMounted, shallowRef, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/useUser";
import { usePropertyStore } from "@/stores/useProperty";
import httpHelper from "../../helpers/httpHelpers";
import Header from "../../components/Header.vue";
import Step1 from "./components/Step1.vue";
import Step2 from "./components/Step2.vue";
import Step3 from "./components/Step3.vue";
import useClipboard from "vue-clipboard3";
import type { VStepper } from "vuetify/components";

const { toClipboard } = useClipboard();
const { t } = useI18n();
const snackbar = ref(false);
const response = ref();
const errorChecks = ref(false);
const errorAddress = ref(false);
const errorMessage = ref("");
const isAddingProperty = ref(false);
const isEditingProperty = ref(false);

/* Store */
const propertyStore = usePropertyStore();
const userStore = useUserStore();
const properties = computed(() => propertyStore.properties);
const user = computed(() => userStore.user);

const stepNumber = ref(0);
const stepperRef = shallowRef<InstanceType<typeof VStepper>>();

const property: any = ref({
  address: null,
  image: null,
  paystub: false,
  idCard: false,
  credit: false,
});
const handleUpdatePropertyInfo = (val: any) => {
  property.value.address = val.propertyAddress;
  property.value.image = val.uploadedFiles;
};
const handleUpdatePropertyChecks = (val: any) => {
  property.value.paystub = val.isPaystub;
  property.value.idCard = val.isIdCard;
  property.value.credit = val.isCredit;
};

const addProperty = async () => {
  if (!property.value.paystub) {
    errorChecks.value = true;
    return;
  }
  if ((property.value.address, property.value.image)) {
    try {
      errorChecks.value = false;
      const endpoint = isEditingProperty.value
        ? `property/${property.value.propertyId}`
        : "property";
      const method = isEditingProperty.value ? "put" : "post";

      response.value = await httpHelper[method](endpoint, property.value);
      if (response.value.code === 200 || response.value.code === 201) {
        // Successfully added property
        stepperRef.value?.next();
      } else {
        // Handle error case
        errorMessage.value =
          response.value.error?.message || "Failed to add property.";
      }
    } catch (error) {
      errorMessage.value = "An error occurred while adding property.";
    }
  }
};

const resetPropertyFlag = () => {
  isAddingProperty.value = false;
  isEditingProperty.value = false;
  stepNumber.value = 0;
  property.value = {
    address: null,
    image: null,
    paystub: false,
    idCard: false,
    credit: false,
  };
};

const copyFn = async (url: string) => {
  try {
    await toClipboard(`https://centrseal.com/${url}`);
    snackbar.value = true;
  } catch (e) {
    console.error(e);
  }
};

const editProperty = async (pro: any) => {
  // Populate the form with the selected property's data
  property.value = {
    address: pro.address,
    image: pro.image,
    paystub: pro.paystub,
    idCard: pro.idCard,
    credit: pro.credit,
    propertyId: pro.propertyId, // Ensure this field is included
  };
  stepNumber.value = 0; // Reset the stepper to the first step
  isEditingProperty.value = true; // Set the editing flag to true
};

onMounted(async () => {
  propertyStore.fetchProperties();
});

const clickStep1 = () => {
  if (property.value.address) {
    stepperRef.value?.next();
    errorAddress.value = false;
  } else {
    errorAddress.value = true;
  }
};
</script>

<template>
  <main>
    <Header @resetPropertyFlag="resetPropertyFlag" />
    <div class="position-relative bg-offWhite overflow-hidden dashboard-page">
      <v-container
        v-if="properties?.length > 0 && !isAddingProperty && !isEditingProperty"
      >
        <v-row class="mt-4">
          <v-col cols="12">
            <section class="d-flex align-center justify-space-between">
              <h4>Properties</h4>
              <v-btn
                @click="isAddingProperty = true"
                class="body1 main-btn addProperty px-6"
                >Add a Property <inline-svg src="/home.svg" class="ml-2"
              /></v-btn>
            </section>
          </v-col>
        </v-row>
        <v-row v-for="pro in properties">
          <v-col cols="12">
            <section class="d-flex align-center justify-space-between">
              <div class="d-flex my-10">
                <!-- <img
                  :src="pro?.image[0]?.url"
                  class="imageUploaded"
                  v-if="pro?.image[0]?.url"
                /> -->
                <img src="/uploadfile.png" class="imgProperty" />

                <div class="d-flex flex-column ml-4">
                  <span class="body1">
                    {{ pro.address?.data?.properties?.address_line1 }}
                  </span>
                  <span class="body3">
                    {{ pro.address?.data?.properties?.address_line2 }}
                  </span>
                  <span
                    class="body3 mt-2 font-weight-bold text-darkGray cursor-pointer"
                    @click="editProperty(pro)"
                  >
                    Edit Property
                  </span>
                  <div class="mt-4 d-flex">
                    <span
                      class="docs-status px-4 py-2 rounded-pill border bg-lightPeriwinkle border-periwinkle"
                    >
                      0/0 Leades Verified
                    </span>
                    <span
                      class="docs-status px-4 py-2 rounded-pill border bg-successLight border-success ml-2"
                    >
                      <inline-svg src="/paystub.svg" class="mr-2" />
                      Check Paystubs
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div
                  class="d-flex align-center px-4 py-3 rounded-pill switch-card cursor-pointer hoverStyle"
                  @click="copyFn(pro.uniqueUrl)"
                >
                  <span>
                    <span class="text-gray font-weight-medium"
                      >https://centrseal.com/</span
                    >{{ pro.uniqueUrl }}
                  </span>

                  <span class="ml-4 d-flex align-center">
                    <inline-svg src="/copy-double.svg" />
                    <span class="body2 text-electricBlue">Copy</span>
                  </span>
                </div>
              </div>
            </section>
          </v-col>
          <!-- <v-col cols="12"> Leads </v-col> -->
        </v-row>
      </v-container>
      <v-container
        v-if="properties?.length === 0 || isAddingProperty || isEditingProperty"
      >
        <v-row>
          <v-col cols="12" class="pa-0">
            <div v-if="user">
              <v-stepper
                v-model="stepNumber"
                ref="stepperRef"
                class="bg-offWhite"
                flat
              >
                <v-stepper-header>
                  <v-stepper-item step="0">Step 1</v-stepper-item>
                  <v-stepper-item step="1">Step 2</v-stepper-item>
                  <v-stepper-item step="2">Step 3</v-stepper-item>
                </v-stepper-header>
                <v-stepper-window>
                  <v-stepper-window-item :value="0" class="py-10 px-3">
                    <Step1
                      @updatePropertyInfo="handleUpdatePropertyInfo"
                      :property="property"
                    />
                    <v-stepper-actions>
                      <template #prev><div class="d-none"></div></template>
                      <template #next>
                        <div class="stepperActions">
                          <v-btn
                            class="main-btn w-100 d-flex align-center my-2"
                            type="button"
                            :ripple="false"
                            @click="clickStep1()"
                          >
                            <div
                              class="d-flex align-center justify-space-between w-100"
                            >
                              <span>Next</span>
                              <inline-svg src="/arrowRight.svg" class="ml-2" />
                            </div>
                          </v-btn>
                          <span class="text-error" v-if="errorAddress"
                            >Address is required!</span
                          >
                        </div>
                      </template>
                    </v-stepper-actions>
                  </v-stepper-window-item>

                  <v-stepper-window-item :value="1" class="py-10 px-3">
                    <Step2
                      @updatePropertyChecks="handleUpdatePropertyChecks"
                      :property="property"
                    />
                    <v-stepper-actions>
                      <template #prev>
                        <v-btn
                          class="main-btn d-flex align-center px-6 addProperty"
                          type="button"
                          @click="stepperRef?.prev()"
                          >Back</v-btn
                        >
                      </template>
                      <template #next>
                        <div class="stepperActions">
                          <v-btn
                            class="main-btn w-100 d-flex align-center my-2 ml-2"
                            type="button"
                            @click="addProperty"
                          >
                            <div
                              class="d-flex align-center justify-space-between w-100"
                            >
                              <span>Next</span>
                              <inline-svg src="/arrowRight.svg" class="ml-2" />
                            </div>
                          </v-btn>
                        </div>
                      </template>
                    </v-stepper-actions>
                    <span class="text-error" v-if="errorChecks"
                      >At least one check is required!</span
                    >
                  </v-stepper-window-item>

                  <v-stepper-window-item :value="2" class="py-10 px-3">
                    <Step3 :response="response.data" />
                    <v-stepper-actions>
                      <template #prev><div class="d-none"></div></template>
                      <template #next><div class="d-none"></div></template>
                    </v-stepper-actions>
                  </v-stepper-window-item>
                </v-stepper-window>
              </v-stepper>
            </div>
            <div v-else="errorMessage">
              <p class="text-error">{{ errorMessage }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </main>
  <v-snackbar v-model="snackbar" :timeout="2000">
    {{ t("copied") }}
  </v-snackbar>
</template>
<style scoped lang="scss">
.dashboard-page {
  min-height: calc(100vh - 67.2px);
  z-index: 1;
  position: relative;
  :deep(.v-stepper-header) {
    display: none !important;
  }
  :deep(.v-stepper-window),
  :deep(.v-stepper-actions) {
    margin: 0;
    padding: 0;
  }
  .stepperActions {
    width: 450px;
  }
  .main-btn {
    height: 52px;
    :deep(.v-btn__content) {
      width: 100%;
    }
  }
}
.docs-status {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  width: fit-content;
}
.main-btn.addProperty {
  border: none !important;
  background: linear-gradient(93deg, #595968 0%, #484852 100%) !important;
  box-shadow:
    0px 4px 10px 0px rgba(57, 57, 67, 0.32),
    0px 2px 4px 0px rgba(255, 255, 255, 0.75) inset !important;
}
.main-btn.addProperty::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 10px; /* Match the button's border radius */
  background: linear-gradient(
    180deg,
    #fff,
    #fff,
    rgba(89, 89, 104, 0.2),
    rgba(89, 89, 104, 0.5)
  );
  z-index: -1; /* Place it behind the button */
  padding: 2px; /* Create space for the gradient border */
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.v-stepper-actions {
  display: flex;
  align-items: center;
  justify-content: start;
}
.hoverStyle {
  transition: all ease 0.3s;
}
.hoverStyle:hover,
.hoverStyle:focus {
  transform: scale(1.02);
  box-shadow: 0px 20px 40px 0px rgba(var(--v-theme-indigo), 0.13);
}
.imgProperty {
  border-radius: 8px;
  border: 1px solid var(--Blue-blue-300, #6663ff);
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
}
</style>
