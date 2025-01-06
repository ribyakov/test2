<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { VoyageTaskSegment } from "../main/entities";
import TimeJournal from "./journals/TimeJournal.vue";

const currentSegment = ref<VoyageTaskSegment>();
const segments = ref<VoyageTaskSegment[]>([]);
const activeTab = ref<string>("first");

const fetchVoyageSegments = async (id: number) => {
  segments.value = await window.api.voyage.segments(id);
};

onBeforeMount(async () => {
  await fetchVoyageSegments(8);
});
</script>

<template>
  <el-select
    v-model="currentSegment"
    placeholder="Select"
    size="large"
    style="width: 240px"
  >
    <el-option
      v-for="item in segments"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
  <div>
    <el-tabs v-model="activeTab" class="demo-tabs">
      <el-tab-pane label="Журнал учета времени" name="first"
        ><TimeJournal
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped></style>
