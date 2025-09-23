<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')

const onSubmit = (values: any) => {
  console.log('submit', values)
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
  <div class="max-w-md mx-auto min-h-dvh flex flex-col bg-white">
    <!-- NavBar -->
    <van-nav-bar fixed placeholder title="Register" left-text="Back" left-arrow @click-left="onClickLeft" />

    <!-- Content -->
    <main class="flex-1 px-4 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <h2 class="text-2xl font-bold text-blue-500">Register</h2>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
      <van-form @submit="onSubmit" class="flex flex-col mt-4">
        <van-cell-group inset>
          <van-field
            v-model="firstname"
            name="Firstname"
            label="Firstname"
            placeholder="Firstname"
            :rules="[{ required: true, message: 'Firstname is required' }]"
          />
          <van-field
            v-model="lastname"
            name="Lastname"
            label="Lastname"
            placeholder="Lastname"
            :rules="[{ required: true, message: 'Lastname is required' }]"
          />
          <van-field
            v-model="email"
            name="Email"
            label="Email"
            placeholder="Email"
            :rules="[{ required: true, message: 'Email is required' }]"
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

        <!-- ปุ่มโชว์คีย์บอร์ด -->
        <van-cell title="Show Keyboard" is-link @click="show = true" />

        <!-- Number keyboard -->
        <van-number-keyboard
          :show="show"
          close-button-text="Close"
          @blur="show = false"
          @input="onInput"
          @delete="onDelete"
        />
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
        <!-- Submit button -->
        <div class="mt-4">
          <van-button round block type="primary" native-type="submit">
            Submit
          </van-button>
        </div>
      </van-form>
    </main>
  </div>
</template>


<style scoped>

</style>
