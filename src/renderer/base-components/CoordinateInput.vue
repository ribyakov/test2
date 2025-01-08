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
import { parseDMS, normalizeInput, validateDMS } from "./utils";

const { el, masked, unmasked } = useIMask(
  {
    mask: createMask(),
  },
  {
    onComplete: (...args) => {
      console.log(...args, masked.value);
      const normalized = normalizeInput(masked.value);
      const isValid = validateDMS(normalized);
      const dms = parseDMS(normalized);
      console.log(dms);
    },
  },
);
</script>
