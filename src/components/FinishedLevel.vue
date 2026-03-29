<script lang="ts" setup>
import { useRouter } from "vue-router"
import { useLevels } from "../providers/level"
import { type LevelStats } from "../providers/stats"
import { type DifficultyLevel } from "../providers/difficulty"
import AppButton from "../components/shared/AppButton.vue"
import LevelNameandDifficulty from "./shared/LevelNameAndDifficulty.vue"
import { formatTime } from "../utils"

const router = useRouter()
const levelId = Number(router.currentRoute.value.params.id)
const levels = useLevels()

const props = defineProps<{
  stats: LevelStats["data"];
  name: string;
  difficulty: DifficultyLevel;
  isBestTime: boolean;
  isBestMoves: boolean;
}>()

const changeLevel = (dir: -1 | 1) => {
  router.push(`/level/${levelId + dir}/${props.difficulty}`)
}

const hasAdjacentLevel = (dir: -1 | 1) => {
  return levels.get(levelId + dir) != undefined
}

const emit = defineEmits(["restart"])
</script>

<template>
  <div>
    <div class="mx-auto mb-2 lg:mb-4 text-center leading-normal flex flex-row justify-center items-center">
      <span class="text-3xl">🎉</span>
      <span class="mx-4 lg:mx-8">
        <LevelNameandDifficulty :name="name" :difficulty="difficulty" />
        <br />
        <span>
          <span class="whitespace-nowrap">
            <span v-if="isBestTime" class="mr-1">👑 Best time</span>
            <i class="icon-clock mr-1" />
            <span class="mr-4">{{ formatTime(stats.currentTime) }}</span>
          </span>

          <span class="whitespace-nowrap">
            <span v-if="isBestMoves" class="mr-1">👑 Best moves</span>
            <i class="icon-cw mr-1" />
            <span>{{ stats.currentMoves }}{{ isBestMoves ? "" : " moves" }}</span>
          </span>
        </span>
      </span>
      <span class="text-3xl">🎉</span>
    </div>
    <div class="text-center ">
      <AppButton icon="icon-left-open"
                class="finished-button"
                :disabled="!hasAdjacentLevel(-1)"
                @click="changeLevel(-1)"
      />
      <AppButton icon="icon-cw"
                 class="finished-button"
                 @click="emit('restart')"
      />
      <AppButton icon="icon-menu"
                 class="finished-button"
                 @click="router.push('/select-level')"
      />
      <AppButton icon="icon-right-open"
                  class="finished-button"
                  :disabled="!hasAdjacentLevel(1)"
                  @click="changeLevel(1)"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "../styles/main.css";

.finished-button {
  @apply mr-4 lg:mr-8;

  &:last-child {
    @apply mr-0 lg:mr-0;
  }
}
</style>
