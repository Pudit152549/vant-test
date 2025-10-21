<script setup lang="ts">
import { ref } from 'vue'
// import { showNotify, } from 'vant'
//import { useRouter } from 'vue-router'

//const router = useRouter()
const value = ref('');
const showKeyboard = ref(true);
// showNotify({
//       type: 'danger',
//       message: 'กรุณาลองใหม่อีกครั้ง',
//     })
</script>

<template>
<div class="w-full min-h-dvh flex flex-col bg-[#9fcaf4]">
    <main class="flex-1 px-0 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <h2 class="text-2xl font-bold text-blue-500 text-center">กรุณาใส่ PIN</h2>
        <van-divider :style="{ borderColor: '#1989fa' }" />
            <van-password-input
            :value="value"
            :gutter="6"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
            />
            <van-number-keyboard
            v-model="value"
            :show="showKeyboard"
            @blur="showKeyboard = false"
            />
            <van-divider :style="{ borderColor: '#1989fa' }" />
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
:deep(.van-password-input__security li) {
  border-color: #bbebff !important;
} 
</style>
