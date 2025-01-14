<script setup lang="ts">
import axios from '@/api/axios'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const user = useUserStore()
const route = useRoute()
const router = useRouter()
const isLogout = ref<boolean>(false)

const logout = async () => {
  await axios
    .post('Auth/logout')
    .then(() => {
      user.loggedIn = false
      user.username = ''
      if (route.fullPath === '/account') {
        router.replace('/login')
      }
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
