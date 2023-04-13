<script setup lang="ts">
import { ref } from "vue"
import Menu from "./components/Menu.vue"

const isBlurred = ref(false)
const toggleBlurred = (isHidden: boolean) => (isBlurred.value = !isHidden)
</script>

<template>
  <Menu @hide="toggleBlurred" />

  <header class="box-content p-4 lg:p-8 transition-all" :class="{ 'with-blur': isBlurred }">
    <!-- Teleport target -->
  </header>

  <main class="flex-1 p-4 lg:p-8 overflow-hidden border-y border-y-asphalt dark:border-y-chalk transition-all"
        :class="{ 'with-blur': isBlurred }"
  >
    <div class="h-full overflow-hidden">
      <router-view />
    </div>
  </main>

  <footer class="flex flex-row justify-between py-2 px-4 lg:px-8 transition-all"
          :class="{ 'with-blur': isBlurred }"
  >
    <span class="text-sm">Tetr④mble</span>
    <span class="text-sm">Stats</span>
    <span class="text-sm text-asphalt-light dark:text-chalk-dark">&copy; rom</span>
  </footer>
</template>

<style scoped>
.with-blur {
  @apply blur-md opacity-25 -z-10;
}
</style>
