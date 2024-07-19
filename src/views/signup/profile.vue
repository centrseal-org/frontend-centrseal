<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Header from "../../components/Header.vue";
import httpHelper from "../../helpers/httpHelpers";
import { useRouter, useRoute } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const firstName = ref("");
const lastName = ref("");
const brokerageName = ref("");
const token = ref(route.query.token as string);

const submitForm = async () => {
  try {
    await httpHelper.post("auth/complete-signup", {
      token: token.value,
      firstName: firstName.value,
      lastName: lastName.value,
      brokerageName: brokerageName.value,
    });
    router.push("/login");
  } catch (error) {
    console.error("Failed to complete signup", error);
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
      <div class="py-16 profile-page">
        <v-container>
          <v-row>
            <v-col cols="12" class="py-4">
              <v-form @submit.prevent="submitForm" class="profile-form">
                <div class="card-slide mr-4 pa-6 border border-white">
                  <div class="d-flex flex-column align-center">
                    <h6 class="text-blackText text-center mt-2">
                      {{ t("Let's get to know each other") }}
                    </h6>
                  </div>

                  <div class="mt-10">
                    <div class="body2 text-gray mb-2">First Name</div>
                    <v-text-field
                      v-model="firstName"
                      type="text"
                      hide-details="auto"
                      placeholder="John"
                      class="text-input mb-2 mb-sm-0 w-sm-auto w-100"
                      variant="solo"
                      density="compact"
                      required
                      autocomplete="text"
                    />
                  </div>
                  <div class="my-4">
                    <div class="body2 text-gray mb-2">Last Name</div>
                    <v-text-field
                      v-model="lastName"
                      type="text"
                      hide-details="auto"
                      placeholder="Doe"
                      class="text-input mb-2 mb-sm-0 w-sm-auto w-100"
                      variant="solo"
                      density="compact"
                      required
                      autocomplete="text"
                    />
                  </div>
                  <div class="my-4">
                    <div class="body2 text-gray mb-2">
                      Brokerage Name (Optional)
                    </div>
                    <v-text-field
                      v-model="brokerageName"
                      type="text"
                      hide-details="auto"
                      placeholder="DABC Realtyoe"
                      class="text-input mb-2 mb-sm-0 w-sm-auto w-100"
                      variant="solo"
                      density="compact"
                    />
                  </div>
                  <v-btn
                    class="main-btn w-100 d-flex align-center mt-8"
                    type="submit"
                  >
                    <div
                      class="d-flex align-center justify-space-between w-100"
                    >
                      <span> {{ t("Done") }} </span>
                      <inline-svg src="/arrowRight.svg" class="ml-2" />
                    </div>
                  </v-btn>
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

.profile-page {
  min-height: calc(100vh - 57px);
  position: relative;
}
.profile-form,
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
</style>
