<script setup lang="ts">
import { type Field } from "../../providers/field"
import { type Cursor } from "../../providers/cursor"
import PlayCell from "./playcell/PlayCell.vue"
import PlayCellIcon from "./playcell/PlayCellIcon.vue"
import PlayFiledBorders from "./PlayFiledBorders.vue"
import PlayFiledCursor from "./PlayFiledCursor.vue"

const props = defineProps<{ field: Field; cursor: Cursor | null; }>()
const emit = defineEmits([
  "cellClick", /** @param {Cell} cell */
  "cursorClick",
])

const cellWidth = 100 / props.field.width
const cellHeight = 100 / props.field.height
const borderCells = props.field.getBorderCells()
const cells = props.field.getAllCells()
</script>

<template>
  <!-- Container ensures dynamis sizing with respect to PF aspect ratio -->
  <div class="transition-all" style="container-type: size;">
    <div class="mx-auto relative"
         :style="{
           'aspect-ratio': `${field.width}/${field.height}`,
           // Don't exceed height-constrained width
           width: `min(100cqw, 100cqh * (${field.width}/${field.height}))`,
           // Don't exceed width-constrained height (reversed aspect ratio!)
           height: `min(100cqh, 100cqw * (${field.height}/${field.width}))`,
         }"
    >
      <PlayFiledBorders :cell-width="cellWidth" :cell-height="cellHeight" :cells="borderCells" />

      <PlayCell v-for="cell in cells"
                :class="`cell-${cell.type}`"
                :x="cellWidth * cell.x"
                :y="cellHeight * cell.y"
                :width="cellWidth"
                :height="cellHeight"
                @click="emit('cellClick', cell)"
      >
        <PlayCellIcon
          :cell-type="cell.type"
          :class="`cell-${cell.type} w-[80%] m-[10%]`"
        />
      </PlayCell>

      <PlayFiledCursor
        v-if="cursor"
        :cursor="cursor"
        :cell-width="cellWidth"
        :cell-height="cellHeight"
        @click="emit('cursorClick')"
      />
    </div>
  </div>
</template>

<style>
@reference "../../styles/main.css";

/*
 * Must be represented here otherwise the TW compiler ignores them.
 * Must NOT be `scoped` because it's used by the <MiniFiled> as well.
 */
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
