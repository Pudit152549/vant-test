<script setup lang="ts">
import { ref } from 'vue'
// import { showNotify, } from 'vant'
//import { useRouter } from 'vue-router'

//const router = useRouter()
const value = ref('');
const showKeyboard = ref(false);
// showNotify({
//       type: 'danger',
//       message: 'กรุณาลองใหม่อีกครั้ง',
//     })
</script>

<template>
<div class="w-full min-h-dvh flex flex-col bg-white">
    <main class="flex-1 px-0 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <h2 class="text-2xl font-bold text-blue-500 text-center">กรุณาใส่ PIN</h2>
        <van-divider :style="{ borderColor: '#1989fa' }" />
            <van-password-input
            :value="value"
            :gutter="6"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
            class="custom-password-input"
            />
            <van-number-keyboard
            v-model="value"
            :show="showKeyboard"
            @blur="showKeyboard = false"
            />
            <van-divider :style="{ borderColor: '#1989fa' }" />
            <div class="mt-4 text-center">
            <van-button plain type="primary" size="small">
              ลืมรหัส PIN
            </van-button>
          </div>
        </main>
    </div>
</template>

<style scoped>
.custom-password-input :deep(.van-password-input__security li) {
  background-color: #c8e6ff !important;  /* สีพื้นช่อง */
  border: 1px solid #bbebff !important;  /* สีเส้นกรอบช่อง */
}

/* ตอนโฟกัส (กรอบ active) — Vant ใส่คลาส --focused ที่รายการ */
.custom-password-input :deep(.van-password-input__item--focused) {
  border-color: #1989fa !important;
}

/* บางธีมใช้เส้นผ่าน pseudo-element */
.custom-password-input :deep(.van-password-input__security li::after) {
  border-color: #1989fa !important;
}
</style>
