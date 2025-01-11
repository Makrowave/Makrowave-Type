<script setup lang="ts">
import { useUserStore } from '@/stores/user'

export interface AllTimeRecord {
  username: string
  wins: number
  place: number
}

const user = useUserStore()

const props = defineProps<{ scores: Array<AllTimeRecord> }>()
</script>
<template>
  <div class="wrapper">
    <h3>All time</h3>
    <table class="border-10 box-shadow">
      <thead>
        <tr :style="{ borderBottom: `1px solid var(--ui-text)` }">
          <th></th>
          <th>Username</th>
          <th>Wins</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="score in props.scores"
          :key="score.username"
          :class="user.username === score.username ? 'user' : ''"
        >
          <td>{{ score.place }}</td>
          <td>{{ score.username }}</td>
          <td>{{ score.wins }}</td>
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
