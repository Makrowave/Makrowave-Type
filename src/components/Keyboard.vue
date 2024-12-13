<script setup lang="ts">
import { keys } from '@/const/keys'
import Key from './KeyboardKey.vue'
const keyLayout = keys
</script>

<template>
  <div>
    <ul>
      <Key v-for="el in keyLayout[0]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
      <Key key="Backspace" keyName="Backspace" altKeyName="" special width="80px" />
    </ul>
    <ul>
      <Key key="Tab" keyName="Tab" altKeyName="" special width="60px" />
      <Key v-for="el in keyLayout[1]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
      <Key key="\" keyName="\" altKeyName="|" special width="60px" />
    </ul>
    <ul>
      <Key key="Caps" keyName="CapsLock" altKeyName="" special width="80px" togglable />
      <Key v-for="el in keyLayout[2]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
      <Key key="Enter" keyName="Control" altKeyName="" special width="80px" />
    </ul>
    <ul>
      <Key key="Shift1" keyName="Shift" altKeyName="" special width="100px" :location="1" />
      <Key v-for="el in keyLayout[3]" :key="el[1]" :keyName="el[0]" :altKeyName="el[1]" />
      <Key key="Shift2" keyName="Shift" altKeyName="" special width="100px" :location="2" />
    </ul>
    <ul>
      <Key key="Ctrl1" keyName="Control" altKeyName="" special width="80px" :location="1" />
      <Key key="Alt1" keyName="Alt" altKeyName="" special width="60px" :location="1" />
      <Key key="Spacebar" keyName=" " altKeyName="" special width="320px" />
      <Key key="Alt2" keyName="Alt" altKeyName="" special width="60px" :location="2" />
      <Key key="Ctrl2" keyName="Control" altKeyName="" special width="80px" :location="2" />
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
}
</style>
