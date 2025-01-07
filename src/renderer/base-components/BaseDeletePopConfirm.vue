<template>
  <el-popconfirm
    width="300"
    hide-icon
    @confirm="confirm"
    :title="$t('action.deleteConfirmation')"
  >
    <template #reference>
      <el-button :icon="DeleteFilled" link type="danger"> </el-button>
    </template>
    <template #actions="{ confirm, cancel }">
      <el-button size="small" @click="cancel">{{ $t("action.no") }}</el-button>
      <el-button type="danger" size="small" @click="confirm">
        {{ $t("action.yes") }}
      </el-button>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { DeleteFilled } from "@element-plus/icons-vue";

defineProps<{
  confirm: () => unknown;
}>();
</script>

<style scoped></style>
