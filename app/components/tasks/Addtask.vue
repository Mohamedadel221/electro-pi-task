<template>
  <Transition name="fade">
    <div
      v-if="tasksStore.successMessage"
      class="fixed top-5 right-5 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md z-[60]"
    >
      <span class="capitalize"> {{ tasksStore.successMessage }}</span>
    </div>
  </Transition>

  <div class="flex justify-end mt-5 mb-5 add-task-compo">
    <button
      class="rounded-md border border-[#000] hover:border-[transparent] hover:bg-[#FFFFFF] hover:text-black text-black px-3 py-2 capitalize transition-all duration-300 flex items-center"
      @click="openAddTask"
    >
      <Icon name="mdi-plus" size="20px" />
      {{ title }}
    </button>
  </div>
  <transition name="fade">
    <div
      v-if="showAddTasks"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6 md:px-0"
      @click.self="closePopup"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-xl">
        <form @submit.prevent="addTaskForm">
          <div class="grid grid-cols-12 items-center gap-4">
            <div class="title col-span-12 md:col-span-6">
              <input
                type="text"
                v-model="sentTask.title"
                placeholder="Title"
                class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-[14px] outline-none appearance-none focus:border-[#34c759] transition-all duration-300 bg-[transparent]"
              />
              <span v-if="v$.title.$error" class="text-red-500 text-xs">
                {{ v$.title.$errors[0].$message }}
              </span>
            </div>
            <div class="status col-span-12 md:col-span-6">
              <select
                v-model="sentTask.status"
                class="capitalize w-full border border-gray-300 rounded-2xl px-4 py-3 text-[14px] outline-none appearance-none focus:border-[#34c759] transition-all duration-300 bg-[transparent]"
              >
                <option value="" selected disabled>status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">done</option>
              </select>
              <span v-if="v$.status.$error" class="text-red-500 text-xs">
                {{ v$.status.$errors[0].$message }}
              </span>
            </div>
            <div class="date col-span-12 md:col-span-12">
              <input
                type="date"
                v-model="sentTask.dueDate"
                class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-[14px] outline-none appearance-none focus:border-[#34c759] transition-all duration-300 bg-[transparent]"
              />
              <span v-if="v$.dueDate.$error" class="text-red-500 text-xs">
                {{ v$.dueDate.$errors[0].$message }}
              </span>
            </div>
            <div class="description col-span-12 md:col-span-12">
              <textarea
                v-model="sentTask.description"
                placeholder="Description"
                class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-[14px] outline-none appearance-none focus:border-[#34c759] transition-all duration-300 bg-[transparent]"
              />
              <span v-if="v$.title.$error" class="text-red-500 text-xs">
                {{ v$.description.$errors[0].$message }}
              </span>
            </div>
          </div>
          <div class="add-btn flex items-center justify-center mt-5">
            <button
              type="submit"
              class="decoration-none capitalize bg-[#34c759] md:py-1 md:px-5 px-5 py-2 text-[#ffffff] rounded-xs hover:bg-transparent border-2 border-[#34c759] hover:text-[#000] transition-all duration-300"
            >
              {{ editingTask ? "Update Task" : "Add Task" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { myTasks } from "~/store/tasks";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
defineProps({
  title: {
    type: String,
    required: false,
  },
});

const tasksStore = myTasks();

const showAddTasks = useState("showAddTasks", () => false);
const editingTask = useState("editingTask", () => null);

const sentTask = reactive({
  title: "",
  description: "",
  status: "",
  dueDate: "",
});
/** ==******* validate ********* == */
const vailidate = {
  title: { required },
  status: { required },
  dueDate: { required },
  description: { required },
};
const v$ = useVuelidate(vailidate, sentTask);

watch(editingTask, (task) => {
  if (task) {
    sentTask.title = task.title;
    sentTask.description = task.description;
    sentTask.status = task.status;
    sentTask.dueDate = task.dueDate;
    showAddTasks.value = true;
  }
});
/** ==******* open pouop  ********* == */
function openAddTask() {
  resetForm();
  showAddTasks.value = true;
}
/** ==******* close pouop function button ********* == */
function closePopup() {
  showAddTasks.value = false;
  resetForm();
}
/** ==******* reset form after add task ********* == */
function resetForm() {
  editingTask.value = null;
  sentTask.title = "";
  sentTask.description = "";
  sentTask.status = "";
  sentTask.dueDate = "";
}
/** ==******* add task button ********* == */
const addTaskForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    if (editingTask.value) {
      await tasksStore.updateTask(editingTask.value.id, { ...sentTask });
    } else {
      await tasksStore.addTask({ ...sentTask });
    }
    showAddTasks.value = false;
    resetForm();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
