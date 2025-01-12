<template>
  <el-config-provider :locale="locale">
    <el-container id="disp">
      <el-main>
        <RouterView v-slot="{ Component, route }">
          <Transition name="fade" mode="out-in">
            <Component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </el-main>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import locale from "element-plus/es/locale/lang/ru";
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-0.5%);
}
</style>
