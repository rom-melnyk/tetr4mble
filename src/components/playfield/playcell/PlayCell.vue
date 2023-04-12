<script setup lang="ts">
import * as utils from "../../../utils";

defineProps<{ x: number; y: number; width: number; height: number }>()
const round4 = utils.round4
</script>

<template>
  <div class="absolute transition-all"
       :style="{
         width: `${round4(width)}%`,
         height: `${round4(height)}%`,
         top: `${round4(y)}%`,
         left: `${round4(x)}%`,
       }"
  >
    <slot />
  </div>
</template>
