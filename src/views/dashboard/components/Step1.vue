<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";

const props = defineProps<{
  user: any;
}>();

const isUploading = ref(false);
const uploadedFiles = ref<any>([]);
const fileInput = ref<HTMLInputElement | null>(null);
const propertyAddress = ref();
const addressSuggestions = ref<any[]>([]);

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = async (event: DragEvent) => {
  event.preventDefault();
  const files = event.dataTransfer?.files;
  if (files) {
    handleFileSelect({ target: { files } } as any);
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files) {
    const fileArray = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));
    uploadedFiles.value = fileArray;
  }
};

const triggerUpload = () => {
  fileInput.value?.click();
};

const sendFiles = async () => {
  isUploading.value = true;
  try {
    const formData = new FormData();
    uploadedFiles.value.forEach(({ file }) => {
      console.log(file, "filefile");
      formData.append("files", file);
    });

    console.log(formData);
    // const response = await httpHelper.post("upload", formData);
    // console.log("Files sent successfully:", response);
    // uploadedFiles.value = []; // Clear the files after sending
  } catch (error) {
    console.error("Error sending files:", error);
  } finally {
    isUploading.value = false;
  }
};

// Function to fetch address suggestions from Geoapify
const fetchAddressSuggestions = async (query: string) => {
  if (query.length < 3) {
    addressSuggestions.value = [];
    return;
  }

  const apiKey = "e0ce9f3ec874464abe49c4a64a7195d8";
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${apiKey}`;
  try {
    const response = await axios.get(url);
    addressSuggestions.value = response.data.features.map((feature: any) => ({
      address: feature.properties.formatted,
      coordinates: feature.geometry.coordinates,
      data: feature,
    }));
  } catch (error) {
    console.error("Error fetching address suggestions:", error);
  }
};

// Watch propertyAddress and fetch suggestions
// watch(propertyAddress, (newAddress) => {
//   console.log("1");
//   fetchAddressSuggestions(newAddress);
// });

const onConditionChange = (newAddress: any) => {
  console.log("111");
  fetchAddressSuggestions(newAddress);
};

// Emit events to the parent component
const emit = defineEmits(["updatePropertyInfo"]);
emit("updatePropertyInfo", { propertyAddress, uploadedFiles });
</script>

<template>
  <h4 class="text-blackText">Hey, {{ props.user.firstName }}! 😁</h4>
  <h6 class="text-blackText mt-2">
    Welcome! Let's add your first property
    <span class="text-gray">(it takes 30 seconds).</span>
  </h6>
  <div class="upload-container pa-10 my-8">
    <div
      @dragover.prevent="handleDragOver"
      @drop.prevent="handleDrop"
      @click="triggerUpload"
      class="d-flex flex-column align-center"
    >
      <img src="/uploadfile.png" v-if="uploadedFiles.length === 0" />
      <div v-if="uploadedFiles.length > 0" class="preview">
        <span v-for="(file, index) in uploadedFiles" :key="index">
          <img :src="file.url" :alt="file.name" class="preview-image" />
        </span>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        @change="handleFileSelect"
        style="display: none"
      />
      <div v-if="isUploading" class="loading-message">Uploading...</div>
      <div v-else class="text-center">
        <p>Drag & Drop a Nice Property Photo or</p>
        <button class="font-weight-bold mt-2">Click to Upload</button>
      </div>
    </div>
  </div>

  <div class="propertyStreet">
    <label class="body2 text-gray">Property Street Address</label>
    <!-- <v-text-field
      id="autocomplete"
      hide-details="auto"
      type="text"
      class="text-input my-2"
      variant="solo"
      density="compact"
      placeholder="21 Park Ln Cir."
      v-model="propertyAddress"
    /> -->
    <v-autocomplete
      v-model="propertyAddress"
      @update:search="onConditionChange"
      :items="addressSuggestions"
      item-text="address"
      item-value="data"
      item-title="address"
      variant="solo"
      density="compact"
      placeholder="21 Park Ln Cir."
      hide-details="auto"
      class="mt-2"
      return-object
    >
    </v-autocomplete>

    <!-- <v-autocomplete
      label="Autocomplete"
      :items="suggestions"
      id="autocomplete"
      v-model="propertyAddress"
    ></v-autocomplete> -->
  </div>
  <div class="progressBar d-flex align-center mt-6 mb-2">
    <v-progress-linear
      color="dark-blue"
      model-value="33.3"
      :height="14"
      rounded
    ></v-progress-linear>
    <span class="ml-2 body1">Step 1/3</span>
  </div>
</template>

<style scoped lang="scss">
.propertyStreet {
  max-width: 450px;
}
.upload-container {
  max-width: 450px;
  border-radius: 8px;
  border: 1px solid var(--Blue-blue-100, #b8b7ff);
  background: linear-gradient(246deg, #e8e8f2 0%, #dddde8 100%);
}
.preview-image {
  max-width: 200px;
  margin-right: 10px;
}

.progressBar {
  .v-progress-linear {
    width: 48px;
    background-color: #c5c5c5;
  }
  :deep(.v-progress-linear__determinate) {
    border-radius: 0 50px 50px 0;
    background-color: #6a6a6a;
  }
}
:deep(.v-field__append-inner) {
  display: none !important;
}
</style>
