<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

const cursor = useTemplateRef('cursor')
const gradient = useTemplateRef('gradient')
const cursorX = computed(() => {
  if (!gradient.value) return 0
  const bounds = gradient.value!.getBoundingClientRect()
  if (hsv.value === undefined) return bounds.width
  return hsv.value[1] * gradient.value!.offsetWidth
})
const cursorY = computed(() => {
  if (!gradient.value) return 0
  const bounds = gradient.value!.getBoundingClientRect()
  if (hsv.value === undefined) return bounds.height
  return 1 - hsv.value[2] * gradient.value!.offsetHeight + bounds.height
})
const hsv = defineModel<Array<number>>()
const movable = ref<boolean>(false)
onMounted(() => {
  addEventListener('mousedown', handleMouseDown)
  addEventListener('mouseup', handleMouseUp)
  addEventListener('mousemove', handleMouseMove)
})

const baseColor = computed(() => {
  if (hsv.value === undefined) return 'rgb(0,0,0)'
  const [r, g, b] = hsvToRgb(hsv.value[0], 1, 1)
  return `rgb(${r},${g},${b})`
})

const handleMouseDown = (e: MouseEvent) => {
  movable.value = true
}
const handleMouseMove = (e: MouseEvent) => {
  if (gradient.value === null || hsv.value === undefined) return
  if (movable.value && (e.target === gradient.value || e.target === cursor.value)) {
    const bounds = gradient.value.getBoundingClientRect()
    let x = Math.floor(e.clientX - bounds.left)
    let y = Math.floor(e.clientY - bounds.top)
    if (x < 0) x = 0
    if (x > bounds.width) x = bounds.width
    if (y < 0) y = 0
    if (y > bounds.height) y = bounds.height
    hsv.value[1] = x / gradient.value!.offsetWidth
    hsv.value[2] = 1 - y / gradient.value!.offsetHeight
  }
}
const handleMouseUp = (e: MouseEvent) => {
  movable.value = false
}
onUnmounted(() => {
  removeEventListener('mousedown', handleMouseDown)
  removeEventListener('mouseup', handleMouseUp)
  removeEventListener('mousemove', handleMouseMove)
})
</script>
<template>
  <div ref="gradient" class="base" :style="{ backgroundColor: baseColor }">
    <div class="white-grad">
      <div class="black-grad">
        <div
          ref="cursor"
          class="cursor"
          :style="{ top: `${cursorY}px`, left: `${cursorX}px` }"
        ></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.base {
  height: 200px;
  width: 200px;
  display: flex;
  align-items: stretch;
}
.white-grad {
  flex: 1;
  display: flex;
  align-items: stretch;
  background: linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0));
  pointer-events: none;
}
.black-grad {
  flex: 1;
  position: relative;
  background: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0));
  pointer-events: none;
}
.cursor {
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 2px solid white;
  transform: translate(-50%, -50%);
  pointer-events: all;
}
.cursor:hover {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>

<script lang="ts">
const hsvToRgb = (h: number, s: number, v: number) => {
  const C = v * s
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - C
  let R
  let G
  let B
  if (h < 60) {
    R = C
    G = X
    B = 0
  } else if (h < 120) {
    R = X
    G = C
    B = 0
  } else if (h < 180) {
    R = 0
    G = C
    B = X
  } else if (h < 240) {
    R = 0
    G = X
    B = C
  } else if (h < 300) {
    R = X
    G = 0
    B = C
  } else {
    R = C
    G = 0
    B = X
  }
  return [(R + m) * 255, (G + m) * 255, (B + m) * 255]
}
</script>
