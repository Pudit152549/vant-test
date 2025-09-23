<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'

const username = ref('')
const password = ref('')
const active = ref(0)

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
    <van-nav-bar
      fixed
      placeholder
      title="Login"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- Content -->
    <main class="flex-1 px-4 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <h2 class="text-2xl font-bold text-blue-500">Welcome to Login Page</h2>

      <van-form @submit="onSubmit" class="flex flex-col">
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

        <!-- Submit button -->
        <div class="mt-4">
          <van-button round block type="primary" native-type="submit">
            Submit
          </van-button>
        </div>
      </van-form>
    </main>

    <!-- Tabbar -->
    <van-tabbar v-model="active" fixed safe-area-inset-bottom>
      <van-tabbar-item icon="home-o">Tab</van-tabbar-item>
      <van-tabbar-item icon="search">Tab</van-tabbar-item>
      <van-tabbar-item icon="friends-o">Tab</van-tabbar-item>
      <van-tabbar-item icon="setting-o">Tab</van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<style scoped>

</style>
