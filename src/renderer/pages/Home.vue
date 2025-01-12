<template>
  <div>
    <el-card v-for="voyage in voyages" shadow="never">
      <template #default>
        <el-descriptions
          class="margin-top"
          :title="voyage.number"
          :column="3"
          size="small"
          border
        >
          <template #title>
            <div class="">
              <el-button link type="primary" @click="onClick(voyage)"
                ><span class="h5">{{ voyage.number }}</span></el-button
              >
            </div>
          </template>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <user />
                </el-icon>
                Username
              </div>
            </template>
            kooriookami
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone />
                </el-icon>
                Telephone
              </div>
            </template>
            18100000000
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <location />
                </el-icon>
                Place
              </div>
            </template>
            Suzhou
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <tickets />
                </el-icon>
                Remarks
              </div>
            </template>
            <el-tag size="small">School</el-tag>
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
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Voyage } from "../../main/entities";
import { useHeader } from "../store/useHeader";
import { storeToRefs } from "pinia";
import router from "../router/router";
import {
  Comment,
  Iphone,
  Link,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from "@element-plus/icons-vue";

const { showBackButton, title } = storeToRefs(useHeader());
showBackButton.value = false;
title.value = "ДИСП";

const voyages = ref<Voyage[]>([]);

const load = async () => {
  voyages.value = await window.api.voyage.getAll();
  console.log(voyages.value);
};

const onClick = async (row: Voyage) => {
  await router.push({ name: "voyage-view", params: { id: row.id } });
  title.value = row.number;
};

onMounted(() => {
  load();
});

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
