<!--
Summary: Display the paystub card component
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the PaystubCard component.
@author Kasra Jannati
-->
<script setup lang="ts">
import { type PropType } from "vue";
import { useFormattedDate } from "@/composables/useFormattedDate";

type Status = "unverified" | "verified" | "waitingOn" | "basic";
type Paystub = {
  preSignedUrl: string;
  paystubDate: string;
};

const props = defineProps({
  fullname: {
    type: String,
    required: true,
  },
  earn: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  status: {
    type: String as PropType<Status>,
    required: true,
  },
  /**
   * ISO 8601 date-time format for the status date, e.g., "2024-09-23T15:23:25.493Z".
   * Represents the date when the paystub verification status was updated.
   */
  statusDate: {
    type: String,
    required: true,
  },
  paystubs: {
    type: Array as PropType<Paystub[]>,
    required: false,
  },
});

const { formatDate } = useFormattedDate();

const openFile = async (url: string) => window.open(url, "_blank");
</script>

<template>
  <div class="verify-card pa-6 border border-white">
    <inline-svg
      src="/centreseal.svg"
      class="centreseal-pattern"
      v-if="props.status === 'verified' || props.status === 'basic'"
      v-intersect="'animate__fadeInDown'"
    />
    <div>
      <div class="mb-2">
        <div
          class="d-flex align-center verify-card-separator justify-space-between"
        >
          <div class="d-flex align-center">
            <img src="/usersmall.svg" alt="" />
            <h7 class="ml-2">{{ props.fullname }}</h7>
          </div>
          <div class="d-flex align-center">
            <inline-svg
              :src="
                props.status === 'verified'
                  ? '/dot.svg'
                  : props.status === 'unverified'
                    ? '/dot-red.svg'
                    : '/dot-gray.svg'
              "
              v-intersect="
                props.status === 'verified' ? 'animate__fadeInDown' : null
              "
            />
            <span
              class="ml-1 body2"
              :class="
                props.status === 'verified'
                  ? 'text-verified'
                  : props.status === 'unverified'
                    ? 'text-warning'
                    : 'text-gray'
              "
              v-intersect="
                props.status === 'verified' ? 'animate__fadeInDown' : null
              "
            >
              {{
                props.status === "verified"
                  ? "Paystub Verified"
                  : props.status === "unverified"
                    ? "Unverified"
                    : "Waiting On"
              }}
            </span>
          </div>
        </div>
      </div>
      <div class="my-2">
        <span class="font-weight-medium">Earn: </span>
        <span v-if="props.status !== 'basic'">{{ props.earn }}</span>
        <span class="basic-style" v-if="props.status === 'basic'"></span>
      </div>
      <div class="my-2" v-if="props.status !== 'waitingOn'">
        <span class="font-weight-medium">Payment: </span>
        <span v-if="props.status !== 'basic'"> {{ props.period }}</span>
        <span class="basic-style" v-if="props.status === 'basic'"></span>
      </div>
      <div v-if="props.status !== 'basic'">
        <span class="font-weight-medium">
          {{
            props.status === "verified"
              ? "Paystubs Verified on"
              : props.status === "unverified"
                ? "Verification Failed on"
                : "Signed up on"
          }}
          {{ formatDate(props.statusDate) }}
          {{ props.status !== "waitingOn" ? ":" : "" }}
        </span>
      </div>
      <section class="mt-4 d-flex justify-space-between">
        <span
          v-if="props.paystubs"
          class="docs-status pa-2 mr-6 rounded-pill border bg-lightPeriwinkle border-periwinkle font-weight-medium cursor-pointer"
          @click="openFile(props.paystubs[0].preSignedUrl)"
        >
          {{ props.paystubs[0].paystubDate }}
        </span>

        <span
          v-if="props.paystubs"
          class="docs-status pa-2 rounded-pill border bg-lightPeriwinkle border-periwinkle font-weight-medium cursor-pointer"
          @click="openFile(props.paystubs[1].preSignedUrl)"
        >
          {{ props.paystubs[1].paystubDate }}
        </span>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.verify-card {
  background: rgba(var(--v-theme-white), 0.75) !important;
  border-radius: 12px !important;
  backdrop-filter: blur(10px);
  max-width: 360px;
  width: 360px;
  height: 230px;
  overflow: hidden;
  .verify-card-separator {
    border-bottom: 1px solid #ececec;
    padding-bottom: 10px;
  }
  .docs-status {
    font-size: 14px;
    width: 100%;
    text-align: center;
  }
  .centreseal-pattern {
    position: absolute;
    right: -10%;
    top: -25%;
    opacity: 0.4 !important;
  }
  .basic-style {
    width: 65px;
    height: 19px;
    display: inline-block;
    background: #e8e8ff;
    border-radius: 50px;
    top: 4px;
    position: relative;
  }
}
</style>
