<script setup lang="ts">
import { ref } from 'vue'
import { showDialog } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')

const onLogin = async (values: Record<string, string>) => {
  if (!values.Username || !values.Password) return

  await showDialog ({
    title: 'แจ้งเตือน',
    message: 'ล็อกอินสำเร็จ',
  })

  // TODO: ไปหน้าถัดไป / เรียก API / reset form ได้ตรงนี้
  router.push('/home')
}

</script>

<template>
  <div class="max-w-md mx-auto min-h-dvh flex flex-col bg-white">
    <van-nav-bar fixed placeholder title="Login"/>

    <main class="flex-1 px-4 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <h2 class="text-2xl font-bold text-blue-500">Welcome to Login Page</h2>
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
      <van-form @submit="onLogin" class="flex flex-col mt-4">
        <van-cell-group inset>
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
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
        <div class="mt-4">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :disabled="!username || !password"
          >
            Submit
          </van-button>
          <div class="mt-4">
            <van-row justify="center">
              <van-button plain 
              type="primary" 
              size="small"
              >
              Register
              </van-button>
            </van-row>
          </div>
        </div>
      </van-form>
    </main>
  </div>
</template>

<style scoped>

</style>
