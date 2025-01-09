<script setup lang="ts">
import { KeyStates } from '@/const/states'
import { computed } from 'vue'
const props = defineProps<{ state: string; value: string }>()

const letterStyle = computed(() => {
  switch (props.state) {
    case KeyStates.Correct:
      return { color: 'var(--text-correct)' }
    case KeyStates.Incorrect:
      if (props.value === ' ')
        return { color: 'var(--text-incorrect)', textDecoration: 'underline' }
      return { color: 'var(--text-incorrect)' }
    case KeyStates.Current:
      return { color: 'var(--text-incomplete)', textDecoration: 'underline' }
    default:
      return { color: 'var(--text-incomplete)' }
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
