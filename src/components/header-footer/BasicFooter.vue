<script lang="ts" setup>
import Logo from "./Logo.vue"
</script>

<template>
  <Teleport to="#tetr4mble > footer">
    <div class="flex flex-row justify-between items-center text-paper-dark dark:text-ink-light">
      <div class="text-sm">Tetr④mble</div>
      <Logo class="h-4 text-ink dark:text-paper"/>
      <div class="text-sm">&copy; rom, 2023</div>
    </div>
  </Teleport>
</template>
