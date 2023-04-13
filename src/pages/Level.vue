<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref } from "vue"
import { useRoute } from "vue-router"
import PlayField from "../components/playfield/PlayField.vue";
import MiniField from "../components/playfield/MiniField.vue";
import { useLevels, Level } from "../providers/level";
import { Field } from "../providers/field";
import { Cell } from "../providers/cell";
import { Cursor, shuffleFiled } from "../providers/cursor";
import { DifficultyLevel } from "../providers/difficulty";

const route = useRoute()
const levels = useLevels()
const level = ref<Level>(null)
const field = ref<Field>(null)
const cursor = ref<Cursor>(null)
let timerId: number

watch(() => route.params, () => {
  const { id, difficulty } = route.params as { id: number; difficulty: DifficultyLevel }
  level.value = levels[id]
  field.value = levels[id].field
  cursor.value = levels[id].cursor
  level.value.stats.setDifficulty(Number(difficulty) as DifficultyLevel)

  setTimeout(() => shuffleFiled(cursor.value as Cursor, difficulty), 1)
  timerId = setInterval(() => level.value.stats.bumpTime(), 1000)
}, { immediate: true })

const onCellClick = (cell: Cell) => {
  // e.preventDefault()
  cursor.value.approach(cell.x, cell.y)
}

const doRotate = () => {
  cursor.value.rotate()
  level.value.stats.bumpMove()
}

const kbdListener = (e: KeyboardEvent) => {
  // e.preventDefault()
  switch (e.key) {
    case "ArrowUp": return cursor.value.move(0, -1)
    case "ArrowRight": return cursor.value.move(1, 0)
    case "ArrowDown": return cursor.value.move(0, 1)
    case "ArrowLeft": return cursor.value.move(-1, 0)
    case " ": return doRotate()
    default:
    // console.info(`Pressed unrecognized key: <${e.key}>`)
  }
}

onMounted(() => window.addEventListener("keydown", kbdListener))
onUnmounted(() => {
  window.removeEventListener("keydown", kbdListener)
  clearInterval(timerId)
})
</script>

<template>
  <Teleport to="#tetr4mble > header">
    <MiniField :field="field" class="mx-auto" />
  </Teleport>

  <PlayField :field="field" :cursor="cursor" @cell-click="onCellClick" @cursor-click="doRotate" />

  <Teleport to="#tetr4mble > footer">
    <div>
      <span class="mr-4 lg:mr-8">↻ {{level.stats.currentMoves}}</span>
      <span class="mr-4 lg:mr-8">🕑 {{level.stats.currentTime}}</span>
    </div>
  </Teleport>
</template>
