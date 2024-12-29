<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const user = useUserStore()
</script>
<template>
  <div>
    <RouterLink v-if="!user.loggedIn" to="/login">Sign in</RouterLink>
    <button v-if="user.loggedIn">
      {{ user.username }}
    </button>
  </div>
</template>
<style scoped>
button {
  all: unset;
  cursor: pointer;
}
</style>
