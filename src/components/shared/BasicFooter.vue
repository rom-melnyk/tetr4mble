<script lang="ts" setup>
import Logo from "./Logo.vue"
</script>

<template>
  <Teleport to="#tetr4mble > footer">
    <div class="flex flex-row justify-between items-center text-ink dark:text-paper">
      <div class="text-sm">Tetr④mble</div>
      <Logo class="h-4 text-ink dark:text-paper"/>
      <div class="text-sm">
        &copy;
        <a href="https://melnyk.site" tabindex="-1">Roman Melnyk</a>
        2023-{{ new Date().getFullYear() }}
      </div>
    </div>
  </Teleport>
</template>
