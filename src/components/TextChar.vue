<script setup lang="ts">
import { KeyStates } from '@/const/states'
import { useThemeStore } from '@/stores/theme'
import { computed, ref } from 'vue'
const props = defineProps<{ state: string; value: string }>()
const { textIncomplete, textIncorrect, textComplete } = useThemeStore()

const letterStyle = computed(() => {
  switch (props.state) {
    case KeyStates.Correct:
      return { color: textComplete }
    case KeyStates.Incorrect:
      if (props.value === ' ') return { color: textIncorrect, textDecoration: 'underline' }
      return { color: textIncorrect }
    case KeyStates.Current:
      return { color: textIncomplete, textDecoration: 'underline' }
    default:
      return { color: textIncomplete }
  }
})
</script>

<template>
  <span class="whitespace" :style="letterStyle">
    {{ value }}
  </span>
</template>

<style>
.whitespace {
  white-space: pre;
}
</style>
