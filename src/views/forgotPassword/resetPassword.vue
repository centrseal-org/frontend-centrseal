<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Header from "@/components/Header.vue";
import httpHelper from "@/helpers/httpHelpers";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/useUser";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const newPassword = ref("");
const passwordConfirmation = ref("");
const visible = ref(false);
const visibleNewPassword = ref(false);
const errorMessage = ref("");

const token = ref(route.query.token as string);
const userStore = useUserStore();

const isLoggedIn = ref(!!localStorage.getItem("token"));
if (isLoggedIn.value) {
  router.push("/dashboard");
}

const submitForm = async () => {
  // Validate passwords
  if (newPassword.value !== passwordConfirmation.value) {
    errorMessage.value = "Passwords do not match!";
    return;
  }

  // Check password length and requirements
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(newPassword.value)) {
    errorMessage.value =
      "Must be 8 characters or longer, include 1 number, and 1 uppercase letter";
    return;
  }

  try {
    const response: any = await httpHelper.post("/auth/reset-password", {
      token: token.value,
      newPassword: newPassword.value,
    });

    if (response.status === 200) {
      alert(t("Password reset successfully!"));
      router.push("/login");
    }
    if (response.data?.status === "logged_in" && response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      if (response.data.user.role === "realtor") {
        userStore.setUser(response.data.user);
        router.push({ name: "dashboard" });
      } else {
        userStore.setUser(response.data.user);
        router.push({ name: "tenant" });
      }
    }
  } catch (error) {
    errorMessage.value = "An error occurred. Please try again..";
  }
};
</script>

<template>
  <main>
    <Header />
    <div class="position-relative bg-offWhite overflow-hidden">
      <img src="/s1.svg" class="shadowTop" alt="" />
      <img src="/s2.svg" class="shadowTop" alt="" />
      <img src="/s1.svg" class="shadowBottom" alt="" />
      <img src="/s2.svg" class="shadowBottom" alt="" />
      <div class="py-16 reset-password-page">
        <v-container>
          <v-row>
            <v-col cols="12" class="py-4">
              <v-form @submit.prevent="submitForm" class="reset-password-form">
                <div class="card-slide mr-4 pa-6 border border-white">
                  <div class="d-flex flex-column align-center">
                    <h6 class="text-blackText text-center mt-2">
                      {{ t("Create a New Password!") }}
                    </h6>
                  </div>

                  <div class="mt-10">
                    <div class="body2 text-gray mb-2">New Password</div>
                    <v-text-field
                      v-model="newPassword"
                      :type="visibleNewPassword ? 'text' : 'password'"
                      hide-details="auto"
                      placeholder="Enter your password"
                      class="text-input mb-2 mb-sm-0 w-sm-auto w-100"
                      variant="solo"
                      density="compact"
                      required
                      autocomplete="current-password"
                    >
                      <template v-slot:prepend-inner>
                        <inline-svg
                          src="/lock.svg"
                          class="prepend-inner-icon"
                        />
                      </template>
                      <template v-slot:append-inner>
                        <inline-svg
                          src="/eye.svg"
                          class="append-inner-icon cursor-pointer"
                          @click="visibleNewPassword = !visibleNewPassword"
                        />
                      </template>
                    </v-text-field>
                  </div>
                  <div class="my-4">
                    <div class="body2 text-gray mb-2">
                      Password Confirmation
                    </div>
                    <v-text-field
                      v-model="passwordConfirmation"
                      :type="visible ? 'text' : 'password'"
                      hide-details="auto"
                      placeholder="Re-enter your password"
                      class="text-input mb-2 mb-sm-0 w-sm-auto w-100"
                      variant="solo"
                      density="compact"
                      required
                      autocomplete="current-password"
                    >
                      <template v-slot:prepend-inner>
                        <inline-svg
                          src="/lock.svg"
                          class="prepend-inner-icon"
                        />
                      </template>
                      <template v-slot:append-inner>
                        <inline-svg
                          src="/eye.svg"
                          class="append-inner-icon cursor-pointer"
                          @click="visible = !visible"
                        />
                      </template>
                    </v-text-field>
                    <div
                      class="body3 text-gray mt-3 d-flex justify-space-between"
                    >
                      <span>
                        Must be 8 characters or longer, include 1 number, and 1
                        uppercase letter
                      </span>
                    </div>
                  </div>
                  <v-btn
                    class="main-btn w-100 d-flex align-center mt-8"
                    type="submit"
                  >
                    <div
                      class="d-flex align-center justify-space-between w-100"
                    >
                      <span> {{ t("Confirm") }} </span>
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
        </v-container>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@keyframes circleMove {
  0% {
    top: 200px;
    right: 0;
  }
  25% {
    top: -100px;
    right: calc(50% - 350px);
  }
  50% {
    top: 200px;
    right: calc(100% - 350px);
  }
  75% {
    top: 400px;
    right: calc(50% - 350px);
  }
  100% {
    top: 200px;
    right: 0;
  }
}
@keyframes circleMove2 {
  0% {
    top: 200px;
    left: 0;
  }
  25% {
    top: 400px;
    left: calc(50% - 350px);
  }
  50% {
    top: 200px;
    left: calc(100% - 350px);
  }
  75% {
    top: 0;
    left: calc(50% - 350px);
  }
  100% {
    top: 200px;
    left: 0;
  }
}
.shadowTop {
  position: absolute;
  width: 700px;
  animation: circleMove 50s linear infinite; /* Apply animation */
  pointer-events: none;
}
.shadowBottom {
  position: absolute;
  width: 700px;
  animation: circleMove2 50s linear infinite; /* Apply animation */
  pointer-events: none;
}
.reset-password-page {
  min-height: calc(100vh - 57px);
  position: relative;
}
.reset-password-form {
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
</style>
