<script setup lang="ts">
import { computed } from 'vue'

const { wordCount, completedWords, wpm, accuracy, score } = defineProps<{
  wordCount: number
  completedWords: number
  wpm: number
  accuracy: number
  score: number
}>()
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
