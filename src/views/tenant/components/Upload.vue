<!--
Summary: Display the upload section of the tenant
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the Upload component.
@author Kasra Jannati
-->
<script setup lang="ts">
import { ref } from "vue";
import { truncate } from "@/helpers/truncate";
import { useI18n } from "vue-i18n";
import httpHelper from "@/helpers/httpHelpers";
import { useFileToBase64 } from "@/composables/useFileToBase64";
import { usePdfToImg } from "@/composables/usePdfToImg";

const props = defineProps({
  property: {
    required: false,
  },
});

const { t } = useI18n();
const emit = defineEmits(["paystubs"]);
const { convertToBase64 } = useFileToBase64();
const { convertPdfToImage } = usePdfToImg();
const message = ref<string>("");
const maxFiles = 2;
const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];
const maxFileSize = 2 * 1024 * 1024; // 2 MB
const paystubs = ref<
  {
    file: File;
    uploaded: boolean;
    progress: number;
    paystub: any;
  }[]
>([]);

const onDrop = (e: DragEvent) => {
  e.preventDefault();
  if (e.dataTransfer?.files) {
    handleFiles(e.dataTransfer.files);
  }
};

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
};

const deleteFile = async (file: File) => {
  // message.value = "";
  paystubs.value = paystubs.value.filter((ps) => ps.file.name !== file.name);
};

/* Upload files */
const handleFiles = async (files: FileList) => {
  if (files.length + paystubs.value.length > maxFiles) {
    message.value = `You can only upload up to ${maxFiles} files.`;
    return;
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // Check file type
    if (!allowedFileTypes.includes(file.type)) {
      message.value = `Invalid file type. Only PDF, JPEG, and PNG are allowed.`;
      return;
    }
    // Check file size
    if (file.size > maxFileSize) {
      message.value = `File size exceeds 2 MB. Please upload a smaller file.`;
      return;
    }
    // Check for duplicate file
    const isDuplicate = paystubs.value.some(
      (fileWrapper) => fileWrapper.file.name === file.name
    );
    if (isDuplicate) {
      message.value = `You already uploaded this file with the name ${file.name}`;
      return;
    }
    // Add file if valid
    paystubs.value = [
      ...paystubs.value,
      {
        file,
        uploaded: false,
        progress: 0,
        paystub: "",
      },
    ];
    // Get index of the added file for updating progress and status
    const currentIndex = paystubs.value.length - 1;
    message.value = "";
    let base64Image: any;
    if (file.type === "application/pdf") {
      base64Image = await convertPdfToImage(file);
    } else {
      base64Image = await convertToBase64(file);
    }
    paystubs.value[currentIndex].progress = 25;
    const openAiResult = await OpenAI(base64Image);
    paystubs.value[currentIndex].progress = 50;
    if (openAiResult) {
      const awsResult = await uploadFilesAWS(file, openAiResult);
      paystubs.value[currentIndex].uploaded = true;
      paystubs.value[currentIndex].progress = 100;
      paystubs.value[currentIndex].paystub = awsResult;
    } else {
      await deleteFile(file);
      message.value = "The image is wrong. Please try with the right image.";
    }
  }
};

const OpenAI = async (base64Image: string) => {
  if (base64Image) {
    try {
      const response = await httpHelper.post("openai/analyze-paystub", {
        base64Image,
      });
      return response.data;
    } catch (error) {
      console.log(error, "error");
    }
  } else {
    console.warn("No file found in object!");
  }
};

const uploadFilesAWS = async (file: File, openAiResult: any): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("property", JSON.stringify(props.property));
  formData.append("openAiResult", JSON.stringify(openAiResult));
  try {
    const response = await httpHelper.post("paystub/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error, "error");
  }
};

