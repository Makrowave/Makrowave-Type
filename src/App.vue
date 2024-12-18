<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useThemeStore } from './stores/theme'
import { RouterLink } from 'vue-router'
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
    <nav>
      <RouterLink to="/">Type</RouterLink>
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

header {
  border-bottom: 1px solid white;
}
</style>
