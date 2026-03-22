<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref, UnwrapRef } from "vue"
import { useRoute } from "vue-router"
import { debounce } from "@rom98m/utils"
import PlayField from "../components/playfield/PlayField.vue"
import MiniField from "../components/playfield/MiniField.vue"
import StatsFooter from "../components/shared/StatsFooter.vue"
import FinishedLevel from "../components/FinishedLevel.vue"
import { useLevels, type Level } from "../providers/level"
import { type Field } from "../providers/field"
import { type Cell } from "../providers/cell"
import { type Cursor } from "../providers/cursor"
import { type DifficultyLevel } from "../providers/difficulty"
import { LevelStats } from "../providers/stats"

const route = useRoute()
const levels = useLevels()
const level = ref<Level>(null as unknown as Level)
let stats: UnwrapRef<LevelStats>
const field = ref<Field>(null as unknown as Field)
const cursor = ref<Cursor>(null as unknown as Cursor)
const difficultyLevel = ref<DifficultyLevel>(1)
const renderKey = ref<number>(1)

let originalCells: Cell[]
const isFinished = ref(false)
const isBestTime = ref(false)
const isBestMoves = ref(false)
let timerId: NodeJS.Timeout

const loadLevel = (newLevel: Level, newDifficulty: DifficultyLevel) => {
  renderKey.value++

  level.value = newLevel
  stats = level.value.stats
  field.value = newLevel.field
  cursor.value = newLevel.cursor

  difficultyLevel.value = newDifficulty
  isFinished.value = false

  stats.reset()
  stats.setDifficulty(difficultyLevel.value)

  originalCells = field.value.getOriginalCells()

  setTimeout(() => {
    level.value.field.shuffle(difficultyLevel.value)
    checkProgress()
  }, 1)
  timerId = setInterval(() => stats.bumpTime(), 1000)
}

const checkProgress = debounce(() => {
  const isInProgress = originalCells.some(
    ({ x, y, type }) => field.value!.getCellAt(x, y)!.type !== type
  )
  if (isInProgress) return

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

watch(() => route.fullPath, () => {
  const { id, difficulty } = route.params as unknown as { id: number; difficulty: DifficultyLevel }
  const parsedDifficulty = Number(difficulty) as DifficultyLevel
  if (!levels[id] || isNaN(parsedDifficulty)) {
    throw new Error(`Failed loading level "${id}" with difficulty "${difficulty}"`)
  }

  loadLevel(levels[id], parsedDifficulty)
}, { immediate: true })
</script>

<template>
  <Teleport v-if="!isFinished" to="#tetr4mble > #minifield">
    <MiniField :field="field" />
  </Teleport>

  <div class="h-full flex flex-col">
    <PlayField
      :key="`pf-${renderKey}`"
      :field="field"
      :cursor="isFinished ? null : cursor"
      class="flex-1"
      @cell-click="onCellClick"
      @cursor-click="doRotate"
    />

    <FinishedLevel
      v-if="isFinished"
      :stats="stats"
      :difficulty="difficultyLevel"
      :name="level.description"
      :isBestTime="isBestTime"
      :isBestMoves="isBestMoves"
      class="mt-4 lg:mt-8"
      @restart="loadLevel(level, difficultyLevel)"
    />
  </div>

  <StatsFooter :difficulty="difficultyLevel" :stats="level.stats" :name="level.description" />
</template>
