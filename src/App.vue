<script setup lang="ts">
import { ref } from "vue"
import Menu from "./components/Menu.vue"
import Logo from "./components/shared/Logo.vue"

const isBlurred = ref(false)
const toggleBlurred = (isHidden: boolean) => (isBlurred.value = !isHidden)
</script>

<template>
  <Menu @hide="toggleBlurred" />

  <header class="p-4 lg:p-8 transition-all flex flex-row justify-between items-center"
          :class="{ 'with-blur': isBlurred }"
  >
    <div id="back-button" class="w-12"><!-- Teleport target --></div>
    <Logo class="block mx-auto my-2 h-8 text-ink dark:text-paper"/>
    <div class="w-12"><!-- Placeholder; balances the appearance --></div>
  </header>

  <div id="minifield"
       class="absolute top-4 lg:top-8 left-4 lg:left-8 opacity-30"
       :class="{ 'with-blur': isBlurred }"
  >
    <!-- Teleport target (check `Level.vue`) -->
  </div>

  <main class="flex-1 overflow-hidden p-4 lg:p-8 border-b border-b-ink dark:border-b-paper transition-all"
        :class="{ 'with-blur': isBlurred }"
  >
    <div class="h-full overflow-hidden">
      <router-view />
    </div>
  </main>

  <footer class="py-2 px-4 lg:px-8 transition-all"
          :class="{ 'with-blur': isBlurred }"
  >
    <!-- Teleport target -->
  </footer>
</template>

<style scoped>
@reference "./styles/main.css";

.with-blur {
  @apply blur-md opacity-25 -z-10;
}
</style>
