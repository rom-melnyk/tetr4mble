<script setup lang="ts">
import { onMounted, onUnmounted, provide } from "vue";
import level from "../assets/levels/level-01.json"
import { Field, filedInjectionKey } from "../providers/field"
import { Cursor, cursorInjectionKey, shuffleFiled } from "../providers/cursor";
import * as utils from "../utils"
import PlayCell from "./PlayCell.vue"
import MiniField from "./MiniField.vue"

const field = Field.fromJSON(level)
const cursor = new Cursor(field)
setTimeout(() => shuffleFiled(cursor, 4), 1)

provide(filedInjectionKey, field)
provide(cursorInjectionKey, cursor)

const cellWidth = 100 / field.width
const cellHeight = 100 / field.height
const cells = field.getAllCells()

const round4 = utils.round4

const kbdListener = (e: KeyboardEvent) => {
  // e.preventDefault()
  switch (e.key) {
    case "ArrowUp": return cursor.move(0, -1)
    case "ArrowRight": return cursor.move(1, 0)
    case "ArrowDown": return cursor.move(0, 1)
    case "ArrowLeft": return cursor.move(-1, 0)
    case " ": return cursor.rotate()
    default:
      // console.info(`Pressed unrecognized key: <${e.key}>`)
  }
}

onMounted(() => window.addEventListener("keydown", kbdListener))
onUnmounted(() => window.removeEventListener("keydown", kbdListener))
</script>

<template>
  <div class="relative max-w-full max-h-full mx-auto"
       :style="{ 'aspect-ratio': `${field.width}/${field.height}` }"
  >
    <PlayCell v-for="cell in cells"
              :cell="cell"
              :is-mini-filed="false"
              :style="{
                width: `${round4(cellWidth)}%`,
                height: `${round4(cellHeight)}%`,
                top: `${round4(cellHeight * cell.y)}%`,
                left: `${round4(cellWidth * cell.x)}%`,
              }"
    />
    <div class="absolute rounded-lg border lg:border-2 border-accent transition-all"
         :style="{
           width: `${round4(2 * cellWidth)}%`,
           height: `${round4(2 * cellHeight)}%`,
           top: `${round4(cellHeight * cursor.position.y)}%`,
           left: `${round4(cellWidth * cursor.position.x)}%`,
         }"
         @click="cursor.rotate"
    />
    <MiniField :field="field" class="absolute w-2/12 top-0 right-0 opacity-30"/>
  </div>
</template>
