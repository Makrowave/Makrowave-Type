<script setup lang="ts">
import Scoreboard from '@/components/dailyscoreboard.vue';

const scores = [
  { id: 1, username: "Makrowave", time: 200000, accuracy: 0.9 },
  { id: 2, username: "Makrowave", time: 200000, accuracy: 0.9 },
  { id: 3, username: "Makrowave", time: 200000, accuracy: 0.9 },
  { id: 4, username: "Makrowave", time: 200000, accuracy: 0.9 },
  { id: 5, username: "Makrowave", time: 200000, accuracy: 0.9 }

]
</script>
<template>
  <Scoreboard class="margin" :scores="scores"></Scoreboard>
</template>
<style scoped>
.margin {
  margin-top: 20px;
}
</style>
