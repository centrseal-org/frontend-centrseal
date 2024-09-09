<script setup lang="ts">
import { ref, onMounted } from "vue";
import Player from "@vimeo/player";

const iframeRef = ref<HTMLIFrameElement | null>(null);
const isPlaying = ref(false); // To track if the video is playing
let player: Player | null = null;

// Toggle play/pause state
const togglePlayPause = async () => {
  if (player) {
    if (isPlaying.value) {
      try {
        await player.pause(); // Pause the video
        isPlaying.value = false; // Update the state after pausing
      } catch (error) {
        console.error("Error pausing the video:", error);
      }
    } else {
      try {
        await player.play(); // Play the video
        isPlaying.value = true; // Update the state after playing
      } catch (error) {
        console.error("Error playing the video:", error);
      }
    }
  }
};

// Initialize the Vimeo player and set up event listeners
onMounted(() => {
  if (iframeRef.value) {
    player = new Player(iframeRef.value);

    player.on("play", () => {
      isPlaying.value = true;
    });

    player.on("pause", () => {
      isPlaying.value = false;
    });

    // Handle errors
    player.on("error", (error) => {
      console.error("Vimeo Player Error:", error);
    });
  }
});
</script>

<template>
  <v-container class="py-16">
    <div v-intersect="'animate__fadeInUp'">
      <v-row class="mb-12">
        <v-col cols="12">
          <h2 class="text-center mb-6 gradient-text">Here’s How it Works</h2>
        </v-col>
        <v-col cols="12">
          <div class="videoSection">
            <iframe
              ref="iframeRef"
              src="https://player.vimeo.com/video/1007296291?autoplay=0&amp;loop=0&amp;autopause=0&amp;controls=0"
              width="1040"
              height="760"
              frameborder="0"
              style="margin: 0 auto"
            ></iframe>

            <!-- Transparent overlay to handle clicks -->
            <div class="videoOverlay" @click="togglePlayPause"></div>
            <!-- Play button will be hidden if the video is playing -->
            <button
              v-if="!isPlaying"
              class="playButton"
              @click="togglePlayPause"
            >
              <inline-svg src="/playBtn.svg" />
            </button>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.videoSection {
  position: relative;
  display: flex;

  .playButton {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 113px;
    height: 113px;
    border-radius: 100%;
    border: 2px solid #7b78ff;
    background-color: rgba(27, 22, 255, 0.1);
    backdrop-filter: blur(25px);
    svg {
      position: absolute;
      top: 50%;
      left: 53%;
      transform: translate(-50%, -50%);
    }
  }

  .videoOverlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0); /* Transparent background */
    cursor: pointer; /* Show pointer cursor */
  }
}
@media (max-width: 1500px) {
  .videoSection iframe {
    height: 500px;
  }
}
@media (max-width: 600px) {
  .videoSection iframe {
    height: 300px;
  }
}
</style>
