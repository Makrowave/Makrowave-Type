<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { ref, watch } from 'vue'

const theme = useThemeStore()

const props = defineProps<{ color: string }>()
const shownColor = ref<string>(props.color)

const REG_COLOR = /^#[0-9a-fA-F]{6}$/

const emit = defineEmits<{ (e: 'change', type: string): void }>()

const handleChange = (e: Event) => {
  if (e.target !== null) {
    const target = e.target as HTMLInputElement
    if (REG_COLOR.test(target.value)) emit('change', target.value)
  }
}

watch(props, () => (shownColor.value = props.color))
</script>
<template>
  <input type="text" v-model="shownColor" @input="(e) => handleChange(e)"
    :style="{ border: `0.2px solid ${theme.uiText}` }" />
  <div class="preview" :style="{ backgroundColor: color, border: `0.2px solid ${theme.uiText}` }"></div>
</template>
<style scoped>
.input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview {
  height: 30px;
  width: 30px;
}

input {
  all: unset;
  width: 200px;
  height: 30px;
}
</style>
