<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
    <input
      v-model="tasksStore.filterTask"
      type="text"
      placeholder="Search by title..."
      class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-[14px] outline-none appearance-none focus:border-[#34c759] transition-all duration-300 bg-[transparent]"
    />

    <select
      v-model="tasksStore.statusFilter"
      class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-[14px] outline-none appearance-none focus:border-[#34c759] transition-all duration-300 bg-[transparent]"
    >
      <option value="All">All Status</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>

    <button
      class="w-full text-red-400"
      v-if="tasksStore.filterTask"
      @click="tasksStore.filterTask = ''"
    >
      Clear
    </button>
  </div>
</template>
<script setup lang="ts">
import { myTasks } from "~/store/tasks";

const tasksStore = myTasks();
</script>
