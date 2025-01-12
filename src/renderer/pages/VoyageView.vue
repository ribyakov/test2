<template>
  <div>
    <el-page-header class="mb-2" v-if="showBackButton" @back="$router.back()">
      <template #content>
        <div class="d-flex align-items-center">
          <span class="">{{ title }}</span>
        </div>
      </template>
    </el-page-header>

    <!--    <el-tag-->
    <!--      round-->
    <!--      :effect="item === currentSegment ? 'dark' : 'plain'"-->
    <!--      class="me-1 mb-1 pointer"-->
    <!--      disable-transitions-->
    <!--      @click="setSegment(item)"-->
    <!--      v-for="item in segments"-->
    <!--      :key="item.id"-->
    <!--      >{{ item.name }}</el-tag-->
    <!--    >-->

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

<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref } from "vue";
import { Voyage, VoyageSegment } from "../../main/entities";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useHeader } from "../store/useHeader";
import { Connection } from "@element-plus/icons-vue";
import VoyageItem from "../components/Voyage.vue";

enum Tabs {
  TIME_JOURNAL = "TIME_JOURNAL",
  CONDITION_JOURNAL = "CONDITION_JOURNAL",
  CARGO_OPERATION_JOURNAL = "CARGO_OPERATION_JOURNAL",
}

const voyage = ref<Voyage>();
const currentSegment = ref<VoyageSegment>();
const segments = ref<VoyageSegment[]>([]);
const activeTab = ref<Tabs>(Tabs.TIME_JOURNAL);
const route = useRoute();
const { showBackButton, title } = storeToRefs(useHeader());

const fetchVoyageSegments = async (id: number) => {
  segments.value = await window.api.voyage.segments(id);
};

onBeforeMount(async () => {
  showBackButton.value = true;
  const id = +route.params.id;
  voyage.value = await window.api.voyage.get(id);
  await fetchVoyageSegments(id);
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

const setSegment = (segment: VoyageSegment) => {
  currentSegment.value = segment;
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
