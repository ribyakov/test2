<template>
  <div>
    <el-page-header v-if="showBackButton" @back="$router.back()">
      <template #content>
        <div class="d-flex align-items-center">
          <span class="">{{ title }}</span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-icon size="14" :color="connection ? 'green' : 'red'">
            <Connection />
          </el-icon>
        </div>
      </template>
    </el-page-header>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Connection } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useHeader } from "./store/useHeader";

const connection = ref<boolean>();
const { showBackButton, title } = storeToRefs(useHeader());

const updateOnlineStatus = () => {
  connection.value = navigator.onLine;
};

onMounted(() => {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  updateOnlineStatus();
});

onUnmounted(() => {
  window.removeEventListener("online", updateOnlineStatus);
  window.removeEventListener("offline", updateOnlineStatus);
});
</script>
