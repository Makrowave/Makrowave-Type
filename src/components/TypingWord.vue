<script setup lang="ts">
import TextChar from './TextChar.vue'
const props = defineProps<{ text: string; states: string }>()

const mergeData = () => {
  const text = props.text.split('')
  const states = props.states.split('')
  //   console.log(text)
  //   console.log(states)
  if (text.length !== states.length) {
    throw new Error('Strings must be of the same length')
  }

  return text.map((element, index) => ({
    letter: element,
    state: states[index],
  }))
}
</script>
<template>
  <div>
    <TextChar v-for="letter in mergeData()" :state="letter.state">{{ letter.letter }}</TextChar>
  </div>
</template>
<style></style>
