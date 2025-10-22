<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { checkIsInLineApp } from '../lib/LineLiff'

const isInClient = ref(false)
const loading = ref(true)
const LIFF_ID = '2008291244-OWyLQ4Wa'

onMounted(async () => {
  isInClient.value = await checkIsInLineApp(LIFF_ID)
  loading.value = false
})
</script>

<template>
<div class="w-full min-h-dvh bg-[#9fcaf4] flex" style="--van-nav-bar-height: 46px;">
  <div class="p-4 text-center">
    <h2 class="text-2xl font-bold text-blue-500 text-center">ตรวจสอบช่องทางการเข้าถึง</h2>
    <p v-if="isInClient">✅ เปิดผ่านแอป LINE</p>
    <p v-else>🌐 เปิดผ่านเบราว์เซอร์ทั่วไป</p>
  </div>
</div>
</template>
