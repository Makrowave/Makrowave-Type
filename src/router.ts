import { createRouter, createWebHistory } from 'vue-router'
import LeaderboardPage from './routes/LeaderboardPage.vue'
import SettingsPage from './routes/SettingsPage.vue'
import TypingPage from './routes/TypingPage.vue'
import Layout from './routes/Layout.vue'
import LoginPage from './routes/LoginPage.vue'
import PracticePage from './routes/PracticePage.vue'
import UserPage from './routes/UserPage.vue'
import { useUserStore } from './stores/user'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: TypingPage },
      { path: '/practice', component: PracticePage },
      { path: '/leaderboard', component: LeaderboardPage },
      { path: '/settings', component: SettingsPage },
      { path: '/account', component: UserPage, meta: { requiresAuth: true } },
    ],
  },
  {
    path: '/login',
    component: LoginPage,
    meta: { isLoginPage: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()
  if (to.meta.requiresAuth && !user.loggedIn) {
    next('/login')
  } else if (to.meta.isLoginPage && user.loggedIn) {
    next(from)
  } else {
    next()
  }
})

export default router
