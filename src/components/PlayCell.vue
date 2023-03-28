<script setup lang="ts">
import { defineProps } from "vue"
import { Cell } from "../providers/cell"
import * as utils from "../utils"

defineProps({
  cell: {
    type: Object as () => Cell,
    required: true
  },
  size: {
    type: Number,
    required: true,
  }
})

const round2 = utils.round2
</script>

<template>
  <div class="absolute aspect-square rounded-full transition-all text-center pt-2"
       :class="{ [`cell-${cell.type}`]: !cell.isDummy }"
       :style="{
         width: `${round2(size)}%`,
         height: `${round2(size)}%`,
         top: `${round2(size * cell.y)}%`,
         left: `${round2(size * cell.x)}%`,
       }"
  >
    {{ cell.isDummy ? "" : cell.type }}
  </div>
</template>

<style scoped>
/* Must be represented here otherwise the TW compiler ignores them */
.cell-1 {
  @apply bg-cell-1-bg text-cell-1 dark:bg-cell-1 dark:text-cell-1-bg;
}
.cell-2 {
  @apply bg-cell-2-bg text-cell-2 dark:bg-cell-2 dark:text-cell-2-bg;
}
.cell-3 {
  @apply bg-cell-3-bg text-cell-3 dark:bg-cell-3 dark:text-cell-3-bg;
}
.cell-4 {
  @apply bg-cell-4-bg text-cell-4 dark:bg-cell-4 dark:text-cell-4-bg;
}
.cell-5 {
  @apply bg-cell-5-bg text-cell-5 dark:bg-cell-5 dark:text-cell-5-bg;
}
.cell-6 {
  @apply bg-cell-6-bg text-cell-6 dark:bg-cell-6 dark:text-cell-6-bg;
}
</style>
