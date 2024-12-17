<script setup lang="ts">
import { computed } from 'vue';

const { time, length, wordCount, completedWords, mistakes }
  = defineProps<{
    length: number
    wordCount: number
    time: number
    completedWords: number
    mistakes: number
  }>()

const wpm = computed((): number => {
  return time === 0 || completedWords === 0 ? 0 : Math.floor(completedWords / time * 60 * 1000)
})
const accuracy = computed((): number => {
  return mistakes === 0 ? 100.00 : 100 * (length - mistakes) / length
})

const score = computed(() => {
  return accuracy.value * wpm.value / 100
})
</script>
<template>
  <div class="metrics">
    <span>Progress: {{ completedWords }}/{{ wordCount }}</span>
    <span>Accuracy: {{ accuracy.toFixed(2) }}%</span>
    <span>Words per minute: {{ wpm }}</span>
    <span>Score: {{ score.toFixed(2) }}</span>
  </div>
</template>
<style scoped>
.metrics {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  flex-grow: 1;
}
</style>