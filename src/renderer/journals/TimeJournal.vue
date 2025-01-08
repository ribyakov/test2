<template>
  <el-button link type="primary" :icon="Plus" @click="add()">{{
    $t("action.add")
  }}</el-button>
  <el-table stripe :data="entries" style="width: 100%">
    <el-table-column
      v-slot="{ row }"
      :label="$t('TimeJournal.list.table.column.date')"
      width="180"
    >
      {{ $moment(row.startTime).format("YYYY-MM-DD") }}
    </el-table-column>
    <el-table-column
      v-slot="{ row }"
      :label="$t('TimeJournal.list.table.column.period')"
      width="180"
    >
      {{ $moment(row.startTime).format("HH:mm") }} -
      {{ $moment(row.endTime).format("HH:mm") }}
    </el-table-column>
    <el-table-column
      v-slot="{ row }"
      :label="$t('TimeJournal.list.table.column.operation')"
    >
      {{ row.operation.name }}
    </el-table-column>
    <el-table-column
      v-slot="{ row }"
      :label="$t('TimeJournal.list.table.column.operationType')"
    >
      {{ row.operation.type.name }}
    </el-table-column>
    <el-table-column
      prop="comments"
      :label="$t('TimeJournal.list.table.column.comments')"
    />
    <el-table-column fixed="right" min-width="120">
      <template #default="{ row }">
        <el-button link :icon="Edit" type="primary" @click="edit(row)">
        </el-button>
        <BaseDeletePopConfirm :confirm="() => deleteEntry(row)" />
      </template>
    </el-table-column>
  </el-table>
  <TimeJournalForm ref="form" @save="onEntrySave" />
</template>

<script lang="ts" setup>
import { Edit, Plus } from "@element-plus/icons-vue";
import { computed, ref, watch } from "vue";
import TimeJournalForm from "./TimeJournalForm.vue";
import {
  TimeJournal,
  TimeJournalEntry,
  VoyageTaskSegment,
} from "../../main/entities";
import { cloneDeep } from "lodash";
import BaseDeletePopConfirm from "../base-components/BaseDeletePopConfirm.vue";

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

const deleteEntry = async (entry: TimeJournalEntry) => {
  journal.value!.entries = journal.value!.entries.filter(
    (e) => e.id !== entry.id,
  );
  await window.api.timeJournal.save(cloneDeep(journal.value!));
  void load();
};
</script>
