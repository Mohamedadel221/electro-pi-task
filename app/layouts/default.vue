<template>
  <div class="flex">
    <div
      class="transition-all duration-300 shrink-0"
      :class="openSidebar ? 'w-20' : 'w-[50%] md:w-[16.6667%]'"
    ></div>

    <aside
      class="transition-all duration-300 shrink-0 fixed top-0 left-0 h-screen z-40"
      :class="openSidebar ? 'w-20' : 'w-[50%] md:w-[16.6667%]'"
    >
      <Sidebar />
    </aside>

    <div class="flex flex-col flex-1 min-w-0 transition-all duration-300">
      <Appnav />
      <main class="flex-1 min-w-0 pt-[60px] md:pt-[100px]">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const openSidebar = useState<boolean>("sidebarOpen", () => true);
</script>
