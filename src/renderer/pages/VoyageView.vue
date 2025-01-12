<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref } from "vue";
import { VoyageSegment } from "../../main/entities";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useHeader } from "../store/useHeader";

enum Tabs {
  TIME_JOURNAL = "TIME_JOURNAL",
  CONDITION_JOURNAL = "CONDITION_JOURNAL",
  CARGO_OPERATION_JOURNAL = "CARGO_OPERATION_JOURNAL",
}

const currentSegment = ref<VoyageSegment>();
const segments = ref<VoyageSegment[]>([]);
const activeTab = ref<Tabs>(Tabs.TIME_JOURNAL);
const route = useRoute();
const { showBackButton } = storeToRefs(useHeader());

const fetchVoyageSegments = async (id: number) => {
  segments.value = await window.api.voyage.segments(id);
};

onBeforeMount(async () => {
  showBackButton.value = true;
  await fetchVoyageSegments(+route.params.id);
});

const TimeJournal = defineAsyncComponent(
  () => import("../journals/TimeJournal.vue"),
);

const ConditionJournal = defineAsyncComponent(
  () => import("../journals/ConditionJournal.vue"),
);

const CargoOperationJournal = defineAsyncComponent(
  () => import("../journals/CargoOperationJournal.vue"),
);
</script>

<template>
  <div>
    <el-select
      v-model="currentSegment"
      class="mb-1"
      placeholder="Выберите часть маршрута"
      value-key="id"
    >
      <el-option
        v-for="item in segments"
        :key="item.id"
        :label="item.name"
        :value="item"
      />
    </el-select>
    <div>
      <el-tabs v-model="activeTab" class="demo-tabs">
        <el-tab-pane
          lazy
          :label="$t('TimeJournal.name')"
          :name="Tabs.TIME_JOURNAL"
        >
          <TimeJournal :segment="currentSegment"
        /></el-tab-pane>

        <el-tab-pane
          lazy
          :label="$t('ConditionJournal.name')"
          :name="Tabs.CONDITION_JOURNAL"
        >
          <ConditionJournal :segment="currentSegment"
        /></el-tab-pane>

        <el-tab-pane
          lazy
          :label="$t('CargoOperationJournal.name')"
          :name="Tabs.CARGO_OPERATION_JOURNAL"
        >
          <CargoOperationJournal :segment="currentSegment"
        /></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped></style>
