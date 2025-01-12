<template>
  <el-button link type="primary" :icon="Plus" @click="add()">{{
    $t("action.add")
  }}</el-button>
  <el-table
    :data="points"
    :default-sort="{ prop: 'date', order: 'ascending' }"
    :row-class-name="tableRowClassName"
    class="hover"
    stripe
    style="width: 100%"
    @row-click="onRowClick"
  >
    <el-table-column
      v-slot="{ row }"
      prop="date"
      sortable
      :label="$t('ConditionJournal.list.table.column.date')"
      width="180"
    >
      {{ $moment(row.date).format("YYYY-MM-DD HH:mm") }}
    </el-table-column>
    <el-table-column
      v-slot="{ row }"
      :label="$t('ConditionJournal.list.table.column.coordinate')"
      width="280"
    >
      {{ row.masked }}
    </el-table-column>
    <el-table-column fixed="right">
      <template #default="{ row }: { row: ConditionJournalGeo }">
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
          <BaseDeletePopConfirm :confirm="() => emit('delete', row)" />
        </template>
      </template>
    </el-table-column>
  </el-table>

  <ConditionJournalForm ref="form" @save="onChange" />
</template>

<script setup lang="ts">
import { Edit, Lock, Plus } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import ConditionJournalForm from "./ConditionJournalForm.vue";
import { ConditionJournal, ConditionJournalGeo } from "../../main/entities";
import BaseDeletePopConfirm from "../base-components/BaseDeletePopConfirm.vue";

const props = defineProps<{
  journal?: ConditionJournal;
  selected?: ConditionJournalGeo;
}>();

const points = computed(() => props.journal?.points || []);

const form = ref<InstanceType<typeof ConditionJournalForm> | null>(null);

const add = () => {
  form.value?.show();
};

const edit = (row: ConditionJournalGeo) => {
  form.value?.show(row);
};

const tableRowClassName = ({ row }: { row: ConditionJournalGeo }) => {
  if (row === props.selected) {
    return "selected-row";
  }
  return "";
};

const onRowClick = (row: ConditionJournalGeo) => {
  emit("row-click", row);
};

const onChange = (row: ConditionJournalGeo) => {
  emit("change", row);
  form.value?.hide();
};

const emit = defineEmits<{
  (e: "row-click", row: ConditionJournalGeo): void;
  (e: "change", row: ConditionJournalGeo): void;
  (e: "delete", row: ConditionJournalGeo): void;
}>();
</script>

<style scoped lang="scss">
:deep(.el-table__body) {
  tr.selected-row td.el-table__cell {
    background-color: var(--el-color-primary-light-9);
  }
}
</style>
