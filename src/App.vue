<script setup>
import PlayField from "@/components/PlayField.vue"
</script>

<template>
  <header class="flex flex-row justify-between p-4 sm:p-8 border-b border-b-asphalt dark:border-b-chalk">
    <span class="text-xl">Tetr④mble</span>
    <span class="text-xl">≡</span>
  </header>

  <main class="flex-1 p-4 sm:p-8">
    <PlayField />
  </main>

  <footer class="flex flex-row justify-between py-2 px-4 sm:px-8 border-t border-t-asphalt dark:border-t-chalk">
    <span class="text-sm">Stats</span>
    <span class="text-sm text-asphalt-light dark:text-chalk-dark">&copy; rom</span>
  </footer>
</template>