const handleNextBtn = () => {
  if (paystubs.value.length !== maxFiles) {
    message.value = `You can only upload up to ${maxFiles} files.`;
    return;
  }
  // Emit events to the parent component
  emit("paystubs", paystubs.value);
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <section>
        <h5 class="text-electricBlue">{{ t("tenant.uploadLast2Paystubs") }}</h5>
        <div class="body2 mt-2">
          <span>
            {{ t("tenant.pleaseUploadYourLast") }}
          </span>
        </div>
        <section
          class="uploadArea mt-6"
          @dragover="onDragOver"
          @drop="onDrop"
          @click="($refs.fileInput as any).click()"
          v-if="paystubs.length < maxFiles"
        >
          <input
            type="file"
            ref="fileInput"
            @change="
              (e) => {
                const input = e.target as HTMLInputElement;
                if (input && input.files) {
                  handleFiles(input.files);
                }
              }
            "
            multiple
            hidden
          />
          <div class="d-flex flex-column align-center">
            <div class="mb-4">
              <inline-svg src="/cloud-add.svg" />
            </div>
            <p class="body1 mb-2">
              {{ t("tenant.chooseAFileOrDragAndDropItHere") }}
            </p>
            <p class="body3 mb-4 text-lightGray">
              {{ t("tenant.pdfJpegPng") }}
            </p>
            <button class="main-btn text-white py-3 px-6 font-weight-medium">
              {{ t("tenant.uploadFiles") }}
            </button>
          </div>
        </section>
        <div class="listFiles">
          <ul>
            <li
              v-for="ps in paystubs"
              :key="ps.file.name"
              class="pa-2 px-4 rounded-lg my-4 d-flex align-center justify-space-between"
            >
              <section class="d-flex align-center">
                <inline-svg src="/pdf.svg" class="mr-4" />
                <div>
                  <div>{{ truncate(ps.file.name, 40) }}</div>
                  <div class="d-flex align-center">
                    <span class="text-lightGray body3">
                      {{ (ps.file.size / 1024).toFixed(2) }}
                      {{ t("tenant.kb") }}
                    </span>
                    <span
                      class="completedSign d-flex align-center justify-center mx-2"
                      :class="{ loading: !ps.uploaded }"
                    >
                      <inline-svg
                        :src="ps.uploaded ? '/complete.svg' : '/loading.svg'"
                      />
                    </span>
                    <span>
                      {{ ps.uploaded ? "Completed" : "Uploading" }}
                    </span>
                  </div>
                  <v-progress-linear
                    v-if="!ps.uploaded"
                    color="indigo"
                    :model-value="ps.progress"
                    rounded
                    height="5"
                    class="mt-2"
                  ></v-progress-linear>
                </div>
              </section>
              <inline-svg
                src="/bin.svg"
                class="mr-4 cursor-pointer"
                @click="() => deleteFile(ps.file)"
              />
            </li>
          </ul>
        </div>
      </section>
    </v-col>
    <v-col
      cols="12"
      class="pt-0"
      v-if="paystubs.length === maxFiles && paystubs.every((ps) => ps.uploaded)"
    >
      <button
        class="main-btn next text-white py-3 px-4 d-flex align-center justify-space-between"
        type="button"
        @click="handleNextBtn()"
      >
        <span class="font-weight-medium">{{ t("tenant.next") }}</span>
        <inline-svg src="/arrowRight.svg" />
      </button>
    </v-col>
    <v-col cols="12" v-if="message" class="pt-0">
      <span class="text-error"> {{ message }}</span>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.uploadArea {
  padding: 20px;
  border: 2px dashed #d3d3d3;
  border-radius: 10px;
  background-color: #ffffff;
  text-align: center;
  max-width: 600px;
  cursor: pointer;
}
.listFiles {
  ul {
    list-style-type: none;
    li {
      background: white;
      max-width: 600px;
      .completedSign {
        background: #3ebf8f;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        &.loading {
          background-color: transparent;
        }
      }
    }
  }
}
.main-btn.next {
  max-width: 600px !important;
  width: 100%;
}
</style>
