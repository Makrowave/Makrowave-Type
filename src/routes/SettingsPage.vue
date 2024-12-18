<script setup lang="ts">
import ModalColorPicker from '@/components/colorpicker/ModalColorPicker.vue'
import { useThemeStore } from '@/stores/theme'
import { onMounted, ref } from 'vue'

const theme = useThemeStore()
</script>
<template>
  <div class="option">
    <ModalColorPicker v-model="theme.uiTextColor" />
  </div>
</template>
<style>
.color-square {
  height: 20px;
  width: 20px;
}
.option {
  position: relative;
}
</style>
