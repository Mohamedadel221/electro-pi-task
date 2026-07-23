<template>
  <header
    class="transition-all duration-300 px-6 bg-white h-[60px] md:h-[100px] fixed top-0 right-0 z-30"
    :class="openSidebar ? 'left-20' : 'left-[50%] md:left-[16.6667%]'"
  >
    <div class="grid grid-cols-12 h-full items-center">
      <div class="col-span-8 flex justify-start md:justify-start">
        <Navigation />
      </div>
      <div class="col-span-4 flex justify-end md:justify-end">
        <Logo />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const openSidebar = useState<boolean>("sidebarOpen", () => true);
</script>




