<!--
Summary: Index of the FAQ page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the faq component.
@author Kasra Jannati
-->
<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>

<template>
  <main>
    <Header />
    <div class="position-relative bg-offWhite overflow-hidden faq-page">
      <v-container class="pb-16">
        <v-row>
          <v-col cols="12">
            <section class="my-4">
              <h4 class="font-weight-medium">Frequently Asked Questions</h4>
            </section>
            <section>
              <v-expansion-panels elevation="0">
                <v-expansion-panel rounded="lg">
                  <v-expansion-panel-title disable-icon-rotate>
                    <span class="body2">Question 1</span>
                    <template v-slot:actions="{ expanded }">
                      <inline-svg
                        src="/arrowTop.svg"
                        class="append-inner-icon cursor-pointer"
                        v-if="expanded"
                      />
                      <inline-svg
                        src="/arrowBottom.svg"
                        class="append-inner-icon cursor-pointer"
                        v-else
                      />
                    </template>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel rounded="lg">
                  <v-expansion-panel-title disable-icon-rotate>
                    <span class="body2">Question 2</span>
                    <template v-slot:actions="{ expanded }">
                      <inline-svg
                        src="/arrowTop.svg"
                        class="append-inner-icon cursor-pointer"
                        v-if="expanded"
                      />
                      <inline-svg
                        src="/arrowBottom.svg"
                        class="append-inner-icon cursor-pointer"
                        v-else
                      />
                    </template>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel rounded="lg">
                  <v-expansion-panel-title disable-icon-rotate>
                    <span class="body2"> Question 3 </span>
                    <template v-slot:actions="{ expanded }">
                      <inline-svg
                        src="/arrowTop.svg"
                        class="append-inner-icon cursor-pointer"
                        v-if="expanded"
                      />
                      <inline-svg
                        src="/arrowBottom.svg"
                        class="append-inner-icon cursor-pointer"
                        v-else
                      />
                    </template>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel rounded="lg">
                  <v-expansion-panel-title disable-icon-rotate>
                    <span class="body2"> Question 4 </span>
                    <template v-slot:actions="{ expanded }">
                      <inline-svg
                        src="/arrowTop.svg"
                        class="append-inner-icon cursor-pointer"
                        v-if="expanded"
                      />
                      <inline-svg
                        src="/arrowBottom.svg"
                        class="append-inner-icon cursor-pointer"
                        v-else
                      />
                    </template>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel rounded="lg">
                  <v-expansion-panel-title disable-icon-rotate>
                    <span class="body2"> Question 5 </span>
                    <template v-slot:actions="{ expanded }">
                      <inline-svg
                        src="/arrowTop.svg"
                        class="append-inner-icon cursor-pointer"
                        v-if="expanded"
                      />
                      <inline-svg
                        src="/arrowBottom.svg"
                        class="append-inner-icon cursor-pointer"
                        v-else
                      />
                    </template>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </section>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </main>
</template>

<style scoped lang="scss">
.faq-page {
  min-height: calc(100vh - 57px);
}
</style>
