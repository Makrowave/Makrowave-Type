<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const emit = defineEmits<{
  (e: 'click'): void
}>()

const theme = useThemeStore()
</script>

<template>
  <div
    class="register-wrapper"
    :style="{
      border: `1px solid ${theme.uiText}`,
      boxShadow: `10px 10px 0px 0px ${theme.uiText}`,
    }"
  >
    <form>
      <div>
        Username
        <input
          type="text"
          :style="{
            background: theme.uiBackground,
            color: theme.uiText,
            border: `1px solid ${theme.uiText}`,
          }"
        />
      </div>
      <div>
        Password
        <input
          type="password"
          :style="{
            background: theme.uiBackground,
            color: theme.uiText,
            border: `1px solid ${theme.uiText}`,
          }"
        />
      </div>
      <div>
        Confirm Password
        <input
          type="password"
          :style="{
            background: theme.uiBackground,
            color: theme.uiText,
            border: `1px solid ${theme.uiText}`,
          }"
        />
      </div>
      <button>Sign up</button>
    </form>
    <button @click="() => emit('click')">Sign in</button>
  </div>
</template>

<style scoped>
.register-wrapper {
  padding: 10px;
  max-width: 200px;
}
button {
  all: unset;
  cursor: pointer;
}
</style>
