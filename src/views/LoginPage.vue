<script setup lang="ts">
import { ref } from 'vue'
import { showDialog } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')

const onLogin = async (values: Record<string, string>) => {
  if (!values.Username || !values.Password) return

  await showDialog({
    title: 'แจ้งเตือน',
    message: 'ล็อกอินสำเร็จ',
  })

  router.push('/home')
}
</script>

<template>
  <!-- เปลี่ยนเป็น w-full และตัด max-w-md/mx-auto ออก -->
  <div class="w-full min-h-dvh flex flex-col bg-white">
    <van-nav-bar fixed placeholder 
    title="Login" 
    class="custom-navbar"/>

    <!-- เอา padding ข้างออกให้เต็มหน้าจอ -->
    <main class="flex-1 px-0 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <h2 class="text-2xl font-bold text-blue-500 text-center">Welcome to Login Page</h2>

      <!-- divider ให้เต็มขอบ -->
      <van-divider :style="{ borderColor: '#1989fa' }" />

      <van-form @submit="onLogin" class="flex flex-col mt-4">
        <!-- ลบ inset เพื่อให้ cell-group กว้างเต็ม -->
        <van-cell-group>
          <van-field
            v-model="username"
            name="Username"
            label="Username"
            placeholder="Username"
            :rules="[{ required: true, message: 'Username is required' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="Password"
            label="Password"
            placeholder="Password"
            :rules="[{ required: true, message: 'Password is required' }]"
          />
        </van-cell-group>

        <van-divider :style="{ borderColor: '#1989fa' }" />

        <div class="mt-4 px-4">
          <!-- block = เต็มความกว้างของ container; container ตอนนี้ก็คือทั้งหน้าแล้ว -->
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :disabled="!username || !password"
          >
            Submit
          </van-button>

          <div class="mt-4 text-center">
            <van-button plain type="primary" size="small" @click="$router.push('/register')">
              Register
            </van-button>
          </div>
        </div>
      </van-form>
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
