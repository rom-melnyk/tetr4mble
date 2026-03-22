<script lang="ts" setup>
import { type DifficultyLevel, maxDifficulty } from "../../providers/difficulty"

defineProps<{
  name: string;
  difficulty: DifficultyLevel;
}>()
const difficultyPercentages = Array(maxDifficulty)
  .fill(null)
  .map((_, d) => 25 + ((100 - 25) / maxDifficulty) * (d + 1))
</script>

<template>
  <span class="whitespace-nowrap">
    <span class="mr-4">{{ name }}</span>
    <span class="difficulty inline-block h-[.75em]">
      <span v-for="(dp, i) in difficultyPercentages"
            :key="`dp-${i + 1}`"
            class="inline-block w-1 mr-0.5"
            :class="{
              'bg-ink dark:bg-paper': i + 1 <= difficulty,
              'border border-ink dark:border-paper': i + 1 > difficulty,
            }"
            :style="{ height: `${dp}%` }"
      ></span>
    </span>
  </span>
</template>
