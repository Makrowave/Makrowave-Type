<script setup lang="ts">
import RegisterForm from '@/components/login/RegisterForm.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import { computed, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

export interface Response {
  status: 'ok' | 'error' | 'none' | 'info'
  message: string
}

const loginFormToggle = ref<boolean>(true)
const feedback = ref<Response>({ status: 'none', message: '' })
const theme = useThemeStore()

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
  <header>
    <nav>
      <RouterLink to="/">Back</RouterLink>
    </nav>
  </header>
  <main>
    <div class="feedback" :class="feedbackStyle">
      {{ feedback.status !== 'none' ? feedback.message : '' }}
    </div>
    <LoginForm
      v-if="loginFormToggle"
      @click="
        () => {
          toggle()
          clearFeedback()
        }
      "
      @response="
        (response) => {
          feedback = response
          if (response.status === 'ok') toggle()
        }
      "
    />
    <RegisterForm
      v-if="!loginFormToggle"
      @click="
        () => {
          toggle()
          clearFeedback()
        }
      "
      @response="
        (response) => {
          feedback = response
          if (response.status === 'ok') toggle()
        }
      "
    />
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
</style>
