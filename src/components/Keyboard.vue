<script setup lang="ts">
import { keys } from '@/const/keys'
import Key from './KeyboardKey.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
const keyLayout = keys

const theme = useThemeStore()

const rotation = ref(0)
const backgroundRotation = ref(0)
const color = ref(0)
const startAnimation = () => {
  setInterval(() => {
    decrementColor()
  }, 15)
  setInterval(() => {
    backgroundRotation.value += 1
  }, 200)
}
const incrementRotation = () => {
  rotation.value += 0.5
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
const incrementColor = () => {
  if (color.value <= 245) color.value += 10
}
const decrementColor = () => {
  if (color.value > 0) color.value--
}
const handleKeyDown = () => {
  smoothRotation(10, 10)
  incrementColor()
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
  <div
    class="keyboard"
    :style="{
      background: `linear-gradient(${rotation}deg, rgb(${color} ${color} ${color}) 80%, ${theme.outlineGradient} 100%)`,
      border: `1px solid ${theme.uiTextColor}`,
    }"
  >
    <div :style="{ background: theme.generateKeyboardGradient(backgroundRotation) }">
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
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
  padding-left: 0;
}

.keyboard {
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 20px;
  border-radius: 15px;
}
</style>
