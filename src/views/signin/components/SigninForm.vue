<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUser";
import httpHelper from "../../../helpers/httpHelpers";

const { t } = useI18n();
const router = useRouter();

const email = ref("");
const password = ref("");
const visible = ref(false);
const errorMessage = ref("");
const isVerifyEmail = ref(false);
const _isTenant = ref(false);

const userStore = useUserStore();

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password: string) => {
  const hasNumber = /[0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  return hasNumber && hasUpperCase;
};

const submitForm = async () => {
  const uniqueUrl = router.currentRoute.value.params.uniqueUrl;
  _isTenant.value = false;
  if (uniqueUrl) {
    try {
      const response = await httpHelper.get(`property/${uniqueUrl}`);
      if (response && response.data) {
        _isTenant.value = true;
      } else {
        _isTenant.value = false;
        errorMessage.value = "The uniqueURL is wrong!";
        return;
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
      _isTenant.value = false;
    }
  }
  if (!email.value || !password.value) {
    errorMessage.value = "Email and password are required.";
    return;
  }

  if (!validateEmail(email.value)) {
    errorMessage.value = "Please enter a valid email address.";
    return;
  }

  if (password.value.length < 8) {
    errorMessage.value = "Password must be at least 8 characters long.";
    return;
  }

  if (!validatePassword(password.value)) {
    errorMessage.value =
      "Password must contain at least one number and one uppercase letter.";
    return;
  }

  try {
    const response: any = await httpHelper.post(
      "auth/signup",
      {
        username: email.value,
        password: password.value,
      },
      { withCredentials: true }
    );
    if (response.data?.status === "logged_in" && response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      if (_isTenant.value) {
        userStore.setUser({
          ...response.data.user,
          tenant: {
            uniqueUrl: uniqueUrl,
          },
        });
        router.push({ name: "tenant" });
      } else {
        userStore.setUser(response.data.user);
        router.push({ name: "dashboard" });
      }
    } else if (response.data?.status === "verification_email_sent") {
      isVerifyEmail.value = true;
    } else {
      errorMessage.value = response.error.message;
    }
  } catch (error: any) {
    errorMessage.value = "An error occurred. Please try again.";
  }
};

const resendVerificationEmail = async () => {
  try {
    await httpHelper.post("auth/resend-verification-email", {
      email: email.value,
    });
  } catch (error) {
    errorMessage.value =
      "Failed to resend verification email. Please try again.";
  }
};
</script>

<template>
  <div class="py-16 signup-page">
    <v-container>
      <v-row v-if="!isVerifyEmail">
        <v-col cols="12" class="py-4">
          <v-form @submit.prevent="submitForm" class="signup-form">
            <div class="card-slide mr-4 pa-6 border border-white">
              <div class="d-flex flex-column align-center">
                <h4 class="gradient-text text-center">
                  {{ t("Sign in or create an account") }}
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
              <div class="my-4">
                <div class="body2 text-gray mb-2">Password</div>
                <v-text-field
                  v-model="password"
                  :type="visible ? 'text' : 'password'"
                  hide-details="auto"
                  placeholder="Enter your password"
                  class="text-input mb-2 mb-sm-0 w-sm-auto w-100"
                  variant="solo"
                  density="compact"
                  required
                  autocomplete="current-password"
                >
                  <template v-slot:prepend-inner>
                    <inline-svg src="/lock.svg" class="prepend-inner-icon" />
                  </template>
                  <template v-slot:append-inner>
                    <inline-svg
                      src="/eye.svg"
                      class="append-inner-icon cursor-pointer"
                      @click="visible = !visible"
                    />
                  </template>
                </v-text-field>
              </div>
              <v-btn
                class="main-btn w-100 d-flex align-center mt-8"
                type="submit"
              >
                <div class="d-flex align-center justify-space-between w-100">
                  <span> {{ t("Continue") }} </span>
                  <inline-svg src="/arrowRight.svg" class="ml-2" />
                </div>
              </v-btn>
              <div v-if="errorMessage" class="mt-4 text-danger">
                {{ errorMessage }}
              </div>
              <!-- <div class="divider-container">
                <v-divider></v-divider>
                <span class="or-text">OR</span>
                <v-divider></v-divider>
              </div> -->

              <div class="body3 text-gray mb-2 text-center mt-4">
                By continuing up, you agree to our
                <a
                  href="/terms-of-service"
                  class="text-grey font-weight-bold text-decoration-none"
                  target="_blank"
                  >Terms of Service</a
                >
                and
                <a
                  href="/privacy-policy"
                  class="text-grey font-weight-bold text-decoration-none"
                  target="_blank"
                  >Privacy Policy</a
                >.
              </div>
            </div>
          </v-form>
        </v-col>
      </v-row>
      <v-row v-if="isVerifyEmail">
        <v-col cols="12" class="py-4">
          <div class="verify-email">
            <div class="card-slide mr-4 pa-6 border border-white">
              <div class="d-flex flex-column align-center mb-10 pb-10">
                <h4 class="gradient-text text-center">
                  {{ t("Let's Verify Your Email") }}
                </h4>
                <h6 class="text-blackText text-center mt-2">
                  {{
                    t(
                      "Please click the link in your email to verify your email and finish signing up."
                    )
                  }}
                </h6>
              </div>

              <div class="body3 text-gray mb-2 text-center mt-10 pt-10">
                Didn't receive the verification email?
                <a
                  href="javascript:void(0)"
                  @click.prevent="resendVerificationEmail"
                  >Send it again</a
                >
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.signup-page {
  min-height: calc(100vh - 57px);
  position: relative;
}
.signup-form,
.verify-email {
  width: 540px;
  min-width: 350px;
  min-height: 350px;
  margin: 0 auto;
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
.divider-container {
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
}
.or-text {
  margin-left: 8px;
  margin-right: 8px;
  color: grey;
}
</style>
