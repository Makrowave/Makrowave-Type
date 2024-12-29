<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useThemeStore } from './stores/theme'
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
  <RouterView />
</template>

<style></style>
