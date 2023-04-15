<script lang="ts" setup>
import { computed } from "vue"
import BasicHeader from "../components/header-footer/BasicHeader.vue"
import BasicFooter from "../components/header-footer/BasicFooter.vue"
import MiniField from "../components/playfield/MiniField.vue"
import { useLevels } from "../providers/level"
import { useDifficulty, DifficultyLevel } from "../providers/difficulty"

const levels = useLevels()
const difficulty = useDifficulty()

const _diffLevelWording: { [level in DifficultyLevel]: string } = {
  1: "Rookie",
  2: "Bring it on",
  3: "I know kung-fu",
  4: "Give 'em hell",
}
const difficultyWording = computed(() => _diffLevelWording[difficulty.level.value])
</script>

<template>
  <BasicHeader />

  <div class="h-full flex flex-col">
    <h1 class="mb-4 lg:mb-8 text-2xl">Select level</h1>
    <div class="mb-4 lg:mb-8 pb-4 lg:pb-8 border-b border-b-paper-dark dark:border-b-ink-light flex flex-row">
      <span class="mr-4 lg:mr-8">Difficulty</span>
      <span>
        <input type="range"
               min="1" max="4" step="1"
               class="w-[12em] mr-2 align-middle"
               v-model.number="difficulty.level.value"
        />
        <span class="text-sm align-middle text-paper-dark dark:text-ink-light">
          {{ difficultyWording }}
        </span>
      </span>
    </div>

    <div class="flex-1 overflow-y-auto">
      <table class="border-separate border-spacing-y-4 lg:border-spacing-y-8">
        <tr v-for="(level, lid) in levels">
          <td>
            <MiniField :field="level.field" />
          </td>
          <td>
            <a :href="`/level/${lid}/${difficulty.level.value}`"
               class="ml-4 lg:ml-4 text-accent"
            >{{ level.description }}</a>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <BasicFooter />
</template>
