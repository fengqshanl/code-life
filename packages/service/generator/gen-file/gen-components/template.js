const script_setup = [
    `import { ref } from 'vue'`,
    `defineProps({ msg: String })`,
    `const count = ref(0)`
]

const template = [
    `<h1>{{ msg }}</h1>`,
    `<div class="card">`,
    `<button type="button" @click="count++">count is {{ count }}</button>`,
    `<p>Edit<code>components/HelloWorld.vue</code> to test HMR</p>`,
    `</div>`,
    `<p>Check out<a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite starter</p>`,
    `<p>Install<a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>in your IDE for a better DX</p>`,
    `<p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>`
]

const style_scoped = [
    `.read-the-docs { color: #888; }`
]

module.exports = {
    "HelloWorld.vue": `<script setup>${script_setup.join(";")}</script>` + `<template>${template.join("")}</template>` + `<style scoped>${style_scoped.join("")}</style>`
}
