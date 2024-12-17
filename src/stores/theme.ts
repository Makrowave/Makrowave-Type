import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  //Typing text font color
  const inactiveFontColor = ref<string>('#bbbbbb')
  const correctFontColor = ref<string>('#39FAAF')
  const incorrectFontColor = ref<string>('#E65368')

  //Keyboard
  const outlineGradient = ref<string>('#3989FA')
  //Inactive
  const inactiveKeyColor = ref<string>('#313131')
  const inactiveKeyTextColor = ref<string>('#ffffff')
  //Active
  const activeKeyColors = ref<Array<string>>([
    '#39FAAF',
    '#39C6FA',
    '#3AFAF2',
    '#39FA6E',
    '#3989FA',
    '#67E6DD',
  ])
  const activeKeyTextColor = ref<string>('#000000')
  const generateKeyboardGradient = (deg: number) => {
    let result = `linear-gradient(${deg}deg`
    const count = activeKeyColors.value.length
    const ratio = 100 / (count - 1)
    for (let i = 0; i < count - 1; i++) {
      result += `, ${activeKeyColors.value[i]} ${Math.floor(i * ratio)}%`
    }
    return result + `, ${activeKeyColors.value[count - 1]} 100%)`
  }
  //General
  const uiTextColor = ref<string>('#ffffff')
  const uiBackground = ref<string>('#181818')

  return {
    inactiveFontColor,
    correctFontColor,
    incorrectFontColor,
    outlineGradient,
    inactiveKeyColor,
    inactiveKeyTextColor,
    activeKeyColors,
    activeKeyTextColor,
    uiTextColor,
    uiBackground,

    generateKeyboardGradient,
  }
})
