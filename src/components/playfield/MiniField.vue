<script setup lang="ts">
import * as utils from "../../utils"
import PlayCell from "./PlayCell.vue"
import { Field } from "../../providers/field";

const props = defineProps({
  field: {
    type: Object as () => Field,
    required: true,
  }
})

const cellWidth = 100 / props.field.width
const cellHeight = 100 / props.field.height
const cells = props.field.getOriginalCells()

const round4 = utils.round4
</script>

<template>
  <div class="absolute"
       :style="{ 'aspect-ratio': `${field.width}/${field.height}` }"
  >
    <PlayCell v-for="cell in cells"
              :cell="cell"
              :is-mini-filed="true"
              :style="{
                width: `${round4(cellWidth)}%`,
                height: `${round4(cellHeight)}%`,
                top: `${round4(cellHeight * cell.y)}%`,
                left: `${round4(cellWidth * cell.x)}%`,
              }"
    />
  </div>
</template>
