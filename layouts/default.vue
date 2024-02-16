<script setup>
import { inject } from "vue";

let { isChatActive } = inject("chat");
// watchEffect(() => {
//   console.log(isChatActive.value)
// })
</script>
<template>
  <div class="relative">
    <div class="flex">
      <div class="basis-full">
        <Navigasi />
        <div class="min-h-screen">
          <slot />
        </div>
        <Footer />
      </div>
    </div>
    <ChatContainer /> 
    <ChatToogle />
  </div>
</template>
