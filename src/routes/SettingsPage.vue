<script setup lang="ts">
import ModalColorPicker from '@/components/colorpicker/ModalColorPicker.vue'
import { useThemeStore } from '@/stores/theme'
import { onMounted, ref } from 'vue'

const theme = useThemeStore()
</script>
<template>
  <div class="settings">
    <h3>UI</h3>
    <section>
      <div class="option">
        <span>UI Text</span>
        <ModalColorPicker v-model="theme.uiTextColor" />
      </div>
      <div class="option">
        <span>UI Background</span>
        <ModalColorPicker v-model="theme.uiBackground" />
      </div>
    </section>
    <h3>Text</h3>
    <section>
      <div class="option">
        <span>Incomplete</span>
        <ModalColorPicker v-model="theme.inactiveFontColor" />
      </div>
      <div class="option">
        <span>Incorrect</span>
        <ModalColorPicker v-model="theme.incorrectFontColor" />
      </div>
      <div class="option">
        <span>Correct</span>
        <ModalColorPicker v-model="theme.correctFontColor" />
      </div>
    </section>
    <h3>Keyboard</h3>
    <section>
      <div class="option">
        <span>Inactive Key</span>
        <ModalColorPicker v-model="theme.inactiveKeyColor" />
      </div>
      <div class="option">
        <span>Inactive Key Text</span>
        <ModalColorPicker v-model="theme.inactiveKeyTextColor" />
      </div>
      <div class="option">
        <span>Active Key Text</span>
        <ModalColorPicker v-model="theme.activeKeyTextColor" />
      </div>
      <div class="option">
        <span>Moving Gradient</span>
        <ModalColorPicker v-model="theme.outlineGradient" />
      </div>
    </section>
  </div>
</template>
<style>
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.color-square {
  height: 20px;
  width: 20px;
}
.option {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
section {
  width: 200px;
}
h3 {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
