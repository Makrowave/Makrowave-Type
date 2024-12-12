<script>

const props = defineProps({
    type: string,
    key: string
})

const isPressed = ref(false);
const pressedClass = ref('pressed')
const normalClass = ref('normal')
const handleKeyDown = (event) => {
    if(event.key === key) {
        isPressed.value = true;
    }
}

const handleKeyUp = (event) => {
    if(event.key === key) {
        isPressed.value = false;
    }
}
</script>

<template>
<div @keydown="handleKeyDown" @keyup="handleKeyUp" :class="isPressed ? pressedClass : normalClass">
    <slot>Key</slot>
</div>
</template>

<style>
.normal {
    background-color: aquamarine;
    height: 40px;
    width: 40px;
}
.pressed {
    background-color: cadetblue;
    height: 40px;
    width: 40px;
}
</style>