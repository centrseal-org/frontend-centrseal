<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  property: any;
}>();

const isPaystub = ref(props.property.paystub);
const isIdCard = ref(props.property.idCard);
const isCredit = ref(props.property.credit);

const emit = defineEmits(["updatePropertyChecks"]);
emit("updatePropertyChecks", { isPaystub, isIdCard, isCredit });
</script>

<template>
  <h4 class="text-blackText">Adding Checks</h4>
  <h6 class="text-blackText mt-2">
    Looks great! Let's select the checks we want potential tenants to complete
    for this property.
  </h6>

  <div class="d-flex my-10">
    <img
      :src="props.property?.image[0]?.url"
      class="imageUploaded"
      v-if="props.property?.image[0]?.url"
    />
    <img src="/uploadfile.png" v-else class="imageUploaded" />
    <div class="d-flex flex-column ml-4">
      <span class="font-weight-bold">{{
        props.property.address.data.properties.address_line1
      }}</span>
      <span>{{ props.property.address.data.properties.address_line2 }}</span>
    </div>
  </div>

  <div class="checks d-flex mb-6">
    <div
      class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between"
      :class="{ active: isPaystub }"
    >
      <div>
        <h4 class="text-slateBlue mb-2">Paystub Check</h4>
        <span>
          We'll check the
          <span class="font-weight-bold">last 2 paystubs</span> and verify it's
          valid using a secure bank connection.
        </span>
      </div>
      <div class="d-flex align-center justify-space-between mt-4">
        <v-btn
          class="main-btn mt-8"
          :class="{ active: isPaystub }"
          :ripple="false"
          type="button"
          @click="isPaystub = !isPaystub"
        >
          {{ isPaystub ? "Added" : "Add" }}
          <inline-svg src="/check.svg" v-if="isPaystub" class="ml-1" />
        </v-btn>
        <img src="/3DImage1.png" class="dimage" />
      </div>
    </div>

    <div
      class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between"
    >
      <div>
        <h4 class="text-slateBlue mb-2">ID Check</h4>
        <div>
          We'll collect a photo ID and verify it against a face scan. This
          feature is still not ready to be used. We'll email you once it's
          ready.
        </div>
      </div>
      <div class="d-flex align-center justify-space-between mt-4">
        <v-btn
          class="main-btn mt-8"
          :class="{ active: isIdCard }"
          type="button"
          :ripple="false"
          @click="isIdCard = true"
        >
          <span :class="{ 'text-gray body1 ml-6': isIdCard }">{{
            isIdCard ? "Coming Soon" : "Add"
          }}</span>
        </v-btn>
        <img src="/3DImage2.png" class="dimage" />
      </div>
    </div>

    <div
      class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between"
    >
      <div>
        <h4 class="text-slateBlue mb-2">Credit Check</h4>
        <div>
          We'll identify the credit score and make sure they meet your
          standards.
        </div>
      </div>
      <div class="d-flex align-center justify-space-between mt-4">
        <v-btn
          class="main-btn mt-8"
          type="button"
          :ripple="false"
          :class="{ active: isCredit }"
          @click="isCredit = true"
        >
          <span :class="{ 'text-gray body1 ml-6': isCredit }">{{
            isCredit ? "Coming Soon" : "Add"
          }}</span>
        </v-btn>
        <img src="/3DImage3.png" class="dimage" />
      </div>
    </div>
  </div>
  <div class="progressBar d-flex align-center mt-6 mb-2">
    <v-progress-linear
      color="dark-blue"
      model-value="66.6"
      :height="14"
      rounded
    ></v-progress-linear>
    <span class="ml-2 body1">Step 2/3</span>
  </div>
</template>

<style scoped lang="scss">
.card-slide {
  background: rgba(var(--v-theme-white), 0.75) !important;
  border-radius: 12px !important;
  backdrop-filter: blur(10px);
  width: 350px;
  &.active {
    border: 1px solid rgb(var(--v-theme-electricBlue)) !important;
  }
}
.imageUploaded {
  width: 150px;
  max-height: 200px;

  border-radius: 8px;
  border: 1px solid var(--Blue-blue-300, #6663ff);
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
}
.dimage {
  width: 80px;
  height: 80px;
  object-fit: none;
}
.main-btn {
  width: 99px;
  height: 52px;
  color: red;
}
.main-btn.active {
  border: 1px solid var(--Blue-blue-900, #0b096b) !important;
  background: linear-gradient(93deg, #0e0e1c 0%, #222239 100%) !important;
  box-shadow:
    0px 4px 10px 0px rgba(31, 30, 61, 0.32),
    0px 2px 4px 0px rgba(255, 255, 255, 0.75) inset !important;
  background: none !important;
  border: none !important;
  box-shadow: none !important;
  :deep(.v-btn__content) {
    color: rgb(var(--v-theme-electricBlue)) !important;
  }
  &:hover :deep(.v-btn__overlay) {
    opacity: 0 !important;
  }
}
.progressBar {
  .v-progress-linear {
    width: 48px;
    background-color: #c5c5c5;
  }
  :deep(.v-progress-linear__determinate) {
    border-radius: 0 50px 50px 0;
    background-color: #6a6a6a;
  }
}
</style>
