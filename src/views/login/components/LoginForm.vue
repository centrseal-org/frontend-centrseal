<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import httpHelper from "../../../helpers/httpHelpers";

const { t } = useI18n();
const router = useRouter();

const visible = ref(false);
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const submitForm = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Email and password are required.";
    return;
  }

  try {
    const response: any = await httpHelper.post("auth/login", {
      username: email.value,
      password: password.value,
    });

    if (response.code === 200 && response.data) {
      localStorage.setItem("token", response.data.access_token);
      router.push({ name: "dashboard" });
    } else {
      errorMessage.value =
        response.error?.message ||
        "Login failed. Please check your email and password.";
    }
  } catch (error) {
    errorMessage.value = "An error occurred. Please try again.";
  }
};
</script>

<template>
  <div class="py-16 loginPage">
    <v-container>
      <v-row>
        <v-col cols="12" class="py-4">
          <v-form @submit.prevent="submitForm" class="login-form">
            <div class="card-slide mr-4 pa-6 border border-white">
              <div class="d-flex flex-column align-center">
                <h4 class="gradient-text text-center">
                  {{ t("Welcome Back!") }}
                </h4>
                <h6 class="text-blackText text-center mt-2">
                  {{ t("Log in to manage your properties") }}
                </h6>
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
                  <span> {{ t("Log In") }} </span>
                  <inline-svg src="/arrowRight.svg" class="ml-2" />
                </div>
              </v-btn>
              <div v-if="errorMessage" class="mt-4 text-danger">
                {{ errorMessage }}
              </div>
              <div class="divider-container">
                <v-divider></v-divider>
                <span class="or-text">OR</span>
                <v-divider></v-divider>
              </div>

              <div class="body3 text-gray mb-2 text-center">
                Don't have an account yet?
                <a
                  href="/signup"
                  class="text-indigo font-weight-bold text-decoration-none"
                  >Sign Up</a
                >
              </div>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.loginPage {
  min-height: calc(100vh - 57px);
  position: relative;
}
.login-form {
  width: 540px;
  min-width: 350px;
  min-height: 350px;
  margin: 0 auto;
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
