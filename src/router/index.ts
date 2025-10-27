import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '../components/AppLayout.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisPage from '../views/RegisPage.vue'
import HomePage from '../views/HomePage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import FriendPage from '../views/FriendPage.vue'
import CalendarPage from '../views/CalendarPage.vue'
import EnterPassword from '../views/EnterPassword.vue'
import LineChecked from '../views/LineChecked.vue'

const routes = [
  // ไม่ใช้ layout
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisPage },
  { path: '/password', name: 'EnterPassword', component: EnterPassword },
  { path: '/line-checked', name: 'LineChecked', component: LineChecked },

  // ใช้ AppLayout
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', name: 'Home', component: HomePage, meta: { title: 'หน้าแรก' } },
      { path: '/profile', name: 'Profile', component: ProfilePage, meta: { title: 'โปรไฟล์' } },
      { path: '/friends', name: 'Friends', component: FriendPage, meta: { title: 'เพื่อน' } },
      { path: '/calendar', name: 'Calendar', component: CalendarPage, meta: { title: 'ปฏิทิน' } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
