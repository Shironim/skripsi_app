<script setup>
import { inject } from "vue";
//  inject chat
let { toogle, isChatActive } = inject("chat");
</script>
<template>
  <div v-if="!isChatActive" class="fixed bottom-10 right-3 flex justify-end mr-4 cursor-pointer">
    <div @click="toogle(true)" class="bg-lime-900 rounded-full p-4 flex flex-row">
      <Icon
        name="material-symbols:android-messages"
        class="text-white mx-2 self-center"
      ></Icon>
      <p class="text-lg self-center font-bold text-white">Chat</p>
    </div>
  </div>
</template>
