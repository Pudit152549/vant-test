<script setup lang="ts">
import { ref } from 'vue'

const navbar = ref(0)
const search = ref('');
const activeNames = ref(['1']);
const currentPage = ref(1);


</script>

<template>
  <div class="w-full min-h-dvh flex flex-col bg-white">
    <van-nav-bar fixed placeholder title="หน้าแรก"/>

    <main class="flex-1 px-0 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <h2 class="text-2xl font-bold text-blue-500 text-center">Welcome to Home Page</h2>
      <van-divider :style="{ borderColor: '#1989fa' }" />
      <van-search v-model="search" placeholder="Search" />
      <van-divider :style="{ borderColor: '#1989fa' }" />
      <van-collapse v-model="activeNames">
        <van-collapse-item title="Card 1" name="1">
          <van-card
          num="2"
          price="2.00"
          title="Title"
          desc="Description"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
          />
        </van-collapse-item>
        <van-collapse-item title="Card 2" name="2">
          <van-card
            num="2"
            tag="Tag"
            price="2.00"
            title="Title"
            desc="Description"
            origin-price="10.00"
            thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
          />
        </van-collapse-item>
      </van-collapse>
      <van-pagination v-model="currentPage" :total-items="24" :items-per-page="5" />
    </main>
    

    <van-tabbar route v-model="navbar" fixed safe-area-inset-bottom>
      <van-tabbar-item icon="home-o">หน้าแรก</van-tabbar-item>
      <van-tabbar-item icon="search">ค้นหา</van-tabbar-item>
      <van-tabbar-item icon="friends-o">เพื่อน</van-tabbar-item>
      <van-tabbar-item replace to="/profile" icon="setting-o">การตั้งค่า</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>

</style>
