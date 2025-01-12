<template>
  <div>
    <VoyageItem
      class="mb-2"
      v-for="voyage in voyages"
      :key="voyage.id"
      :voyage="voyage"
    >
      <el-button link type="primary" @click="onClick(voyage)"
        ><span>{{ voyage.number }}</span></el-button
      >
    </VoyageItem>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useHeader } from "../store/useHeader";
import { storeToRefs } from "pinia";
import VoyageItem from "../components/Voyage.vue";
import { Voyage } from "../../main/entities";
import router from "../router/router";

const { showBackButton, title } = storeToRefs(useHeader());
showBackButton.value = false;
title.value = "ДИСП";

const voyages = ref<Voyage[]>([]);

const load = async () => {
  voyages.value = await window.api.voyage.getAll();
  console.log(voyages.value);
};

onBeforeMount(() => {
  load();
});

const onClick = async (row: Voyage) => {
  await router.push({ name: "voyage-view", params: { id: row.id } });
  title.value = row.number;
};
</script>

<style scoped></style>
