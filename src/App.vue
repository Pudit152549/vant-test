<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { loadUserProfile } from './lib/LineLiff'

const LIFF_ID = '2008291244-OWyLQ4Wa'

onMounted(async () => {
  await loadUserProfile(LIFF_ID)
})
</script>

<style scoped></style>
