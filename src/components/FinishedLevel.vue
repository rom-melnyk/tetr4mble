<script lang="ts" setup>
import { type LevelStats } from "../providers/stats"
import { type DifficultyLevel } from "../providers/difficulty"
import AppButton from "../components/shared/AppButton.vue"
import { formatTime } from "../utils"

defineProps<{
  stats: LevelStats;
  name: string;
  difficulty: DifficultyLevel;
  isBestTime: boolean;
  isBestMoves: boolean;
}>()

defineEmits(["previousClick", "nextClick", "restart"])
</script>

<template>
  <div class="flex flex-row justify-between items-center">
    <AppButton icon="icon-left-open" />

    <div class="mx-8 lg:mx-16 text-xl">
      <p>
        🎉 Finished the "{{ name }}" at difficulty {{ difficulty }}!
      </p>
      <p>
        <span class="mr-1">{{ isBestTime ? "👑 New best time 👑" : "🕑" }}</span>
        <span class="mr-4">{{ formatTime(stats.currentTime) }}</span>
        <span class="mr-1">{{ isBestMoves ? "👑 New best moves 👑" : "↻" }}</span>
        <span>{{ stats.currentMoves }} {{ isBestMoves ? "" : "moves" }}</span>
      </p>
    </div>

    <div>
      <AppButton icon="icon-cw" class="mr-4 lg:mr-8" />
      <AppButton icon="icon-right-open" />
    </div>
  </div>
</template>
