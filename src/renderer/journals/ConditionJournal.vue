<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <ConditionJournalGeos
        :journal="journal"
        :selected="selectedRow"
        @row-click="onCurrentPointChange"
        @change="onPointChange"
        @delete="onPointDelete"
      />
    </el-col>
    <el-col :span="12">
      <ConditionJournalIndicators
        :point="selectedRow"
        @change="onIndicatorChange"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ConditionJournalGeos from "./ConditionJournalGeos.vue";
import {
  ConditionJournal,
  ConditionJournalGeoRecord,
  VoyageSegment,
} from "../../main/entities";
import ConditionJournalIndicators from "./ConditionJournalIndicators.vue";
import { ref, watch } from "vue";
import { cloneDeep } from "lodash";

const props = defineProps<{
  segment?: VoyageSegment;
}>();

const journal = ref<ConditionJournal>();
const selectedRow = ref<ConditionJournalGeoRecord>();

const load = async () => {
  journal.value = await window.api.conditionJournal.getBySegmentId(
    props.segment!.id,
  );
};

watch(
  () => props.segment,
  () => {
    if (!props.segment) return;
    load();
  },
  {
    immediate: true,
  },
);

const onPointChange = async (point: ConditionJournalGeoRecord) => {
  if (!Array.isArray(journal.value!.points)) {
    journal.value!.points = [];
  }

  if (!point.id) {
    point.journal = journal.value!;
    journal.value!.points.push(point);
  }

  await window.api.conditionJournal.save(cloneDeep(journal.value!));
  await load();

  if (selectedRow.value?.uuid !== point.uuid) {
    selectedRow.value = journal.value!.points.find(
      (item) => item.uuid === point.uuid,
    );
  }
};

const onIndicatorChange = async (point: ConditionJournalGeoRecord) => {
  point.indicators = point.indicators.filter((item) => item.value);
  await window.api.conditionJournal.save(cloneDeep(journal.value!));
};

const onPointDelete = async (point: ConditionJournalGeoRecord) => {
  await window.api.conditionJournal.deleteEntry(cloneDeep(point));
  void load();
};

const onCurrentPointChange = async (point: ConditionJournalGeoRecord) => {
  selectedRow.value = point;
};
</script>

<style scoped></style>
