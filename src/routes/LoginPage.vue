<script setup lang="ts">
import RegisterForm from '@/components/login/RegisterForm.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import { computed, ref } from 'vue'
import { useThemeStore } from '@/stores/theme';

export interface Response {
  status: "ok" | "error" | "none" | "info",
  message: string
}

const loginFormToggle = ref<boolean>(true)
const feedback = ref<Response>({ status: "none", message: "" })
const theme = useThemeStore()

const feedbackStyle = computed(() => {

  let result = {
    background: theme.uiBackground,
    border: `1px solid ${theme.uiText}`,
    color: theme.uiText,
    boxShadow: `10px 10px 0px 0px ${theme.uiText}`,
    fontSize: 'inherit'
  }
  if (feedback.value.status === "none")
    return {}
  if (feedback.value.status === "ok")
    result.background = theme.textComplete
  if (feedback.value.status === "error")
    result.background = theme.textIncorrect
  if (feedback.value.status === "info")
    result.fontSize = '12px'
  return result
})

const clearFeedback = () => {
  feedback.value = { status: "none", message: "" }
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
    <div class="feedback" :style="feedbackStyle">
      {{ feedback.status !== "none" ? feedback.message : "" }}
    </div>
    <LoginForm v-if="loginFormToggle" @click="() => { toggle(); clearFeedback() }"
      @response="(response) => { feedback = response; if (response.status === 'ok') toggle() }" />
    <RegisterForm v-if="!loginFormToggle" @click="() => { toggle(); clearFeedback() }"
      @response="(response) => { feedback = response; if (response.status === 'ok') toggle() }" />
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.feedback {
  width: 200px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
