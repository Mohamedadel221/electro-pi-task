<template>
  <div class="animate-pulse px-6">
    <div class="flex justify-end mb-8 mt-8">
      <div class="h-10 w-40 bg-gray-200 rounded-lg"></div>
    </div>

    <div class="w-full overflow-x-auto rounded-lg border border-gray-200 mt-5">
      <table class="w-full min-w-[600px]">
        <thead>
          <tr>
            <th v-for="i in 5" :key="i" class="p-4">
              <div class="h-4 w-20 bg-gray-200 rounded mx-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in 8" :key="row" class="border-t border-gray-200">
            <td v-for="col in 5" :key="col" class="p-4">
              <div class="h-4 bg-gray-200 rounded"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts"></script>