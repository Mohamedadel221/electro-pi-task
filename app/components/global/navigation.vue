<template>
  <div class="navigation relative">
    <!-- *********** Mobile Button  *********** -->
    <button class="md:hidden" @click="isOpen = true">
      <Icon name="mdi-menu" size="16px" />
    </button>

    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-40 md:hidden"
      @click="isOpen = false"
    ></div>

    <nav
      :class="[
        'fixed top-0 right-0 h-full w-[280px] bg-white z-50 p-6 transition-transform duration-300',
        'md:static md:w-auto md:h-auto md:p-0 md:bg-transparent md:translate-x-0',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <!-- ***********  Close Button Mobile ***********  -->
      <div class="flex justify-end">
        <button
          class="md:hidden capitalize text-red-500 text-md mb-8"
          @click="isOpen = false"
        >
          close
        </button>
      </div>
      <ul class="flex flex-col gap-6 md:flex-row md:gap-10">
        <li v-for="(pages, i) in navigationPage" :key="i">
          <NuxtLink
            :to="pages.path"
            class="capitalize text-[16px] lg:text-[16px]  font-bold"
            @click="isOpen = false"
          >
            {{ pages.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { Navigation } from "~/types/navigation";

const isOpen = ref(false);

const navigationPage = ref<Navigation[]>([
  {
    title: "home",
    path: "/",
  },
  {
    title: "about",
    path: "/",
  },
  {
    title: "contact",
    path: "",
  },
  {
    title: "check in",
    path: "/",
  },
  {
    title: "privacy policy",
    path: "/",
  },
]);
</script>
