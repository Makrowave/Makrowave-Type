<script setup lang="ts">
import Keyboard from './components/Keyboard.vue'
import TypingText from './components/TypingText.vue'
</script>

<template>
  <header>Makrowave Type</header>
  <main>
    <TypingText />
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
