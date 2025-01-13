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
</script>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import TypingText from './text/TypingText.vue'
import { KeyStates } from '@/const/states'
import Timer from './Timer.vue'
import Metrics from './Metrics.vue'

const props = defineProps<{ text: string; ranked: boolean }>()

//Control flow
const active = ref<boolean>(false)
const waiting = ref<boolean>(false)
//Constant for current text
const wordCount = computed<number>(() => text.value.text.length)
const textLength = computed<number>(() => props.text.length)
//Used for typing
const currentWord = computed<string>(() => text.value.text[currentWordIndex.value])
const currentWordLength = computed<number>(() => text.value.text[currentWordIndex.value].length)
const currentWordIndex = ref<number>(0)
const currentLetterIndex = ref<number>(0)
const letterMistake = ref<boolean>(false)
//Statistics
const mistakes = ref<number>(0)
const time = ref<number>(0)
//Text as array of words
const text = ref<{ text: Array<string>; mask: Array<string> }>({ text: [], mask: [] })

//Metrics
const wpm = computed((): number => {
  return time.value === 0 || currentWordIndex.value === 0
    ? 0
    : Math.floor((currentWordIndex.value / time.value) * 60 * 1000)
})
const accuracy = computed((): number => {
  return mistakes.value === 0 ? 1 : (textLength.value - mistakes.value) / textLength.value
})

const score = computed(() => {
  return accuracy.value * wpm.value
})

const createTextObject = () => {
  const words = prepText(props.text)
  return { text: words, mask: createStatesMask(words) }
}

const changeState = (state: KeyStates) => {
  const maskWord = text.value.mask[currentWordIndex.value]
  const index = currentLetterIndex.value
  text.value.mask[currentWordIndex.value] =
    maskWord.slice(0, index) + state + maskWord.slice(index + 1)
}

const reset = () => {
  text.value = createTextObject()
  currentLetterIndex.value = 0
  currentWordIndex.value = 0
  letterMistake.value = false
  mistakes.value = 0
  const maskWord = text.value.mask[currentWordIndex.value]
  text.value.mask[0] = KeyStates.Current + maskWord.slice(1)
}

const handleEnd = () => {
  active.value = false
  waiting.value = true
  emit('finish', {
    time: time.value,
    score: score.value,
    accuracy: accuracy.value,
  })
}

const handleStart = () => {
  active.value = true
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (text.value.text.length === 0) return
  const letter = event.key
  //Refetch text
  if (!active.value && waiting.value && !props.ranked) {
    if (letter === 'Enter') {
      emit('refetch')
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
      if (currentWordIndex.value >= wordCount.value) {
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

watch(
  () => props.text,
  () => {
    reset()
  },
)

const emit = defineEmits<{
  (e: 'finish', result: { time: number; score: number; accuracy: number }): void
  (e: 'refetch'): void
}>()

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
<template>
  <div class="wrapper">
    <Timer :started="active" @time="(t) => (time = t)" />
    <Metrics
      class="margin"
      :completed-words="currentWordIndex"
      :word-count="wordCount"
      :wpm="wpm"
      :accuracy="accuracy * 100"
      :score="score"
    />
    <TypingText class="text" :text="text.text" :states="text.mask" />
    <h3 v-if="waiting && !props.ranked">Press enter to fetch new text</h3>
    <h3 v-if="!active && !waiting">Press any key to start</h3>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-width: 600px;
  align-items: center;
  justify-content: flex-start;
  height: 400px;
}

.margin {
  margin-bottom: 10px;
}

.text {
  flex: 1;
}
</style>
