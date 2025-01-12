<template>
  <el-button link type="primary" :icon="Plus" @click="add()">{{
    $t("action.add")
  }}</el-button>
  <el-table :data="props.entries" stripe style="width: 100%">
    <el-table-column
      v-slot="{ row }: { row: CargoOperationJournalRecord }"
      :label="$t('CargoOperationJournal.list.table.column.cargoType')"
      width="150"
    >
      {{ row.cargoType.name }}
    </el-table-column>
    <el-table-column
      prop="description"
      :label="$t('CargoOperationJournal.list.table.column.description')"
    />
    <el-table-column
      prop="value"
      :label="$t('CargoOperationJournal.list.table.column.value')"
      width="150"
    />
    <el-table-column fixed="right" width="100">
      <template #default="{ row }: { row: CargoOperationJournalRecord }">
        <el-button link :icon="Edit" type="primary" @click="edit(row)">
        </el-button>
        <BaseDeletePopConfirm :confirm="() => emit('delete', row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { Edit, Plus } from "@element-plus/icons-vue";
import BaseDeletePopConfirm from "../base-components/BaseDeletePopConfirm.vue";
import { CargoOperationJournalRecord } from "../../main/entities";

const props = withDefaults(
  defineProps<{
    entries?: CargoOperationJournalRecord[];
  }>(),
  {
    entries: () => [],
  },
);

const add = () => {
  emit("add");
};

const edit = (row: CargoOperationJournalRecord) => {
  emit("change", row);
};

const emit = defineEmits<{
  (e: "add"): void;
  (e: "change", row: CargoOperationJournalRecord): void;
  (e: "delete", row: CargoOperationJournalRecord): void;
}>();
</script>

<style scoped></style>
