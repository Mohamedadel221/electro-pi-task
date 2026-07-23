import { defineStore } from "pinia";

import type { Task } from "~/types/tasks";

const ENDPOINT = "http://localhost:3001/tasks";

export const myTasks = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
    successMessage: "",
    filterTask: "",
    statusFilter: "All",
  }),
  getters: {
    filteredTasks(state) {
      return state.tasks.filter((task) => {
        const matchesSearch =
          !state.filterTask ||
          task.title.toLowerCase().includes(state.filterTask.toLowerCase());

        const matchesStatus =
          state.statusFilter === "All" || task.status === state.statusFilter;

        return matchesSearch && matchesStatus;
      });
    },
  },
  actions: {
    /*********** start GET TASK  ********************/
    async getTasks() {
      this.loading = true;
      this.error = null;
      try {
        this.tasks = await $fetch<Task[]>(ENDPOINT);
        return this.tasks;
      } catch (err) {
        this.error = "Failed to load tasks";
        return null;
      } finally {
        this.loading = false;
      }
    },
    /*********** end GET TASK  ********************/

    /*********** Start Post TASK  ********************/
    async addTask(task: Omit<Task, "id">) {
      try {
        const newTask = await $fetch<Task>(ENDPOINT, {
          method: "POST",
          body: task,
        });

        this.tasks.push(newTask);
        this.successMessage = "Task added successfully";
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
        return newTask;
      } catch (err) {
        this.error = "Failed to add task";
      }
    },
    /*********** Start Delete Tasks ********************/

    async deleteTask(id: number) {
      this.loading = true;
      this.error = null;
      this.successMessage = "";
      try {
        await $fetch(`${ENDPOINT}/${id}`, {
          method: "DELETE",
        });
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.successMessage = "Task deleted successfully!";
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      } catch (err) {
        this.error = "Failed to delete task";
      } finally {
        this.loading = false;
      }
    },
    /*********** End Delete Tasks ********************/

    /*********** start edit Task ********************/
    async updateTask(id: number, task: Partial<Task>) {
      const updatedTask = await $fetch<Task>(`${ENDPOINT}/${id}`, {
        method: "PUT",
        body: task,
      });

      const index = this.tasks.findIndex((t: any) => t.id === id);
      this.successMessage = "Task updated successfully!";
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    },

    /*********** End edit Tasks ********************/
  },
});
