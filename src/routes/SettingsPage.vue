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
    <h3>Keyboard Gradient</h3>
    <section>
      <div class="option" v-for="(color, i) in theme.activeKeyColors">
        <button
          class="themed-button"
          :style="{ border: `0.5px solid ${theme.uiTextColor}` }"
          v-if="i > 1"
          @click="theme.activeKeyColors.splice(i, 1)"
        >
          X
        </button>
        <ModalColorPicker v-model="theme.activeKeyColors[i]" />
      </div>
      <button
        @click="theme.activeKeyColors.push('#000000')"
        class="themed-button"
        :style="{ border: `0.5px solid ${theme.uiTextColor}`, width: '100%', marginTop: '6px' }"
      >
        +
      </button>
    </section>
  </div>
</template>
<style>
.themed-button {
  all: unset;
  height: 20px;
  width: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
  margin: 1px 0 1px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.option div {
  margin-left: auto;
}
section {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 200px;
}
h3 {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
