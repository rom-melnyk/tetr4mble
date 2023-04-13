<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref } from "vue"
import { useRoute } from "vue-router"
import PlayField from "../components/playfield/PlayField.vue";
import MiniField from "../components/playfield/MiniField.vue";
import { useLevels, Level } from "../providers/level";
import { Field } from "../providers/field";
import { Cell } from "../providers/cell";
import { Cursor, shuffleFiled } from "../providers/cursor";

const route = useRoute()
const level = ref<Level>(null)
const field = ref<Field>(null)
const cursor = ref<Cursor>(null)
const levels = useLevels()

watch(() => route.params, () => {
  const { id, severity } = route.params as { id: number; severity: 1 | 2 | 3 | 4 }
  level.value = levels[id]
  field.value = levels[id].field
  cursor.value = levels[id].cursor

  setTimeout(() => shuffleFiled(cursor.value as Cursor, severity), 1)
}, { immediate: true })

const onCellClick = (cell: Cell) => {
  // e.preventDefault()
  cursor.value.approach(cell.x, cell.y)
}

const onCursorClick = () => cursor.value.rotate()

const kbdListener = (e: KeyboardEvent) => {
  // e.preventDefault()
  switch (e.key) {
    case "ArrowUp": return cursor.value.move(0, -1)
    case "ArrowRight": return cursor.value.move(1, 0)
    case "ArrowDown": return cursor.value.move(0, 1)
    case "ArrowLeft": return cursor.value.move(-1, 0)
    case " ": return cursor.value.rotate()
    default:
    // console.info(`Pressed unrecognized key: <${e.key}>`)
  }
}

onMounted(() => window.addEventListener("keydown", kbdListener))
onUnmounted(() => window.removeEventListener("keydown", kbdListener))
</script>

<template>
  <Teleport to="#tetr4mble > header">
    <MiniField :field="field" class="mx-auto" />
  </Teleport>

  <PlayField :field="field" :cursor="cursor" @cell-click="onCellClick" @cursor-click="onCursorClick" />
</template>
