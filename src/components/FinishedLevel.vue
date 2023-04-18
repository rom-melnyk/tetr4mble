<script lang="ts" setup>
import { LevelStats } from "../providers/stats";
import { DifficultyLevel } from "../providers/difficulty";
import AppButton from "../components/shared/AppButton.vue";
import { formatTime } from "../utils";

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
  <div>
    <AppButton icon="<" />

    <section class="inline-block mx-8 lg:mx-16 text-xl">
      <p>
        🎉 Finished the "{{ name }}" at difficulty {{ difficulty }}!
      </p>
      <p>
        <span class="mr-1">{{ isBestTime ? "👑 New best time 👑" : "🕑" }}</span>
        <span class="mr-4">{{ formatTime(stats.currentTime) }}</span>
        <span class="mr-1">{{ isBestMoves ? "👑 New best moves 👑" : "↻" }}</span>
        <span>{{ stats.currentMoves }} {{ isBestMoves ? "" : "moves" }}</span>
      </p>
    </section>

    <span>
      <AppButton icon="↻" class="mr-4 lg:mr-8" />
      <AppButton icon=">" />
    </span>
  </div>
</template>
