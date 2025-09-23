import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisPage from '../views/RegisPage.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
