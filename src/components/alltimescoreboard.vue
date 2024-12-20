<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';

const props = defineProps<{ scores: Array<{ id: number, username: string, wins: number }> }>()
const theme = useThemeStore()
</script>
<template>
  <div class="wrapper">
    <h3>All time</h3>
    <table :style="{ border: `1px solid ${theme.uiTextColor}`, boxShadow: `10px 10px 0px 0px ${theme.uiTextColor}`, }">
      <thead>
        <tr :style="{ borderBottom: `1px solid ${theme.uiTextColor}` }">
          <th>Username</th>
          <th>Wins</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" score in props.scores" :key="score.id">
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
