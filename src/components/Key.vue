<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  keyName: string
  altKeyName: string
}>()

const isPressed = ref<boolean>(false)
const pressedClass = ref('pressed')
const normalClass = ref('normal')

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === props.keyName) isPressed.value = true
  if (event.key === props.altKeyName) isPressed.value = true
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === props.keyName) isPressed.value = false
  if (event.key === props.altKeyName) isPressed.value = false
}
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>

<template>
  <li :class="isPressed ? pressedClass : normalClass">
    <span class="primary">{{ keyName }}</span>
    <span class="secondary">{{ altKeyName }}</span>
  </li>
</template>

<style scoped>
.normal {
  background-color: gray;
  height: 40px;
  width: 40px;
  border: 1px solid white;
}
.pressed {
  background-color: cadetblue;
  height: 40px;
  width: 40px;
  border: 1px solid white;
}
.primary {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.secondary {
  position: absolute;
  top: 0%;
  right: 0%;
  font-size: x-small;
  padding-top: 2px;
  padding-right: 2px;
}
li {
  position: relative;
}
</style>
