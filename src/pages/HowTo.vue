<script lang="ts" setup>
import { useRouter } from "vue-router"
import AppButton from "../components/shared/AppButton.vue"
import BasicFooter from "../components/shared/BasicFooter.vue"

const router = useRouter()
</script>

<template>
  <Teleport to="#tetr4mble > header > #back-button" >
    <AppButton icon="icon-left-open" @click="router.back()" />
  </Teleport>

  <article class="md:w-xl mx-auto h-full overflow-y-auto">
    <h1>Instructions</h1>
    <p>Restore the shuffled figure to its original order. The target shape is shown in the top-left corner.</p>
    <p>
      Use <b>arrow keys</b> (or click anywhere on the field) to move the cursor.
      <br/>
      Use <b>space</b> (or click <i>on the cursor</i>) to rotate the cells under the cursor clockwise.
    </p>
    <p>Good luck!</p>
    <p class="text-sm italic mt-8">
      Inspired by an old game
      <br/>on iconic <a href="/about">Mitshubishi Trium</a> phone.
    </p>
  </article>

  <BasicFooter />
</template>
