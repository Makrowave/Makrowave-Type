<script setup lang="ts">
const props = defineProps<{ text: string }>()
</script>
<template>
  <div>
    <TextChar v-for="letter in props.text">{{ letter }}</TextChar>
  </div>
</template>
<style></style>
