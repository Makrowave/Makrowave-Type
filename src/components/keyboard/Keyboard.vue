<script setup lang="ts">
import { keys } from '@/const/keys'
import Key from './KeyboardKey.vue'
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { useThemeStore } from '@/stores/theme'
const keyLayout = keys

const theme = useThemeStore()

const keyboardBorder = useTemplateRef('border')

const shadowCenter = computed(() => {
  if (borderCenter.value) {
    let arr = JSON.parse(JSON.stringify(borderCenter.value))
    arr[0] -= 30
    arr[1] -= 30
    return arr
  } else {
    return [0, 0]
  }
})
const borderCenter = computed(() => {
  if (keyboardBorder.value) {
    const rect = keyboardBorder.value.getBoundingClientRect()
    return [Math.floor(rect.width / 2), Math.floor(rect.height / 2)]
  } else {
    return [0, 0]
  }
})

const rotation = ref(0)
const shadow = ref(-100)
const gradientStyle = (pos: Array<number>) => {
  return { background: theme.generateBackgroundGradient(rotation.value, pos) }
}
const startAnimation = () => {
  setInterval(() => {
    decrementShadow()
  }, 350)
  setInterval(() => {
    rotation.value += 0.5
  }, 20)
}
const incrementRotation = () => {
  rotation.value += 0.7
}
const smoothRotation = (repetitions: number, delay: number) => {
  var repCount = 0
  const interval = setInterval(() => {
    incrementRotation()
    if (++repCount === repetitions) {
      clearInterval(interval)
    }
  }, delay)
}
const incrementShadow = () => {
  if (shadow.value <= 20) shadow.value += 1
}
const decrementShadow = () => {
  if (shadow.value > -100) shadow.value--
}
const handleKeyDown = () => {
  smoothRotation(10, 10)
  incrementShadow()
}
onMounted(() => {
  startAnimation()
  addEventListener('keydown', handleKeyDown)
})
onUnmounted(() => {
  removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="keyboard">
    <div>
      <ul>
        <Key v-for="el in keyLayout[0]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
        <Key key="Backspace" keyName="Backspace" altKeyName="" special width="80px" />
      </ul>
      <ul>
        <Key key="Tab" keyName="Tab" altKeyName="" special width="60px" />
        <Key v-for="el in keyLayout[1]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
        <Key key="\" keyName="\" altKeyName="|" special width="60px" />
      </ul>
      <ul>
        <Key key="Caps" keyName="CapsLock" altKeyName="" special width="80px" togglable />
        <Key v-for="el in keyLayout[2]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
        <Key key="Enter" keyName="Enter" altKeyName="" special width="80px" />
      </ul>
      <ul>
        <Key key="Shift1" keyName="Shift" altKeyName="" special width="100px" :location="1" />
        <Key v-for="el in keyLayout[3]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
        <Key key="Shift2" keyName="Shift" altKeyName="" special width="100px" :location="2" />
      </ul>
      <ul>
        <Key key="Ctrl1" keyName="Control" altKeyName="" special width="80px" :location="1" />
        <Key key="Alt1" keyName="Alt" altKeyName="" special width="60px" :location="1" />
        <Key key="Spacebar" keyName=" " altKeyName="" special width="320px" />
        <Key key="Alt2" keyName="Alt" altKeyName="" special width="60px" :location="2" />
        <Key key="Ctrl2" keyName="Control" altKeyName="" special width="80px" :location="2" />
      </ul>
    </div>
    <div class="keyboard-background" :style="gradientStyle(shadowCenter)"></div>
    <div ref="border" class="keyboard-pseudo-border" :style="gradientStyle(borderCenter)"></div>
    <div
      class="shadow"
      :style="{ boxShadow: `0px 0px 100px ${shadow}px ${theme.inactiveText}` }"
    ></div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
  padding-left: 0;
}

.keyboard {
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
}

.keyboard-background {
  content: '';
  position: absolute;
  z-index: -1;
  top: 30px;
  left: 30px;
  height: 100%;
  width: 100%;
}

.keyboard-pseudo-border {
  content: '';
  position: absolute;
  z-index: -1;
  top: -1px;
  left: -1px;
  height: calc(100% + 2px);
  width: calc(100% + 2px);
}

.shadow {
  content: '';
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -5;
}
</style>
