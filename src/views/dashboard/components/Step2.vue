<script setup lang="ts">
import { ref } from "vue";

const isPaystub = ref(false);
const isIdCard = ref(false);
const isCredit = ref(false);
const props = defineProps<{
  property: any;
}>();
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
    <img src="/uploadfile.png" v-else />

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
    >
      <div>
        <h4 class="gradient-text mb-2">Paystub Check</h4>
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
          type="button"
          @click="isPaystub = !isPaystub"
        >
          {{ isPaystub ? "Added" : "Add" }}
        </v-btn>
        <img src="/3DImage1.png" class="dimage" />
      </div>
    </div>

    <div
      class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between"
    >
      <div>
        <h4 class="gradient-text mb-2">ID Check</h4>
        <div>
          We'll check the last 2 paystubs and verify it's valid using a secure
          bank connection
        </div>
      </div>
      <div class="d-flex align-center justify-space-between mt-4">
        <!-- TODO: future feature -->
        <!-- <v-btn
          class="main-btn mt-8"
          type="button"
          @click="isIdCard = !isIdCard"
        >
          {{ isIdCard ? "Added" : "Add" }}
        </v-btn> -->
        <span>Not Available</span>
        <img src="/3DImage2.png" class="dimage" />
      </div>
    </div>

    <div
      class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between"
    >
      <div>
        <h4 class="gradient-text mb-2">Credit Check</h4>
        <div>
          We’ll identify the credit score from the lead and make sure it’s above
          your standard.
        </div>
      </div>
      <div class="d-flex align-center justify-space-between mt-4">
        <!-- TODO: future feature -->
        <!-- <v-btn
          class="main-btn mt-8"
          type="button"
          @click="isCredit = !isCredit"
        >
          {{ isCredit ? "Added" : "Add" }}
        </v-btn> -->
        <span>Not Available</span>
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
  border-radius: 32px !important;
  backdrop-filter: blur(10px);
  width: 350px;
}
.imageUploaded {
  width: 150px;
  max-height: 200px;
}
.dimage {
  width: 80px;
  height: 80px;
  object-fit: none;
}
.main-btn {
  width: 99px;
  height: 52px;
}
.main-btn.active {
  border: 1px solid var(--Blue-blue-900, #0b096b) !important;
  background: linear-gradient(93deg, #0e0e1c 0%, #222239 100%) !important;
  box-shadow:
    0px 4px 10px 0px rgba(31, 30, 61, 0.32),
    0px 2px 4px 0px rgba(255, 255, 255, 0.75) inset !important;
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
