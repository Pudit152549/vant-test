<script setup lang="ts">
import { ref } from 'vue'
import { showDialog, showToast } from 'vant'
import { useRouter } from 'vue-router'

const active = ref(0)
const router = useRouter()
    const tel = ref('13000000000');
    const name = ref('John Snow');
    const onEdit = () => showToast('edit');
const onClickLeft = () => history.back();
const onLogout = () => {
  showDialog({
    title: 'Notification',
    message: 'Are you sure you want to logout?',
    showCancelButton: true, // ให้มีปุ่ม Cancel
  })
    .then(() => {
      // กด confirm
      router.push('/') // กลับไปหน้า Login
      console.log('user logged out')
    })
    .catch(() => {
      // กด cancel
      console.log('cancel logout')
    })
}

</script>

<template>
  <div class="w-full min-h-dvh flex flex-col bg-white">
    <van-nav-bar fixed placeholder title="การตั้งค่า" 
    left-text="Back"
    left-arrow
    @click-left="onClickLeft"/>

    <main class="flex-1 px-0 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <h2 class="text-2xl font-bold text-blue-500 text-center">Profile Setting</h2>
      <van-divider :style="{ borderColor: '#1989fa' }" />
        <div class="my-4">
          <van-row justify="center">
            <van-image
            round
            width="10rem"
            height="10rem"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
          </van-row>
        </div>
        <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
      <van-divider :style="{ borderColor: '#1989fa' }" />
        <div class="mt-4 px-4">
        <van-row justify="center">
          <van-button
            type="danger"
            size="small"
            @click="onLogout"
          >
            Logout
          </van-button>
        </van-row>
      </div>
    </main>
    <van-tabbar route v-model="active" fixed safe-area-inset-bottom>
      <van-tabbar-item replace to="/home" icon="home-o">หน้าแรก</van-tabbar-item>
      <van-tabbar-item icon="search">ค้นหา</van-tabbar-item>
      <van-tabbar-item icon="friends-o">เพื่อน</van-tabbar-item>
      <van-tabbar-item icon="setting-o">การตั้งค่า</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>

</style>
