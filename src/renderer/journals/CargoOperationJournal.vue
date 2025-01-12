<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <CargoOperationJournalTable
        :entries="loadingEntries"
        @add="form?.show(null, CargoOperationType.LOAD)"
        @delete="deleteEntry"
        @change="edit"
      />
    </el-col>
    <el-col :span="12">
      <CargoOperationJournalTable
        :entries="unLoadingEntries"
        @add="form?.show(null, CargoOperationType.UNLOAD)"
        @delete="deleteEntry"
        @change="edit"
      />
    </el-col>
  </el-row>
  <CargoOperationJournalForm ref="form" @save="onItemSave" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  CargoOperationJournal,
  CargoOperationJournalRecord,
  VoyageSegment,
} from "../../main/entities";
import CargoOperationJournalTable from "./CargoOperationJournalTable.vue";
import { CargoOperationType } from "../../main/entities/cargo-operation-journal/CargoOperationType";
import CargoOperationJournalForm from "./CargoOperationJournalForm.vue";
import { cloneDeep } from "lodash";

const props = defineProps<{
  segment?: VoyageSegment;
}>();

const form = ref<InstanceType<typeof CargoOperationJournalForm> | null>(null);
const journal = ref<CargoOperationJournal>();

const loadingEntries = computed(() =>
  journal.value?.entries.filter(
    (item) => item.type === CargoOperationType.LOAD,
  ),
);

const unLoadingEntries = computed(() =>
  journal.value?.entries.filter(
    (item) => item.type === CargoOperationType.UNLOAD,
  ),
);

const load = async () => {
  journal.value = await window.api.cargoOperationJournal.getBySegmentId(
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

const edit = (row: CargoOperationJournalRecord) => {
  form.value?.show(row);
};

const onItemSave = async (entry: CargoOperationJournalRecord) => {
  if (!Array.isArray(journal.value!.entries)) {
    journal.value!.entries = [];
  }

  if (!entry.id) {
    entry.journal = journal.value!;
    journal.value!.entries.push(entry);
  }

  await window.api.cargoOperationJournal.save(cloneDeep(journal.value!));
  form.value?.hide();
  void load();
};

const deleteEntry = async (entry: CargoOperationJournalRecord) => {
  await window.api.cargoOperationJournal.deleteEntry(cloneDeep(entry));
  void load();
};
</script>

<style scoped></style>
