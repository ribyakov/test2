<template>
  <el-dialog
    v-model="visible"
    :title="$t('CargoOperationJournal.editForm.title')"
    width="500"
  >
    <el-form :model="form">
      <el-form-item
        required
        :label="$t('CargoOperationJournal.list.table.column.cargoType')"
        :label-width="formLabelWidth"
        :error="v$.cargoType.$error ? $t('common.mandatory') : undefined"
      >
        <el-select
          v-model="form.cargoType"
          placeholder="Выберите вид груза"
          size="large"
          style="width: 240px"
          value-key="id"
        >
          <el-option
            v-for="item in cargoTypes"
            :key="item.id"
            :label="item.name"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        :label="$t('CargoOperationJournal.list.table.column.description')"
        :label-width="formLabelWidth"
      >
        <el-input type="textarea" v-model="form.description" />
      </el-form-item>

      <el-form-item
        :label="$t('CargoOperationJournal.list.table.column.value')"
        :label-width="formLabelWidth"
      >
        <el-input-number v-model="form.value" />
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
import { CargoOperationJournalRecord, CargoType } from "../../main/entities";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { v4 as uuidv4 } from "uuid";
import { CargoOperationType } from "../../main/entities/cargo-operation-journal/CargoOperationType";
import { storeToRefs } from "pinia";
import { useMasterdata } from "../store/useMasterdata";

type Form = {
  cargoType: CargoType;
  description: string | null;
  value: number | undefined;
};

const { cargoTypes } = storeToRefs(useMasterdata());

const formLabelWidth = "140px";

const rules = {
  cargoType: {
    id: {
      required,
    },
  },
};

const visible = ref(false);

type NullableProperties<T> = {
  [K in keyof T]: T[K] | null;
};

let currentItem = createEmptyItem();

function createEmptyItem(): NullableProperties<CargoOperationJournalRecord> {
  return {
    id: null,
    type: null,
    cargoType: { id: null } as unknown as CargoType,
    description: "",
    value: 0,
    uuid: uuidv4(),
    journal: null,
  };
}

const form = reactive<Form>({
  cargoType: { id: null } as unknown as CargoType,
  description: "",
  value: 0,
});

const v$ = useVuelidate<Form>(rules, form);

const show = (
  entry: CargoOperationJournalRecord | null,
  type?: CargoOperationType,
) => {
  if (!entry) {
    currentItem = createEmptyItem();
    currentItem.type = type!;
  } else {
    currentItem = entry;
  }

  form.cargoType = currentItem.cargoType as CargoType;
  form.description = currentItem.description;
  form.value = currentItem.value as number;

  v$.value.$reset();

  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

const save = () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  currentItem.cargoType = form.cargoType;
  currentItem.description = form.description;
  currentItem.value = form.value as number;
  currentItem.uuid ??= uuidv4();

  emit("save", currentItem as CargoOperationJournalRecord);
};

const emit = defineEmits<{
  (e: "save", entry: CargoOperationJournalRecord): void;
}>();

defineExpose({ show, hide });
</script>
