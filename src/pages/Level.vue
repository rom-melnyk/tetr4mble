<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref, UnwrapRef } from "vue";
import { useRoute } from "vue-router"
import PlayField from "../components/playfield/PlayField.vue";
import MiniField from "../components/playfield/MiniField.vue";
import StatsFooter from "../components/header-footer/StatsFooter.vue"
import FinishedLevel from "../components/FinishedLevel.vue";
import { useLevels, Level } from "../providers/level";
import { Field } from "../providers/field";
import { Cell } from "../providers/cell";
import { Cursor, shuffleFiled } from "../providers/cursor";
import { DifficultyLevel } from "../providers/difficulty";
import { LevelStats } from "../providers/stats";
import { debounce } from "../utils";

const route = useRoute()
const levels = useLevels()
const level = ref<Level>(null)
let stats: UnwrapRef<LevelStats>
const field = ref<Field>(null)
const cursor = ref<Cursor>(null)
const difficultyLevel = ref<DifficultyLevel>(1)

let originalCells: Cell[]
const isFinished = ref(false)
const isBestTime = ref(false)
const isBestMoves = ref(false)
let timerId: number

watch(() => route.params, () => {
  const { id, difficulty } = route.params as { id: number; difficulty: DifficultyLevel }
  difficultyLevel.value = Number(difficulty) as DifficultyLevel
  level.value = levels[id]
  stats = level.value.stats
  field.value = levels[id].field
  cursor.value = levels[id].cursor

  stats.setDifficulty(difficultyLevel.value)
  originalCells = field.value.getOriginalCells()

  setTimeout(() => {
    shuffleFiled(cursor.value as Cursor, difficulty)
    checkProgress()
  }, 1)
  timerId = setInterval(() => stats.bumpTime(), 1000)
}, { immediate: true })

const checkProgress = debounce(() => {
  const numMatchingCells = originalCells.filter(
    ({ x, y, type }) => field.value.getCellAt(x, y).type === type
  ).length
  if (numMatchingCells < originalCells.length) {
    stats.setProgress(Math.floor(numMatchingCells / originalCells.length * 100))
    return
  }

  isFinished.value = true
  if (stats.isBestTime()) isBestTime.value = true
  if (stats.isBestMoves()) isBestMoves.value = true

  clearInterval(timerId)
  stats.finish()
}, 100)

const doRotate = () => {
  cursor.value.rotate()
  stats.bumpMove()
  checkProgress()
}

const onCellClick = (cell: Cell) => {
  // e.preventDefault()
  if (isFinished.value) return

  cursor.value.approach(cell.x, cell.y)
}

const kbdListener = (e: KeyboardEvent) => {
  // e.preventDefault()
  if (isFinished.value) return

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

  <div class="h-full flex flex-col">
    <PlayField
      :field="field"
      :cursor="isFinished ? null : cursor"
      class="flex-1"
      @cell-click="onCellClick"
      @cursor-click="doRotate" />

    <footer class="mt-4 lg:mt-8 h-16 text-center">
      <FinishedLevel
        v-if="isFinished"
        :stats="stats"
        :difficulty="difficultyLevel"
        :name="level.description"
        :isBestTime="isBestTime"
        :isBestMoves="isBestMoves" />
    </footer>
  </div>

  <StatsFooter :difficulty="difficultyLevel" :stats="level.stats" :name="level.description" />
</template>
