<script lang="ts" setup>
defineProps<{
  icon?: string;
  title?: string;
}>()
</script>

<template>
  <button type="button" class="border-0 outline-0 text-accent cursor-pointer">
    <i v-if="icon" :class="icon" />
    <span v-if="title">{{ title }}</span>
  </button>
</template>

<style scoped>
button {
  &[disabled] {
    @apply cursor-not-allowed text-ink-light dark:text-paper-dark;
  }

  & > * {
    @apply inline-block align-middle py-4 leading-[1] not-italic text-center;
  }

  & > i {
    @apply w-[3em] font-bold;
  }

  & > span {
    @apply px-8;
  }
}
</style>