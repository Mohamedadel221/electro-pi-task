<template>
 <div
  class="parent-sidebar bg-[#efefef] h-full pt-1 relative transition-all duration-300  "
  :class="openSidebar ? 'w-20' : 'w-full'"
>
    <!--***************  Open Sidebar button Arrow ***************  -->
  <button
  @click="openSidebar = !openSidebar"
  class="absolute -right-5 top-[50%] bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-gray-100 transition-all z-10"
>
      <Icon
        name="mdi:chevron-left"
        size="20px"
        class="transition-transform duration-300"
        :class="openSidebar ? 'rotate-180' : ''"
      />
    </button>
    <!--***************  Open Sidebar button Arrow ***************  -->
    <div
      class="logo-and-title flex items-center px-4 my-10"
      :class="openSidebar ? 'justify-center' : 'justify-between'"
    >
      <h5 v-if="!openSidebar" class="capitalize">admin panel</h5>
      <logo></logo>
    </div>

    <div v-for="sidebar in sidebarNavigation" :key="sidebar.title">
      <h2 v-if="!openSidebar" class="px-6 font-bold capitalize">
        {{ sidebar.title }}
      </h2>

      <ul class="px-4 py-1">
        <li class="mt-6 mb-6" v-for="item in sidebar.links" :key="item.path">
          <NuxtLink
            class="rounded-md hover:bg-[#ffffff] hover:text-[#000] text-[#000] px-2 py-3 capitalize transition-all duration-300 flex items-center"
            :class="[openSidebar ? 'justify-center' : 'gap-2 hover:ml-[10px]']"
            :to="item.path"
            :title="openSidebar ? item.title : ''"
          >
            <Icon :name="item.icon" size="20px" />
            <span v-if="!openSidebar">{{ item.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SidebarSettings } from "~/types/sidebar";
const openSidebar = useState<boolean>('sidebarOpen', () => false)
const emit = defineEmits<{
  toggle: [value: boolean]
}>();
const sidebarNavigation: SidebarSettings[] = [
  {
    title: "links",
    links: [
      { title: "Home", path: "/", icon: "mdi:home-outline" },
      { title: "About", path: "/", icon: "mdi:information-outline" },
      { title: "Tasks", path: "/", icon: "mdi:clipboard-check-outline" },
      { title: "Support", path: "/", icon: "mdi:clipboard-check-outline" },

      { title: "Policy", path: "/", icon: "mdi:file-document-outline" },
    ],
  },
  {
    title: "More info",
    links: [
      { title: "Notification", path: "/", icon: "mdi:bell-outline" },
      { title: "Reports", path: "/", icon: "mdi:chart-box-outline" },
      { title: "Contact", path: "/", icon: "mdi:account-box-outline" },
      { title: "Settings", path: "/", icon: "mdi:cog-outline" },
    ],
  },
];

</script>

<style lang="scss" scoped>

</style>
