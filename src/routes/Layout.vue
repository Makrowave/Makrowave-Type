<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { RouterLink } from 'vue-router'
import UserButton from '@/components/UserButton.vue'
import svgLogo from '@/assets/icon.svg?raw'

const theme = useThemeStore()
</script>

<template>
  <header :style="{ borderBottom: `1px solid ${theme.uiText}` }">
    <div class="name">
      <div class="svg-wrapper" v-html="svgLogo"></div>
      <h2>Makrowave Type</h2>
    </div>
    <div class="bar">
      <nav>
        <RouterLink to="/">Type</RouterLink>
        <RouterLink to="/practice">Practice</RouterLink>
        <RouterLink to="/leaderboard">Leaderboard</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink to="/account">Account</RouterLink>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
}

.bar {
  display: flex;
  justify-content: space-between;
}

a:hover {
  background: var(--ui-text);
  color: var(--ui-background);
}

.svg-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.svg-wrapper > * {
  height: 30px;
  width: 30px;
  margin-right: 10px;
  transition: 0.4s;
}
.name {
  display: flex;
  align-items: center;
}
</style>
