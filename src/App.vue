<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import liff from '@line/liff'
import { useProfileStore } from './stores/profile'

const LIFF_ID = '2008291244-OWyLQ4Wa'
const profileStore = useProfileStore()

onMounted(async () => {
  try {
    await liff.init({ liffId: LIFF_ID })

    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: window.location.href })
      return
    }

    const profile = await liff.getProfile()
    console.log('LIFF profile:', profile)

    // ✅ เก็บค่าที่ได้ลงใน store (ซึ่ง persist ด้วย useStorage)
    profileStore.form.userId = profile.userId
    profileStore.form.displayName = profile.displayName
    profileStore.form.pictureUrl = profile.pictureUrl || ''

  } catch (error) {
    console.error('LIFF initialization failed:', error)
  }
})
</script>

<style scoped></style>
