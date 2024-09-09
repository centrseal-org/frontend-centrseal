// stores/verificationStore.ts
import { defineStore } from "pinia";

export const useVerificationStore = defineStore("verification", {
  state: () => ({
    transactions: [] as Array<any>,
    files: [] as Array<any>,
  }),
  actions: {
    setTransactions(transactions: Array<any>) {
      this.transactions = transactions;
    },
    setFiles(files: Array<any>) {
      this.files = files;
    },
  },
});
