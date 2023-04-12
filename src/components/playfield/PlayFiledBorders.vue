<script lang="ts" setup>
import PlayCell from "./playcell/PlayCell.vue"

defineProps<{
  cellWidth: number;
  cellHeight: number;
  cells: Array<{ x: number; y: number; borders: Set<"t" | "r" | "b" | "l"> }>
}>()
</script>

<template>
  <PlayCell v-for="cell in cells"
            :x="cellWidth * cell.x"
            :y="cellHeight * cell.y"
            :width="cellWidth"
            :height="cellHeight"
            :class="{
              'border-t border-t-asphalt-light dark:border-t-chalk-darker': cell.borders.has('t'),
              'border-r border-r-asphalt-light dark:border-r-chalk-darker': cell.borders.has('r'),
              'border-b border-b-asphalt-light dark:border-b-chalk-darker': cell.borders.has('b'),
              'border-l border-l-asphalt-light dark:border-l-chalk-darker': cell.borders.has('l'),
              'rounded-tr-lg': cell.borders.has('t') && cell.borders.has('r'),
              'rounded-br-lg': cell.borders.has('b') && cell.borders.has('r'),
              'rounded-bl-lg': cell.borders.has('b') && cell.borders.has('l'),
              'rounded-tl-lg': cell.borders.has('t') && cell.borders.has('l'),
            }"
  />
</template>
