<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref } from "vue"
import { useRoute } from "vue-router"
import { debounce, wait } from "@rom98m/utils"
import PlayField from "../components/playfield/PlayField.vue"
import MiniField from "../components/playfield/MiniField.vue"
import StatsFooter from "../components/shared/StatsFooter.vue"
import FinishedLevel from "../components/FinishedLevel.vue"
import { useLevels, type Level } from "../providers/level"
import { Field } from "../providers/field"
import { type Cell } from "../providers/cell"
import { Cursor } from "../providers/cursor"
import { parseDifficulty, type DifficultyLevel } from "../providers/difficulty"
import { LevelStats } from "../providers/stats"
import { pickTexture } from "../providers/texture"

const route = useRoute()
const levels = useLevels()

const renderKey = ref<number>(1)

const levelName = ref("")
const difficulty = ref<DifficultyLevel>(1)
let level: Level
let stats: LevelStats
let field: Field
let cursor: Cursor

const isFinished = ref(false)
const isBestTime = ref(false)
const isBestMoves = ref(false)
let timerId: NodeJS.Timeout

const initLevel = (newLevel: Level, newDifficulty: DifficultyLevel) => {
  renderKey.value++

  levelName.value = newLevel.name
  difficulty.value = newDifficulty

  level = newLevel
  stats = new LevelStats(newLevel.id, newDifficulty)
  const texture = pickTexture(newDifficulty)
  field = new Field(level.matrix, texture)
  cursor = new Cursor(field)

  isFinished.value = false

  wait(1).then(() => {
    field.shuffle(difficulty.value)
    checkProgress()
  })
  timerId = setInterval(() => stats.bumpTime(), 1000)
}

const checkProgress = debounce(() => {
  if (field.isShuffled()) return

  isFinished.value = true
  if (stats.isBestTime()) isBestTime.value = true
  if (stats.isBestMoves()) isBestMoves.value = true

  clearInterval(timerId)
  stats.finish()
}, 100)

const doRotate = () => {
  cursor.rotate()
  stats.bumpMove()
  checkProgress()
}

const onCellClick = (cell: Cell) => {
  if (isFinished.value) return

  cursor.approach(cell.x, cell.y)
}

const kbdListener = (e: KeyboardEvent) => {
  if (isFinished.value) return

  switch (e.key) {
    case "ArrowUp": return cursor.move(0, -1)
    case "ArrowRight": return cursor.move(1, 0)
    case "ArrowDown": return cursor.move(0, 1)
    case "ArrowLeft": return cursor.move(-1, 0)
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
  const difficulty = parseDifficulty(route.params.difficulty as string)
  const id = Number(route.params.id as string)
  if (!levels.has(id)) throw new Error(`Failed loading level "${id}"`)

  initLevel(levels.get(id)!, difficulty)
}, { immediate: true })
</script>

<template>
  <Teleport v-if="!isFinished" to="#tetr4mble > #minifield">
    <MiniField :key="`mf-${renderKey}`" :width="level.width" :height="level.height" :cells="field.getInitialOrder()" />
  </Teleport>

  <div class="h-full flex flex-col">
    <PlayField
      :key="`pf-${renderKey}`"
      :field="field"
      :cursor="isFinished ? null : cursor"
      :isFinished="isFinished"
      class="flex-1"
      @cell-click="onCellClick"
      @cursor-click="doRotate"
    />

    <FinishedLevel
      v-if="isFinished"
      :stats="stats.data"
      :difficulty="difficulty"
      :name="levelName"
      :isBestTime="isBestTime"
      :isBestMoves="isBestMoves"
      class="mt-4 lg:mt-8"
      @restart="initLevel(level, difficulty)"
    />
  </div>

  <StatsFooter :key="`sf-${renderKey}`" :difficulty="difficulty" :stats="stats.data" :name="levelName" />
</template>
