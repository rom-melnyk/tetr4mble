<script lang="ts" setup>
import Logo from "./Logo.vue"
import { LevelStats } from "../../providers/stats"
import { DifficultyLevel } from "../../providers/difficulty"

defineProps<{
  name: string;
  difficulty: DifficultyLevel;
  stats: LevelStats;
}>()
</script>

<template>
  <Teleport to="#tetr4mble > footer">
    <div class="flex flex-row justify-between items-center text-paper-dark dark:text-ink-light">
      <Logo class="h-4 text-ink dark:text-paper"/>
      <div class="text-sm">{{ name }}</div>
      <div>
        <span class="text-ink dark:text-paper mr-1">↻</span>
        <span class="mr-4 text-sm">{{ stats.currentMoves }}</span>
        <span class="text-ink dark:text-paper mr-1">🕑</span>
        <span class="text-sm">{{ stats.currentTime }}</span>
      </div>
    </div>
  </Teleport>
</template>
