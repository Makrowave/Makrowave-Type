<script setup lang="ts">
import Keyboard from '@/components/Keyboard.vue'
import TypingWindow from '@/components/TypingWindow.vue'

import { shortTest } from '@/const/loremIpsum'
</script>

<template>
  <div class="typing-window">
    <TypingWindow class="place-top" :ranked="false" :text="shortTest" :textReady="true" />
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
