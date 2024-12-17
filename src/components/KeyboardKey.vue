<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  keyName: string
  altKeyName: string
  special?: boolean
  width?: string
  location?: number
  togglable?: boolean
  gStart?: number
  gEnd?: number
}>(), { special: false, width: '40px', location: 0, togglable: false })

const isPressed = ref<boolean>(false)
const theme = useThemeStore()

const keyStyle = computed(() => {
  let returnClass: { [key: string]: any } = {
    height: '40px',
    width: props.width,
    border: `0.8px solid ${theme.inactiveKeyTextColor}`
  }
  console.log(props.width);
  if (!isPressed.value) {
    returnClass.background = theme.inactiveKeyColor
    returnClass.color = theme.inactiveKeyTextColor
  } else {
    returnClass.color = theme.activeKeyTextColor
  }
  return returnClass
})

const handleKeyDown = (event: KeyboardEvent) => {
  if (props.togglable && event.key === props.keyName && event.location === props.location) {
    isPressed.value = !isPressed.value
    return;
  }
  if (event.key === props.keyName && event.location === props.location)
    isPressed.value = true
  if (event.key === props.altKeyName && event.location === props.location)
    isPressed.value = true
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (props.togglable) return;
  if (event.key === props.keyName && event.location === props.location)
    isPressed.value = false
  if (event.key === props.altKeyName && event.location === props.location)
    isPressed.value = false
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
  <li :style="keyStyle">
    <span class="primary">{{ keyName }}</span>
    <span class="secondary">{{ altKeyName }}</span>
  </li>
</template>

<style scoped>
.primary {
  position: absolute;
  white-space: pre;
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
