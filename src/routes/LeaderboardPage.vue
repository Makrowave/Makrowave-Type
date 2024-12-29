<script setup lang="ts">
import DailyScoreboard from '@/components/DailyScoreboard.vue'
import AllTimeScoreboard from '@/components/AllTimeScoreboard.vue'
const dailyScores = [
  { id: 1, username: 'Makrowave', time: 200000, accuracy: 0.9234, score: 67 },
  { id: 2, username: 'Makrowave', time: 200000, accuracy: 0.9, score: 67 },
  { id: 3, username: 'Makrowave', time: 200000, accuracy: 0.9, score: 67 },
  { id: 4, username: 'Makrowave', time: 200000, accuracy: 0.9, score: 67 },
  { id: 5, username: 'Makrowave', time: 200000, accuracy: 0.9, score: 67 },
]

const allTimeScores = [
  { id: 1, username: 'Makrowave', wins: 10 },
  { id: 2, username: 'Makrowave', wins: 6 },
  { id: 3, username: 'Makrowave', wins: 2 },
  { id: 4, username: 'Makrowave', wins: 1 },
]
</script>
<template>
  <div class="page-wrapper">
    <DailyScoreboard :scores="dailyScores" />
    <AllTimeScoreboard :scores="allTimeScores" />
  </div>
</template>
<style scoped>
.page-wrapper {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
