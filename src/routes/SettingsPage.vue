<script setup lang="ts">
import axios from '@/api/axios'
import ModalColorPicker from '@/components/colorpicker/ModalColorPicker.vue'
import { useThemeStore, type Theme } from '@/stores/theme'
import { useUserStore } from '@/stores/user'

const theme = useThemeStore()
const user = useUserStore()

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
</script>
<template>
  <div class="settings">
    <section class="box-shadow border-10">
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

    <section class="box-shadow border-10">
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

    <section class="box-shadow border-10">
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
    </section>
    <section class="box-shadow border-10">
      <h3>Keyboard Gradient</h3>
      <div class="option" v-for="(color, i) in theme.gradient">
        <button class="themed-button border-5" v-if="i > 1" @click="theme.gradient.splice(i, 1)">
          X
        </button>
        <ModalColorPicker v-model="theme.gradient[i]" />
      </div>
      <button @click="theme.gradient.push('#000000')" class="themed-button border-5 add-button">
        +
      </button>
    </section>
  </div>
  <div class="buttons">
    <button class="save-button box-shadow border-5" @click="() => theme.saveToStorage()">
      Save
    </button>
    <button class="save-button box-shadow border-5" @click="() => saveUserTheme()" v-if="user.loggedIn">
      Save on all devices
    </button>
    <button class="save-button box-shadow border-5" @click="() => getUserTheme()" v-if="user.loggedIn">
      Get saved theme
    </button>
  </div>
</template>
<style>
.themed-button {
  height: 20px;
  width: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-button {
  width: 100%;
  margin-top: 4px;
}

.buttons {
  margin-top: 40px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.save-button {
  flex: 1;
  margin-top: 20px;
  padding: 4px;
  text-align: center;
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
  background: var(--ui-text);
  color: var(--ui-background);
}
</style>
