<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import axios from '@/api/axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { password_regex, username_regex } from '@/const/regex'

const user = useUserStore()
const router = useRouter()
const usernameError = ref<string>('')
const passwordError = ref<string>('')
const deleteError = ref<string>('')

const username = ref<string>('')
const password = ref<string>('')
const repeatPassword = ref<string>('')
const deletePassword = ref<string>('')

const changeUsername = async () => {
  if (!username_regex.test(username.value)) {
    usernameError.value = 'Invalid username'
    return
  }
  usernameError.value = ''
  await axios
    .put('Auth/change-username', JSON.stringify({ username: username.value }), {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
      user.loggedIn = false
      user.username = ''
      router.push('/login')
    })
    .catch((error) => {
      console.log(error)
      usernameError.value = error.message
    })
}

const changePassword = async () => {
  if (password.value != repeatPassword.value) {
    passwordError.value = "Passwords don't match"
    return
  }
  if (!password_regex.test(password.value)) {
    passwordError.value = 'Invalid password'
    return
  }
  passwordError.value = ''
  await axios
    .put('Auth/change-password', JSON.stringify({ password: password.value }), {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
      user.loggedIn = false
      user.username = ''
      router.push('/login')
    })
    .catch((error) => {
      passwordError.value = error.message
    })
}

const deleteAccount = async () => {
  if (!password_regex.test(deletePassword.value)) {
    deleteError.value = 'Invalid password'
    return
  }
  deleteError.value = ''
  await axios
    .post('Auth/delete-token', JSON.stringify({ password: deletePassword.value }), {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch((error) => {
      deleteError.value = error.message
    })

  await axios
    .delete('Auth/delete')
    .then(() => {
      user.loggedIn = false
      user.username = ''
      router.push('/login')
    })
    .catch((error) => {
      deleteError.value = error.message
    })
}

const usernameErrorClass = computed(() => {
  return usernameError.value === '' ? '' : 'error-color box-shadow border-5'
})

const passwordErrorClass = computed(() => {
  return passwordError.value === '' ? '' : 'error-color box-shadow border-5'
})

const deleteErrorClass = computed(() => {
  return deleteError.value === '' ? '' : 'error-color box-shadow border-5'
})

const setError = (ref: Ref<string>, error: string) => {
  ref.value = error
}
</script>
<template>
  <div class="wrapper">
    <div class="option-wrapper">
      <div class="error" :class="usernameErrorClass">
        <span>{{ usernameError }}</span>
      </div>
      <div class="box-shadow border-5 option">
        <h3>Username</h3>
        <form autocomplete="off" @submit.prevent="changeUsername">
          <input type="text" placeholder="username" v-model="username" />
          <button class="box-shadow border-5">Change username</button>
        </form>
      </div>
    </div>
    <div class="option-wrapper">
      <div class="error" :class="passwordErrorClass">
        <span>{{ passwordError }}</span>
      </div>
      <div class="box-shadow border-5 option">
        <h3>Password</h3>
        <form autocomplete="off" @submit.prevent="changePassword">
          <input type="password" placeholder="new password" v-model="password" />
          <input type="password" placeholder="repeat password" v-model="repeatPassword" />
          <button class="box-shadow border-5">Change password</button>
        </form>
      </div>
    </div>
    <div class="option-wrapper">
      <div class="error" :class="deleteErrorClass">
        <span>{{ deleteError }}</span>
      </div>
      <div class="box-shadow border-5 option">
        <h3>Delete account</h3>
        <form autocomplete="off" @submit.prevent="deleteAccount">
          <input
            type="password"
            placeholder="password"
            autocomplete="off"
            v-model="deletePassword"
          />
          <button class="box-shadow border-5 error-color">Delete</button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 180px;
  width: 100%;
  height: 400px;
  justify-content: space-around;
  padding-top: 20px;
}
.option {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  flex: 1;
}

.option > *,
.option > form > * {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

button {
  text-align: center;
}

h3 {
  text-align: center;
}

.error-color {
  background: var(--text-incorrect);
}
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 60px;
}

.option-wrapper {
  display: flex;
  flex-direction: column;
  height: 400px;
}
</style>
