<script lang="ts" setup>
defineProps({
  icon: String,
  title: {
    type: String,
    required: false,
    default: ""
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <span class="button" :class="{ disabled }">
    <i>{{ icon }}</i>
    <span v-if="title">{{ title }}</span>
  </span>
</template>

<style scoped>
.button {
  @apply border-accent rounded border-transparent hover:border-accent text-accent cursor-pointer;

  &.disabled {
    @apply cursor-not-allowed;
  }

  > * {
    @apply inline-block align-middle h-[2em] leading-[2em] not-italic text-center;
  }

  i {
    @apply w-[2em] font-bold;
  }

  span {
    @apply px-4;
  }
}
</style>