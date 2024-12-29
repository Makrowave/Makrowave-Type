<script setup lang="ts">
import RegisterForm from '@/components/login/RegisterForm.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import { ref } from 'vue'

const loginFormToggle = ref<boolean>(true)

const toggle = () => {
  loginFormToggle.value = !loginFormToggle.value
}
</script>
<template>
  <header>
    <nav>
      <RouterLink to="/">Back</RouterLink>
    </nav>
  </header>
  <main>
    <LoginForm v-if="loginFormToggle" @click="toggle" />
    <RegisterForm v-if="!loginFormToggle" @click="toggle" />
  </main>
</template>
<style scoped>
button {
  all: unset;
  cursor: pointer;
}
main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
