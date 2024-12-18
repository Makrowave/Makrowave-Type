import { createRouter, createWebHistory } from 'vue-router'
import LeaderboardPage from './routes/LeaderboardPage.vue'
import SettingsPage from './routes/SettingsPage.vue'
import TypingPage from './routes/TypingPage.vue'

const routes = [
  { path: '/', component: TypingPage },
  { path: '/leaderboard', component: LeaderboardPage },
  { path: '/settings', component: SettingsPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
