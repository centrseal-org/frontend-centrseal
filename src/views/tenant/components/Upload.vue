<script setup lang="ts">
import { ref } from "vue";
import { truncate } from "../../../helpers/truncate";

const message = ref<string>("");

const uploadedFiles = ref<
  { file: File; uploaded: boolean; progress: number }[]
>([]);
const isUploading = ref(false);
const maxFiles = 2;
const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];
const maxFileSize = 2 * 1024 * 1024; // 2 MB

/* Upload files */
const handleFiles = async (files: FileList) => {
  if (files.length + uploadedFiles.value.length > maxFiles) {
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
    message.value = "";
    isUploading.value = true;
    uploadedFiles.value = [
      ...uploadedFiles.value,
      { file, uploaded: false, progress: 0 },
    ];
    // try {
    //   uploadedFiles.value = [
    //     ...uploadedFiles.value,
    //     { file, uploaded: false, progress: 0 },
    //   ];
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   // Create a progress event listener
    //   const onProgress = (event: AxiosProgressEvent) => {
    //     if (event.lengthComputable && event.total !== undefined) {
    //       const progress = Math.round((event.loaded / event.total) * 100);
    //       uploadedFiles.value = uploadedFiles.value.map((fileWrapper) =>
    //         fileWrapper.file === file
    //           ? { ...fileWrapper, progress }
    //           : fileWrapper
    //       );
    //     }
    //   };
    //   await httpHelper.post("/files/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     onUploadProgress: onProgress,
    //   });
    //   // Update the specific file's upload status
    //   uploadedFiles.value = uploadedFiles.value.map((fileWrapper) =>
    //     fileWrapper.file === file
    //       ? { ...fileWrapper, uploaded: true, progress: 100 }
    //       : fileWrapper
    //   );
    // } catch (error) {
    //   console.error("Error uploading files:", error);
    //   message.value = "Error uploading files. Please try again.";
    // } finally {
    //   isUploading.value = false;
    // }

    uploadedFiles.value = uploadedFiles.value.map((fileWrapper) =>
      fileWrapper.file === file
        ? { ...fileWrapper, uploaded: true, progress: 100 }
        : fileWrapper
    );
    isUploading.value = false;
  }
};
const onDrop = (e: DragEvent) => {
  e.preventDefault();
  if (e.dataTransfer?.files) {
    handleFiles(e.dataTransfer.files);
  }
};
const onDragOver = (e: DragEvent) => {
  e.preventDefault();
};
/* Delete file */
const deleteFile = async (file: File) => {
  message.value = "";
  uploadedFiles.value = uploadedFiles.value.filter(
    (fileWrapper) => fileWrapper.file.name !== file.name
  );
  // try {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   // Delete the file from the server
  //   await httpHelper.delete(`/user/delete/${formData}`);
  //   // Remove the file from the local state
  //   uploadedFiles.value = uploadedFiles.value.filter(
  //     (fileWrapper) => fileWrapper.file.name !== file.fileName
  //   );
  // } catch (error) {
  //   console.error("Error deleting file:", error);
  //   message.value = "Error deleting file. Please try again.";
  // }
};

const emit = defineEmits(["uploadedFiles"]);
const next = () => {
  if (uploadedFiles.value.length !== 2) {
    `You can only upload up to ${maxFiles} files.`;
    return;
  }
  // Emit events to the parent component
  emit("uploadedFiles", uploadedFiles.value);
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <section>
        <h5 class="text-electricBlue">Upload Last 2 Paystubs</h5>
        <div class="body2 mt-2">
          <span>
            Please upload your last 2 paystubs that you've received from your
            employer. We'll use it to verify your income.
          </span>
        </div>
        <section
          class="uploadArea mt-6"
          @dragover="onDragOver"
          @drop="onDrop"
          @click="($refs.fileInput as any).click()"
          v-if="uploadedFiles.length < 2"
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
            <p class="body1 mb-2">Choose a file or drag & drop it here</p>
            <p class="body3 mb-4 text-lightGray">
              PDF, JPEG, PNG, formats, up to 2MB
            </p>
            <button
              class="main-btn text-white py-3 px-6 font-weight-medium"
              :disabled="isUploading"
            >
              Upload Files
            </button>
          </div>
        </section>
        <div class="listFiles">
          <ul>
            <li
              v-for="fileWrapper in uploadedFiles"
              :key="fileWrapper.file.name"
              class="pa-2 px-4 rounded-lg my-4 d-flex align-center justify-space-between"
            >
              <section class="d-flex align-center">
                <inline-svg src="/pdf.svg" class="mr-4" />
                <div>
                  <div>1 {{ truncate(fileWrapper.file.name, 40) }}</div>
                  <div class="d-flex align-center">
                    <span class="text-lightGray body3">
                      {{ (fileWrapper.file.size / 1024).toFixed(2) }} KB
                      <!-- of
                            {{ (fileWrapper.file.size / 1024).toFixed(2) }} KB
                            &#x2022; -->
                    </span>
                    <!-- <span
                            class="completedSign d-flex align-center justify-center mx-2"
                            :class="{ loading: !fileWrapper.uploaded }"
                          >
                            <inline-svg
                              :src="
                                fileWrapper.uploaded
                                  ? '/complete.svg'
                                  : '/loading.svg'
                              "
                            />
                          </span>
                          <span>
                            {{
                              fileWrapper.uploaded ? "Completed" : "Uploading"
                            }}
                          </span> -->
                  </div>
                  <v-progress-linear
                    v-if="!fileWrapper.uploaded"
                    color="indigo"
                    :model-value="fileWrapper.progress"
                    rounded
                    height="5"
                    class="mt-2"
                  ></v-progress-linear>
                </div>
              </section>
              <inline-svg
                src="/bin.svg"
                class="mr-4 cursor-pointer"
                @click="() => deleteFile(fileWrapper.file)"
              />
            </li>
          </ul>
        </div>
      </section>
    </v-col>
    <v-col cols="12" class="pt-0" v-if="uploadedFiles.length === 2">
      <button
        class="main-btn next text-white py-3 px-4 d-flex align-center justify-space-between"
        type="button"
        @click="next()"
      >
        <span class="font-weight-medium">Next</span>
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
  cursor: pointer;
  max-width: 600px;
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
