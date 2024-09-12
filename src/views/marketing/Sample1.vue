<script setup lang="ts">
import { usePropertyStore } from "@/stores/useProperty";
import { useUserStore } from "@/stores/useUser";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { mailchimp } from "@/composables/mailchimp";

const { t } = useI18n();
const router = useRouter();
const openPopUp = ref(false);
const { addAudience } = mailchimp();
const clickReq = () => {
  email.value = "";
  openPopUp.value = true;
};
const exit = () => {
  openPopUp.value = false;
};
const email = ref("");
const submit = ref();
const emailRules = [
  (value: any) => {
    if (value) return true;
    return "E-mail is required.";
  },
  (value: any) => {
    if (/.+@.+\..+/.test(value)) return true;
    return "E-mail must be valid.";
  },
];
const submitForm = async () => {
  for (const rule of emailRules) {
    const result = rule(email.value);
    if (result !== true) {
      return;
    }
  }
  submit.value = await addAudience(email.value);
  openPopUp.value = false;
};
</script>

<template>
  <main :class="{ overflowRe: openPopUp }">
    <div class="stickyNav bg-white">
      <v-container class="py-2">
        <v-row>
          <v-col cols="12">
            <header class="d-flex align-center justify-space-between">
              <h4>
                <RouterLink to="/" class="text-indigo">
                  {{ t("centrSeal") }}
                </RouterLink>
              </h4>
              <nav>
                <RouterLink to="/???">
                  <v-btn
                    class="main-btn ml-sm-2 ml-0 w-sm-auto w-100"
                    type="button"
                    :ripple="false"
                    @click.prevent="clickReq()"
                    >{{ t("Request Free Access") }}
                  </v-btn>
                </RouterLink>
              </nav>
            </header>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div
      class="position-relative bg-offWhite overflow-hidden marketing-page pb-10"
    >
      <inline-svg src="/centreseal.svg" class="centreseal-pattern-hero" />

      <v-container>
        <v-row class="mt-5">
          <v-col cols="12">
            <div class="profile d-flex align-center">
              <div class="mr-4">
                <img src="/nima.png" class="mt-1" />
              </div>
              <div>
                <h4>Nima Tahami</h4>
                <h6>Last Verified on Sep 09th, 2024</h6>
              </div>
            </div>
          </v-col>

          <v-col cols="12 mt-14">
            <section class="d-flex position-relative flex-column flex-lg-row">
              <h5 class="titleAb1">Completed Checks</h5>
              <div
                class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between main-c"
              >
                <inline-svg src="/centreseal.svg" class="centreseal-pattern" />
                <!-- <h5 class="titleAb">Completed Checks</h5> -->
                <div>
                  <div class="mb-2">
                    <div
                      class="d-flex align-center smallInfo justify-space-between"
                    >
                      <div class="d-flex align-center">
                        <img src="/usersmall.svg" alt="" />
                        <h7 class="ml-2">Nima Tahami</h7>
                      </div>
                      <div class="d-flex align-center">
                        <inline-svg src="/dot.svg" />
                        <span class="ml-1 body2 text-verified text-verified-s">
                          Paystub Verified
                        </span>
                      </div>
                    </div>
                  </div>
                  <div><b>Earn: </b>$96,000/year</div>
                  <div class="my-2"><b>Payment: </b> Bi-weekly</div>
                  <div><b>Paystubs Verified on Jul 15, 2024:</b></div>
                  <section class="d-flex">
                    <div class="mt-4 d-flex">
                      <span
                        class="docs-status px-2 py-2 rounded-pill border bg-lightPeriwinkle border-periwinkle font-weight-medium"
                      >
                        March 15, 2024
                      </span>
                    </div>
                    <div class="mt-4 d-flex ml-2">
                      <span
                        class="docs-status px-2 py-2 rounded-pill border bg-lightPeriwinkle border-periwinkle font-weight-medium"
                      >
                        March 24, 2024
                      </span>
                    </div>
                  </section>
                </div>
              </div>
              <section class="d-sm-flex position-relative mt-16 mt-lg-0">
                <div
                  class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between small-card mb-sm-0 mb-4"
                >
                  <h5 class="titleAb">More Info</h5>
                  <div>
                    <img src="/door-closed.svg" />
                    <h5 class="mb-2">Move-In</h5>
                    <div>Oct 1st, 2024</div>
                  </div>
                </div>

                <div
                  class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between small-card mb-sm-0 mb-4"
                >
                  <div>
                    <img src="/paw-outline.svg" />
                    <h5 class="mb-2">Pets</h5>
                    <div>1 Dog</div>
                  </div>
                </div>

                <div
                  class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between small-card mb-sm-0 mb-4"
                >
                  <div>
                    <img src="/group-svgrepo.svg" />
                    <h5 class="mb-2">Family Size</h5>
                    <div>2 Adults</div>
                  </div>
                </div>

                <div
                  class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between small-card"
                >
                  <div>
                    <img src="/car-side.svg" />
                    <h5 class="mb-2">Requires Parking</h5>
                  </div>
                </div>
              </section>
            </section>
          </v-col>
          <v-col cols="12">
            <v-btn
              class="main-btn ml-0 w-sm-auto viewP"
              width="250"
              type="button"
              :ripple="false"
              @click.prevent="clickReq()"
              >View Paystubs
            </v-btn>
          </v-col>

          <v-col cols="12">
            <h5 class="text-blackText">Available Checks</h5>
            <h6 class="text-blackText mt-2 mb-6">
              Request additional checks for Nima to complete in order to meet
              qualification requirements.
            </h6>
            <div class="checks d-md-flex mb-6">
              <div
                class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between"
              >
                <div>
                  <h4 class="text-slateBlue mb-2">ID Check</h4>
                  <div>
                    We'll collect a photo ID and verify it against a face scan.
                  </div>
                </div>
                <div class="d-flex align-center justify-space-between mt-4">
                  <v-btn
                    class="main-btn mt-8"
                    type="button"
                    :ripple="false"
                    @click.prevent="clickReq()"
                  >
                    <span :class="{ 'text-gray body1 ml-6': isIdCard }">{{
                      isIdCard ? "Coming Soon" : "Add"
                    }}</span>
                  </v-btn>
                  <img src="/3DImage2.png" class="dimage" />
                </div>
              </div>
              <div
                class="card-slide mr-4 pa-6 border border-white d-flex flex-column justify-space-between mt-4 mt-md-0"
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
                    @click.prevent="clickReq()"
                  >
                    <span :class="{ 'text-gray body1 ml-6': isCredit }">
                      {{ isCredit ? "Coming Soon" : "Add" }}
                    </span>
                  </v-btn>
                  <img src="/3DImage3.png" class="dimage" />
                </div>
              </div>
            </div>
            <div>
              <h5>
                Looking to Verify other Potential Tenants for Your Properties?
              </h5>
              <v-btn
                class="main-btn mt-4"
                type="button"
                width="250"
                :ripple="false"
                @click.prevent="clickReq()"
              >
                <span class="body1">Request Free Access</span>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="popUp" v-if="openPopUp">
      <div class="py-16 signup-page">
        <v-container>
          <v-row>
            <v-col cols="12" class="py-4">
              <v-form
                class="signup-form position-relative"
                @submit.prevent="submitForm"
              >
                <inline-svg
                  src="/exitPop.svg"
                  class="exitPop"
                  @click="exit()"
                />
                <div
                  class="card-slide mr-4 pa-6 border border-white card-slide-pop"
                >
                  <div class="d-flex flex-column align-center">
                    <h4 class="gradient-text text-left">
                      Request Access to View Full Tenant Profiles on CentrSeal
                    </h4>
                    <p class="mt-2">
                      We're still in beta and rolling out access to a limited
                      number of realtors. Please add your email to request
                      access.
                    </p>
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
                        <inline-svg
                          src="/email.svg"
                          class="prepend-inner-icon"
                        />
                      </template>
                    </v-text-field>
                  </div>

                  <v-btn
                    class="main-btn w-100 d-flex align-center mt-8"
                    type="submit"
                    :ripple="false"
                  >
                    <div
                      class="d-flex align-center justify-space-between w-100"
                    >
                      <span> Request Access</span>
                      <inline-svg src="/arrowRight.svg" class="ml-2" />
                    </div>
                  </v-btn>
                  <!-- <div v-if="submit" class="body1 text-center pt-4">
                    <span class="text-electricBlue">You're on the list!</span>
                    We'll keep you posted!
                  </div> -->
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
.marketing-page {
  min-height: calc(100vh - 57px);
}
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
.stickyNav {
  position: sticky;
  top: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.6) !important;
  backdrop-filter: blur(25px) !important;
}
nav a {
  color: var(--Grey-grey-900, #1d1d1d);
  font-size: 18px;
}
a {
  font-weight: 500 !important;
  text-decoration: none;
}
.main-btn {
  padding: 10px 20px;
  height: 52px !important;
}
.menuDropdown {
  color: var(--Grey-grey-900, #1d1d1d);
  font-size: 18px;
  background-color: transparent;
  box-shadow: none;
  :deep(.v-btn__content) {
    font-weight: 700 !important;
  }
  :deep(.v-btn:hover > .v-btn__overlay) {
    opacity: 0 !important;
  }
}

.profile {
}
.docs-status {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  width: fit-content;
}
.small-card {
  max-width: 180px;
  width: 180px;
  height: 230px;
}
.main-c {
  max-width: 360px;
  width: 360px;
  height: 230px;
  overflow: hidden;
}
.titleAb {
  position: absolute;
  top: -50px;
  left: 0;
}
.titleAb1 {
  position: absolute;
  top: -50px;
  left: 0;
}
.smallInfo h7,
.text-verified-s {
  text-wrap: nowrap;
}
.smallInfo {
  border-bottom: 1px solid #ececec;
  padding-bottom: 10px;
}
.centreseal-pattern {
  position: absolute;
  right: -10%;
  top: -25%;
  opacity: 0.4;
}
.centreseal-pattern-hero {
  position: absolute;
  right: -50px;
  top: -50px;
  opacity: 0.4;
  transform: scale(1.4);
}
.popUp {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.card-slide-pop {
  margin: 0 auto;
}
form {
  margin: 0 auto;
  width: 500px;
  .card-slide-pop {
    width: 500px;
  }
  .main-btn {
    min-height: 52px;
    :deep(.v-btn__content) {
      font-size: 18px;
      width: 100%;
    }
  }
}
.exitPop {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 7;
  cursor: pointer;
}
.viewP {
  border-radius: 8px !important;
  border: 1px solid var(--White-Border, #fff) !important;
  background: linear-gradient(93deg, #595968 0%, #484852 100%) !important;
  box-shadow:
    0px 4px 10px 0px rgba(57, 57, 67, 0.32),
    0px 2px 4px 0px rgba(255, 255, 255, 0.75) inset !important;
}
</style>
