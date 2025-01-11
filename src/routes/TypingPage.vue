<script setup lang="ts">
import Keyboard from '@/components/Keyboard.vue'
import TypingWindow from '@/components/TypingWindow.vue'
import axios from '@/api/axios'
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import type { AxiosError } from 'axios'

const user = useUserStore()
const text = ref<string>('')
const message = ref<string>('Loading')

const fetchChallenge = async () => {
  return await axios
    .get('DailyChallenge/daily-challenge-start')
    .then((response) => {
      text.value = response.data
    })
    .catch((error: AxiosError) => {
      if (error.status === 401) {
        message.value = 'Log in to participate!'
      } else {
        message.value = error.message
      }
      text.value = ''
    })
}

watch(user, () => {
  if (!user.loggedIn) {
    message.value = 'Log in to participate!'
  }
})

const finishChallenge = async (result: { time: number; score: number; accuracy: number }) => {
  axios.post('DailyChallenge/daily-challenge-end', JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  })
}

onMounted(fetchChallenge)
</script>

<template>
  <div class="typing-window" v-show="text !== '' && user.loggedIn">
    <TypingWindow :text="text" @finish="(result) => finishChallenge(result)" :ranked="true" />
    <Keyboard />
  </div>
  <h3 v-if="!user.loggedIn || text === ''">{{ message }}</h3>
</template>

<style>
.typing-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 800px;
  flex: 1;
  flex-grow: 1;
}

main {
  min-height: 70%;
}
</style>
