<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import getAxiosInstace from '@/api/axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'

const axios = getAxiosInstace()
const username = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const theme = useThemeStore()

const hoverStyle = computed(() => {
  return {
    '--hover-color': theme.uiText,
    '--hover-text-color': theme.uiBackground
  }
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const register = () => {
  axios
    .post(
      'Auth/register',
      { username: username.value, password: password.value },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    .then((response) => {
      emit('click')
    })
    .catch((error) => {
      console.log(error)
    })
}

const validatePassword = () => {
  //add regex validation
  if (password.value === confirmPassword.value) {
    register()
  } else {

  }
}

</script>

<template>
  <div class="register-wrapper" :style="{
    border: `1px solid ${theme.uiText}`,
    boxShadow: `10px 10px 0px 0px ${theme.uiText}`,
  }">
    <form @submit.prevent="register">
      <div class="field">
        Username
        <input type="text" v-model="username" :style="{
          background: theme.uiBackground,
          color: theme.uiText,
          border: `1px solid ${theme.uiText}`,
        }" />
      </div>
      <div class="field">
        Password
        <input type="password" v-model="password" :style="{
          background: theme.uiBackground,
          color: theme.uiText,
          border: `1px solid ${theme.uiText}`,
        }" />
      </div>
      <div class="field">
        Confirm Password
        <input type="password" v-model="confirmPassword" :style="{
          background: theme.uiBackground,
          color: theme.uiText,
          border: `1px solid ${theme.uiText}`,
        }" />
      </div>
      <button class="button" :style="hoverStyle">Sign up</button>
    </form>
    <button class="button" :style="hoverStyle" @click="() => emit('click')">Sign in</button>
  </div>
</template>

<style scoped>
.register-wrapper {
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
  margin-top: 10px;
  transition: 0.4s;
}

button:hover {
  background-color: var(--hover-color);
  color: var(--hover-text-color);
}
</style>
