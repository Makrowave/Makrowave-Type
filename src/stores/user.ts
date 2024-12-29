import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const loggedIn = ref<boolean>(false)
  const username = ref<string>()

  return {
    loggedIn,
    username,
  }
})
