<script setup lang="ts">
import Keyboard from '@/components/Keyboard.vue'
import TypingWindow from '@/components/TypingWindow.vue'

import axios from '@/api/axios'
import { onMounted, ref } from 'vue'

const text = ref<string>('Lorem ipsum')
const getText = async () => {
  return await axios
    .get('DailyChallenge/practice')
    .then((response) => response.data)
    .catch(() => 'An error has happened. Try again later!')
}

onMounted(async () => {
  text.value = await getText()
})
</script>

<template>
  <div class="typing-window">
    <TypingWindow :text="text" @refetch="async () => (text = await getText())" :ranked="false" />
    <Keyboard />
  </div>
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
