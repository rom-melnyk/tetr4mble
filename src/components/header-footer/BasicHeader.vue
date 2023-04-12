<script lang="ts" setup>
import Logo from "./Logo.vue"
</script>

<template>
  <Teleport to="#tetr4mble > header">
    <Logo class="block mx-auto h-8 text-asphalt-light dark:text-chalk-dark"/>
  </Teleport>
</template>
