import { defineStore } from "pinia";

export const useVerificationStore = defineStore("verification", {
  state: () => ({
    transactions: [] as Array<any>,
    paystubs: [] as Array<any>,
  }),
  actions: {
    setTransactions(transactions: Array<any>) {
      this.transactions = transactions;
    },
    setPaystubs(paystubs: Array<any>) {
      this.paystubs = paystubs;
    },
  },
});
