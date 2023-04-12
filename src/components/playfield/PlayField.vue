<script setup lang="ts">
import { Field } from "../../providers/field"
import { Cursor } from "../../providers/cursor";
import PlayCell from "./playcell/PlayCell.vue"
import PlayCellIcon from "./playcell/PlayCellIcon.vue"
import PlayFiledBorders from "./PlayFiledBorders.vue";
import PlayFiledCursor from "./PlayFiledCursor.vue";

const props = defineProps({
  field: {
    type: Object as () => Field,
    required: true
  },
  cursor: {
    type: Object as () => Cursor,
    required: false
  },
})
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
  <div class="relative max-w-full md:max-w-[80%] max-h-full mx-auto"
       :style="{ 'aspect-ratio': `${field.width}/${field.height}` }"
  >
    <PlayFiledBorders :cell-width="cellWidth" :cell-height="cellHeight" :cells="borderCells" />

    <PlayCell v-for="cell in cells"
              :class="{ [`cell-${cell.type}`]: !cell.isDummy }"
              :x="cellWidth * cell.x"
              :y="cellHeight * cell.y"
              :width="cellWidth"
              :height="cellHeight"
              @click="emit('cellClick', cell)"
    >
      <PlayCellIcon
        :cell-type="cell.type"
        :class="{
          [`cell-${cell.type}`]: true,
           'w-[80%] m-[10%]': cursor,
        }"
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
