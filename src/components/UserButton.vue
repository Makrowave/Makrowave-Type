<script setup lang="ts">
import axios from '@/api/axios'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
const user = useUserStore()
const isLogout = ref<boolean>(false)

const logout = async () => {
  await axios
    .post('Auth/logout')
    .then(() => {
      user.loggedIn = false
      user.username = ''
    })
    .catch((error) => console.log(error))
}
</script>
<template>
  <div class="button" @mouseenter="isLogout = true" @mouseleave="isLogout = false">
    <RouterLink v-if="!user.loggedIn" to="/login">Sign in</RouterLink>
    <button ref="button" v-if="user.loggedIn" @click="() => logout()">
      {{ isLogout ? 'logout' : user.username }}
    </button>
  </div>
</template>
<style scoped>
a,
.button {
  transition: 0.4s;
  min-width: 100px;
  text-align: center;
}

.button:hover {
  background-color: var(--ui-text);
  color: var(--ui-background);
}

button {
  background: none;
  width: 100%;
}
</style>
