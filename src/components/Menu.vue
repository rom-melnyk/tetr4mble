<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import AppButton from "./shared/AppButton.vue"

const emit = defineEmits(["hide" /** @param {boolean} isHidden */])
const router = useRouter()
const isHidden = ref(true)

emit('hide', isHidden.value)

const toggleHidden = () => {
  isHidden.value = !isHidden.value
  emit('hide', isHidden.value)
}
const navigate = (path: string) => {
  router.push(path)
  toggleHidden()
}
</script>

<template>
  <div v-if="!isHidden"
       class="absolute inset-0"
       @click="toggleHidden"
  ></div>

  <AppButton v-if="isHidden"
             icon="⁝"
             class="absolute top-4 right-4 lg:top-8 lg:right-8"
             @click="toggleHidden"
  />
  <aside class="absolute top-0 bottom-0 p-4 lg:p-8
                border-l border-l-asphalt dark:border-l-chalk
                bg-chalk dark:bg-asphalt
                transition-all"
         :class="[ isHidden ? '-right-[8em]' : 'right-0' ]"
  >
    <AppButton icon=">" class="block mb-8 lg:mb-16" @click="toggleHidden" />
    <AppButton icon="≡" class="block mb-4 lg:mb-8" @click="navigate('/select-level')" />
    <AppButton icon="L" class="block mb-4 lg:mb-8" @click="navigate('/level')" />
    <AppButton icon="?" class="block mb-4 lg:mb-8" @click="navigate('/how-to')" />
    <AppButton icon="4" class="block mb-4 lg:mb-8" @click="navigate('/about')" />
  </aside>
</template>

<style scoped>
</style>