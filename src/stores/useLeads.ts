import { defineStore } from "pinia";
import { ref } from "vue";

export const useLeadsStore = defineStore(
  "leadsStore",
  () => {
    const leads: any = ref(null);
    const property: any = ref(null);

    const setLeads = (newLeads: any) => {
      leads.value = newLeads;
    };

    const setProperty = (newProperty: any) => {
      property.value = newProperty;
    };

    return {
      leads,
      property,
      setLeads,
      setProperty,
    };
  },
  {
    persist: true,
  }
);
