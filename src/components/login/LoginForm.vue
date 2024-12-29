<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const emit = defineEmits<{
  (e: 'click'): void
}>()

const theme = useThemeStore()
</script>

<template>
  <div
    class="login-wrapper"
    :style="{
      border: `1px solid ${theme.uiTextColor}`,
      boxShadow: `10px 10px 0px 0px ${theme.uiTextColor}`,
    }"
  >
    <form>
      <div class="field">
        Username
        <input
          type="text"
          :style="{
            background: theme.uiBackground,
            color: theme.uiTextColor,
            border: `1px solid ${theme.uiTextColor}`,
          }"
        />
      </div>
      <div class="field">
        Password
        <input
          type="password"
          :style="{
            background: theme.uiBackground,
            color: theme.uiTextColor,
            border: `1px solid ${theme.uiTextColor}`,
          }"
        />
      </div>
      <button>Sign in</button>
    </form>
    <button @click="() => emit('click')">Create account</button>
  </div>
</template>

<style scoped>
.login-wrapper {
  padding: 10px;
  max-width: 200px;
}
.field {
  display: flex;
  flex-direction: column;
}
button {
  all: unset;
  cursor: pointer;
}
</style>
