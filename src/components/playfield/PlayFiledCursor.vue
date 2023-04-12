<script lang="ts" setup>
import PlayCell from "./playcell/PlayCell.vue"
import { Cursor } from "../../providers/cursor"

defineProps<{
  cellWidth: number;
  cellHeight: number;
  cursor: Cursor
}>()
</script>

<template>
  <PlayCell class="rounded-lg border-4 lg:border-4 border-accent"
            :width="2 * cellWidth"
            :height="2 * cellHeight"
            :x="cellWidth * cursor.position.x"
            :y="cellHeight * cursor.position.y"
  />
</template>

<style scoped>
</style>