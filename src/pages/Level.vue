<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref } from "vue"
import { useRoute } from "vue-router"
import PlayField from "../components/playfield/PlayField.vue";
import MiniField from "../components/playfield/MiniField.vue";
import StatsFooter from "../components/header-footer/StatsFooter.vue"
import { useLevels, Level } from "../providers/level";
import { Field } from "../providers/field";
import { Cell } from "../providers/cell";
import { Cursor, shuffleFiled } from "../providers/cursor";
import { DifficultyLevel } from "../providers/difficulty";
import { debounce } from "../utils";

const route = useRoute()
const levels = useLevels()
const level = ref<Level>(null)
const field = ref<Field>(null)
const cursor = ref<Cursor>(null)
const difficultyLevel = ref<DifficultyLevel>(1)

let originalCells: Cell[]
const isFinished = ref(false)
let timerId: number

watch(() => route.params, () => {
  const { id, difficulty } = route.params as { id: number; difficulty: DifficultyLevel }
  difficultyLevel.value = Number(difficulty) as DifficultyLevel
  level.value = levels[id]
  field.value = levels[id].field
  cursor.value = levels[id].cursor
  level.value.stats.setDifficulty(difficultyLevel.value)
  originalCells = field.value.getOriginalCells()

  setTimeout(() => shuffleFiled(cursor.value as Cursor, difficulty), 1)
  timerId = setInterval(() => level.value.stats.bumpTime(), 1000)
}, { immediate: true })

const checkForFinished = debounce(() => {
  const allCellsMatchOriginalType = originalCells.every(
    ({ x, y, type }) => field.value.getCellAt(x, y).type === type
  );
  if (allCellsMatchOriginalType) isFinished.value = true
}, 100)

const doRotate = () => {
  cursor.value.rotate()
  level.value.stats.bumpMove()
  checkForFinished()
}

const onCellClick = (cell: Cell) => {
  // e.preventDefault()
  cursor.value.approach(cell.x, cell.y)
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

  <div v-if="isFinished" class="mx-auto mt-4 lg:mt-4">
    🎉 Finished!
  </div>

  <StatsFooter :difficulty="difficultyLevel" :stats="level.stats" :name="level.description" />
</template>
