import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Theme {
  uiText: string
  uiBackground: string
  textIncomplete: string
  textComplete: string
  textIncorrect: string
  inactiveKey: string
  inactiveText: string
  activeText: string
  gradient: Array<string>
}

export const useThemeStore = defineStore('theme', () => {
  //UI
  const uiText = ref<string>('#ffffff')
  const uiBackground = ref<string>('#181818')
  //Typing text font color
  const textIncomplete = ref<string>('#767676')
  const textComplete = ref<string>('#38faaf')
  const textIncorrect = ref<string>('#0f5941')
  //Keyboard
  //Inactive
  const inactiveKey = ref<string>('#313131')
  const inactiveText = ref<string>('#ffffff')
  //Active
  const activeText = ref<string>('#000000')
  const gradient = ref<Array<string>>([
    '#39FAAF',
    '#39C6FA',
    '#3AFAF2',
    '#39FA6E',
    '#3989FA',
    '#67E6DD',
  ])
  // const generateKeyboardGradient = (deg: number) => {
  //   let result = `linear-gradient(${deg}deg`
  //   const count = activeKeyColors.value.length
  //   const ratio = 100 / (count - 1)
  //   for (let i = 0; i < count - 1; i++) {
  //     result += `, ${activeKeyColors.value[i]} ${Math.floor(i * ratio)}%`
  //   }
  //   return result + `, ${activeKeyColors.value[count - 1]} 100%)`
  // }
  const generateBackgroundGradient = (deg: number, pos: Array<number>) => {
    let result = `conic-gradient(from ${deg}deg at ${pos[0]}px ${pos[1]}px`
    const count = gradient.value.length
    const ratio = 100 / count
    result += `, ${gradient.value[0]} ${Math.floor(ratio / 2)}%`
    for (let i = 1; i < count; i++) {
      result += `, ${gradient.value[i]} ${Math.floor((i + 0.5) * ratio)}%`
    }
    return result + `, ${gradient.value[0]} 100%)`
  }

  const readFromStorage = () => {
    const theme = localStorage.getItem('theme')
    if (theme !== null) {
      const parsedTheme = JSON.parse(theme) as Theme
      uiText.value = parsedTheme.uiText
      uiBackground.value = parsedTheme.uiBackground
      textIncomplete.value = parsedTheme.textIncomplete
      textComplete.value = parsedTheme.textComplete
      textIncorrect.value = parsedTheme.textIncorrect
      inactiveKey.value = parsedTheme.inactiveKey
      inactiveText.value = parsedTheme.inactiveText
      activeText.value = parsedTheme.activeText
      gradient.value = parsedTheme.gradient
    }
  }

  const saveToStorage = () => {
    const theme = {
      uiText: uiText.value,
      uiBackground: uiBackground.value,
      textIncomplete: textIncomplete.value,
      textComplete: textComplete.value,
      textIncorrect: textIncorrect.value,
      inactiveKey: inactiveKey.value,
      inactiveText: inactiveText.value,
      activeText: activeText.value,
      gradient: gradient.value,
    }
    localStorage.setItem('theme', JSON.stringify(theme))
  }

  return {
    textIncomplete,
    textComplete,
    textIncorrect,
    inactiveKey,
    inactiveText,
    gradient,
    activeText,
    uiText,
    uiBackground,

    generateBackgroundGradient,
    readFromStorage,
    saveToStorage,
    // generateKeyboardGradient,
  }
})
