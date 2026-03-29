<script lang="ts" setup>
import { computed } from "vue"
import AppButton from "../components/shared/AppButton.vue"
import BasicFooter from "../components/shared/BasicFooter.vue"
import MiniField from "../components/playfield/MiniField.vue"
import { useLevels } from "../providers/level"
import { useDifficulty, type DifficultyLevel } from "../providers/difficulty"
import { useRouter } from "vue-router"

const router = useRouter()

const levels = [...useLevels().values()]
const difficulty = useDifficulty()

const _difficultyNames: { [level in DifficultyLevel]: string } = {
  1: "Rookie",
  2: "Bring it on",
  3: "I know kung-fu",
  4: "Give 'em hell",
}
const dufficultyName = computed(() => _difficultyNames[difficulty.level.value])
</script>

<template>
  <Teleport to="#tetr4mble > header > #back-button" >
    <AppButton icon="icon-left-open" @click="router.back()" />
  </Teleport>

  <div class="h-full flex flex-col">
    <h1 class="mb-4 lg:mb-4 text-center">Select level</h1>

    <div class="flex-1 overflow-y-auto flex flex-row justify-center">
      <table class="border-separate border-spacing-y-4 lg:border-spacing-y-8">
        <tr v-for="level in levels">
          <td>
            <MiniField
              :key="level.id"
              :width="level.width"
              :height="level.height"
              :cells="level.matrix.flat()"
              class="mx-auto"
            />
          </td>
          <td>
            <a
              :href="`/level/${level.id}/${difficulty.level.value}`"
              class="ml-4 lg:ml-4"
            >{{level.id}}: {{ level.name }}</a>
          </td>
        </tr>
      </table>
    </div>

    <div class="mt-4 lg:mt-8 pt-4 lg:pt-8 border-t border-t-paper-dark dark:border-t-ink-light flex flex-row justify-center items-center">
      <div class="mr-4">Difficulty</div>
      <input
        type="range"
        min="1" max="4" step="1"
        class="block w-[12em] mr-2"
        v-model.number="difficulty.level.value"
      />
      <span class="w-[10em] text-sm text-paper-dark dark:text-ink-light">
        {{ dufficultyName }}
      </span>
    </div>
  </div>

  <BasicFooter />
</template>
