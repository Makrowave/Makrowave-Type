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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { loremIpsum, shortTest } from '@/const/loremIpsum'
import TypingText from './TypingText.vue'
import { KeyStates } from '@/const/states'
import Timer from './Timer.vue'
import Metrics from './Metrics.vue'

const props = defineProps<{ ranked: boolean; text: string; textReady: boolean }>()

const emit = defineEmits<{
  (e: 'finish'): void
  (e: 'refetch'): void
}>()

const text = computed(() => {
  return prepText(props.text)
})
const mask = ref<Array<string>>(['111111', '11111'])
const textWords = computed<number>(() => text.value.length)
const textLength = computed<number>(() => totalLength(text.value))
const currentWord = computed<string>(() => text.value[currentWordIndex.value])
const currentWordLength = computed<number>(() => text.value[currentWordIndex.value].length)
const currentWordIndex = ref<number>(0)
const currentLetterIndex = ref<number>(0)
const letterMistake = ref<boolean>(false)
const active = ref<boolean>(false)
const waiting = ref<boolean>(false)
const mistakes = ref<number>(0)
const time = ref<number>(0)
const changeState = (state: KeyStates) => {
  const maskWord = mask.value[currentWordIndex.value]
  const index = currentLetterIndex.value
  mask.value[currentWordIndex.value] = maskWord.slice(0, index) + state + maskWord.slice(index + 1)
}

const reset = () => {
  currentLetterIndex.value = 0
  currentWordIndex.value = 0
  letterMistake.value = false
  mistakes.value = 0
}

const handleEnd = () => {
  active.value = false
  waiting.value = true
  emit('finish')
  if (props.ranked) {
    //handle ranked end logic
    //send data, etc.
  } else {
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
  //New text
  if (!active.value && waiting.value) {
    if (letter === 'Enter') {
      emit('refetch')
      // reset()
      waiting.value = false
    }
    return
  }

  //If not active then any key press starts challenge or practice
  if (!active.value && !waiting.value) {
    handleStart()
  }
  //Special keys dont trigger errors
  if (
    letter === 'Shift' ||
    letter === 'Alt' ||
    letter === 'Control' ||
    letter === 'CapsLock' ||
    letter === 'Enter'
  ) {
    return
  }

  //
  if (letter === currentWord.value[currentLetterIndex.value]) {
    if (letterMistake.value) {
      changeState(KeyStates.Incorrect)
    } else {
      changeState(KeyStates.Correct)
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

watch(props, () => {
  mask.value = createStatesMask(prepText(props.text))
})

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
      :time="time" :active="!waiting" />
    <TypingText :text="text" :states="mask" />
    <h3 v-if="waiting">Presz enter to fetch new text</h3>
    <h3 v-if="!active">Press any key to start</h3>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-width: 600px;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
}
</style>
