<script lang="ts" setup>
import Logo from "../shared/Logo.vue"
import LevelNameAndDifficulty from "./LevelNameAndDifficulty.vue"
import { type LevelStats } from "../../providers/stats"
import { type DifficultyLevel, maxDifficulty } from "../../providers/difficulty"
import { formatTime } from "../../utils"

defineProps<{
  name: string;
  difficulty: DifficultyLevel;
  stats: LevelStats;
}>()
const difficultyPercentages = Array(maxDifficulty)
  .fill(null)
  .map((_, d) => 25 + ((100 - 25) / maxDifficulty) * (d + 1))
</script>

<template>
  <Teleport to="#tetr4mble > footer">
    <div class="flex flex-row justify-between items-center text-ink dark:text-paper">
      <Logo class="h-4 text-ink dark:text-paper"/>

      <LevelNameAndDifficulty class="text-sm" :name="name" :difficulty="difficulty" />

      <div>
        <i class="icon-clock text-ink dark:text-paper" />
        <span class="mr-4 text-sm">{{ formatTime(stats.currentTime) }}</span>
        <i class="icon-cw text-ink dark:text-paper" />
        <span class="text-sm">{{ stats.currentMoves }}</span>
      </div>
    </div>
  </Teleport>
</template>
