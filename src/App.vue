<script setup lang="ts">
import { ref } from "vue"
import Menu from "@/components/Menu.vue"
import Logo from "@/components/header-footer/Logo.vue"

const isBlurred = ref(false)
const toggleBlurred = (isHidden: boolean) => (isBlurred.value = !isHidden)
</script>

<template>
  <div v-if="isBlurred" class="shade absolute inset-0"></div>
  <Menu @hide="toggleBlurred" />

  <header class="box-content h-[2em] p-4 lg:p-8 transition-all" :class="[ isBlurred ? 'with-blur' : '' ]">
    <Logo class="block mx-auto h-8 text-asphalt-light dark:text-chalk-dark"/>
  </header>

  <main class="flex-1 p-4 lg:p-8 overflow-hidden border-y border-y-asphalt dark:border-y-chalk transition-all"
        :class="[ isBlurred ? 'with-blur' : '' ]"
  >
    <div class="h-full overflow-hidden">
      <router-view />
    </div>
  </main>

  <footer class="flex flex-row justify-between py-2 px-4 lg:px-8 transition-all"
          :class="[ isBlurred ? 'with-blur' : '' ]"
  >
    <span class="text-sm">Tetr④mble</span>
    <span class="text-sm">Stats</span>
    <span class="text-sm text-asphalt-light dark:text-chalk-dark">&copy; rom</span>
  </footer>
</template>

<style scoped>
.with-blur {
  @apply blur-md opacity-50 -z-10;
}
</style>
