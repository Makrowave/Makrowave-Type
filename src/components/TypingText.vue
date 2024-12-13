<script setup lang="ts">
import { loremIpsum } from '@/const/loremIpsum'
import { ref } from 'vue'
import TypingWord from './TypingWord.vue'
const text = ref<Array<string>>(loremIpsum.split(' '))
</script>
<template>
  <div class="wrapper">
    <TypingWord v-for="word in text" :text="word + '&#160'" />
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  max-width: 400px;
  flex-wrap: wrap;
}
</style>
