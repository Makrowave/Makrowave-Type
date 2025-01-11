<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue'
import { useThemeStore } from './stores/theme'
import axios from './api/axios'
import { useUserStore } from './stores/user'
import router from './router'
import { useRoute } from 'vue-router'
const theme = useThemeStore()
const user = useUserStore()
const route = useRoute()

const getSessionData = async () => {
  const isSessionValid = await axios
    .get('Auth/check-session')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return false
    })
  if (isSessionValid) {
    const username = await axios
      .get('Auth/get-profile')
      .then((response) => response.data)
      .catch((error) => console.log(error))
    if (username !== undefined && username !== null) {
      user.loggedIn = true
      user.username = username
      if (route.fullPath === '/login') {
        router.replace('/')
      }
    }
  }
}

onMounted(async () => {
  theme.readFromStorage()
  await getSessionData()
  theme.changeRootVars()
})

watch(theme, () => {
  theme.changeRootVars()
  document.body.style.backgroundColor = theme.uiBackground
  document.body.style.color = theme.uiText
})
</script>

<template>
  <RouterView />
</template>

<style></style>
