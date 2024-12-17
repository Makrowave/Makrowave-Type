<script setup lang="ts">
import { KeyStates } from '@/const/states'
import { useThemeStore } from '@/stores/theme';
import { computed, ref } from 'vue'
const props = defineProps<{ state: string, value: string }>()
const { inactiveFontColor, incorrectFontColor, correctFontColor } = useThemeStore()

const letterStyle = computed(() => {
  switch (props.state) {
    case KeyStates.Correct:
      return { color: correctFontColor }
    case KeyStates.Incorrect:
      if (props.value === ' ')
        return { color: incorrectFontColor, textDecoration: "underline" }
      return { color: incorrectFontColor }
    case KeyStates.Current:
      return { color: inactiveFontColor, textDecoration: "underline" }
    default:
      return { color: inactiveFontColor }
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
