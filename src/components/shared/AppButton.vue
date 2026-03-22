<script lang="ts" setup>
defineProps<{
  icon?: string;
  title?: string;
}>()
</script>

<template>
  <button type="button">
    <i v-if="icon" :class="icon" />
    <span v-if="title">{{ title }}</span>
  </button>
</template>

<style scoped>
@reference "../../styles/main.css";

button {
  @apply border-0 outline-0 text-accent cursor-pointer;
  @apply h-12 min-w-12 inline-flex flex-row justify-center items-center;

  &[disabled] {
    @apply cursor-not-allowed text-ink-light dark:text-paper-dark;
  }

  & > * {
    @apply leading-none not-italic;
  }

  & > i {
    @apply /* text-[1.25em] */ font-bold;

    &:not(:last-child) {
      @apply ml-4 mr-2;
    }
  }

  & > span {
    @apply mr-4;

    &:is(:first-child) {
      @apply ml-4;
    }
  }
}
</style>