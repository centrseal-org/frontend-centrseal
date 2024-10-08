import httpHelper from "@/helpers/httpHelpers";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const user: any = ref(null);
    const errorMessage = ref("");

    const setUser = (newUser: any) => {
      user.value = newUser;
    };

    const $reset = () => {
      console.log(user.value, "123123");
      user.value = null;
      console.log(user.value, "123123");
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
