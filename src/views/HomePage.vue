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
const show = ref(false);
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
    show.value = false
  }
}
</script>

<template>
  <div class="w-full min-h-dvh bg-[#9fcaf4] flex">
    <template v-if="isDesktop">
      <div class="w-full min-h-dvh bg-[#9fcaf4] flex"
      style="--van-sidebar-width: 200px;">
        <!-- Popup เมนูซ้าย -->
        <van-popup
          v-model:show="show"
          position="left"
          :style="{ width: '220px', height: 'calc(100dvh - 90px)',  }"
          :overlay="false"
          :lock-scroll="false"
          :close-on-click-overlay="false"
          :z-index="2000"
          class="custom-sidebar"
        >
          <van-sidebar v-model="sidebar" @change="onSidebarChange">
            <van-sidebar-item title="หน้าแรก" />
            <van-sidebar-item title="ค้นหา" disabled/>
            <van-sidebar-item title="เพื่อน" disabled/>
            <van-sidebar-item title="การตั้งค่า" />
          </van-sidebar>
        </van-popup>

        <!-- คอนเทนต์: เลื่อนขวาเมื่อเมนูเปิด -->
        <div
          class="flex-1 flex flex-col transition-all duration-300"
          :style="{ marginLeft: show ? '220px' : '0px' }"
        >
          <van-nav-bar fixed placeholder title="หน้าแรก" class="custom-navbar z-[3000]">
            <template #left>
              <van-icon name="bars" color="#ffffff" size="24" @click="show = !show" />
            </template>
          </van-nav-bar>

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
      </div>
    </template>
    <template v-else>
      <div class="w-full flex-1 flex flex-col">
        <van-nav-bar fixed placeholder title="หน้าแรก" class="custom-navbar"/>
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

.custom-sidebar {
  --van-sidebar-text-color: #1989fa;
  --van-sidebar-background-color: #6db3f9;
  --van-sidebar-selected-text-color: #ffffff;
  --van-sidebar-selected-background-color: #1808f6;
  --van-sidebar-selected-border-height: 60px;
}

/* เจาะ element ภายในของ sidebar */
:deep(.van-sidebar) {
  background-color: var(--van-sidebar-background-color) !important;
}

:deep(.van-sidebar-item) {
  color: var(--van-sidebar-text-color) !important;
}

:deep(.van-sidebar-item--selected) {
  color: var(--van-sidebar-selected-text-color) !important;
  background-color: var(--van-sidebar-selected-background-color) !important;
}
:deep(.van-sidebar-item--selected) {
  background-color: var(--van-sidebar-selected-background-color) !important;
}
:deep(.van-sidebar-item--selected .van-sidebar-item__text) {
  color: var(--van-sidebar-selected-text-color) !important;
}
</style>

