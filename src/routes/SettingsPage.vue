<script setup lang="ts">
import getAxiosInstance from '@/api/axios'
import ModalColorPicker from '@/components/colorpicker/ModalColorPicker.vue'
import { useThemeStore, type Theme } from '@/stores/theme'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const theme = useThemeStore()
const user = useUserStore()
const axios = getAxiosInstance()

const hoverStyle = computed(() => {
  return {
    '--hover-color': theme.uiText,
    '--hover-text-color': theme.uiBackground
  }
})

const getUserTheme = async () => {
  axios
    .get('Settings/theme')
    .then((response) => {
      const fetchedTheme = response.data as Theme
      theme.uiText = fetchedTheme.uiText
      theme.uiBackground = fetchedTheme.uiBackground
      theme.textIncorrect = fetchedTheme.textIncorrect
      theme.textIncomplete = fetchedTheme.textIncomplete
      theme.textComplete = fetchedTheme.textComplete
      theme.inactiveKey = fetchedTheme.inactiveKey
      theme.inactiveText = fetchedTheme.inactiveText
      theme.activeText = fetchedTheme.activeText
      theme.gradient = fetchedTheme.gradient
    })
    .catch((error) => console.log(error))
}

const saveUserTheme = async () => {
  theme.saveToStorage()
  axios.post(
    'Settings/theme',
    {
      uiText: theme.uiText,
      uiBackground: theme.uiBackground,
      textIncorrect: theme.textIncorrect,
      textIncomplete: theme.textIncomplete,
      textComplete: theme.textComplete,
      inactiveKey: theme.inactiveKey,
      inactiveText: theme.inactiveText,
      activeText: theme.activeText,
      gradient: theme.gradient,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}

const shadow = computed(() => ({
  boxShadow: `10px 10px 0px 0px ${theme.uiText}`,
  border: `0.5px solid ${theme.uiText}`,
}))
</script>
<template>
  <div class="settings">
    <section :style="shadow">
      <h3>UI</h3>
      <div class="option">
        <span>UI Text</span>
        <ModalColorPicker v-model="theme.uiText" />
      </div>
      <div class="option">
        <span>UI Background</span>
        <ModalColorPicker v-model="theme.uiBackground" />
      </div>
    </section>

    <section :style="shadow">
      <h3>Text</h3>
      <div class="option">
        <span>Incomplete</span>
        <ModalColorPicker v-model="theme.textIncomplete" />
      </div>
      <div class="option">
        <span>Incorrect</span>
        <ModalColorPicker v-model="theme.textIncorrect" />
      </div>
      <div class="option">
        <span>Correct</span>
        <ModalColorPicker v-model="theme.textComplete" />
      </div>
    </section>

    <section :style="shadow">
      <h3>Keyboard</h3>
      <div class="option">
        <span>Inactive Key</span>
        <ModalColorPicker v-model="theme.inactiveKey" />
      </div>
      <div class="option">
        <span>Inactive Key Text</span>
        <ModalColorPicker v-model="theme.inactiveText" />
      </div>
      <div class="option">
        <span>Active Key Text</span>
        <ModalColorPicker v-model="theme.activeText" />
      </div>
      <div class="option">
        <span>Moving Gradient</span>
        <ModalColorPicker v-model="theme.textIncomplete" />
      </div>
    </section>
    <section :style="shadow">
      <h3>Keyboard Gradient</h3>
      <div class="option" v-for="(color, i) in theme.gradient">
        <button class="themed-button" :style="[{ border: `0.5px solid ${theme.uiText}` }, hoverStyle]" v-if="i > 1"
          @click="theme.gradient.splice(i, 1)">
          X
        </button>
        <ModalColorPicker v-model="theme.gradient[i]" />
      </div>
      <button @click="theme.gradient.push('#000000')" class="themed-button"
        :style="[{ border: `0.5px solid ${theme.uiText}`, width: '100%', marginTop: '6px' }, hoverStyle]">
        +
      </button>
    </section>
  </div>
  <div class="buttons">
    <button :style="[shadow, hoverStyle]" class="save-button" @click="() => theme.saveToStorage()">Save</button>
    <button :style="[shadow, hoverStyle]" class="save-button" @click="() => saveUserTheme()" v-if="user.loggedIn">
      Save on all devices
    </button>
    <button :style="[shadow, hoverStyle]" class="save-button" @click="() => getUserTheme()" v-if="user.loggedIn">
      Get saved theme
    </button>
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
  transition: 0.2s;
}

.buttons {
  margin-top: 40px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.save-button {
  all: unset;
  flex: 1;
  margin-top: 20px;
  padding: 4px;
  cursor: pointer;
  text-align: center;
  transition: 0.2s;
}

.settings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  padding-top: 60px;
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
  width: 250px;
  padding: 0 20px 20px 20px;
}

h3 {
  margin-bottom: 20px;
  margin-top: 20px;
}

button:hover {
  background: var(--hover-color);
  color: var(--hover-text-color);
}
</style>
