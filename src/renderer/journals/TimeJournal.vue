<template>
  <el-table @row-click="rowClick" stripe :data="entries" style="width: 100%">
    <el-table-column v-slot="{ row }" label="Date" width="180">
      {{ $moment(row.date).format("YYYY-MM-DD") }}
    </el-table-column>
    <el-table-column v-slot="{ row }" label="start" width="180">
      {{ $moment(row.startTime).format("HH:mm") }}
    </el-table-column>
    <el-table-column v-slot="{ row }" label="start" width="180">
      {{ $moment(row.endTime).format("HH:mm") }}
    </el-table-column>
    <el-table-column prop="operation" label="operation" />
    <el-table-column prop="comment" label="comment" />
  </el-table>
  <TimeJournalForm ref="form" />
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import TimeJournalForm from "./TimeJournalForm.vue";
import { TimeJournal, VoyageTaskSegment } from "../../main/entities";

const props = defineProps<{
  segment?: VoyageTaskSegment;
}>();

const journal = ref<TimeJournal | null>();

const entries = computed(() => {
  return (journal.value?.entries ?? []).map((entry) => ({
    ...entry,
    date: entry.startTime,
  }));
});

watch(
  () => props.segment,
  async () => {
    if (!props.segment) return;
    journal.value = await window.api.timeJournal.getBySegmentId(
      props.segment.id,
    );
    console.log(journal.value);
  },
);

const form = ref<InstanceType<typeof TimeJournalForm> | null>(null);

const rowClick = (row: any, column: any, event: Event) => {
  form.value?.show();
};
</script>
