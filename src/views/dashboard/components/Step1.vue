<script setup lang="ts">
import { computed, ref, watch } from "vue";
import axios from "axios";
import { usePropertyStore } from "@/stores/useProperty";
import { useUserStore } from "@/stores/useUser";

const props = defineProps({
  property: {
    type: Object,
    required: true,
  },
});

const isUploading = ref(false);
const uploadedFiles = ref<any>(props.property.image || []);
const fileInput = ref<HTMLInputElement | null>(null);
const propertyAddress = ref(props.property.address);
const addressSuggestions = ref<any[]>([]);

/* Store */
const propertyStore = usePropertyStore();
const properties = computed(() => propertyStore.properties);
const userStore = useUserStore();
const user: any = computed(() => userStore.user);

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

// Function to fetch address suggestions from Geoapify
// TODO: change API key in prodcut
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

const onConditionChange = (newAddress: any) => {
  fetchAddressSuggestions(newAddress);
};

const removeFile = () => {
  uploadedFiles.value = [];
};

// Emit events to the parent component
const emit = defineEmits(["updatePropertyInfo"]);
emit("updatePropertyInfo", { propertyAddress, uploadedFiles });
</script>

<template>
  <h4 class="text-blackText">Hey, {{ user?.firstName }}! 😁</h4>
  <h6 class="text-blackText mt-2">
    <span v-if="properties.length"> Let's add a property </span>
    <span v-else> Welcome! Let's add your first property </span>
    <span class="text-gray">(it takes 30 seconds).</span>
  </h6>
  <div
    class="upload-container my-8 position-relative"
    :class="uploadedFiles.length > 0 ? 'pa-2' : 'pa-10'"
  >
    <div
      @dragover.prevent="handleDragOver"
      @drop.prevent="handleDrop"
      @click="triggerUpload"
      class="d-flex flex-column align-center"
    >
      <img src="/uploadfile.png" v-if="uploadedFiles.length === 0" />
      <div v-if="uploadedFiles.length > 0" class="preview">
        <span
          v-for="(file, index) in uploadedFiles"
          :key="index"
          class="d-flex"
        >
          <img
            :src="file.file.location"
            class="preview-image"
            v-if="file.file.location"
          />
          <img :src="file.url" class="preview-image" v-else />
        </span>
      </div>
      <span v-if="uploadedFiles.length === 0">
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
      </span>
    </div>
    <div
      class="removeBtn"
      @click="removeFile()"
      v-if="uploadedFiles.length > 0"
    >
      <inline-svg src="/trash.svg" />
      <span> Remove </span>
    </div>
  </div>

  <div class="propertyStreet">
    <label class="body2 text-gray">Property Street Address</label>
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
  max-width: 430px;
  width: 430px;
  // margin-right: 10px;

  border-radius: 8px;
  border: 1px solid var(--Blue-blue-300, #6663ff);
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
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
.removeBtn {
  display: flex;
  padding: 4px var(--Body-P-size, 16px);
  justify-content: center;
  align-items: center;
  gap: 4px;
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: var(--Heading-H4-size, 31px);
  background: rgba(5, 4, 33, 0.3);
  backdrop-filter: blur(25px);
  color: #fff;
  cursor: pointer;
}
</style>
