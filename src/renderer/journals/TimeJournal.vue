<template>
  <el-button type="primary" :icon="Plus" @click="add()">Добавить</el-button>
  <el-table @row-click="edit" stripe :data="entries" style="width: 100%">
    <el-table-column v-slot="{ row }" label="Date" width="180">
      {{ $moment(row.startTime).format("YYYY-MM-DD") }}
    </el-table-column>
    <el-table-column v-slot="{ row }" label="start" width="180">
      {{ $moment(row.startTime).format("HH:mm") }}
    </el-table-column>
    <el-table-column v-slot="{ row }" label="start" width="180">
      {{ $moment(row.endTime).format("HH:mm") }}
    </el-table-column>
    <el-table-column prop="operation" label="operation" />
    <el-table-column prop="comments" label="comment" />
  </el-table>
  <TimeJournalForm ref="form" @save="onEntrySave" />
</template>

<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
import { computed, ref, watch } from "vue";
import TimeJournalForm from "./TimeJournalForm.vue";
import {
  TimeJournal,
  TimeJournalEntry,
  VoyageTaskSegment,
} from "../../main/entities";
import { cloneDeep } from "lodash";

const props = defineProps<{
  segment?: VoyageTaskSegment;
}>();

const journal = ref<TimeJournal | null>();

const entries = computed(() => journal.value?.entries || []);

watch(
  () => props.segment,
  () => {
    if (!props.segment) return;
    load();
  },
);

const load = async () => {
  journal.value = await window.api.timeJournal.getBySegmentId(
    props.segment!.id,
  );
};

const form = ref<InstanceType<typeof TimeJournalForm> | null>(null);

const add = () => {
  form.value?.show();
};

const edit = (row: TimeJournalEntry) => {
  form.value?.show(row);
};

const onEntrySave = async (entry: TimeJournalEntry) => {
  if (!entry.id) {
    entry.journal = journal.value!;
    journal.value!.entries.push(entry);
  }
  await window.api.timeJournal.save(cloneDeep(journal.value!));
  form.value?.hide();
  void load();
};
</script>
