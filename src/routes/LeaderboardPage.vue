<script setup lang="ts">
import DailyScoreboard, { type DailyRecord } from '@/components/DailyScoreboard.vue'
import AllTimeScoreboard, { type AllTimeRecord } from '@/components/AllTimeScoreboard.vue'
import { onMounted, ref } from 'vue'
import axios from '@/api/axios'


const allTimeScores = ref<Array<AllTimeRecord>>([])
const dailyScores = ref<Array<DailyRecord>>([])

const dailyError = ref<string>("")
const allTimeError = ref<string>("")

const getAllTimeScore = async () => {
  return await axios.get("Leaderboard/get-alltime")
    .then(response => {
      allTimeError.value = "";
      return response.data
    })
    .catch(error => {
      allTimeError.value = "Error fetching data"
      return []
    }) as Array<AllTimeRecord>;
}

const getDailyScores = async () => {
  return await axios.get("Leaderboard/get-daily")
    .then(response => {
      dailyError.value = ""
      return response.data
    })
    .catch(error => {
      dailyError.value = "Error fetching data";
      return []
    }) as Array<DailyRecord>;
}

onMounted(async () => {
  allTimeScores.value = await getAllTimeScore();
  dailyScores.value = await getDailyScores();
})

</script>
<template>
  <div class="page-wrapper">
    <DailyScoreboard v-if="dailyError === ''" :scores="dailyScores" />
    <AllTimeScoreboard v-if="allTimeError === ''" :scores="allTimeScores" />
    <div class="box-shadow border-10 error" v-if="dailyError !== ''">{{ dailyError }}</div>
    <div class="box-shadow border-10 error"  v-if="allTimeError !== ''"> {{ allTimeError }}</div>
  </div>
</template>
<style scoped>
.page-wrapper {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: var(--ui-background);
}

.error {
  background: var(--text-incorrect);
  text-align: center;
  padding: 4px;
}
</style>
