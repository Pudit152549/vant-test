<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { checkIsInLineApp } from '../lib/LineLiff'
import { useProfileStore } from '../stores/profile'

const profile = useProfileStore()
const isInClient = ref(false)
const loading = ref(true)
const LIFF_ID = '2008291244-OWyLQ4Wa'
const clickGoBack = () => history.back();

onMounted(async () => {
  isInClient.value = await checkIsInLineApp(LIFF_ID)
  loading.value = false
})
</script>

<template>
<div class="w-full min-h-dvh bg-[#9fcaf4] flex" style="--van-nav-bar-height: 46px;">
    <van-nav-bar fixed placeholder 
    title="Line Access Check" 
    left-text="Back"
    left-arrow
    @click-left="clickGoBack"
    class="custom-navbar"/>
    <main class="flex-1 px-0 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <div class="p-4 text-center">
            <van-row justify="center">
            <h2 class="text-2xl font-bold text-blue-500 text-center">ตรวจสอบช่องทางการเข้าถึง</h2>
                <van-divider :style="{ borderColor: '#1989fa' }" />
                    <img 
                    v-if="profile.form.pictureUrl"
                    :src="profile.form.pictureUrl"
                    alt="Profile"
                    class="w-[10rem] h-[10rem] rounded-full object-cover"
                    />
                <p v-if="isInClient">✅ เปิดผ่านแอป LINE</p>
                <p v-else>🌐 เปิดผ่านเบราว์เซอร์ทั่วไป</p>
            </van-row>
        </div>
    </main>
</div>
</template>

<style scoped>
.custom-navbar {
  --van-nav-bar-background-color: #1989fa;
  --van-background-2: #1989fa;
  background-color: #1989fa;
  --van-nav-bar-title-text-color: #ffffff; 
  --van-nav-bar-text-color: #ffffff;
}

/* เจาะ element ภายใน */
:deep(.van-nav-bar) {
  background-color: var(--van-nav-bar-background-color) !important;
}
:deep(.van-nav-bar__placeholder) {
  background-color: #1989fa;
}
</style>
