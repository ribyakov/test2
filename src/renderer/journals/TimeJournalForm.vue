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
        <el-select v-model="form.operation" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>

    <el-form-item label="Комментарий" :label-width="formLabelWidth">
      <el-input
        v-model="form.comment"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Комментарий"
      />
    </el-form-item>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="hide">Cancel</el-button>
        <el-button type="primary" @click="hide"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const visible = ref(false);

const formLabelWidth = "140px";

const form = reactive({
  date: null,
  period: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
  comment: null,
  operation: null,
});

const show = () => {
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

defineExpose({ show, hide });
</script>
