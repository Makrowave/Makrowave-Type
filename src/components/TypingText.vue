<script setup lang="ts">
import TypingWord from './TypingWord.vue'
const props = defineProps<{ text: Array<string>; states: Array<string> }>()
const mergeData = () => {
  const text = props.text
  const states = props.states
  if (text.length !== states.length) {
    throw new Error('Arrays must be of the same length')
  }

  return text.map((element, index) => ({
    word: element,
    states: states[index],
  }))
}
</script>
<template>
  <div class="text-box">
    <TypingWord v-for="row in mergeData()" :text="row.word" :states="row.states" />
  </div>
</template>
<style scoped>
.text-box {
  display: flex;
  max-width: 400px;
  height: 160px;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
}
</style>
