<script lang="ts">
const prepText = (inputText: string): Array<string> => {
  let resultText = inputText.split(' ').map((word) => word + ' ')
  resultText[resultText.length - 1] = resultText[resultText.length - 1].trim()
  return resultText
}
const createStatesMask = (text: Array<string>) => {
  let mask = JSON.parse(JSON.stringify(text)) as Array<string>
  return mask.map((word) => word.replace(/./g, KeyStates.Inactive))
}

const totalLength = (text: Array<string>) => {
  return text.reduce((acc, word) => {
    return acc + word.length
  }, 0)
}
</script>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { loremIpsum, shortTest } from '@/const/loremIpsum'
import TypingText from './TypingText.vue'
import { KeyStates } from '@/const/states'
import Timer from './Timer.vue'
import Metrics from './Metrics.vue'

const props = defineProps<{ ranked: boolean }>()

const text = ref<Array<string>>(prepText(shortTest))
const mask = ref<Array<string>>(createStatesMask(text.value))
const textWords = computed<number>(() => text.value.length)
const textLength = computed<number>(() => totalLength(text.value))
const currentWord = computed<string>(() => text.value[currentWordIndex.value])
const currentWordLength = computed<number>(() => text.value[currentWordIndex.value].length)
const currentWordIndex = ref<number>(0)
const currentLetterIndex = ref<number>(0)
const letterMistake = ref<boolean>(false)
const active = ref<boolean>(false)
const mistakes = ref<number>(0)
const time = ref<number>(0)
const changeState = (state: KeyStates) => {
  const maskWord = mask.value[currentWordIndex.value]
  const index = currentLetterIndex.value
  mask.value[currentWordIndex.value] = maskWord.slice(0, index) + state + maskWord.slice(index + 1)
}


const handleEnd = () => {
  active.value = false
  if (props.ranked) {
    //handle ranked end logic
    //send data, etc.
  } else {
    //handle new casual exercise
  }
}

const handleStart = () => {
  if (props.ranked) {
    //handle start login
    //send request to mark that challenge was undertaken
    //start when marked
    //play animation?
  }
  active.value = true
}



const handleKeyDown = (event: KeyboardEvent) => {
  const letter = event.key
  if (!active.value) {
    if (letter === 'Enter')
      handleStart()
    return
  }

  if (letter === 'Shift' || letter === 'Alt' || letter === 'Control' || letter === 'CapsLock') {
    return
  }

  if (letter === currentWord.value[currentLetterIndex.value]) {
    if (!letterMistake.value) {
      changeState(KeyStates.Correct)
    } else {
      changeState(KeyStates.Incorrect)
    }
    letterMistake.value = false
    //Handle the fact that letter is correct graphically
    //Check for word's end
    currentLetterIndex.value++
    if (currentLetterIndex.value >= currentWordLength.value) {
      currentLetterIndex.value = 0
      //Check for text end
      currentWordIndex.value++
      if (currentWordIndex.value >= textWords.value) {
        //Finish
        handleEnd()
        return
      }
    }
    changeState(KeyStates.Current)
  } else {
    if (!letterMistake.value) mistakes.value++
    letterMistake.value = true
  }
}
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  //Set first key to current
  const maskWord = mask.value[currentWordIndex.value]
  mask.value[0] = KeyStates.Current + maskWord.slice(1)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
<template>
  <div class="wrapper">
    <Timer :started="active" @time="(t) => (time = t)" />
    <Metrics :length="textLength" :completed-words="currentWordIndex" :word-count="textWords" :mistakes="mistakes"
      :time="time" />
    <h3 v-if="!active">Press enter to start</h3>
    <TypingText :text="text" :states="mask" />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-width: 600px;
  align-items: center;
  width: 80%;
}
</style>
