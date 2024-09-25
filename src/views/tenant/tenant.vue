<!--
Summary: Index of the tenant page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the tenant component.
@author Kasra Jannati
-->
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/useUser";
import { useI18n } from "vue-i18n";
import { useNavigateTo } from "@/composables/useNavigateTo";
import httpHelper from "@/helpers/httpHelpers";
import Header from "@/components/Header.vue";
import PaystubCard from "@/components/PaystubCard.vue";

const { t } = useI18n();
const { navigateTo } = useNavigateTo();
const userStore = useUserStore();
const user = computed(() => userStore.user);
const isLoading = ref<boolean>(true);
const errorMessage = ref<string | null>(null);
const properties = ref();

const checkStatus = (property: any) => {
  return property.paystubs.find((pa: any) => pa.isVerified === false);
};

onMounted(async () => {
  try {
    const uniqueUrls = userStore.user?.uniqueUrls;
    const userId = userStore.user?.userId;
    try {
      const response = await httpHelper.get("/property/unique-urls", {
        params: { uniqueUrls },
      });
      if (response.data) {
        properties.value = response.data;
      } else {
        console.warn("There is no property for verification");
      }
      // For each property, fetch paystubs and merge them
      for (const property of properties.value) {
        try {
          const paystubs = await httpHelper.get(
            `paystub/user/${userId}/property/${property.propertyId}`
          );
          if (paystubs.data) {
            property.paystubs = paystubs.data;
            const paystubsUrls = property.paystubs.map(
              (pa: any) => pa.documentUrl
            );
            const response: any = await httpHelper.post("paystub/signed-urls", {
              paystubsUrls,
            });
            const preSignedUrls = response.data;
            property.paystubs = property.paystubs.map(
              (pa: any, index: number) => ({
                ...pa,
                preSignedUrl: preSignedUrls[index] || null,
              })
            );
          } else {
            console.warn("There is no paystubs for this user and property");
          }
        } catch (error) {
          console.error(
            `Error fetching paystubs for property ${property.propertyId}:`,
            error
          );
        }
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  } catch (error) {
    errorMessage.value = "Error fetching properties: " + error;
    console.error("Error fetching properties:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main>
    <Header />
    <div class="position-relative bg-offWhite overflow-hidden main-content">
      <v-container>
        <v-row class="mt-4">
          <v-col cols="12">
            <section>
              <h4 class="text-blackText">
                {{
                  t("tenant.hi", {
                    firstName: user?.firstName,
                  })
                }}
              </h4>
              <h6 class="text-blackText mt-2">
                <span>
                  These are the properties you've completed verifications for.
                </span>
              </h6>
            </section>
          </v-col>

          <v-col
            cols="12"
            md="6"
            lg="4"
            v-for="(property, index) in properties"
          >
            <v-col cols="12">
              <section class="d-flex align-center">
                <div class="d-flex mt-10 flex-sm-row flex-column">
                  <img
                    :src="property?.image[0]?.url"
                    class="imageUploaded"
                    v-if="property?.image[0]?.url"
                  />
                  <img src="/uploadfile.png" v-else class="imgProperty" />

                  <div
                    class="d-flex flex-column justify-space-between ml-sm-4 ml-0"
                  >
                    <div>
                      <div class="body1">
                        {{ property.address.data.properties.address_line1 }}
                      </div>
                      <div class="body3 mt-sm-2 mt-0">
                        {{ property.address.data.properties.address_line2 }}
                      </div>
                    </div>
                    <div>
                      <span
                        v-if="property?.paystub"
                        class="px-6 py-2 rounded-pill border bg-successLight border-success d-flex align-center font-weight-medium mt-2 mt-sm-0"
                      >
                        <inline-svg src="/paystub.svg" class="mr-2" />
                        {{ t("tenant.requiresPaystubs") }}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </v-col>
            <v-col cols="12">
              <PaystubCard
                v-if="property?.paystubs"
                :fullname="`${user?.firstName} ${user?.lastName}`"
                earn="-"
                period="-"
                :statusDate="property.paystubs[0].verificationDate"
                :status="checkStatus(property) ? 'unverified' : 'verified'"
                :paystubs="property.paystubs"
              />
              <div
                v-else
                @click="
                  navigateTo(`/tenant/paystub?uniqueUrl=${property.uniqueUrl}`)
                "
              >
                There is no documents!
              </div>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </main>
</template>

<style scoped lang="scss"></style>
