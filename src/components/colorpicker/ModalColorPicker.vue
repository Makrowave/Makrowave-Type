<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import ColorPicker from './ColorPicker.vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()

const color = defineModel<string>()
const visible = ref<boolean>(false)

const button = useTemplateRef('button')
const picker = useTemplateRef('picker')

const handleClick = (e: MouseEvent) => {
  if (e.target === null) return
  const target = e.target as Node
  if (e.target !== button.value && !picker.value?.$el.contains(target) && visible.value)
    visible.value = false
}

onMounted(() => {
  addEventListener('mousedown', handleClick)
})
onUnmounted(() => {
  removeEventListener('mousedown', handleClick)
})
</script>

<template>
  <div class="wrapper">
    <button
      ref="button"
      class="button"
      :style="{ backgroundColor: color, border: `0.5px solid ${theme.uiText}` }"
      @click="visible = !visible"
    ></button>
    <ColorPicker
      class="abs-picker"
      v-if="visible"
      ref="picker"
      :initial-color="color ?? '#ff0000'"
      @change="(val) => (color = val)"
    />
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  display: flex;
  height: 20px;
  width: 20px;
}
.button {
  height: 20px;
  width: 20px;
}
.abs-picker {
  position: absolute;
  left: 25px;
  z-index: 30;
}
</style>
