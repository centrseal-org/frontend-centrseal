import httpHelper from "@/helpers/httpHelpers";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const user = ref(null);
    const errorMessage = ref("");

    const setUser = (newUser: any) => {
      user.value = newUser;
    };

    const $reset = () => {
      user.value = null;
    };

    return {
      user,
      errorMessage,
      setUser,
      $reset,
    };
  },
  {
    persist: true,
  }
);
