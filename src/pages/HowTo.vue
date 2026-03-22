<script lang="ts" setup>
import { useRouter } from "vue-router"
import BasicFooter from "../components/shared/BasicFooter.vue"
import AppButton from "../components/shared/AppButton.vue"

const router = useRouter()
</script>

<template>
  <Teleport to="#tetr4mble > header > #back-button" >
    <AppButton icon="icon-left-open" @click="router.back()" />
  </Teleport>

  <article class="md:w-xl mx-auto">
    <h1>Instructions</h1>
    <p>Bring the shuffled figure to its original way (it's shown in the header).</p>
    <p>
      Use <b>arrow keys</b> (or clicking anywhere on the figure) to move the cursor.
      <br/>
      Use <b>space</b> (or click <i>on the cursor</i>) to rotate the elements under cursor clockwise.
    </p>
    <p>Good luck!</p>
  </article>

  <BasicFooter />
</template>
