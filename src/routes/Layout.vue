<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { RouterLink } from 'vue-router'
import UserButton from '@/components/UserButton.vue'
const theme = useThemeStore()
</script>

<template>
  <header :style="{ borderBottom: `1px solid ${theme.uiTextColor}` }">
    <h2>Makrowave Type</h2>
    <div class="bar">
      <nav>
        <RouterLink to="/">Type</RouterLink>
        <RouterLink to="/leaderboard">Leaderboard</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
      </nav>
      <UserButton />
    </div>
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
.bar {
  display: flex;
  justify-content: space-between;
}
</style>
