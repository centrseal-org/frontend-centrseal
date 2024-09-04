<script setup lang="ts">
import { useRouter } from "vue-router";
import { truncate } from "../../../helpers/truncate";

defineProps({
  transactions: {
    type: Array as () => Array<any>,
    required: true,
  },
  files: {
    type: Array as () => Array<any>,
    required: true,
  },
});

const router = useRouter();

const submit = () => {
  console.log("submit");
  router.push("/tenant/verify");
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <section>
        <h5 class="text-electricBlue">You're All Set to Get Verified!</h5>
        <div class="body2 mt-2">
          <span> Please check we have the right info here. </span>
        </div>
      </section>
    </v-col>
    <v-col cols="12">
      <div class="listFiles">
        <ul>
          <li
            v-for="file in files"
            :key="file.file.name"
            class="pa-2 px-4 rounded-lg my-4 d-flex align-center justify-space-between"
          >
            <section class="d-flex align-center">
              <inline-svg src="/pdf.svg" class="mr-4" />
              <div>
                <div>{{ truncate(file.file.name, 40) }}</div>
                <div class="d-flex align-center">
                  <span class="text-lightGray body3">
                    {{ (file.file.size / 1024).toFixed(2) }} KB
                  </span>
                </div>
                <v-progress-linear
                  v-if="!file.uploaded"
                  color="indigo"
                  :model-value="file.progress"
                  rounded
                  height="5"
                  class="mt-2"
                ></v-progress-linear>
              </div>
            </section>
          </li>
          <li
            class="pa-2 px-4 rounded-lg my-4 d-flex align-center justify-space-between"
          >
            <section class="d-flex align-center">
              <inline-svg src="/bank.svg" class="mr-4" />
              <div>
                <div>CIBC Chequing ••••2124</div>
                <div class="d-flex align-center">
                  <span class="text-lightGray body3"> Connected </span>
                </div>
              </div>
            </section>
          </li>
        </ul>
      </div>
    </v-col>
    <v-col cols="12">
      <button
        class="main-btn submit text-white py-3 px-4 d-flex align-center justify-space-between"
        type="button"
        @click="submit"
      >
        <span class="font-weight-medium">Submit</span>
        <inline-svg src="/arrowRight.svg" />
      </button>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.listFiles {
  ul {
    list-style-type: none;
    li {
      background: white;
      max-width: 600px;
      .completedSign {
        background: #3ebf8f;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        &.loading {
          background-color: transparent;
        }
      }
    }
  }
}
.main-btn.submit {
  max-width: 600px !important;
  width: 100%;
}
</style>
