import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisPage from '../views/RegisPage.vue'
import HomePage from '../views/HomePage.vue'
import ProfilePage from '../views/ProfilePage.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisPage },
  { path: '/home', name: 'Home', component: HomePage },
  { path: '/profile', name: 'Profile', component: ProfilePage },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
