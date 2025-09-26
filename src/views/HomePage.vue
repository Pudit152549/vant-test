<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useRouter } from 'vue-router'

const { width } = useWindowSize()
const isDesktop = computed(() => width.value > 1028)
const router = useRouter()

const navbar = ref(0)
const search = ref('')
const activeNames = ref(['1'])
const currentPage = ref(1)
const sidebar = ref(0)
// กำหนด path ของแต่ละ index ของ Sidebar
const menuRoutes: string[] = [
  '/home',
  '/search',
  '/friends',
  '/profile'
]

const onSidebarChange = (index: number) => {
  const path = menuRoutes[index]
  if (path) {
    router.push(path)
  }
}
</script>

<template>
  <div class="w-full min-h-dvh bg-white flex">
    <template v-if="isDesktop">
      <!-- Sidebar (ซ้าย) -->
      <div class="min-h-dvh border-r border-gray-200 sticky top-0"
           style="--van-sidebar-width: 200px;">
        <div class="pt-[60px]">
          <van-sidebar v-model="sidebar" @change="onSidebarChange">
            <van-sidebar-item title="หน้าแรก" />
            <van-sidebar-item title="ค้นหา" disabled/>
            <van-sidebar-item title="เพื่อน" disabled/>
            <van-sidebar-item title="การตั้งค่า" />
          </van-sidebar>
        </div>
      </div>

      <!-- Content (ขวา) -->
      <div class="flex-1 flex flex-col">
        <van-nav-bar fixed placeholder title="หน้าแรก" />
        <main class="flex-1 px-6 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
          <h2 class="text-2xl font-bold text-blue-500 text-center">Welcome to Home Page</h2>
          <van-divider :style="{ borderColor: '#1989fa' }" />
          <van-search v-model="search" placeholder="Search" />
          <van-divider :style="{ borderColor: '#1989fa' }" />

          <van-collapse v-model="activeNames" class="mt-2">
            <van-collapse-item title="Card 1" name="1">
              <van-card
                num="2" price="2.00" title="Title" desc="Description"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
              />
            </van-collapse-item>
            <van-collapse-item title="Card 2" name="2">
              <van-card
                num="2" tag="Tag" price="2.00" title="Title" desc="Description"
                origin-price="10.00"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
              />
            </van-collapse-item>
          </van-collapse>

          <div class="mt-4">
            <van-pagination v-model="currentPage" :total-items="24" :items-per-page="4" />
          </div>
        </main>
      </div>
    </template>
    <template v-else>
      <div class="w-full flex-1 flex flex-col">
        <van-nav-bar fixed placeholder title="หน้าแรก" />
        <main class="flex-1 px-0 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
          <h2 class="text-2xl font-bold text-blue-500 text-center">Welcome to Home Page</h2>
          <van-divider :style="{ borderColor: '#1989fa' }" />
          <van-search v-model="search" placeholder="Search" />
          <van-divider :style="{ borderColor: '#1989fa' }" />

          <!-- มือถือไม่ใช้ sidebar -->
          <van-collapse v-model="activeNames">
            <van-collapse-item title="Card 1" name="1">
              <van-card
                num="2" price="2.00" title="Title" desc="Description"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
              />
            </van-collapse-item>
            <van-collapse-item title="Card 2" name="2">
              <van-card
                num="2" tag="Tag" price="2.00" title="Title" desc="Description"
                origin-price="10.00"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
              />
            </van-collapse-item>
          </van-collapse>

          <div class="mt-4 px-3">
            <van-pagination v-model="currentPage" :total-items="24" :items-per-page="4" />
          </div>
        </main>

        <!-- Tabbar เฉพาะจอเล็ก -->
        <van-tabbar route v-model="navbar" fixed safe-area-inset-bottom>
          <van-tabbar-item icon="home-o">หน้าแรก</van-tabbar-item>
          <van-tabbar-item icon="search">ค้นหา</van-tabbar-item>
          <van-tabbar-item icon="friends-o">เพื่อน</van-tabbar-item>
          <van-tabbar-item replace to="/profile" icon="setting-o">การตั้งค่า</van-tabbar-item>
        </van-tabbar>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* ให้ sidebar สูงพอดีจอ (คำนึงถึง NavBar fixed) */
</style>
