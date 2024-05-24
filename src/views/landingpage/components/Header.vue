<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div class="py-5">
    <img src="/s1.svg" class="img1" />
    <img src="/s2.svg" class="img2" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between">
            <span class="logo">CentrSeal</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped lang="scss">
@keyframes move {
  0% {
    left: 0px;
    top: 0px;
  }
  25% {
    left: 100px;
    top: 50px;
  }
  50% {
    left: 200px;
    top: 100px;
  }
  75% {
    left: 250px;
    top: 200px;
  }
  100% {
    left: 0px;
    top: 0px;
  }
}

.img1 {
  position: absolute;

  animation-name: move;
  animation-duration: 10s;

  animation-iteration-count: infinite;
}
.img2 {
  position: absolute;

  animation-name: move;
  animation-duration: 20s;

  animation-iteration-count: infinite;
}
</style>
