import { createRouter, createWebHistory } from 'vue-router'
import LeaderboardPage from './routes/LeaderboardPage.vue'
import SettingsPage from './routes/SettingsPage.vue'
import TypingPage from './routes/TypingPage.vue'
import Layout from './routes/Layout.vue'
import LoginPage from './routes/LoginPage.vue'
import UserPage from './routes/UserPage.vue'
import PracticePage from './routes/PracticePage.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: TypingPage },
      { path: '/practice', component: PracticePage },
      { path: '/leaderboard', component: LeaderboardPage },
      { path: '/settings', component: SettingsPage },
      { path: '/user', component: UserPage },
    ],
  },
  {
    path: '/login',
    component: LoginPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
