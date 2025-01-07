<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { RouterLink } from 'vue-router'
import UserButton from '@/components/UserButton.vue'
import { computed } from 'vue';
const theme = useThemeStore()


const hoverStyle = computed(() => {
  return {
    '--hover-color': theme.uiText,
    '--hover-text-color': theme.uiBackground
  }
})

</script>

<template>
  <header :style="{ borderBottom: `1px solid ${theme.uiText}` }">
    <h2>Makrowave Type</h2>
    <div class="bar">
      <nav>
        <RouterLink :style="hoverStyle" to="/">Type</RouterLink>
        <RouterLink :style="hoverStyle" to="/leaderboard">Leaderboard</RouterLink>
        <RouterLink :style="hoverStyle" to="/settings">Settings</RouterLink>
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
}

.bar {
  display: flex;
  justify-content: space-between;
}

a:hover {
  background: var(--hover-color);
  color: var(--hover-text-color);
}
</style>
