<script setup lang="ts">
import { onMounted, watch } from 'vue';
import Keyboard from './components/Keyboard.vue'
import TypingWindow from './components/TypingWindow.vue'
import { useThemeStore } from './stores/theme';
const theme = useThemeStore()

onMounted(() => {
  document.body.style.backgroundColor = theme.uiBackground
  document.body.style.color = theme.uiTextColor
})

watch(theme, () => {
  document.body.style.backgroundColor = theme.uiBackground
  document.body.style.color = theme.uiTextColor
})
</script>

<template>
  <header>
    <h2>Makrowave Type</h2>
  </header>
  <main>
    <div class="typing-window">
      <TypingWindow />
      <Keyboard />
    </div>
  </main>
</template>

<style scoped>
.typing-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 100%;
  max-width: 800px;
  flex-grow: 1;
}

main {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

header {
  border-bottom: 1px solid white;
}
</style>
