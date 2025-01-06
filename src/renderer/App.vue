<template>
  <el-config-provider :locale="locale">
    <el-container>
      <el-main>
        <Start />
      </el-main>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import locale from "element-plus/es/locale/lang/ru";
import Start from "./Start.vue";
</script>
