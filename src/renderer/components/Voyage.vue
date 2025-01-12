<template>
  <div>
    <slot></slot>
    <el-descriptions :column="2" size="small" border>
      <el-descriptions-item :span="2">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Ship />
            </el-icon>
            Позывной
          </div>
        </template>
        {{ voyage.ship.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Location />
            </el-icon>
            Начало маршрута
          </div>
        </template>
        {{ voyage.startPoint.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location />
            </el-icon>
            Окончание маршрута
          </div>
        </template>
        {{ voyage.finishPoint.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Comment />
            </el-icon>
            Комментарий
          </div>
        </template>
        {{ voyage.comments }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Voyage } from "../../main/entities";
import { useHeader } from "../store/useHeader";
import { storeToRefs } from "pinia";
import router from "../router/router";
import { Comment, Flag, Location, Place, Ship } from "@element-plus/icons-vue";

const { title } = storeToRefs(useHeader());

defineProps<{
  voyage: Voyage;
}>();

const iconStyle = computed(() => {
  const marginMap = {
    large: "8px",
    default: "6px",
    small: "4px",
  };
  return {
    marginRight: marginMap.default,
  };
});
</script>

<style scoped></style>
