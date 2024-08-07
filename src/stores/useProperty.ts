import { defineStore } from "pinia";

export const usePropertyStore = defineStore("property", {
  state: () => ({
    image: null as File | null,
    address: "",
  }),
  actions: {
    setImage(image: File) {
      this.image = image;
    },
    setAddress(address: string) {
      this.address = address;
      console.log(this.address, "this.address");
    },
    async submitProperty() {
      // Replace with your backend API endpoint
      const endpoint = "https://your-backend.com/api/properties";

      const formData = new FormData();
      if (this.image) {
        formData.append("image", this.image);
      }
      formData.append("address", this.address);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to submit property");
        }

        const data = await response.json();
        // Handle successful response (e.g., clear store, show success message)
        console.log("Property submitted successfully:", data);
      } catch (error) {
        // Handle error (e.g., show error message)
        console.error("Error submitting property:", error);
      }
    },
  },
});
