<template>
  <div class="w-full min-h-dvh bg-[#9fcaf4] flex flex-col" style="--van-nav-bar-height: 46px;">
    <!-- Navbar -->
    <van-nav-bar
      fixed
      placeholder
      title="Line Access Check"
      left-text="Back"
      left-arrow
      @click-left="clickGoBack"
      class="custom-navbar"
    />

    <!-- Main -->
    <main class="flex-1 flex flex-col items-center justify-start pt-20 px-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <!-- ระหว่างตรวจสอบ -->
      <div v-if="loading" class="flex flex-col items-center justify-center gap-3">
        <van-loading size="32px" type="spinner" />
        <div class="text-blue-700/80">กำลังตรวจสอบ...</div>
      </div>
      <!-- แสดงผลหลังตรวจสอบ -->
      <div v-else class="text-center">
        <h2 class="text-2xl font-bold text-blue-500 mb-3">ตรวจสอบช่องทางการเข้าถึง</h2>
        <van-divider :style="{ borderColor: '#1989fa' }" />

        <img
          v-if="profile.form.pictureUrl"
          :src="profile.form.pictureUrl"
          alt="Profile"
          class="w-[10rem] h-[10rem] rounded-full object-cover mx-auto mb-4"
        />
        <p v-if="isInClient">✅ เปิดผ่านแอป LINE</p>
        <p v-else>🌐 เปิดผ่านเบราว์เซอร์ทั่วไป</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { checkIsInLineApp } from '../lib/LineLiff'
import { useProfileStore } from '../stores/profile'
import { useRouter } from 'vue-router'

const router = useRouter()
const profile = useProfileStore()
const isInClient = ref(false)
const loading = ref(true)
const LIFF_ID = '2008291244-OWyLQ4Wa'

const clickGoBack = () => router.push('/profile')

onMounted(async () => {
  isInClient.value = await checkIsInLineApp(LIFF_ID)
  loading.value = false
})
</script>

<style scoped>
.custom-navbar {
  --van-nav-bar-background-color: #1989fa;
  --van-background-2: #1989fa;
  background-color: #1989fa;
  --van-nav-bar-title-text-color: #ffffff;
  --van-nav-bar-text-color: #ffffff;
}

:deep(.van-nav-bar) {
  background-color: var(--van-nav-bar-background-color) !important;
}
:deep(.van-nav-bar__placeholder) {
  background-color: #1989fa;
}
:deep(.van-nav-bar .van-icon) {
  color: #ffffff !important;
}
</style>
