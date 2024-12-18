<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

const cursor = useTemplateRef('cursor')
const slider = useTemplateRef('slider')
const movable = ref<boolean>(false)
const hsv = defineModel<Array<number>>()
const cursorPos = computed(() => {
  if (!slider.value) return 0
  const bounds = slider.value!.getBoundingClientRect()
  if (hsv.value === undefined) return bounds.width
  return (hsv.value[0] / 360) * slider.value!.offsetHeight
})
const handleMouseDown = (e: MouseEvent) => {
  movable.value = true
}
const handleMouseMove = (e: MouseEvent) => {
  if (slider.value === null || hsv.value === undefined) return
  if (movable.value && (e.target === slider.value || e.target === cursor.value)) {
    const bounds = slider.value.getBoundingClientRect()
    let y = e.clientY - bounds.top
    if (y < 0) y = 0
    if (y > bounds.height) y = bounds.height
    hsv.value[0] = Math.floor((y / slider.value?.offsetHeight) * 360)
  }
}
const handleMouseUp = (e: MouseEvent) => {
  movable.value = false
}
onMounted(() => {
  addEventListener('mousedown', handleMouseDown)
  addEventListener('mouseup', handleMouseUp)
  addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  removeEventListener('mousedown', handleMouseDown)
  removeEventListener('mouseup', handleMouseUp)
  removeEventListener('mousemove', handleMouseMove)
})
</script>
<template>
  <div ref="slider" class="slider">
    <div ref="cursor" class="cursor" :style="{ top: `${cursorPos}px` }"></div>
  </div>
</template>

<style scoped>
.slider {
  position: relative;
  width: 30px;
  height: 200px;
  background: linear-gradient(
    to bottom,
    rgb(255, 0, 0),
    rgb(255, 255, 0),
    rgb(0, 255, 0),
    rgb(0, 255, 255),
    rgb(0, 0, 255),
    rgb(255, 0, 255),
    rgb(255, 0, 0)
  );
}
.cursor {
  position: absolute;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 2px solid white;
  transform: translate(0, -50%);
}
.cursor:hover {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
