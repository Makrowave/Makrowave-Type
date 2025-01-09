<script setup lang="ts">
import DailyScoreboard, { type DailyRecord } from '@/components/DailyScoreboard.vue'
import AllTimeScoreboard, { type AllTimeRecord } from '@/components/AllTimeScoreboard.vue'
import { computed, onMounted, ref } from 'vue'
import axios from '@/api/axios'
import { useThemeStore } from '@/stores/theme'



const allTimeScores = ref<Array<AllTimeRecord>>([])
const dailyScores = ref<Array<DailyRecord>>([])

const dailyError = ref<string>("")
const allTimeError = ref<string>("")

const theme = useThemeStore()
const errorStyle = computed(() => {
  return {'--ui-text': theme.uiText, '--text-incorrect': theme.textIncorrect}
})
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
    <div class="error" :style="errorStyle" v-if="dailyError !== ''">{{ dailyError }}</div>
    <div class="error" :style="errorStyle" v-if="allTimeError !== ''"> {{ allTimeError }}</div>
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

.error {
  box-shadow: 10px 10px 0px 0px var(--ui-text);
  border: 1px solid var(--ui-text);
  background: var(--text-incorrect);
  text-align: center;
  padding: 4px;
}
</style>
