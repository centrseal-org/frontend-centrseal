<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUser";
import httpHelper from "@/helpers/httpHelpers";

const { t } = useI18n();
const router = useRouter();

const email = ref("");
const errorMessage = ref("");
const userStore = useUserStore();
const _linkSent = ref(false);

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const submitForm = async () => {
  if (!email.value) {
    errorMessage.value = "Email is required.";
    return;
  }

  if (!validateEmail(email.value)) {
    errorMessage.value = "Please enter a valid email address.";
    return;
  }

  try {
    const response: any = await httpHelper.post(
      "auth/forgot-password",
      {
        email: email.value,
      },
      { withCredentials: true }
    );
    _linkSent.value = true;
  } catch (error: any) {
    errorMessage.value = "An error occurred. Please try again.";
  }
};
</script>

<template>
  <div class="py-16 forgot-password-page">
    <v-container>
      <v-row v-if="!_linkSent">
        <v-col cols="12" class="py-4">
          <v-form @submit.prevent="submitForm" class="forgot-password-form">
            <div class="card-slide mr-4 pa-6 border border-white">
              <div class="d-flex flex-column align-center">
                <h4 class="gradient-text text-center">
                  {{ t("Let's Reset Your Password") }}
                </h4>
              </div>

              <div class="mt-10">
                <div class="body2 text-gray mb-2">Email</div>
                <v-text-field
                  v-model="email"
                  type="email"
                  hide-details="auto"
                  placeholder="info@centrseal.com"
                  class="text-input mb-2 mb-sm-0 w-sm-auto w-100"
                  variant="solo"
                  density="compact"
                  required
                  autocomplete="email"
                >
                  <template v-slot:prepend-inner>
                    <inline-svg src="/email.svg" class="prepend-inner-icon" />
                  </template>
                </v-text-field>
              </div>
              <v-btn
                class="main-btn w-100 d-flex align-center mt-8"
                type="submit"
              >
                <div class="d-flex align-center justify-space-between w-100">
                  <span> {{ t("Reset Password") }} </span>
                  <inline-svg src="/arrowRight.svg" class="ml-2" />
                </div>
              </v-btn>
              <div v-if="errorMessage" class="mt-4 text-error">
                {{ errorMessage }}
              </div>
            </div>
          </v-form>
        </v-col>
      </v-row>
      <v-row v-if="_linkSent">
        <v-col cols="12" class="py-4">
          <div class="sent-link">
            <div class="card-slide mr-4 pa-6 border border-white">
              <div class="d-flex flex-column align-center">
                <h4 class="gradient-text text-center">
                  {{ t("Password Reset Link Sent!") }}
                </h4>
                <h6 class="text-blackText text-center mt-2">
                  Please check your email
                  <span class="font-weight-bold">
                    {{ email }}
                  </span>
                  <br />
                  and follow the instructions to reset your password.
                </h6>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.forgot-password-page {
  min-height: calc(100vh - 57px);
  position: relative;
}
.forgot-password-form,
.sent-link {
  width: 540px;
  min-width: 350px;
  //   min-height: 350px;
  margin: 0 auto;
  margin-top: 50px;
}
.card-slide {
  background: rgba(var(--v-theme-white), 0.75) !important;
  border-radius: 32px !important;
  backdrop-filter: blur(10px);
  box-shadow: 0px 20px 40px 0px rgba(65, 61, 255, 0.08);
}
:deep(input) {
  min-height: 52px !important;
}
.main-btn {
  min-height: 52px;
  :deep(.v-btn__content) {
    font-size: 18px;
    width: 100%;
  }
}
</style>
