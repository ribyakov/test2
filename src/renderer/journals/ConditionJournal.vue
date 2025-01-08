<template>
  <el-button link type="primary" :icon="Plus" @click="add()">{{
    $t("action.add")
  }}</el-button>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";

const add = () => {};
</script>

<style scoped></style>
