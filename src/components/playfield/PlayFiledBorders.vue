<script lang="ts" setup>
import PlayCell from "./playcell/PlayCell.vue"
import { BorderCell } from "../../providers/cell";

defineProps<{
  cellWidth: number;
  cellHeight: number;
  cells: BorderCell[];
  isMiniFiled?: boolean;
}>()
</script>

<template>
  <PlayCell v-for="cell in cells"
            :x="cellWidth * cell.x"
            :y="cellHeight * cell.y"
            :width="cellWidth"
            :height="cellHeight"
            :class="{
              'border-t border-t-chalk-dark dark:border-t-asphalt-light': cell.borders.has('t'),
              'border-r border-r-chalk-dark dark:border-r-asphalt-light': cell.borders.has('r'),
              'border-b border-b-chalk-dark dark:border-b-asphalt-light': cell.borders.has('b'),
              'border-l border-l-chalk-dark dark:border-l-asphalt-light': cell.borders.has('l'),
              'rounded-tr-lg': !isMiniFiled && cell.borders.has('t') && cell.borders.has('r'),
              'rounded-br-lg': !isMiniFiled && cell.borders.has('b') && cell.borders.has('r'),
              'rounded-bl-lg': !isMiniFiled && cell.borders.has('b') && cell.borders.has('l'),
              'rounded-tl-lg': !isMiniFiled && cell.borders.has('t') && cell.borders.has('l'),
            }"
  />
</template>
