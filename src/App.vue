<script setup lang="ts">
import Keyboard from './components/Keyboard.vue'
import TypingWindow from './components/TypingWindow.vue'
</script>

<template>
  <header>Makrowave Type</header>
  <main>
    <TypingWindow />
    <Keyboard />
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
