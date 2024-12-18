<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import ColorInput from './ColorInput.vue'
import Gradient from './Gradient.vue'
import HueSlider from './HueSlider.vue'
import { useThemeStore } from '@/stores/theme'

const props = defineProps<{ initialColor: string }>()

const theme = useThemeStore()

const emit = defineEmits<{
  (e: 'change', time: string): void
}>()

const hsvColor = ref<Array<number>>(hexToHsv(props.initialColor))
const hexColor = computed(() => {
  const [h, s, v] = hsvColor.value
  emit('change', hsvToHex(h, s, v))
  return hsvToHex(h, s, v)
})

onMounted(() => {
  hsvColor.value = hexToHsv(props.initialColor)
})
</script>
<template>
  <div
    class="picker"
    :style="{ backgroundColor: theme.uiBackground, border: `1px solid ${theme.uiTextColor}` }"
  >
    <Gradient v-model="hsvColor" />
    <HueSlider v-model="hsvColor" />
    <ColorInput :color="hexColor" @change="(val) => (hsvColor = hexToHsv(val))" />
  </div>
</template>
<style scoped>
.picker {
  display: grid;
  grid-template-columns: auto auto;
  gap: 30px 30px;
  padding: 30px;
}
.cursor {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 2px solid white;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>

<script lang="ts">
const hexToHsv = (hex: string) => {
  const [r, g, b] = hexToRgb(hex)
  return rgbToHsv(r, g, b)
}

const hsvToHex = (h: number, s: number, v: number) => {
  const [r, g, b] = hsvToRgb(h, s, v)
  return rgbToHex(r, g, b)
}

const rgbToHex = (r: number, g: number, b: number) => {
  r = r < 256 ? r : 255
  g = g < 256 ? g : 255
  b = b < 256 ? b : 255
  r = r > 0 ? r : 0
  g = g > 0 ? g : 0
  b = b > 0 ? b : 0
  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  )
}
const hexToRgb = (hex: string) => {
  const HEX_REG = /^#[0-9a-fA-F]{6}$/
  if (!HEX_REG.test(hex)) return [0, 0, 0]
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}
const rgbToHsv = (r: number, g: number, b: number) => {
  const R = r / 255
  const G = g / 255
  const B = b / 255
  const cMax = Math.max(R, G, B)
  const cMin = Math.min(R, G, B)
  const D = cMax - cMin
  let H
  if (D === 0) {
    H = 0
  } else if (cMax === R) {
    H = 60 * (((G - B) / D) % 6)
    if (H < 0) H = 360 + H
  } else if (cMax === G) {
    H = 60 * ((B - R) / D + 2)
  } else if (cMax === B) {
    H = 60 * ((R - G) / D + 4)
  }
  const S = cMax === 0 ? 0 : D / cMax
  return [Math.round(H!), S, cMax]
}

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
  return [Math.floor((R + m) * 255), Math.floor((G + m) * 255), Math.floor((B + m) * 255)]
}
</script>
