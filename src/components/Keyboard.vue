<script setup lang="ts">
import { keys } from '@/const/keys'
import Key from './KeyboardKey.vue'
const keyLayout = keys
</script>

<template>
  <div>
    <ul>
      <Key v-for="el in keyLayout[0]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
    </ul>
    <ul>
      <Key v-for="el in keyLayout[1]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
    </ul>
    <ul>
      <Key v-for="el in keyLayout[2]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
    </ul>
    <ul>
      <Key v-for="el in keyLayout[3]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
    </ul>
    <ul></ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
}
</style>
