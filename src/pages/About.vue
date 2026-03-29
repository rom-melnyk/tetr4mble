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

  <article>
    <h1>About</h1>
    <img src="../assets/mitsu-trium-aria.png" alt="Mitsubushi Trium Aria" class="float-left mr-4 lg:mr-8 mb-4 lg:mb-8">
    <p>
      A long time ago, in a galaxy of pixelated screens and monophonic ringtones,
      a humble Mitsubishi Trium carried a secret:
      a tiny puzzle that shuffled the cells of a figure and asked you to restore order&nbsp;—
      one rotation at a time.
      No color, no fanfare&nbsp;— just a 96&times;65 LCD and the quiet satisfaction
      of everything snapping back into place.
    </p>
    <p>
      Decades passed. The phone was lost to time. But the memory endured.
      <b>Tetr4mble</b> is its echo&nbsp;— reimagined with sharp graphics, handcrafted levels,
      and four difficulties to humble even the bravest.
      <br/>The rules remain unchanged: restore the figure.
      <br/>Leave no chaos. The galaxy is patient.
      <br/>Are you?
    </p>

    <div class="mt-4 text-center">
      <AppButton icon="icon-help" class="mr-4 lg:mr-8" @click="router.push('/how-to')" />
      <AppButton icon="icon-menu" class="" @click="router.push('/select-level')" />
    </div>
  </article>

  <BasicFooter />
</template>
