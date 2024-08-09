<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import useClipboard from "vue-clipboard3";
import { useI18n } from "vue-i18n";
import confetti from "canvas-confetti";

const { toClipboard } = useClipboard();
const snackbar = ref(false);
const { t } = useI18n();

const props = defineProps<{
  response: any;
}>();
const copyFn = async () => {
  try {
    await toClipboard(`https://centrseal.com/${props.response.uniqueUrl}`);
    snackbar.value = true;
  } catch (e) {
    console.error(e);
  }
};
const confettiButton = ref<HTMLElement | null>(null);
onMounted(async () => {
  setTimeout(() => {
    if (confettiButton.value) {
      const rect = confettiButton.value.getBoundingClientRect();
      const x = (rect.left + rect.right) / 2 / window.innerWidth;
      const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: x, y: y },
      });
    }
  }, 300); // Adjust the delay if necessary
});
</script>

<template>
  <h4 class="text-blackText">All Ready! Let’s Get Some Tenants</h4>
  <h6 class="text-blackText mt-2">
    Your property is added and we’re ready to invite tenants to verify.
  </h6>

  <div class="d-flex my-10">
    <img
      :src="props.response?.image[0]?.url"
      class="imageUploaded"
      v-if="props.response?.image[0]?.url"
    />

    <img src="/uploadfile.png" v-else />

    <div class="d-flex flex-column ml-4">
      <span class="font-weight-bold">{{
        props.response.address.data.properties.address_line1
      }}</span>
      <span>{{ props.response.address.data.properties.address_line2 }}</span>

      <div class="mt-4 d-flex">
        <span
          class="docs-status px-4 py-2 rounded-pill border bg-lightPeriwinkle border-periwinkle"
        >
          No Leads Verified Yet
        </span>
        <span
          class="docs-status px-4 py-2 rounded-pill border bg-successLight border-success ml-2"
          v-if="props.response.paystub"
        >
          <inline-svg src="/paystub.svg" class="mr-2" />
          Check Paystubs
        </span>
      </div>
    </div>
  </div>

  <div class="invitationLink">
    <span
      >Share the link below to invite tenants to verify themselves for this
      property.</span
    >

    <div class="d-flex flex-column align-baseline my-4">
      <div
        class="d-flex align-center px-4 py-3 rounded-pill switch-card cursor-pointer hoverStyle"
        @click="copyFn"
        ref="confettiButton"
      >
        <span>
          <span class="text-gray font-weight-medium"
            >https://centrseal.com/</span
          >{{ props.response.uniqueUrl }}
        </span>
        <span class="ml-4 d-flex align-center">
          <inline-svg src="/copy-double.svg" />
          <span class="body2 text-electricBlue">Copy</span>
        </span>
      </div>
    </div>
  </div>

  <div class="progressBar d-flex align-center mt-6 mb-2">
    <v-progress-linear color="dark-blue" model-value="100" :height="14" rounded>
      <inline-svg src="/mark.svg" />
    </v-progress-linear>
    <span class="ml-2 body1">Step 3/3</span>
  </div>

  <div class="stepperActions">
    <!-- TODO: change it to button to prevent reload. -->
    <v-btn
      class="main-btn w-100 d-flex align-center my-2"
      type="button"
      href="/dashboard"
    >
      <div class="d-flex align-center justify-space-between w-100">
        <span>Done</span>
        <inline-svg src="/arrowRight.svg" class="ml-2" />
      </div>
    </v-btn>
  </div>

  <v-snackbar v-model="snackbar" :timeout="5000">
    {{ t("copied") }}
  </v-snackbar>
</template>

<style scoped lang="scss">
.stepperActions {
  width: 450px;
}
.main-btn {
  height: 52px;
  :deep(.v-btn__content) {
    width: 100%;
  }
}
.imageUploaded {
  width: 150px;
  max-height: 200px;
}
.docs-status {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  width: fit-content;
}
.progressBar {
  .v-progress-linear {
    width: 48px;
    background-color: #6663ff;
  }
  :deep(.v-progress-linear__determinate) {
    border-radius: 0 50px 50px 0;
    background-color: #6663ff;
  }
}
</style>
