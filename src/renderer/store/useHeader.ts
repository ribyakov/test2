import { defineStore } from "pinia";
import { ref } from "vue";

export const useHeader = defineStore("Header", () => {
  const showBackButton = ref(false);
  const title = ref("");

  return { showBackButton, title };
});
