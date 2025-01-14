<script setup lang="ts">
import RegisterForm from '@/components/login/RegisterForm.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import { computed, ref } from 'vue'
import chevron from '@/assets/chevron.svg?raw'

export interface Response {
  status: 'ok' | 'error' | 'none' | 'info'
  message: string
}

const loginFormToggle = ref<boolean>(true)
const feedback = ref<Response>({ status: 'none', message: '' })

const feedbackStyle = computed(() => {
  if (feedback.value.status === 'ok') return 'ok border-10 box-shadow'
  if (feedback.value.status === 'error') return 'error border-10 box-shadow'
  if (feedback.value.status === 'info') return 'info border-10 box-shadow'
  return ''
})

const clearFeedback = () => {
  feedback.value = { status: 'none', message: '' }
}

const toggle = () => {
  loginFormToggle.value = !loginFormToggle.value
}
</script>
<template>
  <main>
    <nav>
      <RouterLink to="/">
        <div class="chevron" v-html="chevron"></div>
        Back
      </RouterLink>
    </nav>
    <div class="feedback" :class="feedbackStyle">
      {{ feedback.status !== 'none' ? feedback.message : '' }}
    </div>
    <LoginForm v-if="loginFormToggle" @click="() => {
      toggle()
      clearFeedback()
    }
      " @response="(response) => {
        feedback = response
        if (response.status === 'ok') toggle()
      }
        " />
    <RegisterForm v-if="!loginFormToggle" @click="() => {
      toggle()
      clearFeedback()
    }
      " @response="(response) => {
        feedback = response
        if (response.status === 'ok') toggle()
      }
        " />
  </main>
</template>
<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.feedback {
  width: 200px;
  text-align: center;
  margin-bottom: 20px;
}

.ok {
  background: var(--text-complete);
}

.error {
  background: var(--text-incorrect);
}

.info {
  font-size: 12px;
}

a:hover {
  background: var(--ui-text);
  color: var(--ui-background);
  fill: var(--ui-background)
}

nav {
  width: 200px;
}

.chevron>* {
  height: 14px;
  width: 14px;
  rotate: 180deg;
}

.chevron {
  display: flex;
  align-items: center;
  margin-right: 4px;
}

a {
  display: flex;
  align-content: center;
  fill: var(--ui-text);
  padding-left: 0px;
}
</style>
