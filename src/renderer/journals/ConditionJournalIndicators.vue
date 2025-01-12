<template>
  <el-table :data="indicators" style="margin-top: 44px">
    <el-table-column v-slot="{ row }">
      {{ row.indicator.name }}
    </el-table-column>
    <el-table-column v-slot="{ row }" width="250" align="right">
      <el-input-number
        :disabled="props.point?.locked"
        :min="0"
        size="small"
        :precision="3"
        v-model="row.value"
        @change="update(row.indicator, $event as number)"
      />
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  ConditionJournalGeoRecord,
  ConditionJournalRecord,
  ShipConditionIndicator,
} from "../../main/entities";
import { useMasterdata } from "../store/useMasterdata";
import { storeToRefs } from "pinia";

const { shipConditionIndicators } = storeToRefs(useMasterdata());

const props = defineProps<{
  point?: ConditionJournalGeoRecord;
}>();

watch(
  () => props.point,
  () => {
    fillIndicators();
  },
);

const indicators = computed(() => {
  return shipConditionIndicators.value.map((indicator) => ({
    indicator,
    value: ref(0),
  }));
});

const fillIndicators = () => {
  for (const record of indicators.value) {
    const current = props.point?.indicators.find(
      (item) => item.indicator.id === record.indicator.id,
    );
    if (current) {
      record.value.value = current.value;
    } else {
      record.value.value = 0;
    }
  }
};

const update = (indicator: ShipConditionIndicator, value: number) => {
  const current = props.point?.indicators.find(
    (item) => item.indicator.id === indicator.id,
  );

  if (current) {
    current.value = value;
  } else {
    props.point?.indicators.push({
      indicator,
      value: value,
    } as ConditionJournalRecord);
  }
  emit("change", props.point!);
};
const emit = defineEmits<{
  (e: "change", row: ConditionJournalGeoRecord): void;
}>();
</script>

<style scoped></style>
