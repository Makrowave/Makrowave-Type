<script setup lang="ts">
import { KeyStates } from '@/const/states'
import { computed, ref } from 'vue'
const props = defineProps<{ state: string }>()

const letterClass = computed(() => {
  let resultClass
  switch (props.state) {
    case KeyStates.Correct:
      return 'correct'
    case KeyStates.Incorrect:
      return 'incorrect'
    case KeyStates.Current:
      return 'current'
    default:
      return 'inactive'
  }
})
</script>

<template>
  <span class="whitespace" :class="letterClass">
    <slot></slot>
  </span>
</template>

<style>
.current {
  text-decoration: underline;
  color: gray;
}
.whitespace {
  white-space: pre;
}
.inactive {
  color: gray;
}
.incorrect {
  color: red;
}
.correct {
  color: green;
}
</style>
