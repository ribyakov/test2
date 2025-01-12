<template>
  <el-dialog
    v-model="visible"
    :title="$t('ConditionJournal.editForm.title')"
    width="500"
  >
    <el-form :model="form">
      <el-form-item
        required
        :label="$t('ConditionJournal.list.table.column.date')"
        :label-width="formLabelWidth"
        :error="v$.date.$error ? $t('common.mandatory') : undefined"
      >
        <el-date-picker
          v-model="form.date"
          type="datetime"
          placeholder="Выберите день"
        />
      </el-form-item>

      <el-form-item
        required
        :label="$t('ConditionJournal.list.table.column.coordinate')"
        :label-width="formLabelWidth"
        :error="v$.coordinate.$error ? $t('common.mandatory') : undefined"
      >
        <CoordinateInput
          :model-value="form.coordinate"
          @complete="onCoordinateComplete"
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
import { reactive, ref } from "vue";
import { ConditionJournalGeoRecord } from "../../main/entities";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import CoordinateInput from "../base-components/CoordinateInput.vue";
import { validateDMS } from "../../main/utils/coordinate/utils";
import { v4 as uuidv4 } from "uuid";

type Form = {
  date: Date;
  coordinate: string;
  masked: string;
};

const formLabelWidth = "140px";

const rules = {
  date: { required },
  coordinate: { required, valid: (value: string) => validateDMS(value) },
};

const visible = ref(false);

type NullableProperties<T> = {
  [K in keyof T]: T[K] | null;
};

let currentItem = createEmptyItem();

function createEmptyItem(): NullableProperties<ConditionJournalGeoRecord> {
  return {
    id: null,
    date: null,
    coordinate: "",
    masked: "",
    geolocation: null,
    uuid: null,
    journal: null,
    indicators: [],
  };
}

const form = reactive<Form>({
  date: new Date(0, 0, 0, 0, 0),
  coordinate: "",
  masked: "",
});

const v$ = useVuelidate<Form>(rules, form);

const show = (entry?: ConditionJournalGeoRecord) => {
  if (!entry) {
    currentItem = createEmptyItem();
    currentItem.date = new Date();
  } else {
    currentItem = entry;
  }

  form.date = currentItem.date as Date;
  form.coordinate = currentItem.coordinate as string;

  v$.value.$reset();

  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

const save = () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  currentItem.date = form.date;
  currentItem.coordinate = form.coordinate;
  currentItem.masked = form.masked;
  currentItem.uuid ??= uuidv4();

  emit("save", currentItem as ConditionJournalGeoRecord);
};

const emit = defineEmits<{
  (e: "save", entry: ConditionJournalGeoRecord): void;
}>();

const onCoordinateComplete = (normalized: string, masked: string) => {
  form.coordinate = normalized;
  form.masked = masked;
};

defineExpose({ show, hide });
</script>
