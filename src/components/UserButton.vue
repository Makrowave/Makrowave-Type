<script setup lang="ts">
import axios from '@/api/axios';
import { useThemeStore } from '@/stores/theme';
import { useUserStore } from '@/stores/user'
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
const user = useUserStore()
const isLogout = ref<boolean>(false)
const button = useTemplateRef("button")
const theme = useThemeStore()

const logout = async () => {
  await axios.post("Auth/logout").then(() => {
    user.loggedIn = false
    user.username = ""
  }).catch(error => console.log(error))
}

const mouseEnter = (e: MouseEvent) => {
  isLogout.value = true
}

const mouseLeave = (e: MouseEvent) => {
  isLogout.value = false
}

const hoverStyle = computed(() => {
  return {
    '--hover-color': theme.uiText,
    '--hover-text-color': theme.uiBackground
  }
})

onMounted(() => {
  if (button.value !== null) {
    button.value.addEventListener("mouseenter", mouseEnter)
    button.value.addEventListener("mouseleave", mouseLeave)
  }
})

onUnmounted(() => {
  if (button.value !== null) {
    button.value.removeEventListener("mouseenter", mouseEnter)
    button.value.removeEventListener("mouseleave", mouseLeave)
  }
})

</script>
<template>
  <div :style="hoverStyle" class="button">
    <RouterLink v-if="!user.loggedIn" to="/login">Sign in</RouterLink>
    <button ref="button" v-if="user.loggedIn" @click="() => logout()">
      <span>{{ isLogout ? "logout" : user.username }}</span>
    </button>
  </div>
</template>
<style scoped>
a,
button {
  all: unset;
  cursor: pointer;


}

.button {
  transition: 0.4s;
  width: 100px;
  text-align: center;
}

.button:hover {
  background-color: var(--hover-color);
  color: var(--hover-text-color)
}
</style>
