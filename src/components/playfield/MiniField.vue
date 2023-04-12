<script setup lang="ts">
import PlayCell from "./playcell/PlayCell.vue"
import PlayCellIcon from "./playcell/PlayCellIcon.vue"
import PlayFiledBorders from "./PlayFiledBorders.vue";
import { Field } from "../../providers/field";

const props = defineProps<{ field: Field }>()

const cellWidth = 100 / props.field.width
const cellHeight = 100 / props.field.height
const borderCells = props.field.getBorderCells()
const cells = props.field.getOriginalCells()
</script>

<template>
  <Teleport to="#tetr4mble > header">
    <div class="relative h-[6rem] mx-auto"
         :style="{ 'aspect-ratio': `${field.width}/${field.height}` }"
    >
      <PlayFiledBorders :cell-width="cellWidth" :cell-height="cellHeight" :cells="borderCells" :is-mini-filed="true" />

      <PlayCell v-for="cell in cells"
                :class="`cell-${cell.type}`"
                :x="cellWidth * cell.x"
                :y="cellHeight * cell.y"
                :width="cellWidth"
                :height="cellHeight"
      >
        <PlayCellIcon
          :cell-type="cell.type"
          :class="`cell-${cell.type} w-[80%] m-[10%]`"
        />
      </PlayCell>
    </div>
  </Teleport>
</template>
