<script setup>
import { inject } from 'vue'

let {isChatActive} = inject('chat')

watchEffect(() => {
  console.log(isChatActive.value)
})
</script>
<template>
  <Navigasi />
  <slot />
  <ChatContainer />
</template>