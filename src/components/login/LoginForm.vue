<script setup lang="ts">
import getAxiosInstace from '@/api/axios'
import router from '@/router'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'

const axios = getAxiosInstace()
const user = useUserStore()
const username = ref<string>('')
const password = ref<string>('')
const theme = useThemeStore()

const login = () => {
  axios
    .post(
      'Auth/login',
      { username: username.value, password: password.value },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    .then((response) => {
      user.username = response.data
      user.loggedIn = true
      router.replace('/')
    })
    .catch((error) => {
      console.log(error)
    })
}

const emit = defineEmits<{
  (e: 'click'): void
}>()

onMounted(() => {
  console.log(user.loggedIn)
  if (user.loggedIn) {
    router.replace('/')
  }
})
</script>

<template>
  <div
    class="login-wrapper"
    :style="{
      border: `1px solid ${theme.uiText}`,
      boxShadow: `10px 10px 0px 0px ${theme.uiText}`,
    }"
  >
    <form @submit.prevent="login">
      <div class="field">
        Username
        <input
          type="text"
          v-model="username"
          :style="{
            background: theme.uiBackground,
            color: theme.uiText,
            border: `1px solid ${theme.uiText}`,
          }"
        />
      </div>
      <div class="field">
        Password
        <input
          type="password"
          v-model="password"
          :style="{
            background: theme.uiBackground,
            color: theme.uiText,
            border: `1px solid ${theme.uiText}`,
          }"
        />
      </div>
      <button>Sign in</button>
    </form>
    <button @click="() => emit('click')">Create account</button>
  </div>
</template>

<style scoped>
.login-wrapper {
  padding: 10px;
  max-width: 200px;
}
.field {
  display: flex;
  flex-direction: column;
}
button {
  all: unset;
  cursor: pointer;
}
</style>
