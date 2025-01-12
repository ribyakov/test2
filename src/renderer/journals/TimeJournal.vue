<template>
  <el-button link type="primary" :icon="Plus" @click="add()">{{
    $t("action.add")
  }}</el-button>
  <el-table
    :data="entries"
    :default-sort="{ prop: 'startTime', order: 'ascending' }"
    class="hover"
    stripe
    style="width: 100%"
  >
    <el-table-column
      v-slot="{ row }"
      prop="startTime"
      sortable
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
      <template #default="{ row }: { row: TimeJournalRecord }">
        <template v-if="row.locked">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('common.locked')"
            placement="top"
          >
            <el-button link :icon="Lock" type="primary" disabled />
          </el-tooltip>
        </template>
        <template v-else>
          <el-button link :icon="Edit" type="primary" @click="edit(row)">
          </el-button>
          <BaseDeletePopConfirm :confirm="() => deleteEntry(row)" />
        </template>
      </template>
    </el-table-column>
  </el-table>
  <TimeJournalForm ref="form" @save="onItemSave" />
</template>

<script lang="ts" setup>
import { Edit, Lock, Plus } from "@element-plus/icons-vue";
import { computed, ref, watch } from "vue";
import TimeJournalForm from "./TimeJournalForm.vue";
import {
  TimeJournal,
  TimeJournalRecord,
  VoyageSegment,
} from "../../main/entities";
import { cloneDeep } from "lodash";
import BaseDeletePopConfirm from "../base-components/BaseDeletePopConfirm.vue";

const props = defineProps<{
  segment?: VoyageSegment;
}>();

const journal = ref<TimeJournal | null>();

const entries = computed(() => journal.value?.entries || []);

const load = async () => {
  journal.value = await window.api.timeJournal.getBySegmentId(
    props.segment!.id,
  );
  console.log(journal.value);
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

const form = ref<InstanceType<typeof TimeJournalForm> | null>(null);

const add = () => {
  form.value?.show();
};

const edit = (row: TimeJournalRecord) => {
  form.value?.show(row);
};

const onItemSave = async (entry: TimeJournalRecord) => {
  if (!Array.isArray(journal.value!.entries)) {
    journal.value!.entries = [];
  }

  if (!entry.id) {
    entry.journal = journal.value!;
    journal.value!.entries.push(entry);
  }

  await window.api.timeJournal.save(cloneDeep(journal.value!));
  form.value?.hide();
  void load();
};

const deleteEntry = async (entry: TimeJournalRecord) => {
  await window.api.timeJournal.deleteEntry(cloneDeep(entry));
  void load();
};
</script>
