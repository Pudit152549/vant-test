<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { showDialog, showToast } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import { useWindowSize } from '@vueuse/core'

const router = useRouter()
const route = useRoute()

// --- Responsive: สลับ Sidebar/Tabbar ตามความกว้างจอ
const { width } = useWindowSize()
const isDesktop = computed(() => width.value > 1028)
const show = ref(false);
// --- โปรไฟล์
const tel = ref('13000000000')
const name = ref('John Snow')
const onEdit = () => showToast('edit')

// --- Navbar/Tabbar
const navbar = ref(0)

// --- Sidebar
const sidebar = ref(0)
const menuRoutes: string[] = ['/home', '/search', '/friends', '/profile']

const onSidebarChange = (index: number) => {
  const path = menuRoutes[index]
  if (path) router.push(path)
}

// sync active index ของ sidebar ตาม route ปัจจุบัน
const syncSidebarFromRoute = () => {
  const i = menuRoutes.indexOf(route.path)
  sidebar.value = i >= 0 ? i : 0
}
syncSidebarFromRoute()
watch(() => route.path, syncSidebarFromRoute)

// --- Logout dialog
const onLogout = () => {
  showDialog({
    title: 'Notification',
    message: 'Are you sure you want to logout?',
    showCancelButton: true,
  })
    .then(() => {
      router.push('/') // กลับไปหน้า Login
      console.log('user logged out')
    })
    .catch(() => {
      console.log('cancel logout')
    })
}

const onClickLeft = () => history.back()
</script>

<template>
  <div class="w-full min-h-dvh bg-[#9fcaf4] flex">
    <template v-if="isDesktop">
      <div class="w-full min-h-dvh bg-[#9fcaf4] flex" 
      style="--van-sidebar-width: 200px;">
        <!-- Popup Sidebar -->
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
            <van-sidebar-item title="ค้นหา" />
            <van-sidebar-item title="เพื่อน" />
            <van-sidebar-item title="การตั้งค่า" />
          </van-sidebar>
        </van-popup>

        <!-- Content: ดันขวาเมื่อ show = true -->
        <div
          class="flex-1 flex flex-col transition-all duration-300"
          :style="{ marginLeft: show ? '220px' : '0px' }"
        >
          <van-nav-bar fixed placeholder title="การตั้งค่า" class="custom-navbar z-[3000]">
            <template #left>
              <van-icon name="bars" color="#ffffff" size="24" @click="show = !show" />
            </template>
          </van-nav-bar>

          <main class="flex-1 px-6 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
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
                <van-button type="danger" size="small" @click="onLogout">Logout</van-button>
              </van-row>
            </div>
          </main>
        </div>
      </div>
    </template>

    <!-- ===== Mobile/Tablet: Content + Tabbar ===== -->
    <template v-else>
      <div class="w-full flex-1 flex flex-col">
        <van-nav-bar fixed placeholder title="การตั้งค่า" left-text="Back" left-arrow @click-left="onClickLeft" class="custom-navbar"/>

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
              <van-button type="danger" size="small" @click="onLogout">Logout</van-button>
            </van-row>
          </div>
        </main>

        <!-- Tabbar เฉพาะจอเล็ก -->
        <van-tabbar route v-model="navbar" fixed safe-area-inset-bottom>
          <van-tabbar-item replace to="/home" icon="home-o">หน้าแรก</van-tabbar-item>
          <van-tabbar-item replace to="/search" icon="search">ค้นหา</van-tabbar-item>
          <van-tabbar-item replace to="/friends" icon="friends-o">เพื่อน</van-tabbar-item>
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

