<template>
  <div class="el-input">
    <div class="el-input__wrapper" tabindex="-1">
      <input
        class="el-input__inner"
        type="text"
        autocomplete="off"
        tabindex="0"
        ref="el"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIMask } from "vue-imask";
import { createMask } from "./createMask";
import { normalizeInput, validateDMS } from "../../main/utils/coordinate/utils";
import { watch } from "vue";

const value = defineModel<string>({ default: "" });

const { el, masked, unmasked } = useIMask(
  {
    mask: createMask({ dmsPrecision: 2 }),
  },
  {
    onAccept: () => {
      const normalized = normalizeInput(masked.value);
      emit("complete", normalized, masked.value);
    },
    onComplete: () => {
      const normalized = normalizeInput(masked.value);
      const isValid = validateDMS(normalized);
      if (!isValid) return;
      emit("complete", normalized, masked.value);
    },
  },
);

watch(
  value,
  () => {
    unmasked.value = value.value;
  },
  { immediate: true },
);

const emit = defineEmits<{
  (e: "complete", normalized: string, masked: string): void;
  (e: "reset"): void;
}>();
</script>
