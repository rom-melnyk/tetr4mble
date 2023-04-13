<script lang="ts" setup>
import BasicHeader from "../components/header-footer/BasicHeader.vue"
import { useLevels } from "../providers/level";
import MiniField from "../components/playfield/MiniField.vue";

const levels = useLevels()
</script>

<template>
  <BasicHeader />

  <div class="h-full flex flex-col">
    <h1 class="mb-4 lg:mb-8 text-2xl">Select level</h1>
    <div class="mb-4 lg:mb-8 pb-4 lg:pb-8 border-b border-b-chalk-dark dark:border-b-asphalt-light">Severity</div>

    <div class="flex-1 overflow-y-auto">
      <table class="border-separate border-spacing-y-4 lg:border-spacing-y-8">
        <tr v-for="(level, lid) in levels">
          <td>
            <MiniField :field="level.field" />
          </td>
          <td>
            <a :href="`/level/${lid}/4`"
               class="ml-4 lg:ml-4 text-accent"
            >{{ level.description }}</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
