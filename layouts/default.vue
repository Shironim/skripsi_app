<script setup>
import { inject } from 'vue'

let {isChatActive} = inject('chat')

// watchEffect(() => {
//   console.log(isChatActive.value)
// })
</script>
<template>
  <div class="flex">
    <div :class="isChatActive ? 'basis-8/12' : 'basis-full'">
      <Navigasi />
      <slot />
    </div>
    <div :class="isChatActive ? 'basis-4/12' : 'hidden'">
      <ChatContainer />
    </div>
  </div>
  <ChatToogle/>
</template>