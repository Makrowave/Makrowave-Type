<script setup lang="ts">
import Keyboard from '@/components/Keyboard.vue'
import TypingWindow from '@/components/TypingWindow.vue'
</script>

<template>
  <div class="typing-window">
    <TypingWindow :ranked="false" />
    <Keyboard />
  </div>
</template>

<style>
.typing-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 100%;
  max-width: 800px;
  flex-grow: 1;
}
</style>
