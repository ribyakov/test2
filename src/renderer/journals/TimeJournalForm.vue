<template>
  <el-dialog
    v-model="visible"
    :title="$t('TimeJournal.editForm.title')"
    width="500"
  >
    <el-form :model="form">
      <el-form-item
        required
        :label="$t('TimeJournal.list.table.column.date')"
        :label-width="formLabelWidth"
        :error="v$.date.$error ? $t('common.mandatory') : undefined"
      >
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Выберите день"
        />
      </el-form-item>

      <el-form-item
        required
        :label="$t('TimeJournal.list.table.column.period')"
        :label-width="formLabelWidth"
        :error="v$.period.$error ? $t('common.mandatory') : undefined"
      >
        <el-time-picker
          v-model="form.period"
          is-range
          arrow-control
          :range-separator="$t('TimeJournal.editForm.rangeSeparator')"
        />
      </el-form-item>

      <el-form-item
        required
        :label="$t('TimeJournal.list.table.column.operation')"
        :label-width="formLabelWidth"
        :error="v$.operation.$error ? $t('common.mandatory') : undefined"
      >
        <el-select
          v-model="form.operation"
          size="large"
          style="width: 240px"
          value-key="id"
        >
          <el-option-group
            v-for="group in operationList"
            :key="group.type.id"
            :label="group.type.name"
          >
            <el-option
              v-for="item in group.list"
              :key="item.id"
              :label="item.name"
              :value="item"
            />
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item
        :label="$t('TimeJournal.list.table.column.comments')"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.comments"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="Комментарий"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="hide">{{ $t("action.cancel") }}</el-button>
        <el-button type="primary" @click="save">
          {{ $t("action.save") }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { Operation, TimeJournalRecord } from "../../main/entities";
import moment from "moment";
import { useMasterdata } from "../store/useMasterdata";
import { storeToRefs } from "pinia";
import _ from "lodash";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

type Form = {
  date: Date;
  period: [Date, Date];
  comments: string | null;
  operation: Operation;
};

const rules = {
  date: { required },
  period: { required },
  operation: {
    id: { required },
  },
};

const visible = ref(false);
const { getOperationTypeById } = useMasterdata();
const { operations } = storeToRefs(useMasterdata());
const operationList = computed(() => {
  return (
    _.chain(operations.value)
      // Group the elements of Array based on `color` property
      .groupBy((i) => i.type.id)
      // `key` is group's name (color), `value` is the array of objects
      .map((value, key) => ({ type: getOperationTypeById(+key), list: value }))
      .value()
  );
});

type NullableProperties<T> = {
  [K in keyof T]: T[K] | null;
};

let currentEntry: NullableProperties<TimeJournalRecord> = resetEntry();

function resetEntry(): NullableProperties<TimeJournalRecord> {
  return {
    id: null,
    startTime: null,
    endTime: null,
    comments: null,
    operation: null,
    uuid: null,
    journal: null,
  };
}

const formLabelWidth = "140px";

const form = reactive<Form>({
  date: new Date(0, 0, 0, 0, 0),
  period: [new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0)],
  comments: "",
  operation: { id: null } as unknown as Operation,
});

const v$ = useVuelidate<Form>(rules, form);

const show = (entry?: TimeJournalRecord) => {
  let date = moment();
  v$.value.$reset();

  if (entry) {
    currentEntry = entry;
    date = moment(currentEntry.startTime);
    const endDate = moment(currentEntry.endTime);
    form.period = [
      new Date(0, 0, 0, date.hour(), date.minutes()),
      new Date(0, 0, 0, endDate.hour(), endDate.minutes()),
    ];
  } else {
    currentEntry = resetEntry();
    form.period = [
      new Date(0, 0, 0, date.hour(), date.minutes()),
      new Date(0, 0, 0, 23, 59),
    ];
  }

  form.date = new Date(date.year(), date.month(), date.date());
  form.comments = currentEntry.comments;
  form.operation = currentEntry.operation!;

  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

const save = () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  currentEntry.operation = form.operation;
  currentEntry.comments = form.comments;

  const startTime = moment(form.period[0]);
  const endTime = moment(form.period[1]);

  currentEntry.startTime = moment(form.date)
    .add(startTime.hours(), "hours")
    .add(startTime.minutes(), "minutes")
    .add(startTime.seconds(), "seconds")
    .toDate();

  currentEntry.endTime = moment(form.date)
    .add(endTime.hours(), "hours")
    .add(endTime.minutes(), "minutes")
    .add(endTime.seconds(), "seconds")
    .toDate();

  emit("save", currentEntry as TimeJournalRecord);
};

const emit = defineEmits<{
  (e: "save", entry: TimeJournalRecord): void;
}>();
defineExpose({ show, hide });
</script>
