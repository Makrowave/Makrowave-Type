<script setup lang="ts">
import Keyboard from '@/components/Keyboard.vue'
import TypingWindow from '@/components/TypingWindow.vue'

import { shortTest } from '@/const/loremIpsum'
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
    <TypingWindow class="place-top" :text="text" @refetch="async () => (text = await getText())" />
    <Keyboard />
  </div>
</template>

<style>
.typing-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 800px;
  flex: 1;
  flex-grow: 1;
}

.place-top {
  flex: 1;
  justify-self: flex-start;
  margin-bottom: auto;
}

main {
  min-height: 70%;
}
</style>
