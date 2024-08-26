import httpHelper from "@/helpers/httpHelpers";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePropertyStore = defineStore("propertyStore", () => {
  const properties = ref<any[]>([]);
  const errorMessage = ref("");

  const setProperties = (newProperties: any[]) => {
    properties.value = newProperties;
  };

  const fetchProperties = async () => {
    try {
      const response: any = await httpHelper.get("property/user-properties");
      if (response.code === 200 && response.data) {
        setProperties(response.data);
      } else {
        errorMessage.value =
          response.error?.message || "Failed to fetch user profile.";
      }
    } catch (error) {
      errorMessage.value = "An error occurred while fetching user profile.";
    }
  };

  const $reset = () => {
    properties.value = [];
  };

  return {
    properties,
    errorMessage,
    setProperties,
    fetchProperties,
    $reset,
  };
});
