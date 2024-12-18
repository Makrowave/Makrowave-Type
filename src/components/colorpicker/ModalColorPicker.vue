<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import ColorPicker from './ColorPicker.vue'
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
  <button
    ref="button"
    :class="$attrs.class + ' button'"
    :style="{ backgroundColor: color ?? '#ff0000' }"
    @click="visible = !visible"
  ></button>
  <ColorPicker
    class="abs-picker"
    v-if="visible"
    ref="picker"
    :initial-color="color ?? '#ff0000'"
    @change="(val) => (color = val)"
  />
</template>

<style scoped>
.button {
  all: unset;
  height: 20px;
  width: 20px;
  cursor: pointer;
}
.abs-picker {
  position: absolute;
}
</style>
