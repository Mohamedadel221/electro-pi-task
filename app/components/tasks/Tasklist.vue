<template>
  <!-- ************  sHow Content After Get Data ************ -->
  <Transition name="fade">
    <div
      v-if="tasksStore.successMessage"
      class="fixed top-5 right-5 bg-red-100 text-red px-4 py-2 rounded-lg shadow-md z-[60]"
    >
      <span class="capitalize"> {{ tasksStore.successMessage }}</span>
    </div>
  </Transition>
  <!-- ************  Show Skelton Loading When Get Data ************ -->
  <Skelton v-if="pending || showFakeSkLoading" />

  <div class="px-6" v-else>
    <!-- ************  Show Message When No Content Found ************ -->

    <!-- ************  Show Data When Have Content ************ -->

    <div class="">
      <!-- ************  Add Task Components ************ -->

      <Addtask title="add new task" />

      <!-- ************ Filtertask Components ************ -->

      <Filtertask v-if="tasksStore.tasks.length" />

      <!--******* start table tasklist *********-->

      <div class="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table class="w-full min-w-[600px] table-auto">
          <thead class="bg-gray-100">
            <tr>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
              >
                Title
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
              >
                Description
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
              >
                Status
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
              >
                Due Date
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <!-- **** shhow message when no have any tasks  **** -->
            <tr v-if="tasksStore.tasks.length === 0">
              <td
                colspan="5"
                class="px-4 py-6 text-center text-red-500 capitalize"
              >
                No tasks found.
              </td>
            </tr>
            <!-- *********** Show message when search has no match  ************ -->
            <tr v-else-if="tasksStore.filteredTasks.length === 0">
              <td
                colspan="5"
                class="px-4 py-6 text-center text-red-500 capitalize"
              >
                No match found.
              </td>
            </tr>

            <tr
              v-else
              v-for="task in tasksStore.filteredTasks"
              :key="task.id"
              class="hover:bg-[#FFFFFF] odd:bg-[#FFFFFF] transition-colors"
            >
              <td class="px-4 py-3 text-sm text-gray-900">{{ task.title }}</td>
              <td
                class="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate"
              >
                {{ task.description }}
              </td>
              <td class="px-4 py-3 border-b whitespace-nowrap">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-yellow-100 text-yellow-800': task.status === 'Pending',
                    'bg-blue-100 text-blue-800': task.status === 'In Progress',
                    'bg-green-100 text-green-800': task.status === 'Done',
                  }"
                >
                  {{ task.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                {{ task.dueDate }}
              </td>
              <td class="px-4 py-3 text-sm space-x-2 whitespace-nowrap">
                <button
                  @click="editTask(task)"
                  class="text-green-600 hover:text-green-800 font-medium"
                >
                  <Icon name="mdi-pencil-outline" size="20px" />
                </button>
                <button
                  class="text-red-600 hover:text-red-800 font-medium"
                  @click="tasksStore.deleteTask(task.id)"
                >
                  <Icon name="mdi-delete-outline" size="20px" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--******* end table tasklist *********-->
    </div>
  </div>
</template>

<script setup>
import { myTasks } from "~/store/tasks";
const tasksStore = myTasks();
const { pending } = await useAsyncData("tasks", () => tasksStore.getTasks(), {
  lazy: true,
});

const showFakeSkLoading = ref(true);

setTimeout(() => {
  showFakeSkLoading.value = false;
}, 2500);

const editingTask = useState("editingTask", () => null);
const showAddTasks = useState("showAddTasks", () => false);

function editTask(task) {
  editingTask.value = task;
  showAddTasks.value = true;
}
</script>
