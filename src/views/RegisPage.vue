<script setup lang="ts">
import { ref } from 'vue'
import { showToast, showNotify, showDialog } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const onRegister = async (values: any) => {
  console.log('submit', values)

  // เช็คว่ากรอกครบทุกช่องหรือยัง
  if (!username.value || !firstname.value || !lastname.value || !email.value || !password.value || !confirmPassword.value) {
    showNotify({
      type: 'danger',
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
    })
    return
  }

  // เช็คว่า password ตรงกับ confirmPassword ไหม
  if (password.value !== confirmPassword.value) {
    showNotify({
      type: 'danger',
      message: 'รหัสผ่านไม่ตรงกัน',
    })
    return
  }

  // สำเร็จ
  await showDialog({
    title: 'แจ้งเตือน',
    message: 'ลงทะเบียนสำเร็จ',
  })
  // กลับไปหน้า Login
  router.push('/')
}

const onClickLeft = () => history.back()

// NumberKeyboard
const show = ref(false)
const onInput = (value: string) => {
  showToast(value)
}
const onDelete = () => {
  showToast('delete')
}
</script>

<template>
  <div class="w-full min-h-dvh flex flex-col bg-white">
    <van-nav-bar fixed placeholder 
    title="Register" 
    left-text="Back" 
    left-arrow 
    @click-left="onClickLeft" 
    class="custom-navbar"/>

    <main class="flex-1 px-0 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <h2 class="text-2xl font-bold text-blue-500 text-center">Register</h2>
      <van-divider :style="{ borderColor: '#1989fa' }" />

      <van-form @submit="onRegister" class="flex flex-col mt-4">
        <van-cell-group inset>
          <van-field v-model="username" name="username" label="Username" placeholder="Username" :rules="[{ required: true, message: 'Username is required' }]" />
          <van-field v-model="firstname" name="firstname" label="Firstname" placeholder="Firstname" :rules="[{ required: true, message: 'Firstname is required' }]" />
          <van-field v-model="lastname" name="lastname" label="Lastname" placeholder="Lastname" :rules="[{ required: true, message: 'Lastname is required' }]" />
          <van-field v-model="email" name="Email" label="Email" placeholder="Email" :rules="[{ required: true, message: 'Email is required' }]" />
          <van-field v-model="password" type="password" name="Password" label="Password" placeholder="Password" :rules="[{ required: true, message: 'Password is required' }]" />
          <van-field v-model="confirmPassword" type="password" name="ConfirmPassword" label="Confirm Password" placeholder="Confirm Password" :rules="[{ required: true, message: 'Confirm Password is required' }]" />
        </van-cell-group>

        <van-cell title="Show Keyboard" is-link @click="show = true" />

        <van-number-keyboard
          :show="show"
          close-button-text="Close"
          @blur="show = false"
          @input="onInput"
          @delete="onDelete"
        />

        <van-divider :style="{ borderColor: '#1989fa' }" />

        <div class="mt-4 px-4">
          <van-button round block type="primary" native-type="submit">
            Register
          </van-button>
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
:deep(.van-nav-bar .van-icon) {
    color: #ffffff;
}
</style>
