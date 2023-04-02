<script setup lang="ts">
import { defineProps, inject } from "vue"
import { Cell } from "../providers/cell"
import { cursorInjectionKey } from "../providers/cursor"
import PlayCellIcon from "./PlayCellIcon.vue"

const props = defineProps({
  cell: {
    type: Object as () => Cell,
    required: true
  },
})

const cursor = inject(cursorInjectionKey)

const onClick = (e: MouseEvent) => {
  if (props.cell.isDummy) return

  e.preventDefault()
  cursor.approach(props.cell.x, props.cell.y)
}
</script>

<template>
  <div class="absolute rounded-lg overflow-hidden transition-all text-center"
       :class="{ [`cell-${cell.type}`]: !cell.isDummy }"
       @click="onClick"
  >
    <PlayCellIcon :cell-type="cell.type" :class="`cell-${cell.type}`" class="w-[60%] m-[20%]"/>
  </div>
</template>

<style scoped>
/* Must be represented here otherwise the TW compiler ignores them */
.cell-1 {
  @apply text-cell-1 dark:text-cell-1-bg;
}
.cell-2 {
  @apply text-cell-2 dark:text-cell-2-bg;
}
.cell-3 {
  @apply text-cell-3 dark:text-cell-3-bg;
}
.cell-4 {
  @apply text-cell-4 dark:text-cell-4-bg;
}
.cell-5 {
  @apply text-cell-5 dark:text-cell-5-bg;
}
.cell-6 {
  @apply text-cell-6 dark:text-cell-6-bg;
}
</style>
