<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)


</script>

<template>
  <div class="max-w-md mx-auto min-h-dvh flex flex-col bg-white">
    <van-nav-bar fixed placeholder title="หน้าแรก"/>

    <main class="flex-1 px-4 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <h2 class="text-2xl font-bold text-blue-500">Welcome to Home Page</h2>
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
    </main>

    <van-tabbar route v-model="active" fixed safe-area-inset-bottom>
      <van-tabbar-item icon="home-o">หน้าแรก</van-tabbar-item>
      <van-tabbar-item icon="search">ค้นหา</van-tabbar-item>
      <van-tabbar-item icon="friends-o">เพื่อน</van-tabbar-item>
      <van-tabbar-item replace to="/profile" icon="setting-o">การตั้งค่า</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>

</style>
