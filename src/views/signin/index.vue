<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Header from "../../components/Header.vue";
import SigninForm from "./components/SigninForm.vue";

const router = useRouter();

onMounted(async () => {});
</script>

<template>
  <main>
    <Header />
    <div class="position-relative bg-offWhite overflow-hidden">
      <img src="/s1.svg" class="shadowTop" alt="" />
      <img src="/s2.svg" class="shadowTop" alt="" />
      <img src="/s1.svg" class="shadowBottom" alt="" />
      <img src="/s2.svg" class="shadowBottom" alt="" />
      <SigninForm />
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
</style>
