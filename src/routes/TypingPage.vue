<script setup lang="ts">
import Keyboard from '@/components/Keyboard.vue'
import TypingWindow from '@/components/TypingWindow.vue'
import axios from '@/api/axios'
import { onMounted, ref } from 'vue'

const text = ref<string>('Lorem ipsum')
const textReady = ref<boolean>(false)
const getText = async () => {
  return await axios
    .get('DailyChallenge/practice')
    .then((response) => response.data)
    .catch(() => 'An error has happened. Try again later!')
    .finally(() => {
      textReady.value = true
    })
}

onMounted(async () => {
  text.value = await getText()
})
</script>

<template>
  <div class="typing-window">
    <TypingWindow class="place-top" :ranked="false" :text="text" :textReady="textReady"
      @finish="() => (textReady = false)" @refetch="async () => (text = await getText())" />
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
