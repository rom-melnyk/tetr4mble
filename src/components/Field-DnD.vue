<script setup lang="ts">
import { reactive } from "vue";

const cursor = reactive({ x: 0, y: 0 })
const lastCoords = { x: 0, y: 0 }

const dragStartStop = (e: DragEvent | TouchEvent) => {
  let evName = ""
  if (e instanceof DragEvent) {
    lastCoords.x = e.clientX
    lastCoords.y = e.clientY
    evName = "Drag"
  } else if (e instanceof TouchEvent) {
    lastCoords.x = e.touches[0].clientX
    lastCoords.y = e.touches[0].clientY
    evName = "Touch"
  }
  console.info(`${evName}:`, lastCoords)
}

const dragover = (e: DragEvent | TouchEvent) => {
  e.preventDefault()
  let evName = ""
  let dx = 0
  let dy = 0

  if (e instanceof DragEvent) {
    dx = e.clientX - lastCoords.x
    dy = e.clientY - lastCoords.y
    lastCoords.x = e.clientX
    lastCoords.y = e.clientY
    evName = "Dragg"
  } else if (e instanceof TouchEvent) {
    dx = e.touches[0].clientX - lastCoords.x
    dy = e.touches[0].clientY - lastCoords.y
    lastCoords.x = e.touches[0].clientX
    lastCoords.y = e.touches[0].clientY
    evName = "Touch"
  }

  cursor.x += dx
  cursor.y += dy
  console.info(`${evName}ing to:`, dx, dy)
}
const round = (n: number) => Math.floor(n / 50) * 50
</script>

<template>
  <div class="field relative w-80 aspect-square rounded border border-b-chalk select-none"
       @dragover="dragover"
       @touchmove="dragover"
  >
    <div class="absolute cursor w-12 aspect-square cursor-pointer rounded bg-wall-light select-none"
         draggable="true"
         :style="{ top: `${round(cursor.y)}px`, left: `${round(cursor.x)}px` }"
         @dragstart="dragStartStop"
         @dragend="dragStartStop"
         @touchstart="dragStartStop"
         @touchend="dragStartStop"
    ></div>
  </div>
</template>
