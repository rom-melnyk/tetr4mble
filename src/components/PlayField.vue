<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import level from "../assets/levels/level-01.json"
import { Field } from "../providers/field"
import { Cursor } from "../providers/cursor"
import * as utils from "../utils"
import PlayCell from "./PlayCell.vue"

const field = Field.fromJSON(level)
const cursor = new Cursor(field)
const cellSize = 100 / field.width
const cells = field.getAllCells()

const round2 = utils.round2
const kbdListener = (e: KeyboardEvent) => {
  // e.preventDefault()
  switch (e.key) {
    case "ArrowUp": return cursor.move(0, -1)
    case "ArrowRight": return cursor.move(1, 0)
    case "ArrowDown": return cursor.move(0, 1)
    case "ArrowLeft": return cursor.move(-1, 0)
    case " ": return field.rotateCW(cursor.position)
    default:
      console.info(`Pressed unrecognized key: <${e.key}>`)
  }
}

onMounted(() => window.addEventListener("keydown", kbdListener))
onUnmounted(() => window.removeEventListener("keydown", kbdListener))
</script>

<template>
  <div class="relative aspect-square w-1/2">
    <PlayCell v-for="cell in cells"
              :cell="cell"
              :size="cellSize"
    />
    <div class="absolute rounded-sm border-4 border-accent transition-all"
         :style="{
           width: `${round2(2 * cellSize)}%`,
           height: `${round2(2 * cellSize)}%`,
           top: `${round2(cellSize * cursor.position.y)}%`,
           left: `${round2(cellSize * cursor.position.x)}%`,
         }"
    ></div>
  </div>
</template>
