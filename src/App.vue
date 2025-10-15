<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import liff from '@line/liff'

const LIFF_ID = '2008291244-OWyLQ4Wa'

onMounted(async () => {
  try {
    await liff.init({ liffId: LIFF_ID })

    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: window.location.href })
      return
    }

    const profile = await liff.getProfile()
    console.log('LIFF profile:', profile)

    const url = new URL(window.location.href)
    if (url.search) {
      history.replaceState({}, '', url.origin + url.pathname)
    }
  } catch (error) {
    console.log(error, error);
    console.error('LIFF initialization failed:', error)
  }
})
</script>

<style scoped></style>
