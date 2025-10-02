<!-- src/views/HomePage.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const search = ref('')
const activeNames = ref<string[]>(['1'])
const currentPage = ref(1)
// const images = [
//       'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
//       'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
//     ];
</script>

<template>
  <!-- AppLayout จะห่อหน้านี้ให้เอง -->
  <section>
    <h2 class="text-2xl font-bold text-blue-500 text-center">Welcome to Home Page</h2>
    <van-divider :style="{ borderColor: '#1989fa' }" />

    <van-search v-model="search" placeholder="Search" />
    <van-divider content-position="left" :style="{ color: '#1989fa', borderColor: '#1989fa' }" >News</van-divider>
    <van-collapse v-model="activeNames" class="mt-2">
      <van-collapse-item title="News 1" name="1">
        <van-card
          num="2"
          price="2.00"
          title="Title"
          desc="Description"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
        />
      </van-collapse-item>

      <van-collapse-item title="News 2" name="2">
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
    <van-divider :style="{ borderColor: '#1989fa' }" />
    <div class="mt-4">
      <van-pagination v-model="currentPage" :total-items="24" :items-per-page="4" />
    </div>
  </section>
</template>

<style scoped>

</style>
