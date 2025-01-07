<template>
  <el-dialog v-model="visible" title="Shipping address" width="500">
    <el-form :model="form">
      <el-form-item
        required
        label="Promotion name"
        :label-width="formLabelWidth"
      >
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Выберите день"
        />
      </el-form-item>

      <el-form-item required label="Period" :label-width="formLabelWidth">
        <el-time-picker
          v-model="form.period"
          is-range
          arrow-control
          range-separator="по"
        />
      </el-form-item>

      <el-form-item required label="Zones" :label-width="formLabelWidth">
      </el-form-item>
    </el-form>

    <el-form-item label="Комментарий" :label-width="formLabelWidth">
      <el-input
        v-model="form.comments"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Комментарий"
      />
    </el-form-item>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="hide">Cancel</el-button>
        <el-button type="primary" @click="save"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { TimeJournalEntry } from "../../main/entities";
import moment from "moment";

type Form = {
  date: Date;
  period: [Date, Date];
  comments: string | null;
  operation: null;
};

const visible = ref(false);

type NullableProperties<T> = {
  [K in keyof T]: T[K] | null;
};

let currentEntry: NullableProperties<TimeJournalEntry> = resetEntry();

function resetEntry(): NullableProperties<TimeJournalEntry> {
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
  operation: null,
});

const show = (entry?: TimeJournalEntry) => {
  let date = moment();

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
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

const save = () => {
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

  emit("save", currentEntry as TimeJournalEntry);
};

const emit = defineEmits<{
  (e: "save", entry: TimeJournalEntry): void;
}>();
defineExpose({ show, hide });
</script>
