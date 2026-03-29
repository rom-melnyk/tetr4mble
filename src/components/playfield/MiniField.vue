<script setup lang="ts">
import PlayCell from "./playcell/PlayCell.vue"
import PlayCellIcon from "./playcell/PlayCellIcon.vue"
import { type Cell } from "../../providers/cell"

const props = defineProps<{ width: number; height: number; cells: Cell[]; }>()

const cellWidth = 100 / props.width
const cellHeight = 100 / props.height
</script>

<template>
  <div class="relative"
       :style="{
                 'aspect-ratio': `${width}/${height}`,
                 height: `${height / 2}em`
               }"
  >

    <PlayCell v-for="cell in cells"
              :class="`cell-${cell.type}`"
              :x="cellWidth * cell.x"
              :y="cellHeight * cell.y"
              :width="cellWidth"
              :height="cellHeight"
    >
      <PlayCellIcon
        :cell-type="cell.type"
        :class="`cell-${cell.type} w-[94%] m-[3%]`"
      />
    </PlayCell>
  </div>
</template>
