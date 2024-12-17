<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from 'vue'

const props = defineProps<{ started: boolean }>()
const startTime = ref<number>(0)
const delta = ref<number>(0)
const intervals = ref<Array<number>>([])

const emit = defineEmits<{
  (e: 'time', time: number): void
}>()

const startTimer = () => {
  startTime.value = Date.now()
  intervals.value.push(
    setInterval(() => {
      delta.value = Date.now() - startTime.value
    }, 10),
  )
  intervals.value.push(
    setInterval(() => {
      emit('time', delta.value)
    }, 500),
  )
}
const stopTimer = () => {
  intervals.value.forEach((i) => clearInterval(i))
  emit('time', delta.value)
}
const handleTimer = () => {
  if (props.started) startTimer()
  else stopTimer()
}
watch(props, handleTimer)
onMounted(() => {
  if (props.started) startTimer()
})
const time = computed(() => {
  const time = delta.value
  const min = Math.floor(time / 60000)
    .toString()
    .padStart(2, '0')
  const sec = (Math.floor(time / 1000) % 60).toString().padStart(2, '0')
  const mil = Math.floor((time % 1000) / 10)
    .toString()
    .padStart(2, '0')
  return `${min}:${sec}:${mil}`
})
onUpdated(() => {})
</script>
<template>
  <h3>{{ time }}</h3>
</template>
<style scoped></style>
