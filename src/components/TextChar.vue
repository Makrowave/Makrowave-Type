<script setup lang="ts">
import { computed, ref } from 'vue'
const curState = ref<'inactive' | 'current' | 'incorrect' | 'correct'>('inactive')

const letterClass = computed(() => {
  switch (curState.value) {
    case 'current':
      return 'current'
    case 'incorrect':
      return 'incorrect'
    default: //inactive or correct share style
      return 'inactive'
  }
})
</script>

<template>
  <span class="whitespace" :class="letterClass">
    <slot></slot>
  </span>
</template>

<style>
.whitespace {
  white-space: pre;
}
.inactive {
  color: gray;
}
.incorrect {
  color: red;
}
.correct {
  color: lightgray;
}
</style>
