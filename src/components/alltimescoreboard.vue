<script setup lang="ts">

export interface AllTimeRecord {
  username: string,
  wins: number
}

const props = defineProps<{ scores: Array<AllTimeRecord> }>()
</script>
<template>
  <div class="wrapper">
    <h3>All time</h3>
    <table class="border-10 box-shadow">
      <thead>
        <tr :style="{ borderBottom: `1px solid var(--ui-text)` }">
          <th>Username</th>
          <th>Wins</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="score in props.scores" :key="score.username">
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
</style>
