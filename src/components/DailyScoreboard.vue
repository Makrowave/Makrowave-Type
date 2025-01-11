<script setup lang="ts">
import { useUserStore } from '@/stores/user'

export interface DailyRecord {
  id: number
  username: string
  time: number
  accuracy: number
  score: number
  place: number
}

const props = defineProps<{
  scores: Array<DailyRecord>
}>()

const user = useUserStore()

const timeToString = (time: number) => {
  const min = Math.floor(time / 60000)
    .toString()
    .padStart(2, '0')
  const sec = (Math.floor(time / 1000) % 60).toString().padStart(2, '0')
  const mil = Math.floor((time % 1000) / 10)
    .toString()
    .padStart(2, '0')
  return `${min}:${sec}:${mil}`
}
</script>
<template>
  <div class="wrapper">
    <h3>Daily</h3>
    <table class="border-10 box-shadow">
      <thead>
        <tr :style="{ borderBottom: `1px solid var(--ui-text)` }">
          <th></th>
          <th>Username</th>
          <th>Time</th>
          <th>Accuracy</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="score in props.scores"
          :key="score.id"
          :class="user.username === score.username ? 'user' : ''"
        >
          <td>{{ score.place }}</td>
          <td>{{ score.username }}</td>
          <td>{{ timeToString(score.time) }}</td>
          <td>{{ (score.accuracy * 100).toPrecision(4) }}%</td>
          <td>{{ score.score.toPrecision(4) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
table {
  border-collapse: collapse;
}

td,
th {
  padding: 0px 10px 0px 10px;
  text-align: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user {
  color: var(--text-complete);
}
</style>
