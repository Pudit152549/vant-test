<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'

const { width } = useWindowSize()
const isDesktop = computed(() => width.value > 1028)

const router = useRouter()
const route = useRoute()

const navbar = ref(0)
const sidebar = ref(0)
const show = ref(false)
const navTitle = computed(() => {
  const t = (route.meta as Record<string, unknown>).title
  return typeof t === 'string' ? t : 'หน้าแรก'
})
const menuRoutes: string[] = ['/home', '/search', '/friends', '/profile']

watchEffect(() => {
  const idx = menuRoutes.indexOf(route.path)
  sidebar.value = idx >= 0 ? idx : 0
})

const onSidebarChange = (index: number) => {
  const path = menuRoutes[index]
  if (path) {
    router.push(path)
    show.value = false
  }
}
</script>

<template>
  <div class="w-full min-h-dvh bg-[#9fcaf4] flex" style="--van-nav-bar-height: 46px;">
    <template v-if="isDesktop">
      <!-- NavBar -->
      <van-nav-bar fixed placeholder :title="navTitle" class="custom-navbar z-[3000]">
        <template #left>
          <div
            class="nav-left-hit-area"
            role="button"
            aria-label="Toggle menu"
            tabindex="0"
            @click="show = !show"
            @keydown.enter.prevent="show = !show"
            @keydown.space.prevent="show = !show"
          >
            <van-icon name="bars" color="#ffffff" size="24" />
          </div>
        </template>
      </van-nav-bar>

      <!-- Desktop Layout -->
      <div class="w-full min-h-dvh bg-[#9fcaf4] flex" style="--van-sidebar-width: 220px;">
        <!-- Sidebar -->
        <van-popup
          v-model:show="show"
          position="left"
          :style="{ width: '220px', height: '100%', marginTop: 'var(--van-nav-bar-height)' }"
          :lock-scroll="false"
          :close-on-click-overlay="true"
          :z-index="2000"
          class="custom-sidebar"
        >
          <van-sidebar v-model="sidebar" @change="onSidebarChange">
            <van-sidebar-item title="หน้าแรก" />
            <van-sidebar-item title="ค้นหา" disabled />
            <van-sidebar-item title="เพื่อน" />
            <van-sidebar-item title="การตั้งค่า" />
          </van-sidebar>
        </van-popup>

        <!-- Main Content -->
        <div
          class="flex-1 flex flex-col transition-all duration-300"
          :style="{ marginTop: 'var(--van-nav-bar-height)' }"
        >
          <main class="flex-1 px-6 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
            <router-view /> <!-- เนื้อหาของแต่ละหน้า -->
          </main>
        </div>
      </div>
    </template>

    <!-- Mobile Layout -->
    <template v-else>
      <div class="w-full flex-1 flex flex-col">
        <van-nav-bar fixed placeholder :title="navTitle" class="custom-navbar"/>
        <main class="flex-1 px-0 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
          <router-view />
        </main>
        <van-tabbar route v-model="navbar" fixed safe-area-inset-bottom>
          <van-tabbar-item icon="home-o" to="/home">หน้าแรก</van-tabbar-item>
          <van-tabbar-item icon="search" to="/search">ค้นหา</van-tabbar-item>
          <van-tabbar-item icon="friends-o" to="/friends">เพื่อน</van-tabbar-item>
          <van-tabbar-item icon="setting-o" to="/profile">การตั้งค่า</van-tabbar-item>
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
.nav-left-hit-area {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  cursor: pointer;
}
</style>
