<script setup lang="ts">
import { KeyStates } from '@/const/states'
import { computed } from 'vue'
const props = defineProps<{ state: string; value: string }>()

const letterClass = computed(() => {
  switch (props.state) {
    case KeyStates.Correct:
      return "complete"
    case KeyStates.Incorrect:
      if (props.value === ' ')
        return "incorrect space"
      return "incorrect"
    case KeyStates.Current:
      return "incomplete underline"
    default:
      return "incomplete"
  }
})
</script>

<template>
  <span class="whitespace" :class="letterClass">
    {{ value }}
  </span>
</template>

<style scoped>
.whitespace {
  white-space: pre;
}


.complete {
  color: var(--text-complete)
}
.incomplete {
  color: var(--text-incomplete)
}
.incorrect {
  color: var(--text-incorrect)
}
.space {
  text-decoration: underline
}
</style>
