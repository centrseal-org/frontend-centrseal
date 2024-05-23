<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div class="bg-lightPurple py-5">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h3>{{ t("Join the Waitlist") }}</h3>
          <span>{{
            t(
              "We'll let you know once we launch and occasionally send updates (no spam, pinky promise)"
            )
          }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="d-flex align-center jus">
          <v-text-field
            hide-details="auto"
            label="Email address"
            placeholder="johndoe@gmail.com"
            type="email"
            class="join-input"
            variant="solo"
          />
          <v-btn class="main-btn ml-4">{{ t("Join the Waitlist") }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped lang="scss">
.join-input {
  border-radius: 8px;
  border: 1px solid #c7c7c7;
  background: #fff;
  backdrop-filter: blur(10px);
}
</style>
