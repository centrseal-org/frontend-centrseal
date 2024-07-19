<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push({ name: "login" });
};
</script>

<template>
  <main>
    <div class="dashboard-header">
      <v-btn class="logout-btn" @click="logout">Logout</v-btn>
    </div>
    <div>Homepage</div>
  </main>
</template>

<style scoped lang="scss">
.dashboard-header {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
}

.logout-btn {
  background-color: #f44336;
  color: white;
}
</style>
