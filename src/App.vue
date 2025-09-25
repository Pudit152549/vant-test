<!-- src/App.vue -->
<template>
  <router-view />

  <div class="p-4 text-center">
    <p>Window width: {{ width }}</p>
    <p>Window height: {{ height }}</p>
  </div>
</template>


<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
</script>

<style scoped>
</style>
