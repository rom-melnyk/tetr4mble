<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import PlayField from "../components/playfield/PlayField.vue";
import MiniField from "../components/playfield/MiniField.vue";
import level from "../assets/levels/level-01.json"
import { Field } from "../providers/field";
import { Cell } from "../providers/cell";
import { Cursor, shuffleFiled } from "../providers/cursor";

const field = Field.fromJSON(level)
const cursor = new Cursor(field)
setTimeout(() => shuffleFiled(cursor, 4), 1)

const onCellClick = (cell: Cell) => {
  // if (props.isMiniFiled || props.cell.isDummy) return

  // e.preventDefault()
  cursor.approach(cell.x, cell.y)
}

const onCursorClick = () => cursor.rotate()

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
  <PlayField :field="field" :cursor="cursor" @cell-click="onCellClick" @cursor-click="onCursorClick" />
  <MiniField :field="field" />
</template>
